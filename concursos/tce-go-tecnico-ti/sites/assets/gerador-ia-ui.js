(function(){
'use strict';
var K=window.K,GQ=window.GQ,LET='ABCDE',KEY='tcegoti:m09-gerador',S=K.store.get(KEY,{})||{};
S.tema=S.tema||{};
var root=K.$('#app'),cur=null,resp=null,tema='Todos',nivel=2,seed=null;
function fmt(t){var i=t.lastIndexOf('\n\n');var code=t.slice(0,i),ask=t.slice(i+2);return '<pre class="term-box" style="height:auto;max-height:300px;font-size:13px">'+K.esc(code)+'</pre><p style="margin:10px 0 0">'+K.esc(ask)+'</p>'}
function novoSeed(){return Math.floor(Math.random()*900000)+100000}
function stats(){
  var t=0,a=0,rows='';
  GQ.temas().forEach(function(n){var x=S.tema[n]||{a:0,t:0};t+=x.t;a+=x.a;if(x.t)rows+='<tr><td>'+K.esc(n)+'</td><td>'+x.a+' de '+x.t+'</td><td>'+K.pct(x.a,x.t)+'%</td></tr>'});
  return {t:t,a:a,rows:rows};
}
function render(){
  var st=stats(),q=cur;
  var temas=['Todos'].concat(GQ.temas());
  var h='<div class="card"><div class="row" style="gap:14px;align-items:flex-end;flex-wrap:wrap">'+
   '<div><label class="f" for="gt">Assunto</label><select class="txt" id="gt">'+temas.map(function(n){return '<option'+(n===tema?' selected':'')+'>'+K.esc(n)+'</option>'}).join('')+'</select></div>'+
   '<div><label class="f" for="gn">Nível</label><select class="txt" id="gn">'+['Básico','Intermediário','Avançado'].map(function(n,i){return '<option value="'+(i+1)+'"'+(i+1===nivel?' selected':'')+'>'+n+'</option>'}).join('')+'</select></div>'+
   '<div><label class="f" for="gs">Semente (opcional)</label><input class="txt" id="gs" type="number" min="1" style="width:130px" value="'+(q?q.seed:'')+'" placeholder="aleatória"></div>'+
   '<button class="btn primary" id="gen" type="button">Gerar questão</button></div>'+
   '<p class="muted" style="font-size:13px;margin:10px 0 0">A mesma combinação de assunto, nível e semente gera sempre a mesma questão. Anote a semente para refazer ou compartilhar.</p></div>';
  if(q){
    h+='<div class="card" id="qcard"><div class="row" style="margin-bottom:8px"><span class="pill acc">'+K.esc(q.tema)+'</span><span class="pill">Nível '+q.nivel+'</span><span class="pill">Semente '+q.seed+'</span></div>'+
     '<div class="stmt" style="font-size:16px;margin-bottom:8px">'+fmt(q.texto)+'</div><div role="radiogroup" aria-label="Alternativas">'+
     q.opcoes.map(function(o,i){var c='opt';if(resp!=null){if(i===q.certa)c+=' right';else if(i===resp)c+=' wrong'}
       return '<button type="button" role="radio" class="'+c+'" aria-checked="'+(resp===i)+'"'+(resp!=null?' disabled':'')+' data-i="'+i+'"><span class="l">'+LET[i]+'</span><span>'+K.esc(o)+'</span></button>'}).join('')+'</div>';
    if(resp!=null){var ok=resp===q.certa;
      h+='<div class="note '+(ok?'ok':'bad')+'"><b>'+(resp===-2?'Resolução. A resposta certa é '+LET[q.certa]+'.':ok?'Correto.':'Não foi desta vez. A resposta certa é '+LET[q.certa]+'.')+'</b><ol style="margin:8px 0 0 18px;padding:0">'+q.passos.map(function(p){var i=p.indexOf('\n');return '<li>'+(i<0?K.esc(p):K.esc(p.slice(0,i))+'<pre class="term-box" style="height:auto;max-height:240px;margin:6px 0">'+K.esc(p.slice(i+1))+'</pre>')+'</li>'}).join('')+'</ol></div>'+
       '<div class="row" style="margin-top:14px"><button class="btn primary" id="prox" type="button">Próxima questão</button></div>';
    }else h+='<div class="row" style="margin-top:14px"><button class="btn accent" id="chk" type="button" disabled>Corrigir</button><button class="btn" id="ver" type="button">Mostrar a resolução</button></div>';
    h+='</div>';
  }
  if(st.t){h+='<div class="card"><p class="kicker">Seu desempenho neste navegador</p><p><b>'+st.a+' acertos em '+st.t+' questões ('+K.pct(st.a,st.t)+'%)</b></p><table class="tbl"><tr><th style="width:auto">Assunto</th><th style="width:auto">Acertos</th><th style="width:auto">Taxa</th></tr>'+st.rows+'</table><div class="row"><button class="btn sm" id="zera" type="button">Zerar placar</button></div></div>'}
  root.innerHTML=h;
  var gt=K.$('#gt'),gn=K.$('#gn'),gs=K.$('#gs');
  gt.onchange=function(){tema=gt.value};gn.onchange=function(){nivel=+gn.value};
  K.$('#gen').onclick=function(){tema=gt.value;nivel=+gn.value;seed=gs.value?Math.max(1,parseInt(gs.value,10)||1):novoSeed();cur=GQ.gerar(tema,nivel,seed);resp=null;render();K.$('#qcard').scrollIntoView({block:'nearest'})};
  K.$$('.opt').forEach(function(b){b.onclick=function(){if(resp!=null)return;pend=+b.getAttribute('data-i');K.$$('.opt').forEach(function(x){x.setAttribute('aria-checked',x===b)});var c=K.$('#chk');if(c)c.disabled=false}});
  var c=K.$('#chk');if(c)c.onclick=function(){if(pend==null)return;resp=pend;conta(resp===cur.certa);pend=null;render()};
  var v=K.$('#ver');if(v)v.onclick=function(){resp=-2;render()};
  var p=K.$('#prox');if(p)p.onclick=function(){seed=novoSeed();cur=GQ.gerar(tema,nivel,seed);resp=null;pend=null;render()};
  var z=K.$('#zera');if(z)z.onclick=function(){S={tema:{}};K.store.set(KEY,S);render()};
}
var pend=null;
function conta(ok){var x=S.tema[cur.tema]||(S.tema[cur.tema]={a:0,t:0});x.t++;if(ok)x.a++;K.store.set(KEY,S)}
window.__gq={ui:function(){return cur}};
render();
})();
