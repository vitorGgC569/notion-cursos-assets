(function(){
'use strict';
var K=window.K,KEY='tcegoti:m09-sim-rag',S=K.store.get(KEY,{})||{};S.done=S.done||{};
var CORPUS={"S01": "Norma TI-07, art. 1. O assistente de código aprovado pelo Tribunal Exemplo é o Atlas. O uso de qualquer outro assistente de código em máquinas do órgão depende de autorização da Coordenadoria de Segurança da Informação.", "S02": "Norma TI-07, art. 2. O Atlas só pode receber trechos de código do repositório interno. É proibido colar no assistente dados pessoais, senhas, chaves de API e trechos de processos sob sigilo. O limite de contexto configurado no Atlas é de 8000 tokens por requisição.", "S03": "Norma TI-07, art. 3. Todo código sugerido pelo Atlas deve passar por revisão humana antes do merge. A revisão é feita por pelo menos 2 pessoas desenvolvedoras quando a mudança toca autenticação, pagamentos ou dados pessoais. Nos demais casos basta 1 revisor.", "S04": "Norma TI-07, art. 4. Os testes automatizados são obrigatórios no pipeline. A cobertura mínima de linhas exigida para aceitar um pull request é de 75 por cento. Pull requests abaixo desse valor são bloqueados pelo pipeline.", "S05": "Norma TI-07, art. 5. Incidentes envolvendo IA, como vazamento de dado no prompt ou resposta com informação indevida, devem ser registrados no sistema de chamados em até 48 horas. O registro é feito pela pessoa que identificou o incidente.", "S06": "Norma TI-07, art. 6. O sistema de busca em documentos usa recuperação aumentada por geração. Os documentos são divididos em trechos de 120 palavras, com sobreposição de 20 palavras, e a busca devolve os 4 trechos mais relevantes para compor o contexto.", "S07": "Norma TI-07, art. 7. Agentes de IA só podem usar ferramentas da lista de permissão aprovada. As ferramentas autorizadas hoje são consultar_processo, resumir_documento e abrir_chamado. A ferramenta enviar_email exige aprovação humana a cada uso.", "S08": "Norma TI-07, art. 8. Cada execução de um agente tem limite de 6 passos. Ao atingir o limite, o agente deve parar e devolver o estado atual ao usuário, sem tentar continuar sozinho. Todas as chamadas de ferramenta ficam registradas em log por 180 dias.", "S09": "Norma TI-07, art. 9. Servidores do Protocolo de Contexto de Modelo, o MCP, só podem ser instalados após análise da equipe de segurança. O servidor aprovado atualmente é o mcp-processos, que oferece acesso somente leitura à base de processos.", "S10": "Norma TI-07, art. 10. Documentos recuperados e páginas da web são dados não confiáveis. Instruções contidas neles não devem ser executadas pelo agente. Qualquer texto externo precisa ser enviado ao modelo entre delimitadores e marcado como conteúdo, e nunca como instrução.", "S11": "Norma TI-07, art. 11. A avaliação mensal da qualidade do assistente usa um conjunto de 50 perguntas de referência. A meta de acerto é de 90 por cento. Resultados abaixo da meta exigem revisão do prompt de sistema e dos documentos indexados.", "S12": "Norma TI-07, art. 12. O treinamento obrigatório sobre uso seguro de IA tem carga de 4 horas e deve ser refeito a cada 12 meses. O acesso ao Atlas é suspenso para quem estiver com o treinamento vencido."};
var QA=[["Qual é o assistente de código aprovado pelo Tribunal?", "S01", "atlas"], ["Qual é o limite de contexto configurado no Atlas?", "S02", "8000"], ["Quantos revisores são exigidos quando a mudança toca autenticação?", "S03", "2"], ["Qual é a cobertura mínima de testes para aceitar um pull request?", "S04", "75"], ["Em quantas horas um incidente de IA deve ser registrado?", "S05", "48"], ["Quantas palavras tem cada trecho na busca em documentos?", "S06", "120"], ["Qual ferramenta do agente exige aprovação humana a cada uso?", "S07", "enviar_email"], ["Qual é o limite de passos por execução de um agente?", "S08", "6"], ["Qual é o único servidor MCP aprovado hoje?", "S09", "mcp-processos"], ["Quantas horas tem o treinamento obrigatório de IA?", "S12", "4"]];

var STOP={};'a o as os de da do das dos e em um uma para por com que qual quais quantos quantas e na no nas nos ao aos se sao ser tem tera ha pelo pela'.split(' ').forEach(function(w){STOP[w]=1});
function norm(s){return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function toks(s){return (norm(s).match(/[a-z0-9_\-]+/g)||[]).filter(function(t){return !STOP[t]})}
function chunk(text,size,ov){var w=text.split(/\s+/).filter(Boolean);if(w.length<=size)return [w.join(' ')];var step=size-ov,out=[];for(var i=0;i<w.length;i+=step){out.push(w.slice(i,i+size).join(' '));if(i+size>=w.length)break}return out}
function bm25(docs){var k1=1.5,b=0.75,t=docs.map(toks),N=t.length,avg=t.reduce(function(a,x){return a+x.length},0)/N,df={},tf=t.map(function(x){var c={};x.forEach(function(w){c[w]=(c[w]||0)+1});return c});
 tf.forEach(function(c){for(var w in c)df[w]=(df[w]||0)+1});var idf={};for(var w in df)idf[w]=Math.log(1+(N-df[w]+0.5)/(df[w]+0.5));
 return function(q,k){var qs=toks(q),sc=t.map(function(x,i){var s=0,L=x.length;qs.forEach(function(w){if(tf[i][w])s+=idf[w]*tf[i][w]*(k1+1)/(tf[i][w]+k1*(1-b+b*L/avg))});return s});
  return sc.map(function(s,i){return [i,s]}).sort(function(a,b2){return b2[1]-a[1]||a[0]-b2[0]}).slice(0,k)}}
var full=Object.keys(CORPUS).sort().map(function(k){return CORPUS[k]}).join(' ');
var nWords=full.split(/\s+/).filter(Boolean).length;
function art(g){return 'art. '+parseInt(g.slice(1),10)+'.'}
function run(size,ov,k){var ch=chunk(full,size,ov),top=bm25(ch),hit=0,ctx=0,rows=[];
 QA.forEach(function(q,qi){var r=top(q[0],k),ok=r.some(function(x){return ch[x[0]].indexOf(art(q[1]))>=0});if(ok)hit++;ctx+=r.reduce(function(a,x){return a+ch[x[0]].split(/\s+/).length},0);rows.push({q:q[0],ok:ok,r:r})});
 return {ch:ch,hit:hit,ctx:ctx/QA.length,rows:rows}}
var st={size:120,ov:20,k:2,q:0};
var MIS=[
 {id:'r1',t:'Acerto perfeito',d:'Escolha tamanho, sobreposição e k que deem acerto de 10 em 10.',ok:function(r){return r.hit===10}},
 {id:'r2',t:'Trechos curtos demais',d:'Use trechos de 20 palavras e sobreposição 0 com k = 2 e veja o acerto cair para 6 de 10.',ok:function(r,s){return s.size<=20&&s.ov===0&&s.k===2&&r.hit<=6}},
 {id:'r3',t:'Mais k, mais ruído',d:'Com k = 5 e trechos de 40 palavras, o contexto médio devolvido passa de 180 palavras.',ok:function(r,s){return s.k===5&&s.size===40&&r.ctx>180}},
 {id:'r4',t:'Contexto enxuto',d:'Acerto de pelo menos 9 em 10 com menos de 160 palavras de contexto médio (k = 2).',ok:function(r,s){return s.k===2&&r.hit>=9&&r.ctx<160}}
];
var $=K.$;
function draw(){
 var R=run(st.size,st.ov,st.k);
 $('#v-size').textContent=st.size;$('#v-ov').textContent=st.ov;$('#v-k').textContent=st.k;
 var form=FM9.nChunks(nWords,st.size,st.ov);
 $('#res').innerHTML='<div class="card"><p class="kicker">Resultado</p><p>O texto indexado tem <b>'+nWords+'</b> palavras e gerou <b>'+R.ch.length+'</b> trechos (fórmula ⌈(N − tamanho)/(tamanho − sobreposição)⌉ + 1 = <b>'+form+'</b>).</p><p>acerto@'+st.k+': <b>'+R.hit+' de '+QA.length+'</b> perguntas. Contexto médio devolvido: <b>'+Math.round(R.ctx)+'</b> palavras.</p></div>';
 var rows=R.rows.map(function(x,i){return '<tr><td>'+(i+1)+'</td><td>'+K.esc(x.q)+'</td><td>'+(x.ok?'acertou':'errou')+'</td></tr>'}).join('');
 $('#tab').innerHTML='<table><thead><tr><th>#</th><th>Pergunta</th><th>Trecho certo entre os k?</th></tr></thead><tbody>'+rows+'</tbody></table>';
 var q=QA[st.q],x=R.rows[st.q],a=art(q[1]);
 $('#top').innerHTML='<p class="kicker">Trechos recuperados para: '+K.esc(q[0])+'</p>'+x.r.map(function(y,j){var t=R.ch[y[0]],has=t.indexOf(a)>=0;return '<div class="card" style="margin:8px 0"><p class="muted" style="font-size:13px;margin:0 0 6px">posição '+(j+1)+' · trecho '+(y[0]+1)+' de '+R.ch.length+' · pontuação BM25 '+y[1].toFixed(2)+' · '+(has?'contém o artigo certo ('+a+')':'não contém o artigo certo')+'</p><p style="margin:0;font-size:14px">'+K.esc(t)+'</p></div>'}).join('');
 var nd=0,h='';MIS.forEach(function(m,i){var okk=!!S.done[m.id];if(!okk){try{if(m.ok(R,st)){S.done[m.id]=1;okk=true}}catch(e){}}if(okk)nd++;
  h+='<li style="list-style:none;margin:8px 0;display:flex;gap:10px;align-items:flex-start"><span class="pill'+(okk?' acc':'')+'" style="flex:none">'+(okk?'feita':(i+1))+'</span><span><b>'+K.esc(m.t)+'</b><br><span style="font-size:13px;color:var(--muted)">'+K.esc(m.d)+'</span></span></li>'});
 K.store.set(KEY,S);$('#mis').innerHTML='<p class="kicker">Missões ('+nd+' de '+MIS.length+')</p><ul style="padding:0;margin:0">'+h+'</ul>'}
function bind(id,key,fn){var e=$(id);e.addEventListener('input',function(){st[key]=parseInt(e.value,10);if(key==='size'){var m=Math.floor(st.size/2);$('#ov').max=m;if(st.ov>m){st.ov=m;$('#ov').value=m}}fn&&fn();draw()})}
bind('#size','size');bind('#ov','ov');bind('#k','k');
var sel=$('#qsel');sel.innerHTML=QA.map(function(q,i){return '<option value="'+i+'">'+(i+1)+'. '+K.esc(q[0])+'</option>'}).join('');
sel.addEventListener('change',function(){st.q=parseInt(sel.value,10);draw()});
document.querySelectorAll('[data-p]').forEach(function(b){b.addEventListener('click',function(){var p=b.getAttribute('data-p').split(',');st.size=+p[0];st.ov=+p[1];st.k=+p[2];$('#size').value=st.size;$('#ov').max=Math.floor(st.size/2);$('#ov').value=st.ov;$('#k').value=st.k;draw()})});
draw();
})();
