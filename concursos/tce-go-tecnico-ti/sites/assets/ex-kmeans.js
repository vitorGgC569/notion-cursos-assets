(function(){
var K=window.K,X=K.X;
var P=[['A',1,1],['B',1.5,2],['C',3,4],['D',5,7],['E',3.5,5],['F',4.5,5],['G',3.5,4.5],['H',6,6.5]];
function sx(x){return 40+x*55} function sy(y){return 300-y*36}
function d2(p,c){return (p[1]-c[0])*(p[1]-c[0])+(p[2]-c[1])*(p[2]-c[1])}
function f(n){return (Math.round(n*100)/100).toString().replace('.',',')}
// roda k-means com centroides iniciais A e D
var cent=[[1,1],[5,7]],frames=[],asg=[];
for(var it=0;it<10;it++){
  asg=P.map(function(p){return d2(p,cent[0])<=d2(p,cent[1])?0:1});
  var nc=[0,1].map(function(k){var m=P.filter(function(p,i){return asg[i]===k});var sxs=0,sys=0;m.forEach(function(p){sxs+=p[1];sys+=p[2]});return [sxs/m.length,sys/m.length]});
  var moved=nc.some(function(c,k){return Math.abs(c[0]-cent[k][0])>1e-9||Math.abs(c[1]-cent[k][1])>1e-9});
  frames.push({cent:cent.map(function(c){return c.slice()}),asg:asg.slice(),next:nc,moved:moved});
  cent=nc; if(!moved)break;
}
function plot(cs,asg,showNext){
  var o=[X.zone('z',10,10,440,310,'Plano (x, y)'),X.line('ax',40,300,440,300,''),X.line('ay',40,300,40,30,'')];
  P.forEach(function(p,i){var c=asg?(asg[i]===0?'a':'d'):'n';o.push(X.circ('p'+p[0],sx(p[1]),sy(p[2]),11,p[0],c))});
  if(cs)cs.forEach(function(c,k){o.push(X.box('c'+k,sx(c[0])-17,sy(c[1])-11,34,22,'C'+(k+1),k===0?'a':'d'))});
  return o}
function side(t){return [X.text('s1',470,60,t[0]||'','t'),X.text('s2',470,90,t[1]||'','t'),X.text('s3',470,120,t[2]||'','t'),X.text('s4',470,150,t[3]||'','t')]}
function lst(k,a){return P.filter(function(p,i){return a[i]===k}).map(function(p){return p[0]}).join(', ')}
var S=[
{label:'0. Dados',title:'Dados sem rótulo: aprendizado não supervisionado',text:'<p>Temos 8 pontos com duas variáveis e <b>nenhum rótulo</b>. O <b>k-means</b> procura <b>k grupos</b> de pontos próximos. Aqui k = 2. Antes de usar, costuma-se <b>padronizar</b> as variáveis, porque o algoritmo usa distância.</p>',
 scene:function(){return plot(null,null).concat(side(['8 pontos, sem rótulo','objetivo: k = 2 grupos']))}},
{label:'1. Centroides',title:'Passo 1: escolher k centroides iniciais',text:'<p>Sorteiam-se (ou escolhem-se) <b>k pontos como centroides</b> iniciais. Aqui: C1 = A (1; 1) e C2 = D (5; 7). O resultado pode depender dessa escolha, por isso usa-se a inicialização k-means++ e várias execuções.</p>',
 scene:function(){return plot(frames[0].cent,null).concat(side(['C1 = (1; 1)','C2 = (5; 7)']))}}
];
frames.forEach(function(fr,i){
  var a=lst(0,fr.asg),b=lst(1,fr.asg);
  S.push({label:(2+2*i)+'. Atribuir',title:'Iteração '+(i+1)+': cada ponto vai para o centroide mais próximo',text:'<p>Calcula-se a <b>distância euclidiana</b> de cada ponto aos centroides e atribui-se ao mais próximo. Grupo 1: <b>'+a+'</b>. Grupo 2: <b>'+b+'</b>.</p>',
   scene:function(){return plot(fr.cent,fr.asg).concat(side(['Grupo 1: '+a,'Grupo 2: '+b]))}});
  S.push({label:(3+2*i)+'. Recalcular',title:'Iteração '+(i+1)+': recalcular os centroides pela média',text:'<p>Cada centroide passa a ser a <b>média</b> dos pontos do seu grupo: C1 = ('+f(fr.next[0][0])+'; '+f(fr.next[0][1])+') e C2 = ('+f(fr.next[1][0])+'; '+f(fr.next[1][1])+'). '+(fr.moved?'Os centroides mudaram, então repete-se.':'Os centroides não mudaram: <b>convergiu</b>.')+'</p>',
   scene:function(){return plot(fr.next,fr.asg).concat(side(['C1 = ('+f(fr.next[0][0])+'; '+f(fr.next[0][1])+')','C2 = ('+f(fr.next[1][0])+'; '+f(fr.next[1][1])+')',fr.moved?'mudaram: repete':'convergiu']))}});
});
S.push({label:'Fim. Escolha de k',title:'E quanto vale k?',text:'<p>O k é um <b>hiperparâmetro</b>. Para escolhê-lo usam-se o <b>método do cotovelo</b> (inércia por k) e o <b>coeficiente de silhueta</b>. O k-means supõe grupos aproximadamente esféricos e é sensível a <i>outliers</i>; alternativas: agrupamento hierárquico e DBSCAN (baseado em densidade).</p>',
 scene:function(){return [X.zone('z',10,10,700,310,'Resumo'),X.box('r1',30,60,200,56,'Cotovelo','n','inércia x k'),X.box('r2',260,60,200,56,'Silhueta','n','coesão e separação'),X.box('r3',490,60,200,56,'DBSCAN','n','grupos de forma livre'),X.text('t',30,170,'k-means: não supervisionado, sensível a escala, outliers e inicialização.','t')]}});
K.explain({w:720,h:330,steps:S,alt:'Animação do algoritmo k-means em oito pontos, com atribuição e recálculo dos centroides'});
})();
