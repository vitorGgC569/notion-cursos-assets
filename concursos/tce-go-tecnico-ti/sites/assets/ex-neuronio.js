(function(){
var K=window.K,X=K.X;
function net(c){return [
 X.circ('x1',60,90,24,'x1 = 2','n'),X.circ('x2',60,210,24,'x2 = 1','n'),
 X.line('l1',84,95,300,140,'',true),X.line('l2',84,205,300,160,'',true),
 X.text('w1',150,100,'w1 = '+(c.w1||'0,5'),'t'),X.text('w2',150,205,'w2 = '+(c.w2||'-1'),'t'),
 X.box('s',300,110,120,80,'z = x1·w1 + x2·w2 + b','n','b = '+(c.b||'0,5')),
 X.line('l3',420,150,520,150,'',true),
 X.box('a',520,115,110,70,'a = sigmoide(z)','n'),
 X.line('l4',630,150,680,150,'',true)]}
var S=[
{label:'0. Neurônio',title:'Um neurônio artificial: entradas, pesos e viés',text:'<p>Cada entrada é multiplicada por um <b>peso</b>; os produtos são somados com o <b>viés</b> (<i>bias</i>) para formar <b>z</b>. Os pesos e o viés são os <b>parâmetros</b> que o treinamento ajusta. Exemplo numérico: x1 = 2, x2 = 1, w1 = 0,5, w2 = −1, b = 0,5.</p>',
 scene:function(){return net({})}},
{label:'1. Soma',title:'Passo 1: a soma ponderada',text:'<p><code>z = 2·0,5 + 1·(−1) + 0,5 = 0,5</code>. Até aqui o cálculo é linear. Se empilhássemos só camadas lineares, o resultado continuaria linear.</p>',
 scene:function(){return net({}).concat([X.box('zv',300,215,120,40,'z = 0,5','a')])}},
{label:'2. Ativação',title:'Passo 2: a função de ativação (não linearidade)',text:'<p>A saída passa por uma função não linear. Com a <b>sigmoide</b>, <code>a = 1/(1+e<sup>−z</sup>)</code>, a saída fica entre 0 e 1 (aqui lida como probabilidade): <code>a = 0,6225</code>. Em camadas ocultas costuma-se usar <b>ReLU</b>, <code>max(0, z)</code>.</p>',
 scene:function(){return net({}).concat([X.box('zv',300,215,120,40,'z = 0,5','n'),X.box('av',520,215,110,40,'a = 0,6225','a')])}},
{label:'3. Perda',title:'Passo 3: a função de perda mede o erro',text:'<p>O valor esperado é y = 1. Com o erro quadrático, <code>L = (a − y)² = (0,6225 − 1)² = 0,1425</code>. Quanto menor a perda, melhor o ajuste. Em classificação usa-se muito a <b>entropia cruzada</b>.</p>',
 scene:function(){return net({}).concat([X.box('av',520,215,110,40,'a = 0,6225','n'),X.box('yv',640,215,70,40,'y = 1','n'),X.box('lv',400,270,230,40,'perda L = 0,1425','a')])}},
{label:'4. Gradiente',title:'Passo 4: retropropagação calcula o gradiente',text:'<p>A <b>retropropagação</b> aplica a regra da cadeia da saída para a entrada: <code>dL/dz = 2(a − y)·a(1 − a) = −0,1774</code>. Daí saem <code>dL/dw1 = −0,3549</code>, <code>dL/dw2 = −0,1774</code> e <code>dL/db = −0,1774</code>. O sinal negativo diz que aumentar esses parâmetros reduz a perda.</p>',
 scene:function(){return net({}).concat([X.line('b1',300,170,100,230,'a',true),X.box('g',300,215,230,80,'gradientes','a','dL/dw1 = −0,3549\ndL/dw2 = −0,1774   dL/db = −0,1774')])}},
{label:'5. Atualização',title:'Passo 5: a descida do gradiente atualiza os pesos',text:'<p>Com taxa de aprendizado <b>0,5</b>: <code>w = w − η·gradiente</code>. Resultado: <code>w1 = 0,6774</code>, <code>w2 = −0,9113</code>, <code>b = 0,5887</code>. Taxa alta demais faz o treino oscilar ou divergir; baixa demais, converge devagar.</p>',
 scene:function(){return net({w1:'0,6774',w2:'−0,9113',b:'0,5887'}).concat([X.box('nw',300,215,260,40,'novos parâmetros (η = 0,5)','a')])}},
{label:'6. Repetir',title:'Passo 6: repetir até convergir',text:'<p>Com os novos pesos, <code>z = 1,0323</code>, <code>a = 0,7374</code> e a perda caiu de <b>0,1425</b> para <b>0,0690</b>. Treinar é repetir esse ciclo (passo à frente, perda, retropropagação, atualização) por muitas <b>épocas</b>, em lotes (<i>mini-batches</i>), vigiando o desempenho no conjunto de validação.</p>',
 scene:function(){return [X.zone('z',16,16,688,300,'Uma iteração de treino'),X.box('p1',40,60,140,56,'perda 0,1425','n','antes'),X.line('ar',180,88,250,88,'a',true),X.box('p2',250,60,140,56,'perda 0,0690','a','depois'),X.text('t',40,170,'passo à frente  →  perda  →  retropropagação  →  atualização dos pesos','t'),X.text('t2',40,200,'repete por várias épocas; validação evita overfitting','t')]}}
];
K.explain({w:720,h:330,steps:S,alt:'Animação do treinamento de um neurônio: soma ponderada, ativação, perda, gradiente e atualização'});
})();
