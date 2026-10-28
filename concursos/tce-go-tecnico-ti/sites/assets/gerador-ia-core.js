/* Gerador de questoes do Modulo 9 (IA e agentes): deterministico (mesma semente, mesma questao).
   As formulas sao as de fm9.js, que o Laboratorio L10 confere entre Python e JavaScript. */
(function(root){
'use strict';
var F=root.FM9||(typeof require!=='undefined'?require('./fm9.js'):null);
function rng(seed){var a=seed>>>0;return function(){a=(a+0x6D2B79F5)>>>0;var t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}}
function ri(r,a,b){return a+Math.floor(r()*(b-a+1))}
function pick(r,arr){return arr[Math.floor(r()*arr.length)]}
function shuffle(r,arr){var a=arr.slice(),i,j,t;for(i=a.length-1;i>0;i--){j=Math.floor(r()*(i+1));t=a[i];a[i]=a[j];a[j]=t}return a}
/* certa: valor correto (string); erros: erros plausiveis (strings); pad(d): gera um valor alternativo */
function opcoes(r,certa,erros,pad){
  var u=[certa],seen={};seen[certa]=1;
  erros.forEach(function(e){if(!seen[e]&&u.length<5){seen[e]=1;u.push(e)}});
  var d=1;while(u.length<5&&d<40){var e=pad(d++);if(!seen[e]){seen[e]=1;u.push(e)}}
  var o=shuffle(r,u);return {opcoes:o,certa:o.indexOf(certa)}}
function n0(x){return String(Math.round(x))}
function f2(x){return x.toFixed(2).replace('.',',')}
var T={};
/* 1. orcamento da janela de contexto */
T.janela={tema:'Janela de contexto',f:function(r,n){
  var W=pick(r,[4096,8000,16000,32000]),sys=ri(r,3,10)*100,hist=ri(r,5,25)*100,k=ri(r,2,4+n),tam=pick(r,[300,500,800,900,1200]);
  var ent=sys+hist+k*tam,resta=W-ent;if(resta<300){hist=ri(r,2,6)*100;ent=sys+hist+k*tam;resta=W-ent}
  var O=opcoes(r,n0(resta),[n0(ent),n0(W-sys-hist),n0(W-k*tam),n0(W-ent+tam)],function(d){return n0(resta+(d%2?1:-1)*Math.ceil(d/2)*100)});
  return {texto:'Janela do modelo: '+W+' tokens\nPrompt de sistema: '+sys+' tokens\nHistórico da conversa: '+hist+' tokens\nTrechos recuperados: '+k+' trechos de '+tam+' tokens cada\n\nReservando todo o restante da janela para a resposta, qual é o limite máximo da resposta, em tokens?',
   opcoes:O.opcoes,certa:O.certa,
   passos:['Entrada = sistema + histórico + trechos = '+sys+' + '+hist+' + '+k+' × '+tam+' = '+ent+' tokens.','Entrada e saída dividem a janela: sobram '+W+' − '+ent+' = '+resta+' tokens.','Resposta: '+resta+'.']}}};
/* 2. numero de trechos */
T.chunks={tema:'RAG: chunking',f:function(r,n){
  var tam=pick(r,[100,120,150,200,250]),ov=pick(r,[0,10,20,25,30,50]),N=ri(r,tam+30,tam*(6+n*3));
  var cert=F.nChunks(N,tam,ov),sem=Math.ceil(N/tam),flo=Math.floor((N-ov)/(tam-ov))+1;
  var O=opcoes(r,n0(cert),[n0(sem),n0(flo),n0(cert+1),n0(cert-1),n0(Math.ceil((N-ov)/tam)+1)],function(d){return n0(cert+d+1)});
  return {texto:'Documento: '+N+' palavras\nTamanho do trecho: '+tam+' palavras\nSobreposição: '+ov+' palavras\nFórmula: ⌈(N − tamanho) / (tamanho − sobreposição)⌉ + 1\n\nQuantos trechos o chunking produz?',
   opcoes:O.opcoes,certa:O.certa,
   passos:['O passo entre trechos é tamanho − sobreposição = '+tam+' − '+ov+' = '+(tam-ov)+' palavras.','(N − tamanho) / passo = ('+N+' − '+tam+') / '+(tam-ov)+' = '+((N-tam)/(tam-ov)).toFixed(2)+'. O teto é '+Math.ceil((N-tam)/(tam-ov))+'.','Mais 1 (o primeiro trecho) = '+cert+'.']}}};
/* 3. precisao e revocacao */
T.metricas={tema:'RAG: precisão e revocação',f:function(r,n){
  var k=ri(r,3,8),tot=ri(r,2,6),c=ri(r,1,Math.min(k,tot));
  var p=c/k,rc=c/tot,which=pick(r,['precisão','revocação']),cert=which==='precisão'?p:rc;
  var other=which==='precisão'?rc:p;
  var O=opcoes(r,f2(cert),[f2(other),f2(c/(k+tot)),f2(1-cert),f2((k-c)/k)],function(d){return f2(Math.min(1,Math.max(0,cert+(d%2?1:-1)*Math.ceil(d/2)*0.05)))});
  return {texto:'A busca devolveu os k = '+k+' primeiros trechos.\nTrechos relevantes entre eles: '+c+'\nTotal de trechos relevantes no índice: '+tot+'\n\nQual é a '+which+'@'+k+' (use vírgula decimal)?',
   opcoes:O.opcoes,certa:O.certa,
   passos:['precision@k = relevantes recuperados / k = '+c+' / '+k+' = '+f2(p)+'.','recall@k = relevantes recuperados / total de relevantes = '+c+' / '+tot+' = '+f2(rc)+'.','A pergunta pede a '+which+': '+f2(cert)+'.']}}};
/* 4. custo em tokens de um agente */
T.agente={tema:'Agentes: custo em tokens',f:function(r,n){
  var S=pick(r,[200,300,400,500]),A=pick(r,[100,150,200,250]),N=ri(r,3,4+n);
  var cert=F.agentTokens(S,A,N),lin=N*(S+A),sem=N*S+A*N;
  var O=opcoes(r,n0(cert),[n0(lin),n0(sem),n0(S+A*N),n0(N*S+A*N*(N+1)/2)],function(d){return n0(cert+(d%2?1:-1)*Math.ceil(d/2)*50)});
  return {texto:'Pedido inicial: S = '+S+' tokens\nCada passo acrescenta: A = '+A+' tokens (ação e observação)\nNúmero de passos: N = '+N+'\nO histórico completo é reenviado ao modelo a cada passo.\nTotal de entrada = N·S + A·N(N−1)/2\n\nQuantos tokens de entrada o agente consome no total?',
   opcoes:O.opcoes,certa:O.certa,
   passos:['No passo i a entrada vale S + (i − 1)·A. Somando os N passos: N·S + A·(0 + 1 + ... + N−1) = N·S + A·N(N−1)/2.','N·S = '+N+' × '+S+' = '+(N*S)+'. A·N(N−1)/2 = '+A+' × '+N+' × '+(N-1)+' / 2 = '+(A*N*(N-1)/2)+'.','Total: '+cert+' tokens. O custo cresce de forma quadrática com N.']}}};
/* 5. cosseno */
T.cosseno={tema:'Embeddings: cosseno',f:function(r,n){
  var d=n>1?3:2,a=[],b=[];for(var i=0;i<d;i++){a.push(ri(r,0,4));b.push(ri(r,0,4))}
  if(a.every(function(x){return x===0}))a[0]=1;if(b.every(function(x){return x===0}))b[0]=2;
  var dot=0,na=0,nb=0;a.forEach(function(x,i){dot+=x*b[i];na+=x*x;nb+=b[i]*b[i]});
  var c=F.cosine(a,b),prod=dot/(na*nb),sem=dot/(Math.sqrt(na)+Math.sqrt(nb));
  var O=opcoes(r,f2(c),[f2(dot/Math.max(na,nb)),f2(Math.min(1,Math.abs(sem))),f2(Math.min(1,prod)),f2(1-c)],function(k){return f2(Math.min(1,Math.max(0,c+(k%2?1:-1)*Math.ceil(k/2)*0.04)))});
  return {texto:'a = ('+a.join(', ')+')\nb = ('+b.join(', ')+')\ncos(a, b) = (a · b) / (‖a‖ · ‖b‖)\n\nQual é a similaridade do cosseno, com duas casas decimais (vírgula decimal)?',
   opcoes:O.opcoes,certa:O.certa,
   passos:['Produto escalar a · b = '+a.map(function(x,i){return x+'×'+b[i]}).join(' + ')+' = '+dot+'.','‖a‖ = √'+na+' = '+Math.sqrt(na).toFixed(3)+' e ‖b‖ = √'+nb+' = '+Math.sqrt(nb).toFixed(3)+'.','cos = '+dot+' / ('+Math.sqrt(na).toFixed(3)+' × '+Math.sqrt(nb).toFixed(3)+') = '+f2(c)+'.']}}};
/* 6. pass@k */
T.passk={tema:'Avaliação: pass@k',f:function(r,n){
  var N=pick(r,[5,10,10,20]),c=ri(r,1,Math.floor(N/2)),k=ri(r,1,3);
  var cert=F.passK(N,c,k),k1=F.passK(N,c,1);
  var O=opcoes(r,f2(cert),[f2(c/N),f2(Math.min(1,k*c/N)),f2(1-Math.pow(1-c/N,k)),f2(k1)],function(d){return f2(Math.min(1,Math.max(0,cert+(d%2?1:-1)*Math.ceil(d/2)*0.05)))});
  return {texto:'Foram geradas n = '+N+' soluções de código para uma tarefa.\nPassaram nos testes: c = '+c+'\npass@k = 1 − C(n − c, k) / C(n, k)\n\nQual é o valor de pass@'+k+' (duas casas decimais, vírgula decimal)?',
   opcoes:O.opcoes,certa:O.certa,
   passos:['n − c = '+(N-c)+'. C('+(N-c)+', '+k+') = '+F.combos(N-c,k)+' e C('+N+', '+k+') = '+F.combos(N,k)+'.','pass@'+k+' = 1 − '+F.combos(N-c,k)+' / '+F.combos(N,k)+' = '+f2(cert)+'.','Note: pass@1 = c/n = '+f2(c/N)+'; é diferente de pass@'+k+' quando k > 1.']}}};
/* 7. tokens e caracteres */
T.tokens={tema:'Tokens',f:function(r,n){
  var ch=pick(r,[56,112,224]),tk=pick(r,[15,30,60]),mult=ri(r,2,9);
  var cert=tk*mult,O=opcoes(r,n0(cert),[n0(ch*mult),n0(ch*tk),n0(cert+tk),n0(cert-tk)],function(d){return n0(cert+(d%2?1:-1)*Math.ceil(d/2)*5)});
  var nch=ch*mult;
  return {texto:'Um texto em português de '+ch+' caracteres gerou '+tk+' tokens.\nMantida a mesma proporção, outro texto, no mesmo idioma, tem '+nch+' caracteres.\n\nQuantos tokens ele terá, aproximadamente?',
   opcoes:O.opcoes,certa:O.certa,
   passos:['Proporção: '+tk+' tokens para '+ch+' caracteres (cerca de '+(ch/tk).toFixed(2).replace('.',',')+' caracteres por token).','O novo texto é '+mult+' vezes maior ('+nch+' / '+ch+').','Tokens ≈ '+tk+' × '+mult+' = '+cert+'. Nunca confunda caracteres, palavras e tokens.']}}};
var ORDEM=['janela','chunks','metricas','agente','cosseno','passk','tokens'];
function gerar(tema,nivel,seed){
  var ids=ORDEM.filter(function(id){return tema==='Todos'||T[id].tema===tema});
  var r=rng(seed*2654435761>>>0),id=ids[Math.floor(r()*ids.length)];
  var q=T[id].f(r,nivel);q.tema=T[id].tema;q.nivel=nivel;q.seed=seed;q.id=id;return q}
function temas(){return ORDEM.map(function(id){return T[id].tema})}
root.GQ={gerar:gerar,temas:temas,rng:rng,ORDEM:ORDEM,T:T};
if(typeof module!=='undefined')module.exports=root.GQ;
})(typeof window!=='undefined'?window:globalThis);
