(function(){
var K=window.K,X=K.X;
/* tabela pequena: heads = cabeçalhos, rows = linhas (V/F), hl = índice da linha destacada, x,y = canto */
function tab(x,y,heads,rows,hl,cw){
  cw=cw||64;var out=[];
  heads.forEach(function(h,c){out.push(X.box('h'+c,x+c*(cw+6),y,cw,26,h,'m'))});
  rows.forEach(function(r,i){r.forEach(function(v,c){var last=c===r.length-1;
    out.push(X.box('c'+i+'_'+c,x+c*(cw+6),y+34+i*32,cw,26,v,(i===hl&&last)?'d':(i===hl?'a':'n')))})});
  return out;
}
var P=[['V','V'],['V','F'],['F','V'],['F','F']];
function rows(f){return P.map(function(r){return r.concat([f(r[0]==='V',r[1]==='V')?'V':'F'])})}
var S=[
{label:'0. Proposição',title:'O que é e o que não é proposição',text:'<p>Proposição é uma <b>sentença declarativa</b> que pode ser julgada <b>verdadeira (V) ou falsa (F)</b>, e nunca as duas. Perguntas, ordens, exclamações e sentenças abertas (com variável sem valor) <b>não são proposições</b>. Para o exame, descubra primeiro se a frase tem valor lógico.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Proposição ou não?'),
  X.box('a',40,60,300,56,'Brasília é a capital do Brasil.','a','proposição, valor V'),
  X.box('b',380,60,300,56,'2 + 2 = 5','a','proposição, valor F'),
  X.box('c',40,150,300,56,'Que horas são?','m','pergunta: não é proposição'),
  X.box('d',380,150,300,56,'x + 1 = 3','m','sentença aberta: não é proposição'),
  X.box('e',40,240,300,56,'Estude lógica hoje!','m','ordem: não é proposição'),
  X.box('f',380,240,300,56,'Todo número par é divisível por 2.','a','proposição, valor V')]}},
{label:'1. Negação',title:'Negação (~p): inverte o valor',text:'<p>A negação troca V por F. Cuidado com a linguagem: a negação de "<b>todo</b> A é B" é "<b>algum</b> A não é B", e a negação de "chove" é "não chove". Dupla negação devolve a proposição original: <code>~(~p) = p</code>.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'~p'),].concat(tab(60,70,['p','~p'],[['V','F'],['F','V']],-1),[
  X.box('ex1',300,70,360,56,'p: o servidor está ligado','n'),X.box('ex2',300,140,360,56,'~p: o servidor não está ligado','a'),
  X.box('ex3',300,220,360,56,'~(~p): o servidor está ligado','n','volta a ser p')])}},
{label:'2. Conjunção',title:'Conjunção (p ∧ q, "e"): só vale V se as duas valem',text:'<p>"p e q" é verdadeira <b>apenas</b> quando p e q são ambas verdadeiras. Basta uma falsa para a conjunção ser falsa. Palavras como "mas", "porém" e "além disso" também funcionam como "e".</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'p ∧ q')].concat(tab(60,70,['p','q','p ∧ q'],rows(function(p,q){return p&&q}),0),[X.box('n1',380,90,290,90,'1 linha verdadeira','a','a única com V e V'),X.box('n2',380,200,290,70,'3 linhas falsas','n','uma falsa já derruba')])}},
{label:'3. Disjunção',title:'Disjunção (p ∨ q, "ou"): só vale F se as duas valem F',text:'<p>O "ou" lógico é <b>inclusivo</b>: vale V se pelo menos uma for V (inclusive as duas). Só é falso quando as duas são falsas. O "ou" exclusivo (<b>ou p, ou q</b>) vale V quando os valores são diferentes.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'p ∨ q')].concat(tab(60,70,['p','q','p ∨ q'],rows(function(p,q){return p||q}),3),[X.box('n1',380,90,290,90,'1 linha falsa','a','só quando F e F'),X.box('n2',380,200,290,70,'3 linhas verdadeiras','n','inclusive V e V')])}},
{label:'4. Condicional',title:'Condicional (p → q, "se p, então q"): só é F quando p é V e q é F',text:'<p>É o conectivo que mais cai. A condicional é falsa <b>somente</b> na linha em que a condição p é verdadeira e a consequência q é falsa. Se p é falsa, a condicional é verdadeira, seja qual for q. Leituras equivalentes: "p é suficiente para q", "q é necessário para p".</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'p → q')].concat(tab(60,70,['p','q','p → q'],rows(function(p,q){return !p||q}),1),[X.box('n1',380,90,290,90,'F só em V → F','a','promessa quebrada'),X.box('n2',380,200,290,70,'p falsa: sempre V','n','nada foi prometido')])}},
{label:'5. Bicondicional',title:'Bicondicional (p ↔ q): V quando os valores são iguais',text:'<p>"p se e somente se q" é verdadeira quando p e q têm o <b>mesmo valor</b> (as duas V ou as duas F). É falsa quando diferem. Equivale a <code>(p → q) ∧ (q → p)</code>. O "ou exclusivo" é a negação da bicondicional.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'p ↔ q')].concat(tab(60,70,['p','q','p ↔ q'],rows(function(p,q){return p===q}),0),[X.box('n1',380,90,290,90,'V e F iguais','a','V,V e F,F dão V'),X.box('n2',380,200,290,70,'valores diferentes','n','dão F')])}},
{label:'6. Negações e equivalências',title:'As negações e as equivalências que mais caem',text:'<p><b>De Morgan:</b> <code>~(p ∧ q) = ~p ∨ ~q</code> e <code>~(p ∨ q) = ~p ∧ ~q</code>. <b>Negação da condicional:</b> <code>~(p → q) = p ∧ ~q</code>. <b>Equivalências da condicional:</b> <code>p → q = ~q → ~p = ~p ∨ q</code> (a contrapositiva e a forma com "ou"). A recíproca (q → p) e a inversa (~p → ~q) <b>não</b> são equivalentes.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Para decorar'),
  X.box('a',40,60,300,56,'~(p ∧ q)  =  ~p ∨ ~q','a','De Morgan'),X.box('b',380,60,300,56,'~(p ∨ q)  =  ~p ∧ ~q','a','De Morgan'),
  X.box('c',40,140,300,56,'~(p → q)  =  p ∧ ~q','a','nega a condicional'),X.box('d',380,140,300,56,'p → q  =  ~q → ~p  =  ~p ∨ q','a','equivalentes'),
  X.box('e',40,230,300,56,'recíproca q → p','m','NÃO equivale a p → q'),X.box('f',380,230,300,56,'inversa ~p → ~q','m','NÃO equivale a p → q')]}}
];
K.explain({w:720,h:350,steps:S,alt:'Animação dos conectivos lógicos com as tabelas-verdade de negação, conjunção, disjunção, condicional e bicondicional'});
})();
