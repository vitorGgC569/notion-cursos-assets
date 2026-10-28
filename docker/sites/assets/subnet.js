/* Simulador de sub-redes IPv4 (M5): calculadora com bits + treino com correção. */
(function(){
'use strict';
var K=window.K;
function i2n(s){var p=s.split('.');if(p.length!==4)return null;var n=0;for(var i=0;i<4;i++){if(!/^\d{1,3}$/.test(p[i])||+p[i]>255)return null;n=n*256+ +p[i]}return n}
function n2i(n){return [n>>>24,(n>>>16)&255,(n>>>8)&255,n&255].join('.')}
function mask(p){return p===0?0:(0xFFFFFFFF<<(32-p))>>>0}
function calc(ip,p){var m=mask(p),a=i2n(ip),net=(a&m)>>>0,bc=(net|(~m>>>0))>>>0,total=Math.pow(2,32-p);
  return {ip:a,mask:m,net:net,bc:bc,total:total,hosts:p>=31?(p===31?2:1):total-2,first:p>=31?net:net+1,last:p>=31?bc:bc-1,wild:(~m)>>>0}}
function bin(n){var s=('00000000000000000000000000000000'+(n>>>0).toString(2)).slice(-32);return s.match(/.{8}/g).join('.')}
function priv(n){return (n>>>24)===10||((n>>>20)===0xAC1)||((n>>>16)===0xC0A8)}
function bitsHtml(n,p){var s=bin(n).replace(/\./g,''),h='';for(var i=0;i<32;i++){if(i&&i%8===0)h+='<span class="gap"></span>';h+='<span class="'+(i<p?'n':'h')+'">'+s[i]+'</span>'}return '<div class="bits" aria-label="bits">'+h+'</div>'}
function rnd(a,b){return a+Math.floor(Math.random()*(b-a+1))}
function randIp(){var t=rnd(0,2);if(t===0)return [10,rnd(0,255),rnd(0,255),rnd(1,254)].join('.');if(t===1)return [172,rnd(16,31),rnd(0,255),rnd(1,254)].join('.');return [192,168,rnd(0,255),rnd(1,254)].join('.')}
function gen(){
  var t=['net','bc','hosts','first','last','mask','priv','in'][rnd(0,7)],p=rnd(18,29),ip=randIp(),c=calc(ip,p),q={t:t,p:p,ip:ip,c:c};
  if(t==='net'){q.q='Qual é o <b>endereço de rede</b> de <code>'+ip+'/'+p+'</code>?';q.a=n2i(c.net);q.kind='ip'}
  if(t==='bc'){q.q='Qual é o <b>endereço de broadcast</b> de <code>'+ip+'/'+p+'</code>?';q.a=n2i(c.bc);q.kind='ip'}
  if(t==='hosts'){q.q='Quantos <b>hosts válidos</b> cabem em uma rede <code>/'+p+'</code>?';q.a=String(c.hosts);q.kind='num'}
  if(t==='first'){q.q='Qual é o <b>primeiro host utilizável</b> de <code>'+ip+'/'+p+'</code>?';q.a=n2i(c.first);q.kind='ip'}
  if(t==='last'){q.q='Qual é o <b>último host utilizável</b> de <code>'+ip+'/'+p+'</code>?';q.a=n2i(c.last);q.kind='ip'}
  if(t==='mask'){q.q='Qual é a <b>máscara em decimal</b> de <code>/'+p+'</code>?';q.a=n2i(c.mask);q.kind='ip'}
  if(t==='priv'){var pool=['10.4.7.9','172.20.1.5','172.32.0.1','172.15.255.1','192.168.100.2','192.169.0.1','8.8.8.8','100.64.0.1'];q.ip=pool[rnd(0,pool.length-1)];q.q='O endereço <code>'+q.ip+'</code> é <b>privado</b> (RFC 1918)?';q.a=priv(i2n(q.ip))?'sim':'não';q.kind='yn'}
  if(t==='in'){var net=n2i(c.net),other=rnd(0,1)?n2i(c.net+rnd(0,c.total-1)):n2i((c.net+c.total+rnd(0,255))>>>0);q.q='O endereço <code>'+other+'</code> pertence à rede <code>'+net+'/'+p+'</code>?';q.a=(i2n(other)&mask(p))>>>0===c.net?'sim':'não';q.kind='yn';q.ip=other}
  return q;
}
function why(q){
  var c=q.c,p=q.p,s='';
  if(q.t==='priv'){return 'As faixas privadas são <code>10.0.0.0/8</code>, <code>172.16.0.0/12</code> (172.16 a 172.31) e <code>192.168.0.0/16</code>. '+(q.a==='sim'?'Este endereço está em uma delas.':'Este está fora de todas elas, então é público (ou de uso especial).')}
  if(q.t==='in'){var o=i2n(q.ip);return 'Aplicando a máscara <code>/'+p+'</code> ao endereço, a rede dele é <code>'+n2i((o&mask(p))>>>0)+'</code>; a rede perguntada é <code>'+n2i(c.net)+'</code>. '+(q.a==='sim'?'São iguais.':'São diferentes.')}
  if(q.t==='hosts')return 'Restam <code>32 − '+p+' = '+(32-p)+'</code> bits de host: 2<sup>'+(32-p)+'</sup> = '+c.total+' endereços, menos 2 (rede e broadcast) = <b>'+c.hosts+'</b>.';
  if(q.t==='mask')return 'Os '+p+' primeiros bits valem 1: <code>'+bin(c.mask)+'</code> = <b>'+n2i(c.mask)+'</b>.';
  return 'IP: <code>'+bin(c.ip)+'</code><br>Máscara: <code>'+bin(c.mask)+'</code><br>Rede (IP E máscara): <code>'+bin(c.net)+'</code> = '+n2i(c.net)+'<br>Broadcast (host bits em 1): '+n2i(c.bc)+'. Hosts: '+n2i(c.first)+' a '+n2i(c.last)+'.';
}
K.subnet=function(){
  var key='docker:m5-subnetting',S=K.store.get(key,{best:0,total:0,right:0})||{best:0,total:0,right:0};
  var N=10,qs=[],i=0,score=0,answered=false;
  // calculadora
  var ci=K.$('#cin'),co=K.$('#cout');
  function run(){
    var m=/^\s*(\d+\.\d+\.\d+\.\d+)\s*\/\s*(\d{1,2})\s*$/.exec(ci.value);
    if(!m||i2n(m[1])===null||+m[2]>32){co.innerHTML='<div class="msg">Digite um endereço com prefixo, por exemplo <code>192.168.10.37/26</code>.</div>';return}
    var p=+m[2],c=calc(m[1],p);
    co.innerHTML='<dl class="kv"><dt>Máscara</dt><dd>'+n2i(c.mask)+'</dd><dt>Rede</dt><dd>'+n2i(c.net)+'/'+p+'</dd><dt>Broadcast</dt><dd>'+n2i(c.bc)+'</dd><dt>Primeiro host</dt><dd>'+n2i(c.first)+'</dd><dt>Último host</dt><dd>'+n2i(c.last)+'</dd><dt>Hosts válidos</dt><dd>'+c.hosts.toLocaleString('pt-BR')+'</dd><dt>Privado (RFC 1918)</dt><dd>'+(priv(c.ip)?'sim':'não')+'</dd></dl>'+
      '<label class="f">IP em binário (azul: bits de rede, cinza: bits de host)</label>'+bitsHtml(c.ip,p)+'<label class="f">Máscara</label>'+bitsHtml(c.mask,p);
  }
  ci.addEventListener('input',run);run();
  // treino
  var box=K.$('#quiz');
  function start(){qs=[];for(var k=0;k<N;k++)qs.push(gen());i=0;score=0;show()}
  function norm(s){return s.trim().toLowerCase().replace(/\./g,function(m,o,str){return /^\d[\d.]*$/.test(str.trim())?'.':'.'}).replace(/\s/g,'').replace(/^s$/,'sim').replace(/^n$/,'não').replace(/^nao$/,'não')}
  function show(){
    if(i>=N){fin();return}
    var q=qs[i];answered=false;
    var input=q.kind==='yn'?'<div class="row" role="radiogroup" aria-label="Resposta"><button class="btn" type="button" data-v="sim">Sim</button><button class="btn" type="button" data-v="não">Não</button></div>':
      '<div class="row"><input class="txt" id="ans" type="text" inputmode="'+(q.kind==='num'?'numeric':'decimal')+'" autocomplete="off" autocapitalize="off" placeholder="'+(q.kind==='ip'?'ex.: 192.168.1.0':'ex.: 254')+'" aria-label="Sua resposta"><button class="btn primary" id="ok" type="button">Responder</button></div>';
    box.innerHTML='<div class="row" style="margin-bottom:8px"><span class="pill acc">Questão '+(i+1)+' de '+N+'</span><span class="spacer"></span><span class="pill">'+score+' certas</span></div><div class="progress"><i style="width:'+(i/N*100)+'%"></i></div><p style="font-size:17px;margin:16px 0 12px">'+q.q+'</p>'+input+'<div id="fb" aria-live="polite"></div>';
    var a=K.$('#ans');if(a){a.focus();a.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();submit(a.value)}});K.$('#ok').onclick=function(){submit(a.value)}}
    K.$$('[data-v]',box).forEach(function(b){b.onclick=function(){submit(b.getAttribute('data-v'))}});
  }
  function submit(v){
    if(answered){return}
    var q=qs[i];if(!v.trim())return;answered=true;
    var user=q.kind==='yn'?norm(v):v.trim().replace(/\./g,function(){return '.'}).replace(q.kind==='num'?/[.\s]/g:/\s/g,'');
    var ok=user===q.a;if(ok)score++;S.total++;if(ok)S.right++;
    K.$('#fb').innerHTML='<div class="note '+(ok?'ok':'')+'"><b>'+(ok?'Correto.':'Não foi desta vez. Resposta: '+K.esc(q.a)+'.')+'</b><br>'+why(q)+'</div><div class="row" style="margin-top:10px"><button class="btn primary" id="nx" type="button">'+(i<N-1?'Próxima':'Ver resultado')+'</button></div>';
    var nx=K.$('#nx');nx.focus();nx.onclick=function(){i++;show()};K.$$('[data-v]',box).forEach(function(b){b.disabled=true});var a=K.$('#ans');if(a)a.disabled=true;K.$('#ok')&&(K.$('#ok').disabled=true);
    K.store.set(key,S);
  }
  function fin(){
    if(score>S.best)S.best=score;K.store.set(key,S);
    box.innerHTML='<div style="text-align:center"><p class="kicker">Resultado</p><div class="score">'+score+'<span style="font-size:26px;color:var(--muted)"> / '+N+'</span></div><p style="color:var(--ink-2)">'+(score>=9?'Excelente. Você já calcula sub-redes de cabeça.':score>=7?'Bom. Refaça as que errou na calculadora acima.':'Revise a seção 2.2 da teoria (máscara, rede e broadcast) e tente de novo.')+'</p><p style="font-size:13px;color:var(--muted)">Melhor resultado neste navegador: '+S.best+' de '+N+'</p><button class="btn primary" id="again" type="button">Novo treino</button></div>';
    K.$('#again').onclick=start;
  }
  window.__subnet={gen:gen,calc:calc,n2i:n2i,i2n:i2n,submit:function(v){submit(v)},state:function(){return {qs:qs,i:i,score:score}},start:start};
  start();
};
})();
