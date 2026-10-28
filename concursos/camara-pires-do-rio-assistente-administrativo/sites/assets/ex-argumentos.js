(function(){
var K=window.K,X=K.X;
function top(act,done){
  var names=['Gênero','Sequência','Tese','Argumentos'],subs=['o que o texto é','como se organiza','o que defende','como sustenta'],N=[],i;
  for(i=0;i<4;i++){
    var c=i===act?'a':(done&&done.indexOf(i)>=0?'d':'m');
    N.push(X.box('f'+i,16+i*176,14,158,52,names[i],c,subs[i]));
    if(i<3)N.push(X.line('ar'+i,176+i*176,40,192+i*176,40,'',true));
  }
  return N;
}
function scn(title){return [X.zone('zs',16,86,688,282,title)]}
var S=[
{label:'0. O texto',title:'Um texto real da prova de Anápolis',text:'<p>Vamos ler como a Verbena lê. O texto é <b>A lógica do humor</b>, de Hélio Schwartsman, usado na prova de Anápolis 2024 (Texto 2). Em quatro passos você descobre o gênero, a sequência, a tese e o tipo de argumento.</p>',
 scene:function(){var N=top(-1);N=N.concat(scn('Texto 2, Anápolis 2024 (resumo das partes)'));
  N.push(X.box('x1',34,112,300,44,'Abertura','n','piada racista termina com polícia'));
  N.push(X.box('x2',34,168,300,44,'Meio','n','a lógica da piada, Kant e Bergson'));
  N.push(X.box('x3',34,224,300,44,'Fecho','n','o riso e a discriminação em conflito'));
  N.push(X.text('t0',370,150,'Perguntas que a banca fez\nsobre este texto:','t'));
  N.push(X.pill('q1',370,186,'Questão 04: qual é o gênero?','m',230));
  N.push(X.pill('q2',370,216,'Questão 05: qual é o tipo de argumento?','m',270));return N}},
{label:'1. Gênero',title:'Gênero: o que o texto é na vida social',text:'<p>Procure quatro pistas: <b>estrutura composicional</b> (título, assinatura, parágrafos), <b>objetivo</b> (opinar e convencer), <b>função social</b> (debater um tema no jornal) e <b>linguagem</b> (acessível). Tudo isso aponta para <b>artigo de opinião</b>, gabarito da questão 04.</p>',
 scene:function(){var N=top(0);N=N.concat(scn('Pistas do gênero'));
  N.push(X.box('g1',34,112,200,46,'Assinatura','n','colunista de jornal'));
  N.push(X.box('g2',254,112,200,46,'Ponto de vista','n','opina sobre fato do dia'));
  N.push(X.box('g3',474,112,200,46,'Linguagem','n','acessível ao leitor comum'));
  N.push(X.box('g4',254,200,200,52,'Artigo de opinião','a','e não artigo científico, manifesto ou resenha'));
  N.push(X.line('gl1',134,158,300,200,'a',true));N.push(X.line('gl2',354,158,354,200,'a',true));N.push(X.line('gl3',574,158,408,200,'a',true));
  N.push(X.text('t1',34,296,'Gênero responde: que texto é este, para quem e para quê?','t'));return N}},
{label:'2. Sequência',title:'Sequência: como o trecho é organizado',text:'<p>Dentro de um gênero cabem várias sequências. No artigo de Schwartsman há <b>exposição</b> (explica como funciona uma piada), uma pitada de <b>narração</b> (a notícia do show) e, no conjunto, predomina a <b>argumentação</b>: ele defende que o riso e o respeito entram em conflito.</p>',
 scene:function(){var N=top(1,[0]);N=N.concat(scn('Sequências presentes'));
  N.push(X.box('s1',34,116,200,50,'Narrativa','m','a notícia do show de humor'));
  N.push(X.box('s2',254,116,200,50,'Expositiva','m','explica a lógica da piada'));
  N.push(X.box('s3',474,116,200,50,'Argumentativa','a','defende o ponto de vista'));
  N.push(X.pill('s4',254,200,'Predomina a que sustenta a tese','a',230));
  N.push(X.text('t2',34,290,'Um gênero mistura sequências; a banca pergunta qual predomina.','t'));return N}},
{label:'3. Tese',title:'Tese: o ponto de vista defendido',text:'<p>A tese é o que o autor quer que você aceite. Aqui, ela aparece no fecho: <b>as piadas racistas colocam um problema moral</b>, mesmo que o riso seja inevitável. Todo o resto do texto é caminho até essa ideia.</p>',
 scene:function(){var N=top(2,[0,1]);N=N.concat(scn('Da abertura até a tese'));
  N.push(X.box('h1',34,116,200,46,'Pergunta','n','é engraçado gozar de minorias?'));
  N.push(X.box('h2',254,116,200,46,'Caminho','n','lógica da piada, alívio, anestesia'));
  N.push(X.box('h3',474,116,200,46,'Tese','a','as piadas racistas põem um problema moral'));
  N.push(X.line('hl1',234,139,254,139,'',true));N.push(X.line('hl2',454,139,474,139,'a',true));
  N.push(X.text('t3',34,230,'Dica: procure a ideia que o autor repete com outras palavras\ne que o texto não consegue abandonar.','t'));return N}},
{label:'4. Autoridade',title:'Argumento de autoridade: quem entende diz que sim',text:'<p>Nos parágrafos 4 e 5, Schwartsman convoca <b>Kant</b> (Crítica do juízo) e <b>Bergson</b> (O riso). Ele cita obra e trecho para reforçar que o riso tem dimensão emocional. Apoiar a tese em quem entende do assunto é <b>argumento de autoridade</b>, gabarito da questão 05.</p>',
 scene:function(){var N=top(3,[0,1,2]);N=N.concat(scn('Quem ele chama para sustentar a ideia'));
  N.push(X.box('a0',270,108,180,42,'Tese do trecho','n','o riso tem lado emocional'));
  N.push(X.box('a1',70,184,230,66,'Kant','a','Crítica do juízo\nriso: tensão que vira nada'));
  N.push(X.box('a2',420,184,230,66,'Bergson','a','O riso\nanestesia do coração'));
  N.push(X.line('al1',330,150,185,190,'a',true));N.push(X.line('al2',390,150,535,190,'a',true));
  N.push(X.text('t4',34,296,'Marcas: nome do especialista, título da obra, aspas ou "segundo".','t'));return N}},
{label:'5. Outros tipos',title:'Os outros tipos que a banca cobra',text:'<p>Se o autor trouxesse um <b>caso</b>, seria <b>exemplificação</b>. Se aproximasse duas realidades, seria <b>comparação</b> (como em Morrinhos 2025, o sistema flutuante "mais eficaz do que" as placas em terra). Se ligasse motivo a efeito, <b>causa e consequência</b>; se usasse números, <b>dados</b>; se apelasse ao passado, <b>base histórica</b>.</p>',
 scene:function(){var N=top(3,[0,1,2]);N=N.concat(scn('Pergunta-chave de cada tipo'));
  N.push(X.box('o1',34,112,200,46,'Autoridade','a','quem sabe diz?'));
  N.push(X.box('o2',254,112,200,46,'Exemplificação','n','qual caso ilustra?'));
  N.push(X.box('o3',474,112,200,46,'Comparação','n','com o que se compara?'));
  N.push(X.box('o4',34,172,200,46,'Causa e consequência','n','o que leva a quê?'));
  N.push(X.box('o5',254,172,200,46,'Dados e evidências','n','quais números provam?'));
  N.push(X.box('o6',474,172,200,46,'Base histórica','n','o que o passado mostra?'));
  N.push(X.text('t5',34,260,'Leia a marca linguística, nomeie a pergunta-chave e marque.','t'));return N}},
{label:'6. Fecho',title:'O roteiro que você leva para a prova',text:'<p>Na hora H: (1) leia o comando, (2) descubra o <b>gênero</b> pelas pistas, (3) veja qual <b>sequência</b> predomina, (4) localize a <b>tese</b>, (5) nomeie o <b>argumento</b> pela pergunta-chave e (6) elimine alternativas que <b>extrapolam</b> o texto.</p>',
 scene:function(){var N=top(-1,[0,1,2,3]);N=N.concat(scn('Roteiro de leitura'));
  N.push(X.pill('r1',40,116,'1. Comando: o que pede?','a',200));
  N.push(X.pill('r2',40,148,'2. Gênero: estrutura, objetivo, função','n',290));
  N.push(X.pill('r3',40,180,'3. Sequência que predomina','n',210));
  N.push(X.pill('r4',40,212,'4. Tese e argumentos','n',190));
  N.push(X.pill('r5',40,244,'5. Elimine o que extrapola o texto','m',270));
  N.push(X.text('t6',360,150,'Gênero e argumento apareceram nas provas\nde Anápolis e Morrinhos. Treine nos desafios.','t'));return N}}
];
K.explain({w:720,h:380,steps:S,alt:'Animação que analisa um texto real da prova de Anápolis: gênero, sequência, tese e tipo de argumento'});
})();
