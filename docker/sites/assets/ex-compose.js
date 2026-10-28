(function(){
var K=window.K,X=K.X;
function z(o){
  o=o||{};var N=[X.zone('zy',8,8,200,260,'compose.yaml'),X.zone('zr',230,8,482,260,'Projeto "loja" no Docker')];
  ['services:','  web:  nginx + porta 8080','  db:   postgres:16','volumes:','  dados:'].forEach(function(l,i){N.push(X.text('y'+i,20,48+i*22,l,'t'))});
  if(o.net)N.push(X.box('net',246,40,450,34,'rede loja_default','a','DNS interno: web e db se enxergam pelo nome'));
  if(o.vol)N.push(X.box('vol',246,208,160,46,'volume loja_dados',o.vol===2?'m':'a'));
  if(o.db)N.push(X.box('db',246,100,210,90,'db',o.db===2?'m':'a',o.db===2?'iniciando...':o.db===3?'healthy':'running'));
  if(o.web)N.push(X.box('web',482,100,214,90,'web',o.web===2?'m':'a','running · 8080:80'));
  if(o.vol&&o.db)N.push(X.line('lv',351,190,326,208,'a',true));
  if(o.dep)N.push(X.line('ld',482,145,456,145,'a',true));
  return N;
}
var S=[
{cmd:'docker compose config',title:'Um arquivo descreve o conjunto',text:'<p>O <code>compose.yaml</code> declara <b>serviços</b>, redes e volumes. O <code>docker compose</code> lê o arquivo e cria tudo de uma vez, em vez de uma lista de <code>docker run</code> com opções longas. <code>config</code> valida e mostra o resultado final.</p>',scene:function(){return z()}},
{cmd:'docker compose up -d',out:'[+] Running 4/4\n Network loja_default  Created\n Volume loja_dados    Created',title:'1. Rede e volume',text:'<p>O Compose começa pela infraestrutura: cria a rede <code>loja_default</code> (com DNS pelo nome do serviço) e o volume <code>loja_dados</code>. O prefixo <code>loja</code> é o nome do projeto, normalmente o da pasta.</p>',scene:function(){return z({net:1,vol:1})}},
{cmd:'  Container loja-db-1   Started',title:'2. O banco sobe primeiro',text:'<p>O <code>web</code> declara <code>depends_on: db</code>, então o <code>db</code> é iniciado antes. Ele recebe o volume e se registra na rede com o nome <code>db</code>.</p>',scene:function(){return z({net:1,vol:1,db:2,dep:0})}},
{cmd:'  Container loja-db-1   Healthy',title:'3. Esperar o banco ficar pronto',text:'<p>Iniciar não é o mesmo que estar pronto. Com um <code>healthcheck</code> no <code>db</code> e <code>condition: service_healthy</code> no <code>web</code>, o Compose só continua quando o banco aceita conexões.</p>',scene:function(){return z({net:1,vol:1,db:3,dep:1})}},
{cmd:'  Container loja-web-1  Started',title:'4. Sobe o web',text:'<p>Com o banco saudável, o <code>web</code> inicia e já enxerga <code>db</code> pelo nome. A porta <code>8080:80</code> fica disponível no seu computador.</p>',scene:function(){return z({net:1,vol:1,db:3,web:1,dep:1})}},
{cmd:'docker compose ps',out:'NAME         SERVICE  STATUS\nloja-db-1    db       running (healthy)\nloja-web-1   web      running   0.0.0.0:8080->80/tcp',title:'Ver o estado',text:'<p><code>docker compose ps</code> lista só os contêineres deste projeto. <code>docker compose logs -f web</code> acompanha os logs de um serviço.</p>',scene:function(){return z({net:1,vol:1,db:1,web:1,dep:1})}},
{cmd:'docker compose down',out:'Container loja-web-1  Removed\nContainer loja-db-1   Removed\nNetwork loja_default  Removed',title:'Derrubar tudo, menos os dados',text:'<p><code>down</code> remove contêineres e rede, na ordem inversa. O <b>volume permanece</b>: os dados do banco sobrevivem, e um novo <code>up</code> os reencontra.</p>',scene:function(){return z({vol:1})}},
{cmd:'docker compose down -v',out:'Volume loja_dados  Removed',title:'Remover também os volumes',text:'<p>O <code>-v</code> apaga os volumes declarados no arquivo, e com eles os dados. Útil para recomeçar do zero em desenvolvimento; perigoso em produção.</p>',scene:function(){return z()}}
];
K.explain({w:720,h:276,steps:S,alt:'O que o docker compose up cria, em ordem'});
})();
