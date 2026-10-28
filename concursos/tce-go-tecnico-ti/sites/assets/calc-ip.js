(function(){
'use strict';
function $(s){return document.querySelector(s)}
function parse4(s){var m=/^\s*(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\s*$/.exec(s);if(!m)return null;var o=m.slice(1).map(Number);if(o.some(function(x){return x>255}))return null;return ((o[0]<<24)|(o[1]<<16)|(o[2]<<8)|o[3])>>>0}
function str4(n){return [n>>>24,(n>>>16)&255,(n>>>8)&255,n&255].join('.')}
function mask(p){return p===0?0:((0xFFFFFFFF<<(32-p))>>>0)}
function bin4(n,p){var b=n.toString(2).padStart(32,'0'),o=[];for(var i=0;i<32;i+=8){var seg=b.slice(i,i+8),h='';for(var j=0;j<8;j++){var bit=seg[j];h+='<span class="'+((i+j)<p?'bn':'bh')+'">'+bit+'</span>'}o.push(h)}return o.join('.')}
function tipo4(n){
  function inr(a,p){return (n&mask(p))>>>0===(parse4(a)&mask(p))>>>0}
  if(inr('10.0.0.0',8)||inr('172.16.0.0',12)||inr('192.168.0.0',16))return 'privado (RFC 1918)';
  if(inr('127.0.0.0',8))return 'loopback';
  if(inr('169.254.0.0',16))return 'link-local (APIPA)';
  if(inr('100.64.0.0',10))return 'CGNAT (RFC 6598)';
  if(inr('224.0.0.0',4))return 'multicast (classe D)';
  if(inr('240.0.0.0',4))return 'reservado (classe E)';
  if(inr('192.0.2.0',24)||inr('198.51.100.0',24)||inr('203.0.113.0',24))return 'documentação';
  return 'público';
}
function classe(n){var a=n>>>24;return a<128?'A':a<192?'B':a<224?'C':a<240?'D':'E'}
function calc4(ip,p){
  var m=mask(p),net=(ip&m)>>>0,wild=(~m)>>>0,bc=(net|wild)>>>0,tot=Math.pow(2,32-p);
  var first,last,hosts;
  if(p===32){first=last=net;hosts=1}else if(p===31){first=net;last=bc;hosts=2}else{first=net+1;last=bc-1;hosts=tot-2}
  return {m:m,net:net,wild:wild,bc:bc,first:first,last:last,hosts:hosts,tot:tot}
}
function row(k,v){return '<tr><th scope="row">'+k+'</th><td>'+v+'</td></tr>'}
function run4(){
  var ip=parse4($('#ip').value),p=parseInt($('#pf').value,10),out=$('#out4'),sub=$('#sub');
  if(ip===null||isNaN(p)||p<0||p>32){out.innerHTML='<p class="muted">Digite um IPv4 válido (ex.: 172.18.10.70) e um prefixo de 0 a 32.</p>';sub.innerHTML='';return}
  var r=calc4(ip,p);
  out.innerHTML='<table class="tbl">'+
   row('Endereço (binário)','<code class="bin">'+bin4(ip,p)+'</code><br><span class="muted">azul: bits de rede · cinza: bits de host</span>')+
   row('Máscara','<code>'+str4(r.m)+'</code> (/'+p+')')+
   row('Máscara curinga (wildcard)','<code>'+str4(r.wild)+'</code>')+
   row('Endereço da rede','<code>'+str4(r.net)+'/'+p+'</code>')+
   row('Primeiro host útil','<code>'+str4(r.first)+'</code>')+
   row('Último host útil','<code>'+str4(r.last)+'</code>')+
   row('Broadcast','<code>'+(p>=31?'não se aplica a /'+p+' em redes ponto a ponto (RFC 3021) ou host único':str4(r.bc))+'</code>')+
   row('Hosts úteis',r.hosts.toLocaleString('pt-BR')+(p<31?' (2<sup>'+(32-p)+'</sup> − 2)':''))+
   row('Classe (histórica) e tipo','classe '+classe(ip)+' · '+tipo4(ip))+'</table>';
  var n=parseInt($('#nsub').value,10);
  if(!n||n<1){sub.innerHTML='';return}
  var bits=Math.ceil(Math.log2(n));
  if(p+bits>30){sub.innerHTML='<p class="muted">Não cabem '+n+' sub-redes iguais com hosts úteis a partir de /'+p+'.</p>';return}
  var np=p+bits,cnt=Math.pow(2,bits),step=Math.pow(2,32-np),h='';
  var shown=Math.min(cnt,32);
  for(var i=0;i<shown;i++){var rr=calc4((r.net+i*step)>>>0,np);h+='<tr><td>'+(i+1)+'</td><td><code>'+str4(rr.net)+'/'+np+'</code></td><td><code>'+str4(rr.first)+' a '+str4(rr.last)+'</code></td><td><code>'+str4(rr.bc)+'</code></td></tr>'}
  sub.innerHTML='<p>Para <b>'+n+'</b> sub-redes são emprestados <b>'+bits+'</b> bit(s): novo prefixo <b>/'+np+'</b>, máscara <code>'+str4(mask(np))+'</code>, '+cnt+' sub-redes de '+(step-2).toLocaleString('pt-BR')+' hosts úteis'+(cnt>32?' (mostrando as 32 primeiras)':'')+'.</p><table class="tbl"><thead><tr><th>#</th><th>Rede</th><th>Hosts úteis</th><th>Broadcast</th></tr></thead><tbody>'+h+'</tbody></table>'
}
/* IPv6 */
function parse6(s){
  s=s.trim().toLowerCase();if(!s||/[^0-9a-f:]/.test(s))return null;
  var dbl=s.split('::');if(dbl.length>2)return null;
  var a=dbl[0]?dbl[0].split(':'):[],b=dbl.length===2&&dbl[1]?dbl[1].split(':'):[];
  var gs;
  if(dbl.length===2){var miss=8-a.length-b.length;if(miss<1)return null;gs=a.concat(Array(miss).fill('0'),b)}else{gs=a;if(gs.length!==8)return null}
  for(var i=0;i<8;i++){if(!/^[0-9a-f]{1,4}$/.test(gs[i]))return null}
  return gs.map(function(g){return parseInt(g,16)})
}
function full6(g){return g.map(function(x){return x.toString(16).padStart(4,'0')}).join(':')}
function short6(g){
  var best=-1,bl=0,i=0;
  while(i<8){if(g[i]===0){var j=i;while(j<8&&g[j]===0)j++;if(j-i>bl&&j-i>=2){best=i;bl=j-i}i=j}else i++}
  var h=g.map(function(x){return x.toString(16)});
  if(best<0)return h.join(':');
  var l=h.slice(0,best).join(':'),r=h.slice(best+bl).join(':');
  return l+'::'+r
}
function tipo6(g){
  if(g.every(function(x,i){return i<7?x===0:x===1}))return 'loopback (::1/128)';
  if(g.every(function(x){return x===0}))return 'não especificado (::/128)';
  if((g[0]&0xffc0)===0xfe80)return 'link-local (fe80::/10)';
  if((g[0]&0xfe00)===0xfc00)return 'ULA, privado (fc00::/7)';
  if((g[0]&0xff00)===0xff00)return 'multicast (ff00::/8)';
  if(g[0]===0x2001&&g[1]===0x0db8)return 'documentação (2001:db8::/32)';
  if((g[0]&0xe000)===0x2000)return 'unicast global (2000::/3)';
  return 'outro/reservado'
}
function run6(){
  var g=parse6($('#ip6').value),out=$('#out6');
  if(!g){out.innerHTML='<p class="muted">Digite um IPv6 válido (ex.: 2804:aaaa:0000:00ab:0000:0000:0000:1111 ou fe80::1).</p>';return}
  out.innerHTML='<table class="tbl">'+row('Forma completa','<code>'+full6(g)+'</code>')+row('Forma comprimida','<code>'+short6(g)+'</code>')+row('Tipo','<b>'+tipo6(g)+'</b>')+row('Prefixo /64 (rede)','<code>'+short6(g.slice(0,4).concat([0,0,0,0]))+'/64</code>')+'</table>'
}
['ip','pf','nsub'].forEach(function(i){$('#'+i).addEventListener('input',run4)});
$('#ip6').addEventListener('input',run6);
window.__calc={parse4:parse4,str4:str4,calc4:calc4,parse6:parse6,short6:short6,full6:full6,tipo6:tipo6,tipo4:tipo4};
run4();run6();
})();
