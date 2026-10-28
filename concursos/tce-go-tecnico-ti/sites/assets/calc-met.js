(function(){
'use strict';
function $(s){return document.querySelector(s)}
function n(id){var v=parseFloat($(id).value);return isFinite(v)&&v>=0?v:NaN}
function pct(x){return isFinite(x)?(Math.round(x*10000)/100).toString().replace('.',',')+'%':'indefinido'}
function f(x){return isFinite(x)?(Math.round(x*10000)/10000).toString().replace('.',','):'indefinido'}
function calc(){
  var vp=n('#vp'),fp=n('#fp'),fn=n('#fn'),vn=n('#vn'),o=$('#outm');
  if([vp,fp,fn,vn].some(isNaN)){o.innerHTML='<p class="muted">Informe números não negativos nos quatro campos.</p>';return}
  var t=vp+fp+fn+vn,acc=(vp+vn)/t,pre=vp/(vp+fp),rec=vp/(vp+fn),esp=vn/(vn+fp),f1=2*pre*rec/(pre+rec),fpr=fp/(fp+vn);
  var bal=(rec+esp)/2;
  var aviso='';
  if(t>0&&(vp+fn)/t<0.1) aviso='<p class="muted">Atenção: a classe positiva é menos de 10% dos dados. Nesse caso a acurácia engana: observe precisão, <i>recall</i> e F1.</p>';
  o.innerHTML='<table class="tbl"><tr><th></th><th>Previsto positivo</th><th>Previsto negativo</th></tr><tr><th>Real positivo</th><td>VP = '+vp+'</td><td>FN = '+fn+'</td></tr><tr><th>Real negativo</th><td>FP = '+fp+'</td><td>VN = '+vn+'</td></tr></table>'+
  '<table class="tbl"><tr><th>Acurácia</th><td><span class="bn">'+pct(acc)+'</span> = (VP + VN) / total</td></tr>'+
  '<tr><th>Precisão</th><td><span class="bn">'+pct(pre)+'</span> = VP / (VP + FP)</td></tr>'+
  '<tr><th>Recall (sensibilidade)</th><td><span class="bn">'+pct(rec)+'</span> = VP / (VP + FN)</td></tr>'+
  '<tr><th>Especificidade</th><td><span class="bn">'+pct(esp)+'</span> = VN / (VN + FP)</td></tr>'+
  '<tr><th>F1</th><td><span class="bn">'+f(f1)+'</span> = 2 · precisão · recall / (precisão + recall)</td></tr>'+
  '<tr><th>Taxa de falsos positivos</th><td><span class="bn">'+pct(fpr)+'</span> = FP / (FP + VN)</td></tr>'+
  '<tr><th>Acurácia balanceada</th><td><span class="bn">'+pct(bal)+'</span> = (recall + especificidade) / 2</td></tr></table>'+aviso;
}
['#vp','#fp','#fn','#vn'].forEach(function(s){$(s).addEventListener('input',calc)});
function set(a){$('#vp').value=a[0];$('#fp').value=a[1];$('#fn').value=a[2];$('#vn').value=a[3];calc()}
$('#ex1').addEventListener('click',function(){set([30,20,10,140])});
$('#ex2').addEventListener('click',function(){set([0,0,10,990])});
calc();
})();
