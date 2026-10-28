(function(){
var K=window.K,X=K.X;
function row(tokens,y){var x=16,N=[];tokens.forEach(function(t,i){var w=Math.max(40,Math.round(t[0].length*8+24));N.push(X.box('t'+i,x,y,w,42,t[0],t[1]||'n',t[2]));x+=w+8});return N}
function sc(h,tokens,note){var N=[X.text('hd',16,34,h,'b')].concat(row(tokens,60));if(note)N.push(X.text('nt',16,128,note,'t'));return N}
var S=[
{title:'Regra geral: ênclise',label:'Ênclise',text:'<p>Sem nenhuma palavra atrativa, o pronome vem <b>depois</b> do verbo, ligado por hífen: <i>Decidiu-se o prazo.</i> Nunca se começa a frase com pronome oblíquo átono.</p>',scene:function(){return sc('ÊNCLISE',[['Decidiu'],['-se','a'],['o prazo.']],'o pronome depois do verbo')}},
{title:'Atrativo: próclise',label:'Próclise',text:'<p>Palavras negativas, advérbios sem pausa, pronomes relativos e indefinidos, conjunções subordinativas e frases exclamativas puxam o pronome para <b>antes</b> do verbo: <i>Não se decidiu o prazo.</i></p>',scene:function(){return sc('PRÓCLISE',[['Não','a'],['se','a'],['decidiu'],['o prazo.']],'não é palavra atrativa')}},
{title:'Outros atrativos',label:'Atrativos',text:'<p>Outras palavras atrativas: <i>nunca, jamais, ontem, que, quem, tudo, nada, alguém, quando, se, embora, porque</i>. Ex.: <i>Nada o impediu</i>; <i>O prazo que se decidiu</i>; <i>Quando se decidiu o prazo...</i></p>',scene:function(){return sc('PALAVRAS ATRATIVAS',[['Nada','a'],['o','a'],['impediu'],['de recorrer.']],'indefinido atrai o pronome')}},
{title:'Futuro: mesóclise',label:'Mesóclise',text:'<p>No futuro do presente e no futuro do pretérito, <b>sem atrativo</b>, o pronome entra no meio do verbo: <i>Entregá-lo-ei amanhã.</i> Com atrativo, volta a próclise: <i>Não o entregarei.</i></p>',scene:function(){return sc('MESÓCLISE',[['Entregá'],['-lo-','a'],['ei'],['amanhã.']],'pronome no meio do verbo')}},
{title:'Resumo',label:'Resumo',text:'<p>Pergunte duas coisas: <b>há atrativo?</b> Se sim, próclise. <b>O verbo está no futuro?</b> Se sim e sem atrativo, mesóclise. Em qualquer outro caso, ênclise.</p>',scene:function(){return sc('RESUMO',[['atrativo: próclise','d'],['futuro: mesóclise','d'],['demais: ênclise','d']],'atrativo, futuro, regra geral')}}
];
K.explain({w:720,h:180,steps:S,alt:'Colocação pronominal: próclise, ênclise e mesóclise'});
})();