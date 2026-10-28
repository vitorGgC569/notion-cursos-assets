(function(){
var K=window.K,X=K.X;
function row(tokens,y,p){p=p||'t';var x=16,N=[];tokens.forEach(function(t,i){var w=Math.max(46,Math.round(t[0].length*8+26),Math.round((t[2]||'').length*6.4+18));N.push(X.box(p+i,x,y,w,44,t[0],t[1]||'n',t[2]||''));x+=w+10});return N}
function sc(h,tokens,note){var N=[X.text('hd',16,34,h,'b')].concat(row(tokens,70));if(note)N.push(X.text('nt',16,150,note,'t'));return N}
function sc2(h,r1,r2,note){var N=[X.text('hd',16,34,h,'b')].concat(row(r1,64,'a')).concat(row(r2,114,'b'));if(note)N.push(X.text('nt',16,174,note,'t'));return N}
var S=[
{title:'1. Novos entrantes',label:'Barreiras',text:'<p>A ameaça é menor quando há <b>barreiras de entrada</b>: capital alto, economia de escala, marca forte e regulação.</p>',scene:function(){return sc2('PASSO 1 DE 6',[['Barreiras altas','a','poucos entram']],[['Barreiras baixas','m','muitos entram']],'ameaça de novos entrantes')}},
{title:'2. Fornecedores',label:'Poder de barganha',text:'<p>O poder cresce com <b>poucos fornecedores</b>, insumo exclusivo ou custo alto de troca.</p>',scene:function(){return sc('PASSO 2 DE 6',[['Poucos fornecedores','a'],['Insumo exclusivo','n'],['Troca cara','n']],'poder dos fornecedores')}},
{title:'3. Clientes',label:'Poder de barganha',text:'<p>O poder cresce quando o cliente compra <b>em grande volume</b>, tem <b>muitas alternativas</b> e troca com facilidade.</p>',scene:function(){return sc('PASSO 3 DE 6',[['Grande volume','a'],['Muitas opções','n'],['Troca fácil','n']],'poder dos clientes')}},
{title:'4. Substitutos',label:'Outra solução',text:'<p>Soluções <b>diferentes</b> que atendem à <b>mesma necessidade</b>, como um aplicativo no lugar de um serviço tradicional.</p>',scene:function(){return sc2('PASSO 4 DE 6',[['Necessidade','a','a mesma']],[['Solução','m','outra']],'ameaça de substitutos')}},
{title:'5. Rivalidade',label:'Força central',text:'<p>A disputa entre os <b>concorrentes existentes</b>, que sofre influência das outras quatro forças.</p>',scene:function(){return sc('PASSO 5 DE 6',[['Concorrentes','a'],['Preço','n'],['Diferenciação','n']],'rivalidade entre concorrentes')}},
{title:'6. Estratégias genéricas',label:'Como reagir',text:'<p><b>Liderança em custo</b>, <b>diferenciação</b> e <b>enfoque</b>. Sem nenhuma delas, a empresa fica <b>presa no meio</b>.</p>',scene:function(){return sc('PASSO 6 DE 6',[['Custo','a'],['Diferenciação','n'],['Enfoque','n']],'estratégias genéricas')}}
];
K.explain({w:720,h:230,steps:S,alt:'Seis passos pelas cinco forças de Porter: novos entrantes, fornecedores, clientes, substitutos, rivalidade e estratégias genéricas'});
})();