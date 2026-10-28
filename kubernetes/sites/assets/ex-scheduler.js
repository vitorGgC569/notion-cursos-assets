(function(){
var K=window.K,X=K.X;
function sc(o){
  var N=[];
  N.push(X.text('t1',24,16,'fila do scheduler','t'));
  N.push(X.text('t2',268,16,'nós do cluster modulo18 (8 CPUs cada)','t'));
  N.push(X.box('pod',24,30,190,56,o.podt||'Pod',o.podc||'a',o.pod||'Pending · sem nodeName'));
  N.push(X.box('sch',24,130,190,56,'kube-scheduler',o.schc||'m',o.sch||'aguardando'));
  N.push(X.box('cp',268,30,200,56,'control-plane',o.cpc||'n',o.cp||'taint control-plane:NoSchedule'));
  N.push(X.box('w1',268,110,200,56,'worker',o.w1c||'n',o.w1||'8 CPUs alocáveis'));
  N.push(X.box('w2',268,190,200,56,'worker2',o.w2c||'n',o.w2||'8 CPUs alocáveis'));
  N.push(X.line('l0',119,86,119,130,o.l0||'m',true));
  N.push(X.line('l1',214,158,268,58,o.l1||'m',true));
  N.push(X.line('l2',214,158,268,138,o.l2||'m',true));
  N.push(X.line('l3',214,158,268,218,o.l3||'m',true));
  if(o.s1)N.push(X.pill('s1',486,128,o.s1,o.s1c||'a',210));
  if(o.s2)N.push(X.pill('s2',486,208,o.s2,o.s2c||'a',210));
  if(o.s0)N.push(X.pill('s0',486,48,o.s0,o.s0c||'d',210));
  if(o.note)N.push(X.pill('note',24,262,o.note,o.nc||'n',672));
  return N;
}
var S=[
{cmd:'kubectl apply -f qos-pods.yaml',out:'pod/garantido created\n$ kubectl get pod garantido -o wide\ngarantido   0/1   Pending   <none>',title:'1. O Pod nasce sem nó',text:'<p>O API server grava o Pod no etcd com <code>spec.nodeName</code> vazio. Nenhum kubelet o executa ainda: ele está <code>Pending</code> e entra na fila do <b>kube-scheduler</b>, ordenada por prioridade (módulo 2.11).</p>',scene:function(){return sc({podt:'Pod garantido',pod:'requests: cpu 250m · mem 64Mi',l0:'a',schc:'a',sch:'pegou o Pod da fila'})}},
{label:'Filtragem: taints',title:'2. Filtragem: quem não pode receber sai',text:'<p>Primeira fase: <b>filtragem</b>. Cada plugin elimina nós que não servem. O <code>TaintToleration</code> descarta o control-plane, que tem o taint <code>node-role.kubernetes.io/control-plane:NoSchedule</code> e o Pod não o tolera.</p>',scene:function(){return sc({podt:'Pod garantido',pod:'requests: cpu 250m · mem 64Mi',l0:'a',schc:'a',sch:'filtragem',l1:'d',cpc:'d',cp:'eliminado: taint',s0:'TaintToleration: não',s0c:'d'})}},
{label:'Filtragem: recursos',title:'3. Filtragem: a reserva cabe?',text:'<p>O <code>NodeResourcesFit</code> compara os <b>requests</b> do Pod com o que ainda está livre no nó: <i>alocável menos a soma dos requests</i> dos Pods que já estão lá. O uso real não entra na conta. 250m cabem nos dois workers, que passam.</p>',scene:function(){return sc({podt:'Pod garantido',pod:'requests: cpu 250m · mem 64Mi',l0:'a',schc:'a',sch:'filtragem',l1:'m',cpc:'m',cp:'eliminado: taint',l2:'a',l3:'a',w1c:'a',w2c:'a',s1:'NodeResourcesFit: sim',s2:'NodeResourcesFit: sim'})}},
{label:'Pontuação',title:'4. Pontuação: entre os que servem, o melhor',text:'<p>Segunda fase: <b>pontuação</b>. Plugins como <code>NodeResourcesBalancedAllocation</code>, <code>ImageLocality</code> e as preferências de afinidade dão notas de 0 a 100 a cada nó que sobrou. As notas são somadas com pesos, e vence a maior (empate: sorteio). As notas da figura são ilustrativas: o scheduler não as mostra no <code>describe</code>.</p>',scene:function(){return sc({podt:'Pod garantido',pod:'requests: cpu 250m · mem 64Mi',l0:'a',schc:'a',sch:'pontuação',cpc:'m',cp:'eliminado',l2:'a',l3:'a',w1c:'a',w2c:'a',s1:'nota ilustrativa: 172',s1c:'n',s2:'nota ilustrativa: 181',s2c:'a'})}},
{cmd:'kubectl get pod garantido -o wide',out:'garantido   1/1   Running   modulo18-worker2',title:'5. Vínculo (bind): o nome do nó vai para o Pod',text:'<p>Terceira fase: <b>bind</b>. O scheduler grava <code>spec.nodeName: modulo18-worker2</code> pela API. O kubelet do worker2 vê um Pod com o nome dele, baixa a imagem e cria o contêiner. O scheduler nunca fala com o nó diretamente.</p>',scene:function(){return sc({podt:'Pod garantido',podc:'d',pod:'nodeName: modulo18-worker2',l0:'a',schc:'n',sch:'bind feito',cpc:'m',cp:'',w1c:'n',w1:'',l3:'a',w2c:'d',w2:'garantido: Running',note:'filtrar, pontuar, vincular: e só o vínculo muda o Pod',nc:'a'})}},
{cmd:'kubectl apply -f pod-gigante.yaml',out:'pod/gigante created\n$ kubectl get pod gigante\ngigante   0/1   Pending',title:'6. Quando nenhum nó passa no filtro',text:'<p>O Pod <code>gigante</code> pede <b>10 CPUs</b> de request; cada nó tem 8 alocáveis. A filtragem elimina todos e o Pod fica <code>Pending</code>. O scheduler tenta de novo sempre que algo muda no cluster (nó novo, Pod apagado, rótulo novo).</p>',scene:function(){return sc({podt:'Pod gigante',pod:'requests: cpu 10',l0:'a',schc:'d',sch:'0 nós viáveis',l1:'d',l2:'d',l3:'d',cpc:'d',cp:'taint',w1c:'d',w1:'Insufficient cpu',w2c:'d',w2:'Insufficient cpu'})}},
{cmd:'kubectl describe pod gigante | tail -1',out:'Warning  FailedScheduling  default-scheduler  0/3 nodes are available: 1 node(s) had untolerated taint(s), 2 Insufficient cpu. preemption: 0/3 nodes are available: 3 Preemption is not helpful for scheduling.',title:'7. Lendo o FailedScheduling',text:'<p>A mensagem é um placar da filtragem: <b>0/3</b> nós servem; <b>1</b> caiu pelo taint, <b>2</b> por CPU insuficiente. A parte <code>preemption</code> diz que nem despejar Pods menores resolveria (10 CPUs não cabem em nó nenhum). Some os números: devem dar o total de nós.</p>',scene:function(){return sc({podt:'Pod gigante',pod:'Pending',l0:'a',schc:'d',sch:'FailedScheduling',cpc:'d',cp:'1 node(s) had untolerated taint(s)',w1c:'d',w1:'Insufficient cpu',w2c:'d',w2:'Insufficient cpu',note:'0/3 = 1 (taint) + 2 (cpu). Corrija o request ou adicione capacidade',nc:'d'})}},
{cmd:'kubectl apply -f pod-manual.yaml  # spec.nodeName: modulo18-control-plane',out:'pod/manual created\nmanual   Running   modulo18-control-plane\nMOTIVO   DE\nPulling  kubelet',title:'8. nodeName: pulando o scheduler',text:'<p>Se o YAML já vem com <code>spec.nodeName</code>, o scheduler nem olha o Pod: o kubelet daquele nó o executa direto. Repare que o Pod foi parar no control-plane <b>apesar do taint</b> <code>NoSchedule</code>, e não há evento <code>Scheduled</code>, só eventos do kubelet. Útil para depurar; em produção, prefira afinidade.</p>',scene:function(){return sc({podt:'Pod manual',podc:'a',pod:'nodeName fixo no YAML',l0:'m',schc:'m',sch:'ignorado',l1:'a',cpc:'a',cp:'manual: Running (taint ignorado)',w1:'',w2:'',note:'nodeName definido = sem scheduler, sem filtro, sem taint',nc:'a'})}}
];
K.explain({w:720,h:296,steps:S,alt:'Como o kube-scheduler escolhe o nó: fila, filtragem, pontuação e vínculo'});
})();
