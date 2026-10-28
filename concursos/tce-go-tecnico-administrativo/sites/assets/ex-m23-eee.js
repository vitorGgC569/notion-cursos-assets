(function(){
var K=window.K,X=K.X;
function row(tokens,y,p){p=p||'t';var x=16,N=[];tokens.forEach(function(t,i){var w=Math.max(46,Math.round(t[0].length*8+26),Math.round((t[2]||'').length*6.4+18));N.push(X.box(p+i,x,y,w,44,t[0],t[1]||'n',t[2]||''));x+=w+10});return N}
function sc(h,tokens,note){var N=[X.text('hd',16,34,h,'b')].concat(row(tokens,70));if(note)N.push(X.text('nt',16,150,note,'t'));return N}
function sc2(h,r1,r2,note){var N=[X.text('hd',16,34,h,'b')].concat(row(r1,64,'a')).concat(row(r2,114,'b'));if(note)N.push(X.text('nt',16,174,note,'t'));return N}
var S=[
{title:'1. Eficiência',label:'Meios',text:'<p>Fazer <b>certo</b>: produzir o máximo com os recursos disponíveis, ou o mesmo com <b>menos</b> recursos.</p>',scene:function(){return sc2('PASSO 1 DE 6',[['Recursos','a','menos']],[['Produtos','m','mais']],'eficiência: meios')}},
{title:'2. Eficácia',label:'Fins',text:'<p>Fazer a <b>coisa certa</b>: atingir o objetivo ou a <b>meta</b> fixada, ainda que o custo não seja o menor.</p>',scene:function(){return sc2('PASSO 2 DE 6',[['Meta','a','90% vacinados']],[['Resultado','m','92% vacinados']],'eficácia: fins')}},
{title:'3. Efetividade',label:'Impacto',text:'<p>O <b>efeito real e duradouro</b> sobre a sociedade. Só se mede depois: a doença deixou de circular?</p>',scene:function(){return sc('PASSO 3 DE 6',[['Ação','n'],['Produto','n'],['Impacto','a']],'efetividade: impacto')}},
{title:'4. Eficaz sem efetivo',label:'Pegadinha',text:'<p>Um programa pode <b>cumprir a meta</b> e mesmo assim <b>não mudar</b> o problema. Foi eficaz, mas não efetivo.</p>',scene:function(){return sc2('PASSO 4 DE 6',[['Meta cumprida','a','eficaz']],[['Problema igual','m','não efetivo']],'eficaz sem efetividade')}},
{title:'5. Cadeia de valor',label:'Insumos a impactos',text:'<p><b>Insumos</b> alimentam <b>ações</b>, que geram <b>produtos</b>, que produzem <b>impactos</b>. A efetividade está no fim.</p>',scene:function(){return sc('PASSO 5 DE 6',[['Insumos','n'],['Ações','n'],['Produtos','n'],['Impactos','a']],'cadeia de valor')}},
{title:'6. Os 6 Es',label:'Esforço e resultado',text:'<p><b>Esforço</b>: economicidade, execução, excelência. <b>Resultado</b>: eficiência, eficácia, efetividade.</p>',scene:function(){return sc2('PASSO 6 DE 6',[['Esforço','a','economicidade, execução, excelência']],[['Resultado','m','eficiência, eficácia, efetividade']],'os 6 Es')}}
];
K.explain({w:720,h:230,steps:S,alt:'Seis passos por eficiência, eficácia, efetividade, eficaz sem efetivo, cadeia de valor e os 6 Es do desempenho'});
})();