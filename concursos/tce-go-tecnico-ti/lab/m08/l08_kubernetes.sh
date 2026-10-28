#!/usr/bin/env bash
# Pratica 8: Kubernetes num cluster kind de 2 nos (Deployment, rolling update, rollback, Service, DaemonSet, hooks, dry-run)
source "$(dirname "$0")/common.sh"
D=$(cd "$(dirname "$0")/k8s" && pwd)
export DOCKER_HOST=unix:///tmp/docker.sock KUBECONFIG=/tmp/m8do-kubeconfig
CL=m8do
column() { python3 -c "import sys; r=[l.split() for l in sys.stdin if l.strip()]; w=[max(len(x[i]) if i<len(x) else 0 for x in r) for i in range(max(map(len,r)))]; [print('  '.join(c.ljust(w[i]) for i,c in enumerate(x)).rstrip()) for x in r]"; }
export -f column
LIMPA() { kind delete cluster --name $CL >/dev/null 2>&1; rm -f $KUBECONFIG; }
trap LIMPA EXIT
docker pull -q nginx:1.29-alpine >/dev/null; docker pull -q busybox:latest >/dev/null
t "1. Cluster de 2 nos (control-plane + worker) com o kind"
c "kind version | cut -d' ' -f1-2"
c "kind create cluster --name $CL --config $D/kind-m8do.yaml --wait 150s 2>&1 | grep -E 'Creating cluster|Ready after|Set kubectl|Have a' | sed -E 's/[^ -~]//g'"
c "kubectl wait --for=condition=Ready node --all --timeout=150s"
c "kubectl get nodes -o wide | awk '{print \$1, \$2, \$3, \$5}' | column -t"
c "kubectl get nodes -o custom-columns=NO:.metadata.name,RUNTIME:.status.nodeInfo.containerRuntimeVersion"
kind load docker-image nginx:1.30-alpine nginx:1.29-alpine busybox:latest --name $CL >/dev/null 2>&1
t "2. Deployment (3 replicas), ReplicaSet e Pods"
c "kubectl apply -f $D/web.yaml"
c "kubectl rollout status deployment/web --timeout=90s | tail -1"
c "kubectl get deploy,rs,pods -l app=web -o wide | awk '{print \$1, \$2, \$3, \$4, \$5}' | column -t | cut -c1-90"
c "kubectl get pods -l app=web -o custom-columns=POD:.metadata.name,NO:.spec.nodeName | sed -E 's/web-[a-z0-9]+-[a-z0-9]+/web-xxxxx/' | sort | uniq -c"
t "3. Service: balanceamento entre os Pods pelo DNS do cluster"
c "kubectl get svc web -o jsonpath='{.spec.type} {.spec.clusterIP}{\"\\n\"}' | awk '{print \$1, \"(IP interno)\"}'"
c "kubectl get endpoints web -o jsonpath='{range .subsets[*].addresses[*]}{.ip}{\"\\n\"}{end}' 2>/dev/null | wc -l"
kubectl -n kube-system rollout status deploy/coredns --timeout=90s >/dev/null 2>&1; sleep 5
c "kubectl exec deploy/web -- nslookup web.default.svc.cluster.local \$(kubectl -n kube-system get pods -l k8s-app=kube-dns -o jsonpath='{.items[0].status.podIP}') | grep -E 'Name|Address' | sed -E 's/^Address: ([0-9.]+)$/Address: IP-do-Service/' | tail -2"
t "3b. Limite deste sandbox: o kube-proxy nao grava as regras do Service"
c "kubectl -n kube-system logs ds/kube-proxy --tail=40 | grep -m1 -oE 'Extension statistic revision 0 not supported, missing kernel module\\?'"
c "kubectl exec deploy/web -- wget -T3 -qO- http://web.default.svc.cluster.local; echo saida=\$?"
t "4. Rolling update, historico e rollback"
c "kubectl set image deployment/web nginx=nginx:1.29-alpine"
c "kubectl rollout status deployment/web --timeout=90s | tail -1"
c "kubectl get rs -l app=web -o custom-columns=NOME:.metadata.name,DESEJADO:.spec.replicas,IMAGEM:.spec.template.spec.containers[0].image"
c "kubectl rollout history deployment/web"
c "kubectl rollout undo deployment/web && kubectl rollout status deployment/web --timeout=90s | tail -1"
c "kubectl get deploy web -o jsonpath='{.spec.template.spec.containers[0].image}{\"\\n\"}'"
t "5. Escala e autocorrecao (self-healing)"
c "kubectl scale deployment/web --replicas=5 && kubectl rollout status deployment/web --timeout=60s | tail -1"
c "kubectl delete pod -l app=web --wait=false --field-selector=status.phase=Running | wc -l"
sleep 2
c "kubectl rollout status deployment/web --timeout=60s | tail -1;  kubectl get deploy web | awk '{print \$1, \$2}' | column -t"
c "kubectl scale deployment/web --replicas=3 && kubectl rollout status deployment/web --timeout=60s | tail -1"
t "6. Readiness probe falhando: o Pod nao recebe trafego"
c "kubectl patch deployment web --type=json -p '[{\"op\":\"replace\",\"path\":\"/spec/template/spec/containers/0/readinessProbe/httpGet/path\",\"value\":\"/nao-existe\"}]'"
sleep 12
c "kubectl get pods -l app=web | awk '{print \$2, \$3}' | sort | uniq -c"
c "kubectl get endpoints web -o jsonpath='{.subsets}{\"\\n\"}'; kubectl rollout status deployment/web --timeout=5s 2>&1 | tail -1"
c "kubectl rollout undo deployment/web >/dev/null && kubectl rollout status deployment/web --timeout=90s | tail -1"
t "7. DaemonSet: um Pod por no (o control-plane tem taint)"
c "kubectl apply -f $D/agente.yaml"
sleep 8
c "kubectl get pods -l app=agente -o wide | awk '{print \$1, \$3, \$7}' | sed -E 's/agente-[a-z0-9]+/agente-xxxxx/' | column -t"
c "kubectl get nodes -o custom-columns=NO:.metadata.name,TAINT:.spec.taints[*].key"
c "kubectl patch ds agente --type=json -p '[{\"op\":\"add\",\"path\":\"/spec/template/spec/tolerations\",\"value\":[{\"key\":\"node-role.kubernetes.io/control-plane\",\"operator\":\"Exists\",\"effect\":\"NoSchedule\"}]}]' && kubectl rollout status ds/agente --timeout=90s | tail -1"
c "kubectl get ds agente | awk '{print \$1, \"desejados=\"\$2, \"prontos=\"\$4}'"
t "8. Hooks de ciclo de vida: PostStart e PreStop"
c "kubectl apply -f $D/hooks.yaml && kubectl wait --for=condition=Ready pod/hooks --timeout=60s"
c "kubectl exec hooks -- cat /usr/share/nginx/html/start.txt"
S=$(date +%s); kubectl delete pod hooks >/dev/null 2>&1; E=$(date +%s)
printf '$ time kubectl delete pod hooks   (PreStop = sleep 6)\nsegundos ate o Pod sumir: %s (o PreStop roda antes do SIGTERM)\n' "$((E-S))"
t "9. Questao BCB 96: kind Service nao cria Deployment (dry-run no servidor)"
c "kubectl apply --dry-run=server -f $D/svc-bcb96.yaml"
c "kubectl create deployment nginx --image=nginx --dry-run=client -o yaml | head -4"
t "10. Namespaces, ConfigMap e variavel de ambiente"
c "kubectl create namespace hom && kubectl create configmap cfg -n hom --from-literal=AMBIENTE=homologacao"
c "kubectl run envpod -n hom --image=busybox:latest --restart=Never --env=X=1 --overrides='{\"spec\":{\"containers\":[{\"name\":\"envpod\",\"image\":\"busybox:latest\",\"command\":[\"sh\",\"-c\",\"echo AMBIENTE=\$AMBIENTE\"],\"envFrom\":[{\"configMapRef\":{\"name\":\"cfg\"}}]}]}}' && sleep 5 && kubectl logs -n hom envpod"
t "11. Limpeza"
c "kind delete cluster --name $CL 2>&1 | head -1"
c "kind get clusters 2>&1"
