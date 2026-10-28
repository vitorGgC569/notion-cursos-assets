(function(){
var K=window.K,X=K.X;
function top(act,done){
  var names=['Vírgula','Acento','Hífen','Palavras'],subs=['sujeito e verbo, aposto','hiato, ditongo, trema','prefixo, h e vogal','há, por que, a fim de'],N=[],i;
  for(i=0;i<4;i++){
    var c=i===act?'a':(done&&done.indexOf(i)>=0?'d':'m');
    N.push(X.box('f'+i,16+i*174,14,162,52,names[i],c,subs[i]));
  }
  return N;
}
function scn(title){return [X.zone('zs',16,86,688,282,title)]}
var S=[
{label:'0. O caso',title:'O rascunho de um aviso fictício',text:'<p>A <b>Câmara Municipal de Vila Exemplo</b>, que é <b>fictícia</b>, escreveu um aviso aos servidores com deslizes de <b>pontuação</b>, <b>acentuação</b> e <b>ortografia</b>. A revisão corrige frase por frase. Cada passo mostra o erro, a regra e a forma correta.</p>',
 scene:function(){var N=top(-1);N=N.concat(scn('Cena: a revisão do aviso'));
  N.push(X.box('c1',34,126,170,52,'Rascunho','n','frases com deslizes'));
  N.push(X.box('c2',270,126,170,52,'Revisão','a','regra por regra'));
  N.push(X.box('c3',500,126,170,52,'Aviso','d','pronto para publicar'));
  N.push(X.line('cl1',204,152,270,152,'',true));N.push(X.line('cl2',440,152,500,152,'a',true));
  N.push(X.text('t0',34,250,'Cada passo acende um bloco: vírgula, acento, hífen e palavras parecidas.','t'));return N}},
{label:'1. Sujeito e verbo',title:'Vírgula entre sujeito e verbo: nunca sozinha',text:'<p>O rascunho diz: <b>"Os servidores da Câmara, receberam o aviso"</b>. A vírgula separa o <b>sujeito</b> ("os servidores da Câmara") do <b>verbo</b> ("receberam"). Sem nenhum termo intercalado, não pode haver vírgula ali. Forma correta: <b>"Os servidores da Câmara receberam o aviso"</b>.</p>',
 scene:function(){var N=top(0);N=N.concat(scn('Sujeito e verbo ficam juntos'));
  N.push(X.box('v1',34,120,230,52,'Os servidores da Câmara','a','sujeito'));
  N.push(X.box('v2',284,120,170,52,'receberam','d','verbo'));
  N.push(X.box('v3',474,120,196,52,'o aviso','n','complemento'));
  N.push(X.text('t1',34,226,'Errado: "Os servidores da Câmara, receberam o aviso".','t'));
  N.push(X.text('t1b',34,252,'Vírgula entre sujeito e verbo, ou entre verbo e complemento, só em par.','t'));return N}},
{label:'2. Par de vírgulas',title:'Aposto e intercalação levam duas vírgulas',text:'<p>Outra frase: <b>"O vereador Rui, presidente da Comissão assinou o parecer"</b>. "Presidente da Comissão" é um <b>aposto explicativo</b> e precisa de <b>duas</b> vírgulas, uma antes e outra depois. Forma correta: <b>"O vereador Rui, presidente da Comissão, assinou o parecer"</b>. Uma vírgula só quebra a frase.</p>',
 scene:function(){var N=top(0);N=N.concat(scn('Um termo intercalado, duas vírgulas'));
  N.push(X.box('a1',34,120,170,52,'O vereador Rui','n','sujeito'));
  N.push(X.box('a2',224,120,240,52,', presidente da Comissão ,','a','aposto: par de vírgulas'));
  N.push(X.box('a3',484,120,186,52,'assinou o parecer','d','predicado'));
  N.push(X.text('t2',34,226,'Errado: "Rui, presidente da Comissão assinou".','t'));
  N.push(X.text('t2b',34,252,'Conjunção no meio também: "O prazo, porém, terminou".','t'));return N}},
{label:'3. Explicativa ou restritiva',title:'As vírgulas mudam o sentido',text:'<p>Compare: <b>"Os servidores, que chegaram cedo, ganharam folga"</b> e <b>"Os servidores que chegaram cedo ganharam folga"</b>. Com vírgulas, a oração é <b>explicativa</b>: todos chegaram cedo e todos ganharam folga. Sem vírgulas, é <b>restritiva</b>: só os que chegaram cedo ganharam. Tirar as vírgulas muda o sentido.</p>',
 scene:function(){var N=top(0);N=N.concat(scn('Explicativa × restritiva'));
  N.push(X.box('e1',34,120,300,56,'com vírgulas: explicativa','d','todos chegaram cedo'));
  N.push(X.box('e2',370,120,300,56,'sem vírgulas: restritiva','a','só alguns chegaram cedo'));
  N.push(X.text('t3',34,226,'Quando a banca diz "a retirada das vírgulas altera o sentido", pense nisto.','t'));
  N.push(X.text('t3b',34,252,'Pergunta-teste: a informação vale para todos ou só para um grupo?','t'));return N}},
{label:'4. Acento',title:'Hiato, ditongo aberto e trema',text:'<p>O aviso traz <b>"idéia"</b>, <b>"vôo"</b>, <b>"freqüente"</b> e <b>"eles contem"</b>. Com o <b>Acordo Ortográfico</b>, o ditongo aberto das paroxítonas perdeu o acento (<b>ideia</b>), o hiato oo também (<b>voo</b>) e o trema foi abolido (<b>frequente</b>). Já o plural de "conter" leva circunflexo: <b>"eles contêm"</b>.</p>',
 scene:function(){var N=top(1,[0]);N=N.concat(scn('Acordo Ortográfico em quatro palavras'));
  N.push(X.box('x1',34,120,150,52,'ideia','d','ei: sem acento'));
  N.push(X.box('x2',194,120,150,52,'voo','d','oo: sem acento'));
  N.push(X.box('x3',354,120,150,52,'frequente','d','trema abolido'));
  N.push(X.box('x4',514,120,156,52,'eles contêm','a','plural: circunflexo'));
  N.push(X.text('t4',34,226,'Errado: "idéia", "vôo", "freqüente", "eles contem".','t'));
  N.push(X.text('t4b',34,252,'Mantêm acento: herói, papéis, saída, baú, país.','t'));return N}},
{label:'5. Hífen',title:'Hífen: prefixo, h e vogal',text:'<p>O rascunho escreve <b>"ex presidente"</b> e <b>"anti-religioso"</b>. O prefixo <b>ex-</b> (estado anterior) leva sempre hífen: <b>ex-presidente</b>. Já prefixo terminado em vogal diante de <b>r</b> ou <b>s</b> junta e dobra a consoante: <b>antirreligioso</b>. Diante de <b>h</b>, o hífen volta: <b>anti-higiênico</b>.</p>',
 scene:function(){var N=top(2,[0,1]);N=N.concat(scn('Três regras do hífen'));
  N.push(X.box('h1',34,120,200,52,'ex-presidente','d','ex-: sempre hífen'));
  N.push(X.box('h2',254,120,200,52,'antirreligioso','a','vogal + r: junta e dobra'));
  N.push(X.box('h3',474,120,196,52,'anti-higiênico','n','antes de h: hífen'));
  N.push(X.text('t5',34,226,'Errado: "ex presidente" e "anti-religioso".','t'));
  N.push(X.text('t5b',34,252,'Vogal diferente junta: autoescola, extraescolar.','t'));return N}},
{label:'6. Palavras',title:'Há, por que e a fim de',text:'<p>Por fim, o aviso diz <b>"A dois anos a Câmara não faz concurso, porque?"</b>. Tempo passado pede <b>há</b>: <b>"Há dois anos"</b>. A pergunta direta pede <b>por que</b> ou, no fim da frase, <b>por quê</b>. E <b>a fim de</b> (finalidade) não se confunde com <b>afim</b> (semelhante): <b>"cargos afins"</b>.</p>',
 scene:function(){var N=top(3,[0,1,2]);N=N.concat(scn('Palavras parecidas'));
  N.push(X.box('p1',34,120,200,52,'Há dois anos','d','tempo passado'));
  N.push(X.box('p2',254,120,200,52,'por que / por quê','a','pergunta'));
  N.push(X.box('p3',474,120,196,52,'a fim de','n','finalidade'));
  N.push(X.text('t6',34,226,'Errado: "A dois anos" e "porque?" no fim da pergunta.','t'));
  N.push(X.text('t6b',34,252,'Daqui a dois anos: futuro, sem h.','t'));return N}}
];
K.explain({w:720,h:380,steps:S,alt:'Animação que revisa o rascunho de um aviso de uma Câmara fictícia, frase por frase: vírgula entre sujeito e verbo, par de vírgulas no aposto, oração explicativa e restritiva, acentos e trema pelo Acordo Ortográfico, hífen nos prefixos e palavras parecidas como há, por que e a fim de'});
})();
