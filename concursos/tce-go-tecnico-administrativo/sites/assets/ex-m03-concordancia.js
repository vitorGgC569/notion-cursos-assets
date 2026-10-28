(function(){
var K=window.K,X=K.X;
function row(tokens,y){var x=16,N=[];tokens.forEach(function(t,i){var w=Math.max(46,Math.round(t[0].length*8+26),Math.round((t[2]||'').length*6.4+18));N.push(X.box('t'+i,x,y,w,44,t[0],t[1]||'n',t[2]||''));x+=w+10});return N}
function sc(h,tokens,note){var N=[X.text('hd',16,34,h,'b')].concat(row(tokens,70));if(note)N.push(X.text('nt',16,150,note,'t'));return N}
var B=[['Os pareceres'],['do relator'],['sobre as contas'],['chegaram'],['atrasados']];
function mk(st,notes,h,nt){return sc(h,B.map(function(t,i){return [t[0],st[i],notes[i]]}),nt)}
var S=[
{title:'1. Ache o verbo',label:'Verbo',text:'<p>Em <i>Os pareceres do relator sobre as contas chegaram atrasados</i>, comece pelo verbo: <b>chegaram</b>.</p>',scene:function(){return mk(['n','n','n','a','n'],['','','','verbo',''],'PASSO 1: O VERBO','a palavra que flexiona em tempo e pessoa')}},
{title:'2. Pergunte: quem chegou?',label:'Sujeito',text:'<p>Pergunte <i>quem chegou?</i>. A resposta mais longa é <b>os pareceres do relator sobre as contas</b>. Esse é todo o sujeito.</p>',scene:function(){return mk(['a','a','a','n','n'],['sujeito','sujeito','sujeito','',''],'PASSO 2: O SUJEITO','quem pratica ou sofre o que o verbo diz')}},
{title:'3. Risque os adjuntos',label:'Núcleo',text:'<p>As expressões com preposição (<i>do relator</i>, <i>sobre as contas</i>) apenas completam o substantivo. Ao riscá-las, sobra o <b>núcleo</b>: <i>pareceres</i>. É ele que comanda o verbo.</p>',scene:function(){return mk(['a','m','m','n','n'],['núcleo','risque','risque','',''],'PASSO 3: O NÚCLEO','adjuntos não mandam no verbo')}},
{title:'4. Concorde',label:'Verbo',text:'<p>Núcleo no plural, verbo no plural: <b>chegaram</b>. O predicativo <i>atrasados</i> acompanha o núcleo em gênero e número.</p>',scene:function(){return mk(['d','n','n','d','d'],['plural','','','plural','plural'],'PASSO 4: CONCORDÂNCIA','verbo e predicativo seguem o núcleo')}},
{title:'Exceção: verbo impessoal',label:'Impessoal',text:'<p>Em <i>Havia muitas dúvidas</i>, <i>dúvidas</i> não é sujeito, e sim objeto direto. <b>Haver</b> no sentido de existir é impessoal, e fica sempre no singular. O mesmo vale para <i>fazer</i> (tempo) e para fenômenos da natureza.</p>',scene:function(){return sc('VERBO IMPESSOAL',[['Havia','a','singular'],['muitas','n'],['dúvidas','m','objeto direto']],'sem sujeito: o verbo não varia')}}
];
K.explain({w:720,h:200,steps:S,alt:'Concordância verbal passo a passo: verbo, sujeito, núcleo, concordância e caso do verbo impessoal'});
})();