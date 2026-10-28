(function(){
var K=window.K,X=K.X;
var P=[['garantido','Guaranteed','req = lim: 250m · 64Mi'],['so-limite','Guaranteed','só limit: 200m · 96Mi'],['flexivel','Burstable','req 100m/32Mi · lim 128Mi'],['sem-garantia','BestEffort','nada declarado']];
function sc(o){
  var N=[];
  N.push(X.text('t1',24,16,'Pods do laboratório 2','t'));
  N.push(X.text('t2',460,16,o.rt||'classe de QoS','t'));
  P.forEach(function(p,i){
    var y=28+i*58,c=(o.c&&o.c[i])||'n';
    N.push(X.box('p'+i,24,y,250,48,p[0],c,o.d&&o.d[i]!=null?o.d[i]:p[2]));
    if(o.q)N.push(X.pill('q'+i,300,y+13,o.q[i]||p[1],c,140));
    if(o.r&&o.r[i])N.push(X.pill('r'+i,460,y+13,o.r[i],o.rc&&o.rc[i]||'n',236));
  });
  if(o.note)N.push(X.pill('note',24,266,o.note,o.nc||'n',672));
  return N;
}
var S=[
{cmd:'kubectl apply -f qos-pods.yaml',out:'pod/garantido created\npod/flexivel created\npod/sem-garantia created\npod/so-limite created',title:'1. Quatro Pods, quatro jeitos de declarar',text:'<p>Os quatro Pods rodam a mesma imagem e só mudam os <code>resources</code>. Ninguém escreve a classe de QoS no YAML: o Kubernetes a calcula a partir de requests e limits e grava em <code>status.qosClass</code>.</p>',scene:function(){return sc({})}},
{label:'Guaranteed',title:'2. Guaranteed: request igual ao limit em tudo',text:'<p>Todo contêiner do Pod precisa ter request <b>e</b> limit de CPU <b>e</b> memória, com request igual ao limit. O <code>garantido</code> cumpre. O <code>so-limite</code> só declarou limits, e o Kubernetes copiou cada limit para o request: virou Guaranteed também.</p>',scene:function(){return sc({q:['Guaranteed','Guaranteed','',''],c:['a','a','n','n'],d:[null,'requests copiados: 200m · 96Mi',null,null]})}},
{label:'Burstable e BestEffort',title:'3. Burstable e BestEffort',text:'<p><b>Burstable</b>: declarou algo, mas não fechou a regra do Guaranteed (o <code>flexivel</code> tem request menor que o limit). <b>BestEffort</b>: nenhum contêiner declarou nada (o <code>sem-garantia</code>). Basta um contêiner com qualquer valor para o Pod deixar de ser BestEffort.</p>',scene:function(){return sc({q:['Guaranteed','Guaranteed','Burstable','BestEffort'],c:['a','a','n','d']})}},
{cmd:'kubectl exec garantido -- cat /sys/fs/cgroup/memory.max /sys/fs/cgroup/cpu.max',out:'67108864\n25000 100000\n$ kubectl exec sem-garantia -- cat /sys/fs/cgroup/memory.max /sys/fs/cgroup/cpu.max\nmax\nmax 100000',title:'4. O limit vira número no cgroup',text:'<p>O kubelet traduz o limit para o cgroup do contêiner. 64Mi viram <code>memory.max = 67108864</code> bytes; 250m viram <code>cpu.max = 25000 100000</code> (25 ms de CPU a cada 100 ms). O BestEffort fica com <code>max</code>: sem teto nenhum.</p>',scene:function(){return sc({q:['Guaranteed','Guaranteed','Burstable','BestEffort'],c:['a','a','n','d'],rt:'cgroup do contêiner',r:['memory.max 67108864','memory.max 100663296','memory.max 134217728','memory.max max'],rc:['a','a','n','d']})}},
{cmd:'kubectl apply -f pod-estoura.yaml',out:'$ kubectl get pod estoura-memoria\nestoura-memoria   0/1   OOMKilled   0   15s\n"exitCode":137,"reason":"OOMKilled"',title:'5. Passou do limit de memória: OOMKilled',text:'<p>Isso não depende da classe: qualquer contêiner que passe do próprio <code>memory.max</code> é morto pelo OOM Killer do kernel, com saída <b>137</b> (128 + 9, SIGKILL). Já na CPU, passar do limit só causa <b>throttling</b>: o contêiner fica mais lento, mas continua vivo.</p>',scene:function(){return sc({q:['Guaranteed','Guaranteed','Burstable','BestEffort'],c:['a','a','n','d'],rt:'passou do próprio limit?',r:['CPU: throttling','CPU: throttling','memória: OOMKilled (137)','sem limit: nunca'],rc:['n','n','d','n'],note:'limit de memória estourado = OOMKilled, em qualquer classe',nc:'d'})}},
{label:'Nó sem memória',title:'6. Agora o nó inteiro fica sem memória',text:'<p>Outro cenário: nenhum contêiner passou do limit, mas a soma do uso esgotou a memória do nó (o sinal <code>memory.available</code> cruzou o limiar de despejo). O kubelet precisa escolher Pods para despejar, e a ordem segue três critérios.</p>',scene:function(){return sc({q:['Guaranteed','Guaranteed','Burstable','BestEffort'],c:['n','n','n','n'],rt:'pressão de memória no nó',r:['uso ≤ request','uso ≤ request','uso > request','uso > request (pediu 0)'],rc:['n','n','a','d']})}},
{label:'Ordem de despejo',title:'7. Quem sai primeiro',text:'<p>1) Pods com <b>uso acima do request</b> vão antes (um BestEffort pediu zero, então sempre está aqui). 2) Entre eles, menor <b>prioridade</b> primeiro. 3) Empate: quem mais passou do request. Um Guaranteed que usa só o que reservou é o último da fila.</p>',scene:function(){return sc({q:['Guaranteed','Guaranteed','Burstable','BestEffort'],c:['a','a','n','d'],rt:'ordem de despejo',r:['3º (último)','3º (último)','2º','1º a sair'],rc:['a','a','n','d'],note:'1. uso acima do request  2. prioridade  3. quanto passou do request',nc:'a'})}},
{label:'Resumo',title:'8. Para levar para a prova',text:'<p>Request é reserva (lida pelo scheduler). Limit é teto (aplicado pelo kernel). A classe de QoS sai dos dois e decide a ordem de despejo sob pressão. Para proteger um Pod crítico: request igual ao limit (Guaranteed) e uma PriorityClass alta.</p>',scene:function(){return sc({q:['Guaranteed','Guaranteed','Burstable','BestEffort'],c:['a','a','n','d'],rt:'proteção sob pressão',r:['máxima','máxima','média','mínima'],rc:['a','a','n','d']})}}
];
K.explain({w:720,h:296,steps:S,alt:'Classes de QoS, cgroups e a ordem de despejo do kubelet'});
})();
