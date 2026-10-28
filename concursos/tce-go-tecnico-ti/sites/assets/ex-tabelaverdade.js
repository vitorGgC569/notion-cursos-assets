(function(){
var K=window.K,X=K.X;
var HEAD=['p','q','r','~r','p ∧ q','(p ∧ q) → ~r'];
var R=[];for(var i=0;i<8;i++){var p=i<4;var q=(Math.floor(i/2)%2)===0,r=(i%2)===0;var nr=!r,c=p&&q,res=!c||nr;R.push([p,q,r,nr,c,res])}
function vf(b){return b?'V':'F'}
/* cols = quantas colunas mostrar; hl = colunas em destaque; marca = linhas destacadas na última coluna */
function tab(cols,hl,marca){
  var out=[],x0=30,cw=[60,60,60,60,86,150],x=x0,y=40;
  for(var c=0;c<cols;c++){
    out.push(X.box('h'+c,x,y,cw[c],26,HEAD[c],hl.indexOf(c)>=0?'a':'m'));
    for(var i=0;i<8;i++){var v=vf(R[i][c]),st='n';if(hl.indexOf(c)>=0)st='a';if(marca&&c===cols-1&&marca(i))st='d';
      out.push(X.box('c'+i+'_'+c,x,y+34+i*30,cw[c],25,v,st))}
    x+=cw[c]+6;
  }
  return out;
}
var S=[
{label:'0. Quantas linhas',title:'Com 3 proposições simples, 2³ = 8 linhas',text:'<p>Cada proposição simples tem 2 valores possíveis, e as escolhas se multiplicam: <b>2ⁿ linhas</b> para n proposições. Para <code>(p ∧ q) → ~r</code>, n = 3 e a tabela tem 8 linhas. Preencha p com 4 V e 4 F, q alternando de 2 em 2, r alternando de 1 em 1. Assim nenhuma combinação se repete.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Passo 1: todas as combinações')].concat(tab(3,[],null),[X.box('n',290,70,390,90,'2 · 2 · 2 = 8 linhas','a','n proposições dão 2^n linhas'),X.box('n2',290,180,390,90,'p: VVVVFFFF · q: VVFFVVFF · r: VFVFVFVF','n','o padrão evita repetir ou esquecer linhas')])}},
{label:'1. Coluna ~r',title:'Resolva de dentro para fora: primeiro ~r',text:'<p>A coluna da negação troca cada valor de r. Monte as colunas intermediárias na ordem em que a fórmula seria calculada: parênteses primeiro, depois o conectivo principal.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Passo 2: negar r')].concat(tab(4,[3],null),[X.box('n',330,90,350,70,'~r','a','V vira F e F vira V')])}},
{label:'2. Coluna p ∧ q',title:'A conjunção (p ∧ q): V só nas duas primeiras linhas',text:'<p>Olhe só as colunas p e q. A conjunção é V apenas quando os dois são V: linhas 1 e 2. Nas outras seis linhas é F.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Passo 3: p e q')].concat(tab(5,[4],null),[X.box('n',400,90,280,70,'p ∧ q','a','V nas linhas 1 e 2')])}},
{label:'3. Conectivo principal',title:'O conectivo principal: (p ∧ q) → ~r',text:'<p>Agora a condicional, com antecedente <b>p ∧ q</b> e consequente <b>~r</b>. Ela só é F quando o antecedente é V e o consequente é F. Isso acontece na linha 1 (p ∧ q = V e ~r = F). Na linha 2, ~r = V e a condicional é V. Nas linhas em que p ∧ q é F, a condicional é V.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Passo 4: resultado')].concat(tab(6,[5],function(i){return !R[i][5]}))}},
{label:'4. Classificação',title:'Tautologia, contradição ou contingência?',text:'<p>Olhe a coluna final. <b>Tautologia</b>: todas V (ex.: <code>p ∨ ~p</code>). <b>Contradição</b>: todas F (ex.: <code>p ∧ ~p</code>). <b>Contingência</b>: há V e F. Aqui a coluna tem 1 F e 7 V: <b>contingência</b>. Duas proposições são <b>equivalentes</b> quando têm colunas finais idênticas.</p>',
 scene:function(){return [X.zone('z',10,10,700,330,'Passo 5: classifique'),
  X.box('a',40,60,200,80,'Tautologia','n','todas V\np ∨ ~p'),X.box('b',260,60,200,80,'Contradição','n','todas F\np ∧ ~p'),X.box('c',480,60,200,80,'Contingência','a','V e F misturados\n(p ∧ q) → ~r'),
  X.box('d',40,180,640,100,'Aqui: 7 V e 1 F','d','contingência. Para conferir equivalência, compare as colunas finais linha a linha.')]}}
];
K.explain({w:720,h:350,steps:S,alt:'Construção passo a passo da tabela-verdade de (p e q) implica não r, com 8 linhas'});
})();
