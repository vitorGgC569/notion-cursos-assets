(function(){
var K=window.K,X=K.X;
function row(tokens,y,p){p=p||'t';var x=16,N=[];tokens.forEach(function(t,i){var w=Math.max(46,Math.round(t[0].length*8+26),Math.round((t[2]||'').length*6.4+18));N.push(X.box(p+i,x,y,w,44,t[0],t[1]||'n',t[2]||''));x+=w+10});return N}
function sc(h,tokens,note){var N=[X.text('hd',16,34,h,'b')].concat(row(tokens,70));if(note)N.push(X.text('nt',16,150,note,'t'));return N}
function sc2(h,r1,r2,note){var N=[X.text('hd',16,34,h,'b')].concat(row(r1,64,'a')).concat(row(r2,114,'b'));if(note)N.push(X.text('nt',16,174,note,'t'));return N}
var S=[
{title:'1. Balanço Orçamentário',label:'Art. 102',text:'<p>Receitas e despesas <b>previstas em confronto com as realizadas</b>, mais os quadros dos <b>restos a pagar</b>.</p>',scene:function(){return sc2('PASSO 1 DE 6',[['Previsto','a','receita e dotação']],[['Realizado','m','arrecadado e empenhado']],'Balanço Orçamentário')}},
{title:'2. Balanço Financeiro',label:'Art. 103',text:'<p>Receita e despesa <b>orçamentárias</b>, <b>recebimentos e pagamentos extraorçamentários</b> e os <b>saldos em espécie</b>. Não está na NBC TSP 11, mas é exigido pela Lei 4.320.</p>',scene:function(){return sc('PASSO 2 DE 6',[['Orçamentário','a'],['Extraorçamentário','n'],['Saldos em espécie','n']],'Balanço Financeiro')}},
{title:'3. Balanço Patrimonial',label:'Art. 105',text:'<p>Quatro quadros: <b>principal</b>, <b>ativos e passivos financeiros e permanentes</b>, <b>compensação</b> e <b>superávit ou déficit financeiro</b>.</p>',scene:function(){return sc('PASSO 3 DE 6',[['Principal','a'],['Financeiro e permanente','n'],['Superávit financeiro','n']],'Balanço Patrimonial')}},
{title:'4. DVP',label:'Art. 104',text:'<p>Variações patrimoniais <b>aumentativas (classe 4)</b> e <b>diminutivas (classe 3)</b>. Apura o <b>resultado patrimonial</b>, que não mede desempenho.</p>',scene:function(){return sc2('PASSO 4 DE 6',[['VPA','a','classe 4']],[['VPD','m','classe 3']],'DVP')}},
{title:'5. DFC',label:'Fluxos de caixa',text:'<p>Fluxos <b>operacionais</b>, de <b>investimento</b> e de <b>financiamento</b>, pelo <b>método direto</b>.</p>',scene:function(){return sc('PASSO 5 DE 6',[['Operacional','a'],['Investimento','n'],['Financiamento','n']],'DFC')}},
{title:'6. DMPL e notas',label:'Complementos',text:'<p>A <b>DMPL</b> é obrigatória só para <b>estatal dependente S/A</b>; para os demais é facultativa. As <b>notas explicativas</b> completam o conjunto.</p>',scene:function(){return sc2('PASSO 6 DE 6',[['DMPL','a','facultativa, em regra']],[['Notas explicativas','m','sempre']],'DMPL e notas')}}
];
K.explain({w:720,h:230,steps:S,alt:'Seis passos pelas demonstrações: Balanço Orçamentário, Balanço Financeiro, Balanço Patrimonial, DVP, DFC, DMPL e notas'});
})();