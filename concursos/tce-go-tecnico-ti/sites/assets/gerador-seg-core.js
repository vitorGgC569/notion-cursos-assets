/* Gerador de questoes do Modulo 10 (Seguranca da Informacao): deterministico (mesma semente, mesma questao).
   As formulas sao as de fm10.js, que o Laboratorio L10 confere entre Python e JavaScript. Nenhuma questao e de prova real. */
(function(root){
'use strict';
var F=root.FM10||(typeof require!=='undefined'?require('./fm10.js'):null);
function rng(seed){var a=seed>>>0;return function(){a=(a+0x6D2B79F5)>>>0;var t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}}
function ri(r,a,b){return a+Math.floor(r()*(b-a+1))}
function pick(r,arr){return arr[Math.floor(r()*arr.length)]}
function shuffle(r,arr){var a=arr.slice(),i,j,t;for(i=a.length-1;i>0;i--){j=Math.floor(r()*(i+1));t=a[i];a[i]=a[j];a[j]=t}return a}
function opcoes(r,certa,erros,pad){
  var u=[certa],seen={};seen[certa]=1;
  erros.forEach(function(e){if(!seen[e]&&u.length<5){seen[e]=1;u.push(e)}});
  var d=1;while(u.length<5&&d<60){var e=pad(d++);if(!seen[e]){seen[e]=1;u.push(e)}}
  var o=shuffle(r,u);return {opcoes:o,certa:o.indexOf(certa)}}
function fb(x,dec){var s=Math.abs(x).toFixed(dec),p=s.split('.'),i=p[0].replace(/\B(?=(\d{3})+(?!\d))/g,'.');return (x<0?'-':'')+i+(p[1]?','+p[1]:'')}
function n0(x){return fb(Math.round(x),0)}
function f1(x){return fb(x,1)}
function f2(x){return fb(x,2)}
function hs(x){return x+(x===1?' hora':' horas')}
function rs(x){return 'R$ '+n0(x)}
var T={};
/* 1. entropia de senha */
T.entropia={tema:'Entropia de senha',f:function(r,n){
  var A=pick(r,[['minúsculas',26],['letras e dígitos',62],['dígitos',10],['maiúsculas e minúsculas',52],['símbolos imprimíveis ASCII',94]]),len=ri(r,6,10+n*2);
  var b=F.entropyBits(len,A[1]),cert=f1(b);
  var O=opcoes(r,cert,[f1(len*A[1]),f1(Math.log2(A[1])),f1(len+Math.log2(A[1])),f1(b/2)],function(d){return f1(b+(d%2?1:-1)*Math.ceil(d/2)*2.3)});
  return {texto:'Uma senha aleatória tem '+len+' caracteres, sorteados de forma uniforme e independente de um alfabeto de '+A[1]+' símbolos ('+A[0]+').\n\nQual é a entropia dessa senha, em bits (arredondada para uma casa decimal)?',
   opcoes:O.opcoes,certa:O.certa,
   passos:['Entropia = comprimento × log2(tamanho do alfabeto).','log2('+A[1]+') = '+f2(Math.log2(A[1]))+' bits por caractere.',len+' × '+f2(Math.log2(A[1]))+' = '+cert+' bits (o espaço de busca é 2^'+cert+').']}}};
/* 2. numero de chaves */
T.chaves={tema:'Número de chaves',f:function(r,n){
  var N=pick(r,[10,20,30,50,80,100,200]),sim=r()<0.5,cert=sim?F.keysSym(N):F.keysAsym(N);
  var o1=sim?F.keysAsym(N):F.keysSym(N);
  var O=opcoes(r,n0(cert),[n0(o1),n0(N*N),n0(N*(N+1)/2),n0(N)],function(d){return n0(cert+d*N)});
  return {texto:N+' pessoas de uma organização precisam trocar mensagens sigilosas entre si, cada par com comunicação própria e independente.\n\nQuantas chaves são necessárias no total se a organização usar criptografia '+(sim?'simétrica, com uma chave distinta para cada par de pessoas':'assimétrica, com um par de chaves (pública e privada) por pessoa')+'?',
   opcoes:O.opcoes,certa:O.certa,
   passos:sim?['Na simétrica, cada par distinto precisa de uma chave: C(n,2) = n(n−1)/2.',N+' × '+(N-1)+' / 2 = '+n0(cert)+' chaves.','Cresce com o quadrado de n, o que dificulta a distribuição de chaves.']:['Na assimétrica, cada pessoa tem um par: 2 chaves.','2 × '+N+' = '+n0(cert)+' chaves.','Cresce de forma linear, e a chave pública pode ser divulgada.']}}};
/* 3. ALE */
T.ale={tema:'Análise de risco: ALE',f:function(r,n){
  var AV=pick(r,[100,200,250,400,500,800])*1000,EF=pick(r,[10,20,25,40,50,75]),ARO=pick(r,[0.1,0.2,0.5,1,2,3]);
  var s=F.sle(AV,EF/100),a=F.ale(AV,EF/100,ARO);
  var O=opcoes(r,rs(a),[rs(s),rs(AV*ARO),rs(AV*(1-EF/100)*ARO),rs(AV*EF*ARO/10)],function(d){return rs(a+(d%2?1:-1)*Math.ceil(d/2)*5000)});
  var ar=String(ARO).replace('.',',');
  return {texto:'Um ativo vale '+rs(AV)+'. Um incidente típico causa perda de '+EF+'% do valor do ativo (fator de exposição). Estima-se que ocorra '+ar+(ARO===1?' vez':' vezes')+' por ano (taxa anual de ocorrência).\n\nQual é a expectativa de perda anual (ALE)?',
   opcoes:O.opcoes,certa:O.certa,
   passos:['SLE (perda por ocorrência) = valor do ativo × fator de exposição = '+rs(AV)+' × '+EF+'% = '+rs(s)+'.','ALE = SLE × ARO = '+rs(s)+' × '+ar+' = '+rs(a)+'.','A análise é quantitativa; um controle vale a pena se reduzir o ALE em mais do que o seu custo anual.']}}};
/* 4. tempo de parada */
T.parada={tema:'Disponibilidade: tempo parado',f:function(r,n){
  var D=pick(r,[99,99.5,99.9,99.95,99.99]),h=F.downtimeHours(D);
  var O=opcoes(r,f2(h)+' horas',[f2(h*60)+' horas',f2(100-D)+' horas',f2(h/12)+' horas',f2(h*7)+' horas'],function(d){return f2(h+(d%2?1:-1)*Math.ceil(d/2)*1.37)+' horas'});
  return {texto:'Um contrato garante disponibilidade de '+String(D).replace('.',',')+'% ao longo de um ano de 365 dias (8.760 horas).\n\nQual é o tempo máximo de indisponibilidade permitido no ano, em horas?',
   opcoes:O.opcoes,certa:O.certa,
   passos:['Fração de indisponibilidade = 100% − '+String(D).replace('.',',')+'% = '+f2(100-D)+'%.','Tempo parado = '+f2(100-D)+'% × 8.760 h = '+f2(h)+' horas.','Cada "nove" a mais divide o tempo parado por 10.']}}};
/* 5. serie e paralelo */
T.serieparalelo={tema:'Disponibilidade: série e paralelo',f:function(r,n){
  var a=pick(r,[90,95,98,99,99.5]),b=pick(r,[90,95,98,99,99.9]),par=r()<0.5,cert=par?F.parallelAvail(a,b):F.seriesAvail(a,b),o1=par?F.seriesAvail(a,b):F.parallelAvail(a,b);
  function p(x){return f2(x)+'%'}
  var O=opcoes(r,p(cert),[p(o1),p((a+b)/2),p(Math.min(a,b)),p(Math.max(a,b))],function(d){return p(cert-(d%2?1:-1)*Math.ceil(d/2)*0.37)});
  return {texto:'Dois componentes independentes têm disponibilidade de '+String(a).replace('.',',')+'% e '+String(b).replace('.',',')+'%, respectivamente.\n\nQual é a disponibilidade do conjunto quando eles são ligados '+(par?'em paralelo (redundantes: basta um funcionar)':'em série (os dois precisam funcionar)')+'?',
   opcoes:O.opcoes,certa:O.certa,
   passos:par?['Em paralelo, o conjunto só falha se os dois falharem: indisponibilidade = (1 − A1) × (1 − A2).','Indisponibilidades: '+f2(100-a)+'% e '+f2(100-b)+'%; produto = '+f2((100-a)*(100-b)/100)+'%.','Disponibilidade = 100% − '+f2((100-a)*(100-b)/100)+'% = '+p(cert)+'. Redundância aumenta a disponibilidade.']:['Em série, os dois precisam funcionar: A = A1 × A2.',f2(a)+'% × '+f2(b)+'% = '+p(cert)+'.','Em série a disponibilidade fica menor que a do pior componente.']}}};
/* 6. conjuntos para restaurar */
T.restaurar={tema:'Backup: conjuntos para restaurar',f:function(r,n){
  var k=ri(r,3,6+n),inc=r()<0.5,cert=F.restoreSets(inc?'incremental':'diferencial',k);
  var O=opcoes(r,String(cert),[String(k),String(k+2),String(inc?2:k+1),String(inc?k:1)],function(d){return String(cert+d)});
  return {texto:'Uma política faz um backup completo no domingo e um backup '+(inc?'incremental':'diferencial')+' em cada um dos '+k+' dias seguintes (segunda em diante). No dia '+k+' após o completo, ocorre uma falha e é preciso restaurar o sistema ao estado do último backup.\n\nQuantos conjuntos de backup (o completo mais os demais) são necessários na restauração?',
   opcoes:O.opcoes,certa:O.certa,
   passos:inc?['O incremental guarda o que mudou desde o último backup de qualquer tipo; a restauração usa toda a cadeia, em ordem.','Completo (1) + '+k+' incrementais = '+cert+' conjuntos.','Se qualquer elo faltar, a restauração fica incompleta (no L8, sem o incremental do dia 2 o resultado não ficou idêntico).']:['O diferencial guarda o que mudou desde o último completo.','Restaura-se o completo (1) + só o último diferencial (1) = '+cert+' conjuntos.','O custo é cada diferencial ficar maior a cada dia.']}}};
/* 7. tamanho do hash */
T.hash={tema:'Hash: tamanho da saída',f:function(r,n){
  var H=pick(r,[['MD5',128],['SHA-1',160],['SHA-256',256],['SHA-384',384],['SHA-512',512]]),cert=F.hexLen(H[1]);
  var O=opcoes(r,String(cert),[String(H[1]),String(H[1]/8),String(H[1]/2),String(H[1]*2)],function(d){return String(cert+d*4)});
  return {texto:'O resumo (digest) produzido pelo algoritmo '+H[0]+' tem '+H[1]+' bits. Ele é exibido em hexadecimal, em que cada caractere representa 4 bits.\n\nQuantos caracteres tem o resumo exibido?',
   opcoes:O.opcoes,certa:O.certa,
   passos:['Cada caractere hexadecimal vale 4 bits (16 valores = 2^4).',H[1]+' / 4 = '+cert+' caracteres.',H[1]+' / 8 = '+(H[1]/8)+' bytes, que é o tamanho em bytes, não em caracteres hexadecimais.']}}};
/* 8. RPO */
T.rpo={tema:'Continuidade: RPO',f:function(r,n){
  var fr=pick(r,[1,2,4,6,8,12,24]),h=ri(r,1,fr),maxq=r()<0.5,cert=maxq?F.rpoHoras(fr):h;
  var O=opcoes(r,hs(cert),[hs(maxq?h:fr),hs(fr+h),hs(24/fr),hs(Math.max(1,fr-h))],function(d){return hs(cert+d)});
  return {texto:'Um sistema faz backup a cada '+hs(fr)+'. Uma falha de armazenamento ocorre '+hs(h)+' depois do último backup concluído, e a restauração recupera exatamente esse backup.\n\n'+(maxq?'Qual é o RPO máximo dessa política, ou seja, a maior perda de dados possível?':'Quantas horas de dados foram efetivamente perdidas nesse incidente?'),
   opcoes:O.opcoes,certa:O.certa,
   passos:maxq?['RPO é a perda máxima de dados aceita, medida em tempo.','Com backup a cada '+fr+' h, a falha pode ocorrer logo antes do próximo: perda máxima = '+fr+' h.','Para reduzir o RPO, aumenta-se a frequência (ou se usa replicação).']:['A perda real é o tempo entre o último backup e a falha.','Perda = '+h+' h (o RPO máximo da política é '+fr+' h).','RPO é um objetivo; a perda real depende do instante da falha.']}}};
/* 9. forca bruta */
T.bruta={tema:'Força bruta: tempo médio',f:function(r,n){
  var bits,rate,y,t=0;do{bits=ri(r,36,70);rate=pick(r,[1e6,1e7,1e8,1e9,1e10,1e11]);y=F.bruteYears(bits,rate);t++}while((y<0.3||y>5000)&&t<200);
  if(y<0.3||y>5000){bits=56;rate=1e9;y=F.bruteYears(bits,rate)}
  var O=opcoes(r,f2(y)+' anos',[f2(y*2)+' anos',f2(y*10)+' anos',f2(y/10)+' anos',f2(y*1024)+' anos'],function(d){return f2(y*(1+d*0.37))+' anos'});
  var rt=n0(rate);
  return {texto:'Uma chave tem '+bits+' bits de entropia, e um atacante testa '+rt+' tentativas por segundo. Considere o ano com 31.557.600 segundos e que, em média, a chave é achada ao se percorrer metade do espaço de busca.\n\nQual é o tempo médio para quebrar a chave, em anos?',
   opcoes:O.opcoes,certa:O.certa,
   passos:['Espaço de busca = 2^'+bits+'; em média testa-se metade: 2^'+(bits-1)+'.','Tempo = 2^'+(bits-1)+' / '+rt+' tentativas por segundo, em segundos, dividido por 31.557.600.','Resultado: '+f2(y)+' anos. Cada bit a mais dobra o tempo.']}}};
var ORDEM=['entropia','chaves','ale','parada','serieparalelo','restaurar','hash','rpo','bruta'];
function gerar(tema,nivel,seed){
  var ids=ORDEM.filter(function(id){return tema==='Todos'||T[id].tema===tema});
  var r=rng(seed*2654435761>>>0),id=ids[Math.floor(r()*ids.length)];
  var q=T[id].f(r,nivel);q.tema=T[id].tema;q.nivel=nivel;q.seed=seed;q.id=id;return q}
function temas(){return ORDEM.map(function(id){return T[id].tema})}
root.GQ={gerar:gerar,temas:temas,rng:rng,ORDEM:ORDEM,T:T};
if(typeof module!=='undefined')module.exports=root.GQ;
})(typeof window!=='undefined'?window:globalThis);
