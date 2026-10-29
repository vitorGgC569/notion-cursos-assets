/* Simulado no formato da prova do TCE-GO: 70 objetivas (25 gerais peso 1 e 45 específicas peso 2), estudo de caso e cronômetro de 4h30.
   Depende de app.js (K), simulado-core.js (SimCore) e discursiva-core.js (DiscCore). O progresso fica salvo só neste navegador. */
(function(){
'use strict';
var C=window.SimCore,DC=window.DiscCore,D=K.data(),root=K.$('#app'),KEY='tcegoti:'+D.id,S=K.store.get(KEY,null)||{};
var QS=D.qs,DISC=D.disc,CASO=D.caso,MAX=C.maxPoints(QS,DISC),CUT=C.cutPoints(MAX,D.cutPct),GOAL=C.cutPoints(MAX,D.goalPct),tm=null;
function save(){K.store.set(KEY,S)}
function discOf(id){return DISC.filter(function(d){return d.id===id})[0]}
function tag(q){return (q.new?'<span class="pill ok">Inédita</span> ':'')+(q.t==='R'?'<span class="pill acc">REAL FCC</span>':'<span class="pill">AUTORAL</span>')+(q.reuse?' <span class="pill">Reaproveitada do Módulo '+q.reuse+'</span>':'')}
function left(){return C.timeLeft(S.startAt,D.minutes,Date.now())}
function stop(){if(tm){clearInterval(tm);tm=null}}
function intro(){
  stop();var best=K.store.get(KEY+':best',null);
  var g=DISC.filter(function(d){return d.g==='G'}),e=DISC.filter(function(d){return d.g==='E'});
  function cnt(a){return a.reduce(function(s,d){return s+QS.filter(function(q){return q.d===d.id}).length},0)}
  var rows=DISC.map(function(d){var n=QS.filter(function(q){return q.d===d.id}).length;return '<tr><td>'+K.esc(d.nome)+'</td><td>'+(d.g==='G'?'Geral':'Específica')+'</td><td>'+n+'</td><td>'+d.w+'</td><td>'+(n*d.w)+'</td></tr>'}).join('');
  root.innerHTML='<div class="card"><p class="kicker">Simulado '+D.n+' · formato da prova</p><h2 style="margin-top:0">'+QS.length+' questões objetivas e 1 estudo de caso · '+Math.floor(D.minutes/60)+'h'+(D.minutes%60?String(D.minutes%60).padStart(2,'0'):'30')+'</h2>'+
   '<p style="color:var(--ink-2)">'+cnt(g)+' questões de conhecimentos gerais (peso 1) e '+cnt(e)+' de conhecimentos específicos (peso 2), com 5 alternativas (A a E). Nota ponderada máxima: <b>'+MAX+' pontos</b>. O estudo de caso vale de 0 a 100 e exige no mínimo 50 pontos (edital, item 11.9). O tempo de 4h30 vale para tudo, objetiva e estudo de caso, como no dia da prova.</p>'+
   '<table><thead><tr><th>Disciplina</th><th>Grupo</th><th>Questões</th><th>Peso</th><th>Pontos</th></tr></thead><tbody>'+rows+'<tr><td><b>Total</b></td><td></td><td><b>'+QS.length+'</b></td><td></td><td><b>'+MAX+'</b></td></tr></tbody></table>'+
   '<div class="note" style="margin-top:12px"><b>Corte deste simulado:</b> '+CUT+' de '+MAX+' pontos ('+D.cutPct+'%) para passar; meta de '+GOAL+' pontos ('+D.goalPct+'%). É um corte do curso, para treino. O corte real da banca usa escore padronizado (NP = (A − média) / desvio-padrão × 10 + 50) e soma de 150 pontos ponderados, que dependem do desempenho dos outros candidatos e não dá para reproduzir em casa.</div>'+
   '<div class="note" style="margin-top:10px">Sem calculadora, relógio, lápis ou consulta (edital, item 8.15). Na prova real só se sai da sala após 3h (item 8.20 f). Este cronômetro é de treino e fica salvo se você recarregar a página.</div>'+
   (best?'<div class="note acc" style="margin-top:10px">Melhor nota neste navegador: <b>'+best.pts+' de '+MAX+'</b>, estudo de caso '+best.caso+' de 100.</div>':'')+
   '<div class="row" style="margin-top:14px"><button class="btn primary" id="go" type="button">Iniciar a prova</button></div></div>';
  K.$('#go').onclick=function(){S={startAt:Date.now(),ans:{},flag:{},caso:{t:'',chk:[],desc:0,zero:false}};save();exam()};
}
function clock(){
  var l=left(),c=K.$('#clock');if(c){c.textContent=C.fmtHMS(l);c.classList.toggle('low',l<=900)}
  if(l<=0&&!S.done){stop();alert('O tempo acabou. A prova será entregue com as respostas marcadas.');deliver(true)}
}
function answered(){return QS.filter(function(q){return S.ans[q.n]}).length}
function bar(){
  var a=answered();var el=K.$('#cnt');if(el)el.textContent=a+' de '+QS.length+' respondidas';
  var b=K.$('#bar');if(b)b.style.width=K.pct(a,QS.length)+'%';
  K.$$('.nav button').forEach(function(x){var n=+x.getAttribute('data-n');x.className=(S.ans[n]?'ans':'')+(S.flag[n]?' flag':'')});
}
function exam(){
  stop();
  var sec='',last='';
  QS.forEach(function(q){
    var d=discOf(q.d);
    if(q.d!==last){last=q.d;sec+='<h2 id="d-'+q.d+'" style="margin:26px 0 4px">'+K.esc(d.nome)+'</h2><p class="src">'+(d.g==='G'?'Conhecimentos gerais':'Conhecimentos específicos')+' · peso '+d.w+' por questão</p>'}
    sec+='<article class="card" id="q'+q.n+'" style="margin:12px 0"><div class="row"><span class="pill acc">Questão '+q.n+'</span><span class="pill">peso '+d.w+'</span>'+tag(q)+'<span class="spacer"></span><button class="btn ghost sm flagb" data-n="'+q.n+'" type="button">Marcar para revisar</button></div>'+
      '<div class="stmt" style="margin:10px 0">'+q.q+'</div><div role="radiogroup" aria-label="Alternativas da questão '+q.n+'">'+q.opts.map(function(o){return '<button type="button" role="radio" class="opt" aria-checked="false" data-n="'+q.n+'" data-l="'+o.l+'"><span class="l">'+o.l+'</span><span>'+o.t+'</span></button>'}).join('')+'</div></article>';
  });
  var nav=QS.map(function(q){return '<button type="button" data-n="'+q.n+'" aria-label="Questão '+q.n+'">'+q.n+'</button>'}).join('');
  root.innerHTML='<div class="card" style="position:sticky;top:6px;z-index:5"><div class="row"><span class="timer" id="clock" aria-live="off"></span><span id="cnt" style="font-size:13.5px;color:var(--muted)"></span><span class="spacer"></span><button class="btn accent sm" id="end" type="button">Entregar a prova</button></div><div class="progress" style="margin-top:8px"><i id="bar"></i></div></div>'+
   '<div class="nav" role="navigation" aria-label="Questões">'+nav+'<button type="button" data-n="caso" aria-label="Estudo de caso" style="width:auto;padding:0 10px">Caso</button></div>'+sec+caseHtml();
  K.$$('.opt',root).forEach(function(b){var n=+b.getAttribute('data-n'),l=b.getAttribute('data-l');b.setAttribute('aria-checked',String(S.ans[n]===l));
    b.onclick=function(){if(S.done)return;if(S.ans[n]===l)delete S.ans[n];else S.ans[n]=l;save();
      K.$$('.opt[data-n="'+n+'"]').forEach(function(x){x.setAttribute('aria-checked',String(S.ans[n]===x.getAttribute('data-l')))});bar()}});
  K.$$('.flagb',root).forEach(function(b){var n=+b.getAttribute('data-n');b.textContent=S.flag[n]?'Desmarcar revisão':'Marcar para revisar';
    b.onclick=function(){if(S.flag[n])delete S.flag[n];else S.flag[n]=1;save();b.textContent=S.flag[n]?'Desmarcar revisão':'Marcar para revisar';bar()}});
  K.$$('.nav button',root).forEach(function(b){b.onclick=function(){var n=b.getAttribute('data-n');var t=n==='caso'?K.$('#caso'):K.$('#q'+n);if(t)t.scrollIntoView({behavior:'smooth',block:'start'})}});
  var ta=K.$('#resp');ta.value=S.caso.t||'';ta.oninput=function(){S.caso.t=ta.value;save();count()};
  K.$('#cpl').onchange=function(){S.cpl=Math.min(140,Math.max(30,+this.value||90));this.value=S.cpl;save();count()};K.$('#cpl').value=S.cpl||90;
  K.$('#end').onclick=function(){
    var b=QS.length-answered(),msg=(b?'Faltam '+b+' questões objetivas sem resposta. ':'')+((S.caso.t||'').trim()?'':'O estudo de caso está em branco (nota zero). ');
    var el=(Date.now()-S.startAt)/1000;if(el<10800)msg+='Na prova real só é possível entregar depois de 3h; aqui você pode entregar antes. ';
    if(confirm((msg?msg+'\n':'')+'Entregar a prova agora?'))deliver(false)};
  clock();count();bar();tm=setInterval(clock,1000);
}
function caseHtml(){
  var c=CASO;
  return '<h2 id="caso" style="margin:30px 0 4px">Estudo de caso (discursiva)</h2><p class="src">Vale de 0 a 100 e é eliminatória abaixo de 50. Responda citando a letra de cada item.</p>'+
   '<article class="card" style="margin:12px 0"><div class="row"><span class="pill">AUTORAL, não é de prova real</span><span class="pill">Limite: '+c.linhas+' linhas</span><span class="pill">'+K.esc(c.disc)+'</span></div>'+
   '<h3 style="margin:12px 0 6px">'+K.esc(c.titulo)+'</h3><div class="stmt">'+c.enun.map(function(p){return '<p>'+K.esc(p)+'</p>'}).join('')+'</div>'+
   '<ol class="cmds">'+c.cmd.map(function(x){return '<li><b>'+K.esc(x[0])+'.</b> '+K.esc(x[1])+'</li>'}).join('')+'</ol>'+
   '<label class="f" for="resp">Resposta definitiva (conta linhas)</label><textarea class="ans big" id="resp" spellcheck="false" placeholder="Escreva como na folha definitiva."></textarea>'+
   '<div class="row" style="margin-top:8px"><label class="f" for="cpl" style="margin:0">Caracteres por linha</label><input id="cpl" class="num" type="number" min="30" max="140" value="90"></div>'+
   '<div class="stats" id="ccnt"></div><div class="progress" style="margin-top:6px"><i id="lbar"></i></div><div id="lmsg" class="note hidden"></div></article>';
}
function count(){
  var ta=K.$('#resp');if(!ta)return;var cpl=+K.$('#cpl').value||90,t=ta.value,n=DC.countLines(t,cpl),lim=CASO.linhas;
  K.$('#ccnt').innerHTML='<span><b>'+n+'</b> de '+lim+' linhas (estimado)</span><span><b>'+DC.countWords(t)+'</b> palavras</span>';
  K.$('#lbar').style.width=Math.min(100,K.pct(n,lim))+'%';
  var m=K.$('#lmsg');m.classList.toggle('hidden',n<=lim);if(n>lim)m.textContent='Passou do limite estimado em '+(n-lim)+' linha(s). O edital (item 11.16) prevê perda de pontos por exceder o limite.';
}
function deliver(auto){
  stop();S.done=true;S.doneAt=Date.now();S.used=Math.min(D.minutes*60,Math.round((S.doneAt-S.startAt)/1000));save();result();
}
function stLabel(s){return s==='meta'?'<span class="pill ok">Acima da meta</span>':s==='corte'?'<span class="pill ok">Acima do corte</span>':'<span class="pill bad">Abaixo do corte</span>'}
function result(){
  stop();var r=C.score(QS,DISC,S.ans),st=C.status(r.pts,MAX,D.cutPct,D.goalPct),pct=Math.round(100*r.pts/MAX);
  var rows=r.by.map(function(b){return '<tr><td>'+K.esc(b.nome)+'</td><td>'+b.w+'</td><td>'+b.ok+' de '+b.n+'</td><td>'+b.pts+' de '+b.max+'</td><td>'+K.pct(b.ok,b.n)+'%</td></tr>'}).join('');
  var weak=r.by.filter(function(b){return b.n&&b.ok/b.n<0.6}).map(function(b){return b.nome});
  var best=K.store.get(KEY+':best',null);
  root.innerHTML='<div class="card" style="text-align:center"><p class="kicker">Resultado da parte objetiva</p><div class="score">'+r.pts+'<span style="font-size:28px;color:var(--muted)"> / '+MAX+'</span></div>'+
   '<p style="margin:10px 0 4px">'+stLabel(st)+' <span class="pill">'+pct+'% dos pontos</span> <span class="pill">'+r.ok+' acertos, '+(r.n-r.ok-r.blank)+' erros, '+r.blank+' em branco</span></p>'+
   '<p style="color:var(--ink-2);margin:10px auto 0;max-width:60ch">Gerais: '+r.g.pts+' de '+r.g.max+' ('+r.g.ok+' de '+r.g.n+' acertos, peso 1). Específicas: '+r.e.pts+' de '+r.e.max+' ('+r.e.ok+' de '+r.e.n+' acertos, peso 2). Corte do curso: '+CUT+'. Meta: '+GOAL+'.</p>'+
   '<p style="font-size:13px;color:var(--muted)">Tempo usado: '+C.fmtHMS(S.used||0)+' de '+C.fmtHMS(D.minutes*60)+'</p></div>'+
   '<div class="card" style="margin-top:12px"><h3 style="margin-top:0">Desempenho por disciplina</h3><table><thead><tr><th>Disciplina</th><th>Peso</th><th>Acertos</th><th>Pontos</th><th>%</th></tr></thead><tbody>'+rows+'</tbody></table>'+
   (weak.length?'<div class="note" style="margin-top:10px">Abaixo de 60% em: <b>'+weak.map(K.esc).join('; ')+'</b>. Volte aos cartões e exercícios desses módulos antes do próximo simulado.</div>':'<div class="note acc" style="margin-top:10px">Nenhuma disciplina abaixo de 60%.</div>')+'</div>'+
   '<div id="casoCorr"></div><div id="final"></div>'+
   '<h2 style="margin-top:28px">Gabarito comentado</h2><div class="row" id="filt"><button class="btn sm primary" data-f="all" type="button">Todas</button><button class="btn sm" data-f="bad" type="button">Só erradas e em branco</button><button class="btn sm" data-f="R" type="button">Só reais da FCC</button><button class="btn sm" data-f="A" type="button">Só autorais</button><button class="btn sm" data-f="flag" type="button">Marcadas para revisar</button></div><div id="gab"></div>'+
   '<div class="row" style="margin-top:18px"><button class="btn primary" id="again" type="button">Refazer o simulado</button></div>';
  caseCorr();gab('all');
  K.$$('#filt button').forEach(function(b){b.onclick=function(){K.$$('#filt button').forEach(function(x){x.classList.remove('primary')});b.classList.add('primary');gab(b.getAttribute('data-f'))}});
  K.$('#again').onclick=function(){if(confirm('Apagar as respostas desta tentativa e começar de novo? A melhor nota fica salva.')){S={};save();intro();window.scrollTo(0,0)}};
  if(!best||r.pts>best.pts)K.store.set(KEY+':best',{pts:r.pts,caso:best?best.caso:0});
  window.scrollTo(0,0);
}
function gab(f){
  var h=QS.filter(function(q){
    var a=S.ans[q.n],ok=a===q.ok;
    return f==='all'||(f==='bad'&&!ok)||(f==='R'&&q.t==='R')||(f==='A'&&q.t==='A')||(f==='flag'&&S.flag[q.n]);
  }).map(function(q){
    var a=S.ans[q.n],ok=a===q.ok,d=discOf(q.d);
    return '<details'+(ok?'':' open')+'><summary><span class="pill '+(ok?'ok':'bad')+'">'+(ok?'Certa':a?'Errada':'Em branco')+'</span> Questão '+q.n+' · '+K.esc(d.nome)+'</summary><div class="in">'+
      '<div class="row">'+tag(q)+'<span class="pill">peso '+d.w+'</span></div><p class="src">'+q.src+'</p><div class="stmt">'+q.q+'</div>'+
      q.opts.map(function(o){var c='opt'+(o.l===q.ok?' right':o.l===a?' wrong':'');return '<div class="'+c+'" style="cursor:default"><span class="l">'+o.l+'</span><span>'+o.t+'</span></div>'}).join('')+
      '<div class="note '+(ok?'ok':'acc')+'"><b>Gabarito: '+q.ok+'.</b> '+q.exp+(ok?'':'<br>Você marcou: '+(a||'nenhuma')+'.')+'</div></div></details>';
  }).join('');
  K.$('#gab').innerHTML=h||'<p class="src">Nenhuma questão neste filtro.</p>';
}
function caseCorr(){
  var c=CASO,t=S.caso.t||'',n=DC.countLines(t,S.cpl||90),over=n>c.linhas;
  var rows=c.esp.map(function(it,i){var hh=DC.hits(t,it.t),on=(S.caso.chk||[])[i];
    return '<div class="crit"><label><input type="checkbox" data-i="'+i+'"'+(on?' checked':'')+'> <b>'+it.p+' pts</b> · '+K.esc(it.d)+'</label><div class="terms"><span class="term '+(hh.length?'hit':'miss')+'">'+(hh.length?'termos achados: '+K.esc(hh.join(', ')):'nenhum termo-chave achado')+'</span></div></div>'}).join('');
  K.$('#casoCorr').innerHTML='<div class="card" style="margin-top:12px"><p class="kicker">Estudo de caso · autocorreção</p><h3 style="margin-top:0">Marque o que a sua resposta cobriu</h3>'+
   '<p class="src">O espelho é AUTORAL, montado pelo curso a partir dos comandos; não é o espelho da banca, que só aparece na vista da prova (item 11.20 do edital). A pista de termos é automática e só indica palavras; quem decide se o item foi cumprido é você.</p>'+rows+
   '<div class="row" style="margin-top:10px"><label><input type="checkbox" id="zero"'+(S.caso.zero?' checked':'')+'> Caí em caso de nota zero do item 11.12 (em branco, fora do tema, identificação, ilegível)</label></div>'+
   '<div class="row"><label class="f" for="desc" style="margin:0">Desconto por abordagem parcial, divagação ou excesso de linhas (itens 11.10, 11.15 e 11.16)</label><input id="desc" class="num" type="number" min="0" max="100" value="'+(S.caso.desc||0)+'"></div>'+
   (over?'<div class="note">Sua resposta passou de '+c.linhas+' linhas (estimado em '+n+'). Sugestão de desconto: 10 pontos.</div>':'')+
   '<div class="note acc" id="tot"></div>'+
   '<h4>Resposta-modelo comentada (AUTORAL)</h4><div class="stmt">'+c.modelo.map(function(p){return '<p>'+K.esc(p)+'</p>'}).join('')+'</div>'+
   '<h4>Comentários</h4><ul>'+c.com.map(function(p){return '<li>'+K.esc(p)+'</li>'}).join('')+'</ul></div>';
  function total(){
    S.caso.chk=K.$$('#casoCorr input[data-i]').map(function(x){return x.checked});S.caso.zero=K.$('#zero').checked;S.caso.desc=Math.max(0,+K.$('#desc').value||0);save();
    var s=C.caseScore(c.esp.map(function(i){return {p:i.p}}),S.caso.chk,S.caso.desc,S.caso.zero);
    K.$('#tot').innerHTML='Sua autoavaliação no estudo de caso: <b>'+s+' de 100</b>. '+(s>=50?'Acima do mínimo de 50 pontos (edital, item 11.9).':'Abaixo do mínimo de 50 pontos: na prova real isso eliminaria o candidato (edital, item 11.9).');
    var r=C.score(QS,DISC,S.ans),st=C.status(r.pts,MAX,D.cutPct,D.goalPct),v=C.finalVerdict(st,s,50);
    K.$('#final').innerHTML='<div class="card" style="margin-top:12px"><p class="kicker">Resultado do simulado</p><p style="margin:0">Objetiva: <b>'+r.pts+' de '+MAX+'</b> ('+(v.obj?'acima do corte':'abaixo do corte')+'). Estudo de caso: <b>'+s+' de 100</b> ('+(v.caso?'acima de 50':'abaixo de 50')+'). '+
      (v.all?'<b>Aprovado neste simulado.</b>':'<b>Ainda não passou neste simulado.</b>')+' Na prova real, a nota final soma as notas ponderadas da objetiva e a do estudo de caso (edital, seção do Estudo de Caso); esta conta é só de treino.</p></div>';
    var b=K.store.get(KEY+':best',null)||{pts:r.pts,caso:0};b.caso=Math.max(b.caso||0,s);K.store.set(KEY+':best',b);
  }
  K.$$('#casoCorr input').forEach(function(x){x.onchange=total;x.oninput=total});total();
}
window.__sim={S:function(){return S},data:D,deliver:deliver,pick:function(n,l){S.ans[n]=l},exam:exam,intro:intro,start:function(){S={startAt:Date.now(),ans:{},flag:{},caso:{t:'',chk:[],desc:0,zero:false}};save();exam()}};
if(S&&S.done)result();else if(S&&S.startAt&&left()>0)exam();else{if(S&&S.startAt&&left()<=0&&!S.done){S.done=true;S.used=D.minutes*60;S.doneAt=Date.now();save();result()}else intro()}
})();
