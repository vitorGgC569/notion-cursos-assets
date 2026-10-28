(function(){
var K=window.K,X=K.X;
var H='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',P='eyJzdWIiOiIxMjM0IiwibmFtZSI6IkFuYSIsImV4cCI6MTg5MzQ1NjAwMH0',G='RmCWRsYvie65-fqc0Ufx0rfYBVL478WDAFMsQGp5b3M';
function top(a,b,c){return [
 X.box('bh',16,14,200,52,'cabeçalho',(a||'n'),'header'),X.text('d1',226,44,'.','t'),
 X.box('bp',236,14,250,52,'carga (payload)',b||'n','claims'),X.text('d2',496,44,'.','t'),
 X.box('bs',506,14,198,52,'assinatura',c||'n','HMAC ou RSA/ECDSA')]}
var S=[
{label:'0. O token',title:'Um JWT são três partes separadas por pontos',text:'<p>O JSON Web Token (RFC 7519) é um texto compacto no formato <code>cabeçalho.payload.assinatura</code>. Cada parte é um JSON codificado em <b>Base64URL</b>. É o formato usado no ID Token do OIDC e em muitos access tokens.</p>',
 cmd:H+'.'+P+'.'+G,
 scene:function(){return top().concat([X.text('t0',16,120,'Exemplo real, assinado com o segredo "segredo" (algoritmo HS256).','t'),X.text('t1',16,148,'Quem recebe o token consegue ler as duas primeiras partes sem chave nenhuma.','t')])}},
{label:'1. Cabeçalho',title:'O cabeçalho diz como o token foi assinado',text:'<p>O cabeçalho (header) traz o algoritmo, <code>alg</code>, e o tipo, <code>typ</code>. <code>HS256</code> é HMAC com SHA-256 (chave secreta compartilhada). <code>RS256</code> é RSA com SHA-256 e <code>ES256</code> é ECDSA (par de chaves). Foi o que a questão 45 do TRT-22 cobrou.</p>',
 cmd:'{"alg":"HS256","typ":"JWT"}',out:'  →  '+H,
 scene:function(){return top('a').concat([X.box('c1',16,100,200,44,'HS256','n','simétrico: um segredo'),X.box('c2',236,100,220,44,'RS256 / ES256','n','assimétrico: par de chaves'),X.text('t1',16,190,'Simétrico: quem assina e quem verifica têm o mesmo segredo.','t'),X.text('t2',16,214,'Assimétrico: a chave privada assina e a chave pública verifica.','t')])}},
{label:'2. Payload',title:'A carga traz as informações, chamadas claims',text:'<p>O payload carrega as <b>claims</b> (afirmações). As registradas mais cobradas: <code>iss</code> (emissor), <code>sub</code> (assunto, o usuário), <code>aud</code> (destinatário), <code>exp</code> (expiração), <code>nbf</code> (não vale antes de), <code>iat</code> (emitido em) e <code>jti</code> (identificador). Você pode incluir claims próprias, como <code>name</code>.</p>',
 cmd:'{"sub":"1234","name":"Ana","exp":1893456000}',out:'  →  '+P,
 scene:function(){var N=top('n','a');var cl=[['iss','emissor'],['sub','usuário'],['aud','destinatário'],['exp','expira'],['nbf','vale a partir de'],['iat','emitido em'],['jti','id único']];
  cl.forEach(function(c,i){N.push(X.box('cl'+i,16+(i%4)*174,100+Math.floor(i/4)*64,160,50,c[0],i===3?'a':'n',c[1]))});return N}},
{label:'3. Base64URL',title:'Base64URL é codificação, não criptografia',text:'<p>Qualquer pessoa decodifica o payload: não precisa de chave. Por isso <b>nunca ponha senha ou dado sigiloso</b> em um JWT assinado. A assinatura protege contra <b>alteração</b>, não contra leitura. Para sigilo existe o JWE (token criptografado).</p>',
 cmd:'atob("'+P.slice(0,36)+'...")',out:'  →  {"sub":"1234","name":"Ana","exp":1893456000}',
 scene:function(){return top('n','a').concat([X.box('x1',16,100,320,56,'Base64URL','n','texto ↔ texto, sem chave'),X.box('x2',366,100,320,56,'Criptografia','m','precisa de chave para ler'),X.text('t1',16,200,'Base64URL troca + e / por - e _ e remove o preenchimento "=".','t'),X.text('t2',16,226,'Assinado (JWS) = íntegro. Criptografado (JWE) = sigiloso.','t')])}},
{label:'4. Assinatura',title:'Como a assinatura é calculada',text:'<p>O emissor junta o cabeçalho e o payload já codificados, separados por ponto, e aplica o algoritmo com a chave. O resultado, em Base64URL, é a terceira parte. Sem a chave, ninguém consegue produzir uma assinatura que passe na verificação.</p>',
 cmd:'HMAC_SHA256(base64url(header) + "." + base64url(payload), "segredo")',out:'  →  '+G,
 scene:function(){return top('n','n','a').concat([X.box('e1',16,110,150,50,'header','n','Base64URL'),X.box('e2',186,110,150,50,'payload','n','Base64URL'),X.box('e3',356,110,150,50,'segredo','n','ou chave privada'),
  X.line('l1',91,160,300,220,'a',true),X.line('l2',261,160,330,220,'a',true),X.line('l3',431,160,380,220,'a',true),X.box('e4',240,222,220,50,'HMAC-SHA256','a','assina'),X.line('l4',350,272,350,306,'a',true),X.box('e5',200,308,300,44,'assinatura','d')])}},
{label:'5. Validar',title:'O servidor recalcula e compara',text:'<p>Quem recebe o token refaz o cálculo com a mesma chave (ou usa a chave pública, no caso assimétrico) e compara com a terceira parte. Se bater, o conteúdo é íntegro e veio de quem tem a chave. Depois ainda confere as claims: <code>exp</code> não vencido, <code>iss</code> esperado e <code>aud</code> igual à própria API.</p>',
 scene:function(){return [X.box('v1',16,40,200,56,'token recebido','n','header.payload.assinatura'),X.line('a1',216,68,276,68,'a',true),X.box('v2',280,40,200,56,'recalcula a assinatura','a','com o segredo'),X.line('a2',480,68,540,68,'a',true),X.box('v3',544,40,160,56,'iguais?','a','compara'),
  X.line('a3',624,96,624,150,'a',true),X.box('v4',500,152,204,50,'confere exp, iss, aud','a'),X.line('a4',500,177,440,177,'a',true),X.box('v5',240,152,200,50,'aceito','d','acesso liberado')]}},
{label:'6. Adulteração',title:'Se alguém muda o payload, a assinatura falha',text:'<p>Suponha que o usuário troque <code>"name":"Ana"</code> por <code>"name":"Admin"</code> e reenvie. O payload muda, o servidor recalcula a assinatura e ela <b>não bate</b> com a que veio no token. Sem o segredo, o atacante não consegue gerar uma assinatura nova válida. O token é rejeitado com <code>401</code>.</p>',
 cmd:'{"sub":"1234","name":"Admin","exp":1893456000}',out:'  →  assinatura não confere  →  401',
 scene:function(){return top('n','a','n').concat([X.box('a1',16,110,300,56,'payload alterado','n','"name":"Admin"'),X.line('al',316,138,376,138,'a',true),X.box('a2',380,110,300,56,'assinatura recalculada ≠ original','a','rejeita o token'),X.text('t1',16,222,'A assinatura garante integridade e autenticidade da origem.','t'),X.text('t2',16,248,'Ela não garante sigilo: o conteúdo continua legível.','t')])}},
{label:'7. Resumo',title:'O que decorar para a prova',text:'<p>JWT = <b>cabeçalho.payload.assinatura</b> em Base64URL. Assinatura por <b>HMAC</b> (segredo) ou <b>RSA/ECDSA</b> (par de chaves). Claims: iss, sub, aud, exp, nbf, iat, jti. O payload é <b>legível</b>; sigilo é com JWE. O JWT é um <i>formato</i>; o OAuth 2.0 e o OIDC são protocolos que podem usá-lo.</p>',
 scene:function(){return [X.zone('z',16,16,688,340,'Resumo'),X.box('r1',40,52,300,56,'Partes','a','cabeçalho . payload . assinatura'),X.box('r2',370,52,300,56,'Codificação','n','Base64URL (não é cripto)'),X.box('r3',40,128,300,56,'Assinatura','n','HMAC · RSA · ECDSA'),X.box('r4',370,128,300,56,'Claims','n','iss sub aud exp nbf iat jti'),X.box('r5',40,204,300,56,'Sigilo','n','JWE (token criptografado)'),X.box('r6',370,204,300,56,'Uso','n','ID Token do OIDC · API stateless')]}}
];
K.explain({w:720,h:380,steps:S,alt:'Animação passo a passo da estrutura e validação de um JWT'});
})();
