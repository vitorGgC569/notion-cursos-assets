/* Motor de explicadores animados: lista de passos + cena SVG que anima entre estados. */
(function(){
'use strict';
var K=window.K,NS='http://www.w3.org/2000/svg';
function se(n,a){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);return e}
/* auxiliares de cena */
K.X={
  box:function(id,x,y,w,h,t,c,s){return {k:'box',id:id,x:x,y:y,w:w,h:h,t:t,c:c||'n',s:s}},
  circ:function(id,x,y,r,t,c,s){return {k:'circ',id:id,x:x,y:y,r:r,t:t,c:c||'n',s:s}},
  pill:function(id,x,y,t,c,w){return {k:'box',id:id,x:x,y:y,w:w||(t.length*6.9+18),h:22,t:t,c:c||'n',rx:11}},
  zone:function(id,x,y,w,h,t){return {k:'zone',id:id,x:x,y:y,w:w,h:h,t:t,c:'z'}},
  text:function(id,x,y,t,c,anchor){return {k:'text',id:id,x:x,y:y,t:t,c:c||'t',anchor:anchor||'start'}},
  line:function(id,x1,y1,x2,y2,c,arrow){return {k:'line',id:id,x1:x1,y1:y1,x2:x2,y2:y2,c:c||'',arrow:arrow}}
};
K.explain=function(cfg){
  var D=K.data(),key='docker:'+D.id,S=K.store.get(key,{})||{},seen=S.seen||{};
  var W=cfg.w||720,H=cfg.h||380,steps=cfg.steps,cur=-1,timer=null;
  var list=K.$('#xsteps'),svg=se('svg',{viewBox:'0 0 '+W+' '+H,role:'img','aria-label':cfg.alt||'Ilustração animada do passo atual'});
  var defs=se('defs',{});var mk=se('marker',{id:'ah',viewBox:'0 0 10 10',refX:'9',refY:'5',markerWidth:'7',markerHeight:'7',orient:'auto-start-reverse'});mk.appendChild(se('path',{d:'M0 0L10 5L0 10z',class:'xarrow'}));defs.appendChild(mk);svg.appendChild(defs);
  K.$('#xstage').appendChild(svg);
  var els={};
  function textLines(g,n,cx,cy){
    var lines=String(n.t==null?'':n.t).split('\n'),sub=n.s?String(n.s).split('\n'):[],tot=lines.length+sub.length,lh=15,y0=cy-(tot-1)*lh/2+4;
    lines.forEach(function(l,i){var t=se('text',{x:cx,y:y0+i*lh,'text-anchor':'middle'});t.textContent=l;g.appendChild(t)});
    sub.forEach(function(l,i){var t=se('text',{x:cx,y:y0+(lines.length+i)*lh,'text-anchor':'middle',class:'s'});t.textContent=l;g.appendChild(t)});
  }
  function build(n){
    var g;
    if(n.k==='line'){g=se('line',{class:'xl '+(n.c||'')+' new'});}
    else{g=se('g',{class:'xg new'});}
    return g;
  }
  function fill(g,n){
    if(n.k==='line'){g.setAttribute('x1',n.x1);g.setAttribute('y1',n.y1);g.setAttribute('x2',n.x2);g.setAttribute('y2',n.y2);g.setAttribute('class','xl '+(n.c||''));if(n.arrow)g.setAttribute('marker-end','url(#ah)');else g.removeAttribute('marker-end');return}
    g.setAttribute('transform','translate('+n.x+','+n.y+')');
    var sig=JSON.stringify([n.k,n.t,n.s,n.w,n.h,n.r,n.c,n.anchor]);
    if(g.__sig!==sig){g.__sig=sig;g.innerHTML='';g.setAttribute('class','xg xs-'+(n.c||'n')+(g.__fresh?' new':''));
      if(n.k==='box'||n.k==='zone'){g.appendChild(se('rect',{x:0,y:0,width:n.w,height:n.h,rx:n.rx!=null?n.rx:(n.k==='zone'?12:8)}));
        if(n.k==='zone'){var t=se('text',{x:12,y:18});t.textContent=n.t;g.appendChild(t)}else textLines(g,n,n.w/2,n.h/2)}
      else if(n.k==='circ'){g.appendChild(se('circle',{cx:0,cy:0,r:n.r}));textLines(g,n,0,0)}
      else if(n.k==='text'){String(n.t).split('\n').forEach(function(l,i){var t=se('text',{x:0,y:i*17,'text-anchor':n.anchor||'start',class:n.c==='b'?'':(/^[$#]/.test(l)||n.mono?'mono':'')});t.textContent=l;g.appendChild(t)})}
    }
  }
  function scene(nodes){
    var ids={};nodes.forEach(function(n){ids[n.id]=1});
    Object.keys(els).forEach(function(id){if(!ids[id]){var g=els[id];delete els[id];g.classList.add('gone');setTimeout(function(){if(g.parentNode)g.parentNode.removeChild(g)},500)}});
    nodes.forEach(function(n){
      var g=els[n.id];
      if(!g){g=build(n);g.__fresh=true;svg.appendChild(g);els[n.id]=g;fill(g,n);void g.getBoundingClientRect();requestAnimationFrame(function(){g.classList.remove('new');g.__fresh=false});}
      else fill(g,n);
    });
    // ordem de desenho: linhas e zonas atrás
    ['line','zone'].forEach(function(k){nodes.forEach(function(n){if(n.k===k&&els[n.id])svg.insertBefore(els[n.id],defs.nextSibling)})});
  }
  function go(i){
    if(i<0||i>=steps.length)return;cur=i;var s=steps[i];
    K.$$('button',list).forEach(function(b,j){if(j===i)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current')});
    seen[i]=1;S.seen=seen;K.store.set(key,S);K.$$('button',list)[i].classList.add('seen');
    K.$('#xcmd').innerHTML=s.cmd?'<span class="p">$</span> '+K.esc(s.cmd)+(s.out?'<span class="o">'+K.esc(s.out)+'</span>':''):'<span class="p">·</span> '+K.esc(s.title);
    K.$('#xcap').innerHTML='<h3>'+K.esc(s.title)+'</h3>'+s.text;
    K.$('#xcnt').textContent='Passo '+(i+1)+' de '+steps.length;
    K.$('#xprev').disabled=i===0;K.$('#xnext').disabled=i===steps.length-1;
    scene(typeof s.scene==='function'?s.scene():s.scene);
  }
  list.innerHTML=steps.map(function(s,i){return '<button type="button" data-i="'+i+'"><code>'+K.esc(s.label||s.cmd||s.title)+'</code>'+(s.label&&s.cmd?'':'')+'<small>'+K.esc(s.title)+'</small></button>'}).join('');
  K.$$('button',list).forEach(function(b){b.onclick=function(){stop();go(+b.getAttribute('data-i'))}});
  function stop(){if(timer){clearInterval(timer);timer=null;K.$('#xplay').textContent='Reproduzir'}}
  K.$('#xprev').onclick=function(){stop();go(cur-1)};K.$('#xnext').onclick=function(){stop();go(cur+1)};
  K.$('#xplay').onclick=function(){if(timer){stop();return}if(cur>=steps.length-1)go(0);K.$('#xplay').textContent='Pausar';timer=setInterval(function(){if(cur>=steps.length-1){stop();return}go(cur+1)},3600)};
  document.addEventListener('keydown',function(e){if(/INPUT|TEXTAREA/.test(e.target.tagName))return;if(e.key==='ArrowRight'){stop();go(cur+1)}else if(e.key==='ArrowLeft'){stop();go(cur-1)}});
  window.__xp={go:go,steps:steps,cur:function(){return cur},svg:svg};
  go(0);
};
})();
