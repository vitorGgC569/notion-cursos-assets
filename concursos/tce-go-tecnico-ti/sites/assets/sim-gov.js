(function(){
'use strict';
var K=window.K,F=window.FM11,KEY='tcegoti:m11-sim-gov',S=K.store.get(KEY,{})||{};S.done=S.done||{};
var $=K.$;
var st={bac:500000,pv:250000,ev:250000,ac:250000,slo:99,days:30,a:99.5,b:99.5,pa:false};
function brl(x){return 'R$ '+x.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})}
function n4(x){return x.toFixed(4).replace('.',',')}
var MIS=[
 {id:'s1',t:'Reproduza o laboratório L1',d:'Use o botão "Dados do L1" e confira CPI 0,8353 e SPI 0,7889.',ok:function(r){return st.bac===500000&&st.pv===270000&&st.ev===213000&&st.ac===255000&&Math.abs(r.cpi-0.8353)<0.0001}},
 {id:'s2',t:'Projeto adiantado e barato',d:'Ajuste os valores para CPI e SPI acima de 1,10.',ok:function(r){return r.cpi>1.1&&r.spi>1.1}},
 {id:'s3',t:'Meta quase impossível',d:'Deixe o TCPI para fechar no BAC acima de 1,20, aumentando o custo real.',ok:function(r){return r.tcpi>1.2&&st.ac<st.bac}},
 {id:'s4',t:'Orçamento de erro de 43,2 minutos',d:'No painel de SLO, escolha 99,9% e 30 dias.',ok:function(r,b){return st.slo===99.9&&st.days===30&&Math.abs(b-43.2)<0.001}},
 {id:'s5',t:'Dois 99,5% em paralelo',d:'Ligue dois componentes de 99,5% em paralelo e chegue a 99,9975%.',ok:function(r,b,v){return st.pa&&st.a===99.5&&st.b===99.5&&Math.abs(v-99.9975)<0.00001}}
];
function draw(){
 var r=F.evm(st.bac,st.pv,st.ev,st.ac);
 $('#v-bac').textContent=brl(st.bac);$('#v-pv').textContent=brl(st.pv);$('#v-ev').textContent=brl(st.ev);$('#v-ac').textContent=brl(st.ac);
 var cls=function(x){return x<1?'m':'d'};
 $('#res').innerHTML='<div class="card"><p class="kicker">Painel 1: valor agregado</p><table class="tbl" style="width:100%"><tr><th style="width:auto">Medida</th><th style="width:auto">Valor</th><th style="width:auto">Leitura</th></tr>'
 +'<tr><td>CPI = EV/AC</td><td><b>'+n4(r.cpi)+'</b></td><td>'+(r.cpi<1?'custo acima do orçado':'custo abaixo do orçado')+'</td></tr>'
 +'<tr><td>SPI = EV/PV</td><td><b>'+n4(r.spi)+'</b></td><td>'+(r.spi<1?'atrasado':'adiantado')+'</td></tr>'
 +'<tr><td>CV = EV − AC</td><td>'+brl(r.cv)+'</td><td></td></tr><tr><td>SV = EV − PV</td><td>'+brl(r.sv)+'</td><td></td></tr>'
 +'<tr><td>EAC atípico</td><td>'+brl(r.eacAt)+'</td><td>AC + (BAC − EV)</td></tr>'
 +'<tr><td>EAC típico</td><td>'+brl(r.eacTip)+'</td><td>BAC / CPI</td></tr>'
 +'<tr><td>EAC com CPI × SPI</td><td>'+brl(r.eacCS)+'</td><td>AC + (BAC − EV)/(CPI×SPI)</td></tr>'
 +'<tr><td>ETC típico</td><td>'+brl(r.etc)+'</td><td>EAC − AC</td></tr><tr><td>VAC</td><td>'+brl(r.vac)+'</td><td>BAC − EAC</td></tr>'
 +'<tr><td>TCPI para o BAC</td><td><b>'+n4(r.tcpi)+'</b></td><td>(BAC − EV)/(BAC − AC)</td></tr></table></div>';
 var b=F.budgetMin(st.slo,st.days);
 $('#v-slo').textContent=st.slo.toString().replace('.',',')+'%';$('#v-days').textContent=st.days+' dias';
 $('#slo').innerHTML='<div class="card"><p class="kicker">Painel 2: SLO e orçamento de erro</p><p>SLO de <b>'+st.slo.toString().replace('.',',')+'%</b> em <b>'+st.days+' dias</b>: orçamento de erro de <b>'+b.toFixed(1).replace('.',',')+' minutos</b> ('+(b/60).toFixed(2).replace('.',',')+' horas) de parada.</p></div>';
 $('#va').textContent=st.a.toString().replace('.',',')+'%';$('#vb').textContent=st.b.toString().replace('.',',')+'%';
 var v=st.pa?F.parallelAvail(st.a,st.b):F.seriesAvail(st.a,st.b),dt=F.downtimeHours(v);
 $('#disp').innerHTML='<div class="card"><p class="kicker">Painel 3: composição</p><p>Ligação em <b>'+(st.pa?'paralelo':'série')+'</b>: <b>'+v.toFixed(4).replace('.',',')+'%</b>. Tempo parado por ano: <b>'+dt.toFixed(2).replace('.',',')+' horas</b>.</p><p class="muted" style="font-size:13.5px;margin:0">'+(st.pa?'Em paralelo, falham as duas ao mesmo tempo: (1 − A1) × (1 − A2).':'Em série, as duas precisam funcionar: A1 × A2.')+'</p></div>';
 var nd=0,h='';MIS.forEach(function(m,i){var okk=!!S.done[m.id];if(!okk){try{if(m.ok(r,b,v)){S.done[m.id]=1;okk=true}}catch(e){}}if(okk)nd++;
  h+='<li style="list-style:none;margin:8px 0;display:flex;gap:10px;align-items:flex-start"><span class="pill'+(okk?' acc':'')+'" style="flex:none">'+(okk?'feita':(i+1))+'</span><span><b>'+K.esc(m.t)+'</b><br><span style="font-size:13px;color:var(--muted)">'+K.esc(m.d)+'</span></span></li>'});
 K.store.set(KEY,S);$('#mis').innerHTML='<p class="kicker">Missões ('+nd+' de '+MIS.length+')</p><ul style="padding:0;margin:0">'+h+'</ul>'}
['bac','pv','ev','ac'].forEach(function(k){$('#'+k).addEventListener('input',function(){st[k]=parseFloat($('#'+k).value);draw()})});
$('#slo-sel').addEventListener('change',function(){st.slo=parseFloat($('#slo-sel').value);draw()});
$('#days').addEventListener('input',function(){st.days=parseInt($('#days').value,10);draw()});
$('#sa').addEventListener('input',function(){st.a=parseFloat($('#sa').value);draw()});
$('#sb').addEventListener('input',function(){st.b=parseFloat($('#sb').value);draw()});
$('#mode').addEventListener('change',function(){st.pa=$('#mode').value==='p';draw()});
document.querySelectorAll('[data-p]').forEach(function(b){b.addEventListener('click',function(){var p=b.getAttribute('data-p').split(',').map(Number);st.bac=p[0];st.pv=p[1];st.ev=p[2];st.ac=p[3];['bac','pv','ev','ac'].forEach(function(k){$('#'+k).value=st[k]});draw()})});
draw();
})();
