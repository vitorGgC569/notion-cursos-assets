(function(){
var K=window.K,X=K.X;
function top(act,done){
  var names=['Planejar','Organizar','Dirigir','Controlar'],subs=['decidir antes','distribuir','conduzir pessoas','medir e corrigir'],N=[],i;
  for(i=0;i<4;i++){
    var c=i===act?'a':(done&&done.indexOf(i)>=0?'d':'m');
    N.push(X.box('f'+i,16+i*176,14,158,52,names[i],c,subs[i]));
    if(i<3)N.push(X.line('ar'+i,176+i*176,40,192+i*176,40,'',true));
  }
  return N;
}
function scn(title){return [X.zone('zs',16,86,688,282,title)]}
var S=[
{label:'0. O ciclo',title:'O ciclo em um exemplo da Câmara',text:'<p>Vamos acompanhar uma <b>sessão solene fictícia</b> para ver as quatro funções trabalhando juntas. Elas não são etapas isoladas: formam um ciclo, e o controle alimenta o próximo planejamento.</p>',
 scene:function(){var N=top(-1);N=N.concat(scn('Exemplo didático: sessão solene de homenagem aos cidadãos'));N.push(X.text('t0',40,150,'Objetivo: realizar a sessão com tudo no horário,\ndentro do orçamento e com a comunidade presente.','t'));return N}},
{label:'1. Planejar',title:'Planejar: decidir antes de agir',text:'<p>Antes de tudo, a comissão responde: <b>o que</b> fazer, <b>como</b>, <b>quando</b> e <b>quem</b> faz. É a mesma ideia do 5W2H. O resultado é um plano com meta e prazo.</p><p>Foi essa definição que a Verbena cobrou em Anápolis 2024, questão 42.</p>',
 scene:function(){var N=top(0);N=N.concat(scn('Plano'));
  N.push(X.box('p1',34,116,200,44,'O quê','n','sessão solene de homenagem'));
  N.push(X.box('p2',250,116,200,44,'Quando e onde','n','sexta, 19h, no plenário'));
  N.push(X.box('p3',466,116,220,44,'Quem','n','comissão de 3 servidores'));
  N.push(X.box('p4',34,176,200,44,'Meta','a','começar às 19h, sem atrasos'));
  N.push(X.box('p5',250,176,200,44,'Quanto','n','dentro do orçamento previsto'));
  N.push(X.box('p6',466,176,220,44,'Nível','n','tático: planejamento do evento'));
  N.push(X.text('t1',34,260,'Planejar é decidir antes. Ainda não há ação nenhuma, só decisão.','t'));return N}},
{label:'2. Organizar',title:'Organizar: distribuir trabalho, autoridade e recursos',text:'<p>O plano precisa de gente com tarefa definida. A Presidência delega, cada equipe recebe sua parte e os recursos (sala, som, convites). Quem responde a quem fica claro, como num <b>organograma</b>.</p>',
 scene:function(){var N=top(1,[0]);N=N.concat(scn('Estrutura do evento'));
  N.push(X.box('o0',280,110,160,40,'Presidência','d'));
  N.push(X.box('o1',60,190,170,48,'Cerimonial','a','roteiro e convites'));
  N.push(X.box('o2',275,190,170,48,'Som e imagem','a','equipamentos do plenário'));
  N.push(X.box('o3',490,190,170,48,'Recepção','a','atendimento aos convidados'));
  N.push(X.line('ol1',360,150,145,190,'a',true));N.push(X.line('ol2',360,150,360,190,'a',true));N.push(X.line('ol3',360,150,575,190,'a',true));
  N.push(X.text('t2',34,270,'Cada pessoa recebe ordens de um só chefe (unidade de comando).','t'));return N}},
{label:'3. Dirigir',title:'Dirigir: fazer as pessoas agirem',text:'<p>Agora é liderar: o presidente explica o objetivo, motiva a equipe e garante que a comunicação seja clara. Dirigir envolve <b>liderança, motivação e comunicação</b>.</p>',
 scene:function(){var N=top(2,[0,1]);N=N.concat(scn('Na véspera e no dia'));
  N.push(X.box('d1',40,116,200,46,'Liderança','a','explica o objetivo e o porquê'));
  N.push(X.box('d2',260,116,200,46,'Motivação','a','reconhece o trabalho da equipe'));
  N.push(X.box('d3',480,116,200,46,'Comunicação','a','um canal oficial, com retorno'));
  N.push(X.pill('d4',40,200,'Teste de som marcado para as 18h','n',250));
  N.push(X.pill('d5',40,232,'Sessão começa às 19h15','m',210));
  N.push(X.text('t3',34,300,'No dia, a equipe executa. Mas a sessão só começou 19h15.','t'));return N}},
{label:'4. Controlar',title:'Controlar: medir, comparar e corrigir',text:'<p>Depois do evento, comparamos o resultado com o padrão fixado no plano. A meta era começar às 19h. Houve <b>desvio</b> de 15 minutos. Controlar é medir, comparar e corrigir, e não apenas "fiscalizar".</p>',
 scene:function(){var N=top(3,[0,1,2]);N=N.concat(scn('Resultado contra o plano'));
  N.push(X.box('c1',40,116,200,52,'Padrão (meta)','n','começar às 19h'));
  N.push(X.box('c2',260,116,200,52,'Resultado','n','começou às 19h15'));
  N.push(X.box('c3',480,116,200,52,'Desvio','a','15 minutos de atraso'));
  N.push(X.line('cl1',240,142,260,142,'',true));N.push(X.line('cl2',460,142,480,142,'a',true));
  N.push(X.pill('c4',40,200,'Indicador: início no horário? Não.','m',260));
  N.push(X.pill('c5',40,232,'Causa: som com problema na hora','m',260));return N}},
{label:'5. Feedback',title:'A volta: o controle realimenta o planejamento',text:'<p>A correção vira o próximo plano: teste de som mais cedo, equipe reserva. Essa seta de volta é o <b>feedback</b>, e é a mesma lógica do <b>PDCA</b>: planejar, executar, verificar e agir.</p>',
 scene:function(){var N=top(0,[1,2,3]);N=N.concat(scn('Ação corretiva'));
  N.push(X.box('k1',40,126,300,52,'Ação corretiva','a','teste de som às 17h, técnico de reserva'));
  N.push(X.box('k2',380,126,300,52,'Novo plano','a','a meta de pontualidade continua'));
  N.push(X.line('kl1',340,152,380,152,'a',true));
  N.push(X.line('kl2',530,126,95,66,'a',true));
  N.push(X.text('t5',34,260,'Ciclo fechado: o que o controle descobre melhora o próximo planejamento.','t'));return N}},
{label:'6. As três palavras',title:'Eficiência, eficácia e efetividade neste exemplo',text:'<p><b>Eficiência</b>: o evento foi feito dentro do orçamento e do tempo de trabalho previstos. <b>Eficácia</b>: a sessão aconteceu e homenageou os cidadãos, como era o objetivo (mas a meta de pontualidade foi falha). <b>Efetividade</b>: com o tempo, a comunidade se aproxima da Câmara e passa a participar mais.</p>',
 scene:function(){var N=top(-1,[0,1,2,3]);N=N.concat(scn('Três palavras que a banca confunde'));
  N.push(X.box('e1',40,126,200,64,'Eficiência','a','fazer certo, gastando bem'));
  N.push(X.box('e2',260,126,200,64,'Eficácia','a','atingir o objetivo e a meta'));
  N.push(X.box('e3',480,126,200,64,'Efetividade','a','mudança real e duradoura'));
  N.push(X.line('el1',240,158,260,158,'',true));N.push(X.line('el2',460,158,480,158,'',true));
  N.push(X.text('t6',34,260,'Eficiência olha o caminho, eficácia olha a chegada, efetividade olha o impacto.','t'));return N}}
];
K.explain({w:720,h:380,steps:S,alt:'Animação do ciclo planejar, organizar, dirigir e controlar em um evento da Câmara'});
})();
