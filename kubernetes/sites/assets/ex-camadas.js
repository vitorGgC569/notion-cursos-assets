(function(){
var K=window.K,X=K.X;
function df(lines,hi){return lines.map(function(l,i){return X.text('d'+i,16,40+i*22,l,i===hi?'b':'t')})}
var DF=['FROM python:3.12-slim','WORKDIR /app','COPY requirements.txt .','RUN pip install -r requirements.txt','COPY . .','CMD ["python", "app.py"]'];
function stack(n,cached,x){
  var N=[],names=['python:3.12-slim','WORKDIR /app','requirements.txt','pip install','código (COPY . .)','CMD (metadado)'],sz=['45 MB','0 B','1 KB','120 MB','2 MB','0 B'];
  for(var i=0;i<n;i++){var isC=cached.indexOf(i)>-1;N.push(X.box('L'+i,x,230-i*38,300,32,names[i],isC?'m':(i===n-1?'a':'n'),null));N.push(X.text('Ls'+i,x+288,230-i*38+20,isC?'em cache':sz[i],'t','end'))}
  return N;
}
var S=[
{cmd:'FROM python:3.12-slim',title:'A camada base',text:'<p>Cada instrução do Dockerfile que altera arquivos gera uma <b>camada</b> somente leitura. A primeira é a imagem base.</p>',scene:function(){return df(DF,0).concat(stack(1,[],370))}},
{cmd:'WORKDIR /app  e  COPY requirements.txt .',title:'Camadas para o ambiente',text:'<p><code>WORKDIR</code> só define a pasta (sem arquivos novos). O <code>COPY</code> traz o arquivo de dependências, uma camada minúscula.</p>',scene:function(){return df(DF,2).concat(stack(3,[],370))}},
{cmd:'RUN pip install -r requirements.txt',title:'A camada pesada',text:'<p>Instalar as dependências cria a camada maior e mais lenta de construir. É ela que queremos reaproveitar.</p>',scene:function(){return df(DF,3).concat(stack(4,[],370))}},
{cmd:'COPY . .  e  CMD [...]',title:'Código e comando de partida',text:'<p>O código vem por último porque muda o tempo todo. <code>CMD</code> é só metadado: define o que roda ao iniciar, sem camada de arquivos. Pronto: a imagem tem 5 camadas.</p>',scene:function(){return df(DF,5).concat(stack(6,[],370))}},
{cmd:'docker build -t app:2 .  (após editar app.py)',out:'#5 CACHED   #6 CACHED   #7 CACHED   #8 [5/5] COPY . .',title:'Rebuild com cache',text:'<p>Você editou só o código. O Docker compara cada instrução com o build anterior: as camadas até <code>pip install</code> não mudaram e vêm do <b>cache</b>. Só <code>COPY . .</code> e as seguintes são refeitas, e o build leva segundos.</p>',scene:function(){return df(DF,4).concat(stack(6,[0,1,2,3],370))}},
{cmd:'(ordem ruim) COPY . .  antes do  pip install',title:'Por que a ordem importa',text:'<p>Se o <code>COPY . .</code> viesse antes do <code>pip install</code>, qualquer mudança no código invalidaria o cache dali em diante, e as dependências seriam reinstaladas a <b>cada build</b>. Regra: o que muda pouco vai primeiro, o que muda muito vai por último.</p>',scene:function(){var bad=['FROM python:3.12-slim','WORKDIR /app','COPY . .','RUN pip install -r requirements.txt','CMD ["python", "app.py"]'];var N=df(bad,2);[0,1].forEach(function(i){N.push(X.box('L'+i,370,230-i*38,300,32,['python:3.12-slim','WORKDIR /app'][i],'m'),X.text('Ls'+i,658,230-i*38+20,'em cache','t','end'))});N.push(X.box('L2',370,192,300,32,'código (COPY . .)','a'),X.box('L3',370,154,300,32,'pip install (refeito)','a'),X.text('Ls3',658,174,'120 MB de novo','t','end'));return N}},
{cmd:'FROM golang AS build ... FROM alpine',title:'Multi-stage: só o resultado vai adiante',text:'<p>Em um build de vários estágios, o primeiro (com compilador, ~800 MB) existe só durante o build. O estágio final copia apenas o binário com <code>COPY --from=build</code> e a imagem entregue fica pequena.</p>',scene:function(){return [X.zone('za',16,10,320,250,'Estágio build (golang)'),X.box('g1',32,50,288,34,'golang:1.23','m','~800 MB'),X.box('g2',32,92,288,34,'código-fonte','m'),X.box('g3',32,134,288,34,'binário compilado /app','a'),X.zone('zb',384,10,320,250,'Estágio final (alpine)'),X.box('f1',400,150,288,34,'alpine:3.20','n','~8 MB'),X.box('f2',400,192,288,34,'/app (COPY --from=build)','a','~12 MB'),X.line('cf',320,151,400,209,'a',true),X.text('fz',400,248,'imagem final: ~20 MB','b')]}}
];
K.explain({w:720,h:276,steps:S,alt:'Camadas de uma imagem Docker'});
})();
