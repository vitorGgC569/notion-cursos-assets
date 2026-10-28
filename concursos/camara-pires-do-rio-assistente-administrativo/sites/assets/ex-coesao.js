(function(){
var K=window.K,X=K.X;
function top(act,done){
  var names=['Referência','Conectivos','Coerência','Variação'],subs=['coesão referencial','coesão sequencial','sentido do todo','registro e contexto'],N=[],i;
  for(i=0;i<4;i++){
    var c=i===act?'a':(done&&done.indexOf(i)>=0?'d':'m');
    N.push(X.box('f'+i,16+i*174,14,164,52,names[i],c,subs[i]));
  }
  return N;
}
function scn(title){return [X.zone('zs',16,86,688,282,title)]}
var S=[
{label:'0. O texto',title:'Um aviso curto de uma Câmara fictícia',text:'<p>Vamos analisar três frases de um comunicado <b>fictício</b>. Em cada passo, você vai ver um mecanismo que prende as frases umas às outras, ou que dá sentido ao conjunto. É o que a banca pergunta quando cobra coesão, coerência e variação.</p>',
 scene:function(){var N=top(-1);N=N.concat(scn('Comunicado'));
  N.push(X.box('s1',34,112,640,48,'1','n','A Câmara convidou os moradores para a audiência pública.'));
  N.push(X.box('s2',34,172,640,48,'2','n','Esperou por duas horas, mas eles não vieram.'));
  N.push(X.box('s3',34,232,640,48,'3','n','Portanto, o debate foi adiado.'));
  return N}},
{label:'1. Anáfora',title:'Anáfora: a palavra que aponta para trás',text:'<p>Em "<b>eles</b> não vieram", o pronome retoma <b>os moradores</b>, que já apareceram na frase 1. Retomar o que já foi dito é a <b>anáfora</b>. Na prova, pergunte sempre: quem é retomado? Foi assim com "ambas" em Anápolis 2024, questão 10.</p>',
 scene:function(){var N=top(0);N=N.concat(scn('Eles = quem?'));
  N.push(X.box('a1',34,130,250,56,'os moradores','n','frase 1'));
  N.push(X.box('a2',420,130,250,56,'eles','a','frase 2, pronome'));
  N.push(X.line('al1',420,158,284,158,'a',true));
  N.push(X.text('ta',34,240,'A seta aponta para trás: é anáfora.\nSe apontasse para a frente (\"Só digo isto: ...\"), seria catáfora.','t'));return N}},
{label:'2. Elipse',title:'Elipse: o termo que ficou de fora',text:'<p>Em "<b>Esperou</b> por duas horas", ninguém escreveu o sujeito. Mesmo assim, você sabe que foi <b>a Câmara</b>. Esse termo omitido, mas recuperável pelo contexto, é a <b>elipse</b>. Em Morrinhos 2025, questão 7, a elipse era nominal: "os [rios] da Amazônia".</p>',
 scene:function(){var N=top(0);N=N.concat(scn('Quem esperou?'));
  N.push(X.box('e1',34,130,250,56,'[A Câmara]','m','termo omitido'));
  N.push(X.box('e2',420,130,250,56,'Esperou...','a','verbo sem sujeito escrito'));
  N.push(X.line('el1',284,158,420,158,'a',true));
  N.push(X.text('te',34,240,'A língua evita repetir o que o leitor já entende.\nO verbo no singular ajuda a recuperar o sujeito.','t'));return N}},
{label:'3. Conectivos',title:'Conectivos: a relação entre as ideias',text:'<p>O "<b>mas</b>" marca <b>oposição</b>: esperaram, e eles não vieram. O "<b>portanto</b>" marca <b>conclusão</b>: por causa disso, o debate foi adiado. A questão da banca costuma pedir o valor do conectivo: oposição, causa, conclusão, concessão, condição, finalidade.</p>',
 scene:function(){var N=top(1,[0]);N=N.concat(scn('Ligações'));
  N.push(X.box('c1',34,116,300,50,'Esperou...','n','frase 2, parte 1'));
  N.push(X.pill('cm',350,128,'mas = oposição','a',160));
  N.push(X.box('c2',520,116,160,50,'não vieram','n','parte 2'));
  N.push(X.box('c3',34,200,300,50,'Esperou, mas não vieram','n','fato'));
  N.push(X.pill('cp',350,212,'portanto = conclusão','a',190));
  N.push(X.box('c4',560,200,120,50,'adiado','a','consequência'));
  N.push(X.text('tc',34,280,'Trocar o conectivo muda a lógica: \"portanto\" no lugar de \"mas\" seria erro.','t'));return N}},
{label:'4. Coerência',title:'Coerência: o texto faz sentido?',text:'<p>As três frases tratam da <b>mesma audiência</b> e cada uma <b>acrescenta algo</b>: convite, ausência, adiamento. Não há contradição. Isso é coerência. Compare: "A sessão começou às 9 horas. <b>Portanto</b>, o gato subiu no telhado." Há conectivo (coesão), mas nenhuma lógica (coerência).</p>',
 scene:function(){var N=top(2,[0,1]);N=N.concat(scn('Dois textos'));
  N.push(X.box('k1',34,116,310,80,'Comunicado','a','mesmo assunto, ideias que avançam\nconvite, ausência, adiamento'));
  N.push(X.box('k2',380,116,310,80,'"... Portanto, o gato subiu no telhado"','m','conectivo sem lógica\nhá coesão, não há coerência'));
  N.push(X.text('tk',34,236,'Coesão é a costura visível. Coerência é o sentido do conjunto.\nUm texto pode ter uma sem a outra.','t'));return N}},
{label:'5. Variação',title:'Variação: a mesma ideia, outro jeito de falar',text:'<p>Se a Câmara escrevesse num cartaz de bairro, ela poderia dizer: "o povo <b>num</b> apareceu". É a mesma ideia, com outro <b>registro</b>. Para a Verbena, o uso que foge à norma por causa do grupo social é <b>sociocultural</b>; o que muda conforme a situação formal ou informal é <b>estilístico</b>. Ler a pergunta ajuda a escolher.</p>',
 scene:function(){var N=top(3,[0,1,2]);N=N.concat(scn('Dois registros'));
  N.push(X.box('v1',34,116,310,70,'Formal (ofício, ata)','a','Os moradores não compareceram\nà audiência.'));
  N.push(X.box('v2',380,116,310,70,'Informal (conversa)','n','O povo num apareceu\nna audiência.'));
  N.push(X.text('tv',34,226,'Fatores: tempo (histórica), lugar (geográfica),\ngrupo social (sociocultural), situação (estilística).','t'));return N}},
{label:'6. Fecho',title:'O roteiro que você leva para a prova',text:'<p>Diante de uma questão deste módulo, faça quatro perguntas: <b>quem é retomado</b> (anáfora, elipse)? <b>Que relação o conectivo cria</b>? <b>O texto faz sentido no todo</b>? <b>O que muda: tempo, lugar, grupo ou situação</b>? A Verbena cobrou isso nas duas provas anteriores.</p>',
 scene:function(){var N=top(-1,[0,1,2,3]);N=N.concat(scn('Quatro perguntas'));
  N.push(X.pill('r1',40,120,'Quem está sendo retomado (anáfora, elipse)?','a',360));
  N.push(X.pill('r2',40,156,'Que relação o conectivo cria?','n',270));
  N.push(X.pill('r3',40,192,'O texto faz sentido como um todo?','n',300));
  N.push(X.pill('r4',40,228,'Variação: tempo, lugar, grupo social ou situação?','n',400));
  N.push(X.text('t6',470,150,'Treine no desafio\ne nos exercícios.','t'));return N}}
];
K.explain({w:720,h:380,steps:S,alt:'Animação que analisa um comunicado fictício de uma Câmara: anáfora, elipse, conectivos, coerência e variação linguística'});
})();
