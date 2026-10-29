/* Treino de Estudo de Caso (prova discursiva) com cronometro e contagem estimada de linhas.
   Depende de app.js (K) e discursiva-core.js (DiscCore). Tudo roda no navegador; o texto fica salvo so neste navegador. */
(function(){
'use strict';
var C=window.DiscCore, D=K.data(), root=K.$('#app'), sim=D.mode==='simulado';
var KEY='tcegoti:'+D.id, S=K.store.get(KEY,{})||{};
var cur=null, timer=null, left=0, endAt=0, running=false, corrected=false;
function save(){K.store.set(KEY,S)}
function cs(id){S[id]=S[id]||{};return S[id]}
function caseById(id){return D.cases.filter(function(c){return c.id===id})[0]}
function fmt(n){return String(n).replace('.',',')}
function pick(){
  if(sim){open(D.cases[0].id);return}
  var last=S._last&&caseById(S._last)?S._last:D.cases[0].id;
  var opts=D.cases.map(function(c){return '<option value="'+c.id+'"'+(c.id===last?' selected':'')+'>'+(c.tipo==='REAL'?'[Real FCC] ':'[Autoral] ')+K.esc(c.titulo)+'</option>'}).join('');
  root.innerHTML='<div class="card"><label class="f" for="sel">Escolha o caso</label><select id="sel" class="sel">'+opts+'</select></div><div id="case"></div>';
  K.$('#sel').onchange=function(){S._last=this.value;save();stop();open(this.value)};
  open(last);
}
function stop(){running=false;if(timer){clearInterval(timer);timer=null}}
function open(id){
  stop();cur=caseById(id);corrected=false;var st=cs(id);
  var mins=st.min||cur.min;left=st.left!=null?st.left:mins*60;
  var host=sim?root:K.$('#case');
  var tipo=cur.tipo==='REAL'?'<span class="pill acc">Questão REAL da FCC (outro órgão)</span>':'<span class="pill">AUTORAL, não é de prova real</span>';
  var enun=cur.enun.map(function(p){return '<p>'+K.esc(p)+'</p>'}).join('');
  var cmd='<ol class="cmds">'+cur.cmd.map(function(x){return '<li><b>'+K.esc(x[0])+'.</b> '+K.esc(x[1])+'</li>'}).join('')+'</ol>';
  var extra=(cur.extra||[]).map(function(p){return '<p class="src">'+K.esc(p)+'</p>'}).join('');
  host.innerHTML=
   '<div class="card"><div class="row">'+tipo+'<span class="pill">Limite: '+cur.linhas+' linhas</span><span class="pill">'+K.esc(cur.disc)+'</span></div>'+
   '<h2 style="margin:12px 0 6px">'+K.esc(cur.titulo)+'</h2><p class="src">'+K.esc(cur.fonte)+'</p><div class="stmt">'+enun+extra+'</div>'+cmd+
   '<p class="src">Responda citando a letra de cada item. Neste site o rascunho e a resposta ficam salvos só no seu navegador.</p></div>'+
   '<div class="card" style="margin-top:12px"><div class="row"><span class="timer" id="clock" aria-live="off"></span><button class="btn primary sm" id="go" type="button">'+(sim?'Começar o simulado':'Iniciar')+'</button><button class="btn sm" id="pause" type="button">Pausar</button><button class="btn ghost sm" id="reset" type="button">Zerar</button><span class="spacer"></span>'+
   '<label class="f" for="mins" style="margin:0">Minutos</label><input id="mins" class="num" type="number" min="5" max="120" value="'+mins+'"><label class="f" for="cpl" style="margin:0">Caracteres por linha</label><input id="cpl" class="num" type="number" min="30" max="140" value="'+(S.cpl||90)+'"></div>'+
   '<div id="tmsg" class="note hidden"></div>'+
   '<label class="f" for="resp" style="margin-top:12px">Resposta definitiva (conta linhas)</label><textarea class="ans big" id="resp" spellcheck="false" placeholder="Escreva a resposta como na folha definitiva: um parágrafo por item, começando pela letra."></textarea>'+
   '<div class="stats" id="cnt"></div><div class="progress" style="margin-top:6px"><i id="lbar"></i></div><div id="lmsg" class="note hidden"></div>'+
   '<details><summary>Rascunho (não conta linhas nem entra na correção, como no item 11.17 do edital)</summary><textarea class="ans" id="rasc" spellcheck="false"></textarea></details>'+
   '<div class="row" style="margin-top:12px"><button class="btn accent" id="fim" type="button">Encerrar e corrigir</button><button class="btn ghost sm" id="limpar" type="button">Apagar este caso</button></div>'+
   '<p class="src">A contagem de linhas é uma estimativa: a folha da FCC depende da sua letra. Ajuste os caracteres por linha escrevendo um texto à mão na folha de resposta. O cronômetro é só de treino: na sala da prova não se pode usar relógio.</p></div>'+
   '<div id="corr"></div>';
  var ta=K.$('#resp'),rc=K.$('#rasc');ta.value=st.t||'';rc.value=st.r||'';
  ta.oninput=function(){cs(cur.id).t=ta.value;save();count()};rc.oninput=function(){cs(cur.id).r=rc.value;save()};
  K.$('#cpl').onchange=function(){S.cpl=Math.min(140,Math.max(30,+this.value||90));this.value=S.cpl;save();count()};
  K.$('#mins').onchange=function(){var m=Math.min(120,Math.max(5,+this.value||cur.min));this.value=m;cs(cur.id).min=m;if(!running){left=m*60;delete cs(cur.id).left;save();clock()}};
  K.$('#go').onclick=start;K.$('#pause').onclick=pause;
  K.$('#reset').onclick=function(){stop();var m=+K.$('#mins').value||cur.min;left=m*60;delete cs(cur.id).left;save();clock();K.$('#tmsg').classList.add('hidden')};
  K.$('#fim').onclick=correct;
  K.$('#limpar').onclick=function(){if(confirm('Apagar a resposta e o rascunho deste caso?')){delete S[cur.id];save();open(cur.id)}};
  clock();count();
}
function clock(){var c=K.$('#clock');if(!c)return;c.textContent=C.fmtTime(left);c.classList.toggle('low',left<=300&&left>0)}
function start(){
  if(running)return;if(left<=0)return;running=true;endAt=Date.now()+left*1000;K.$('#tmsg').classList.add('hidden');
  timer=setInterval(function(){left=Math.max(0,Math.round((endAt-Date.now())/1000));clock();
    if(left<=0){stop();var m=K.$('#tmsg');m.textContent='O tempo acabou. Na prova, entregue o que estiver na folha definitiva. Aqui, clique em Encerrar e corrigir.';m.classList.remove('hidden')}},250);
}
function pause(){if(!running)return;stop();cs(cur.id).left=left;save()}
function count(){
  var ta=K.$('#resp');if(!ta)return;var cpl=+K.$('#cpl').value||90,t=ta.value,n=C.countLines(t,cpl),w=C.countWords(t),lim=cur.linhas,over=n>lim;
  K.$('#cnt').innerHTML='<span><b>'+n+'</b> de '+lim+' linhas (estimado)</span><span><b>'+t.length+'</b> caracteres</span><span><b>'+w+'</b> palavras</span><span>Cabem cerca de <b>'+(lim*cpl)+'</b> caracteres</span>';
  var b=K.$('#lbar');b.style.width=Math.min(100,K.pct(n,lim))+'%';
  var m=K.$('#lmsg');m.classList.toggle('hidden',!over);if(over)m.innerHTML='Passou do limite estimado em '+(n-lim)+' linha(s). O edital (item 11.16) prevê perda de pontos por exceder o limite de linhas.';
}
function correct(){
  var t=K.$('#resp').value;if(!t.trim()&&!confirm('A resposta está em branco (nota zero pelo item 11.12 d do edital). Corrigir mesmo assim?'))return;
  stop();corrected=true;var st=cs(cur.id);st.left=left;st.done=1;save();
  var n=C.countLines(t,+K.$('#cpl').value||90),over=n>cur.linhas;
  var rows=cur.esp.map(function(it,i){
    var h=C.hits(t,it.t),on=(st.chk||[])[i];
    return '<div class="crit"><label><input type="checkbox" data-i="'+i+'"'+(on?' checked':'')+'> <b>'+it.p+' pts</b> · '+K.esc(it.d)+'</label>'+
      '<div class="terms"><span class="term '+(h.length?'hit':'miss')+'">'+(h.length?'termos achados: '+K.esc(h.join(', ')):'nenhum termo-chave achado')+'</span></div></div>';
  }).join('');
  var model=cur.modelo.map(function(p){return '<p>'+K.esc(p)+'</p>'}).join('');
  var com=cur.com.map(function(p){return '<li>'+K.esc(p)+'</li>'}).join('');
  var refs=cur.refs.length?'<h4>Trechos de fonte usados</h4><ul>'+cur.refs.map(function(r){return '<li><b>'+K.esc(r[0])+':</b> “'+K.esc(r[1])+'”</li>'}).join('')+'</ul>':'';
  K.$('#corr').innerHTML='<div class="card" style="margin-top:12px"><p class="kicker">Correção</p><h2 style="margin:0 0 8px">Marque o que a sua resposta cobriu</h2>'+
   '<p class="src">O espelho abaixo é AUTORAL (montado pelo curso a partir dos comandos), não é o espelho da banca. A banca divulga o espelho oficial na vista da prova (item 11.20 do edital). A pista de termos é automática e só procura palavras: o que vale é a sua leitura.</p>'+rows+
   '<div class="row" style="margin-top:10px"><label><input type="checkbox" id="zero"> Caí em um caso de nota zero do item 11.12 (fugir ao tema, em branco, letra ilegível, identificação, fora do espaço)</label></div>'+
   '<div class="row"><label class="f" for="desc" style="margin:0">Desconto por abordagem parcial, divagação, cópia do enunciado ou excesso de linhas (itens 11.10, 11.15 e 11.16)</label><input id="desc" class="num" type="number" min="0" max="100" value="'+(st.desc!=null?st.desc:(over?10:0))+'"></div>'+
   (over?'<div class="note">Sua resposta passou de '+cur.linhas+' linhas (estimado em '+n+'). Sugestão de desconto: 10 pontos, ajuste conforme o seu critério.</div>':'')+
   '<div class="note acc" id="tot"></div>'+
   '<h3 style="margin:14px 0 6px">Resposta-modelo comentada (AUTORAL)</h3><div class="stmt">'+model+'</div><p class="src">Estimativa: '+C.countLines(cur.modelo.join('\n'),+K.$('#cpl').value||90)+' linhas com '+(+K.$('#cpl').value||90)+' caracteres por linha. Não é a resposta oficial.</p><h4>Comentários</h4><ul>'+com+'</ul>'+refs+'</div>';
  function total(){
    var chk=K.$$('#corr input[data-i]').map(function(x){return x.checked});st.chk=chk;
    var zero=K.$('#zero').checked,d=Math.max(0,+K.$('#desc').value||0);st.desc=d;save();
    var s=zero?0:Math.max(0,C.sumPoints(cur.esp.map(function(i){return {p:i.p}}),chk)-d);
    K.$('#tot').innerHTML='Sua autoavaliação: <b>'+s+' de 100</b>. '+(s>=50?'Acima do mínimo de 50 pontos para ser habilitado (edital, item 11.9).':'Abaixo do mínimo de 50 pontos (edital, item 11.9): a prova eliminaria.')+' Não é a nota da banca.';
  }
  K.$$('#corr input').forEach(function(x){x.onchange=total;x.oninput=total});total();
  K.$('#corr').scrollIntoView({behavior:'smooth',block:'start'});
}
pick();
})();
