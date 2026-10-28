(function(){
'use strict';
function $(s){return document.querySelector(s)}
function n(id){var v=parseFloat($(id).value.replace(',','.'));return isFinite(v)&&v>=0?v:NaN}
function pct(x){return (Math.round(x*1000000)/10000).toString().replace('.',',')+'%'}
function dur(m){if(m>=1440)return (Math.round(m/1440*100)/100).toString().replace('.',',')+' dias';if(m>=60)return (Math.round(m/60*100)/100).toString().replace('.',',')+' horas';return (Math.round(m*100)/100).toString().replace('.',',')+' minutos'}
var ANO=365*24*60;
function calc(){
  var mtbf=n('#mtbf'),mttr=n('#mttr'),a=n('#sa'),b=n('#sb'),c=n('#sc'),o=$('#outm');
  if([mtbf,mttr,a,b,c].some(isNaN)){o.innerHTML='<p class="muted">Informe números não negativos nos campos.</p>';return}
  if(a>100||b>100||c>100){o.innerHTML='<p class="muted">As disponibilidades dos componentes devem estar entre 0 e 100.</p>';return}
  var d=mtbf+mttr>0?mtbf/(mtbf+mttr):NaN;
  var s=(a/100)*(b/100)*(c/100);
  var p=1-(1-a/100)*(1-b/100);
  o.innerHTML='<table class="tbl"><tr><th>Disponibilidade (MTBF / (MTBF + MTTR))</th><td><span class="bn">'+pct(d)+'</span><br><span class="muted">parada de '+dur((1-d)*ANO)+' por ano</span></td></tr>'+
  '<tr><th>Três componentes em série</th><td><span class="bn">'+pct(s)+'</span> = A · B · C<br><span class="muted">parada de '+dur((1-s)*ANO)+' por ano. Em série, a disponibilidade é menor que a do pior componente.</span></td></tr>'+
  '<tr><th>Componentes A e B em paralelo (redundância)</th><td><span class="bn">'+pct(p)+'</span> = 1 − (1 − A)(1 − B)<br><span class="muted">parada de '+dur((1-p)*ANO)+' por ano. Em paralelo, a disponibilidade é maior que a do melhor componente.</span></td></tr></table>';
}
['#mtbf','#mttr','#sa','#sb','#sc'].forEach(function(s){$(s).addEventListener('input',calc)});
function set(a){$('#mtbf').value=a[0];$('#mttr').value=a[1];$('#sa').value=a[2];$('#sb').value=a[3];$('#sc').value=a[4];calc()}
$('#ex1').addEventListener('click',function(){set([720,2,99.9,99.9,99.5])});
$('#ex2').addEventListener('click',function(){set([8760,0.5,99,99,99])});
calc();
})();
