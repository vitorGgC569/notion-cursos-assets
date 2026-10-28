(function(){
var K=window.K,X=K.X;
function row(tokens,y,p){p=p||'t';var x=16,N=[];tokens.forEach(function(t,i){var w=Math.max(46,Math.round(t[0].length*8+26),Math.round((t[2]||'').length*6.4+18));N.push(X.box(p+i,x,y,w,44,t[0],t[1]||'n',t[2]||''));x+=w+10});return N}
function sc(h,tokens,note){var N=[X.text('hd',16,34,h,'b')].concat(row(tokens,70));if(note)N.push(X.text('nt',16,150,note,'t'));return N}
function sc2(h,r1,r2,note){var N=[X.text('hd',16,34,h,'b')].concat(row(r1,64,'a')).concat(row(r2,114,'b'));if(note)N.push(X.text('nt',16,174,note,'t'));return N}
var S=[
{title:'1. Programada',label:'Rotina',text:'<p>Decisão <b>repetitiva e estruturada</b>, resolvida por regras e procedimentos padrão.</p>',scene:function(){return sc2('PASSO 1 DE 6',[['Programada','a','rotina']],[['Procedimento','m','padrão']],'decisão programada')}},
{title:'2. Não programada',label:'Nova',text:'<p>Situação <b>nova e mal estruturada</b>, que exige julgamento e criatividade.</p>',scene:function(){return sc2('PASSO 2 DE 6',[['Não programada','a','nova']],[['Julgamento','m','criatividade']],'decisão não programada')}},
{title:'3. Certeza, risco e incerteza',label:'A situação',text:'<p>Com <b>certeza</b> as consequências são conhecidas. No <b>risco</b> há probabilidades. Na <b>incerteza</b> não há como estimar.</p>',scene:function(){return sc('PASSO 3 DE 6',[['Certeza','n'],['Risco','a'],['Incerteza','n']],'situação decisória')}},
{title:'4. Simon',label:'Racionalidade limitada',text:'<p>Informação incompleta e tempo curto: o decisor busca a solução <b>satisfatória</b>, não a ótima.</p>',scene:function(){return sc2('PASSO 4 DE 6',[['Ótima','n','ideal']],[['Satisfatória','a','real']],'racionalidade limitada')}},
{title:'5. Lindblom e lata de lixo',label:'Outros modelos',text:'<p><b>Incrementalismo</b>: pequenos ajustes sobre o que existe. <b>Lata de lixo</b>: problemas, soluções e pessoas se misturam ao acaso.</p>',scene:function(){return sc2('PASSO 5 DE 6',[['Lindblom','a','incrementalismo']],[['Lata de lixo','m','caos organizado']],'modelos decisórios')}},
{title:'6. Decisão em grupo',label:'Técnicas',text:'<p><b>Brainstorming</b>, <b>Delphi</b> e <b>grupo nominal</b> geram ideias. O risco é o <b>pensamento de grupo</b>, que sufoca a crítica.</p>',scene:function(){return sc('PASSO 6 DE 6',[['Brainstorming','a'],['Delphi','n'],['Grupo nominal','n']],'decisão em grupo')}}
];
K.explain({w:720,h:230,steps:S,alt:'Seis passos pelo processo decisório: programada, não programada, certeza risco e incerteza, Simon, Lindblom e lata de lixo, decisão em grupo'});
})();