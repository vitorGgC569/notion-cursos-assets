/* Conversor e treino de bases numéricas e unidades de memória (M1). */
(function(){
'use strict';
var K=window.K;
function rnd(a,b){return a+Math.floor(Math.random()*(b-a+1))}
function bits(n,w){var s=n.toString(2);while(s.length<w)s='0'+s;return s}
K.convert=function(){
  var d=K.$('#vd'),b=K.$('#vb'),h=K.$('#vh'),o=K.$('#vo');
  function paint(n){
    if(n===null||isNaN(n)||n<0||n>0xFFFFFFFF){o.innerHTML='';return}
    var w=n>255?(n>65535?32:16):8,s=bits(n,w).match(/.{1,4}/g).join(' ');
    o.innerHTML='<dl class="kv"><dt>Decimal</dt><dd>'+n+'</dd><dt>Binário</dt><dd>'+s+'</dd><dt>Hexadecimal</dt><dd>0x'+n.toString(16).toUpperCase()+'</dd><dt>Octal</dt><dd>0'+n.toString(8)+'</dd></dl>';
  }
  function from(el,base,re){el.addEventListener('input',function(){var v=el.value.trim().replace(/^0x/i,'').replace(/\s/g,'');if(!v){[d,b,h].forEach(function(x){if(x!==el)x.value=''});o.innerHTML='';return}
    if(!re.test(v)){o.innerHTML='<div class="msg bad">Caractere inválido para a base '+base+'.</div>';return}
    var n=parseInt(v,base);if(n>0xFFFFFFFF){o.innerHTML='<div class="msg bad">Número grande demais para este conversor (máximo 32 bits).</div>';return}
    if(el!==d)d.value=n;if(el!==b)b.value=n.toString(2);if(el!==h)h.value=n.toString(16).toUpperCase();paint(n)})}
  from(d,10,/^\d+$/);from(b,2,/^[01]+$/);from(h,16,/^[0-9a-f]+$/i);
  d.value='31';d.dispatchEvent(new Event('input'));
  // treino
  var key='k8s:m1-conversao',S=K.store.get(key,{best:0})||{best:0},N=10,qs=[],i=0,score=0,box=K.$('#quiz'),answered=false;
  function gen(){
    var t=rnd(0,6),q={};
    if(t===0){var n=rnd(10,255);q.q='Converta <code>0x'+n.toString(16).toUpperCase()+'</code> para decimal.';q.a=String(n);q.w='Cada dígito hexa vale 16<sup>posição</sup>: '+(n>>4)+'×16 + '+(n&15)+' = '+n+'.'}
    else if(t===1){var n2=rnd(5,200);q.q='Converta <code>'+n2+'</code> (decimal) para binário.';q.a=n2.toString(2);q.w='Divida por 2 repetidamente (ou some potências de 2). '+n2+' = <code>'+bits(n2,8)+'</code>.'}
    else if(t===2){var n3=rnd(5,250);q.q='Converta <code>'+bits(n3,8)+'</code> (binário) para decimal.';q.a=String(n3);q.w='Some as potências de 2 dos bits 1: resultado '+n3+'.'}
    else if(t===3){var m=[64,128,256,512][rnd(0,3)];q.q='Quantos bytes tem <code>'+m+'Mi</code>? (Mi é base 2)';q.a=String(m*1048576);q.w='1Mi = 2<sup>20</sup> = 1.048.576 bytes. '+m+' × 1.048.576 = '+(m*1048576).toLocaleString('pt-BR')+'.'}
    else if(t===4){var g=rnd(1,8);q.q='Quantos MiB tem <code>'+g+'Gi</code>?';q.a=String(g*1024);q.w='1Gi = 1024Mi. '+g+' × 1024 = '+(g*1024)+'.'}
    else if(t===5){var m2=[100,250,500][rnd(0,2)];q.q='Quantos bytes tem <code>'+m2+'M</code>? (M é base 10)';q.a=String(m2*1000000);q.w='M (sem o i) é base 10: 1M = 1.000.000 bytes. '+m2+' × 1.000.000 = '+(m2*1000000).toLocaleString('pt-BR')+'.'}
    else{var e=rnd(0,1)?137:143;q.q='Um contêiner terminou com exit code <code>'+e+'</code>. Qual é o número do sinal que o encerrou? (código = 128 + sinal)';q.a=String(e-128);q.w=e+' − 128 = '+(e-128)+(e===137?' (SIGKILL, comum em OOMKilled).':' (SIGTERM, o pedido educado de encerramento).')}
    return q;
  }
  function start(){qs=[];for(var k=0;k<N;k++)qs.push(gen());i=0;score=0;show()}
  function show(){
    if(i>=N){fin();return}answered=false;var q=qs[i];
    box.innerHTML='<div class="row" style="margin-bottom:8px"><span class="pill acc">Questão '+(i+1)+' de '+N+'</span><span class="spacer"></span><span class="pill">'+score+' certas</span></div><div class="progress"><i style="width:'+(i/N*100)+'%"></i></div><p style="font-size:17px;margin:16px 0 12px">'+q.q+'</p><div class="row"><input class="txt" id="ans" inputmode="numeric" autocomplete="off" placeholder="sua resposta" aria-label="Sua resposta"><button class="btn primary" id="ok" type="button">Responder</button></div><div id="fb" aria-live="polite"></div>';
    var a=K.$('#ans');a.focus();a.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();sub(a.value)}});K.$('#ok').onclick=function(){sub(a.value)};
  }
  function sub(v){if(answered||!v.trim())return;answered=true;var q=qs[i],u=v.trim().replace(/[\s.]/g,''),ok=u===q.a;if(ok)score++;
    K.$('#fb').innerHTML='<div class="note '+(ok?'ok':'')+'"><b>'+(ok?'Correto.':'Não foi desta vez. Resposta: '+q.a+'.')+'</b><br>'+q.w+'</div><div class="row" style="margin-top:10px"><button class="btn primary" id="nx" type="button">'+(i<N-1?'Próxima':'Ver resultado')+'</button></div>';
    K.$('#ans').disabled=true;K.$('#ok').disabled=true;var nx=K.$('#nx');nx.focus();nx.onclick=function(){i++;show()}}
  function fin(){if(score>S.best)S.best=score;K.store.set(key,S);box.innerHTML='<div style="text-align:center"><p class="kicker">Resultado</p><div class="score">'+score+'<span style="font-size:26px;color:var(--muted)"> / '+N+'</span></div><p style="font-size:13px;color:var(--muted)">Melhor resultado neste navegador: '+S.best+' de '+N+'</p><button class="btn primary" id="again" type="button">Novo treino</button></div>';K.$('#again').onclick=start}
  window.__conv={gen:gen,sub:sub,state:function(){return {qs:qs,i:i,score:score}}};
  start();
};
})();
