/* TCE-GO 2026 · cartões de revisão por módulo: interface (vanilla, sem rastreadores). Depende de app.js e revisao-core.js */
(function(){
var K=window.K,R=window.RevCore;
K.revisao=function(){
  var D=K.data(),root=K.$('#app'),key='tcegoti:'+D.id;
  var S=K.store.get(key,null)||{};
  if(!S.mode)S.mode='ess';if(!S.sel)S.sel={};if(!S.known)S.known={};
  var order=[],i=0,flip=false,only=false,shuf=false,msg='';
  function save(){K.store.set(key,S)}
  function mk(){order=R.cards(D,S,{only:only,shuffle:false});if(shuf){order=R.shuffle(order,Math.random);shuf=false}if(i>=order.length)i=0}
  function chips(){
    return D.decks.map(function(d){var on=S.sel[d.m]!==false;var n=(S.mode==='comp'?d.comp:d.ess).length;
      return '<button type="button" class="btn sm'+(on?' primary':'')+'" data-m="'+d.m+'" aria-pressed="'+on+'" title="'+K.esc(d.nome)+'">M'+d.m+' ('+n+')</button>'}).join('');
  }
  function draw(){
    mk();var st=R.stats(D,S);
    var top='<div class="row" style="margin-bottom:10px;gap:8px"><span class="pill acc">Modo: '+(S.mode==='comp'?'completo':'essencial')+'</span><span class="spacer"></span><span class="pill">'+st.known+' de '+st.total+' sabidos</span></div>'+
      '<div class="progress" style="margin-bottom:12px"><i style="width:'+K.pct(st.known,st.total)+'%"></i></div>'+
      '<div class="row" id="chips" style="margin-bottom:10px;gap:6px">'+chips()+'</div>'+
      '<div class="row" style="margin-bottom:14px;gap:8px"><button class="btn sm" id="md" type="button">'+(S.mode==='comp'?'Ver só o essencial (cheat sheet)':'Ver o completo (todos os cartões do módulo)')+'</button><button class="btn sm" id="sh" type="button">Embaralhar</button><button class="btn sm" id="on" type="button" aria-pressed="'+only+'">'+(only?'Mostrar todos':'Só os que faltam')+'</button></div>';
    var body;
    if(!order.length){
      body='<div class="card"><h2 style="margin-top:0">'+(st.total?'Tudo revisado':'Nenhum cartão selecionado')+'</h2><p>'+(st.total?'Você marcou os '+st.total+' cartões como sabidos. Volte amanhã para uma segunda rodada.':'Escolha pelo menos um módulo acima.')+'</p><div class="row"><button class="btn" id="all" type="button">Ver todos de novo</button></div></div>';
    }else{
      var c=order[i];
      body='<div class="row" style="margin-bottom:8px"><span class="pill">Cartão '+(i+1)+' de '+order.length+'</span><span class="pill">Módulo '+c.m+' · '+K.esc(c.nome)+'</span><span class="pill">'+(c.tipo==='e'?'essencial':'completo')+'</span></div>'+
      '<button type="button" id="fc" class="card" style="all:unset;box-sizing:border-box;display:block;width:100%;min-height:170px;cursor:pointer;background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:24px 26px;box-shadow:var(--shadow)" aria-label="Virar cartão">'+
      '<span class="kicker" style="display:block;margin-bottom:10px">'+(flip?'Resposta':'Pergunta')+'</span><span style="display:block;font:600 '+(flip?'17':'21')+'px/1.4 var(--serif)">'+K.esc(flip?c.b:c.f)+'</span><span style="display:block;margin-top:14px;font-size:12.5px;color:var(--muted)">'+(flip?'Clique para voltar à pergunta':'Tente responder de cabeça e clique para virar')+'</span></button>'+
      '<div class="row" style="margin-top:12px;gap:8px"><button class="btn" id="pv" type="button">Anterior</button><button class="btn" id="fl" type="button">Virar</button><button class="btn" id="rv" type="button">Revisar depois</button><button class="btn primary" id="ok" type="button">Já sei</button></div>';
    }
    var foot='<div class="row" style="margin-top:16px;gap:8px"><button class="btn sm ghost" id="cp" type="button">Copiar a lista dos cartões que faltam</button><button class="btn sm ghost" id="rs" type="button">Zerar o progresso</button><span class="pill" id="msg" style="'+(msg?'':'display:none')+'">'+K.esc(msg)+'</span></div>';
    root.innerHTML=top+body+foot;bind(order[i]);
  }
  function say(t){msg=t;var e=K.$('#msg');if(e){e.textContent=t;e.style.display=''}setTimeout(function(){msg='';var e2=K.$('#msg');if(e2)e2.style.display='none'},2200)}
  function bind(c){
    K.$$('#chips .btn').forEach(function(b){b.onclick=function(){var m=+b.getAttribute('data-m');S.sel[m]=S.sel[m]===false;save();i=0;flip=false;draw()}});
    K.$('#md').onclick=function(){S.mode=S.mode==='comp'?'ess':'comp';save();i=0;flip=false;draw()};
    K.$('#sh').onclick=function(){shuf=true;i=0;flip=false;draw()};
    K.$('#on').onclick=function(){only=!only;i=0;flip=false;draw()};
    K.$('#rs').onclick=function(){if(confirm('Zerar o progresso deste site neste navegador?')){S.known={};save();i=0;flip=false;draw()}};
    K.$('#cp').onclick=function(){
      var t=R.missingText(D,S);if(!t){say('Nada faltando');return}
      var done=function(){say('Copiado')};
      if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(done,function(){fb(t);done()})}else{fb(t);done()}
    };
    var all=K.$('#all');if(all)all.onclick=function(){only=false;i=0;draw()};
    if(!c)return;
    K.$('#fc').onclick=K.$('#fl').onclick=function(){flip=!flip;draw()};
    K.$('#pv').onclick=function(){i=(i-1+order.length)%order.length;flip=false;draw()};
    K.$('#rv').onclick=function(){S.known[c.id]=false;save();i=(i+1)%order.length;flip=false;draw()};
    K.$('#ok').onclick=function(){S.known[c.id]=true;save();if(!only)i=(i+1)%order.length;flip=false;draw()};
  }
  function fb(t){var a=document.createElement('textarea');a.value=t;a.style.position='fixed';a.style.opacity='0';document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(e){}document.body.removeChild(a)}
  document.addEventListener('keydown',function(e){
    if(e.target&&/INPUT|TEXTAREA/.test(e.target.tagName))return;
    var fc=K.$('#fc');if(!fc)return;
    if(e.key===' '||e.key==='Enter'){if(e.target&&e.target.tagName==='BUTTON')return;e.preventDefault();K.$('#fl').click()}
    else if(e.key==='ArrowLeft')K.$('#pv').click();
    else if(e.key==='ArrowRight'){i=(i+1)%order.length;flip=false;draw()}
  });
  draw();
};
})();
