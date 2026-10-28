(function(){
'use strict';
var K=window.K,F=window.FM10,KEY='tcegoti:m10-sim-seg',S=K.store.get(KEY,{})||{};S.done=S.done||{};
var $=K.$;
var AL=[['min','Minúsculas (26)',26],['mai','Maiúsculas (26)',26],['dig','Dígitos (10)',10],['sim','Símbolos (32)',32]];
var RATES=[['sha','SHA-256 puro (hash rápido)',2444817],['pbk','PBKDF2 com 600.000 iterações',10],['scr','scrypt (n=2^14, r=8, p=1)',20]];
var st={len:8,min:true,mai:false,dig:false,sim:false,custom:0,a:99,b:99,pa:false};
function alfa(){var n=st.custom>0?st.custom:0;AL.forEach(function(x){if(st[x[0]])n+=x[2]});return n}
function fmt(y){
 if(!isFinite(y))return 'incalculável';
 var s=y*31557600;
 if(s<1)return 'menos de 1 segundo';
 if(s<60)return Math.round(s)+' segundos';
 if(s<3600)return (s/60).toFixed(1).replace('.',',')+' minutos';
 if(s<86400)return (s/3600).toFixed(1).replace('.',',')+' horas';
 if(y<1)return (s/86400).toFixed(1).replace('.',',')+' dias';
 if(y<1e6)return y.toFixed(1).replace('.',',').replace(/\B(?=(\d{3})+(?!\d),)/g,'.')+' anos';
 return y.toExponential(2).replace('.',',').replace('e+',' × 10^')+' anos'}
var MIS=[
 {id:'s1',t:'Cai em menos de um dia',d:'Use 8 minúsculas e veja o SHA-256 puro ser quebrado em menos de 1 dia, em média.',ok:function(c){return st.len===8&&c.n===26&&F.bruteYears(c.bits,2444817)*365.25<1}},
 {id:'s2',t:'Hash lento ajuda',d:'Com as mesmas 8 minúsculas, o PBKDF2 de 600.000 iterações passa de 100 anos nesta CPU.',ok:function(c){return st.len===8&&c.n===26&&F.bruteYears(c.bits,10)>100}},
 {id:'s3',t:'Diceware de 4 palavras',d:'Informe o alfabeto personalizado 7776 e comprimento 4, sem marcar caixas: cerca de 51,7 bits.',ok:function(c){return st.len===4&&st.custom===7776&&!st.min&&!st.mai&&!st.dig&&!st.sim&&Math.abs(c.bits-51.7)<0.1}},
 {id:'s4',t:'Dois noves em paralelo',d:'No painel de disponibilidade, ligue dois componentes de 99% em paralelo e chegue a 99,99%.',ok:function(c,v){return st.pa&&st.a===99&&st.b===99&&Math.abs(v-99.99)<0.0001}}
];
function draw(){
 var n=alfa(),bits=n>1?F.entropyBits(st.len,n):0,c={n:n,bits:bits};
 $('#v-len').textContent=st.len;
 var rows=RATES.map(function(r){var y=n>1?F.bruteYears(bits,r[2]):0;return '<tr><td>'+K.esc(r[1])+'</td><td>'+r[2].toLocaleString('pt-BR')+' por segundo</td><td><b>'+fmt(y)+'</b></td></tr>'}).join('');
 $('#res').innerHTML='<div class="card"><p class="kicker">Resultado</p><p>Alfabeto de <b>'+n+'</b> símbolos, comprimento <b>'+st.len+'</b>: entropia de <b>'+bits.toFixed(1).replace('.',',')+' bits</b> (espaço de 2^'+bits.toFixed(1).replace('.',',')+'). Tempo médio de força bruta (metade do espaço), numa única CPU:</p><table class="tbl" style="width:100%"><tr><th style="width:auto">Algoritmo</th><th style="width:auto">Taxa medida</th><th style="width:auto">Tempo médio</th></tr>'+rows+'</table></div>';
 var v=st.pa?F.parallelAvail(st.a,st.b):F.seriesAvail(st.a,st.b),dt=F.downtimeHours(v);
 $('#va').textContent=st.a.toString().replace('.',',')+'%';$('#vb').textContent=st.b.toString().replace('.',',')+'%';
 $('#disp').innerHTML='<div class="card"><p class="kicker">Disponibilidade</p><p>Ligação em <b>'+(st.pa?'paralelo':'série')+'</b>: <b>'+v.toFixed(4).replace('.',',')+'%</b>. Tempo parado por ano: <b>'+dt.toFixed(2).replace('.',',')+' horas</b>.</p><p class="muted" style="font-size:13.5px;margin:0">'+(st.pa?'Em paralelo, falham as duas ao mesmo tempo: (1 − A1) × (1 − A2).':'Em série, as duas precisam funcionar: A1 × A2.')+'</p></div>';
 var nd=0,h='';MIS.forEach(function(m,i){var okk=!!S.done[m.id];if(!okk){try{if(m.ok(c,v)){S.done[m.id]=1;okk=true}}catch(e){}}if(okk)nd++;
  h+='<li style="list-style:none;margin:8px 0;display:flex;gap:10px;align-items:flex-start"><span class="pill'+(okk?' acc':'')+'" style="flex:none">'+(okk?'feita':(i+1))+'</span><span><b>'+K.esc(m.t)+'</b><br><span style="font-size:13px;color:var(--muted)">'+K.esc(m.d)+'</span></span></li>'});
 K.store.set(KEY,S);$('#mis').innerHTML='<p class="kicker">Missões ('+nd+' de '+MIS.length+')</p><ul style="padding:0;margin:0">'+h+'</ul>'}
$('#len').addEventListener('input',function(){st.len=parseInt($('#len').value,10);draw()});
AL.forEach(function(x){$('#c-'+x[0]).addEventListener('change',function(){st[x[0]]=$('#c-'+x[0]).checked;draw()})});
$('#cust').addEventListener('input',function(){st.custom=Math.max(0,parseInt($('#cust').value,10)||0);draw()});
$('#sa').addEventListener('input',function(){st.a=parseFloat($('#sa').value);draw()});
$('#sb').addEventListener('input',function(){st.b=parseFloat($('#sb').value);draw()});
$('#mode').addEventListener('change',function(){st.pa=$('#mode').value==='p';draw()});
document.querySelectorAll('[data-p]').forEach(function(b){b.addEventListener('click',function(){var p=b.getAttribute('data-p').split(',');st.len=+p[0];st.min=p[1]==='1';st.mai=p[2]==='1';st.dig=p[3]==='1';st.sim=p[4]==='1';st.custom=+p[5];
 $('#len').value=st.len;AL.forEach(function(x){$('#c-'+x[0]).checked=st[x[0]]});$('#cust').value=st.custom||'';draw()})});
draw();
})();
