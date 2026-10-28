(function(){
var K=window.K,X=K.X;
function cols(){return [X.box('c',30,10,150,40,'Cliente','n'),X.box('s',540,10,150,40,'Servidor','n'),X.line('lc',105,50,105,330,''),X.line('ls',615,50,615,330,'')]}
function msg(id,y,t,c,toRight,sub){return [X.line(id+'a',105,y,615,y+(toRight?18:-18)*0,c||'a',true)]}
function arrow(id,y,fromLeft,t,c){var x1=fromLeft?105:615,x2=fromLeft?615:105;return [X.line(id,x1,y,x2,y+22,c||'a',true),X.text(id+'t',360,y-6,t,'t','middle')]}
var S=[
{label:'0. Início',title:'Antes de qualquer dado: abrir a conexão TCP',text:'<p>Para abrir <code>https://www.exemplo.gov.br</code>, o cliente já resolveu o nome (DNS) e conhece o IP. Agora precisa de uma conexão confiável (TCP) e, por cima, de uma sessão segura (TLS).</p>',
 scene:function(){return cols().concat([X.text('t',360,180,'DNS já resolvido','t','middle')])}},
{label:'1. SYN',title:'TCP 1/3: o cliente envia SYN',text:'<p>O cliente propõe a conexão: segmento com a flag <b>SYN</b> e um número de sequência inicial (ISN) aleatório. Destino: porta 443 (HTTPS).</p>',
 scene:function(){return cols().concat(arrow('m1',90,true,'SYN, seq=x','a'))}},
{label:'2. SYN-ACK',title:'TCP 2/3: o servidor responde SYN-ACK',text:'<p>O servidor aceita: <b>SYN + ACK</b> com seu próprio número de sequência (y) e a confirmação x + 1.</p>',
 scene:function(){return cols().concat(arrow('m1',90,true,'SYN, seq=x','n'),arrow('m2',130,false,'SYN-ACK, seq=y, ack=x+1','a'))}},
{label:'3. ACK',title:'TCP 3/3: o cliente confirma com ACK',text:'<p><b>ACK</b> com ack=y + 1. A conexão TCP está estabelecida: o <b>three-way handshake</b> custa 1 RTT. Ainda não há segurança: o próximo passo é o TLS.</p>',
 scene:function(){return cols().concat(arrow('m1',90,true,'SYN, seq=x','n'),arrow('m2',130,false,'SYN-ACK, seq=y, ack=x+1','n'),arrow('m3',170,true,'ACK, ack=y+1','a'),X.text('t',360,230,'TCP estabelecido (1 RTT)','t','middle'))}},
{label:'4. ClientHello',title:'TLS 1.3: ClientHello',text:'<p>O cliente informa as versões e cifras que suporta, envia sua parte da troca de chaves (<i>key share</i>), o nome do servidor (<b>SNI</b>) e os protocolos de aplicação aceitos (<b>ALPN</b>, por exemplo h2 e http/1.1).</p>',
 scene:function(){return cols().concat(arrow('m3',90,true,'ClientHello (versões, key share, SNI, ALPN)','a'),X.text('t',360,200,'Tudo antes disso foi TCP puro','t','middle'))}},
{label:'5. ServerHello',title:'TLS 1.3: ServerHello, certificado e Finished',text:'<p>O servidor escolhe a cifra, devolve sua parte da troca de chaves e envia o <b>certificado</b> (que prova a identidade) e <b>Finished</b>, já cifrados. O cliente valida a cadeia do certificado e confere o nome. Chaves de sessão derivadas: a partir daqui, tudo é cifrado.</p>',
 scene:function(){return cols().concat(arrow('m3',90,true,'ClientHello','n'),arrow('m4',130,false,'ServerHello + certificado + Finished','a'))}},
{label:'6. Dados',title:'Finished do cliente e primeira requisição HTTP',text:'<p>O cliente envia seu <b>Finished</b> e já manda a requisição HTTP (<code>GET /</code>) dentro do túnel TLS. Total até o primeiro byte de dados: 1 RTT de TCP + 1 RTT de TLS 1.3 (o TLS 1.2 gastava 2 RTTs). No <b>HTTP/3</b>, o QUIC junta transporte e TLS 1.3 sobre UDP, e a conexão sai em 1 RTT.</p>',
 scene:function(){return cols().concat(arrow('m5',90,true,'Finished + GET / (HTTP/2, h2)','a'),arrow('m6',130,false,'resposta HTTP cifrada','a'),X.box('q',210,210,300,56,'HTTP/3: QUIC sobre UDP','m','transporte + TLS 1.3 em 1 RTT'))}}
];
K.explain({w:720,h:330,steps:S,alt:'Animação do handshake TCP e do handshake TLS 1.3'});
})();
