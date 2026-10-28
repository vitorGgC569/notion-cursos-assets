(function(){
var K=window.K,X=K.X;
function row(tokens,y,p){p=p||'t';var x=16,N=[];tokens.forEach(function(t,i){var w=Math.max(46,Math.round(t[0].length*8+26),Math.round((t[2]||'').length*6.4+18));N.push(X.box(p+i,x,y,w,44,t[0],t[1]||'n',t[2]||''));x+=w+10});return N}
function sc(h,tokens,note){var N=[X.text('hd',16,34,h,'b')].concat(row(tokens,70));if(note)N.push(X.text('nt',16,150,note,'t'));return N}
function sc2(h,r1,r2,note){var N=[X.text('hd',16,34,h,'b')].concat(row(r1,64,'a')).concat(row(r2,114,'b'));if(note)N.push(X.text('nt',16,174,note,'t'));return N}
var S=[
{title:'1. Patrimonialismo',label:'Estado absolutista',text:'<p>O governante trata o <b>patrimônio público como seu</b>. Cargos viram favores, e o <b>nepotismo</b> e o <b>clientelismo</b> são a regra.</p>',scene:function(){return sc2('PASSO 1 DE 6',[['Governante','a','dono do Estado']],[['Cargos','m','favores']],'modelo patrimonialista')}},
{title:'2. Burocracia',label:'Weber',text:'<p>Combate o patrimonialismo com <b>impessoalidade, mérito, regras escritas e hierarquia</b>. No Brasil, a reforma do DASP, nos anos 1930.</p>',scene:function(){return sc('PASSO 2 DE 6',[['Impessoalidade','a'],['Mérito','n'],['Hierarquia','n']],'modelo burocrático')}},
{title:'3. Controle a priori',label:'Foco nos meios',text:'<p>A burocracia controla os <b>processos antes</b> do resultado. O ganho é a segurança; o custo é a <b>lentidão</b> e a olhada para dentro.</p>',scene:function(){return sc2('PASSO 3 DE 6',[['Controle','a','a priori']],[['Meios','m','processos']],'burocracia')}},
{title:'4. Gerencial',label:'Anos 1990',text:'<p>Nova Gestão Pública: foco em <b>resultados</b>, metas, flexibilidade e <b>controle a posteriori</b>. No Brasil, o PDRAE de 1995.</p>',scene:function(){return sc('PASSO 4 DE 6',[['Resultados','a'],['Metas','n'],['A posteriori','n']],'modelo gerencial')}},
{title:'5. Instrumentos',label:'Contrato e meta',text:'<p>OS e <b>contrato de gestão</b>, OSCIP e <b>termo de parceria</b>, agências executivas e reguladoras, <b>EC 19/1998</b> com a eficiência.</p>',scene:function(){return sc2('PASSO 5 DE 6',[['OS','a','contrato de gestão']],[['OSCIP','m','termo de parceria']],'instrumentos gerenciais')}},
{title:'6. Societal',label:'Participação',text:'<p>A vertente <b>societal</b> acrescenta a <b>participação social</b>: conselhos, conferências e orçamento participativo.</p>',scene:function(){return sc('PASSO 6 DE 6',[['Conselhos','a'],['Conferências','n'],['Orçamento participativo','n']],'administração societal')}}
];
K.explain({w:720,h:230,steps:S,alt:'Seis passos pelos modelos de administração pública: patrimonialismo, burocracia, controle a priori, gerencial, instrumentos e societal'});
})();