#!/usr/bin/env bash
# Pratica 5: Docker (cliente/servidor, build e cache, multi-stage, ignore, usuario, health, commit, registry, rede, volume, seguranca)
source "$(dirname "$0")/common.sh"
D=$(cd "$(dirname "$0")" && pwd)
export DOCKER_HOST=unix:///tmp/docker.sock
P=m8do
W=/tmp/m8-dk-$$; mkdir -p $W; cp -r "$D/dk-app" "$D/dk-go" $W/; cd $W
echo "# execucao $$" >> dk-app/requirements.txt   # evita reaproveitar cache de execucoes antigas
echo "// execucao $$" >> dk-go/main.go
LIMPA() { docker rm -f ${P}-web ${P}-web2 ${P}-reg ${P}-c1 ${P}-ro ${P}-vol1 ${P}-vol2 >/dev/null 2>&1; docker network rm ${P}-rede >/dev/null 2>&1; docker volume rm ${P}-dados >/dev/null 2>&1; docker rmi -f ${P}/app:ruim ${P}/app:ruim2 ${P}/app:bad ${P}/app:1 ${P}/app:2 ${P}/go:single ${P}/go:multi ${P}/base:commit localhost:15808/${P}/app:1 >/dev/null 2>&1; }
trap LIMPA EXIT; LIMPA
bld() { docker build --progress=plain "$@" 2>&1 | python3 "$D/bldfilter.py"; }
t "1. Cliente e servidor (daemon): o Docker e uma arquitetura cliente-servidor com API REST"
c "docker version --format 'cliente={{.Client.Version}} servidor={{.Server.Version}} os={{.Server.Os}}'"
c "curl -s --unix-socket /tmp/docker.sock http://localhost/version | python3 -c \"import sys,json; d=json.load(sys.stdin); print('API REST via socket UNIX:', d['ApiVersion'], d['Os'])\""
c "uname -r; docker run --rm alpine uname -r"
t "2. Build com cache de camadas: Dockerfile ruim (COPY . antes do pip)"
printf '$ docker build -f Dockerfile.ruim -t m8do/app:ruim dk-app   (1a vez)\n'; bld -f dk-app/Dockerfile.ruim -t ${P}/app:ruim dk-app
echo '# comentario' >> dk-app/app.py
printf '$ (alteramos so o app.py) docker build ... (2a vez: o pip reinstala)\n'; bld -f dk-app/Dockerfile.ruim -t ${P}/app:ruim dk-app
t "3. Dockerfile bom: dependencias antes do codigo"
printf '$ docker build -t m8do/app:1 dk-app   (1a vez)\n'; bld -t ${P}/app:1 dk-app
echo '# outro comentario' >> dk-app/app.py
printf '$ (alteramos so o app.py) docker build ... (2a vez: pip em CACHED)\n'; bld -t ${P}/app:2 dk-app
c "docker history ${P}/app:2 --format '{{.CreatedBy}}' | head -9 | cut -c1-70"
t "4. .dockerignore reduz o contexto e evita vazar segredo"
echo 'SENHA=123' > dk-app/segredo.env; dd if=/dev/zero of=dk-app/dados.bin bs=1M count=20 2>/dev/null
mv dk-app/.dockerignore /tmp/m8-di.$$
printf '$ docker build -f Dockerfile.ruim (contexto com um arquivo de 20 MB e um segredo.env, sem .dockerignore)\n'; bld -f dk-app/Dockerfile.ruim -t ${P}/app:ruim2 dk-app | grep contexto
c "docker run --rm ${P}/app:ruim2 ls /app"
mv /tmp/m8-di.$$ dk-app/.dockerignore; printf 'dados.bin\n' >> dk-app/.dockerignore
printf '$ docker build -f Dockerfile.ruim (com .dockerignore: segredo.env, dados.bin ignorados)\n'; bld -f dk-app/Dockerfile.ruim -t ${P}/app:ruim dk-app | grep contexto
c "docker run --rm ${P}/app:ruim ls /app"
t "5. Multi-stage: imagem final minima"
bld -f dk-go/Dockerfile.single -t ${P}/go:single dk-go >/dev/null; bld -t ${P}/go:multi dk-go >/dev/null
c "docker images ${P}/go --format '{{.Repository}}:{{.Tag}}  {{.Size}}'"
c "docker run --rm ${P}/go:multi"
c "docker run --rm --entrypoint /bin/sh ${P}/go:multi -c id 2>&1 | head -1 | sed -E 's/.*unable to start container process: //'"
t "6. Usuario nao-root, HEALTHCHECK e inspecao"
c "docker run -d --name ${P}-web -p 15801:8000 ${P}/app:1"
sleep 6
c "docker ps --filter name=${P}-web --format '{{.Names}} {{.Status}}'"
c "docker inspect ${P}-web --format 'usuario={{.Config.User}} saude={{.State.Health.Status}}'"
c "curl -s localhost:15801/; echo; curl -s localhost:15801/; echo"
c "docker exec ${P}-web id"
docker pull -q alpine:latest >/dev/null
t "7. docker commit: criar imagem a partir de um container (nao e reprodutivel)"
c "docker run -d --name ${P}-c1 alpine:latest sleep 300"
c "docker exec ${P}-c1 sh -c 'echo configurado-a-mao > /etc/marca'"
c "docker commit ${P}-c1 ${P}/base:commit | cut -c1-19"
c "docker run --rm ${P}/base:commit cat /etc/marca"
c "docker history ${P}/base:commit --format '{{.CreatedBy}}' | head -2 | cut -c1-60"
t "8. Registry: tag, push e pull com um registry local"
c "docker run -d --name ${P}-reg -p 15808:5000 registry:2 | cut -c1-12"
sleep 2
c "docker tag ${P}/app:1 localhost:15808/${P}/app:1"
c "docker push localhost:15808/${P}/app:1 2>&1 | tail -2 | cut -c1-100"
c "curl -s localhost:15808/v2/_catalog; echo; curl -s localhost:15808/v2/${P}/app/tags/list; echo"
c "docker rmi localhost:15808/${P}/app:1 >/dev/null && docker pull -q localhost:15808/${P}/app:1 | cut -c1-60"
t "9. Rede definida pelo usuario (DNS por nome) e volume (dados sobrevivem)"
c "docker network create ${P}-rede | cut -c1-12"
c "docker run -d --name ${P}-web2 --network ${P}-rede ${P}/app:1 | cut -c1-12"
sleep 3
c "docker run --rm --network ${P}-rede ${P}/app:1 python -c \"import urllib.request as u; print(u.urlopen('http://${P}-web2:8000/saude').read().decode())\""
c "docker volume create ${P}-dados"
c "docker run --rm -v ${P}-dados:/dados alpine sh -c 'echo persistente > /dados/x.txt'"
c "docker run --rm -v ${P}-dados:/dados alpine cat /dados/x.txt"
t "10. Seguranca de container: o menor privilegio"
c "docker run --rm --read-only --cap-drop ALL --security-opt no-new-privileges --user 10001 alpine sh -c 'echo teste > /x.txt'"
c "docker run --rm --read-only --tmpfs /tmp --cap-drop ALL --user 10001 alpine sh -c 'echo teste > /tmp/x.txt && cat /tmp/x.txt'"
c "docker run --rm --cap-drop ALL alpine sh -c 'ip link add d0 type dummy' 2>&1 | head -1"
c "hadolint dk-app/Dockerfile.hadolint"
c "hadolint dk-app/Dockerfile && echo 'hadolint: dk-app/Dockerfile sem avisos'"
t "11. Varredura de vulnerabilidades da imagem com Trivy"
docker save ${P}/app:1 -o $W/app1.tar
docker run --rm -v $W:/w aquasec/trivy:latest image --input /w/app1.tar --quiet --format json > $W/trivy.json 2>/dev/null
printf '$ trivy image --input app1.tar --format json   (resumo com python)\n'
python3 - <<PY
import json
d=json.load(open("$W/trivy.json"))
print("imagem base:", d["Metadata"]["OS"]["Family"], d["Metadata"]["OS"]["Name"])
from collections import Counter
cnt=Counter(); fix=Counter()
for r in d["Results"]:
    for v in r.get("Vulnerabilities") or []:
        cnt[v["Severity"]]+=1
        if v.get("FixedVersion"): fix[v["Severity"]]+=1
print("vulnerabilidades por severidade:", dict(cnt))
print("com correcao disponivel:", dict(fix))
PY
