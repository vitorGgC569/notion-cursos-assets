(function(){
var K=window.K,X=K.X;
function top(act,done){
  var names=['Legalidade','Impessoalidade','Moralidade','Publicidade','Eficiência'],subs=['L','I','M','P','E'],N=[],i;
  for(i=0;i<5;i++){
    var c=i===act?'a':(done&&done.indexOf(i)>=0?'d':'m');
    N.push(X.box('f'+i,16+i*139,14,128,52,names[i],c,subs[i]));
  }
  return N;
}
function scn(title){return [X.zone('zs',16,86,688,282,title)]}
var S=[
{label:'0. O caso',title:'Um caso do dia a dia de uma Câmara',text:'<p>Marta é servidora do protocolo de uma Câmara <b>fictícia</b>. Um cidadão, seu Joaquim, pede uma certidão. Em seguida chega o amigo do chefe pedindo para ser atendido primeiro e oferecendo um presente. Vamos passar a conduta de Marta pelos cinco filtros do <b>art. 37 da Constituição</b>: LIMPE.</p>',
 scene:function(){var N=top(-1);N=N.concat(scn('Cena: balcão do protocolo'));
  N.push(X.box('c1',34,116,190,52,'Seu Joaquim','n','pede uma certidão'));
  N.push(X.box('c2',34,188,190,52,'Amigo do chefe','n','quer passar na frente\ne oferece um presente'));
  N.push(X.box('c3',280,152,150,52,'Marta','a','servidora do protocolo'));
  N.push(X.line('cl1',224,142,280,170,'',true));N.push(X.line('cl2',224,214,280,186,'',true));
  N.push(X.text('t0',470,150,'Cada passo da história\nacende um princípio.','t'));return N}},
{label:'1. Legalidade',title:'Legalidade: só faço o que a norma permite',text:'<p>Marta primeiro confere se a certidão está prevista e como se emite. Para o servidor público vale o que a <b>lei permite ou determina</b>. Ela não pode inventar um documento, cobrar uma taxa que ninguém criou ou dispensar uma exigência que a norma impõe.</p>',
 scene:function(){var N=top(0);N=N.concat(scn('Do pedido ao ato, pela norma'));
  N.push(X.box('l1',34,126,170,52,'Pedido','n','certidão de seu Joaquim'));
  N.push(X.box('l2',270,126,170,52,'Norma','a','prevê a certidão\ne o procedimento'));
  N.push(X.box('l3',500,126,170,52,'Ato','n','emitido como a norma manda'));
  N.push(X.line('ll1',204,152,270,152,'',true));N.push(X.line('ll2',440,152,500,152,'a',true));
  N.push(X.text('t1',34,250,'Particular: pode o que a lei não proíbe. Administrador: só o que a lei permite.','t'));return N}},
{label:'2. Impessoalidade',title:'Impessoalidade: sem favorito e sem perseguição',text:'<p>O amigo do chefe pede prioridade. Marta mantém a <b>ordem de chegada</b>: o critério vale para todos, sem favorecer quem ela conhece nem prejudicar quem ela não suporta. A conduta é do órgão, não de simpatias pessoais.</p>',
 scene:function(){var N=top(1,[0]);N=N.concat(scn('A fila é uma só'));
  N.push(X.pill('i1',60,126,'1º seu Joaquim','n',150));N.push(X.pill('i2',60,158,'2º dona Lúcia','n',150));N.push(X.pill('i3',60,190,'3º o amigo do chefe','a',190));
  N.push(X.box('i4',380,126,280,58,'Regra igual para todos','a','ordem de chegada\nmesmos documentos e prazos'));
  N.push(X.text('t2',380,230,'A obra ou o serviço é do órgão,\nnão do político. Nada de nome ou foto\nde autoridade na publicidade oficial.','t'));return N}},
{label:'3. Moralidade',title:'Moralidade: não basta ser legal, é preciso ser honesto',text:'<p>O amigo oferece um presente "pela gentileza". Marta recusa. O Código de Ética (Decreto 1.171/1994) manda decidir não só entre o legal e o ilegal, mas <b>entre o honesto e o desonesto</b>, e veda receber vantagem para cumprir a missão.</p>',
 scene:function(){var N=top(2,[0,1]);N=N.concat(scn('Duas respostas possíveis'));
  N.push(X.box('m1',34,116,300,64,'Aceitar o presente','m','mesmo "sem influenciar", é vantagem\nvedada ao servidor (item XV, g)'));
  N.push(X.box('m2',370,116,300,64,'Recusar e registrar','a','conduta proba, reta, leal e justa\n(item XIV, c)'));
  N.push(X.text('t3',34,230,'Regra de ouro: entre o legal e o honesto,\no servidor escolhe o honesto.','t'));return N}},
{label:'4. Publicidade',title:'Publicidade: os atos são públicos',text:'<p>Marta protocola o pedido, entrega o número ao cidadão e o andamento fica registrado e consultável. A <b>regra é a divulgação</b> e o sigilo é exceção, só quando imprescindível à segurança da sociedade e do Estado. A publicidade também é requisito de eficácia do ato.</p>',
 scene:function(){var N=top(3,[0,1,2]);N=N.concat(scn('Registro e divulgação'));
  N.push(X.box('p1',34,126,170,52,'Protocolo','n','número entregue ao cidadão'));
  N.push(X.box('p2',270,126,170,52,'Andamento','a','registrado e consultável'));
  N.push(X.box('p3',500,126,170,52,'Resultado','n','divulgado ao interessado'));
  N.push(X.line('pl1',204,152,270,152,'',true));N.push(X.line('pl2',440,152,500,152,'a',true));
  N.push(X.text('t4',34,250,'Regra: publicidade. Exceção: sigilo imprescindível à segurança\nda sociedade e do Estado. Sem divulgação, o controle social não funciona.','t'));return N}},
{label:'5. Eficiência',title:'Eficiência: resultado com qualidade e economia',text:'<p>Para a fila diminuir, Marta propõe padronizar o modelo da certidão e eliminar um carimbo repetido. O prazo cai de 15 para 5 dias, com <b>menos retrabalho e mais qualidade</b>. Eficiência foi incluída no caput do art. 37 pela Emenda Constitucional 19/1998.</p>',
 scene:function(){var N=top(4,[0,1,2,3]);N=N.concat(scn('Antes e depois'));
  N.push(X.box('e1',60,126,250,64,'Antes','m','vários carimbos, modelo livre\nprazo de 15 dias'));
  N.push(X.box('e2',410,126,250,64,'Depois','a','modelo padronizado, um carimbo\nprazo de 5 dias'));
  N.push(X.line('el1',310,158,410,158,'a',true));
  N.push(X.text('t5',34,250,'Eficiência não substitui a lei: a Câmara cumpre a lei\ne também entrega bom resultado.','t'));return N}},
{label:'6. Fecho',title:'O roteiro que você leva para a prova',text:'<p>Diante de uma situação, faça cinco perguntas: <b>há lei que autorize</b> (L)? <b>Trato todos igual</b> (I)? <b>É honesto</b> (M)? <b>Está público</b> (P)? <b>Entrega resultado</b> (E)? A banca costuma descrever uma conduta e pedir qual princípio foi respeitado ou violado.</p>',
 scene:function(){var N=top(-1,[0,1,2,3,4]);N=N.concat(scn('Cinco perguntas'));
  N.push(X.pill('r1',40,116,'L: há lei que autorize esse ato?','a',230));
  N.push(X.pill('r2',40,148,'I: estou tratando todos da mesma forma?','n',290));
  N.push(X.pill('r3',40,180,'M: é honesto e de boa-fé?','n',210));
  N.push(X.pill('r4',40,212,'P: o ato é divulgado, e o sigilo é exceção?','n',310));
  N.push(X.pill('r5',40,244,'E: entrega bom resultado com economia?','n',290));
  N.push(X.text('t6',400,150,'A Verbena cobra o artigo 37 e a governança\nnas duas provas que analisei.\nTreine nos desafios.','t'));return N}}
];
K.explain({w:720,h:380,steps:S,alt:'Animação que passa a conduta de uma servidora fictícia pelos cinco princípios do artigo 37: legalidade, impessoalidade, moralidade, publicidade e eficiência'});
})();
