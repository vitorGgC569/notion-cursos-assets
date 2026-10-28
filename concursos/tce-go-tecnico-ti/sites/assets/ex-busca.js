(function(){
var K=window.K,X=K.X;
var V=[2,5,8,12,16,23,38,56,72,91],T=23;
function row(hi,state,y,lab,disc){
  var N=[],w=58,gap=6,x0=(720-(10*w+9*gap))/2;
  V.forEach(function(v,i){
    var c='n';if(disc&&disc.indexOf(i)>=0)c='m';if(hi.indexOf(i)>=0)c='a';if(state&&state[i])c=state[i];
    N.push(X.box('c'+i,x0+i*(w+gap),y,w,54,String(v),c,String(i)));
  });
  N.push(X.text('lb',x0,y-14,lab,'t'));return N;
}
var S=[
{label:'0. Cenário',title:'Procurar o 23 em um vetor ordenado',text:'<p>Vetor ordenado de 10 elementos e o valor procurado: <code>23</code>. Vamos comparar a busca <b>sequencial</b> (linear) com a <b>binária</b>. A binária só funciona se o vetor estiver <b>ordenado</b>.</p>',cmd:'v = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];  alvo = 23',scene:function(){return row([],null,150,'vetor ordenado, alvo = 23')}},
{label:'1. Sequencial',title:'Busca sequencial: um por um',text:'<p>Começa na posição 0 e avança até achar. O 23 está na posição 5, então foram <b>6 comparações</b>. No pior caso (item no fim ou ausente) seriam <b>n comparações</b>: <b>O(n)</b>. Foi a questão 22 e a 21 do TRT-14 de 2022.</p>',cmd:'for (i = 0; i < v.length; i++) if (v[i] === alvo) break;',out:'  →  achou na posição 5 (6 comparações)',
 scene:function(){var st={};for(var i=0;i<5;i++)st[i]='m';return row([5],st,150,'sequencial: passou por 0, 1, 2, 3, 4 e achou no 5')}},
{label:'2. Binária 1',title:'Busca binária: olha o meio',text:'<p>Início = 0, fim = 9, meio = 4 (valor 16). Como <code>16 &lt; 23</code>, o alvo só pode estar à direita: <b>descarta a metade esquerda</b>. Uma comparação eliminou 5 elementos.</p>',cmd:'meio = (0 + 9) / 2 = 4;  v[4] = 16  <  23',out:'  →  procura à direita (início = 5)',
 scene:function(){return row([4],null,150,'binária, passo 1: meio = 4 (16)')}},
{label:'3. Binária 2',title:'Binária: a metade que sobrou',text:'<p>Agora início = 5 e fim = 9, meio = 7 (valor 56). Como <code>56 &gt; 23</code>, o alvo está à esquerda do meio: <b>descarta a direita</b>. Restam as posições 5 e 6.</p>',cmd:'meio = (5 + 9) / 2 = 7;  v[7] = 56  >  23',out:'  →  procura à esquerda (fim = 6)',
 scene:function(){return row([7],null,150,'binária, passo 2: meio = 7 (56)',[0,1,2,3,4])}},
{label:'4. Binária 3',title:'Binária: achou',text:'<p>Início = 5, fim = 6, meio = 5 (valor 23). <code>23 === 23</code>: <b>achou em 3 comparações</b>. Cada passo corta o problema pela metade, por isso o custo é <b>O(log₂ n)</b>. Para 1.024 elementos, no máximo 10 passos; para um milhão, cerca de 20.</p>',cmd:'meio = (5 + 6) / 2 = 5;  v[5] = 23  ===  23',out:'  →  achou na posição 5 (3 comparações)',
 scene:function(){var st={5:'d'};return row([],st,150,'binária, passo 3: achou o 23',[0,1,2,3,4,6,7,8,9])}},
{label:'5. Comparar',title:'Resumo: O(n) contra O(log n)',text:'<p>Sequencial: <b>O(n)</b>, funciona em qualquer vetor. Binária: <b>O(log n)</b>, exige vetor ordenado. A diferença cresce com o tamanho: com 1 milhão de itens, a sequencial pode precisar de 1.000.000 de comparações e a binária de uns 20. Quando a questão fala em "dividir ao meio a cada passo", é logaritmo.</p>',
 scene:function(){return [X.zone('z',16,16,688,300,'Número máximo de comparações'),X.box('t1',40,52,200,44,'n','n','tamanho'),X.box('t2',260,52,200,44,'sequencial O(n)','n'),X.box('t3',480,52,200,44,'binária O(log₂ n)','a'),
 X.box('a1',40,110,200,40,'16','n'),X.box('a2',260,110,200,40,'16','n'),X.box('a3',480,110,200,40,'4','a'),
 X.box('b1',40,160,200,40,'1.024','n'),X.box('b2',260,160,200,40,'1.024','n'),X.box('b3',480,160,200,40,'10','a'),
 X.box('d1',40,210,200,40,'1.048.576','n'),X.box('d2',260,210,200,40,'1.048.576','n'),X.box('d3',480,210,200,40,'20','a')]}}
];
K.explain({w:720,h:330,steps:S,alt:'Animação comparando busca sequencial e busca binária em um vetor ordenado'});
})();
