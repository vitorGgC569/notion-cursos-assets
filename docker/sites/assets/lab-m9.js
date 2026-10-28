(function(){
var K=window.K;
function an(text){
  var ins=K.dockerfile(text),warn=[];
  var froms=ins.filter(function(i){return i.k==='FROM'});
  if(!ins.length)return {text:text,ins:ins,err:{},errMsg:'o arquivo está vazio',warn:[]};
  if(ins[0].k!=='FROM'&&ins[0].k!=='ARG')return {text:text,ins:ins,err:{},errMsg:'a primeira instrução precisa ser FROM (ou ARG antes dele).',warn:[]};
  var bad=ins.filter(function(i){return ['FROM','RUN','CMD','LABEL','MAINTAINER','EXPOSE','ENV','ADD','COPY','ENTRYPOINT','VOLUME','USER','WORKDIR','ARG','ONBUILD','STOPSIGNAL','HEALTHCHECK','SHELL'].indexOf(i.k)<0})[0];
  if(bad)return {text:text,ins:ins,err:{},errMsg:'linha '+bad.line+': instrução desconhecida "'+bad.k+'".',warn:[]};
  var last=froms[froms.length-1];
  var fin=ins.filter(function(i){return i.line>last.line});
  froms.forEach(function(f){var img=f.a.split(/\s+/)[0];if(img!=='scratch'&&img.indexOf('$')<0&&!(froms.some(function(g){return g!==f&&new RegExp('\\bAS\\s+'+img+'$','i').test(g.a)}))){if(!/[:@]/.test(img))warn.push('linha '+f.line+' (hadolint DL3006): sempre use uma tag de versão explícita em <code>'+K.esc(img)+'</code>.');else if(/:latest$/.test(img))warn.push('linha '+f.line+' (hadolint DL3007): evite <code>:latest</code>, o build deixa de ser reprodutível.')}});
  ins.forEach(function(i){
    if(i.k==='ADD'&&!/^https?:|\.(tar|tgz|gz|xz|bz2)\b/.test(i.a))warn.push('linha '+i.line+' (hadolint DL3020): use <code>COPY</code> em vez de <code>ADD</code> para arquivos e pastas locais.');
    if((i.k==='CMD'||i.k==='ENTRYPOINT')&&!/^\s*\[/.test(i.a))warn.push('linha '+i.line+' (hadolint DL3025): use a forma exec (JSON) em <code>'+i.k+'</code>, para o processo receber sinais como PID 1.');
    if(i.k==='RUN'&&/apt-get update/.test(i.a)&&!/apt-get install/.test(i.a))warn.push('linha '+i.line+' (hadolint DL3009 / cache): <code>apt-get update</code> sozinho em um RUN cria uma camada com cache velho; junte com o <code>install</code>.');
    if(i.k==='RUN'&&/apt-get install/.test(i.a)&&!/--no-install-recommends/.test(i.a))warn.push('linha '+i.line+' (hadolint DL3015): considere <code>--no-install-recommends</code>.');
    if(i.k==='RUN'&&/pip install/.test(i.a)&&!/--no-cache-dir/.test(i.a))warn.push('linha '+i.line+' (hadolint DL3042): use <code>pip install --no-cache-dir</code> para não guardar cache na camada.');
    if(i.k==='ENV'&&/(KEY|PASSWORD|SECRET|TOKEN)\s*[= ]/i.test(i.a))warn.push('linha '+i.line+': segredo em <code>ENV</code> fica gravado na imagem e visível em <code>docker history</code>.');
  });
  if(!fin.some(function(i){return i.k==='USER'})||(fin.filter(function(i){return i.k==='USER'}).pop().a.trim()==='root'))warn.push('(hadolint DL3002) o estágio final roda como root; crie e use um usuário sem privilégios com <code>USER</code>.');
  if(!ins.some(function(i){return i.k==='HEALTHCHECK'}))warn.push('sem <code>HEALTHCHECK</code> (opcional no Docker; no Kubernetes você usa probes).');
  return {text:text,ins:ins,froms:froms,fin:fin,err:null,warn:warn};
}
an.parseLabel='O Dockerfile tem uma estrutura válida (começa com FROM e só usa instruções conhecidas).';
function has(c,k,re){return c.ins.some(function(i){return i.k===k&&(!re||re.test(i.a))})}
function idx(c,k,re){for(var j=0;j<c.ins.length;j++)if(c.ins[j].k===k&&(!re||re.test(c.ins[j].a)))return j;return -1}
var C=[
{id:'lint',tab:'1. Corrigir',title:'Desafio 1: corrija este Dockerfile',text:'<p>Este Dockerfile funciona, mas tem cinco problemas comuns. Corrija todos: tag fixa na imagem base, <code>COPY</code> no lugar de <code>ADD</code>, <code>update</code> e <code>install</code> no mesmo <code>RUN</code>, <code>WORKDIR</code> definido e <code>CMD</code> na forma exec.</p>',
 start:'FROM python:latest\nADD . /app\nRUN apt-get update\nRUN apt-get install -y curl\nCMD python /app/app.py\n',
 solution:'FROM python:3.12-slim\nWORKDIR /app\nRUN apt-get update \\\n && apt-get install -y --no-install-recommends curl \\\n && rm -rf /var/lib/apt/lists/*\nCOPY . .\nCMD ["python", "app.py"]\n',
 checks:[{label:'<code>FROM</code> com tag de versão fixa (não <code>latest</code>, nem sem tag)',fn:function(c){return c.froms.every(function(f){var i=f.a.split(/\s+/)[0];return /:[^:]+$/.test(i)&&!/:latest$/.test(i)})}},{label:'Sem <code>ADD</code> para arquivos locais',fn:function(c){return !c.ins.some(function(i){return i.k==='ADD'})}},{label:'<code>apt-get update</code> e <code>apt-get install</code> estão no mesmo <code>RUN</code>',fn:function(c){var u=c.ins.filter(function(i){return i.k==='RUN'&&/apt-get update/.test(i.a)});return u.length>0&&u.every(function(i){return /apt-get install/.test(i.a)})}},{label:'Há um <code>WORKDIR</code>',fn:function(c){return has(c,'WORKDIR')}},{label:'<code>CMD</code> na forma exec (lista JSON)',fn:function(c){var m=c.ins.filter(function(i){return i.k==='CMD'});return m.length===1&&/^\s*\[/.test(m[0].a)}}]},
{id:'cache',tab:'2. Cache',title:'Desafio 2: ordene as instruções para aproveitar o cache',text:'<p>Do jeito que está, qualquer mudança no código refaz o <code>pip install</code>. Reordene: copie primeiro só o <code>requirements.txt</code>, instale as dependências e só depois copie o resto do código. Mantenha <code>--no-cache-dir</code>.</p>',
 start:'FROM python:3.12-slim\nWORKDIR /app\nCOPY . .\nRUN pip install --no-cache-dir -r requirements.txt\nCMD ["python", "app.py"]\n',
 solution:'FROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nCMD ["python", "app.py"]\n',
 checks:[{label:'<code>COPY requirements.txt</code> vem antes do <code>pip install</code>',fn:function(c){var a=idx(c,'COPY',/requirements\.txt/),b=idx(c,'RUN',/pip install/);return a>-1&&b>-1&&a<b}},{label:'<code>COPY . .</code> vem depois do <code>pip install</code>',fn:function(c){var a=idx(c,'COPY',/^\.\s+\.?\s*$|^\.\s+\S+$/),b=idx(c,'RUN',/pip install/);var last=-1;c.ins.forEach(function(i,j){if(i.k==='COPY'&&/^\.\s/.test(i.a))last=j});return last>b&&b>-1}},{label:'<code>pip install</code> usa <code>--no-cache-dir</code>',fn:function(c){return has(c,'RUN',/pip install.*--no-cache-dir/)}}]},
{id:'sec',tab:'3. Segurança',title:'Desafio 3: usuário sem privilégios e sem segredo na imagem',text:'<p>Remova o segredo gravado com <code>ENV</code> (ele seria passado em tempo de execução, não no build), crie um usuário comum e rode a aplicação com ele usando <code>USER</code>. Adicione também um <code>HEALTHCHECK</code>.</p>',
 start:'FROM node:20-alpine\nWORKDIR /app\nENV API_KEY=abc123\nCOPY package*.json ./\nRUN npm ci --omit=dev\nCOPY . .\nCMD ["node", "server.js"]\n',
 solution:'FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --omit=dev\nCOPY --chown=node:node . .\nUSER node\nHEALTHCHECK --interval=30s CMD wget -qO- http://localhost:3000/ || exit 1\nCMD ["node", "server.js"]\n',
 checks:[{label:'Nenhum <code>ENV</code> ou <code>ARG</code> com KEY, PASSWORD, SECRET ou TOKEN',fn:function(c){return !c.ins.some(function(i){return (i.k==='ENV'||i.k==='ARG')&&/(KEY|PASSWORD|SECRET|TOKEN)/i.test(i.a)})}},{label:'O último <code>USER</code> não é root',fn:function(c){var u=c.ins.filter(function(i){return i.k==='USER'});return u.length>0&&!/^(root|0)(:|$)/.test(u[u.length-1].a.trim())}},{label:'<code>USER</code> aparece antes do <code>CMD</code>',fn:function(c){return idx(c,'USER')>-1&&idx(c,'USER')<idx(c,'CMD')}},{label:'Há um <code>HEALTHCHECK</code>',fn:function(c){return has(c,'HEALTHCHECK')}}]},
{id:'multi',tab:'4. Multi-stage',title:'Desafio 4: transforme em multi-stage',text:'<p>A imagem final carrega o compilador do Go inteiro. Use dois estágios: compile em <code>golang</code> e copie só o binário para uma imagem final pequena (<code>alpine</code>, <code>scratch</code> ou <code>distroless</code>) com <code>COPY --from=</code>.</p>',
 start:'FROM golang:1.23\nWORKDIR /src\nCOPY . .\nRUN CGO_ENABLED=0 go build -o /app .\nCMD ["/app"]\n',
 solution:'FROM golang:1.23 AS build\nWORKDIR /src\nCOPY . .\nRUN CGO_ENABLED=0 go build -o /app .\n\nFROM alpine:3.20\nCOPY --from=build /app /app\nUSER 65534\nCMD ["/app"]\n',
 checks:[{label:'Há pelo menos dois <code>FROM</code>',fn:function(c){return c.froms.length>=2}},{label:'Existe um <code>COPY --from=</code>',fn:function(c){return has(c,'COPY',/--from=/)}},{label:'O estágio final não usa a imagem <code>golang</code>',fn:function(c){return !/^golang/.test(c.froms[c.froms.length-1].a)}},{label:'O estágio final tem <code>CMD</code> ou <code>ENTRYPOINT</code> em forma exec',fn:function(c){return c.fin.some(function(i){return (i.k==='CMD'||i.k==='ENTRYPOINT')&&/^\s*\[/.test(i.a)})}}]}
];
K.$('#labbody')&&K.editorLab({challenges:C,analyze:an,freeStart:'FROM alpine:3.20\nCOPY app.sh /app.sh\nUSER 1000\nCMD ["/app.sh"]\n',freeText:'<p>Escreva ou cole um Dockerfile. O verificador aplica regras inspiradas no hadolint e avisa o que costuma dar problema. Ele não executa o build.</p>'});
})();
