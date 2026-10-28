/* TCE-GO 2026 · Técnico de Controle Externo, TI · atividades interativas · JS compartilhado (vanilla, sem rastreadores) */
(function(){
'use strict';
var K={};
window.K=K;
/* modo embed (iframe do Notion): layout compacto + link para tela cheia */
K.embedded=false;try{K.embedded=window.self!==window.top}catch(e){K.embedded=true}
if(K.embedded)document.documentElement.classList.add('embedded');
document.addEventListener('DOMContentLoaded',function(){var f=document.getElementById('full');if(f){f.href=location.href.split('#')[0];f.textContent='Abrir em tela cheia ↗'}});
K.$=function(s,r){return (r||document).querySelector(s)};
K.$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
K.el=function(tag,attrs,html){var e=document.createElement(tag);if(attrs)for(var k in attrs){if(k==='class')e.className=attrs[k];else e.setAttribute(k,attrs[k])}if(html!=null)e.innerHTML=html;return e};
K.esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
K.data=function(){var n=document.getElementById('data');return n?JSON.parse(n.textContent):{}};
K.norm=function(s){return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')};

/* armazenamento tolerante a iframes com cookies/armazenamento bloqueados */
var mem={};
K.store={
  get:function(k,d){try{var v=localStorage.getItem(k);return v==null?(k in mem?mem[k]:d):JSON.parse(v)}catch(e){return k in mem?mem[k]:d}},
  set:function(k,v){mem[k]=v;try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}},
  del:function(k){delete mem[k];try{localStorage.removeItem(k)}catch(e){}}
};

/* botões de copiar nos blocos de código */
K.copyButtons=function(root){
  K.$$('pre',root).forEach(function(pre){
    if(pre.querySelector('.copy')||pre.classList.contains('nocopy'))return;
    var b=K.el('button',{class:'copy',type:'button','aria-label':'Copiar código'},'Copiar');
    b.addEventListener('click',function(){
      var t=pre.querySelector('code')?pre.querySelector('code').innerText:pre.innerText;
      var done=function(){b.textContent='Copiado';setTimeout(function(){b.textContent='Copiar'},1400)};
      if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(done,function(){fallback(t);done()})}else{fallback(t);done()}
    });
    pre.appendChild(b);
  });
  function fallback(t){var a=document.createElement('textarea');a.value=t;a.style.position='fixed';a.style.opacity='0';document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(e){}document.body.removeChild(a)}
};

/* altura para embed do Notion: avisa o pai (inofensivo se não houver ouvinte) */
K.pct=function(a,b){return b?Math.round(100*a/b):0};

/* ===================== EXERCÍCIOS ===================== */
K.exercises=function(cfg){
  var D=K.data(), key='tcegoti:'+D.id, S=K.store.get(key,{})||{};
  var root=K.$('#app'), filter='todos';
  function save(){K.store.set(key,S)}
  function termsOf(html){
    var m=[],re=/<code>([^<]{2,40})<\/code>/g,x,seen={};
    while((x=re.exec(html))){var t=x[1].replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').trim();var n=K.norm(t);if(!seen[n]){seen[n]=1;m.push(t)}}
    return m.slice(0,8);
  }
  function stats(){
    var ok=0,bad=0;D.items.forEach(function(q){var s=S[q.n];if(s&&s.g==='ok')ok++;else if(s&&s.g==='bad')bad++});
    return {ok:ok,bad:bad,total:D.items.length,left:D.items.length-ok-bad};
  }
  function renderStats(){
    var s=stats();
    K.$('#bar').style.width=K.pct(s.ok+s.bad,s.total)+'%';
    K.$('#stats').innerHTML='<span><b>'+s.ok+'</b> acertei</span><span><b>'+s.bad+'</b> para revisar</span><span><b>'+s.left+'</b> pendentes</span><span>Meta: <b>80%</b> de acertos ('+Math.ceil(.8*s.total)+' de '+s.total+')</span>';
  }
  function card(q){
    var st=S[q.n]||{}, c=K.el('article',{class:'card q'+(st.g==='ok'?' done-ok':st.g==='bad'?' done-bad':''),id:'ex-'+q.n,'data-lvl':q.lvl});
    var lv={facil:['Fácil',''],medio:['Médio',''],dificil:['Difícil','']}[q.lvl]||[q.lvlLabel,''];
    c.innerHTML='<div class="head"><span class="num">Exercício '+q.n+'</span><span class="pill '+lv[1]+'">'+lv[0]+'</span><span class="spacer"></span>'+(st.g==='ok'?'<span class="pill ok">Acertei</span>':st.g==='bad'?'<span class="pill bad">Revisar</span>':'')+'</div>'+
      '<div class="stmt">'+q.q+'</div>'+
      '<label class="f" for="a'+q.n+'">Sua resposta</label>'+
      '<textarea class="ans" id="a'+q.n+'" placeholder="Escreva com as suas palavras ou cole o comando. Só você vê isto." spellcheck="false"></textarea>'+
      '<div class="row"><button class="btn primary sm" type="button" data-act="show">Conferir com o gabarito</button>'+(st.shown?'':'')+'</div>'+
      '<div class="key hidden" data-key><h4>Gabarito comentado</h4><div class="terms" data-terms></div><div data-body>'+q.a+'</div>'+
      '<div class="row" style="margin-top:12px"><span style="font-size:13.5px;color:var(--muted)">Como foi?</span><button class="btn sm" type="button" data-act="ok">Acertei</button><button class="btn sm" type="button" data-act="bad">Preciso rever</button><button class="btn ghost sm" type="button" data-act="clear">Limpar</button></div></div>';
    var ta=K.$('textarea',c); ta.value=st.t||'';
    ta.addEventListener('input',function(){S[q.n]=Object.assign(S[q.n]||{},{t:ta.value});save()});
    if(st.shown)reveal();
    function reveal(){
      var key=K.$('[data-key]',c); key.classList.remove('hidden');
      var terms=termsOf(q.a), tbox=K.$('[data-terms]',c), txt=K.norm(ta.value||'');
      if(txt.trim().length>2 && terms.length>=2){
        var hit=0, html=terms.map(function(t){var h=txt.indexOf(K.norm(t))>-1;if(h)hit++;return '<span class="term '+(h?'hit':'miss')+'">'+(h?'✓ ':'· ')+K.esc(t)+'</span>'}).join('');
        tbox.innerHTML='<span style="font-size:13px;color:var(--muted);width:100%">Termos-chave do gabarito que aparecem na sua resposta: <b>'+hit+' de '+terms.length+'</b> (pista automática; confira o texto abaixo).</span>'+html;
      } else tbox.innerHTML='';
      S[q.n]=Object.assign(S[q.n]||{},{shown:1});save();
    }
    c.addEventListener('click',function(e){
      var b=e.target.closest('button[data-act]'); if(!b)return; var a=b.getAttribute('data-act');
      if(a==='show'){reveal();K.$('[data-key]',c).scrollIntoView({block:'nearest',behavior:'smooth'})}
      if(a==='ok'||a==='bad'){S[q.n]=Object.assign(S[q.n]||{},{g:a,shown:1});save();rerender(q.n)}
      if(a==='clear'){delete S[q.n];save();rerender(q.n)}
    });
    return c;
  }
  function rerender(n){
    var old=K.$('#ex-'+n),q=D.items.filter(function(x){return x.n===n})[0],nw=card(q);old.parentNode.replaceChild(nw,old);K.copyButtons(nw);renderStats();applyFilter();
  }
  var pi=0, pager=null;
  function applyPager(){
    if(!K.embedded||!pager)return;
    var vis=K.$$('.q:not(.hidden)');
    if(pi>=vis.length)pi=Math.max(0,vis.length-1);
    K.$$('.q').forEach(function(c){c.classList.remove('pg-hide')});
    vis.forEach(function(c,i){c.classList.toggle('pg-hide',i!==pi)});
    K.$('#pg-pos').textContent=vis.length?('Exercício '+(pi+1)+' de '+vis.length):'Nenhum exercício neste filtro';
    K.$('#pg-prev').disabled=pi<=0;K.$('#pg-next').disabled=pi>=vis.length-1;
  }
  function applyFilter(){
    K.$$('.q').forEach(function(c){c.classList.toggle('hidden',filter!=='todos'&&c.getAttribute('data-lvl')!==filter&&!(filter==='rever'&&c.classList.contains('done-bad')))});
    applyPager();
  }
  var list=K.$('#list');
  if(K.embedded){
    pager=K.el('div',{class:'pager'},'<button class="btn sm" id="pg-prev" type="button">Anterior</button><span id="pg-pos"></span><button class="btn sm primary" id="pg-next" type="button">Próximo</button>');
    var sc=list.previousElementSibling;if(sc&&sc.classList.contains('card'))list.parentNode.appendChild(sc);
    list.parentNode.insertBefore(pager,list);
    K.$('#pg-prev').onclick=function(){pi--;applyPager()};
    K.$('#pg-next').onclick=function(){pi++;applyPager()};
  }
  D.items.forEach(function(q){list.appendChild(card(q))});
  K.copyButtons(list);renderStats();applyPager();
  K.$$('.tab').forEach(function(t){t.addEventListener('click',function(){filter=t.getAttribute('data-f');pi=0;K.$$('.tab').forEach(function(x){x.setAttribute('aria-pressed',x===t)});applyFilter()})});
  K.$('#reset').addEventListener('click',function(){if(confirm('Apagar suas respostas e marcações deste conjunto de exercícios?')){S={};K.store.del(key);list.innerHTML='';D.items.forEach(function(q){list.appendChild(card(q))});K.copyButtons(list);renderStats();applyFilter()}});
};

/* ===================== SIMULADO ===================== */
K.quiz=function(){
  var D=K.data(), root=K.$('#app'), key='tcegoti:'+D.id+':best';
  var st={mode:'prova',i:0,ans:[],done:false,left:D.minutes*60,t:null,checked:[]};
  var total=D.questions.length, cut=Math.ceil(total*D.cut/100);
  function fmt(s){var m=Math.floor(s/60),x=s%60;return (m<10?'0':'')+m+':'+(x<10?'0':'')+x}
  function intro(){
    var best=K.store.get(key,null);
    if(D.study){root.innerHTML='<div class="card"><p class="kicker">Exercícios</p><h2 style="margin-top:0">'+total+' questões, da mais fácil à mais difícil</h2><p style="color:var(--ink-2)">Marque a alternativa, clique em Corrigir e leia o comentário. As questões reais das provas do Instituto Verbena trazem a fonte. Meta: acertar pelo menos '+D.cut+'% antes de seguir.</p>'+(best?'<div class="note acc">Seu melhor resultado neste navegador: <b>'+best.score+' de '+total+'</b> ('+best.pct+'%).</div>':'')+'<div class="row" style="margin-top:14px"><button class="btn primary" id="go-estudo" type="button">Começar</button></div></div>';K.$('#go-estudo').onclick=function(){start('estudo')};return}
    root.innerHTML='<div class="card"><p class="kicker">Simulado do módulo</p><h2 style="margin-top:0">'+total+' questões · '+D.minutes+' minutos · nota de corte '+D.cut+'%</h2>'+
      '<p style="color:var(--ink-2)">Escolha o modo. No <b>modo prova</b> o cronômetro corre, você responde sem consulta e só vê o resultado no fim, com a explicação de cada questão. No <b>modo estudo</b> não há tempo e cada resposta é corrigida na hora.</p>'+
      (best?'<div class="note acc">Seu melhor resultado neste navegador: <b>'+best.score+' de '+total+'</b> ('+best.pct+'%).</div>':'')+
      '<div class="row" style="margin-top:14px"><button class="btn primary" id="go-prova" type="button">Começar em modo prova</button><button class="btn" id="go-estudo" type="button">Modo estudo</button></div></div>';
    K.$('#go-prova').onclick=function(){start('prova')};K.$('#go-estudo').onclick=function(){start('estudo')};
  }
  function start(mode){
    st={mode:mode,i:0,ans:new Array(total),done:false,left:D.minutes*60,t:null,checked:new Array(total)};
    if(mode==='prova'){st.t=setInterval(function(){st.left--;var tm=K.$('#timer');if(tm){tm.textContent=fmt(st.left);tm.classList.toggle('low',st.left<=60)}if(st.left<=0)finish()},1000)}
    q();
  }
  function q(){
    var Q=D.questions[st.i], a=st.ans[st.i], fb=st.mode==='estudo'&&st.checked[st.i];
    var nav=D.questions.map(function(_,j){var c=j===st.i?'cur':'';if(st.ans[j]!=null)c+=(st.mode==='estudo'&&st.checked[j]?(st.ans[j]===D.questions[j].ok?' ok':' bad'):' ans');return '<button type="button" class="'+c+'" data-j="'+j+'" aria-label="Questão '+(j+1)+'">'+(j+1)+'</button>'}).join('');
    var opts=Q.opts.map(function(o){
      var cls='opt',dis='';
      if(fb){dis=' disabled';if(o.l===Q.ok)cls+=' right';else if(o.l===a)cls+=' wrong'}
      return '<button type="button" role="radio" class="'+cls+'" aria-checked="'+(a===o.l)+'"'+dis+' data-l="'+o.l+'"><span class="l">'+o.l+'</span><span>'+o.t+'</span></button>';
    }).join('');
    var answered=st.ans.filter(function(x){return x!=null}).length;
    root.innerHTML='<div class="row" style="margin-bottom:10px"><span class="pill acc">Questão '+(st.i+1)+' de '+total+'</span>'+(st.mode==='prova'?'<span class="timer" id="timer" aria-live="off">'+fmt(st.left)+'</span>':'<span class="pill">Modo estudo</span>')+'<span class="spacer"></span><span class="pill">'+answered+' respondidas</span></div>'+
      '<div class="progress"><i style="width:'+K.pct(answered,total)+'%"></i></div><div class="nav" role="navigation" aria-label="Questões">'+nav+'</div>'+
      '<div class="card"><div class="stmt" style="font-size:17px;margin-bottom:8px">'+Q.q+'</div><div role="radiogroup" aria-label="Alternativas">'+opts+'</div>'+
      (fb?'<div class="note '+(a===Q.ok?'ok':'bad')+'"><b>'+(a===Q.ok?'Correto.':'Não foi desta vez. A resposta certa é '+Q.ok+'.')+'</b> '+Q.exp+'</div>':'')+'</div>'+
      '<div class="row" style="margin-top:14px"><button class="btn" id="prev" type="button"'+(st.i===0?' disabled':'')+'>Anterior</button>'+
      (st.mode==='estudo'&&!fb?'<button class="btn accent" id="chk" type="button"'+(a==null?' disabled':'')+'>Corrigir</button>':'')+
      (st.i<total-1?'<button class="btn" id="next" type="button">Próxima</button>':'')+'<span class="spacer"></span><button class="btn primary" id="end" type="button">Finalizar</button></div>';
    K.copyButtons(root);
    K.$$('.nav button').forEach(function(b){b.onclick=function(){st.i=+b.getAttribute('data-j');q()}});
    K.$$('.opt').forEach(function(b){b.onclick=function(){if(fb)return;st.ans[st.i]=b.getAttribute('data-l');q();var f=K.$('.opt[aria-checked=true]');if(f)f.focus()}});
    var p=K.$('#prev');if(p)p.onclick=function(){st.i--;q()};
    var n=K.$('#next');if(n)n.onclick=function(){st.i++;q()};
    var c=K.$('#chk');if(c)c.onclick=function(){st.checked[st.i]=true;q()};
    K.$('#end').onclick=function(){var left=st.ans.filter(function(x){return x==null}).length;if(left&&!confirm('Faltam '+left+' questões sem resposta. Finalizar mesmo assim?'))return;finish()};
  }
  function finish(){
    clearInterval(st.t);st.done=true;
    var score=0;D.questions.forEach(function(Q,j){if(st.ans[j]===Q.ok)score++});
    var pct=Math.round(100*score/total), pass=score>=cut, used=D.minutes*60-st.left;
    var best=K.store.get(key,null);if(!best||score>best.score)K.store.set(key,{score:score,pct:pct});
    var verdict=score>=Math.ceil(total*11/12)?'Excelente, pode avançar.':pass?'Bom. Revise os pontos errados antes de avançar.':'Ainda não. Releia a teoria dos itens errados, refaça os exercícios e repita o simulado em outro dia.';
    var rev=D.questions.map(function(Q,j){
      var a=st.ans[j],ok=a===Q.ok;
      return '<details'+(ok?'':' open')+'><summary><span class="pill '+(ok?'ok':'bad')+'">'+(ok?'Certa':a==null?'Em branco':'Errada')+'</span> Questão '+(j+1)+'</summary><div class="in"><div class="stmt">'+Q.q+'</div>'+
        Q.opts.map(function(o){var c='opt'+(o.l===Q.ok?' right':o.l===a?' wrong':'');return '<div class="'+c+'" style="cursor:default"><span class="l">'+o.l+'</span><span>'+o.t+'</span></div>'}).join('')+
        '<div class="note '+(ok?'ok':'acc')+'"><b>Resposta: '+Q.ok+'.</b> '+Q.exp+(ok?'':' <br>Você marcou: '+(a||'nenhuma')+'.')+'</div></div></details>';
    }).join('');
    root.innerHTML='<div class="card" style="text-align:center"><p class="kicker">Resultado</p><div class="score">'+score+'<span style="font-size:28px;color:var(--muted)"> / '+total+'</span></div>'+
      '<p style="margin:10px 0 4px"><span class="pill '+(pass?'ok':'bad')+'">'+(pass?'Aprovado':'Abaixo da nota de corte')+' · '+pct+'%</span></p>'+
      '<p style="color:var(--ink-2);margin:10px auto 0;max-width:52ch">'+verdict+'</p>'+(st.mode==='prova'?'<p style="font-size:13px;color:var(--muted)">Tempo usado: '+fmt(used)+' de '+fmt(D.minutes*60)+'</p>':'')+
      '<div class="row" style="justify-content:center;margin-top:12px"><button class="btn primary" id="again" type="button">Refazer</button><button class="btn" id="home" type="button">Voltar ao início</button></div></div>'+
      '<h2>Revisão, questão a questão</h2>'+rev;
    K.copyButtons(root);
    K.$('#again').onclick=function(){start(st.mode)};K.$('#home').onclick=intro;
    window.scrollTo(0,0);
  }
  window.__quiz={state:function(){return st},data:D,pick:function(j,l){st.ans[j]=l},finish:finish,start:start};
  intro();
};

/* ===================== LABORATÓRIO (guia por etapas) ===================== */
K.lab=function(){
  var D=K.data(), key='tcegoti:'+D.id, S=K.store.get(key,{})||{};
  var nav=K.$('#labnav'), body=K.$('#labbody'), cur=0;
  function done(){return D.labs.filter(function(l,i){return S[i]}).length}
  function head(){K.$('#bar').style.width=K.pct(done(),D.labs.length)+'%';K.$('#stats').innerHTML='<span><b>'+done()+'</b> de '+D.labs.length+' laboratórios concluídos</span>'}
  function nv(){nav.innerHTML=D.labs.map(function(l,i){return '<button type="button" class="tab" data-i="'+i+'" aria-pressed="'+(i===cur)+'">'+(S[i]?'✓ ':'')+K.esc(l.short)+'</button>'}).join('');
    K.$$('.tab',nav).forEach(function(b){b.onclick=function(){go(+b.getAttribute('data-i'))}})}
  function go(i){
    cur=i;var l=D.labs[i];
    body.innerHTML='<article class="card"><h2 style="margin-top:0">'+K.esc(l.title)+'</h2>'+l.html+
      '<div class="row" style="margin-top:16px;padding-top:14px;border-top:1px solid var(--line)"><label style="display:flex;gap:9px;align-items:center;cursor:pointer;font-weight:600;font-size:14.5px"><input type="checkbox" id="fin"'+(S[i]?' checked':'')+'> Concluí este laboratório</label><span class="spacer"></span>'+
      (i>0?'<button class="btn sm" id="pv" type="button">Anterior</button>':'')+(i<D.labs.length-1?'<button class="btn sm primary" id="nx" type="button">Próximo</button>':'')+'</div></article>';
    K.copyButtons(body);
    K.$('#fin').onchange=function(e){if(e.target.checked)S[i]=1;else delete S[i];K.store.set(key,S);head();nv()};
    var p=K.$('#pv');if(p)p.onclick=function(){go(i-1)};var n=K.$('#nx');if(n)n.onclick=function(){go(i+1)};
    nv();head();if(history.replaceState)history.replaceState(null,'','#lab-'+(i+1));
  }
  var m=/lab-(\d+)/.exec(location.hash);go(m&&D.labs[+m[1]-1]?+m[1]-1:0);
};
})();
