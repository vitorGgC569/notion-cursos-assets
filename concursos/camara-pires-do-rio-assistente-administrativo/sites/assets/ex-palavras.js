(function(){
var K=window.K,X=K.X;
var W=[['Os',46],['novos',70],['servidores',112],['entregaram',112],['ontem',70],['o',36],['ofício',80],['ao',46],['presidente',108],['mas',56],['ele',54],['não',58],['o',36],['assinou',88]];
function top(act,done){
  var names=['Classes','Verbo','Pronomes','Estrutura'],subs=['nomes e invariáveis','tempo, modo, voz','ele e o','radical e sufixo'],N=[],i;
  for(i=0;i<4;i++){
    var c=i===act?'a':(done&&done.indexOf(i)>=0?'d':'m');
    N.push(X.box('f'+i,16+i*174,14,162,52,names[i],c,subs[i]));
  }
  return N;
}
function scn(title){return [X.zone('zs',16,86,688,282,title)]}
function words(map){
  var N=[],i,x=24,y=118,any=false,k;
  for(k in map){any=true}
  for(i=0;i<W.length;i++){
    if(i===6){x=24;y=156}
    var st=map[i]||(any?'m':'n');
    N.push(X.pill('w'+i,x,y,W[i][0],st,W[i][1]));
    x+=W[i][1]+10;
  }
  return N;
}
var S=[
{label:'0. A frase',title:'Uma frase, quatro perguntas',text:'<p>Vamos analisar uma frase <b>fictícia</b>: "Os novos servidores entregaram ontem o ofício ao presidente, mas ele não o assinou." Em cada passo você aplica uma pergunta que a prova faz sobre <b>classe, verbo, pronome e estrutura</b> da palavra.</p>',
 scene:function(){var N=top(-1);N=N.concat(scn('A frase'));N=N.concat(words({}));
  N.push(X.text('t0',24,230,'Catorze palavras, oito classes diferentes.\nA classe de cada uma depende da função na frase.','t'));return N}},
{label:'1. Nomes',title:'Substantivo, artigo e adjetivo',text:'<p>Os <b>substantivos</b> dão nome: <i>servidores</i>, <i>ofício</i>, <i>presidente</i>. Quem acompanha o nome vem junto: os <b>artigos</b> <i>os</i> e <i>o</i> o definem, e o <b>adjetivo</b> <i>novos</i> o caracteriza e concorda com <i>servidores</i>.</p>',
 scene:function(){var N=top(0);N=N.concat(scn('Os nomes e quem os acompanha'));N=N.concat(words({0:'d',1:'d',2:'a',5:'d',6:'a',8:'a'}));
  N.push(X.text('t1',24,230,'Em verde-claro: substantivos (servidores, ofício, presidente).\nEm preto: artigos (os, o) e adjetivo (novos), que acompanham o nome.','t'));return N}},
{label:'2. Verbo',title:'O verbo: tempo, modo, pessoa e voz',text:'<p><i>Entregaram</i> e <i>assinou</i> são <b>verbos</b>. Os dois estão no <b>pretérito perfeito do indicativo</b> (fato passado e certo), na voz ativa: <i>entregaram</i> na 3ª pessoa do plural, <i>assinou</i> na 3ª do singular. O verbo concorda com o sujeito: <i>os servidores entregaram</i>; <i>ele assinou</i>.</p>',
 scene:function(){var N=top(1,[0]);N=N.concat(scn('Os verbos da frase'));N=N.concat(words({3:'a',13:'a'}));
  N.push(X.text('t2',24,230,'entregaram: 3ª pessoa do plural, pretérito perfeito, indicativo.\nassinou: 3ª pessoa do singular, pretérito perfeito, indicativo.','t'));return N}},
{label:'3. Invariáveis',title:'Palavras que não flexionam',text:'<p><i>Ontem</i> é <b>advérbio</b> de tempo e <i>não</i> é advérbio de negação: modificam o verbo. <i>Ao</i> é a junção da <b>preposição</b> <i>a</i> com o artigo <i>o</i>. <i>Mas</i> é <b>conjunção</b> que liga as duas orações e dá ideia de oposição.</p>',
 scene:function(){var N=top(0,[1]);N=N.concat(scn('As invariáveis'));N=N.concat(words({4:'a',7:'a',9:'a',11:'a'}));
  N.push(X.text('t3',24,230,'ontem, não: advérbios. ao = a + o: preposição e artigo.\nmas: conjunção.','t'));return N}},
{label:'4. Pronomes',title:'Quem é "ele" e quem é "o"?',text:'<p><i>Ele</i> é pronome <b>pessoal reto</b> e retoma <i>o presidente</i>. O segundo <i>o</i> é pronome <b>oblíquo átono</b> e retoma <i>o ofício</i>: ele evita repetir a palavra. Ele fica <b>antes</b> do verbo (próclise) porque a palavra <i>não</i> o atrai.</p>',
 scene:function(){var N=top(2,[0,1]);N=N.concat(scn('Os pronomes'));N=N.concat(words({10:'a',12:'a',11:'d',13:'d'}));
  N.push(X.text('t4',24,230,'ele = o presidente (pessoal reto, sujeito).\no = o ofício (oblíquo átono, complemento).\nnão assinou: o pronome é puxado para antes do verbo\n(em preto: a palavra atrativa e o verbo).','t'));return N}},
{label:'5. Estrutura',title:'Dentro da palavra "servidores"',text:'<p>Pela análise mais comum, <i>servidores</i> tem <b>radical</b> <i>serv-</i> (ideia central, a mesma de <i>servir</i>), <b>vogal temática</b> <i>-i-</i>, <b>sufixo</b> <i>-dor</i> (quem pratica a ação) e <b>desinência</b> de plural <i>-es</i>. Servir virou servidor por <b>derivação sufixal</b>; o plural é só <b>flexão</b>.</p>',
 scene:function(){var N=top(3,[0,1,2]);N=N.concat(scn('Os elementos de uma palavra'));
  N.push(X.box('e1',34,124,130,58,'serv','a','radical'));
  N.push(X.box('e2',184,124,110,58,'i','n','vogal temática'));
  N.push(X.box('e3',314,124,130,58,'dor','n','sufixo'));
  N.push(X.box('e4',464,124,130,58,'es','n','desinência de plural'));
  N.push(X.text('t5',34,226,'servir > servidor: derivação sufixal (palavra nova).\nservidor > servidores: flexão (mesma palavra no plural).','t'));return N}},
{label:'6. Roteiro',title:'O roteiro que você leva para a prova',text:'<p>Diante de uma questão de gramática, faça quatro perguntas: <b>qual é a função da palavra na frase</b> (classe)? <b>Que tempo, modo e pessoa</b> tem o verbo? <b>A quem o pronome se refere</b> e onde ele está? <b>Como a palavra foi formada</b>: derivação, composição ou outro processo? A banca cobrou o tema em quatro questões das duas provas analisadas.</p>',
 scene:function(){var N=top(-1,[0,1,2,3]);N=N.concat(scn('Quatro perguntas'));
  N.push(X.pill('q1',40,116,'Classe: que função a palavra cumpre nesta frase?','a',380));
  N.push(X.pill('q2',40,152,'Verbo: qual é o tempo, o modo e a pessoa?','n',330));
  N.push(X.pill('q3',40,188,'Pronome: a quem se refere e onde fica?','n',310));
  N.push(X.pill('q4',40,224,'Formação: derivação, composição ou outro processo?','n',390));
  N.push(X.text('t6',40,280,'Treine nos desafios e nos exercícios.','t'));return N}}
];
K.explain({w:720,h:380,steps:S,alt:'Animação que analisa a frase fictícia Os novos servidores entregaram ontem o ofício ao presidente, mas ele não o assinou: classes das palavras, verbo, pronomes e estrutura da palavra servidores'});
})();
