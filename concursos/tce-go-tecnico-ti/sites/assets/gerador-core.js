/* Gerador de questões do Módulo 7: núcleo determinístico (mesma semente, mesma questão). */
(function(root){
'use strict';
function rng(seed){var a=seed>>>0;return function(){a=(a+0x6D2B79F5)>>>0;var t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}}
function ri(r,a,b){return a+Math.floor(r()*(b-a+1))}
function pick(r,arr){return arr[Math.floor(r()*arr.length)]}
function gcd(a,b){while(b){var t=a%b;a=b;b=t}return a}
function lcm(a,b){return a/gcd(a,b)*b}
function comb(n,k){var x=1,i;for(i=1;i<=k;i++){x=x*(n-k+i)/i}return Math.round(x)}
function fmt(n){var s=String(Math.abs(n)),o='',i;for(i=0;i<s.length;i++){if(i&&(s.length-i)%3===0)o+='.';o+=s[i]}return (n<0?'−':'')+o}
function dec(x){return String(x).replace('.',',')}
function shuffle(r,arr){var a=arr.slice(),i,j,t;for(i=a.length-1;i>0;i--){j=Math.floor(r()*(i+1));t=a[i];a[i]=a[j];a[j]=t}return a}
/* monta cinco alternativas; vals[0] é a certa; numérico: ordenadas; senão: embaralhadas */
function opcoes(r,vals,f,ordenar){
  var seen={},u=[],i;
  for(i=0;i<vals.length;i++){var k=String(vals[i]);if(!seen[k]&&(typeof vals[i]!=='number'||vals[i]>0)){seen[k]=1;u.push(vals[i])}}
  var c=vals[0],d=1;
  while(u.length<5&&typeof c==='number'){var x=c+d*(d%2?1:-1)*Math.ceil(d/2);d++;var kx=String(x);if(x>0&&!seen[kx]){seen[kx]=1;u.push(x)}}
  u=u.slice(0,5);
  var o=ordenar?u.slice().sort(function(a,b){return a-b}):shuffle(r,u);
  return {opcoes:o.map(f),certa:o.indexOf(c)};
}
function frac(n,d){var g=gcd(n,d);n/=g;d/=g;return d===1?String(n):n+'/'+d}
var NOMES=['Ana','Bruno','Carla','Diego','Elisa','Fábio'];
var DIAS=['segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado','domingo'];
var T={};
T.mmc={tema:'Múltiplos e divisores',f:function(r,n){
  var P=[[4,6,8,9,10,12],[12,15,18,20,24,30],[28,36,45,48,60,72]][n-1];
  var a=pick(r,P),b=pick(r,P);while(b===a){b=pick(r,P)}
  var m=lcm(a,b),h=gcd(a,b),O=opcoes(r,[m,a*b,a+b,h,m*2],fmt,true);
  return {texto:'Dois sinais luminosos piscam juntos às 20 h. O primeiro pisca a cada '+a+' segundos e o segundo, a cada '+b+' segundos. Depois de quantos segundos eles voltarão a piscar juntos pela primeira vez?',opcoes:O.opcoes,certa:O.certa,
   passos:['Piscam juntos nos instantes que são múltiplos comuns de '+a+' e '+b+'. O primeiro deles é o MMC.','MDC('+a+', '+b+') = '+h+'. Como MMC · MDC = produto, MMC = '+a+' · '+b+' ÷ '+h+' = '+m+'.','Resposta: '+fmt(m)+' segundos. Atenção: o produto '+fmt(a*b)+' é um múltiplo comum, mas não o menor.']}}};
T.mdc={tema:'Múltiplos e divisores',f:function(r,n){
  var g=pick(r,[[10,15,20,25],[20,30,40,60],[45,50,75,90]][n-1]),p=ri(r,2,4),q=ri(r,p+1,p+3);while(gcd(p,q)!==1)q++;var a=g*p,b=g*q,pc=p*q,O=opcoes(r,[pc,p+q,g,a*b/(g*g)+p,lcm(a,b)/g],fmt,true);
  return {texto:'Um piso retangular de '+a+' cm por '+b+' cm será revestido com placas quadradas, todas iguais, de lado inteiro em centímetros, o maior possível, sem cortes nem sobras. O número de placas utilizadas será',opcoes:O.opcoes,certa:O.certa,
   passos:['O lado da placa é o MDC('+a+', '+b+') = '+g+' cm.','Largura: '+a+' ÷ '+g+' = '+p+' placas. Comprimento: '+b+' ÷ '+g+' = '+q+' placas.','Total: '+p+' · '+q+' = '+pc+' placas.']}}};
T.frac={tema:'Frações, razão e proporção',f:function(r,n){
  var D=[[2,3,4,5,6],[3,4,5,6,8],[6,7,8,9,12]][n-1],q=pick(r,D),s=pick(r,D);while(s===q)s=pick(r,D);
  var p=ri(r,1,q-1),t=ri(r,1,s-1),num=p*s+t*q,den=q*s,res=frac(num,den);
  var vals=[res,frac(p+t,q+s),frac(p*t,q*s),frac(Math.abs(p*s-t*q)||1,den),frac(num,den+q),frac(num+1,den),frac(num+2,den),frac(num+3,den)],O=opcoes(r,vals,function(x){return x},false);
  return {texto:'O resultado de '+p+'/'+q+' + '+t+'/'+s+', na forma de fração irredutível (ou número inteiro), é',opcoes:O.opcoes,certa:O.certa,
   passos:['Denominador comum: MMC('+q+', '+s+') = '+lcm(q,s)+'.',p+'/'+q+' = '+(p*lcm(q,s)/q)+'/'+lcm(q,s)+' e '+t+'/'+s+' = '+(t*lcm(q,s)/s)+'/'+lcm(q,s)+'.','Soma: '+(p*lcm(q,s)/q+t*lcm(q,s)/s)+'/'+lcm(q,s)+' = '+res+' (simplificada). Somar numeradores e denominadores separadamente é erro.']}}};
T.r3d={tema:'Regra de três',f:function(r,n){
  var u=ri(r,[3,5,8][n-1],[9,15,25][n-1]),k=ri(r,2,[5,9,12][n-1]),c=u*k,z=ri(r,2,[9,14,20][n-1]),ans=z*k;
  var item=pick(r,['cadernos','canetas','pastas','pacotes']),O=opcoes(r,[ans,c+z,z+k,c*z,ans+k],fmt,true);
  return {texto:u+' '+item+' custam R$ '+fmt(c)+'. Mantido o preço unitário, '+z+' '+item+' custam, em reais,',opcoes:O.opcoes,certa:O.certa,
   passos:['As grandezas são diretamente proporcionais: mais itens, mais dinheiro.','Preço unitário: '+c+' ÷ '+u+' = '+k+'.',z+' · '+k+' = '+fmt(ans)+'.']}}};
T.r3i={tema:'Regra de três',f:function(r,n){
  var a=pick(r,[[6,8,10,12],[10,12,15,20],[12,16,18,24]][n-1]),d=ri(r,[6,10,12][n-1],[15,24,30][n-1]),tot=a*d,dv=[],x;
  for(x=2;x<=60;x++){if(tot%x===0&&x!==a)dv.push(x)}
  var b=pick(r,dv);
  var ans=tot/b,O=opcoes(r,[ans,Math.round(d*b/a)||1,d+(b-a),Math.abs(d-(b-a))||1,tot],fmt,true);
  return {texto:a+' operários, trabalhando no mesmo ritmo, concluem uma obra em '+d+' dias. Com '+b+' operários, no mesmo ritmo, a obra seria concluída em quantos dias?',opcoes:O.opcoes,certa:O.certa,
   passos:['Mais operários, menos dias: grandezas inversamente proporcionais. O produto operários · dias é constante.',a+' · '+d+' = '+tot+' operário-dias.',tot+' ÷ '+b+' = '+fmt(ans)+' dias.']}}};
T.r3c={tema:'Regra de três',f:function(r,n){
  var m1=ri(r,2,[6,8,10][n-1]),h1=ri(r,4,8),d1=ri(r,3,[8,10,12][n-1]),m2=ri(r,2,10),h2=ri(r,4,10),d2=ri(r,3,15),pecas=m1*h1*d1*ri(r,2,[6,9,12][n-1]);
  var uni=pecas/(m1*h1*d1),ans=uni*m2*h2*d2,O=opcoes(r,[ans,pecas+m2*h2*d2,Math.round(pecas*m2/m1),Math.round(pecas*h2/h1),pecas],fmt,true);
  return {texto:m1+' máquinas idênticas, funcionando '+h1+' horas por dia durante '+d1+' dias, produzem '+fmt(pecas)+' peças. Com '+m2+' máquinas, funcionando '+h2+' horas por dia durante '+d2+' dias, serão produzidas',opcoes:O.opcoes,certa:O.certa,
   passos:['Peças são diretamente proporcionais a máquinas, horas por dia e dias: some os fatores multiplicando.','Primeiro caso: '+m1+' · '+h1+' · '+d1+' = '+(m1*h1*d1)+'. Segundo: '+m2+' · '+h2+' · '+d2+' = '+(m2*h2*d2)+'.',fmt(pecas)+' · '+(m2*h2*d2)+' ÷ '+(m1*h1*d1)+' = '+fmt(ans)+' peças.']}}};
T.pcs={tema:'Porcentagem',f:function(r,n){
  var P=100*ri(r,[2,4,8][n-1],[9,12,20][n-1]),a=10*ri(r,1,5),b=10*ri(r,1,4),v=P*(100+a)*(100-b)/10000;
  var O=opcoes(r,[v,P*(100+a-b)/100,P,P*(100+a)/100,P*(100-b)/100],fmt,true);
  return {texto:'O preço de um produto, R$ '+fmt(P)+', teve um aumento de '+a+'% e, em seguida, um desconto de '+b+'% sobre o preço já reajustado. O preço final, em reais, é',opcoes:O.opcoes,certa:O.certa,
   passos:['Os fatores multiplicam: aumento de '+a+'% vale ×'+dec((100+a)/100)+' e desconto de '+b+'% vale ×'+dec((100-b)/100)+'.',fmt(P)+' · '+dec((100+a)/100)+' = '+fmt(P*(100+a)/100)+'; depois · '+dec((100-b)/100)+' = '+fmt(v)+'.','Somar e subtrair os percentuais ('+(a-b)+'%) estaria errado: o desconto incide sobre uma base diferente.']}}};
T.pvar={tema:'Porcentagem',f:function(r,n){
  var p=pick(r,[5,10,15,20,25,30,40,50,60,75]),v0=20*ri(r,[5,10,20][n-1],[30,60,90][n-1]),v1=v0*(100+p)/100,O=opcoes(r,[p,Math.round((v1-v0)*100/v1)||1,v1-v0>0?(v1-v0)%100||1:1,p+5,p*2],fmt,true);
  return {texto:'O valor de uma conta passou de R$ '+fmt(v0)+' para R$ '+fmt(v1)+'. O percentual de aumento foi de',opcoes:O.opcoes.map(function(x){return x+'%'}),certa:O.certa,
   passos:['Aumento em reais: '+fmt(v1)+' − '+fmt(v0)+' = '+fmt(v1-v0)+'.','O percentual é calculado sobre o valor inicial: '+fmt(v1-v0)+' ÷ '+fmt(v0)+' = '+dec(p/100)+'.','Aumento de '+p+'%. Dividir pelo valor final daria '+dec(Math.round((v1-v0)*1000/v1)/10)+'%.']}}};
T.med={tema:'Médias',f:function(r,n){
  var k=ri(r,4,8),a=ri(r,[6,10,20][n-1],[12,20,40][n-1]),b=a-ri(r,1,3),ret=k*a-(k-1)*b;
  if(ret<1){b=a-1;ret=k*a-(k-1)*b}
  var O=opcoes(r,[ret,a,b,k*a-k*b,ret+k],fmt,true);
  return {texto:'A média aritmética de '+k+' números é '+a+'. Retirando-se um deles, a média dos '+(k-1)+' restantes passa a ser '+b+'. O número retirado é',opcoes:O.opcoes,certa:O.certa,
   passos:['Trabalhe com somas. Soma dos '+k+': '+k+' · '+a+' = '+(k*a)+'.','Soma dos '+(k-1)+' restantes: '+(k-1)+' · '+b+' = '+((k-1)*b)+'.','Número retirado: '+(k*a)+' − '+((k-1)*b)+' = '+ret+'.']}}};
T.conj={tema:'Conjuntos',f:function(r,n){
  var A=ri(r,[20,30,40][n-1],[50,70,90][n-1]),B=ri(r,[15,25,30][n-1],[45,60,80][n-1]),I=ri(r,5,Math.min(A,B)-5),u=A+B-I,none=ri(r,5,25),T=u+none;
  var O=opcoes(r,[none,T-(A+B),T-A-B+2*I,T-u+I,u],fmt,true);
  return {texto:'Em um grupo de '+T+' pessoas, '+A+' leem o jornal X, '+B+' leem o jornal Y e '+I+' leem os dois. O número de pessoas que não leem nenhum dos dois jornais é',opcoes:O.opcoes,certa:O.certa,
   passos:['Quem lê pelo menos um: n(X ∪ Y) = '+A+' + '+B+' − '+I+' = '+u+' (a interseção entra uma vez só).','Quem não lê nenhum: '+T+' − '+u+' = '+none+'.']}}};
T.cont={tema:'Contagem',f:function(r,n){
  var N=ri(r,[5,6,7][n-1],[7,8,10][n-1]),k=ri(r,2,[3,3,4][n-1]),c=comb(N,k),pe=1,i;for(i=0;i<k;i++)pe*=(N-i);
  var O=opcoes(r,[c,pe,Math.round(Math.pow(N,k)),N*k,c*2],fmt,true);
  return {texto:'Uma comissão de '+k+' pessoas será escolhida entre '+N+' candidatos, sem cargos distintos. O número de comissões possíveis é',opcoes:O.opcoes,certa:O.certa,
   passos:['A ordem não importa (não há cargos): é combinação C('+N+', '+k+').','Arranjos A('+N+', '+k+') = '+pe+'; como cada comissão aparece '+k+'! vezes, divide-se por '+k+'!.','C('+N+', '+k+') = '+c+'.']}}};
T.prop={tema:'Frações, razão e proporção',f:function(r,n){
  var a=ri(r,1,3),b=ri(r,a+1,6),c=ri(r,b+1,9),s=a+b+c,u=ri(r,[50,100,200][n-1],[150,300,600][n-1]),T2=s*u,
   O=opcoes(r,[(c-a)*u,c*u,(b-a)*u,Math.round(T2/3),(c-a)*u+u],fmt,true);
  return {texto:'Uma verba de R$ '+fmt(T2)+' será dividida entre três setores em partes diretamente proporcionais a '+a+', '+b+' e '+c+'. A diferença entre a maior e a menor parte, em reais, é',opcoes:O.opcoes,certa:O.certa,
   passos:['Soma das razões: '+a+' + '+b+' + '+c+' = '+s+'. Cada unidade vale '+fmt(T2)+' ÷ '+s+' = '+fmt(u)+'.','Partes: '+fmt(a*u)+', '+fmt(b*u)+' e '+fmt(c*u)+'.','Diferença: '+fmt(c*u)+' − '+fmt(a*u)+' = '+fmt((c-a)*u)+'.']}}};
T.pa={tema:'Sequências e relações lógicas',f:function(r,n){
  var a1=ri(r,2,[9,15,30][n-1]),rz=ri(r,2,[6,9,12][n-1]),N=ri(r,[8,15,30][n-1],[14,30,60][n-1]),an=a1+(N-1)*rz;
  var O=opcoes(r,[an,a1+N*rz,a1+(N-2)*rz,N*rz,an+a1],fmt,true);
  return {texto:'Na sequência '+[0,1,2,3].map(function(i){return a1+i*rz}).join(', ')+', ..., em que cada termo supera o anterior em '+rz+' unidades, o '+N+'º termo é',opcoes:O.opcoes,certa:O.certa,
   passos:['É uma progressão aritmética de razão '+rz+'. Termo geral: a(n) = a1 + (n − 1) · r.','a('+N+') = '+a1+' + '+(N-1)+' · '+rz+' = '+a1+' + '+((N-1)*rz)+' = '+fmt(an)+'.','Usar n em vez de n − 1 é o erro comum: o primeiro termo ainda não recebeu nenhuma razão.']}}};
T.linhas={tema:'Proposições e tabelas-verdade',f:function(r,n){
  var k=ri(r,2,[4,5,6][n-1]),O=opcoes(r,[Math.pow(2,k),2*k,k*k,Math.pow(2,k-1),Math.pow(2,k+1)],fmt,true);
  return {texto:'Uma proposição composta é formada por '+k+' proposições simples distintas. O número de linhas da sua tabela-verdade é',opcoes:O.opcoes,certa:O.certa,
   passos:['Cada proposição simples pode ser V ou F: 2 possibilidades.','Pelo princípio multiplicativo, '+k+' proposições dão 2^'+k+' = '+Math.pow(2,k)+' linhas.']}}};
T.neg={tema:'Proposições e tabelas-verdade',f:function(r,n){
  var F=[['chove','o jogo é adiado'],['o servidor é aprovado','toma posse'],['há prova hoje','a biblioteca fica cheia'],['o sistema cai','a equipe é acionada']],f=pick(r,F),A=f[0],B=f[1];
  var neg={'o jogo é adiado':'o jogo não é adiado','toma posse':'não toma posse','a biblioteca fica cheia':'a biblioteca não fica cheia','a equipe é acionada':'a equipe não é acionada'}[B];
  var nA={'chove':'não chove','o servidor é aprovado':'o servidor não é aprovado','há prova hoje':'não há prova hoje','o sistema cai':'o sistema não cai'}[A];
  var vals=[A+' e '+neg+'.','se '+nA+', então '+neg+'.',nA+' e '+B+'.','se '+B+', então '+A+'.',nA+' ou '+neg+'.'],O=opcoes(r,vals,function(x){return x},false);
  return {texto:'A negação da proposição "Se '+A+', então '+B+'" é',opcoes:O.opcoes,certa:O.certa,
   passos:['A condicional p → q só é falsa quando p é verdadeira e q é falsa.','Logo sua negação é "p e não q": "'+A+' e '+neg+'".','A segunda alternativa é a inversa e a quarta é a recíproca: ambas são outras condicionais, não a negação.']}}};
T.cal={tema:'Sequências e relações lógicas',f:function(r,n){
  var d=ri(r,0,6),k=ri(r,[20,50,100][n-1],[60,200,400][n-1]),res=(d+k)%7,
   vals=[DIAS[res],DIAS[(res+1)%7],DIAS[(res+6)%7],DIAS[(res+2)%7],DIAS[(res+5)%7]],O=opcoes(r,vals,function(x){return x},false);
  return {texto:'Hoje é '+DIAS[d]+'. Daqui a '+k+' dias será',opcoes:O.opcoes,certa:O.certa,
   passos:['Os dias da semana se repetem de 7 em 7. '+k+' = '+Math.floor(k/7)+' · 7 + '+(k%7)+'.',(k%7===0?'Sobram 0 dias: o dia da semana é o mesmo, '+DIAS[res]+'.':'Só importam os '+(k%7)+' dias que sobram: '+DIAS[d]+' + '+(k%7)+' = '+DIAS[res]+'.')]}}};
var ORDEM=['mmc','mdc','frac','r3d','r3i','r3c','pcs','pvar','med','conj','cont','prop','pa','linhas','neg','cal'];
function gerar(tema,nivel,seed){
  var r=rng(seed*7919+nivel*104729+13),ids=ORDEM.filter(function(id){return tema==='Todos'||T[id].tema===tema});
  var id=ids[Math.floor(r()*ids.length)],q=T[id].f(r,nivel);
  q.tema=T[id].tema;q.id=id;q.nivel=nivel;q.seed=seed;return q;
}
function temas(){var o=[];ORDEM.forEach(function(id){if(o.indexOf(T[id].tema)<0)o.push(T[id].tema)});return o}
root.GQ={gerar:gerar,temas:temas,rng:rng,ORDEM:ORDEM};
if(typeof module!=='undefined')module.exports=root.GQ;
})(typeof window!=='undefined'?window:globalThis);
