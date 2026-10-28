(function(){
var K=window.K,X=K.X;
function row(tokens,y,p){p=p||'t';var x=16,N=[];tokens.forEach(function(t,i){var w=Math.max(46,Math.round(t[0].length*8+26),Math.round((t[2]||'').length*6.4+18));N.push(X.box(p+i,x,y,w,44,t[0],t[1]||'n',t[2]||''));x+=w+10});return N}
function sc(h,tokens,note){var N=[X.text('hd',16,34,h,'b')].concat(row(tokens,70));if(note)N.push(X.text('nt',16,150,note,'t'));return N}
function sc2(h,r1,r2,note){var N=[X.text('hd',16,34,h,'b')].concat(row(r1,64,'a')).concat(row(r2,114,'b'));if(note)N.push(X.text('nt',16,174,note,'t'));return N}
var S=[
{title:'1. Estratégia em indicadores',label:'Kaplan e Norton',text:'<p>O BSC traduz a <b>estratégia</b> em objetivos, indicadores, metas e iniciativas, de forma <b>equilibrada</b>.</p>',scene:function(){return sc2('PASSO 1 DE 6',[['Estratégia','a','visão e missão']],[['Indicadores','m','metas e iniciativas']],'Balanced Scorecard')}},
{title:'2. Aprendizado e crescimento',label:'A base',text:'<p>Pessoas, cultura e tecnologia. Investir aqui melhora os <b>processos internos</b>.</p>',scene:function(){return sc('PASSO 2 DE 6',[['Pessoas','a'],['Cultura','n'],['Tecnologia','n']],'aprendizado e crescimento')}},
{title:'3. Processos internos',label:'Fazer bem',text:'<p>Em quais processos a organização precisa <b>se destacar</b> para entregar valor ao cliente.</p>',scene:function(){return sc2('PASSO 3 DE 6',[['Processos','a','excelência']],[['Entrega','m','ao cliente']],'processos internos')}},
{title:'4. Clientes',label:'Valor percebido',text:'<p>Como o cliente enxerga a organização: <b>satisfação</b>, retenção e participação de mercado.</p>',scene:function(){return sc('PASSO 4 DE 6',[['Satisfação','a'],['Retenção','n'],['Mercado','n']],'perspectiva do cliente')}},
{title:'5. Financeira',label:'O resultado',text:'<p>É a <b>consequência</b> das outras três: receita, rentabilidade e valor para o acionista.</p>',scene:function(){return sc2('PASSO 5 DE 6',[['Receita','a','rentabilidade']],[['Valor','m','ao acionista']],'perspectiva financeira')}},
{title:'6. Setor público',label:'Adaptação',text:'<p>No setor público, a <b>missão</b> e o <b>cidadão</b> vão ao topo, e o orçamento é <b>restrição</b>, não finalidade.</p>',scene:function(){return sc2('PASSO 6 DE 6',[['Missão','a','e cidadão']],[['Orçamento','m','restrição']],'BSC no setor público')}}
];
K.explain({w:720,h:230,steps:S,alt:'Seis passos pelo Balanced Scorecard: estratégia, aprendizado e crescimento, processos internos, clientes, financeira e setor público'});
})();