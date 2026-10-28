(function(){
var K=window.K;
function get(o,p){return p.split('.').reduce(function(a,k){return a==null?undefined:a[k]},o)}
var DNS=/^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/;
var RP=['Always','OnFailure','Never'];
function ctrs(d){var s=(d&&d.spec)||{};return [].concat(s.initContainers||[],s.containers||[])}
function an(text){
  var r=K.yaml(text),warn=[];
  if(r.err)return {text:text,doc:null,err:r.err,errMsg:K.yamlErr(r.err),warn:[]};
  var d=r.doc;
  if(!d||typeof d!=='object')return {text:text,doc:d,err:{},errMsg:'o arquivo precisa ser um mapa com apiVersion, kind, metadata e spec.',warn:[]};
  if(d.apiVersion!=='v1')warn.push('<code>apiVersion</code> de um Pod é <code>v1</code> (o servidor recusaria <code>'+K.esc(String(d.apiVersion))+'</code>).');
  if(d.kind!=='Pod')warn.push('<code>kind</code> diferencia maiúsculas: o certo é <code>Pod</code>.');
  var nm=get(d,'metadata.name');
  if(!nm)warn.push('falta <code>metadata.name</code>.');
  else if(!DNS.test(String(nm)))warn.push('o nome <code>'+K.esc(String(nm))+'</code> não é válido: use só minúsculas, números e hífen, começando e terminando com letra ou número.');
  var lb=get(d,'metadata.labels')||{};
  Object.keys(lb).forEach(function(k){if(typeof lb[k]!=='string')warn.push('o valor da label <code>'+K.esc(k)+'</code> precisa ser texto; ponha entre aspas.')});
  var s=d.spec||{};
  if(!Array.isArray(s.containers)||!s.containers.length)warn.push('<code>spec.containers</code> precisa ser uma lista com pelo menos um contêiner.');
  if(s.restartPolicy!=null&&RP.indexOf(s.restartPolicy)<0)warn.push('<code>restartPolicy</code> aceita só <code>Always</code>, <code>OnFailure</code> ou <code>Never</code>.');
  var seen={},vols={};(s.volumes||[]).forEach(function(v){if(v&&v.name)vols[v.name]=1});
  ctrs(d).forEach(function(c){
    if(!c||typeof c!=='object')return;
    if(!c.name)warn.push('todo contêiner precisa de <code>name</code>.');
    else{if(seen[c.name])warn.push('o nome de contêiner <code>'+K.esc(c.name)+'</code> se repete no Pod.');seen[c.name]=1;if(!DNS.test(String(c.name)))warn.push('nome de contêiner inválido: <code>'+K.esc(String(c.name))+'</code>.')}
    if(!c.image)warn.push('contêiner <code>'+K.esc(String(c.name||'?'))+'</code>: falta <code>image</code>.');
    else if(!/[:@]/.test(c.image)||/:latest$/.test(c.image))warn.push('contêiner <code>'+K.esc(String(c.name))+'</code>: fixe a tag da imagem (evite <code>latest</code>).');
    ['command','args'].forEach(function(k){if(c[k]!=null&&!Array.isArray(c[k]))warn.push('contêiner <code>'+K.esc(String(c.name))+'</code>: <code>'+k+'</code> é uma lista, como <code>["sh", "-c", "..."]</code>.')});
    (c.env||[]).forEach(function(e){if(e&&e.value!=null&&typeof e.value!=='string')warn.push('variável <code>'+K.esc(String(e.name))+'</code>: <code>value</code> precisa ser texto; ponha números e booleanos entre aspas.')});
    (c.ports||[]).forEach(function(p){if(p&&typeof p.containerPort!=='number')warn.push('<code>containerPort</code> é um número, sem aspas.')});
    (c.volumeMounts||[]).forEach(function(m){if(m&&!vols[m.name])warn.push('contêiner <code>'+K.esc(String(c.name))+'</code> monta o volume <code>'+K.esc(String(m.name))+'</code>, que não está em <code>spec.volumes</code>.')});
  });
  K.yamlPitfalls(text).forEach(function(p){warn.push('linha '+p.line+': '+p.msg)});
  return {text:text,doc:d,s:s,err:null,warn:warn};
}
an.parseLabel='O YAML é válido.';
function c0(c,n){return (get(c.doc,'spec.containers')||[]).filter(function(x){return x&&x.name===n})[0]}
function clean(c){return c.warn.filter(function(w){return w.indexOf('linha ')!==0}).length===0}
function sel(lb){lb=lb||{};return lb.app==='loja'&&(lb.env==='dev'||lb.env==='stage')}
var C=[
{id:'recusa',tab:'1. O servidor recusa',title:'Desafio 1: três erros que o servidor recusa',text:'<p>Este manifesto é YAML válido, mas a API do Kubernetes recusaria. O <code>kind</code> está com a letra errada, o nome tem maiúscula e sublinhado, e o contêiner não tem imagem. Corrija os três: <code>kind: Pod</code>, nome <code>web-app</code> e imagem <code>nginx:1.27-alpine</code>.</p>',
 start:'apiVersion: v1\nkind: pod\nmetadata:\n  name: Web_App\nspec:\n  containers:\n  - name: web\n    ports:\n    - containerPort: 80\n',
 solution:'apiVersion: v1\nkind: Pod\nmetadata:\n  name: web-app\nspec:\n  containers:\n  - name: web\n    image: nginx:1.27-alpine\n    ports:\n    - containerPort: 80\n',
 checks:[{label:'<code>kind</code> é <code>Pod</code>',fn:function(c){return c.doc.kind==='Pod'}},{label:'O nome é <code>web-app</code>',fn:function(c){return get(c.doc,'metadata.name')==='web-app'}},{label:'O contêiner <code>web</code> usa <code>nginx:1.27-alpine</code>',fn:function(c){var x=c0(c,'web');return !!x&&x.image==='nginx:1.27-alpine'}},{label:'Nenhum aviso do verificador',fn:clean}]},
{id:'tarefa',tab:'2. Tarefa que termina',title:'Desafio 2: um Pod que roda uma vez e termina',text:'<p>Este Pod deveria imprimir <code>pronto</code> e terminar com <code>Completed</code>, sem ser reiniciado. Hoje a <code>restartPolicy</code> tem um valor inválido e o <code>command</code> foi escrito como texto. Use <code>restartPolicy: Never</code> e o comando como lista: <code>["sh", "-c", "echo pronto"]</code>.</p>',
 start:'apiVersion: v1\nkind: Pod\nmetadata:\n  name: tarefa\nspec:\n  restartPolicy: OnFail\n  containers:\n  - name: job\n    image: busybox:1.37\n    command: sh -c "echo pronto"\n',
 solution:'apiVersion: v1\nkind: Pod\nmetadata:\n  name: tarefa\nspec:\n  restartPolicy: Never\n  containers:\n  - name: job\n    image: busybox:1.37\n    command: ["sh", "-c", "echo pronto"]\n',
 checks:[{label:'<code>restartPolicy</code> é <code>Never</code>',fn:function(c){return get(c.doc,'spec.restartPolicy')==='Never'}},{label:'<code>command</code> é a lista <code>sh</code>, <code>-c</code>, <code>echo pronto</code>',fn:function(c){var x=c0(c,'job');return !!x&&Array.isArray(x.command)&&x.command.length===3&&x.command[0]==='sh'&&x.command[1]==='-c'&&/^echo pronto$/.test(x.command[2])}},{label:'Nenhum aviso do verificador',fn:clean}]},
{id:'env',tab:'3. Variáveis',title:'Desafio 3: variáveis fixas e a Downward API',text:'<p>O contêiner <code>api</code> precisa de três variáveis: <code>MODO</code> com <code>producao</code>, <code>PORTA</code> com <code>8080</code> e <code>POD_IP</code> com o IP do próprio Pod, lido pela Downward API (<code>valueFrom.fieldRef.fieldPath: status.podIP</code>). O arquivo atual tem um número sem aspas, que a API recusa.</p>',
 start:'apiVersion: v1\nkind: Pod\nmetadata:\n  name: api\nspec:\n  containers:\n  - name: api\n    image: nginx:1.27-alpine\n    env:\n    - name: MODO\n      value: producao\n    - name: PORTA\n      value: 8080\n',
 solution:'apiVersion: v1\nkind: Pod\nmetadata:\n  name: api\nspec:\n  containers:\n  - name: api\n    image: nginx:1.27-alpine\n    env:\n    - name: MODO\n      value: producao\n    - name: PORTA\n      value: "8080"\n    - name: POD_IP\n      valueFrom:\n        fieldRef:\n          fieldPath: status.podIP\n',
 checks:[{label:'<code>PORTA</code> vale o texto <code>"8080"</code>',fn:function(c){var x=c0(c,'api');return !!x&&(x.env||[]).some(function(e){return e.name==='PORTA'&&e.value==='8080'})}},{label:'<code>MODO</code> vale <code>producao</code>',fn:function(c){var x=c0(c,'api');return !!x&&(x.env||[]).some(function(e){return e.name==='MODO'&&e.value==='producao'})}},{label:'<code>POD_IP</code> vem de <code>status.podIP</code>',fn:function(c){var x=c0(c,'api');return !!x&&(x.env||[]).some(function(e){return e.name==='POD_IP'&&get(e,'valueFrom.fieldRef.fieldPath')==='status.podIP'})}},{label:'Nenhum aviso do verificador',fn:clean}]},
{id:'sidecar',tab:'4. Sidecar',title:'Desafio 4: dois contêineres e um volume compartilhado',text:'<p>Monte o Pod <code>duo</code>: o contêiner <code>web</code> (<code>nginx:1.27-alpine</code>) serve o que o contêiner <code>gerador</code> (<code>busybox:1.37</code>) escreve. Os dois montam o mesmo volume <code>emptyDir</code> chamado <code>html</code>: no <code>web</code> em <code>/usr/share/nginx/html</code>, no <code>gerador</code> em <code>/dados</code>. Falta declarar o volume e montar no <code>web</code>.</p>',
 start:'apiVersion: v1\nkind: Pod\nmetadata:\n  name: duo\nspec:\n  containers:\n  - name: web\n    image: nginx:1.27-alpine\n  - name: gerador\n    image: busybox:1.37\n    command: ["sh", "-c", "while true; do date > /dados/index.html; sleep 5; done"]\n    volumeMounts:\n    - name: html\n      mountPath: /dados\n',
 solution:'apiVersion: v1\nkind: Pod\nmetadata:\n  name: duo\nspec:\n  volumes:\n  - name: html\n    emptyDir: {}\n  containers:\n  - name: web\n    image: nginx:1.27-alpine\n    volumeMounts:\n    - name: html\n      mountPath: /usr/share/nginx/html\n  - name: gerador\n    image: busybox:1.37\n    command: ["sh", "-c", "while true; do date > /dados/index.html; sleep 5; done"]\n    volumeMounts:\n    - name: html\n      mountPath: /dados\n',
 checks:[{label:'Há um volume <code>html</code> do tipo <code>emptyDir</code>',fn:function(c){return (get(c.doc,'spec.volumes')||[]).some(function(v){return v.name==='html'&&'emptyDir' in v})}},{label:'<code>web</code> monta <code>html</code> em <code>/usr/share/nginx/html</code>',fn:function(c){var x=c0(c,'web');return !!x&&(x.volumeMounts||[]).some(function(m){return m.name==='html'&&m.mountPath==='/usr/share/nginx/html'})}},{label:'<code>gerador</code> continua montando <code>html</code> em <code>/dados</code>',fn:function(c){var x=c0(c,'gerador');return !!x&&(x.volumeMounts||[]).some(function(m){return m.name==='html'&&m.mountPath==='/dados'})}},{label:'Nenhum aviso do verificador',fn:clean}]},
{id:'init',tab:'5. Init e labels',title:'Desafio 5: init container e labels para o selector',text:'<p>O Pod <code>loja</code> precisa de um init container <code>prepara</code> (<code>busybox:1.37</code>, comando <code>["sh", "-c", "echo ok"]</code>) que rode antes do contêiner principal. Ele também precisa ser encontrado pelo selector <code>app=loja,env in (dev,stage)</code> e ter <code>tier=back</code>. Hoje a label <code>env</code> está errada e o init foi posto na lista errada.</p>',
 start:'apiVersion: v1\nkind: Pod\nmetadata:\n  name: loja\n  labels:\n    app: loja\n    env: prod\nspec:\n  containers:\n  - name: prepara\n    image: busybox:1.37\n    command: ["sh", "-c", "echo ok"]\n  - name: app\n    image: nginx:1.27-alpine\n',
 solution:'apiVersion: v1\nkind: Pod\nmetadata:\n  name: loja\n  labels:\n    app: loja\n    env: dev\n    tier: back\nspec:\n  initContainers:\n  - name: prepara\n    image: busybox:1.37\n    command: ["sh", "-c", "echo ok"]\n  containers:\n  - name: app\n    image: nginx:1.27-alpine\n',
 checks:[{label:'<code>prepara</code> está em <code>initContainers</code> e não em <code>containers</code>',fn:function(c){var i=get(c.doc,'spec.initContainers')||[];return i.some(function(x){return x.name==='prepara'&&x.image==='busybox:1.37'})&&!c0(c,'prepara')}},{label:'O contêiner principal <code>app</code> continua em <code>containers</code>',fn:function(c){return !!c0(c,'app')}},{label:'O selector <code>app=loja,env in (dev,stage)</code> encontra o Pod',fn:function(c){return sel(get(c.doc,'metadata.labels'))}},{label:'O Pod tem <code>tier=back</code>',fn:function(c){return get(c.doc,'metadata.labels.tier')==='back'}},{label:'Nenhum aviso do verificador',fn:clean}]}
];
K.$('#labbody')&&K.editorLab({challenges:C,analyze:an,freeStart:'apiVersion: v1\nkind: Pod\nmetadata:\n  name: web\n  labels:\n    app: web\nspec:\n  containers:\n  - name: web\n    image: nginx:1.27-alpine\n    ports:\n    - containerPort: 80\n',freeText:'<p>Escreva ou cole o manifesto de um Pod. O verificador checa a sintaxe e as regras que a API aplicaria: <code>kind</code>, nomes, imagens, <code>restartPolicy</code>, variáveis, portas e volumes montados. Ele não cria nada no cluster; para isso, use <code>kubectl apply --dry-run=server -f</code>.</p>',
 convert:function(t){var r=K.yaml(t);if(r.err)return '<div class="note bad">'+K.esc(K.yamlErr(r.err))+'</div>';return '<details open><summary>JSON equivalente (o que o kubectl envia para a API)</summary><div class="in"><pre><code>'+K.esc(JSON.stringify(r.doc,null,2))+'</code></pre></div></details>'}});
})();
