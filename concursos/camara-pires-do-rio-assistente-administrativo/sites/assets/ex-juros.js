(function(){
var K=window.K,X=K.X;
function top(act,done){
  var names=['A base','A multa','Os juros','O total'],subs=['de quê?','cobrada uma vez','crescem com os dias','e a conferência'],N=[],i;
  for(i=0;i<4;i++){
    var c=i===act?'a':(done&&done.indexOf(i)>=0?'d':'m');
    N.push(X.box('f'+i,16+i*174,14,162,52,names[i],c,subs[i]));
  }
  return N;
}
function scn(title){return [X.zone('zs',16,86,688,282,title)]}
var S=[
{label:'0. O problema',title:'Uma conta paga com atraso',text:'<p>Uma Câmara <b>fictícia</b> recebe uma conta de <b>R$ 400,00</b> e a paga com <b>10 dias de atraso</b>. A regra cobra uma <b>multa fixa de 2%</b> e <b>juros simples de 0,1% ao dia</b>, os dois calculados sobre o <b>valor original</b>. Quanto se paga no total? É o mesmo desenho da questão 13 de Goiânia 2026, com outros números. O caso mostra, em sete passos, como resolver.</p>',
 scene:function(){var N=top(-1);N=N.concat(scn('O enunciado'));
  N.push(X.box('c1',34,126,200,52,'Conta: R$ 400,00','a','valor original'));
  N.push(X.box('c2',254,126,200,52,'Multa: 2%','a','fixa, cobrada uma vez'));
  N.push(X.box('c3',474,126,196,52,'Juros: 0,1% ao dia','a','10 dias de atraso'));
  N.push(X.text('t0',34,250,'Quanto se paga no total?','t'));return N}},
{label:'1. A base',title:'Os dois percentuais valem sobre os R$ 400,00',text:'<p>Antes de calcular, descubra a <b>base</b>: 2% de quê? 0,1% de quê? O enunciado diz que a multa e os juros são calculados sobre o <b>valor original</b>, ou seja, <b>R$ 400,00</b>. A multa não entra na base dos juros. Se o enunciado dissesse outra base, a conta mudaria.</p>',
 scene:function(){var N=top(0);N=N.concat(scn('A base'));
  N.push(X.box('b1',34,126,200,52,'Base: R$ 400,00','a','o valor original'));
  N.push(X.box('b2',254,126,200,52,'Multa','d','2% de 400'));
  N.push(X.box('b3',474,126,196,52,'Juros','d','0,1% de 400, por dia'));
  N.push(X.text('t1',34,250,'Os dois percentuais incidem sobre o valor original.','t'));return N}},
{label:'2. A multa',title:'A multa é cobrada uma vez',text:'<p>A multa é <b>2% de 400</b>: 0,02 × 400 = <b>R$ 8,00</b>. Ela é <b>fixa</b>: não cresce com os dias de atraso. Quem multiplica a multa pelos 10 dias erra a questão.</p>',
 scene:function(){var N=top(1,[0]);N=N.concat(scn('A multa'));
  N.push(X.box('m1',34,126,200,52,'2% de 400','d','0,02 × 400'));
  N.push(X.box('m2',254,126,200,52,'R$ 8,00','a','a multa'));
  N.push(X.box('m3',474,126,196,52,'Uma vez só','d','não cresce com os dias'));
  N.push(X.text('t2',34,250,'Multa: um valor fixo, cobrado uma única vez.','t'));return N}},
{label:'3. Os juros',title:'Juros simples: J = C × i × t',text:'<p>Os juros crescem com o tempo. A taxa é <b>ao dia</b>, e o tempo está em <b>dias</b>: a mesma unidade, então não precisa converter. <b>J = C × i × t = 400 × 0,001 × 10 = R$ 4,00</b>. Veja que 0,1% ao dia por 10 dias dá 1% no total, e 1% de 400 é 4.</p>',
 scene:function(){var N=top(2,[0,1]);N=N.concat(scn('Os juros'));
  N.push(X.box('j1',34,126,200,52,'J = C × i × t','d','a fórmula'));
  N.push(X.box('j2',254,126,200,52,'400 × 0,001 × 10','d','taxa e tempo em dias'));
  N.push(X.box('j3',474,126,196,52,'R$ 4,00','a','os juros'));
  N.push(X.text('t3',34,250,'0,1% ao dia por 10 dias é 1% de 400.','t'));return N}},
{label:'4. O total',title:'Some a conta, a multa e os juros',text:'<p>O total pago é o <b>valor original</b> mais a <b>multa</b> mais os <b>juros</b>: 400 + 8 + 4 = <b>R$ 412,00</b>. O montante dos juros simples sozinhos seria 404, mas a multa também entra na conta.</p>',
 scene:function(){var N=top(3,[0,1,2]);N=N.concat(scn('O total'));
  N.push(X.box('s1',34,126,200,52,'R$ 400,00','d','a conta'));
  N.push(X.box('s2',254,126,200,52,'+ R$ 8,00 + R$ 4,00','d','multa e juros'));
  N.push(X.box('s3',474,126,196,52,'R$ 412,00','a','o total pago'));
  N.push(X.text('t4',34,250,'400 + 8 + 4 = 412','t'));return N}},
{label:'5. Pelo fator',title:'O mesmo resultado em uma conta só',text:'<p>Multa de 2% e juros de 1% no total somam um acréscimo de <b>3%</b> sobre o valor original. O fator é <b>1 + 0,02 + 0,01 = 1,03</b>, e <b>400 × 1,03 = R$ 412,00</b>. Atenção: os dois percentuais podem ser somados aqui porque os dois incidem sobre a <b>mesma base</b>, os R$ 400,00. Isso é diferente de variações sucessivas, em que cada uma incide sobre o resultado da anterior.</p>',
 scene:function(){var N=top(3,[0,1,2]);N=N.concat(scn('Pelo fator'));
  N.push(X.box('f1',34,126,200,52,'1 + 0,02 + 0,01','d','multa e juros somados'));
  N.push(X.box('f2',254,126,200,52,'Fator 1,03','d','acréscimo de 3%'));
  N.push(X.box('f3',474,126,196,52,'400 × 1,03 = 412','a','o mesmo total'));
  N.push(X.text('t5',34,250,'Mesma base: os percentuais podem ser somados.','t'));return N}},
{label:'6. A conferência',title:'Se o atraso fosse de 20 dias',text:'<p>Para conferir se entendeu, mude o prazo: com <b>20 dias</b>, a multa continua <b>R$ 8,00</b>, e os juros dobram, <b>400 × 0,001 × 20 = R$ 8,00</b>. O total vira <b>400 + 8 + 8 = R$ 416,00</b>. Os juros simples crescem sempre o mesmo valor a cada dia (R$ 0,40), e a multa fica parada. Se der outro resultado, volte e confira a unidade da taxa e do tempo.</p>',
 scene:function(){var N=top(3,[0,1,2]);N=N.concat(scn('Conferindo'));
  N.push(X.box('v1',34,126,200,52,'Multa: R$ 8,00','d','continua a mesma'));
  N.push(X.box('v2',254,126,200,52,'Juros: R$ 8,00','d','400 × 0,001 × 20'));
  N.push(X.box('v3',474,126,196,52,'Total: R$ 416,00','a','400 + 8 + 8'));
  N.push(X.text('t6',34,250,'Os juros simples crescem R$ 0,40 por dia; a multa não cresce.','t'));return N}}
];
K.explain({w:720,h:380,steps:S,alt:'Animação que resolve uma conta de R$ 400,00 paga com 10 dias de atraso, com multa fixa de 2% e juros simples de 0,1% ao dia: multa de R$ 8,00, juros de R$ 4,00 e total de R$ 412,00. Mostra a base, a multa, os juros, o total, a conferência pelo fator 1,03 e o caso de 20 dias, com total de R$ 416,00'});
})();
