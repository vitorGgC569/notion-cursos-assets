(function(){
var K=window.K,X=K.X;
var start=[5,3,8,1,4];
function cells(arr,ids,hi,sorted,label){
  var N=[],w=96,gap=18,x0=(720-(5*w+4*gap))/2;
  arr.forEach(function(v,i){
    var c=sorted.indexOf(i)>=0?'d':(hi.indexOf(i)>=0?'a':'n');
    N.push(X.box('c'+ids[i],x0+i*(w+gap),110,w,70,String(v),c,'posição '+i));
  });
  N.push(X.text('lb',x0,70,label,'t'));
  return N;
}
// gera o rastro do Bubble Sort
var arr=start.slice(),ids=[0,1,2,3,4],steps=[],n=arr.length,sorted=[],cmp=0,sw=0;
steps.push({label:'0. Ideia',title:'Bubble Sort: comparar vizinhos e trocar',text:'<p>O Bubble Sort percorre o vetor comparando <b>pares de vizinhos</b> e trocando os que estão fora de ordem. A cada passada, o maior valor "sobe" como uma bolha até o fim. Repete até não haver mais trocas. Foi o algoritmo da questão 31 do TRT-5 de 2022.</p>',
 cmd:'var arr = [5, 3, 8, 1, 4]',scene:(function(a,b){return function(){return cells(a,b,[],[],'vetor inicial')}})(arr.slice(),ids.slice())});
for(var i=0;i<n-1;i++){
  var swapped=false;
  for(var j=0;j<n-i-1;j++){
    cmp++;
    var a=arr.slice(),b=ids.slice(),srt=sorted.slice(),needs=arr[j]>arr[j+1];
    steps.push({label:(steps.length)+'. Comparar',title:'Passada '+(i+1)+': compara '+arr[j]+' e '+arr[j+1],text:'<p>Compara <code>arr['+j+'] &gt; arr['+(j+1)+']</code>, ou seja, <code>'+arr[j]+' &gt; '+arr[j+1]+'</code>: <b>'+(needs?'verdadeiro, troca':'falso, mantém')+'</b>. Comparações até agora: '+cmp+'.</p>',
      cmd:'if (arr['+j+'] > arr['+(j+1)+'])',out:'  →  '+arr[j]+' > '+arr[j+1]+' é '+(needs?'true':'false'),
      scene:(function(a,b,s,j){return function(){return cells(a,b,[j,j+1],s,'comparando as posições '+j+' e '+(j+1))}})(a,b,srt,j)});
    if(needs){
      var t=arr[j];arr[j]=arr[j+1];arr[j+1]=t;var ti=ids[j];ids[j]=ids[j+1];ids[j+1]=ti;sw++;swapped=true;
      var a2=arr.slice(),b2=ids.slice();
      steps.push({label:(steps.length)+'. Trocar',title:'Troca: '+a2[j]+' e '+a2[j+1]+' mudam de lugar',text:'<p>A troca usa uma variável auxiliar: <code>temp = arr[j]</code>; <code>arr[j] = arr[j + 1]</code>; <code>arr[j + 1] = temp</code>. Essa foi exatamente a lacuna da questão. Trocas até agora: '+sw+'.</p>',
        cmd:'temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp',scene:(function(a,b,s,j){return function(){return cells(a,b,[j,j+1],s,'depois da troca')}})(a2,b2,sorted.slice(),j)});
    }
  }
  sorted.push(n-1-i);
  var a3=arr.slice(),b3=ids.slice(),s3=sorted.slice();
  steps.push({label:(steps.length)+'. Fim da passada',title:'Passada '+(i+1)+' concluída: '+arr[n-1-i]+' está no lugar',text:'<p>O maior valor da passada chegou ao fim e fica fixo (em escuro). A próxima passada pode parar uma posição antes, por isso o laço interno usa <code>arr.length - i - 1</code>.</p>',
    scene:(function(a,b,s){return function(){return cells(a,b,[],s,'fim da passada')}})(a3,b3,s3)});
  if(!swapped)break;
}
var fa=arr.slice(),fb=ids.slice();
steps.push({label:(steps.length)+'. Custo',title:'Vetor ordenado e a complexidade',text:'<p>Resultado: <code>[1, 3, 4, 5, 8]</code>, com '+cmp+' comparações e '+sw+' trocas neste exemplo. No pior caso, são <b>n(n-1)/2 comparações</b>, então a complexidade é <b>O(n²)</b>. É simples, estável e útil para aprender, mas lento para vetores grandes (compare com o merge sort e o quicksort, O(n log n) em média).</p>',
  scene:function(){var N=cells(fa,fb,[],[0,1,2,3,4],'ordenado');N.push(X.box('o1',150,230,200,56,'Pior caso','n','O(n²)'));N.push(X.box('o2',370,230,200,56,'Melhor caso','n','O(n), com parada antecipada'));return N}});
K.explain({w:720,h:340,steps:steps,alt:'Animação do Bubble Sort ordenando um vetor de cinco números'});
})();
