(function(){
var K=window.K,X=K.X;
function base(o){
  o=o||{};var N=[X.zone('zh',8,8,170,260,'Docker Hub'),X.zone('zi',196,8,200,260,'Imagens locais'),X.zone('zc',414,8,200,260,'Contêineres'),X.zone('zp',632,8,80,260,'Porta')];
  if(o.hub)N.push(X.box('ih',24,44,138,52,'nginx:1.27','n','registry'));
  if(o.img)N.push(X.box('il',212,44,168,52,'nginx:1.27',o.imgc||'n','imagem · só leitura'));
  if(o.c)N.push(X.box('ct',430,44,168,84,'web',o.cc||'a',o.c));
  if(o.port)N.push(X.box('pt',644,44,56,52,'8080','a','host'),X.line('pl',644,70,598,70,'a',true));
  return N;
}
var S=[
{cmd:'docker pull nginx:1.27',out:'1.27: Pulling from library/nginx\nStatus: Downloaded newer image',title:'Baixar uma imagem',text:'<p>A <b>imagem</b> é o modelo: arquivos e configuração empacotados em camadas, somente leitura. <code>pull</code> copia a imagem do registro (Docker Hub) para o seu computador. Ainda não há nenhum processo rodando.</p>',scene:function(){return base({hub:1,img:1,imgc:'a'}).concat([X.line('pa',162,70,212,70,'a',true)])}},
{cmd:'docker run -d --name web -p 8080:80 nginx:1.27',out:'a2d926552259',title:'Criar e iniciar um contêiner',text:'<p><code>run</code> cria um <b>contêiner</b> a partir da imagem: um processo isolado, com uma camada fina de escrita por cima. <code>-d</code> roda em segundo plano, <code>--name</code> dá um nome e <code>-p 8080:80</code> liga a porta 8080 do seu computador à 80 do contêiner.</p>',scene:function(){return base({hub:1,img:1,c:'Up\nprocesso: nginx',port:1}).concat([X.line('ra',380,70,430,70,'a',true)])}},
{cmd:'docker ps',out:'CONTAINER ID   IMAGE        STATUS         PORTS                  NAMES\na2d926552259   nginx:1.27   Up 5 seconds   0.0.0.0:8080->80/tcp   web',title:'Listar os contêineres em execução',text:'<p><code>docker ps</code> mostra só quem está rodando. Com <code>-a</code> aparecem também os parados.</p>',scene:function(){return base({hub:1,img:1,c:'Up\nprocesso: nginx',port:1})}},
{cmd:'docker logs web',out:'/docker-entrypoint.sh: ready for start up\nnginx/1.27.2 start worker processes',title:'Ler a saída do processo',text:'<p>O contêiner guarda o que o processo principal escreveu na tela. É a primeira coisa a olhar quando algo dá errado.</p>',scene:function(){return base({hub:1,img:1,c:'Up\nprocesso: nginx',port:1}).concat([X.box('lg',430,140,168,50,'stdout / stderr','m','logs do processo'),X.line('ll',514,128,514,140,'a',true)])}},
{cmd:'docker exec web ls /usr/share/nginx/html',title:'Rodar um comando dentro dele',text:'<p><code>exec</code> inicia um <b>segundo processo</b> dentro do contêiner que já está rodando, no mesmo isolamento. Com <code>-it</code> e <code>sh</code> você ganha um terminal interativo.</p>',scene:function(){return base({hub:1,img:1,c:'Up\nnginx\n+ ls (exec)',port:1})}},
{cmd:'docker stop web',out:'web',title:'Parar o contêiner',text:'<p><code>stop</code> envia SIGTERM ao processo (e SIGKILL após 10 s). O contêiner passa a <b>Exited</b>, mas continua existindo, com a sua camada de escrita. A porta é liberada.</p>',scene:function(){return base({hub:1,img:1,c:'Exited (0)\nparado',cc:'m'})}},
{cmd:'docker start web',out:'web',title:'Iniciar de novo',text:'<p><code>start</code> religa o mesmo contêiner, com o mesmo nome, a mesma configuração e a mesma camada de escrita.</p>',scene:function(){return base({hub:1,img:1,c:'Up\nprocesso: nginx',port:1})}},
{cmd:'docker rm -f web',out:'web',title:'Remover o contêiner',text:'<p><code>rm</code> apaga o contêiner e a sua camada de escrita: o que foi gravado só nela se perde. A <b>imagem</b> continua em disco, pronta para criar outro.</p>',scene:function(){return base({hub:1,img:1})}},
{cmd:'docker rmi nginx:1.27',out:'Untagged: nginx:1.27',title:'Remover a imagem',text:'<p><code>rmi</code> apaga a imagem local (só funciona se nenhum contêiner a usa). Para ter de volta, é preciso um novo <code>pull</code> ou <code>run</code>.</p>',scene:function(){return base({hub:1})}}
];
K.explain({w:720,h:276,steps:S,alt:'Ciclo de vida de uma imagem e de um contêiner'});
})();
