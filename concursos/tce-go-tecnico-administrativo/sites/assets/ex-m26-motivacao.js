(function(){
var K=window.K,X=K.X;
function row(tokens,y,p){p=p||'t';var x=16,N=[];tokens.forEach(function(t,i){var w=Math.max(46,Math.round(t[0].length*8+26),Math.round((t[2]||'').length*6.4+18));N.push(X.box(p+i,x,y,w,44,t[0],t[1]||'n',t[2]||''));x+=w+10});return N}
function sc(h,tokens,note){var N=[X.text('hd',16,34,h,'b')].concat(row(tokens,70));if(note)N.push(X.text('nt',16,150,note,'t'));return N}
function sc2(h,r1,r2,note){var N=[X.text('hd',16,34,h,'b')].concat(row(r1,64,'a')).concat(row(r2,114,'b'));if(note)N.push(X.text('nt',16,174,note,'t'));return N}
var S=[
{title:'1. Conteúdo e processo',label:'Dois grupos',text:'<p>As teorias de <b>conteúdo</b> dizem <b>o que</b> motiva. As de <b>processo</b> dizem <b>como</b> a motivação acontece.</p>',scene:function(){return sc2('PASSO 1 DE 6',[['Conteúdo','a','o que motiva']],[['Processo','m','como motiva']],'motivação')}},
{title:'2. Maslow e Alderfer',label:'Necessidades',text:'<p><b>Maslow</b>: cinco níveis, dos fisiológicos à autorrealização. <b>Alderfer</b>: existência, relacionamento e crescimento.</p>',scene:function(){return sc('PASSO 2 DE 6',[['Maslow','a'],['5 níveis','n'],['Alderfer ERG','n']],'hierarquia de necessidades')}},
{title:'3. Herzberg',label:'Dois fatores',text:'<p><b>Higiênicos</b> evitam a insatisfação. <b>Motivacionais</b> geram satisfação.</p>',scene:function(){return sc2('PASSO 3 DE 6',[['Higiênicos','a','evitam insatisfação']],[['Motivacionais','m','geram satisfação']],'teoria dos dois fatores')}},
{title:'4. McClelland',label:'Três necessidades',text:'<p>Necessidade de <b>realização</b>, de <b>afiliação</b> e de <b>poder</b>.</p>',scene:function(){return sc('PASSO 4 DE 6',[['Realização','a'],['Afiliação','n'],['Poder','n']],'McClelland')}},
{title:'5. Vroom',label:'Expectância',text:'<p>Motivação = <b>expectativa</b> x <b>instrumentalidade</b> x <b>valência</b>.</p>',scene:function(){return sc('PASSO 5 DE 6',[['Expectativa','a'],['Instrumentalidade','n'],['Valência','n']],'teoria da expectância')}},
{title:'6. Adams e Locke',label:'Equidade e metas',text:'<p><b>Adams</b>: comparação entre o que se investe e o que se recebe. <b>Locke</b>: metas <b>específicas e desafiadoras</b>.</p>',scene:function(){return sc2('PASSO 6 DE 6',[['Adams','a','equidade']],[['Locke','m','metas']],'processo')}}
];
K.explain({w:720,h:230,steps:S,alt:'Seis passos pelas teorias da motivação: conteúdo e processo, Maslow e Alderfer, Herzberg, McClelland, Vroom, Adams e Locke'});
})();