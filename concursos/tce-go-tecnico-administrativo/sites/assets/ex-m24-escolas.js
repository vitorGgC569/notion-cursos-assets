(function(){
var K=window.K,X=K.X;
function row(tokens,y,p){p=p||'t';var x=16,N=[];tokens.forEach(function(t,i){var w=Math.max(46,Math.round(t[0].length*8+26),Math.round((t[2]||'').length*6.4+18));N.push(X.box(p+i,x,y,w,44,t[0],t[1]||'n',t[2]||''));x+=w+10});return N}
function sc(h,tokens,note){var N=[X.text('hd',16,34,h,'b')].concat(row(tokens,70));if(note)N.push(X.text('nt',16,150,note,'t'));return N}
function sc2(h,r1,r2,note){var N=[X.text('hd',16,34,h,'b')].concat(row(r1,64,'a')).concat(row(r2,114,'b'));if(note)N.push(X.text('nt',16,174,note,'t'));return N}
var S=[
{title:'1. Científica',label:'Taylor',text:'<p>Ênfase na <b>tarefa</b>: tempos e movimentos, padronização e especialização. É a <b>ORT</b>, e o trabalhador é o <b>homo economicus</b>.</p>',scene:function(){return sc2('PASSO 1 DE 6',[['Taylor','a','ênfase na tarefa']],[['ORT','m','tempos e movimentos']],'administração científica')}},
{title:'2. Clássica',label:'Fayol',text:'<p>Ênfase na <b>estrutura</b>. Cinco funções (prever, organizar, comandar, coordenar, controlar) e <b>14 princípios</b>.</p>',scene:function(){return sc2('PASSO 2 DE 6',[['Fayol','a','ênfase na estrutura']],[['14 princípios','m','unidade de comando']],'teoria clássica')}},
{title:'3. Burocracia',label:'Weber',text:'<p>Organização <b>racional-legal</b>: regras escritas, hierarquia, <b>impessoalidade</b> e mérito.</p>',scene:function(){return sc('PASSO 3 DE 6',[['Regras escritas','a'],['Hierarquia','n'],['Mérito','n']],'teoria da burocracia')}},
{title:'4. Relações humanas',label:'Mayo',text:'<p><b>Hawthorne</b> revela o peso do grupo informal. O trabalhador é o <b>homem social</b>, e a ênfase vai para as <b>pessoas</b>.</p>',scene:function(){return sc2('PASSO 4 DE 6',[['Mayo','a','Hawthorne']],[['Homem social','m','grupo informal']],'relações humanas')}},
{title:'5. Sistêmica',label:'Bertalanffy',text:'<p>A organização é um <b>sistema aberto</b>: entradas, processamento, saídas e <b>feedback</b>, com sinergia e entropia.</p>',scene:function(){return sc('PASSO 5 DE 6',[['Entradas','n'],['Processamento','n'],['Saídas','a']],'teoria de sistemas')}},
{title:'6. Contingencial',label:'Tudo depende',text:'<p>Não há <b>melhor maneira</b> única. A estrutura depende do <b>ambiente</b>, da tecnologia e da estratégia.</p>',scene:function(){return sc2('PASSO 6 DE 6',[['Estável','a','mecanicista']],[['Instável','m','orgânica']],'teoria contingencial')}}
];
K.explain({w:720,h:230,steps:S,alt:'Seis passos pelas escolas da administração: científica, clássica, burocracia, relações humanas, sistêmica e contingencial'});
})();