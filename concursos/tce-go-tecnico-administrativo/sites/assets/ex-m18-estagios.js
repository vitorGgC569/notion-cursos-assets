(function(){
var K=window.K,X=K.X;
function row(tokens,y,p){p=p||'t';var x=16,N=[];tokens.forEach(function(t,i){var w=Math.max(46,Math.round(t[0].length*8+26),Math.round((t[2]||'').length*6.4+18));N.push(X.box(p+i,x,y,w,44,t[0],t[1]||'n',t[2]||''));x+=w+10});return N}
function sc(h,tokens,note){var N=[X.text('hd',16,34,h,'b')].concat(row(tokens,70));if(note)N.push(X.text('nt',16,150,note,'t'));return N}
function sc2(h,r1,r2,note){var N=[X.text('hd',16,34,h,'b')].concat(row(r1,64,'a')).concat(row(r2,114,'b'));if(note)N.push(X.text('nt',16,174,note,'t'));return N}
var S=[
{title:'1. Previsão',label:'Receita: planejar',text:'<p>A receita é <b>prevista</b> na proposta orçamentária, com base em estudos de arrecadação. A previsão não é dinheiro em caixa: é uma <b>estimativa</b>.</p>',scene:function(){return sc('PASSO 1 DE 6',[['Previsão','a'],['Lançamento','n'],['Arrecadação','n']],'receita')}},
{title:'2. Lançamento',label:'Receita: inscrever o débito',text:'<p>A repartição competente <b>verifica o crédito</b>, <b>identifica o devedor</b> e <b>inscreve o débito</b> (art. 53). Nem toda receita passa por aqui: só as que têm lançamento, como o IPTU.</p>',scene:function(){return sc('PASSO 2 DE 6',[['Previsão','n'],['Lançamento','a'],['Arrecadação','n']],'Lei 4.320, art. 53')}},
{title:'3. Arrecadação e recolhimento',label:'Receita: o dinheiro chega',text:'<p>Na <b>arrecadação</b> o contribuinte paga ao agente arrecadador. No <b>recolhimento</b> o valor chega ao <b>Tesouro</b>, pela unidade de tesouraria.</p>',scene:function(){return sc2('PASSO 3 DE 6',[['Arrecadação','a','paga ao banco']],[['Recolhimento','m','vai ao Tesouro']],'art. 56')}},
{title:'4. Fixação',label:'Despesa: planejar',text:'<p>A despesa é <b>fixada</b> na LOA, com a dotação de cada ação. Fixar não é gastar: é <b>autorizar</b> até o limite.</p>',scene:function(){return sc('PASSO 4 DE 6',[['Fixação','a'],['Empenho','n'],['Liquidação','n']],'despesa')}},
{title:'5. Empenho',label:'Despesa: criar a obrigação',text:'<p>O empenho <b>reserva a dotação</b> e <b>cria a obrigação</b> de pagar. Vedada despesa sem prévio empenho. Pode ser <b>ordinário</b>, <b>por estimativa</b> ou <b>global</b>.</p>',scene:function(){return sc('PASSO 5 DE 6',[['Fixação','n'],['Empenho','a'],['Liquidação','n']],'arts. 58 a 61')}},
{title:'6. Liquidação e pagamento',label:'Despesa: conferir e pagar',text:'<p>A <b>liquidação</b> verifica o direito do credor, com base em contrato, nota de empenho e comprovantes. O <b>pagamento</b> só ocorre depois dela.</p>',scene:function(){return sc2('PASSO 6 DE 6',[['Liquidação','a','confere']],[['Pagamento','m','só depois']],'arts. 62 a 65')}}
];
K.explain({w:720,h:230,steps:S,alt:'Seis passos pelos estágios da receita e da despesa orçamentária'});
})();