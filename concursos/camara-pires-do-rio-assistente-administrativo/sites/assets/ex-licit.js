(function(){
var K=window.K,X=K.X;
function top(act,done){
  var names=['Âmbito','Modalidade','Fases','Contrato'],subs=['arts. 1 a 4','arts. 28 a 32','art. 17','arts. 89 a 154'],N=[],i;
  for(i=0;i<4;i++){
    var c=i===act?'a':(done&&done.indexOf(i)>=0?'d':'m');
    N.push(X.box('f'+i,16+i*174,14,162,52,names[i],c,subs[i]));
  }
  return N;
}
function scn(title){return [X.zone('zs',16,86,688,282,title)]}
var S=[
{label:'0. O caso',title:'Uma Câmara fictícia precisa contratar',text:'<p>A <b>Câmara Municipal de Vila Exemplo</b>, que é <b>fictícia</b>, precisa comprar computadores e reformar o auditório. O caminho passa por quatro perguntas: a <b>Lei 14.133/2021</b> se aplica? Qual é a <b>modalidade</b>? Quais são as <b>fases</b>? Como fica o <b>contrato</b> depois de assinado?</p>',
 scene:function(){var N=top(-1);N=N.concat(scn('Cena: da necessidade ao contrato'));
  N.push(X.box('c1',34,126,170,52,'Necessidade','n','computadores e reforma'));
  N.push(X.box('c2',270,126,170,52,'Licitação','a','modalidade e fases'));
  N.push(X.box('c3',500,126,170,52,'Contrato','d','execução e alterações'));
  N.push(X.line('cl1',204,152,270,152,'',true));N.push(X.line('cl2',440,152,500,152,'',true));
  N.push(X.text('t0',34,250,'Cada passo acende um bloco: âmbito, modalidade, fases e contrato.','t'));return N}},
{label:'1. Âmbito',title:'A lei vale para a Câmara Municipal?',text:'<p>Vale. O <b>art. 1º, I</b>, inclui os órgãos do <b>Poder Legislativo dos Municípios</b>, quando no desempenho de <b>função administrativa</b>, como comprar e contratar. Ficam fora as <b>empresas públicas, as sociedades de economia mista</b> e as subsidiárias, regidas pela <b>Lei 13.303/2016</b> (art. 1º, §1º). Os objetos estão no <b>art. 2º</b>: compras, serviços, obras, locação, alienação e TIC.</p>',
 scene:function(){var N=top(0);N=N.concat(scn('Âmbito de aplicação'));
  N.push(X.box('a1',34,120,200,52,'Câmara Municipal','a','Legislativo municipal'));
  N.push(X.box('a2',254,120,200,52,'Função administrativa','d','compras e contratos'));
  N.push(X.box('a3',474,120,196,52,'Lei 14.133/2021','d','se aplica'));
  N.push(X.box('a4',254,190,200,48,'Estatais','m','Lei 13.303/2016'));
  N.push(X.line('al1',234,146,254,146,'',true));N.push(X.line('al2',454,146,474,146,'',true));
  N.push(X.text('t1',34,268,'Operação de crédito e contratações com lei própria ficam fora (art. 3º).','t'));
  N.push(X.text('t1b',34,292,'Com ME e EPP, valem os arts. 42 a 49 da LC 123/2006 (art. 4º).','t'));return N}},
{label:'2. Princípios',title:'As regras do jogo: princípios do art. 5º',text:'<p>Antes de qualquer edital, valem os <b>princípios do art. 5º</b>: legalidade, impessoalidade, moralidade, publicidade, eficiência, <b>igualdade</b>, <b>planejamento</b>, <b>competitividade</b>, <b>vinculação ao edital</b>, <b>julgamento objetivo</b> e outros, <b>22 ao todo</b>, além da LINDB. Na prática: o edital é a lei do certame e a escolha segue critérios objetivos.</p>',
 scene:function(){var N=top(0,[0]);N=N.concat(scn('Art. 5º: alguns princípios'));
  N.push(X.box('p1',34,120,200,52,'Vinculação ao edital','a','o edital é a lei do certame'));
  N.push(X.box('p2',254,120,200,52,'Julgamento objetivo','d','critérios do edital'));
  N.push(X.box('p3',474,120,196,52,'Igualdade','d','sem preferências'));
  N.push(X.box('p4',34,190,200,48,'Planejamento','n','vem antes do edital'));
  N.push(X.box('p5',254,190,200,48,'Competitividade','n','ampliar a disputa'));
  N.push(X.box('p6',474,190,196,48,'Segregação de funções','n','quem planeja não julga'));
  N.push(X.text('t2',34,290,'O art. 5º traz 22 princípios, além do Decreto-Lei 4.657/1942 (LINDB).','t'));return N}},
{label:'3. Modalidade',title:'O objeto define a modalidade',text:'<p>Os <b>computadores</b> são <b>bens comuns</b>, com especificação usual de mercado: <b>pregão</b>, obrigatório (art. 6º, XLI). A <b>reforma do auditório</b> é obra de engenharia: <b>concorrência</b> (art. 29, parágrafo único, afasta o pregão para obras). Se a Câmara vender carros inservíveis, é <b>leilão</b>. As cinco modalidades são pregão, concorrência, concurso, leilão e diálogo competitivo. <b>Convite e tomada de preços não existem</b>.</p>',
 scene:function(){var N=top(1,[0]);N=N.concat(scn('Qual modalidade?'));
  N.push(X.box('m1',34,120,200,52,'Computadores','n','bem comum'));
  N.push(X.box('m2',254,120,200,52,'Reforma do auditório','n','obra de engenharia'));
  N.push(X.box('m3',474,120,196,52,'Carros inservíveis','n','alienação'));
  N.push(X.box('m4',34,196,200,52,'Pregão','d','menor preço ou desconto'));
  N.push(X.box('m5',254,196,200,52,'Concorrência','d','obras e serviços especiais'));
  N.push(X.box('m6',474,196,196,52,'Leilão','d','maior lance'));
  N.push(X.line('ml1',134,172,134,196,'',true));N.push(X.line('ml2',354,172,354,196,'',true));N.push(X.line('ml3',572,172,572,196,'',true));
  N.push(X.text('t3',34,290,'Concurso: trabalho artístico com prêmio. Diálogo: objeto inovador.','t'));return N}},
{label:'4. Fases',title:'As fases do art. 17, em sequência',text:'<p>Seja pregão ou concorrência, o rito segue o <b>art. 17</b>: <b>preparatória</b> (planejamento), <b>divulgação do edital</b>, <b>propostas e lances</b>, <b>julgamento</b>, <b>habilitação</b>, <b>recursal</b> e <b>homologação</b>. A habilitação pode vir antes do julgamento se o edital previr e a decisão for motivada (§1º). A forma é preferencialmente <b>eletrônica</b> (§2º).</p>',
 scene:function(){var N=top(2,[0,1]);N=N.concat(scn('Art. 17: da preparação à homologação'));
  N.push(X.box('s1',34,116,150,46,'Preparatória','a','planejamento'));
  N.push(X.box('s2',198,116,150,46,'Edital','n','divulgação'));
  N.push(X.box('s3',362,116,150,46,'Propostas e lances','n','quando for o caso'));
  N.push(X.box('s4',526,116,150,46,'Julgamento','n','critério do art. 33'));
  N.push(X.box('s5',116,196,150,46,'Habilitação','n','pode anteceder'));
  N.push(X.box('s6',280,196,150,46,'Recursal','n','impugnações'));
  N.push(X.box('s7',444,196,150,46,'Homologação','d','última fase'));
  N.push(X.line('sl1',184,139,198,139,'',true));N.push(X.line('sl2',348,139,362,139,'',true));N.push(X.line('sl3',512,139,526,139,'',true));
  N.push(X.line('sl4',266,219,280,219,'',true));N.push(X.line('sl5',430,219,444,219,'',true));
  N.push(X.text('t4',34,274,'Critérios do art. 33: menor preço, maior desconto, melhor técnica,','t'));
  N.push(X.text('t4b',34,298,'técnica e preço, maior lance e maior retorno econômico.','t'));return N}},
{label:'5. Contrato',title:'Assinatura, PNCP e garantia',text:'<p>O vencedor é convocado a assinar (<b>art. 90</b>). O contrato é <b>escrito</b> (art. 91). A divulgação no <b>PNCP</b> é <b>condição de eficácia</b>: <b>20 dias úteis</b> se veio de licitação e <b>10 dias úteis</b> se foi contratação direta (art. 94). A <b>garantia</b>, se prevista no edital, é escolhida pelo contratado (caução, seguro-garantia ou fiança) e, em regra, vai <b>até 5%</b> do valor inicial (arts. 96 e 98). Serviços contínuos: até <b>5 anos</b>, prorrogáveis até <b>10</b> (arts. 106 e 107).</p>',
 scene:function(){var N=top(3,[0,1,2]);N=N.concat(scn('Do vencedor ao contrato em vigor'));
  N.push(X.box('k1',34,120,200,52,'Assinatura','d','forma escrita'));
  N.push(X.box('k2',254,120,200,52,'PNCP','a','20 dias úteis ou 10'));
  N.push(X.box('k3',474,120,196,52,'Garantia','n','até 5% do valor'));
  N.push(X.line('kl1',234,146,254,146,'',true));N.push(X.line('kl2',454,146,474,146,'',true));
  N.push(X.box('k4',254,196,200,52,'Vigência','n','contínuos: 5 anos + prorrogação'));
  N.push(X.text('t5',34,290,'Sem a divulgação no PNCP, o contrato não tem eficácia.','t'));return N}},
{label:'6. Alterações',title:'Termo aditivo ou apostila?',text:'<p>Com o contrato em vigor, a Administração quer <b>acrescer 20%</b> ao objeto: é <b>alteração unilateral</b> (art. 124, I), dentro do limite de <b>25%</b> (art. 125; <b>50%</b> para acréscimos em reforma de edifício). Mexeu nos encargos, a lei pede o <b>termo aditivo</b> com restabelecimento do equilíbrio (art. 130). Já o <b>reajuste previsto no contrato</b> e o <b>empenho</b> entram por <b>apostila</b>, sem aditivo (art. 136). Se a Administração atrasar o pagamento por <b>mais de 2 meses</b>, o contratado pode pedir a extinção (art. 137, §2º).</p>',
 scene:function(){var N=top(3,[0,1,2]);N=N.concat(scn('Mudanças durante o contrato'));
  N.push(X.box('u1',34,120,200,52,'Acréscimo de 20%','n','unilateral, até 25%'));
  N.push(X.box('u2',254,120,200,52,'Termo aditivo','a','equilíbrio restabelecido'));
  N.push(X.box('u3',474,120,196,52,'Reajuste previsto','n','apostila'));
  N.push(X.line('ul1',234,146,254,146,'',true));
  N.push(X.box('u4',34,196,200,52,'Atraso superior a 2 meses','m','pagamentos da Administração'));
  N.push(X.box('u5',254,196,200,52,'Extinção','d','direito do contratado'));
  N.push(X.line('ul2',234,222,254,222,'',true));
  N.push(X.text('t6',34,290,'Aditivo: encargos e objeto. Apostila: reajuste, empenho, razão social e pagamentos.','t'));return N}}
];
K.explain({w:720,h:380,steps:S,alt:'Animação que acompanha uma Câmara Municipal fictícia da necessidade ao contrato: âmbito de aplicação da Lei 14.133, princípios, escolha da modalidade pelo objeto, fases do art. 17, assinatura e publicação no PNCP, e alterações por termo aditivo ou apostila'});
})();
