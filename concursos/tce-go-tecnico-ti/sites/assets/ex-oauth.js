(function(){
var K=window.K,X=K.X;
var LX={U:70,C:250,A:450,R:640};
var NAMES={U:['Usuário','dono do recurso'],C:['App cliente','quer acessar'],A:['Autorização','servidor de tokens'],R:['API','servidor de recursos']};
var MSG=[
 {s:1,f:'U',t:'C',l:'clica em "Entrar"'},
 {s:1,f:'C',t:'A',l:'redireciona: /authorize'},
 {s:2,f:'A',t:'U',l:'tela de login e consentimento'},
 {s:2,f:'U',t:'A',l:'autentica e autoriza'},
 {s:3,f:'A',t:'C',l:'redirect_uri?code=...'},
 {s:4,f:'C',t:'A',l:'POST /token (code + verifier)'},
 {s:4,f:'A',t:'C',l:'access_token (+ id_token)'},
 {s:5,f:'C',t:'R',l:'GET /dados, Bearer token'},
 {s:5,f:'R',t:'C',l:'200 OK + dados'}
];
function build(step,act){
  var N=[],k;
  ['U','C','A','R'].forEach(function(a){
    var on=act.indexOf(a)>=0;
    var nm=NAMES[a];
    N.push(X.box('h'+a,LX[a]-62,10,124,44,nm[0],on?'a':'n',nm[1]));
    N.push(X.line('ll'+a,LX[a],54,LX[a],372,'m'));
  });
  MSG.forEach(function(m,i){
    if(m.s>step)return;
    var y=88+i*30,cur=m.s===step,x1=LX[m.f],x2=LX[m.t];
    var d=x2>x1?-6:6;
    N.push(X.line('m'+i,x1,y,x2+d,y,cur?'a':'',true));
    N.push(X.text('t'+i,(x1+x2)/2,y-6,m.l,cur?'b':'t','middle'));
  });
  return N;
}
var S=[
{label:'0. Papéis',title:'Os quatro papéis do OAuth 2.0',text:'<p>O OAuth 2.0 resolve um problema: <b>dar a um aplicativo acesso limitado a uma API, sem entregar a senha do usuário</b>. Há quatro papéis: o <b>dono do recurso</b> (o usuário), o <b>cliente</b> (o aplicativo), o <b>servidor de autorização</b> (emite tokens) e o <b>servidor de recursos</b> (a API que guarda os dados).</p><p>Vamos seguir o fluxo mais cobrado e mais seguro: <b>Authorization Code</b>, com PKCE.</p>',
 scene:function(){return build(0,['U','C','A','R'])}},
{label:'1. Iniciar',title:'O app manda o usuário ao servidor de autorização',text:'<p>O app redireciona o navegador para o endpoint <code>/authorize</code> com <code>response_type=code</code>, <code>client_id</code>, <code>redirect_uri</code>, <code>scope</code>, um <code>state</code> (anti-CSRF) e, com PKCE, o <code>code_challenge</code>. O pedido do escopo <code>openid</code> transforma o fluxo em <b>OpenID Connect</b>.</p>',
 cmd:'GET /authorize?response_type=code&client_id=app&scope=openid agenda&state=xyz&code_challenge=...',
 scene:function(){return build(1,['U','C','A'])}},
{label:'2. Login',title:'O usuário se autentica e consente',text:'<p>O login acontece <b>no servidor de autorização</b>, nunca no app. O usuário vê quais escopos o app pede (por exemplo, "ler agenda") e aprova ou nega. A senha não passa pelo cliente.</p>',
 scene:function(){return build(2,['U','A'])}},
{label:'3. Código',title:'O servidor devolve um código de autorização',text:'<p>O servidor redireciona o navegador de volta ao <code>redirect_uri</code> do app com um <code>code</code>, de <b>curta duração e uso único</b>, mais o <code>state</code> para conferir. O código ainda não dá acesso à API: é só um "vale" a ser trocado.</p>',
 cmd:'HTTP 302 Location: https://app/callback?code=Z9...&state=xyz',
 scene:function(){return build(3,['C','A'])}},
{label:'4. Token',title:'O app troca o código por tokens, por trás dos panos',text:'<p>O app faz um <code>POST /token</code> direto ao servidor (canal de fundo, sem o navegador) com <code>grant_type=authorization_code</code>, o <code>code</code> e o <code>code_verifier</code> do <b>PKCE</b>. O servidor confere que o verifier bate com o challenge e devolve o <b>access token</b>, às vezes um <b>refresh token</b> e, no OIDC, o <b>ID Token</b>.</p>',
 cmd:'POST /token  grant_type=authorization_code&code=Z9...&code_verifier=...',
 scene:function(){return build(4,['C','A'])}},
{label:'5. API',title:'O app chama a API com o access token',text:'<p>O app envia o access token no cabeçalho <code>Authorization: Bearer ...</code>. A API valida o token (assinatura, validade, escopo) e responde. Se o token expirar, o app usa o <b>refresh token</b> para pedir outro, sem incomodar o usuário.</p>',
 cmd:'GET /dados  Authorization: Bearer eyJ...',
 scene:function(){return build(5,['C','R'])}},
{label:'6. OIDC',title:'O que o OpenID Connect acrescenta',text:'<p>OAuth 2.0 é <b>autorização</b> (o que o app pode fazer). OIDC é <b>autenticação</b> (quem é o usuário): devolve um <b>ID Token</b>, que é um JWT com <code>iss</code> (emissor), <code>sub</code> (identificador do usuário), <code>aud</code> (para quem foi emitido) e <code>exp</code>. O app valida a assinatura e esses campos. O access token é para a API, o ID Token é para o app.</p>',
 scene:function(){var N=build(5,['C','A']);
  return N.concat([X.box('idt',130,338,330,38,'ID Token (JWT)','a','iss, sub, aud, exp, iat, nonce'),X.box('act',470,338,230,38,'Access token','n','para a API (Bearer)')])}},
{label:'7. Pegadinhas',title:'Os quatro tipos de concessão e o que a banca cobra',text:'<p><b>Authorization code</b> (o principal, com PKCE), <b>implicit</b> e <b>resource owner password credentials</b> (ambos desaconselhados hoje) e <b>client credentials</b> (aplicação com aplicação, sem usuário). Foi a questão 30 do TRT-22 de 2022. Lembre ainda: o <code>state</code> evita CSRF, o PKCE evita o roubo do código, e JWT é um <i>formato</i> de token, não um protocolo.</p>',
 scene:function(){return [X.zone('z',16,16,688,350,'Concessões (grant types) do OAuth 2.0'),
  X.box('g1',40,52,310,64,'Authorization code','a','usuário + app web ou mobile · use com PKCE'),
  X.box('g2',370,52,310,64,'Client credentials','n','máquina com máquina · sem usuário'),
  X.box('g3',40,136,310,64,'Implicit','m','token direto na URL · desaconselhado'),
  X.box('g4',370,136,310,64,'Resource owner password','m','app recebe a senha · desaconselhado'),
  X.text('q1',40,236,'Refresh token: obtém novo access token sem novo login.','t'),
  X.text('q2',40,262,'Escopo (scope): limita o que o token permite fazer.','t'),
  X.text('q3',40,288,'PKCE: o app prova que é quem iniciou o fluxo (verifier).','t'),
  X.text('q4',40,314,'OIDC: acrescenta o ID Token (autenticação) ao OAuth 2.0.','t')]}}
];
K.explain({w:720,h:380,steps:S,alt:'Animação do fluxo Authorization Code do OAuth 2.0 com OpenID Connect'});
})();
