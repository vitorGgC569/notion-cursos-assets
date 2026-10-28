(function(){
var K=window.K,X=K.X;
function row(tokens,y,p){p=p||'t';var x=16,N=[];tokens.forEach(function(t,i){var w=Math.max(46,Math.round(t[0].length*8+26),Math.round((t[2]||'').length*6.4+18));N.push(X.box(p+i,x,y,w,44,t[0],t[1]||'n',t[2]||''));x+=w+10});return N}
function sc(h,tokens,note){var N=[X.text('hd',16,34,h,'b')].concat(row(tokens,70));if(note)N.push(X.text('nt',16,150,note,'t'));return N}
function sc2(h,r1,r2,note){var N=[X.text('hd',16,34,h,'b')].concat(row(r1,64,'a')).concat(row(r2,114,'b'));if(note)N.push(X.text('nt',16,174,note,'t'));return N}
var S=[
{title:'1. Atrair e escolher',label:'Agregar',text:'<p>O <b>recrutamento atrai</b> candidatos. A <b>seleção escolhe</b> os mais adequados. A <b>integração</b> acolhe o novato.</p>',scene:function(){return sc('PASSO 1 DE 6',[['Recrutar','a'],['Selecionar','n'],['Integrar','n']],'agregar pessoas')}},
{title:'2. Treinar',label:'TD&E',text:'<p>Treinamento prepara para o <b>cargo atual</b>. Desenvolvimento olha o <b>futuro</b>. O ciclo começa pelo <b>levantamento de necessidades</b>.</p>',scene:function(){return sc2('PASSO 2 DE 6',[['Treinamento','a','cargo atual']],[['Desenvolvimento','m','futuro']],'TD&E')}},
{title:'3. Avaliar',label:'Kirkpatrick',text:'<p>Quatro níveis: <b>reação</b>, <b>aprendizagem</b>, <b>comportamento</b> e <b>resultados</b>.</p>',scene:function(){return sc('PASSO 3 DE 6',[['Reação','a'],['Aprendizagem','n'],['Comportamento','n'],['Resultados','n']],'níveis de Kirkpatrick')}},
{title:'4. Avaliar o desempenho',label:'360 graus',text:'<p>Na avaliação <b>360</b>, avaliam chefia, pares, subordinados, clientes e o próprio servidor. Cuidado com o <b>halo</b> e a <b>tendência central</b>.</p>',scene:function(){return sc2('PASSO 4 DE 6',[['360 graus','a','vários avaliadores']],[['Erros','m','halo e tendência central']],'desempenho')}},
{title:'5. Remunerar',label:'Equilíbrio',text:'<p>O equilíbrio <b>interno</b> vem da avaliação de cargos. O <b>externo</b>, da pesquisa salarial.</p>',scene:function(){return sc2('PASSO 5 DE 6',[['Interno','a','avaliação de cargos']],[['Externo','m','pesquisa salarial']],'remuneração')}},
{title:'6. Competências e QVT',label:'CHA e Walton',text:'<p>Competência é <b>conhecimento</b>, <b>habilidade</b> e <b>atitude</b>. A QVT de Walton tem <b>oito dimensões</b>.</p>',scene:function(){return sc('PASSO 6 DE 6',[['Conhecimento','a'],['Habilidade','n'],['Atitude','n']],'competência (CHA)')}}
];
K.explain({w:720,h:230,steps:S,alt:'Seis passos da gestão de pessoas: recrutar e selecionar, treinar, avaliar o treinamento, avaliar o desempenho, remunerar, competências e qualidade de vida'});
})();