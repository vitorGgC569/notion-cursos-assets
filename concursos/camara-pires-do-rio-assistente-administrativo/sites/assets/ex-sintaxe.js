(function(){
var K=window.K,X=K.X;
var W=[['Os',36],['vereadores',108],['aprovaram',98],['o',30],['projeto,',84],['embora',66],['o',30],['prefeito,',88],['que',46],['assumiu',82],['em',40],['janeiro,',80],['desconfiasse',120],['do',40],['prazo.',66]];
function top(act,done){
  var names=['Orações','Sujeito e predicado','Termos','Subordinação'],subs=['contar os verbos','quem? o quê?','complementos','valor da conjunção'],N=[],i;
  for(i=0;i<4;i++){
    var c=i===act?'a':(done&&done.indexOf(i)>=0?'d':'m');
    N.push(X.box('f'+i,16+i*174,14,162,52,names[i],c,subs[i]));
  }
  return N;
}
function scn(title){return [X.zone('zs',16,86,688,282,title)]}
function words(map){
  var N=[],i,x=24,y=112,any=false,k;
  for(k in map){any=true}
  for(i=0;i<W.length;i++){
    if(i===6){x=24;y=146}
    if(i===12){x=24;y=180}
    var st=map[i]||(any?'m':'n');
    N.push(X.pill('w'+i,x,y,W[i][0],st,W[i][1]));
    x+=W[i][1]+10;
  }
  return N;
}
var S=[
{label:'0. A frase',title:'Um período, três orações',text:'<p>Vamos analisar um período <b>fictício</b>: "Os vereadores aprovaram o projeto, embora o prefeito, que assumiu em janeiro, desconfiasse do prazo." O objetivo é aplicar, passo a passo, as perguntas que a prova faz sobre <b>sujeito, termos da oração e valor das orações</b>.</p>',
 scene:function(){var N=top(-1);N=N.concat(scn('O período'));N=N.concat(words({}));
  N.push(X.text('t0',24,250,'Quinze palavras, três verbos.\nAntes de classificar qualquer coisa, marque os verbos.','t'));return N}},
{label:'1. Orações',title:'Cada verbo é uma oração',text:'<p>Os verbos são <i>aprovaram</i>, <i>assumiu</i> e <i>desconfiasse</i>. Cada verbo forma uma oração, então o período é <b>composto</b>, com três orações: <i>Os vereadores aprovaram o projeto</i>; <i>embora o prefeito desconfiasse do prazo</i>; <i>que assumiu em janeiro</i> (esta fica dentro da segunda).</p>',
 scene:function(){var N=top(0);N=N.concat(scn('Contando as orações'));N=N.concat(words({2:'a',9:'a',12:'a'}));
  N.push(X.text('t1',24,250,'aprovaram, assumiu, desconfiasse: três verbos.\nPeríodo composto, com três orações.','t'));return N}},
{label:'2. Sujeito',title:'Sujeito e predicado da primeira oração',text:'<p>Pergunte ao verbo <i>aprovaram</i>: quem aprovou? <i>Os vereadores</i>, um só núcleo escrito na oração: <b>sujeito simples</b>. O predicado é <i>aprovaram o projeto</i>: <b>predicado verbal</b>, com verbo transitivo direto, e <i>o projeto</i> é o <b>objeto direto</b> (aprovaram o quê?).</p>',
 scene:function(){var N=top(1,[0]);N=N.concat(scn('Sujeito (verde-claro) e predicado (preto)'));N=N.concat(words({0:'a',1:'a',2:'d',3:'d',4:'d'}));
  N.push(X.text('t2',24,250,'Sujeito simples: Os vereadores.\nPredicado verbal: aprovaram o projeto. Objeto direto: o projeto.','t'));return N}},
{label:'3. Conjunção',title:'Coordenação ou subordinação?',text:'<p>A segunda oração começa com <i>embora</i>. Ela <b>depende</b> da primeira e funciona como um adjunto adverbial dela: é <b>subordinada adverbial</b>. A conjunção <i>embora</i> indica um fato contrário ao esperado, que não impediu a aprovação: <b>concessão</b>. A primeira é a oração <b>principal</b>.</p>',
 scene:function(){var N=top(3,[0,1]);N=N.concat(scn('A principal e a subordinada'));N=N.concat(words({5:'a',6:'d',7:'d',8:'d',9:'d',10:'d',11:'d',12:'d',13:'d',14:'d'}));
  N.push(X.text('t3',24,250,'embora: conjunção subordinativa concessiva.\nOração subordinada adverbial concessiva.','t'));return N}},
{label:'4. Dentro',title:'O sujeito e o complemento da subordinada',text:'<p>Na oração <i>embora o prefeito desconfiasse do prazo</i>, o verbo <i>desconfiasse</i> tem o sujeito <i>o prefeito</i> (simples). O termo <i>do prazo</i> completa o verbo com a preposição <i>de</i>: é <b>objeto indireto</b> (desconfiar de quê?).</p>',
 scene:function(){var N=top(2,[0,1,3]);N=N.concat(scn('Sujeito, verbo e objeto indireto'));N=N.concat(words({6:'a',7:'a',12:'d',13:'a',14:'a'}));
  N.push(X.text('t4',24,250,'Sujeito: o prefeito. Verbo: desconfiasse (preto).\nObjeto indireto: do prazo.','t'));return N}},
{label:'5. Que',title:'A oração entre vírgulas',text:'<p>A oração <i>que assumiu em janeiro</i> vem entre vírgulas e é introduzida por <i>que</i>, que equivale a <i>o qual</i> e retoma <i>o prefeito</i>: <b>pronome relativo</b>. É uma <b>subordinada adjetiva explicativa</b>, porque só acrescenta uma informação. Dentro dela, <i>em janeiro</i> é <b>adjunto adverbial de tempo</b>.</p>',
 scene:function(){var N=top(3,[0,1,2]);N=N.concat(scn('A subordinada adjetiva'));N=N.concat(words({7:'d',8:'a',9:'a',10:'a',11:'a'}));
  N.push(X.text('t5',24,250,'que = o qual, retoma o prefeito (em preto).\nAdjetiva explicativa: que assumiu em janeiro.','t'));return N}},
{label:'6. Roteiro',title:'O roteiro que você leva para a prova',text:'<p>Diante de uma questão de sintaxe, faça cinco perguntas: <b>quais são os verbos</b>? <b>Quais são as orações</b> e os conectivos? <b>Uma depende da outra</b>? Qual é o <b>valor</b> da conjunção ou a <b>função</b> da oração? E, no termo isolado, <b>quem? o quê? a quem? onde?</b> A banca cobrou seis questões de sintaxe nas duas provas analisadas.</p>',
 scene:function(){var N=top(-1,[0,1,2,3]);N=N.concat(scn('Cinco perguntas'));
  N.push(X.pill('q1',40,112,'1. Quais são os verbos e as locuções verbais?','a',380));
  N.push(X.pill('q2',40,148,'2. Quais são as orações e os conectivos?','n',330));
  N.push(X.pill('q3',40,184,'3. Uma oração depende da outra?','n',250));
  N.push(X.pill('q4',40,220,'4. Qual é o valor da conjunção ou a função da oração?','n',410));
  N.push(X.pill('q5',40,256,'5. No termo isolado: quem? o quê? a quem? onde?','n',380));
  N.push(X.text('t6',40,316,'Treine nos desafios e nos exercícios.','t'));return N}}
];
K.explain({w:720,h:380,steps:S,alt:'Animação que analisa o período fictício Os vereadores aprovaram o projeto, embora o prefeito, que assumiu em janeiro, desconfiasse do prazo: contagem das orações, sujeito e predicado, subordinada adverbial concessiva, objeto indireto e subordinada adjetiva explicativa'});
})();
