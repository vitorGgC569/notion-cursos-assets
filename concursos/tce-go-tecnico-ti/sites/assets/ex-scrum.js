(function(){
var K=window.K,X=K.X;
// Sprint de 10 dias com 20 pontos: burndown ideal e real (valores didaticos)
var real=[20,20,18,16,16,13,10,8,5,0];
function burn(upto){
  var o=[X.zone('z',10,10,700,330,'Burndown da Sprint (20 pontos, 10 dias)'),X.line('ax',60,290,680,290,''),X.line('ay',60,50,60,290,''),
    X.text('y0',30,294,'0','t'),X.text('y20',24,60,'20','t'),X.text('xl',300,318,'dias da Sprint','t')];
  o.push(X.line('ideal',60,60,680,290,'m'));
  for(var d=0;d<=upto&&d<10;d++){var x=60+(d+1)*62,y=290-real[d]*11.5;o.push(X.circ('p'+d,x,y,6,'','a'));
    if(d>0)o.push(X.line('l'+d,60+d*62,290-real[d-1]*11.5,x,y,'a'))}
  o.push(X.text('lg',470,80,'tracejado: ideal\ncontínuo: real','t'));return o}
var S=[
{label:'0. Product Backlog',title:'Product Backlog: a lista ordenada do produto',text:'<p>O <b>Product Owner</b> mantém e ordena o Product Backlog: tudo o que se pretende no produto, com os itens mais valiosos no topo. O compromisso deste artefato é o <b>Objetivo do Produto</b> (Product Goal).</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Scrum'),X.box('pb',40,60,200,220,'Product Backlog\n\n1. Consultar processo\n2. Filtrar por vara\n3. Exportar PDF\n4. Painel de prazos\n5. Notificações\n...','n'),X.pill('po',60,300,'Product Owner: ordena','a',180)]}},
{label:'1. Sprint Planning',title:'Sprint Planning: por quê, o quê e como',text:'<p>No início da Sprint (até 8 horas para um mês) o time define: <b>por que</b> a Sprint é valiosa (Sprint Goal), <b>o que</b> pode ser entregue (itens selecionados) e <b>como</b> será feito (plano dos Developers).</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Scrum'),X.box('pb',40,60,200,220,'Product Backlog\n\n1. Consultar processo\n2. Filtrar por vara\n3. Exportar PDF\n4. Painel de prazos\n5. Notificações\n...','n'),X.line('l',242,120,330,120,'a',true),X.box('sb',332,60,200,130,'Sprint Backlog\n\nItens 1, 2 e 3\n+ plano de entrega','a','Sprint Goal: consulta rápida'),X.pill('pl',350,210,'Planning: todo o Scrum Team','n',200)]}},
{label:'2. A Sprint e a Daily',title:'Sprint: Developers trabalham e fazem a Daily Scrum',text:'<p>A Sprint dura <b>no máximo um mês</b>, com duração fixa. A <b>Daily Scrum</b> tem 15 minutos e é dos Developers: inspecionam o progresso rumo ao Sprint Goal e adaptam o Sprint Backlog. O Scrum Master garante que aconteça, mas não precisa conduzi-la.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Sprint de 10 dias'),X.box('d1',40,70,120,60,'Dia 1','n','Daily 15 min'),X.box('d2',180,70,120,60,'Dia 2','n','Daily 15 min'),X.box('d3',320,70,120,60,'...','m'),X.box('d4',460,70,120,60,'Dia 10','n','Daily 15 min'),X.line('a1',160,100,178,100,'a',true),X.line('a2',300,100,318,100,'a',true),X.line('a3',440,100,458,100,'a',true),X.text('t',40,190,'Durante a Sprint: o Sprint Goal não muda, o escopo pode ser renegociado\nentre PO e Developers e a qualidade não diminui (Definição de Pronto).','t')]}},
{label:'3. Burndown',title:'Burndown: o trabalho restante ao longo do tempo',text:'<p>O gráfico de <b>burndown</b> mostra o trabalho que falta (pontos) contra o tempo. A linha tracejada é o ritmo ideal; a contínua é o real. Aqui a equipe fica parada nos dois primeiros dias e acelera depois. A leitura <b>não é</b> um artefato obrigatório do Scrum, mas é muito usada.</p>',
 scene:function(){return burn(9)}},
{label:'4. Incremento',title:'Incremento: o que atende à Definição de Pronto',text:'<p>Ao final, o <b>Incremento</b> é um degrau concreto rumo ao Objetivo do Produto. Só conta como parte dele o que atende à <b>Definição de Pronto</b> (testado, integrado, documentado conforme combinado). O compromisso do artefato é a Definição de Pronto.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Scrum'),X.box('i1',40,150,140,90,'Incremento 1\n(Sprint anterior)','n'),X.box('i2',210,100,140,140,'Incremento 2\n(esta Sprint)','a','atende à Definição\nde Pronto'),X.box('i3',380,50,140,190,'Objetivo do\nProduto','m'),X.line('a1',182,195,208,195,'a',true),X.line('a2',352,170,378,170,'a',true)]}},
{label:'5. Review e Retrospective',title:'Sprint Review e Sprint Retrospective',text:'<p>A <b>Review</b> (até 4 h) inspeciona o incremento com as partes interessadas e adapta o Product Backlog; não é reunião de status. A <b>Retrospective</b> (até 3 h) é interna ao time e planeja melhorias de qualidade e eficácia. A Sprint termina e outra começa em seguida.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Fim da Sprint'),X.box('rv',40,70,300,120,'Sprint Review','a','time + partes interessadas\ninspeciona o incremento\nadapta o Product Backlog'),X.box('rt',380,70,300,120,'Sprint Retrospective','n','só o Scrum Team\nmelhora processo e qualidade'),X.line('l',340,130,378,130,'a',true),X.text('t',40,230,'Ordem: Review primeiro, Retrospective por último. A Retrospective fecha a Sprint.','t')]}},
{label:'6. Papéis',title:'Quem faz o quê',text:'<p>O <b>Product Owner</b> maximiza o valor e ordena o backlog. Os <b>Developers</b> criam o incremento. O <b>Scrum Master</b> é líder-servidor: ajuda a entender e aplicar o Scrum e remove impedimentos. Não existe papel de gerente de projeto, e ninguém atribui tarefas ao time.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Scrum Team (sem hierarquia interna)'),X.box('po',40,70,200,110,'Product Owner','n','valor do produto\nProduct Backlog'),X.box('dv',260,70,200,110,'Developers','a','incremento\nSprint Backlog'),X.box('sm',480,70,200,110,'Scrum Master','n','Scrum eficaz\nremove impedimentos'),X.text('t',40,230,'Pegadinha: o Scrum Master não distribui tarefas e não decide a Definição de Pronto sozinho.','t')]}}
];
K.explain({w:720,h:350,steps:S,alt:'Animação de uma Sprint do Scrum, do Product Backlog ao Incremento'});
})();
