(function(){
var K=window.K,X=K.X;
var ALT=[['A','sempre, nunca','absoluto'],['B','tem apoio no texto','cabe no texto'],['C','não aparece','extrapola'],['D','inverte a ideia','inverte'],['E','exagera','generaliza']];
function scene(o){
  var N=[];
  N.push(X.box('cmd',20,14,680,42,'O comando: o que a questão pede?',o.cmd||'m',o.cmds));
  N.push(X.box('txt',20,70,680,64,'O texto',o.txt||'m',o.txts));
  if(o.pills){['tese','mas, porém (virada)','conclusão'].forEach(function(p,i){N.push(X.pill('pl'+i,60+i*190,104,p,'a',150))})}
  ALT.forEach(function(a,i){var st=(o.alts&&o.alts[i])||'m';N.push(X.box('alt'+i,20+i*138,156,128,56,a[0]+') '+a[1],st,o.sub&&o.sub[i]?o.sub[i]:''))});
  return N;
}
var S=[
{title:'1. Leia o comando',label:'Comando',text:'<p>Antes do texto, entenda o que pedem: o que está <b>certo</b> ou <b>errado</b>? Uma ideia central, uma inferência, o sentido de uma expressão? Dois comandos parecidos podem exigir respostas diferentes: <i>o texto deixa claro</i> pede o que está dito; <i>é correto inferir</i> pede o que se deduz.</p>',scene:function(){return scene({cmd:'a',cmds:'o que a questão pede?'})}},
{title:'2. Leia o texto marcando',label:'Texto',text:'<p>Leia o texto uma vez com a caneta na mão. Marque a <b>tese</b>, as palavras de <b>virada</b> (mas, porém, contudo, no entanto) e a <b>conclusão</b>. O que vem depois do <i>porém</i> costuma ser o ponto mais importante.</p>',scene:function(){return scene({txt:'a',txts:'tese, virada, conclusão',pills:1})}},
{title:'3. Teste cada alternativa',label:'Alternativas',text:'<p>Para cada alternativa, pergunte: <b>isso está no texto, ou se deduz dele?</b> Não pergunte se é verdade no mundo real. A banca só quer o que o texto autoriza.</p>',scene:function(){return scene({txt:'n',alts:['n','n','n','n','n']})}},
{title:'4. Elimine os três defeitos',label:'Eliminar',text:'<p>Três defeitos aparecem sempre: a alternativa <b>extrapola</b> (diz o que o texto não disse), <b>inverte</b> (troca causa por consequência ou diz o contrário) ou <b>generaliza</b> (usa <i>sempre, nunca, todos, apenas</i> onde o texto fala em alguns).</p>',scene:function(){return scene({txt:'n',alts:['m','a','m','m','m'],sub:[ALT[0][2],ALT[1][2],ALT[2][2],ALT[3][2],ALT[4][2]]})}},
{title:'5. Sobraram duas? Volte ao texto',label:'Em dúvida',text:'<p>Se restarem duas, não escolha pelo “jeitão”. Volte ao texto e ache a frase que sustenta cada uma. A que não tiver apoio literal sai.</p>',scene:function(){return scene({txt:'a',txts:'qual frase sustenta?',alts:['m','a','m','m','a'],sub:['','apoio na frase 2','','','sem apoio']})}},
{title:'6. Marque e siga',label:'Confirmar',text:'<p>Marcou, confirme que a alternativa responde ao comando e siga. Não reabra a questão depois sem motivo: uma releitura apressada faz você trocar o certo pelo errado.</p>',scene:function(){return scene({cmd:'n',txt:'n',alts:['m','d','m','m','m']})}}
];
K.explain({w:720,h:230,steps:S,alt:'Método de eliminação de alternativas'});
})();