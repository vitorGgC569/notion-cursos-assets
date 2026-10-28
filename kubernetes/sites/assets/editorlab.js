/* Laboratório de edição com validação: YAML/JSON (M6), Dockerfile (M9) e Compose (M11). */
(function(){
'use strict';
var K=window.K;

/* ---------- análise ---------- */
K.yaml=function(text){
  try{return {doc:window.jsyaml.load(text),err:null}}catch(e){return {doc:null,err:e}}
};
K.yamlErr=function(e){
  if(!e)return '';var m=e.mark?' (linha '+(e.mark.line+1)+', coluna '+(e.mark.column+1)+')':'';
  var map={'duplicated mapping key':'chave duplicada no mesmo nível','bad indentation of a mapping entry':'indentação incorreta de uma entrada de mapa','end of the stream or a document separator is expected':'indentação ou estrutura inesperada','can not read a block mapping entry; a multiline key may not be an implicit key':'falta o ":" depois da chave, ou a linha está desalinhada','incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line':'par chave/valor incompleto'};
  var r=e.reason||e.message;return (map[r]||r)+m;
};
/* pegadinhas do YAML 1.1 (kubectl e Compose usam parsers que ainda seguem 1.1 em alguns casos) */
K.yamlPitfalls=function(text){
  var out=[];
  text.split('\n').forEach(function(l,i){
    var m=/^\s*(?:-\s+)?(?:[\w.\-\/"']+:\s+)?([^#\s"'\[{|>][^#]*?)\s*(?:#.*)?$/.exec(l);
    if(!m)return;
    var v=m[1].trim();
    if(/^(yes|no|on|off|y|n)$/i.test(v))out.push({line:i+1,msg:'"'+v+'" sem aspas vira booleano em YAML 1.1. Escreva "'+v+'" entre aspas se for texto.'});
    else if(/^0\d+$/.test(v))out.push({line:i+1,msg:'"'+v+'" começa com zero e pode ser lido como octal. Use aspas se for texto.'});
    else if(/^\d+\.\d*0$/.test(v)&&!/:\s/.test(v)&&/:\s+\S/.test(l))out.push({line:i+1,msg:'"'+v+'" vira número e perde o zero final (1.10 vira 1.1). Use aspas.'});
  });
  return out;
};
K.dockerfile=function(text){
  var raw=text.replace(/\\\s*\n/g,' ').split('\n'),ins=[];
  raw.forEach(function(l,i){var t=l.trim();if(!t||t[0]==='#')return;var m=/^([A-Za-z]+)\s*(.*)$/.exec(t);if(m)ins.push({k:m[1].toUpperCase(),a:m[2],line:i+1})});
  return ins;
};

/* ---------- motor ---------- */
K.editorLab=function(cfg){
  var D=K.data(),key='k8s:'+D.id,S=K.store.get(key,{})||{};
  var nav=K.$('#labnav'),body=K.$('#labbody'),cur=0,T=cfg.challenges;
  function nd(){return Object.keys(S.done||{}).length}
  function head(){K.$('#bar').style.width=K.pct(nd(),T.length)+'%';K.$('#stats').innerHTML='<span><b>'+nd()+'</b> de '+T.length+' desafios resolvidos</span>'}
  function tabs(){nav.innerHTML=T.map(function(c,i){return '<button type="button" class="tab" data-i="'+i+'" aria-pressed="'+(i===cur)+'">'+((S.done||{})[c.id]?'✓ ':'')+K.esc(c.tab)+'</button>'}).join('')+'<button type="button" class="tab" data-i="free" aria-pressed="'+(cur==='free')+'">Editor livre</button>';
    K.$$('.tab',nav).forEach(function(b){b.onclick=function(){var v=b.getAttribute('data-i');go(v==='free'?'free':+v)}})}
  function show(findings,box){
    box.innerHTML=findings.length?'<ul class="lintlist">'+findings.map(function(f){return '<li><span style="flex:none;width:18px;color:'+(f.ok===true?'var(--accent)':f.ok===false?'var(--ink)':'var(--muted)')+'">'+(f.ok===true?'✓':f.ok===false?'×':'·')+'</span><span>'+f.msg+'</span></li>'}).join('')+'</ul>':'';
  }
  function go(i){
    cur=i;var c=i==='free'?{id:'free',tab:'Editor livre',title:'Editor livre',text:cfg.freeText,start:cfg.freeStart,checks:[]}:T[i];
    var stored=(S.src||{})[c.id];
    body.innerHTML='<article class="card"><h2 style="margin-top:0">'+K.esc(c.title)+'</h2><div>'+c.text+'</div>'+
      '<label class="f" for="ed">Editor</label><textarea class="code" id="ed" spellcheck="false" autocapitalize="off" autocomplete="off" rows="'+Math.min(22,Math.max(10,c.start.split('\n').length+3))+'"></textarea>'+
      '<div class="row" style="margin-top:10px"><button class="btn primary" id="chk" type="button">Verificar</button><button class="btn" id="rst" type="button">Restaurar original</button>'+(cfg.convert?'<button class="btn" id="conv" type="button">Converter</button>':'')+'<span class="spacer"></span>'+(c.solution?'<button class="btn ghost sm" id="sol" type="button">Ver uma solução</button>':'')+'</div>'+
      '<div id="res" style="margin-top:12px" aria-live="polite"></div><div id="aux"></div></article>';
    var ed=K.$('#ed');ed.value=stored!=null?stored:c.start;
    ed.addEventListener('keydown',function(e){if(e.key==='Tab'&&!e.shiftKey){e.preventDefault();var s=ed.selectionStart;ed.value=ed.value.slice(0,s)+'  '+ed.value.slice(ed.selectionEnd);ed.selectionStart=ed.selectionEnd=s+2}});
    ed.addEventListener('input',function(){S.src=S.src||{};S.src[c.id]=ed.value;K.store.set(key,S)});
    K.$('#chk').onclick=function(){
      var ctx=cfg.analyze(ed.value),f=[];
      if(ctx.err)f.push({ok:false,msg:'<b>Erro de sintaxe:</b> '+K.esc(ctx.errMsg)});
      else if(cfg.analyze.parseLabel)f.push({ok:true,msg:cfg.analyze.parseLabel});
      var okAll=!ctx.err;
      c.checks.forEach(function(ch){var r=false;try{r=!!ch.fn(ctx)}catch(e){}f.push({ok:r,msg:ch.label});if(!r)okAll=false});
      (ctx.warn||[]).forEach(function(w){f.push({ok:null,msg:'<i>Aviso:</i> '+w})});
      show(f,K.$('#res'));
      if(c.checks.length){
        K.$('#res').insertAdjacentHTML('beforeend','<div class="note '+(okAll?'ok':'')+'"><b>'+(okAll?'Desafio resolvido.':'Ainda não. Leia os itens marcados com × e tente de novo.')+'</b></div>');
        if(okAll){S.done=S.done||{};S.done[c.id]=1;K.store.set(key,S);head();tabs()}
      }
    };
    K.$('#rst').onclick=function(){ed.value=c.start;S.src=S.src||{};delete S.src[c.id];K.store.set(key,S);K.$('#res').innerHTML='';K.$('#aux').innerHTML=''};
    var so=K.$('#sol');if(so)so.onclick=function(){K.$('#aux').innerHTML='<details open><summary>Uma solução possível</summary><div class="in"><pre><code>'+K.esc(c.solution)+'</code></pre></div></details>';K.copyButtons(K.$('#aux'))};
    var cv=K.$('#conv');if(cv)cv.onclick=function(){K.$('#aux').innerHTML=cfg.convert(ed.value)};
    tabs();head();
  }
  go(0);
  window.__lab={go:go,tabs:T,analyze:cfg.analyze};
};
})();
