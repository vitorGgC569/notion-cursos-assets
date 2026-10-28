(function(){
var K=window.K,X=K.X;
function z(o){
  o=o||{};var N=[X.zone('zr',8,8,150,260,'Repositório'),X.zone('zn',176,8,370,260,'Runner (VM que nasce limpa)'),X.zone('zg',564,8,148,260,'Registry')];
  N.push(X.box('code',22,44,122,40,'main','a','código e Dockerfile'));
  if(o.tag)N.push(X.box('gtag',22,96,122,32,'tag v1.2.3','m'));
  if(o.co)N.push(X.box('src',192,44,160,40,'checkout','a','código no runner'));
  if(o.bx)N.push(X.box('bx',366,44,164,40,'builder buildx','a','docker-container'));
  if(o.cache)N.push(X.box('cache',192,100,160,40,'cache restaurado','a',o.cache===2?'camadas reaproveitadas':'cache-from'));
  if(o.test)N.push(X.box('test',366,100,164,40,'estágio test',o.test===2?'r':'a',o.test===2?'falhou: exit 1':o.test===3?'passou: exit 0':'rodando'));
  if(o.meta)N.push(X.box('meta',192,156,160,40,'metadata','a','1.2.3 1.2 1 sha-3f9a1c2'));
  if(o.build)N.push(X.box('build',366,156,164,40,'build-push','a','amd64 e arm64'));
  if(o.img)N.push(X.box('img',578,100,120,64,'imagem','a','4 tags, 1 digest'));
  if(o.dep)N.push(X.box('dep',578,180,120,40,'deploy','p','tag por SHA'));
  if(o.gone)N.push(X.text('gone',200,236,'o runner foi descartado: cache-to guardou as camadas fora dele','t'));
  if(o.stop)N.push(X.text('stop',200,236,'nada é publicado; o pipeline para na primeira falha','t'));
  if(o.push)N.push(X.line('lp',144,64,192,64,'a',true));
  if(o.arr1)N.push(X.line('l1',530,176,578,140,'a',true));
  if(o.arr2)N.push(X.line('l2',638,164,638,180,'a',true));
  return N;
}
var S=[
{cmd:'git push origin main',title:'1. O evento dispara o workflow',text:'<p>Um <code>push</code> (ou um pull request, ou uma tag) é o <b>evento</b> do bloco <code>on:</code>. O GitHub reserva um <b>runner</b>, uma máquina virtual que nasce limpa e é descartada no fim.</p>',scene:function(){return z({push:1})}},
{cmd:'uses: actions/checkout@v7',title:'2. Checkout',text:'<p>O runner começa <b>vazio</b>. O primeiro passo baixa o código do repositório para dentro dele, incluindo o Dockerfile.</p>',scene:function(){return z({push:1,co:1})}},
{cmd:'uses: docker/setup-buildx-action@v4',title:'3. Prepara o buildx',text:'<p>Cria um builder do tipo <code>docker-container</code>, necessário para exportar cache e construir para mais de uma plataforma.</p>',scene:function(){return z({push:1,co:1,bx:1})}},
{cmd:'cache-from: type=gha',title:'4. Restaura o cache',text:'<p>Como o runner nasceu limpo, o cache de camadas do módulo 5 não existe. O <code>cache-from</code> traz de fora as camadas das execuções anteriores, e o <code>--cache-from</code> do laboratório 3 faz o mesmo com um registry local.</p>',scene:function(){return z({push:1,co:1,bx:1,cache:2})}},
{cmd:'docker build --target test .',out:'FALHOU: exit 1',title:'5a. Se o teste falha, o pipeline para',text:'<p>O estágio <code>test</code> do Dockerfile roda os testes no mesmo ambiente da imagem. Com código de saída diferente de zero, o job falha e <b>nada é publicado</b>. É o que o laboratório 1 mostra.</p>',scene:function(){return z({push:1,co:1,bx:1,cache:2,test:2,stop:1})}},
{cmd:'docker build --target test .',out:'testes ok · exit 0',title:'5b. Se passa, segue adiante',text:'<p>Com o teste verde, o pipeline continua. Falhar cedo e barato significa rodar o teste mais rápido primeiro.</p>',scene:function(){return z({push:1,co:1,bx:1,cache:2,test:3})}},
{cmd:'uses: docker/metadata-action@v6',out:'1.2.3  1.2  1  sha-3f9a1c2',title:'6. Calcula as tags',text:'<p>Lendo o evento do Git (a tag <code>v1.2.3</code> e o commit), a ação gera as tags <b>semver</b> e a do <b>SHA</b>, além dos rótulos OCI. É o que o laboratório 2 reproduz à mão.</p>',scene:function(){return z({push:1,tag:1,co:1,bx:1,cache:2,test:3,meta:1})}},
{cmd:'uses: docker/build-push-action@v7',out:'platforms: linux/amd64,linux/arm64',title:'7. Build e publicação',text:'<p>Constrói para as duas plataformas e envia ao registry. Em pull requests, o <code>push</code> fica <b>desligado</b> (<code>github.event_name != \'pull_request\'</code>). O índice de manifestos deixa o <code>pull</code> escolher a arquitetura certa.</p>',scene:function(){return z({push:1,tag:1,co:1,bx:1,cache:2,test:3,meta:1,build:1,arr1:1,img:1})}},
{cmd:'cache-to: type=gha,mode=max',title:'8. Guarda o cache e o runner some',text:'<p>As camadas, inclusive as dos estágios intermediários (<code>mode=max</code>), vão para fora do runner. Em seguida a máquina é destruída; a próxima execução recomeça do zero, mas com o cache.</p>',scene:function(){return z({push:1,tag:1,build:1,arr1:1,img:1,gone:1})}},
{cmd:'docker compose pull && docker compose up -d',title:'9. Deploy e rollback pela tag',text:'<p>O deploy usa a tag do <b>SHA</b> (ou o digest), e o rollback é implantar de novo a anterior. Por isso publicar só <code>latest</code> não serve: você não saberia o que voltar.</p>',scene:function(){return z({img:1,dep:1,arr2:1})}}
];
K.explain({w:720,h:276,steps:S,alt:'O caminho de uma imagem pelo pipeline, do push ao registry'});
})();
