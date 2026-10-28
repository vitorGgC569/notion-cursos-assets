(function(){
var K=window.K,X=K.X;
function base(o){
  o=o||{};var N=[
  X.zone('zs',16,14,200,170,'Pilha de chamadas'),X.zone('zw',236,14,230,170,'APIs do ambiente (timers)'),X.zone('zm',486,14,218,76,'Fila de microtarefas'),X.zone('zk',486,108,218,76,'Fila de macrotarefas'),X.zone('zc',16,204,688,150,'Console')];
  (o.stack||[]).forEach(function(t,i){N.push(X.box('st'+t,30,44+i*34,172,28,t,i===0?'a':'n'))});
  (o.web||[]).forEach(function(t){N.push(X.box('w'+t,250,60,202,34,t,'n','espera 0 ms'))});
  (o.micro||[]).forEach(function(t){N.push(X.box('mi'+t,500,44,190,34,t,'a'))});
  (o.macro||[]).forEach(function(t){N.push(X.box('ma'+t,500,138,190,34,t,'n'))});
  (o.out||[]).forEach(function(t,i){N.push(X.text('o'+i,36,238+i*26,'> '+t,'b'))});
  return N;
}
var CODE=['console.log("1")','setTimeout(() => log("2"), 0)','Promise.resolve().then(() => log("3"))','console.log("4")'];
var S=[
{label:'0. Código',title:'O código que vamos executar',text:'<p>JavaScript (no navegador e no Node.js) executa em <b>um único thread</b>, com uma pilha de chamadas, filas de tarefas e um <b>event loop</b> que decide o que vai para a pilha. Qual será a ordem de 1, 2, 3 e 4?</p>',cmd:CODE.join(';  '),scene:function(){return base()}},
{label:'1. log("1")',title:'Instrução síncrona: imprime 1',text:'<p>O primeiro <code>console.log</code> entra na pilha, executa e sai. Tudo o que é síncrono roda na hora, na ordem em que aparece.</p>',cmd:CODE[0],scene:function(){return base({stack:['console.log("1")'],out:['1']})}},
{label:'2. setTimeout',title:'setTimeout entrega o timer ao ambiente',text:'<p>O <code>setTimeout</code> não espera: registra o callback no ambiente (Web API no navegador, módulo de timers no Node) e a pilha segue. Mesmo com 0 ms, o callback <b>não roda agora</b>: vai para a fila de <b>macrotarefas</b> quando o tempo vence.</p>',cmd:CODE[1],scene:function(){return base({web:['callback do timer'],out:['1']})}},
{label:'3. Promise',title:'A Promise já resolvida enfileira uma microtarefa',text:'<p>O <code>.then</code> de uma Promise resolvida vai para a fila de <b>microtarefas</b>. Essa fila tem prioridade sobre a de macrotarefas. O timer, entretanto, já terminou e o callback aguarda na fila de macrotarefas.</p>',cmd:CODE[2],scene:function(){return base({macro:['callback do timer'],micro:['then da Promise'],out:['1']})}},
{label:'4. log("4")',title:'Mais uma instrução síncrona: imprime 4',text:'<p>O código principal ainda não terminou: o último <code>console.log</code> roda antes de qualquer fila. Por isso o 4 sai antes do 3 e do 2.</p>',cmd:CODE[3],scene:function(){return base({stack:['console.log("4")'],macro:['callback do timer'],micro:['then da Promise'],out:['1','4']})}},
{label:'5. Microtarefa',title:'Pilha vazia: o event loop esvazia as microtarefas',text:'<p>Com a pilha vazia, o event loop <b>primeiro</b> executa todas as microtarefas: imprime 3.</p>',scene:function(){return base({stack:['then da Promise'],macro:['callback do timer'],out:['1','4','3']})}},
{label:'6. Macrotarefa',title:'Só então vem a macrotarefa: imprime 2',text:'<p>Agora o event loop pega uma macrotarefa, o callback do timer, e imprime 2. A ordem final é <b>1, 4, 3, 2</b>. Regra de ouro: síncrono, depois microtarefas (Promises, <code>queueMicrotask</code>), depois macrotarefas (<code>setTimeout</code>, eventos de I/O).</p>',scene:function(){return base({stack:['callback do timer'],out:['1','4','3','2']})}}
];
K.explain({w:720,h:370,steps:S,alt:'Animação do event loop do JavaScript com pilha, microtarefas e macrotarefas'});
})();
