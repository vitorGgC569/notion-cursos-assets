(function(){
var K=window.K,X=K.X;
function row(tokens,y,p){p=p||'t';var x=16,N=[];tokens.forEach(function(t,i){var w=Math.max(46,Math.round(t[0].length*8+26),Math.round((t[2]||'').length*6.4+18));N.push(X.box(p+i,x,y,w,44,t[0],t[1]||'n',t[2]||''));x+=w+10});return N}
function sc(h,tokens,note){var N=[X.text('hd',16,34,h,'b')].concat(row(tokens,70));if(note)N.push(X.text('nt',16,150,note,'t'));return N}
function sc2(h,r1,r2,note){var N=[X.text('hd',16,34,h,'b')].concat(row(r1,64,'a')).concat(row(r2,114,'b'));if(note)N.push(X.text('nt',16,174,note,'t'));return N}
var S=[
{title:'1. Formação',label:'Estágio 1',text:'<p>Os membros se conhecem, há <b>incerteza</b> sobre objetivos e papéis.</p>',scene:function(){return sc('PASSO 1 DE 6',[['Formação','a'],['Incerteza','n'],['Tempestade','n']],'estágios de Tuckman')}},
{title:'2. Tempestade',label:'Estágio 2',text:'<p>Surgem os <b>conflitos</b>, em geral em torno de controle e liderança.</p>',scene:function(){return sc2('PASSO 2 DE 6',[['Tempestade','a','conflitos']],[['Controle','m','e liderança']],'estágios de Tuckman')}},
{title:'3. Normatização',label:'Estágio 3',text:'<p>Criam-se <b>normas</b> e laços, e cresce a <b>coesão</b>.</p>',scene:function(){return sc('PASSO 3 DE 6',[['Normas','a'],['Laços','n'],['Coesão','n']],'estágios de Tuckman')}},
{title:'4. Desempenho e interrupção',label:'Estágios 4 e 5',text:'<p>O grupo <b>produz</b>. Em equipes temporárias, vem a <b>interrupção</b>, o encerramento.</p>',scene:function(){return sc2('PASSO 4 DE 6',[['Desempenho','a','produz']],[['Interrupção','m','encerra']],'estágios de Tuckman')}},
{title:'5. Folga social',label:'Armadilha',text:'<p>O esforço <b>cai</b> quando a contribuição individual <b>não é medida</b>.</p>',scene:function(){return sc2('PASSO 5 DE 6',[['Grupo','a','trabalho coletivo']],[['Esforço','m','diluído']],'folga social')}},
{title:'6. Pensamento de grupo',label:'Armadilha',text:'<p>A pressão pelo <b>consenso</b> bloqueia a <b>análise crítica</b>. É o <i>groupthink</i>, de Janis.</p>',scene:function(){return sc('PASSO 6 DE 6',[['Consenso','a'],['Sem crítica','n'],['Groupthink','n']],'pensamento de grupo')}}
];
K.explain({w:720,h:230,steps:S,alt:'Seis passos pelos estágios de Tuckman e pelas armadilhas das equipes: folga social e pensamento de grupo'});
})();