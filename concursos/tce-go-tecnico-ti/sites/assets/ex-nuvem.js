(function(){
var K=window.K,X=K.X;
var ROWS=['Aplicações','Dados','Runtime e middleware','Sistema operacional','Virtualização','Servidores e discos','Rede física'];
var COLS=['Local','IaaS','PaaS','FaaS','SaaS'];
// quem gerencia: 1 = cliente, 0 = provedor
var OWN={
 0:[1,1,1,1,1,1,1],
 1:[1,1,1,1,0,0,0],
 2:[1,1,0,0,0,0,0],
 3:[1,1,0,0,0,0,0],
 4:[0,1,0,0,0,0,0]};
function grid(n,note){
  var out=[];
  ROWS.forEach(function(r,i){out.push(X.text('r'+i,10,78+i*34,r,'t'))});
  for(var c=0;c<=n;c++){
    out.push(X.text('h'+c,160+c*112+50,26,COLS[c],'b','middle'));
    ROWS.forEach(function(r,i){var cli=OWN[c][i];out.push(X.box('b'+c+'_'+i,160+c*112,52+i*34,100,28,cli?'cliente':'provedor',cli?'a':'n'))});
  }
  if(note)out.push(X.text('note',10,310,note,'t'));
  return out;
}
var S=[
{label:'0. Local',title:'No datacenter próprio, tudo é do cliente',text:'<p>Na infraestrutura local (<i>on-premises</i>) a instituição cuida de <b>todas as camadas</b>: da rede física e dos servidores até a aplicação e os dados. Mais controle, mais custo fixo e mais trabalho.</p>',scene:function(){return grid(0,'Azul: gerenciado pelo cliente.')}},
{label:'1. IaaS',title:'IaaS: o provedor entrega infraestrutura virtual',text:'<p>Em <b>IaaS</b> (<i>Infrastructure as a Service</i>), o provedor cuida de rede física, servidores, armazenamento e virtualização. O cliente instala e atualiza o <b>sistema operacional</b>, o middleware e as aplicações. Exemplos: máquinas virtuais, discos e redes virtuais.</p>',scene:function(){return grid(1)}},
{label:'2. PaaS',title:'PaaS: o provedor entrega também a plataforma',text:'<p>Em <b>PaaS</b>, o provedor também gerencia SO, runtime e middleware. O cliente publica a <b>aplicação</b> e administra seus <b>dados</b>. Exemplos: serviços gerenciados de banco de dados e plataformas de execução de aplicações.</p>',scene:function(){return grid(2)}},
{label:'3. FaaS',title:'Serverless (FaaS): só o código, cobrado por execução',text:'<p>No <b>serverless</b> (<i>Function as a Service</i>), o cliente escreve funções acionadas por eventos. O provedor aloca, escala (inclusive a zero) e cobra <b>por execução</b>. Limites: tempo máximo de execução e latência da primeira chamada (<i>cold start</i>).</p>',scene:function(){return grid(3)}},
{label:'4. SaaS',title:'SaaS: o software pronto, só dados e acesso',text:'<p>Em <b>SaaS</b> o cliente usa o software pelo navegador. Do lado do cliente ficam <b>os dados, as contas e as configurações de acesso</b>. Exemplos: correio, suítes de escritório e sistemas de gestão.</p>',scene:function(){return grid(4,'Mesmo no SaaS, dados e identidades continuam sendo do cliente.')}},
{label:'5. Regra',title:'Responsabilidade compartilhada: sempre sobra algo ao cliente',text:'<p>O provedor é responsável pela segurança <b>da</b> nuvem (instalações, hardware, virtualização). O cliente é responsável pela segurança <b>na</b> nuvem: dados, identidades e acessos, configuração de rede e regras de acesso. Quanto mais para a direita, menos camadas o cliente administra.</p>',scene:function(){return [X.zone('z',16,16,688,300,'Divisão típica'),X.box('a',40,60,300,70,'Provedor: segurança DA nuvem','n','datacenters, hardware, hipervisor,\nrede física'),X.box('b',380,60,300,70,'Cliente: segurança NA nuvem','a','dados, identidades, acessos,\nconfiguração e regras de rede'),X.text('t',40,180,'Nuvem híbrida: local + nuvem pública, ligadas por VPN ou link dedicado.','t'),X.text('t2',40,206,'Multicloud: mais de um provedor de nuvem pública.','t')]}}
];
K.explain({w:720,h:330,steps:S,alt:'Animação da divisão de responsabilidades entre cliente e provedor em local, IaaS, PaaS, FaaS e SaaS'});
})();
