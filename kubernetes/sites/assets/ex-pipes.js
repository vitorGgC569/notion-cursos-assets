(function(){
var K=window.K,X=K.X;
var STAGES=[['cat app.log','lê o arquivo'],['grep ERROR','mantém só linhas com ERROR'],['sort','ordena'],['uniq -c','conta repetidas']];
var DATA=[['INFO ok','ERROR disco','INFO ok','ERROR rede','ERROR disco'],['ERROR disco','ERROR rede','ERROR disco'],['ERROR disco','ERROR disco','ERROR rede'],['2 ERROR disco','1 ERROR rede']];
function scene(active,extra){
  var N=[];
  STAGES.forEach(function(s,i){
    var on=i<=active,x=20+i*176;
    N.push(X.box('s'+i,x,20,150,54,s[0],i===active?'a':on?'n':'m',s[1]));
    if(i<3)N.push(X.line('a'+i,x+150,47,x+176,47,on&&i<active?'a':'m',true),X.text('p'+i,x+156,40,'|','b'));
    if(on)DATA[i].forEach(function(l,j){N.push(X.text('d'+i+j,x,110+j*20,l,i===active?'b':'t'))});
  });
  if(extra)N.push(extra);
  return N;
}
var S=[
{cmd:'cat app.log',title:'Primeiro comando: gerar texto',text:'<p>Todo comando Unix lê texto da <b>entrada padrão</b> e escreve na <b>saída padrão</b>. <code>cat</code> escreve as 5 linhas do arquivo.</p>',scene:function(){return scene(0)}},
{cmd:'cat app.log | grep ERROR',title:'O pipe liga a saída à entrada',text:'<p>O <code>|</code> pega a saída de um comando e a entrega como entrada do próximo, sem arquivo intermediário. O <code>grep</code> deixa passar só as linhas com <code>ERROR</code>: 5 viram 3.</p>',scene:function(){return scene(1)}},
{cmd:'... | sort',title:'Ordenar',text:'<p><code>sort</code> ordena as linhas. É necessário aqui porque o <code>uniq</code> só junta linhas repetidas <b>vizinhas</b>.</p>',scene:function(){return scene(2)}},
{cmd:'... | uniq -c',out:'2 ERROR disco\n1 ERROR rede',title:'Contar',text:'<p><code>uniq -c</code> junta as linhas iguais e escreve quantas vezes cada uma apareceu. Quatro programas pequenos, cada um fazendo uma coisa, resolvem um problema maior.</p>',scene:function(){return scene(3)}},
{cmd:'... > erros.txt',title:'Redirecionar para um arquivo',text:'<p><code>&gt;</code> manda a saída para um arquivo (sobrescrevendo); <code>&gt;&gt;</code> acrescenta ao final. Nada aparece na tela porque tudo foi para <code>erros.txt</code>.</p>',scene:function(){return scene(3,X.box('out',560,176,140,40,'erros.txt','a','2 linhas'))}},
{cmd:'ls /nao-existe 2> erro.log',title:'Duas saídas: stdout e stderr',text:'<p>Cada programa tem duas saídas: a padrão (1) e a de erros (2). <code>&gt;</code> redireciona só a 1. Use <code>2&gt;</code> para os erros, <code>2&gt;&amp;1</code> para juntar os dois e <code>/dev/null</code> para descartar.</p>',scene:function(){return [X.box('p',40,40,180,60,'ls /nao-existe','a'),X.box('o1',400,30,200,40,'stdout (1)  →  tela','n'),X.box('o2',400,86,200,40,'stderr (2)  →  erro.log','a'),X.line('l1',220,60,400,50,'m',true),X.line('l2',220,80,400,106,'a',true)]}}
];
K.explain({w:720,h:230,steps:S,alt:'Fluxo de dados em um pipeline'});
})();
