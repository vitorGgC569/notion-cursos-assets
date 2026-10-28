(function(){
var K=window.K;
K.cards=function(){
  var D=K.data(),root=K.$('#app'),key='tcegoti:'+D.id,S=K.store.get(key,{})||{known:{}};if(!S.known)S.known={};
  var order=[],i=0,flip=false,only=false;
  function mk(){order=[];D.cards.forEach(function(c,n){if(!only||!S.known[n])order.push(n)});if(i>=order.length)i=0}
  function save(){K.store.set(key,S)}
  function draw(){
    mk();var kn=Object.keys(S.known).filter(function(k){return S.known[k]}).length;
    if(!order.length){root.innerHTML='<div class="card"><h2 style="margin-top:0">Tudo revisado</h2><p>Você marcou os '+D.cards.length+' cartões como sabidos. Volte amanhã para uma segunda rodada.</p><div class="row"><button class="btn" id="all" type="button">Ver todos de novo</button></div></div>';K.$('#all').onclick=function(){only=false;S.known={};save();draw()};return}
    var n=order[i],c=D.cards[n];
    root.innerHTML='<div class="row" style="margin-bottom:10px"><span class="pill acc">Cartão '+(i+1)+' de '+order.length+'</span><span class="spacer"></span><span class="pill">'+kn+' de '+D.cards.length+' sabidos</span></div>'+
    '<div class="progress" style="margin-bottom:14px"><i style="width:'+Math.round(100*kn/D.cards.length)+'%"></i></div>'+
    '<button type="button" id="fc" class="card" style="all:unset;box-sizing:border-box;display:block;width:100%;min-height:190px;cursor:pointer;background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:26px 28px;box-shadow:var(--shadow)" aria-label="Virar cartão">'+
    '<span class="kicker" style="display:block;margin-bottom:10px">'+(flip?'Resposta':'Pergunta')+'</span><span style="display:block;font:600 '+(flip?'18':'22')+'px/1.4 var(--serif)">'+K.esc(flip?c.b:c.f)+'</span><span style="display:block;margin-top:16px;font-size:12.5px;color:var(--muted)">'+(flip?'':'Toque para ver a resposta')+'</span></button>'+
    '<div class="row" style="margin-top:14px;gap:8px;flex-wrap:wrap"><button class="btn" id="pv" type="button">Anterior</button><button class="btn" id="fl" type="button">Virar</button><button class="btn" id="rv" type="button">Revisar depois</button><button class="btn primary" id="ok" type="button">Já sei</button><span class="spacer"></span><button class="btn" id="on" type="button">'+(only?'Mostrar todos':'Só os que faltam')+'</button></div>';
    K.$('#fc').onclick=K.$('#fl').onclick=function(){flip=!flip;draw()};
    K.$('#pv').onclick=function(){i=(i-1+order.length)%order.length;flip=false;draw()};
    K.$('#rv').onclick=function(){S.known[n]=false;save();i=(i+1)%order.length;flip=false;draw()};
    K.$('#ok').onclick=function(){S.known[n]=true;save();if(only){}else{i=(i+1)%order.length}flip=false;draw()};
    K.$('#on').onclick=function(){only=!only;i=0;flip=false;draw()};
  }
  draw();
};
K.match=function(){
  var D=K.data(),root=K.$('#app'),key='tcegoti:'+D.id+':best',cur=0,ans=[],done=false;
  function draw(){
    if(cur>=D.items.length){var sc=ans.filter(function(a,j){return a===D.items[j].ok}).length,pct=Math.round(100*sc/D.items.length);K.store.set(key,{score:sc,pct:pct});
      root.innerHTML='<div class="card"><p class="kicker">Resultado</p><h2 style="margin-top:0">'+sc+' de '+D.items.length+' ('+pct+'%)</h2><p>'+(pct>=80?'Muito bom. Você já separa bem as quatro funções.':'Releia a seção das quatro funções e tente de novo.')+'</p><div class="row"><button class="btn primary" id="again" type="button">Jogar de novo</button></div></div>'+
      D.items.map(function(it,j){var ok=ans[j]===it.ok;return '<details><summary><span class="pill '+(ok?'ok':'bad')+'">'+(ok?'Certa':'Errada')+'</span> '+K.esc(it.t)+'</summary><div class="in"><div class="note '+(ok?'ok':'acc')+'"><b>'+K.esc(D.labels[it.ok])+'.</b> '+K.esc(it.exp)+'</div></div></details>'}).join('');
      K.$('#again').onclick=function(){cur=0;ans=[];draw()};return}
    var it=D.items[cur];
    root.innerHTML='<div class="row" style="margin-bottom:10px"><span class="pill acc">Situação '+(cur+1)+' de '+D.items.length+'</span></div><div class="progress" style="margin-bottom:14px"><i style="width:'+Math.round(100*cur/D.items.length)+'%"></i></div>'+
    '<div class="card"><p class="kicker">Qual função?</p><div class="stmt" style="font-size:19px;margin-bottom:14px">'+K.esc(it.t)+'</div><div id="ch" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px">'+D.labels.map(function(l,k){return '<button type="button" class="btn" data-k="'+k+'">'+K.esc(l)+'</button>'}).join('')+'</div><div id="fb"></div></div>';
    K.$$('#ch .btn').forEach(function(b){b.onclick=function(){var k=+b.getAttribute('data-k');ans[cur]=k;K.$$('#ch .btn').forEach(function(x){x.disabled=true;var kk=+x.getAttribute('data-k');if(kk===it.ok)x.classList.add('primary')});
      K.$('#fb').innerHTML='<div class="note '+(k===it.ok?'ok':'bad')+'" style="margin-top:12px"><b>'+(k===it.ok?'Correto.':'Não foi desta vez. É '+K.esc(D.labels[it.ok])+'.')+'</b> '+K.esc(it.exp)+'</div><div class="row" style="margin-top:12px"><button class="btn primary" id="nx" type="button">'+(cur===D.items.length-1?'Ver resultado':'Próxima')+'</button></div>';
      K.$('#nx').onclick=function(){cur++;draw()}}});
  }
  draw();
};
})();
