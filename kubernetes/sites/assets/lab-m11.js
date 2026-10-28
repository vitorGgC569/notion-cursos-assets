(function(){
var K=window.K;
function get(o,p){return p.split('.').reduce(function(a,k){return a==null?undefined:a[k]},o)}
function an(text){
  var r=K.yaml(text),warn=[];
  if(r.err)return {text:text,doc:null,err:r.err,errMsg:K.yamlErr(r.err),warn:[]};
  var d=r.doc;
  if(!d||typeof d!=='object')return {text:text,doc:d,err:{},errMsg:'o arquivo precisa ser um mapa com a chave "services".',warn:[]};
  if('version' in d)warn.push('a chave <code>version</code> é obsoleta no Compose v2 e é ignorada (o <code>docker compose</code> avisa na tela).');
  var sv=d.services||{},vols=d.volumes||{},nets=d.networks||{};
  Object.keys(sv).forEach(function(n){
    var s=sv[n]||{};
    if(!s.image&&!s.build)warn.push('serviço <code>'+n+'</code>: falta <code>image</code> ou <code>build</code>.');
    if(s.image&&(!/[:@]/.test(s.image)||/:latest$/.test(s.image)))warn.push('serviço <code>'+n+'</code>: fixe a tag da imagem (evite <code>latest</code>).');
    (s.ports||[]).forEach(function(p){if(typeof p==='number')warn.push('serviço <code>'+n+'</code>: porta <code>'+p+'</code> sem mapeamento; escreva "host:contêiner" entre aspas.')});
    var dep=s.depends_on;(Array.isArray(dep)?dep:Object.keys(dep||{})).forEach(function(x){if(!sv[x])warn.push('serviço <code>'+n+'</code>: <code>depends_on</code> aponta para <code>'+x+'</code>, que não existe.')});
    (s.volumes||[]).forEach(function(v){var src=typeof v==='string'?v.split(':')[0]:v.source;if(src&&!/^[.\/~$]/.test(src)&&!(src in vols)&&(typeof v==='string'?v.indexOf(':')>-1:v.type==='volume'))warn.push('serviço <code>'+n+'</code>: o volume nomeado <code>'+src+'</code> não está declarado em <code>volumes:</code> no nível raiz.')});
    var nn=Array.isArray(s.networks)?s.networks:Object.keys(s.networks||{});nn.forEach(function(x){if(!(x in nets)&&x!=='default')warn.push('serviço <code>'+n+'</code>: a rede <code>'+x+'</code> não está declarada em <code>networks:</code>.')});
    var env=s.environment;(Array.isArray(env)?env:Object.keys(env||{}).map(function(k){return k+'='+env[k]})).forEach(function(e){if(/(PASSWORD|SECRET|TOKEN)=(?!\$)\S+/i.test(String(e)))warn.push('serviço <code>'+n+'</code>: senha escrita direto no arquivo; prefira <code>${VARIAVEL}</code> e um arquivo <code>.env</code> ignorado pelo Git.')});
  });
  K.yamlPitfalls(text).forEach(function(p){warn.push('linha '+p.line+': '+p.msg)});
  if(!d.services)return {text:text,doc:d,err:{},errMsg:'falta a chave de nível raiz "services".',warn:warn};
  return {text:text,doc:d,sv:sv,err:null,warn:warn};
}
an.parseLabel='O YAML é válido e tem a seção <code>services</code>.';
function deps(s){var d=s.depends_on;return Array.isArray(d)?d:Object.keys(d||{})}
var C=[
{id:'refs',tab:'1. Referências',title:'Desafio 1: conserte as referências quebradas',text:'<p>Este <code>compose.yaml</code> tem dois erros de referência: um <code>depends_on</code> aponta para um serviço que não existe e um volume nomeado não foi declarado. Corrija os dois (lembre que o serviço do banco se chama <code>db</code>).</p>',
 start:'services:\n  web:\n    image: nginx:1.27\n    ports:\n      - "8080:80"\n    depends_on:\n      - banco\n  db:\n    image: postgres:16\n    environment:\n      POSTGRES_PASSWORD: ${DB_PASSWORD}\n    volumes:\n      - dados:/var/lib/postgresql/data\n',
 solution:'services:\n  web:\n    image: nginx:1.27\n    ports:\n      - "8080:80"\n    depends_on:\n      - db\n  db:\n    image: postgres:16\n    environment:\n      POSTGRES_PASSWORD: ${DB_PASSWORD}\n    volumes:\n      - dados:/var/lib/postgresql/data\n\nvolumes:\n  dados:\n',
 checks:[{label:'Todo <code>depends_on</code> aponta para um serviço existente',fn:function(c){return Object.keys(c.sv).every(function(n){return deps(c.sv[n]).every(function(x){return c.sv[x]})})&&deps(c.sv.web).length>0}},{label:'O volume <code>dados</code> está declarado em <code>volumes:</code> no nível raiz',fn:function(c){return !!c.doc.volumes&&('dados' in c.doc.volumes)}}]},
{id:'build',tab:'2. Escrever',title:'Desafio 2: escreva um compose do zero',text:'<p>Escreva um Compose com dois serviços. O <code>api</code> usa <code>build: ./api</code>, publica a porta <code>"3000:3000"</code> e depende do <code>cache</code>. O <code>cache</code> usa a imagem <code>redis:7</code>. Os dois ficam em uma rede declarada chamada <code>backend</code>.</p>',
 start:'services:\n',
 solution:'services:\n  api:\n    build: ./api\n    ports:\n      - "3000:3000"\n    depends_on:\n      - cache\n    networks:\n      - backend\n  cache:\n    image: redis:7\n    networks:\n      - backend\n\nnetworks:\n  backend:\n',
 checks:[{label:'<code>api</code> tem <code>build: ./api</code>',fn:function(c){var b=c.sv.api&&c.sv.api.build;return b==='./api'||(b&&b.context==='./api')}},{label:'<code>api</code> publica "3000:3000"',fn:function(c){return (c.sv.api.ports||[]).some(function(p){return String(p)==='3000:3000'})}},{label:'<code>cache</code> usa <code>redis:7</code>',fn:function(c){return c.sv.cache&&c.sv.cache.image==='redis:7'}},{label:'<code>api</code> depende de <code>cache</code>',fn:function(c){return deps(c.sv.api).indexOf('cache')>-1}},{label:'A rede <code>backend</code> está declarada e os dois serviços a usam',fn:function(c){var n=function(s){return Array.isArray(s.networks)?s.networks:Object.keys(s.networks||{})};return c.doc.networks&&('backend' in c.doc.networks)&&n(c.sv.api).indexOf('backend')>-1&&n(c.sv.cache).indexOf('backend')>-1}}]},
{id:'health',tab:'3. Healthcheck',title:'Desafio 3: esperar o banco ficar saudável',text:'<p><code>depends_on</code> simples só espera o contêiner <em>iniciar</em>, não ficar pronto. Dê um <code>healthcheck</code> ao <code>db</code> usando <code>pg_isready</code> e faça o <code>app</code> esperar com <code>condition: service_healthy</code>.</p>',
 start:'services:\n  app:\n    image: minha-app:1.0\n    depends_on:\n      - db\n  db:\n    image: postgres:16\n    environment:\n      POSTGRES_PASSWORD: ${DB_PASSWORD}\n',
 solution:'services:\n  app:\n    image: minha-app:1.0\n    depends_on:\n      db:\n        condition: service_healthy\n  db:\n    image: postgres:16\n    environment:\n      POSTGRES_PASSWORD: ${DB_PASSWORD}\n    healthcheck:\n      test: ["CMD-SHELL", "pg_isready -U postgres"]\n      interval: 5s\n      timeout: 3s\n      retries: 10\n',
 checks:[{label:'<code>db</code> tem <code>healthcheck.test</code> com <code>pg_isready</code>',fn:function(c){var t=get(c.sv.db,'healthcheck.test');return t&&JSON.stringify(t).indexOf('pg_isready')>-1}},{label:'<code>app</code> usa <code>depends_on.db.condition: service_healthy</code>',fn:function(c){return get(c.sv.app,'depends_on.db.condition')==='service_healthy'}},{label:'O healthcheck define <code>interval</code> e <code>retries</code>',fn:function(c){var h=get(c.sv.db,'healthcheck')||{};return !!h.interval&&!!h.retries}}]},
{id:'env',tab:'4. Variáveis',title:'Desafio 4: tire a senha do arquivo',text:'<p>A senha do banco está escrita direto no arquivo, e ele vai para o Git. Use interpolação do Compose, <code>${DB_PASSWORD}</code>, para ler o valor do ambiente ou de um arquivo <code>.env</code>. Faça isso nos dois serviços.</p>',
 start:'services:\n  db:\n    image: postgres:16\n    environment:\n      POSTGRES_PASSWORD: segredo123\n  app:\n    image: minha-app:1.0\n    environment:\n      DB_PASSWORD: segredo123\n',
 solution:'services:\n  db:\n    image: postgres:16\n    environment:\n      POSTGRES_PASSWORD: ${DB_PASSWORD}\n  app:\n    image: minha-app:1.0\n    environment:\n      DB_PASSWORD: ${DB_PASSWORD}\n',
 checks:[{label:'<code>db</code> usa <code>${DB_PASSWORD}</code>',fn:function(c){return String(get(c.sv.db,'environment.POSTGRES_PASSWORD')).indexOf('${DB_PASSWORD')===0}},{label:'<code>app</code> usa <code>${DB_PASSWORD}</code>',fn:function(c){return String(get(c.sv.app,'environment.DB_PASSWORD')).indexOf('${DB_PASSWORD')===0}},{label:'Nenhuma senha literal sobrou no arquivo',fn:function(c){return c.text.indexOf('segredo123')<0}}]}
];
K.$('#labbody')&&K.editorLab({challenges:C,analyze:an,freeStart:'services:\n  web:\n    image: nginx:1.27\n    ports:\n      - "8080:80"\n',freeText:'<p>Escreva ou cole um <code>compose.yaml</code>. O verificador checa a sintaxe e as referências entre serviços, volumes e redes. Ele não sobe contêineres.</p>',
 convert:function(t){var r=K.yaml(t);if(r.err)return '<div class="note bad">'+K.esc(K.yamlErr(r.err))+'</div>';return '<details open><summary>JSON equivalente</summary><div class="in"><pre><code>'+K.esc(JSON.stringify(r.doc,null,2))+'</code></pre></div></details>'}});
})();
