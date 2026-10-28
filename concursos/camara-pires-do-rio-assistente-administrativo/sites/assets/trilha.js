/* Trilha: progresso por atividade lido do localStorage (mesmas chaves das páginas). */
(function(){
var K=window.K,D=K.data(),root=K.$('#trilha');
function frac(a){
  var base='cpr:'+a.slug,S=K.store.get(base,null),t=a.total||1,n=0;
  try{
    if(a.type==='ex'){if(S){for(var k in S){if(S[k]&&(S[k].g==='ok'||S[k].g==='bad'))n++}}return Math.min(1,n/t)}
    if(a.type==='quiz'){var b=K.store.get(base+':best',null);return b?1:0}
    if(a.type==='lab'){return S?Math.min(1,Object.keys(S).length/t):0}
    if(a.type==='term'||a.type==='editor'){return S&&S.done?Math.min(1,Object.keys(S.done).length/t):0}
    if(a.type==='score'){return S&&S.best?Math.min(1,S.best/t):0}
    if(a.type==='explain'){return S&&S.seen?Math.min(1,Object.keys(S.seen).length/t):0}
  }catch(e){}
  return 0;
}
function qdesc(a){if(a.type==='quiz'){var b=K.store.get('cpr:'+a.slug+':best',null);if(b)return a.desc+' · melhor: '+b.pct+'%'}return a.desc}
var total=0,sum=0,firstOpen=null,html='';
D.parts.forEach(function(p){
  html+='<section class="tr-part"><p class="kicker">'+K.esc(p.parte)+'</p><h2>'+K.esc(p.nome)+'</h2></section>';
  p.mods.forEach(function(m){
    var has=m.acts.length>0,fr=m.acts.map(frac),mp=has?fr.reduce(function(a,b){return a+b},0)/fr.length:0;
    if(has){total+=m.acts.length;sum+=fr.reduce(function(a,b){return a+b},0)}
    var meta=[m.nivel,m.semana?'semana '+m.semana:'',m.horas?m.horas+' h':''].filter(Boolean).join(' · ');
    if(!has){html+='<div class="tr-mod soon"><div class="tr-h"><span class="num">'+m.n+'</span><div><div class="nm">'+K.esc(m.nome)+'</div><div class="sub">'+K.esc(meta)+'</div></div><span class="mp">em breve</span></div></div>';return}
    var open=false;
    if(!firstOpen){m.acts.forEach(function(a,i){if(!firstOpen&&fr[i]<1){firstOpen=a.slug+'/';open=true}})}
    html+='<div class="tr-mod"><button type="button" class="tr-h" aria-expanded="'+open+'"><span class="num">'+m.n+'</span><div><div class="nm">'+K.esc(m.nome)+'</div><div class="sub">'+K.esc(meta)+'</div></div><span class="mp">'+Math.round(mp*100)+'%</span></button><div class="bd"'+(open?'':' hidden')+'><p class="tr-res">'+K.esc(m.resumo)+'</p><div class="tr-acts">'+
      m.acts.map(function(a,i){var f=fr[i];return '<a class="tr-act'+(f>=1?' done':'')+'" href="'+a.slug+'/"><span class="kd">'+K.esc(a.kind)+'</span><b>'+K.esc(a.title)+'</b><span>'+K.esc(qdesc(a))+'</span><div class="progress"><i style="width:'+Math.round(f*100)+'%"></i></div></a>'}).join('')+'</div></div></div>';
  });
});
root.innerHTML=html;
K.$$('.tr-h[aria-expanded]',root).forEach(function(b){b.onclick=function(){var o=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',!o);b.nextElementSibling.hidden=o}});
var pct=total?Math.round(100*sum/total):0;
K.$('#tpct').textContent=pct+'%';K.$('#tbar').style.width=pct+'%';
var done=0;D.parts.forEach(function(p){p.mods.forEach(function(m){m.acts.forEach(function(a){if(frac(a)>=1)done++})})});
K.$('#tstat').innerHTML='<span><b>'+done+'</b> de '+total+' atividades concluídas</span><span><b>'+D.parts.reduce(function(n,p){return n+p.mods.filter(function(m){return m.acts.length}).length},0)+'</b> módulos disponíveis de '+D.totalMods+'</span>';
var c=K.$('#tcont');if(firstOpen)c.href=firstOpen;else{c.textContent='Tudo concluído';c.removeAttribute('href')}
if(done===0&&firstOpen)c.textContent='Começar';
})();
