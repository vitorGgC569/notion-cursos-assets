(function(){
var K=window.K,X=K.X;
function top(act,done){
  var names=['Ativa','Pedido','Sigilo','LGPD'],subs=['divulgar sem pedir','prazo e recurso','graus e informação pessoal','dados pessoais'],N=[],i;
  for(i=0;i<4;i++){
    var c=i===act?'a':(done&&done.indexOf(i)>=0?'d':'m');
    N.push(X.box('f'+i,16+i*174,14,162,52,names[i],c,subs[i]));
  }
  return N;
}
function scn(title){return [X.zone('zs',16,86,688,282,title)]}
var S=[
{label:'0. O caso',title:'Um cidadão e a Câmara de Vila Exemplo',text:'<p>A <b>Câmara Municipal de Vila Exemplo</b>, que é <b>fictícia</b>, recebe a visita de uma cidadã, Marina. Ela quer saber quanto a Câmara gastou com diárias em 2026. O caso percorre a <b>Lei de Acesso à Informação</b> e as <b>noções da LGPD</b>: o que a Câmara deve divulgar sozinha, como responde ao pedido, o que pode ficar em sigilo e o que protege os dados das pessoas.</p>',
 scene:function(){var N=top(-1);N=N.concat(scn('Cena: a pergunta de Marina'));
  N.push(X.box('c1',34,126,170,52,'Marina','n','quer saber os gastos'));
  N.push(X.box('c2',270,126,170,52,'Câmara','a','tem o dever de informar'));
  N.push(X.box('c3',500,126,170,52,'Resposta','d','dentro da lei'));
  N.push(X.line('cl1',204,152,270,152,'',true));N.push(X.line('cl2',440,152,500,152,'a',true));
  N.push(X.text('t0',34,250,'Cada passo acende um bloco: transparência ativa, pedido, sigilo e LGPD.','t'));return N}},
{label:'1. Transparência ativa',title:'A Câmara divulga sem esperar pedido',text:'<p>O art. 8º manda divulgar, <b>independentemente de requerimentos</b>, informações de interesse coletivo ou geral, em <b>local de fácil acesso</b> e, em especial, nos <b>sítios oficiais da internet</b>. O mínimo inclui o <b>registro das despesas</b>, as licitações e os contratos, os repasses e as respostas a perguntas frequentes. Se as diárias já estão no sítio, Marina nem precisa pedir. Isso é <b>transparência ativa</b>.</p>',
 scene:function(){var N=top(0);N=N.concat(scn('Divulgar por iniciativa própria'));
  N.push(X.box('a1',34,120,200,52,'Sítio oficial','a','despesas, contratos'));
  N.push(X.box('a2',254,120,200,52,'Sem requerimento','d','art. 8º, caput'));
  N.push(X.box('a3',474,120,196,52,'Município pequeno','n','até 10 mil hab.'));
  N.push(X.text('t1',34,226,'Município com até 10 mil habitantes: dispensado do sítio, mas divulga em tempo real a execução orçamentária e financeira.','t'));
  N.push(X.text('t1b',34,252,'O que depende de pedido é a transparência passiva.','t'));return N}},
{label:'2. O pedido',title:'Pedido sem justificar o motivo',text:'<p>As diárias não estão no sítio. Marina faz o <b>pedido</b> por qualquer meio legítimo, informando sua <b>identificação</b> e a <b>especificação</b> da informação. A Câmara <b>não pode exigir o motivo</b> (art. 10, §3º), e o serviço de busca e de fornecimento é <b>gratuito</b>, salvo o custo da reprodução de documentos (art. 12). É a <b>transparência passiva</b>.</p>',
 scene:function(){var N=top(1);N=N.concat(scn('Pedido de acesso'));
  N.push(X.box('p1',34,120,200,52,'Identificação','d','quem pede'));
  N.push(X.box('p2',254,120,200,52,'Especificação','d','o que pede'));
  N.push(X.box('p3',474,120,196,52,'Motivo','m','não pode ser exigido'));
  N.push(X.text('t2',34,226,'Errado: negar o pedido porque a cidadã não disse para que quer a informação.','t'));
  N.push(X.text('t2b',34,252,'Gratuito, com ressarcimento só do custo de cópias e materiais.','t'));return N}},
{label:'3. Prazo',title:'Imediato, ou até 20 dias mais 10',text:'<p>Se a informação estiver disponível, o acesso é <b>imediato</b>. Se não, a Câmara tem até <b>20 dias</b> para responder (art. 11, §1º), prorrogáveis por mais <b>10 dias</b>, com <b>justificativa expressa</b> comunicada a Marina (art. 11, §2º). Na resposta, a Câmara comunica a data, o local e o modo de consultar ou obter a cópia, ou as razões da recusa, ou que não tem a informação.</p>',
 scene:function(){var N=top(1);N=N.concat(scn('O relógio do pedido'));
  N.push(X.box('r1',34,120,150,52,'Imediato','d','se já disponível'));
  N.push(X.box('r2',204,120,150,52,'20 dias','a','art. 11, §1º'));
  N.push(X.box('r3',374,120,150,52,'+ 10 dias','n','justificar'));
  N.push(X.box('r4',544,120,126,52,'Resposta','d','data, local, modo'));
  N.push(X.text('t3',34,226,'Prazo que a banca cobra: 20 mais 10 dias.','t'));
  N.push(X.text('t3b',34,252,'Sem justificativa, a prorrogação não vale.','t'));return N}},
{label:'4. Negativa e recurso',title:'Negou? Cabe recurso em 10 dias',text:'<p>Suponha que a Câmara <b>negue</b> o acesso. Marina tem direito ao <b>inteiro teor</b> da decisão de negativa (art. 14) e pode <b>recorrer em 10 dias</b>, a contar da ciência, à <b>autoridade hierarquicamente superior</b> (art. 15). Essa autoridade se manifesta em <b>5 dias</b>. A negativa sem fundamentação sujeita o responsável a medidas disciplinares (art. 7º, §4º).</p>',
 scene:function(){var N=top(1,[0]);N=N.concat(scn('Da negativa ao recurso'));
  N.push(X.box('n1',34,120,170,52,'Negativa','n','com fundamento'));
  N.push(X.box('n2',224,120,200,52,'Recurso em 10 dias','a','art. 15'));
  N.push(X.box('n3',444,120,226,52,'Autoridade superior','d','decide em 5 dias'));
  N.push(X.line('nl1',204,146,224,146,'',true));N.push(X.line('nl2',424,146,444,146,'',true));
  N.push(X.text('t4',34,226,'Errado: recorrer à própria autoridade que negou, ou em 5 dias.','t'));
  N.push(X.text('t4b',34,252,'A CGU só atua para o Poder Executivo Federal.','t'));return N}},
{label:'5. Sigilo e dado pessoal',title:'Sigilo é exceção, e tem prazo',text:'<p>E se o pedido fosse sobre um documento <b>sigiloso</b>? A informação pode ser <b>classificada</b> como <b>ultrassecreta (25 anos)</b>, <b>secreta (15 anos)</b> ou <b>reservada (5 anos)</b>, prazos máximos contados da produção (art. 24). Já a <b>informação pessoal</b> sobre intimidade e vida privada tem acesso restrito por até <b>100 anos</b>, <b>independentemente de classificação</b> (art. 31). Documento que mostra violação de direitos humanos não pode ter acesso restrito (art. 21).</p>',
 scene:function(){var N=top(2,[0,1]);N=N.concat(scn('Graus de sigilo e informação pessoal'));
  N.push(X.box('s1',34,120,150,52,'Ultrassecreta','a','25 anos'));
  N.push(X.box('s2',204,120,150,52,'Secreta','a','15 anos'));
  N.push(X.box('s3',374,120,150,52,'Reservada','a','5 anos'));
  N.push(X.box('s4',544,120,126,52,'Pessoal','d','até 100 anos'));
  N.push(X.text('t5',34,226,'Prazos de sigilo: da produção. Informação pessoal: 100 anos, sem classificar.','t'));
  N.push(X.text('t5b',34,252,'Quanto maior o risco, maior o prazo: 25, 15 e 5 anos.','t'));return N}},
{label:'6. LGPD',title:'Se o documento tem dados de pessoas',text:'<p>A lista de diárias traz nomes e cargos. Entra a <b>LGPD</b>: a Câmara, como <b>controladora</b>, trata <b>dados pessoais</b> com <b>finalidade</b>, <b>necessidade</b> e <b>segurança</b>, e o <b>titular</b> tem direitos, como <b>acesso</b> e <b>correção</b> (art. 18). A LGPD <b>não revoga</b> a LAI: o art. 23, §2º, diz que ela não dispensa os órgãos públicos de instituir as autoridades da LAI. A resposta de Marina vem com a informação pública e a proteção do que é pessoal.</p>',
 scene:function(){var N=top(3,[0,1,2]);N=N.concat(scn('LAI e LGPD convivem'));
  N.push(X.box('g1',34,120,200,52,'LAI','a','abre a informação pública'));
  N.push(X.box('g2',254,120,200,52,'LGPD','a','protege o dado pessoal'));
  N.push(X.box('g3',474,120,196,52,'Titular','d','acesso e correção'));
  N.push(X.text('t6',34,226,'Controlador decide sobre o tratamento; operador trata em nome dele.','t'));
  N.push(X.text('t6b',34,252,'Encarregado: canal entre a Câmara, os titulares e a ANPD.','t'));return N}}
];
K.explain({w:720,h:380,steps:S,alt:'Animação que acompanha o pedido de uma cidadã a uma Câmara fictícia: transparência ativa, pedido sem justificar o motivo, prazo de 20 dias mais 10, negativa e recurso em 10 dias, graus de sigilo e informação pessoal, e a convivência entre a Lei de Acesso à Informação e a LGPD'});
})();
