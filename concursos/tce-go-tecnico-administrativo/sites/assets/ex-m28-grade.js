(function(){
var K=window.K,X=K.X;
function row(tokens,y,p){p=p||'t';var x=16,N=[];tokens.forEach(function(t,i){var w=Math.max(46,Math.round(t[0].length*8+26),Math.round((t[2]||'').length*6.4+18));N.push(X.box(p+i,x,y,w,44,t[0],t[1]||'n',t[2]||''));x+=w+10});return N}
function sc(h,tokens,note){var N=[X.text('hd',16,34,h,'b')].concat(row(tokens,70));if(note)N.push(X.text('nt',16,150,note,'t'));return N}
function sc2(h,r1,r2,note){var N=[X.text('hd',16,34,h,'b')].concat(row(r1,64,'a')).concat(row(r2,114,'b'));if(note)N.push(X.text('nt',16,174,note,'t'));return N}
var S=[
{title:'1. Tema: 70 pontos',label:'70%',text:'<p>O bloco <b>Tema</b> vale até <b>70 pontos</b> e reúne recorte, interpretação dos textos de apoio e progressão textual.</p>',scene:function(){return sc('PASSO 1 DE 6',[['Recorte','a'],['Interpretação','n'],['Progressão','n']],'Tema = 70')}},
{title:'2. Recorte e interpretação',label:'20 + 20',text:'<p><b>Recorte temático</b>: 20. <b>Interpretação crítica dos textos de apoio</b>: 20. Fique no que a proposta pergunta e use os apoios sem copiar.</p>',scene:function(){return sc2('PASSO 2 DE 6',[['Recorte','a','20']],[['Interpretação','m','20']],'recorte e apoios')}},
{title:'3. Progressão textual',label:'30 pontos',text:'<p>O <b>maior item</b>: as ideias precisam avançar, sem <b>repetição</b>, <b>contradição</b> ou <b>circularidade</b>.</p>',scene:function(){return sc('PASSO 3 DE 6',[['Repetição','a'],['Contradição','n'],['Circularidade','n']],'o que derruba a progressão')}},
{title:'4. Coesão textual',label:'16 pontos',text:'<p>Conectivos com a <b>relação lógica certa</b> e retomadas por pronome, sinônimo ou elipse.</p>',scene:function(){return sc2('PASSO 4 DE 6',[['Conectivos','a','relação lógica']],[['Retomadas','m','pronome e sinônimo']],'coesão = 16')}},
{title:'5. Vocabulário e morfossintaxe',label:'8 + 6',text:'<p><b>Propriedade vocabular</b>: 8, com registro formal e termos precisos. <b>Morfossintaxe</b>: 6, com concordância, regência, crase e pontuação.</p>',scene:function(){return sc2('PASSO 5 DE 6',[['Vocabulário','a','8']],[['Morfossintaxe','m','6']],'norma-padrão = 30')}},
{title:'6. Nota zero e habilitação',label:'50 pontos',text:'<p><b>Zero</b>: fuga ao tema ou ao gênero, branco, até 7 linhas, cópia, identificação, letra ilegível. Habilitado: <b>50 ou mais</b>.</p>',scene:function(){return sc('PASSO 6 DE 6',[['Fuga ao tema','a'],['Até 7 linhas','n'],['Identificação','n']],'causas de zero')}}
];
K.explain({w:720,h:230,steps:S,alt:'Seis passos da grade de correção: Tema 70, recorte e interpretação, progressão, coesão, vocabulário e morfossintaxe, e nota zero com habilitação em 50 pontos'});
})();