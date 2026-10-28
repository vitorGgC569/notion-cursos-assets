(function(){
var K=window.K,X=K.X;
function z(o){
  o=o||{};
  var N=[X.zone('zcp',8,8,214,284,'Plano de controle'),X.zone('zn',232,8,480,284,'Nó curso-control-plane')];
  N.push(X.box('api',24,40,182,46,'kube-apiserver',o.api?'a':'n','valida e grava'));
  N.push(X.box('etcd',24,110,182,46,'etcd',o.etcd?'a':'n','estado desejado'));
  N.push(X.box('sch',24,180,182,46,'kube-scheduler',o.sch?'a':'n','escolhe o nó'));
  N.push(X.box('kl',248,40,180,46,'kubelet',o.kl?'a':'n','roda os Pods do nó'));
  N.push(X.line('l1',115,86,115,110,o.etcd?'a':'m',true));
  if(o.sch)N.push(X.line('l2',115,180,115,156,'a',true));
  if(o.kl)N.push(X.line('l3',248,63,206,63,'a',true));
  if(o.pending)N.push(X.pill('pp',36,240,'Pod web · Pending · sem nó','m'));
  if(o.pod){
    N.push(X.zone('zpod',248,104,450,176,'Pod '+(o.name||'web')+(o.ip?' · IP '+o.ip:'')));
    if(o.sandbox)N.push(X.box('sb',262,134,118,44,'sandbox (pause)','n','segura a rede'));
    if(o.inits){o.inits.forEach(function(s,i){N.push(X.box('in'+i,392+i*150,134,138,44,s[0],s[1],s[2]))})}
    if(o.ctr)N.push(X.box('c',392,192,170,46,o.ctrName||'contêiner web',o.ctr[0],o.ctr[1]));
    if(o.ctr2)N.push(X.box('c2',574,192,112,46,o.ctr2[0],o.ctr2[1],o.ctr2[2]));
    if(o.st)N.push(X.pill('st',262,250,'STATUS: '+o.st,o.stc||'a',200));
    if(o.sig)N.push(X.pill('sig',474,250,o.sig,'d',210));
  }
  if(o.gone)N.push(X.box('gone',300,140,350,90,'O Pod foi removido','m','ninguém vai recriá-lo:\nesse é o papel dos controllers'));
  return N;
}
var S=[
{cmd:'kubectl run web --image=nginx:1.27-alpine',out:'pod/web created',title:'1. O pedido chega à API',text:'<p>O <code>kubectl</code> manda o Pod para o <code>kube-apiserver</code>, que valida o objeto e grava no <code>etcd</code>. A mensagem <code>created</code> só quer dizer isso: o Pod existe no banco do cluster. Ele ainda está <code>Pending</code> e não tem nó.</p>',scene:function(){return z({api:1,etcd:1,pending:1})}},
{cmd:'Normal  Scheduled  default-scheduler  Successfully assigned default/web to curso-control-plane',title:'2. O scheduler escolhe um nó',text:'<p>O <code>kube-scheduler</code> vê um Pod sem nó, avalia os nós disponíveis e grava a escolha no campo <code>spec.nodeName</code>. Esse é o evento <code>Scheduled</code> que aparece no <code>kubectl describe</code>. A condição <code>PodScheduled</code> fica <code>True</code>.</p>',scene:function(){return z({api:1,etcd:1,sch:1,pod:1,st:'Pending',stc:'m'})}},
{cmd:'Normal  Pulled  kubelet  spec.containers{web}: Container image "nginx:1.27-alpine" already present on machine',title:'3. O kubelet prepara o Pod',text:'<p>O <code>kubelet</code> do nó escolhido percebe que tem trabalho. Ele cria o <b>sandbox</b> (o contêiner <code>pause</code>, que segura a rede do Pod e recebe o IP) e garante que a imagem está no nó: baixa (<code>Pulling</code>) ou reaproveita, como aqui. Enquanto isso, o <code>STATUS</code> mostra <code>ContainerCreating</code>.</p>',scene:function(){return z({kl:1,pod:1,sandbox:1,ip:'10.244.0.5',ctr:['m','criando...'],st:'ContainerCreating',stc:'m'})}},
{cmd:'kubectl get pods -o wide',out:'NAME   READY   STATUS    RESTARTS   AGE   IP           NODE\nweb    1/1     Running   0          0s    10.244.0.5   curso-control-plane',title:'4. Running e Ready',text:'<p>Com o contêiner criado e iniciado (eventos <code>Created</code> e <code>Started</code>), a fase vira <code>Running</code>. <code>READY 1/1</code> diz que um de um contêineres está pronto. O kubelet manda o estado de volta para a API, e é isso que o <code>get</code> mostra.</p>',scene:function(){return z({kl:1,api:1,pod:1,sandbox:1,ip:'10.244.0.5',ctr:['a','running · porta 80'],st:'Running · 1/1'})}},
{cmd:'kubectl get pod site',out:'NAME   READY   STATUS     RESTARTS   AGE\nsite   0/2     Init:0/2   0          2s',title:'5. Se houver init containers, eles vêm antes',text:'<p>Neste outro Pod, <code>site</code>, há dois init containers: <code>prepara</code> roda e termina; <code>coletor</code> é um sidecar nativo (<code>restartPolicy: Always</code>) que fica rodando. <code>Init:0/2</code> quer dizer que nenhum dos dois concluiu a etapa. Só depois o contêiner principal começa, e o Pod chega a <code>2/2 Running</code>.</p>',scene:function(){return z({kl:1,pod:1,name:'site',sandbox:1,inits:[['prepara','a','roda e sai com 0'],['coletor (sidecar)','m','espera a vez']],ctr:['m','aguardando'],ctrName:'contêiner principal',st:'Init:0/2',stc:'m'})}},
{cmd:'kubectl get pod loop',out:'NAME   READY   STATUS   RESTARTS      AGE\nloop   0/1     Error    3 (40s ago)   58s\nWarning  BackOff  Back-off restarting failed container app in pod loop_default',title:'6. O contêiner cai e o kubelet reinicia',text:'<p>Quando o processo do contêiner termina com erro e a <code>restartPolicy</code> é <code>Always</code> (o padrão), o kubelet reinicia o <b>contêiner</b>, no mesmo Pod e no mesmo nó. A espera entre tentativas dobra a cada falha (10 s, 20 s, 40 s...) até 5 minutos: é o <code>CrashLoopBackOff</code>, anunciado pelo evento <code>BackOff</code>. A fase continua <code>Running</code>.</p>',scene:function(){return z({kl:1,pod:1,name:'loop',sandbox:1,ip:'10.244.0.x',ctr:['m','saiu com código 1\nRESTARTS 3'],ctrName:'contêiner app',st:'Error · reinicia com espera',stc:'m'})}},
{cmd:'kubectl get pods ok falha',out:'NAME    READY   STATUS      RESTARTS   AGE\nok      0/1     Completed   0          8s\nfalha   0/1     Error       0          8s',title:'7. Pods que terminam: Succeeded e Failed',text:'<p>Com <code>restartPolicy: Never</code>, ninguém reinicia. Se todos os contêineres saíram com código 0, a fase é <code>Succeeded</code> e o <code>STATUS</code> mostra <code>Completed</code>. Se algum saiu com outro código, a fase é <code>Failed</code> e aparece <code>Error</code>. É assim que tarefas avulsas terminam.</p>',scene:function(){return z({kl:1,pod:1,name:'ok e falha',sandbox:0,ctr:['n','ok: saiu com 0\nSucceeded'],ctrName:'ok',ctr2:['falha','n','saiu com 1\nFailed'],st:'Completed / Error',stc:'n'})}},
{cmd:'time kubectl delete pod educado',out:'pod "educado" deleted from default namespace\nreal  0m2.009s',title:'8. Apagar: primeiro o SIGTERM',text:'<p>O <code>delete</code> marca o Pod como <code>Terminating</code>. O kubelet manda <b>SIGTERM</b> ao processo 1 de cada contêiner e espera até o <code>terminationGracePeriodSeconds</code> (30 s por padrão). O <code>educado</code> trata o sinal com um <code>trap</code>, encerra sozinho e o Pod some em 2 segundos.</p>',scene:function(){return z({kl:1,api:1,pod:1,name:'educado',sandbox:1,ctr:['a','trap TERM → exit 0'],ctrName:'contêiner app',st:'Terminating',stc:'m',sig:'SIGTERM'})}},
{cmd:'time kubectl delete pod lento',out:'pod "lento" deleted from default namespace\nreal  0m30.989s',title:'9. Quem ignora o SIGTERM leva SIGKILL',text:'<p>O <code>lento</code> roda <code>sleep</code> como processo 1, que não trata o SIGTERM. O kubelet espera o prazo inteiro, 30 segundos, e então manda <b>SIGKILL</b>, que não pode ser ignorado. Por isso sua aplicação deve tratar o SIGTERM: fechar conexões e sair rápido.</p>',scene:function(){return z({kl:1,pod:1,name:'lento',sandbox:1,ctr:['d','ignorou o SIGTERM'],ctrName:'contêiner app',st:'Terminating · 30 s',stc:'m',sig:'SIGKILL após 30 s'})}},
{cmd:'kubectl delete pod web',out:'pod "web" deleted from default namespace',title:'10. Depois de apagado, acabou',text:'<p>Um Pod solto não volta: o kubelet só reinicia contêineres <b>dentro</b> de um Pod existente. Para ter réplicas que reaparecem quando um Pod morre ou um nó cai, você usa um controller como o Deployment. Esse é o assunto do próximo módulo.</p>',scene:function(){return z({api:1,etcd:1,gone:1})}}
];
K.explain({w:720,h:300,steps:S,alt:'O ciclo de vida de um Pod, do pedido à remoção'});
})();
