(function(){
var K=window.K,X=K.X;
function top(act,done){
  var names=['Simples','Conjunção','Condicional','Negação'],subs=['p, q e r','p e q','se p e q, então r','da frase inteira'],N=[],i;
  for(i=0;i<4;i++){
    var c=i===act?'a':(done&&done.indexOf(i)>=0?'d':'m');
    N.push(X.box('f'+i,16+i*174,14,162,52,names[i],c,subs[i]));
  }
  return N;
}
function scn(title){return [X.zone('zs',16,86,688,282,title)]}
var S=[
{label:'0. A frase',title:'Uma frase de uma Câmara fictícia',text:'<p>A <b>Câmara Municipal de Vila Exemplo</b>, que é <b>fictícia</b>, tem uma regra: <b>"Se o vereador compareceu e o quórum foi atingido, então a sessão é aberta."</b> É uma proposição <b>composta</b>, com três proposições simples e dois conectivos. O caso mostra, em sete passos, como montar a <b>tabela-verdade</b> dessa frase e como negá-la.</p>',
 scene:function(){var N=top(-1);N=N.concat(scn('A frase em símbolos'));
  N.push(X.box('c1',34,126,200,52,'p','a','o vereador compareceu'));
  N.push(X.box('c2',254,126,200,52,'q','a','o quórum foi atingido'));
  N.push(X.box('c3',474,126,196,52,'r','a','a sessão é aberta'));
  N.push(X.text('t0',34,250,'Em símbolos: (p ∧ q) → r. Cada passo acende um bloco.','t'));return N}},
{label:'1. Proposições simples',title:'Cada letra é uma proposição',text:'<p>Cada uma das três frases é uma <b>proposição simples</b>: uma sentença declarativa que pode ser julgada <b>verdadeira (V)</b> ou <b>falsa (F)</b>. Uma pergunta ("a sessão foi aberta?") ou uma ordem ("abra a sessão") não seria proposição. A tabela-verdade lista <b>todas as combinações</b> de V e F das letras.</p>',
 scene:function(){var N=top(0);N=N.concat(scn('Proposições simples'));
  N.push(X.box('s1',34,120,200,52,'p','d','V ou F'));
  N.push(X.box('s2',254,120,200,52,'q','d','V ou F'));
  N.push(X.box('s3',474,120,196,52,'r','d','V ou F'));
  N.push(X.text('t1',34,226,'Pergunta, ordem e exclamação não são proposições.','t'));
  N.push(X.text('t1b',34,252,'Sentença aberta, como "x + 2 = 5", também não é.','t'));return N}},
{label:'2. As linhas',title:'Três letras, oito linhas',text:'<p>Com <b>n</b> proposições simples distintas, a tabela tem <b>2<sup>n</sup></b> linhas. Aqui, n = 3 e 2 × 2 × 2 = <b>8 linhas</b>. A primeira coluna começa com 4 V e 4 F, a segunda alterna de 2 em 2 e a terceira alterna de 1 em 1. Assim nenhuma combinação fica de fora nem se repete.</p>',
 scene:function(){var N=top(0);N=N.concat(scn('Combinações de V e F'));
  N.push(X.box('l1',34,120,150,52,'p','d','VVVV FFFF'));
  N.push(X.box('l2',204,120,150,52,'q','d','VVFF VVFF'));
  N.push(X.box('l3',374,120,150,52,'r','d','VFVF VFVF'));
  N.push(X.box('l4',544,120,126,52,'Linhas','a','2 elevado a 3 = 8'));
  N.push(X.text('t2',34,226,'2 proposições: 4 linhas. 3: 8 linhas. 4: 16 linhas.','t'));
  N.push(X.text('t2b',34,252,'Essa conta confere se a sua tabela está completa.','t'));return N}},
{label:'3. A conjunção',title:'p e q: só vale com as duas verdadeiras',text:'<p>O primeiro conectivo a resolver é o <b>"e"</b> (p ∧ q), que está dentro dos parênteses. A <b>conjunção</b> só é verdadeira quando <b>as duas são verdadeiras</b>. Basta uma falsa para o resultado ser falso. Das quatro combinações de p e q, só a primeira dá V.</p>',
 scene:function(){var N=top(1);N=N.concat(scn('Resolvendo p ∧ q'));
  N.push(X.box('j1',34,120,150,52,'p V, q V','d','p ∧ q = V'));
  N.push(X.box('j2',204,120,150,52,'p V, q F','m','p ∧ q = F'));
  N.push(X.box('j3',374,120,150,52,'p F, q V','m','p ∧ q = F'));
  N.push(X.box('j4',544,120,126,52,'p F, q F','m','p ∧ q = F'));
  N.push(X.text('t3',34,226,'Uma falsa derruba a conjunção.','t'));
  N.push(X.text('t3b',34,252,'Já na disjunção ("ou"), uma verdadeira salva.','t'));return N}},
{label:'4. A condicional',title:'Se (p e q), então r: só falha com V e F',text:'<p>Agora a <b>condicional</b>: <b>(p ∧ q) → r</b>. Ela é uma promessa e só é <b>falsa</b> quando o antecedente (p ∧ q) é <b>verdadeiro</b> e o consequente (r) é <b>falso</b>. Se o antecedente é falso, a promessa não foi testada, e a condicional é <b>verdadeira</b>. Quem prometeu "se compareceu e houve quórum, abre a sessão" só descumpre se os dois aconteceram e a sessão não abriu.</p>',
 scene:function(){var N=top(2,[0,1]);N=N.concat(scn('Resolvendo a condicional'));
  N.push(X.box('k1',34,120,200,52,'p ∧ q V, r V','d','condicional V'));
  N.push(X.box('k2',254,120,200,52,'p ∧ q V, r F','n','condicional F'));
  N.push(X.box('k3',474,120,196,52,'p ∧ q F','d','condicional V'));
  N.push(X.text('t4',34,226,'Errado: dizer que a condicional é falsa quando o antecedente é falso.','t'));
  N.push(X.text('t4b',34,252,'Só o caso "verdadeiro leva ao falso" a quebra.','t'));return N}},
{label:'5. O resultado',title:'Sete linhas V e uma linha F',text:'<p>Juntando as oito linhas, a frase só é <b>falsa</b> na linha em que p é V, q é V e r é F: o vereador compareceu, houve quórum e a sessão <b>não</b> abriu. Nas outras <b>sete linhas</b> ela é verdadeira. Como a coluna final tem V e F, a proposição é uma <b>contingência</b>, e não uma tautologia (só V) nem uma contradição (só F).</p>',
 scene:function(){var N=top(2,[0,1]);N=N.concat(scn('A coluna final'));
  N.push(X.box('z1',34,120,200,52,'7 linhas','d','resultado V'));
  N.push(X.box('z2',254,120,200,52,'1 linha','n','p V, q V, r F: resultado F'));
  N.push(X.box('z3',474,120,196,52,'Contingência','a','tem V e F'));
  N.push(X.text('t5',34,226,'Tautologia: só V. Contradição: só F. Contingência: os dois.','t'));
  N.push(X.text('t5b',34,252,'A linha falsa é a única em que a promessa foi quebrada.','t'));return N}},
{label:'6. A negação',title:'Negar a condicional dá "p e não q"',text:'<p>Para <b>negar</b> a frase, lembre que a negação de uma condicional <b>não é outra condicional</b>: ~((p ∧ q) → r) equivale a <b>(p ∧ q) ∧ ~r</b>. Em palavras: <b>"O vereador compareceu, o quórum foi atingido e a sessão não foi aberta."</b> É a única linha falsa da tabela. A contrapositiva, ~r → ~(p ∧ q), por sua vez, é <b>equivalente</b> à frase original, e pela lei de De Morgan ~(p ∧ q) é ~p ∨ ~q.</p>',
 scene:function(){var N=top(3,[0,1,2]);N=N.concat(scn('Negação e equivalência'));
  N.push(X.box('g1',34,120,200,52,'Negação','a','(p ∧ q) e não r'));
  N.push(X.box('g2',254,120,200,52,'Contrapositiva','d','~r → ~(p ∧ q)'));
  N.push(X.box('g3',474,120,196,52,'De Morgan','d','~p ou ~q'));
  N.push(X.text('t6',34,226,'Se a sessão não abriu, então faltou o vereador ou faltou o quórum.','t'));
  N.push(X.text('t6b',34,252,'Equivalente à frase original, e dita de outro jeito.','t'));return N}}
];
K.explain({w:720,h:380,steps:S,alt:'Animação que monta a tabela-verdade da frase "se o vereador compareceu e o quórum foi atingido, então a sessão é aberta": as proposições simples, as oito linhas, a conjunção, a condicional, o resultado com sete linhas verdadeiras e uma falsa, e a negação e a contrapositiva'});
})();
