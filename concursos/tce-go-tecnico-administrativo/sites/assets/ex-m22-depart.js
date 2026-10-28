(function(){
var K=window.K,X=K.X;
function row(tokens,y,p){p=p||'t';var x=16,N=[];tokens.forEach(function(t,i){var w=Math.max(46,Math.round(t[0].length*8+26),Math.round((t[2]||'').length*6.4+18));N.push(X.box(p+i,x,y,w,44,t[0],t[1]||'n',t[2]||''));x+=w+10});return N}
function sc(h,tokens,note){var N=[X.text('hd',16,34,h,'b')].concat(row(tokens,70));if(note)N.push(X.text('nt',16,150,note,'t'));return N}
function sc2(h,r1,r2,note){var N=[X.text('hd',16,34,h,'b')].concat(row(r1,64,'a')).concat(row(r2,114,'b'));if(note)N.push(X.text('nt',16,174,note,'t'));return N}
var S=[
{title:'1. Funcional',label:'Pela função',text:'<p>Agrupa pela <b>atividade especializada</b>: finanças, pessoal, produção. Favorece a especialização, mas pode criar <b>visão departamental</b>.</p>',scene:function(){return sc2('PASSO 1 DE 6',[['Finanças','a','função']],[['Pessoal','m','função']],'critério: função')}},
{title:'2. Produto ou serviço',label:'Pela linha de produto',text:'<p>Cada <b>produto ou serviço</b> tem seu departamento e seus recursos. Facilita a responsabilização pelo resultado da linha.</p>',scene:function(){return sc('PASSO 2 DE 6',[['Produto A','a'],['Produto B','n'],['Serviço C','n']],'critério: produto')}},
{title:'3. Territorial',label:'Pela região',text:'<p>O critério é a <b>localização</b>. Útil quando as necessidades variam conforme a região.</p>',scene:function(){return sc('PASSO 3 DE 6',[['Região Norte','a'],['Região Sul','n'],['Região Centro','n']],'critério: território')}},
{title:'4. Clientela',label:'Pelo público',text:'<p>Divide-se conforme o <b>tipo de usuário ou cliente</b>, como balcões para idosos, empresas e estudantes.</p>',scene:function(){return sc('PASSO 4 DE 6',[['Idosos','a'],['Empresas','n'],['Estudantes','n']],'critério: clientela')}},
{title:'5. Processo',label:'Pela etapa',text:'<p>Agrupa pelas <b>etapas do processo</b> ou pelo equipamento: triagem, análise, decisão.</p>',scene:function(){return sc('PASSO 5 DE 6',[['Triagem','a'],['Análise','n'],['Decisão','n']],'critério: processo')}},
{title:'6. Projeto e mista',label:'Temporária e combinada',text:'<p>Por <b>projeto</b>, forma-se estrutura temporária. A <b>mista ou híbrida</b> combina critérios e é a mais comum.</p>',scene:function(){return sc2('PASSO 6 DE 6',[['Projeto','a','temporária']],[['Mista','m','combina critérios']],'critério: projeto e mista')}}
];
K.explain({w:720,h:230,steps:S,alt:'Seis passos pela departamentalização: funcional, produto, territorial, clientela, processo, projeto e mista'});
})();