(function(){
var K=window.K,X=K.X;
function bars(tr,va,lab){ // altura em px proporcional ao erro
  var o=[X.zone('z',10,10,420,310,'Erro do modelo'),X.line('ax',50,280,410,280,''),X.text('t1',90,300,'treino','t','middle'),X.text('t2',190,300,'validação','t','middle')];
  o.push(X.box('btr',60,280-tr*2.4,60,tr*2.4,String(tr)+'%','a'));
  o.push(X.box('bva',160,280-va*2.4,60,va*2.4,String(va)+'%','d'));
  o.push(X.text('lab',250,150,lab,'t')); return o}
var S=[
{label:'0. Divisão',title:'Treino, validação e teste',text:'<p>Os dados são separados: <b>treino</b> (ajusta os parâmetros), <b>validação</b> (escolhe hiperparâmetros e momento de parar) e <b>teste</b> (nota final, usado uma vez). Avaliar no mesmo conjunto em que se treinou esconde o problema do sobreajuste.</p>',
 scene:function(){return [X.box('a',40,80,300,60,'Treino (70%)','a','ajusta os pesos'),X.box('b',350,80,160,60,'Validação (15%)','n','ajusta hiperparâmetros'),X.box('c',520,80,160,60,'Teste (15%)','d','nota final'),X.text('t',40,200,'Proporções são exemplos; o teste nunca deve influenciar as escolhas.','t')]}},
{label:'1. Underfitting',title:'Modelo simples demais: underfitting',text:'<p>O erro é <b>alto no treino e na validação</b>: o modelo não captura o padrão (alto viés). Soluções: modelo mais expressivo, mais atributos relevantes, treinar por mais tempo, reduzir a regularização.</p>',
 scene:function(){return bars(30,32,'underfitting: ambos altos\n(alto viés)')}},
{label:'2. Bom ajuste',title:'Bom ajuste: o ponto de equilíbrio',text:'<p>O erro é <b>baixo e parecido</b> nos dois conjuntos. O modelo <b>generaliza</b>. O objetivo do treino não é errar zero no treino, e sim errar pouco em dados novos.</p>',
 scene:function(){return bars(10,12,'bom ajuste: ambos baixos\ne próximos')}},
{label:'3. Overfitting',title:'Complexo demais: overfitting',text:'<p>O erro de treino é baixíssimo, mas o de validação é alto: o modelo <b>decorou</b> o treino, inclusive o ruído (alta variância). Sinal clássico: a diferença entre as curvas de treino e de validação cresce com as épocas.</p>',
 scene:function(){return bars(2,25,'overfitting: treino baixo,\nvalidação alto (alta variância)')}},
{label:'4. Remédios',title:'Como combater o overfitting',text:'<p>Mais dados, <i>data augmentation</i>, <b>regularização</b> (L1, L2), <b><i>dropout</i></b> em redes neurais, simplificar o modelo, selecionar atributos e <b><i>early stopping</i></b> (parar quando a validação para de melhorar).</p>',
 scene:function(){return [X.zone('z',10,10,700,310,'Remédios'),X.box('r1',30,60,200,56,'Mais dados','n','e data augmentation'),X.box('r2',260,60,200,56,'Regularização','n','L1, L2, dropout'),X.box('r3',490,60,200,56,'Modelo mais simples','n','menos parâmetros'),X.box('r4',30,150,200,56,'Early stopping','n','para na melhor validação'),X.box('r5',260,150,200,56,'Seleção de atributos','n','remove ruído'),X.box('r6',490,150,200,56,'Validação cruzada','a','mede a generalização')]}},
{label:'5. K-fold',title:'Validação cruzada k-fold (k = 5)',text:'<p>Os dados são divididos em <b>5 partições</b>. Em cada rodada, <b>1 partição é teste e as outras 4 são treino</b>; repete-se 5 vezes e tira-se a <b>média</b> das métricas. Mostra a estabilidade do modelo e usa bem bases pequenas.</p>',
 scene:function(){var o=[X.zone('z',10,10,700,310,'k-fold, k = 5')];for(var r=0;r<5;r++){for(var c=0;c<5;c++){o.push(X.box('f'+r+c,90+c*110,50+r*50,100,38,r===c?'teste':'treino',r===c?'d':'n'))}o.push(X.text('rr'+r,20,74+r*50,'rodada '+(r+1),'t'))}o.push(X.text('mm',90,310,'métrica final = média das 5 rodadas','t'));return o}}
];
K.explain({w:720,h:330,steps:S,alt:'Animação de underfitting, bom ajuste, overfitting e validação cruzada'});
})();
