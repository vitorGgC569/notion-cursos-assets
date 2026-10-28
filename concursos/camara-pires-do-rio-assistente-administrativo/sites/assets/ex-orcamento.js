(function(){
var K=window.K,X=K.X;
function top(act,done){
  var names=['PPA','LDO','LOA','Empenho','Liquidação','Pagamento'],subs=['4 anos','1 ano','1 ano','reserva','confere','paga'],N=[],i;
  for(i=0;i<6;i++){
    var c=i===act?'a':(done&&done.indexOf(i)>=0?'d':'m');
    N.push(X.box('f'+i,16+i*116,14,108,52,names[i],c,subs[i]));
  }
  return N;
}
function scn(title){return [X.zone('zs',16,86,688,282,title)]}
var S=[
{label:'0. O caso',title:'A Câmara precisa de papel',text:'<p>A <b>Câmara Municipal de Vila Exemplo</b>, que é <b>fictícia</b>, precisa comprar <b>papel para os gabinetes</b>, em um total de <b>R$ 1.200,00</b>. O caso mostra o caminho completo: três leis planejam e autorizam, e três <b>estágios da despesa</b> executam. Cada passo acende uma etapa.</p>',
 scene:function(){var N=top(-1);N=N.concat(scn('Do plano ao pagamento'));
  N.push(X.box('c1',34,126,200,52,'Necessidade','a','papel para os gabinetes'));
  N.push(X.box('c2',254,126,200,52,'Valor','a','R$ 1.200,00'));
  N.push(X.box('c3',474,126,196,52,'Despesa','a','corrente, de custeio'));
  N.push(X.text('t0',34,250,'Três leis autorizam e três estágios executam.','t'));return N}},
{label:'1. PPA',title:'O PPA olha para quatro anos',text:'<p>O <b>PPA</b> (plano plurianual) estabelece, de forma regionalizada, as <b>diretrizes, objetivos e metas</b> para as despesas de capital e para os <b>programas de duração continuada</b>. Manter o funcionamento administrativo da Câmara é um programa que não acaba no fim do ano. O papel não aparece no PPA item por item: ele está dentro do programa.</p>',
 scene:function(){var N=top(0);N=N.concat(scn('PPA: planejamento de quatro anos'));
  N.push(X.box('p1',34,120,200,52,'Diretrizes','d','o que o governo pretende'));
  N.push(X.box('p2',254,120,200,52,'Objetivos e metas','d','de forma regionalizada'));
  N.push(X.box('p3',474,120,196,52,'Programas continuados','a','como a manutenção'));
  N.push(X.text('t1',34,226,'Iniciativa do Poder Executivo, vigência de quatro anos.','t'));
  N.push(X.text('t1b',34,252,'Obra que passa de um exercício precisa estar no PPA.','t'));return N}},
{label:'2. LDO',title:'A LDO escolhe as prioridades do ano',text:'<p>A <b>LDO</b> (lei de diretrizes orçamentárias) traz as <b>metas e prioridades</b> do exercício seguinte, <b>orienta a elaboração da LOA</b> e, pela LRF, define critérios de <b>limitação de empenho</b> e traz os anexos de <b>metas fiscais</b> e de <b>riscos fiscais</b>. Ela diz como o orçamento do ano será montado. Ainda não autoriza o gasto com papel.</p>',
 scene:function(){var N=top(1,[0]);N=N.concat(scn('LDO: regras e prioridades de um ano'));
  N.push(X.box('l1',34,120,200,52,'Metas e prioridades','d','do exercício seguinte'));
  N.push(X.box('l2',254,120,200,52,'Orienta a LOA','a','como montar o orçamento'));
  N.push(X.box('l3',474,120,196,52,'Anexos da LRF','d','metas e riscos fiscais'));
  N.push(X.text('t2',34,226,'A LDO planeja o ano e a LOA autoriza o gasto.','t'));
  N.push(X.text('t2b',34,252,'Critérios de limitação de empenho também ficam nela.','t'));return N}},
{label:'3. LOA',title:'A LOA dá a dotação',text:'<p>A <b>LOA</b> (lei orçamentária anual) <b>estima a receita e fixa a despesa</b> do exercício. Ela traz a <b>dotação</b>, o valor autorizado para cada despesa. Suponha uma dotação de <b>R$ 20.000,00</b> para material de consumo da Câmara. Sem dotação, não pode haver gasto. O valor é fictício.</p>',
 scene:function(){var N=top(2,[0,1]);N=N.concat(scn('LOA: o orçamento propriamente dito'));
  N.push(X.box('o1',34,120,200,52,'Dotação','a','material de consumo'));
  N.push(X.box('o2',254,120,200,52,'R$ 20.000,00','a','autorizados na lei'));
  N.push(X.box('o3',474,120,196,52,'Saldo','d','R$ 20.000,00'));
  N.push(X.text('t3',34,226,'Orçamentos fiscal, de investimento e da seguridade.','t'));
  N.push(X.text('t3b',34,252,'A fixação da despesa vem antes do empenho.','t'));return N}},
{label:'4. Empenho',title:'O empenho reserva o dinheiro',text:'<p>O <b>empenho</b> é o ato da autoridade competente que <b>cria para o poder público a obrigação de pagamento</b> e <b>reserva</b> o valor na dotação (Lei 4.320, art. 58). Empenha-se <b>R$ 1.200,00</b>, e a nota de empenho deduz esse valor do saldo: sobram <b>R$ 18.800,00</b>. O empenho <b>não pode exceder a dotação</b> (art. 59), e é <b>vedada despesa sem prévio empenho</b> (art. 60).</p>',
 scene:function(){var N=top(3,[0,1,2]);N=N.concat(scn('Estágio 1: empenho'));
  N.push(X.box('e1',34,120,200,52,'Nota de empenho','a','credor, valor e dotação'));
  N.push(X.box('e2',254,120,200,52,'Reservado','a','R$ 1.200,00'));
  N.push(X.box('e3',474,120,196,52,'Saldo da dotação','d','R$ 18.800,00'));
  N.push(X.text('t4',34,226,'Empenho não é pagamento: ele só reserva e cria a obrigação.','t'));
  N.push(X.text('t4b',34,252,'Não pode passar do limite da dotação.','t'));return N}},
{label:'5. Liquidação',title:'A liquidação confere o direito do credor',text:'<p>Quando o papel chega, vem a <b>liquidação</b>: a verificação do <b>direito adquirido pelo credor</b>, com base nos documentos que comprovam o crédito (Lei 4.320, art. 63). Para fornecimentos, a base é o <b>contrato</b>, a <b>nota de empenho</b> e o <b>comprovante de entrega</b>. Se a quantidade ou a qualidade não bate, a despesa não é liquidada.</p>',
 scene:function(){var N=top(4,[0,1,2,3]);N=N.concat(scn('Estágio 2: liquidação'));
  N.push(X.box('q1',34,120,200,52,'Contrato','d','o que foi combinado'));
  N.push(X.box('q2',254,120,200,52,'Nota de empenho','d','a reserva feita'));
  N.push(X.box('q3',474,120,196,52,'Comprovante','a','o papel foi entregue'));
  N.push(X.text('t5',34,226,'Liquidar é conferir se o credor cumpriu a parte dele.','t'));
  N.push(X.text('t5b',34,252,'O pagamento só pode vir depois dela.','t'));return N}},
{label:'6. Pagamento',title:'O pagamento entrega o dinheiro',text:'<p>Liquidada a despesa, vem o <b>pagamento</b>: a <b>ordem de pagamento</b> é o despacho da autoridade competente que manda pagar, e a tesouraria ou o banco credenciado entrega o dinheiro (arts. 62, 64 e 65). Se a despesa foi empenhada e <b>não paga até 31 de dezembro</b>, vira <b>restos a pagar</b> (art. 36). E se a dotação acabasse antes da compra, o caminho seria um <b>crédito suplementar</b>, que reforça a dotação existente.</p>',
 scene:function(){var N=top(5,[0,1,2,3,4]);N=N.concat(scn('Estágio 3: pagamento'));
  N.push(X.box('g1',34,120,200,52,'Ordem de pagamento','a','autoridade competente'));
  N.push(X.box('g2',254,120,200,52,'Pagamento','a','R$ 1.200,00 ao fornecedor'));
  N.push(X.box('g3',474,120,196,52,'Até 31/12','n','restos a pagar'));
  N.push(X.text('t6',34,226,'Dotação acabou? Crédito suplementar reforça a que existe.','t'));
  N.push(X.text('t6b',34,252,'Sem dotação nenhuma: crédito especial.','t'));return N}}
];
K.explain({w:720,h:380,steps:S,alt:'Animação do caminho de uma compra de papel pela Câmara Municipal fictícia de Vila Exemplo: o PPA, a LDO e a LOA planejam e autorizam, e os estágios da despesa executam, com empenho de R$ 1.200,00, liquidação e pagamento.'});
})();
