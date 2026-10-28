# Questões reais e autorais com gabarito comentado

43 questões: 31 reais, todas da FCC (Técnico e Analista Judiciário de TI do TRT-1, TRT-2, TRT-4, TRT-5, TRT-14, TRT-22 e TRT-23, e a prova do próprio TCE-GO de 2009 para Técnico de Controle Externo, TI), e 12 AUTORAIS, marcadas como tal no título de cada uma ("AUTORAL (não é de prova real)"). As questões reais trazem a banca, o órgão, o ano e o número; os enunciados e as alternativas foram conferidos nos PDFs das provas e o gabarito é o do PDF de gabaritos da FCC (tipo 1), todos obtidos nos agregadores estudegratis.com.br e eticaconcursos.com.br e não no site da FCC ( para o TRT-4 2022 o PDF é uma imagem e a letra foi conferida visualmente); não foi verificada a existência de recursos ou de anulações posteriores. Não há entre as provas disponíveis nenhuma questão real da FCC sobre o OWASP Top 10:2025, sobre contêineres ou sobre IAM de nuvem: esses temas são cobertos por questões autorais, que o título marca como tais. Por assunto, as reais são: princípios, riscos e incidentes 5, controle de acesso e IAM 2, criptografia, hash e assinatura 4, PKI, certificados e TLS 3, aplicações, OWASP e DevSecOps 2, backup e continuidade 3, malware, ataques e engenharia social 5, firewall, IDS/IPS e testes de invasão 4, e Zero Trust e normas ISO 27000 3. Nenhuma das questões reais incluídas é do formato Certo ou Errado. Só as questões autorais são originais; as resoluções, reais ou autorais, são próprias, e as normas ISO e NIST citadas nos comentários vêm de fontes públicas e das próprias provas (o texto das normas pagas não foi lido).

## Fontes das provas

- FCC, TRT-14 (RO/AC) 2022, Técnico Judiciário, Tecnologia da Informação, caderno F06 tipo 1
- FCC, TRT-22 (PI) 2022, Técnico Judiciário, Tecnologia da Informação, caderno K11 tipo 1
- FCC, TRT-5 (BA) 2022, Técnico Judiciário, Tecnologia da Informação, caderno T20 tipo 1
- FCC, TRT-23 (MT) 2022, Técnico Judiciário, Tecnologia da Informação, caderno T18 tipo 1
- FCC, TRT-4 (RS) 2022, Técnico Judiciário, Apoio Especializado, Tecnologia da Informação, caderno T17 tipo 1 (gabarito conferido visualmente no PDF, que é imagem)
- FCC, TRT-1 (RJ) 2014, Técnico Judiciário, Tecnologia da Informação, caderno C03 tipo 1
- FCC, TRT-2 (SP) 2014, Técnico Judiciário, Tecnologia da Informação, caderno M13 tipo 1
- FCC, TCE-GO 2009, Técnico de Controle Externo, Tecnologia da Informação, caderno N14 tipo 1
- FCC, TRT-14 (RO/AC) 2022, Analista Judiciário, Tecnologia da Informação, caderno D04 tipo 1
- FCC, TRT-22 (PI) 2022, Analista Judiciário, Tecnologia da Informação, caderno G07 tipo 1
- FCC, TRT-5 (BA) 2022, Analista Judiciário, Tecnologia da Informação, caderno N14 tipo 1
- Autoral, Questão autoral do curso, no estilo da FCC, baseada nos laboratórios do módulo

## Questão 1 (Princípios, riscos e incidentes) - FCC, TRT-22 (PI) 2022, Analista Judiciário, questão 60

Considere que uma pessoa, detentora de um segredo:

I. Garante que ele está conforme seu conteúdo original estabelecido e que assim se manterá enquanto existir.

II. Garante a um grupo de pessoas que elas podem acessá-lo sempre que quiserem, desde que autorizadas por ela.

III. Autoriza somente um grupo de pessoas a acessá-lo em um determinado local.

No contexto de segurança da informação, as considerações I, II e III são, correta e respectivamente, correspondentes aos princípios de

A) integridade, não repúdio e disponibilidade.
B) autenticidade, não repúdio e confidencialidade.
C) autenticidade, disponibilidade e autoridade.
D) integridade, disponibilidade e confidencialidade.
E) não repúdio, autenticidade e autoridade.

**Gabarito: D.** I é integridade (o conteúdo permanece como o original); II é disponibilidade (acesso quando quiserem, desde que autorizados); III é confidencialidade (só o grupo autorizado acessa). Os outros princípios do edital completam o quadro: autenticidade garante a origem e não repúdio impede que o autor negue a autoria; &quot;autoridade&quot; não é princípio clássico (C e E). No laboratório L3, o AES-GCM mostrou os dois lados juntos: cifrar protege a confidencialidade e a etiqueta de autenticação (tag) detecta alteração, ou seja, protege a integridade.

## Questão 2 (Princípios, riscos e incidentes) - FCC, TCE-GO 2009, Técnico de Controle Externo, questão 52

Em Segurança da Informação, a propriedade relacionada à precisão da informação e sua validade, segundo os padrões e expectativas estabelecidos, está associada ao princípio da

A) disponibilidade.
B) publicidade.
C) confidencialidade.
D) integridade.
E) conformidade.

**Gabarito: D.** Precisão e validade da informação, de acordo com o esperado, é a definição de integridade. Disponibilidade é ter a informação quando preciso; confidencialidade é limitar o acesso a quem está autorizado. &quot;Publicidade&quot; e &quot;conformidade&quot; não são princípios do tripé CIA. Esta é uma questão da própria prova do TCE-GO de 2009 (Técnico de Controle Externo, TI). No laboratório L1, trocar um único bit de uma mensagem mudou 135 dos 256 bits do SHA-256: é assim que se detecta perda de integridade.

## Questão 3 (Princípios, riscos e incidentes) - FCC, TRT-22 (PI) 2022, Técnico Judiciário, questão 34

Um Técnico detectou um evento de segurança da informação em sua organização. Nesse caso, segundo a norma ABNT NBR ISO/IEC 27035-3:2021, ele deve levar essa informação ao conhecimento da função organizacional que tem como objetivo assegurar que o evento seja relatado o mais rápido possível para ser tratado com eficiência. Essa função organizacional é conhecida como

A) Incident Response Team (IRT).
B) Central de Serviços.
C) Central de Suporte ao Usuário.
D) Ponto de Contato (PoC).
E) Incident Response Center (IRC).

**Gabarito: D.** Na família ISO/IEC 27035, quem recebe o relato de um evento de segurança e o encaminha para tratamento é o Ponto de Contato (PoC). A equipe de resposta a incidentes (IRT) entra depois, quando o evento é avaliado e classificado como incidente. Não confunda evento (ocorrência observada) com incidente (evento com impacto, que exige resposta). Central de serviços e de suporte atendem a TI em geral, e &quot;IRC&quot; não é a função descrita.

## Questão 4 (Princípios, riscos e incidentes) - FCC, TRT-4 (RS) 2022, Técnico Judiciário, questão 36

Considere as ferramentas de:

I. detecção e prevenção de intrusões (IDS e IPS).

II. segurança de terminais, como softwares antivírus.

III. contenção de ataques como o metasploit framework.

IV. análise de logs de segurança e sistemas de gestão de informações e eventos de segurança (SIEM).

Segundo a norma ABNT NBR 27035-3:2021, os eventos de segurança da informação podem ser detectados internamente por uma pessoa ou pelas ferramentas indicadas APENAS em

A) I e II.
B) I, II e IV.
C) I, II e III.
D) III e IV.
E) II, III e IV.

**Gabarito: B.** IDS/IPS (I), antivírus e proteção de terminais (II) e a análise de logs com SIEM (IV) são ferramentas de detecção. O item III está errado: o Metasploit Framework é uma ferramenta de exploração e teste de invasão, usada por quem ataca ou por quem faz pentest, e não uma ferramenta de contenção. Por isso a resposta é I, II e IV. No laboratório L9, uma regra de limiar sobre o log (10 falhas em 60 s) disparou o alerta contra o IP que fez 30 tentativas, que é a lógica que um SIEM ou IDS aplica em escala.

## Questão 5 (Princípios, riscos e incidentes) - FCC, TRT-22 (PI) 2022, Analista Judiciário, questão 39

Com relação ao monitoramento e defesa da rede, o CIS Controls v8 indica como medida de segurança a centralização dos alertas de eventos de segurança em ativos corporativos para correlação e análise de log. Indica como melhor prática o uso de um recurso que inclui alertas de correlação de eventos definidos pelo fornecedor. Esse recurso é conhecido como

A) Log Application Firewall (LAF).
B) Network Intrusion Detection System (NIDS).
C) Security Information and Event Management (SIEM).
D) Endpoint Detection and Response (EDR).
E) Network Intrusion Prevention System (NIPS).

**Gabarito: C.** Centralizar logs de várias fontes e correlacionar eventos para gerar alertas é a função do SIEM. NIDS e NIPS observam o tráfego de rede; EDR observa e responde em estações e servidores (terminais); &quot;LAF&quot; não é uma tecnologia reconhecida.

## Questão 6 (Princípios, riscos e incidentes) - AUTORAL (não é de prova real)

Uma empresa avalia um ativo que vale R$ 200.000. Um incidente que o atinja causa perda de 30% do valor e é esperado 2 vezes por ano. Considerando a análise quantitativa de risco, a perda anual esperada (ALE) é de

A) R$ 60.000.
B) R$ 120.000.
C) R$ 240.000.
D) R$ 400.000.
E) R$ 12.000.

**Gabarito: B.** SLE = AV × EF = 200.000 × 0,30 = R$ 60.000 por ocorrência. ALE = SLE × ARO = 60.000 × 2 = R$ 120.000 por ano. A opção A para no SLE; C e D usam o valor errado ou somam, e E erra a ordem de grandeza. O laboratório L10 conferiu a mesma fórmula em Python e em JavaScript, com este caso. Um controle só vale a pena se reduzir o ALE em mais do que custa por ano (L9).

## Questão 7 (Controle de acesso e IAM) - FCC, TRT-22 (PI) 2022, Técnico Judiciário, questão 45

Para transmitir informações com segurança entre as partes como objetos JSON, um Técnico optou por utilizar JSON Web Tokens (JWTs), que podem ser assinados utilizando um segredo (com o algoritmo HMAC) ou um par de chaves pública/privada usando normalmente os algoritmos

A) IDEA ou RSA.
B) RSA ou ECDSA.
C) DES ou RSA.
D) MD5 ou PGP.
E) AES ou DES.

**Gabarito: B.** JWT assinado com par de chaves usa algoritmos de assinatura assimétrica: RSA (RS256) ou ECDSA (ES256). IDEA, DES e AES são cifras simétricas; MD5 é função de hash; PGP é um sistema de criptografia, não um algoritmo de assinatura de JWT. No laboratório L7, o JWT HS256 foi montado à mão: o payload é só Base64url (qualquer um lê), a assinatura impede a alteração, e um verificador ingênuo que aceita alg: none concedeu o papel de administrador a um token forjado.

## Questão 8 (Controle de acesso e IAM) - FCC, TRT-22 (PI) 2022, Analista Judiciário, questão 30

Considere a situação abaixo.

Carlos abre um aplicativo no qual são oferecidas 3 formas de acesso à plataforma: com Google, com Facebook e com E-mail. Carlos clica na opção “Acessar com Google”. O aplicativo faz uma requisição ao Google Accounts, pedindo uma chave de acesso para consumir um recurso protegido. Quando o Google Accounts recebe o pedido de autorização para acessar um recurso protegido, inicia-se o processo de identificação e autenticação. Surge a tela do Google para Carlos digitar seu e-mail (@gmail.com), seguida da tela (do Google) para Carlos digitar a senha. Nesse passo, Carlos identifica-se, autentica-se e consente que o aplicativo acesse os recursos protegidos em seu nome. Então, o Google Accounts emite um access token (chave de acesso) para o aplicativo, que poderá acessar os recursos protegidos.

Nessa situação, que ilustra o funcionamento inicial do OAuth2 (RFC 6749), o Google Accounts é o I, Carlos é o II e o aplicativo é o III.

Os roles que preenchem, correta e respectivamente, as lacunas I, II e III são:

A) Resource Server − Grant Owner − Protected Resource
B) Authorization Server − Client − Protected Resource
C) Resource Server − Grant Owner − Client
D) Request Server − Client − Resource Owner
E) Authorization Server − Resource Owner − Client

**Gabarito: E.** Os quatro papéis do OAuth 2.0 (RFC 6749) são: Resource Owner (o dono dos dados, que consente: Carlos), Client (a aplicação que pede acesso: o aplicativo), Authorization Server (autentica o dono e emite o access token: Google Accounts) e Resource Server (guarda o recurso protegido e aceita o token). &quot;Grant Owner&quot;, &quot;Protected Resource&quot; como papel e &quot;Request Server&quot; não existem como papéis. Lembre: OAuth 2.0 é autorização delegada; quem prova a identidade do usuário nesse fluxo é o OpenID Connect, camada sobre o OAuth.

## Questão 9 (Controle de acesso e IAM) - AUTORAL (não é de prova real)

Um sistema exige, para entrar, a senha do usuário e um código de 6 dígitos gerado por um aplicativo no celular, que muda a cada 30 segundos (TOTP, RFC 6238). Quanto aos fatores de autenticação, é correto afirmar que

A) são dois fatores do mesmo tipo: conhecimento.
B) são dois fatores diferentes: algo que se sabe e algo que se possui.
C) é um único fator, pois os dois são digitados.
D) são dois fatores: algo que se é e algo que se sabe.
E) não é autenticação multifator, pois o código é temporário.

**Gabarito: B.** A senha é conhecimento (algo que se sabe) e o código TOTP prova a posse do dispositivo que guarda o segredo compartilhado (algo que se tem). Senha + pergunta secreta seriam dois fatores de conhecimento, ou seja, não é MFA de verdade. Biometria seria o fator &quot;algo que se é&quot;. No laboratório L7, os vetores do RFC 4226 (HOTP) e RFC 6238 (TOTP) foram reproduzidos, e o limite de 5 tentativas deixou a chance de adivinhar o código em 5×10^-6.

## Questão 10 (Criptografia, hash e assinatura) - FCC, TRT-22 (PI) 2022, Técnico Judiciário, questão 60

Um Técnico pretende usar o RSA em sua aplicação, que é um algoritmo de criptografia

A) assimétrica, cujo tamanho de chave não supera 1024 bits.
B) simétrica, cujo tamanho de chave pode superar 1024 Kbits.
C) assimétrica, cujo tamanho de chave pode superar 1024 bits.
D) simétrica, cujo tamanho de chave não supera 512 Mbits.
E) simétrica, cujo tamanho de chave varia entre 256 e 2048 bits.

**Gabarito: C.** RSA é assimétrico (par de chaves pública e privada) e o módulo pode ter 2048, 3072, 4096 bits ou mais; 1024 bits é o piso histórico, hoje considerado fraco. No laboratório L4, a biblioteca gerou módulos RSA de 1024, 2048 e 3072 bits. As alternativas que chamam o RSA de simétrico (B, D e E) erram a classificação.

## Questão 11 (Criptografia, hash e assinatura) - FCC, TRT-14 (RO/AC) 2022, Técnico Judiciário, questão 57

Sobre a criptografia simétrica e assimétrica, considere as afirmações a seguir.

I. Na criptografia simétrica, são utilizadas duas chaves, uma pública e a outra privada.

II. Os algoritmos de criptografia assimétricos exigem maior poder de processamento, sendo mais lentos comparados aos de criptografia simétricos.

III. A criptografia simétrica é utilizada, principalmente, para distribuir a chave pública de sessão.

IV. Ambos os mecanismos podem ser utilizados para garantir a autenticidade de quem envia a mensagem.

Está correto o que se afirma APENAS em

A) II.
B) IV.
C) I e II.
D) III e IV.
E) II, III e IV.

**Gabarito: A.** Só o item II está certo: a assimétrica é bem mais lenta (no L4, o AES-GCM cifrou 1.000.000 de bytes em 0,9 ms nesta execução, tempo que varia, enquanto o RSA só cifra 190 bytes por operação com OAEP-SHA256 em chave de 2048 bits). I descreve a assimétrica (a simétrica usa uma chave). III inverte o papel: é a assimétrica que protege a distribuição da chave de sessão, que é simétrica (envelope híbrido do L4). IV foi dado como errado pelo gabarito oficial: a autenticidade de origem com valor perante terceiros vem da assinatura com chave privada; com chave simétrica compartilhada, qualquer das duas partes poderia ter gerado a mensagem (o HMAC do L1 autentica entre as partes, mas não prova autoria a um terceiro). Item discutível na doutrina, mas o gabarito é A.

## Questão 12 (Criptografia, hash e assinatura) - FCC, TRT-23 (MT) 2022, Técnico Judiciário, questão 33

O algoritmo

A) SHA-1 gera um hash de 160 bits que, em hexadecimal, é um número com 40 dígitos. Se submetemos a palavra Tribunal ou um texto de 1600 caracteres, o algoritmo SHA-1 gera um hash criptográfico de 40 dígitos hexadecimal para ambos.
B) SHA-512 gera hashes calculados com 8 palavras de 32 bits.
C) SHA-256 retorna um valor de hash de 256 bits ou 32 dígitos hexadecimais, sendo muito mais seguro que o MD5 ou o SHA-1. Além disso, um hash SHA-256 é cerca de 30% mais rápido para calcular os hashes do que o SHA-1.
D) de criptografia assimétrica AES é capaz de usar chaves criptográficas de 128 e 256 bits para criptografar e descriptografar dados em blocos de 64 bits.
E) de criptografia simétrica RSA utiliza números de 1024 bits, gerando 2^1024 possibilidades, sendo o mais seguro para comunicação pela internet.

**Gabarito: A.** A saída do hash tem tamanho fixo independentemente da entrada: SHA-1 = 160 bits = 40 dígitos hexadecimais (A). No laboratório L1, uma palavra de 8 caracteres e um texto de 1600 caracteres geraram digests de 160 bits (40 hex) no SHA-1 e de 256 bits (64 hex) no SHA-256. Erros: SHA-512 usa 8 palavras de 64 bits (B); SHA-256 tem 64 dígitos hexadecimais (256/4) e não é mais rápido que o SHA-1 (C); AES é simétrico e trabalha em blocos de 128 bits (D); RSA é assimétrico (E).

## Questão 13 (Criptografia, hash e assinatura) - FCC, TRT-4 (RS) 2022, Técnico Judiciário, questão 34

Alice criptografa o documento com sua chave privada, calcula o hash do documento e envia para Bob. Se o hash do documento recebido por Bob for diferente do hash do documento original gerado por Alice, significa que o documento

A) se autodestruirá ao ser aberto.
B) não poderá ser descriptografado.
C) perdeu a integridade.
D) perdeu a disponibilidade.
E) terá hashes de tamanhos diferentes.

**Gabarito: C.** Hash diferente do original indica que o conteúdo foi alterado: perda de integridade. O tamanho do hash não muda (E), pois depende do algoritmo, e o hash não tem relação com disponibilidade (D). No laboratório L4, alterar 1 byte do documento tornou inválida a assinatura RSA-PSS, que é justamente &quot;hash do documento + chave privada&quot;.

## Questão 14 (Criptografia, hash e assinatura) - AUTORAL (não é de prova real)

Uma aplicação grava senhas de usuários e precisa resistir a vazamentos do banco de dados. A melhor prática, entre as abaixo, é

A) guardar o SHA-256 simples da senha, sem sal.
B) guardar a senha cifrada com AES e a chave no mesmo banco.
C) guardar a senha em Base64, que é irreversível.
D) guardar o hash com função lenta própria para senhas (PBKDF2, scrypt, bcrypt ou Argon2) e sal único por usuário.
E) guardar o MD5 da senha, com o nome do usuário concatenado.

**Gabarito: D.** Senhas devem ser guardadas com hash lento, com sal único por usuário. No laboratório L2, dois usuários com a senha &quot;123456&quot; tiveram o mesmo SHA-256 sem sal e um ataque de dicionário recuperou &quot;senha123&quot;; com sal, os hashes PBKDF2 ficaram diferentes. Um SHA-256 simples faz cerca de milhões de tentativas por segundo, enquanto o PBKDF2 com 600.000 iterações fez cerca de 10 por segundo (medições desta máquina, que variam). Base64 é só codificação e é reversível (C); cifra com a chave no mesmo banco não protege contra o vazamento (B); MD5 é fraco (E).

## Questão 15 (PKI, certificados e TLS) - FCC, TRT-5 (BA) 2022, Técnico Judiciário, questão 47

O certificado digital do tipo A1

A) tem validade máxima de 12 meses.
B) é armazenado em uma mídia, como cartão ou token.
C) utiliza senha obrigatória e tem validade máxima de 36 meses.
D) só pode ser adquirido por pessoa física.
E) não pode ser copiado e instalado em outro computador.

**Gabarito: A.** No padrão ICP-Brasil, o certificado A1 é gerado e guardado por software (no computador ou navegador), vale por 1 ano (12 meses) e pode ser copiado e instalado em outro equipamento. Mídia física (cartão ou token) e impossibilidade de cópia descrevem o A3 (B e E). Tanto pessoa física quanto jurídica podem ter certificados (D). A validade de 36 meses (C) não é a do A1. Veja a cadeia de certificação no laboratório L5.

## Questão 16 (PKI, certificados e TLS) - FCC, TRT-5 (BA) 2022, Analista Judiciário, questão 48

Um analista entrou em um site e desejava saber se este utilizava conexão segura. Para isto clicou em um ícone de cadeado ao lado da URL no navegador, a partir do qual obteve informações sobre

A) a assinatura digital, tais como chave pública, chave privada e autorização de acesso.
B) o certificado digital, tais como chave secreta, hash público e período de validade.
C) o certificado digital, tais como emissão (para e por quem), período de validade e assinaturas digitais.
D) a assinatura eletrônica, tais como assinaturas digitais, contraprova e autorização de acesso.
E) o hash criptográfico, tais como validade do certificado digital, redirecionamentos seguros e hash público.

**Gabarito: C.** O cadeado exibe o certificado digital X.509 do site: para quem foi emitido, por qual autoridade certificadora, período de validade e as assinaturas da cadeia. A chave privada nunca aparece (A) e não existe &quot;chave secreta&quot; ou &quot;hash público&quot; no certificado (B e E). No laboratório L5, os mesmos campos (subject, issuer, notBefore/notAfter, SAN) foram lidos com openssl x509.

## Questão 17 (PKI, certificados e TLS) - FCC, TRT-14 (RO/AC) 2022, Analista Judiciário, questão 56

Sobre o protocolo TLS,

A) está localizado na camada de Transporte do modelo TCP/IP.
B) utiliza apenas o algoritmo MAC para autenticação de mensagens.
C) é composto pelos protocolos de Handshaking e pelo Protocolo de Registro.
D) suporta os conjuntos de criptografia Fortezza/DMS.
E) a mensagem de alerta “Nenhum certificado” está incluída no TLS.

**Gabarito: C.** O TLS tem duas camadas: os protocolos de handshake (negociação de versão e cifras, autenticação por certificado e acordo de chaves) e o Protocolo de Registro (Record), que fragmenta, protege e transmite os dados. O TLS fica acima do TCP, entre o transporte e a aplicação (A está errada), e o Fortezza/DMS e o alerta &quot;no certificate&quot; pertencem ao SSL 3.0 (D e E). No laboratório L5, o handshake local negociou TLSv1.3 com a cifra TLS_AES_256_GCM_SHA384 e falhou, de propósito, com CA desconhecida e com nome divergente.

## Questão 18 (PKI, certificados e TLS) - AUTORAL (não é de prova real)

Ao acessar <code>https://sistema.local</code>, um cliente TLS recusa a conexão com o erro <code>Hostname mismatch</code>, embora a cadeia de certificação seja confiável e o certificado esteja dentro da validade. A causa mais provável é que

A) a autoridade certificadora raiz não consta no repositório de confiança do cliente.
B) o certificado expirou.
C) o nome acessado não consta no CN/SAN do certificado apresentado pelo servidor.
D) o certificado foi revogado e consta na CRL.
E) a assinatura do certificado foi adulterada.

**Gabarito: C.** O cliente confere três coisas independentes: (1) a cadeia até uma AC confiável, (2) a validade e a revogação, (3) se o nome acessado está no SAN (ou CN) do certificado. Aqui, cadeia e validade estão ok; falha o nome. No laboratório L5, cada uma dessas falhas gerou um erro diferente do OpenSSL: *unable to get local issuer certificate* (AC desconhecida), *certificate has expired*, *certificate revoked*, *certificate signature failure* e, no teste TLS em Python, o erro de nome de host (código 62).

## Questão 19 (Aplicações, OWASP e DevSecOps) - FCC, TRT-4 (RS) 2022, Técnico Judiciário, questão 39

O NIST Secure Software Development Framework (SSDF) versão 1.1 define práticas recomendadas fundamentais para o desenvolvimento de software seguro e organiza estas práticas em quatro grupos: Preparar a Organização (PO), Proteger o Software (PS), Produzir Software Bem Protegido (PW) e

A) Responder a Vulnerabilidades (RV).
B) Revisar o Projeto de Software (RD).
C) Verificar a Conformidade do Software (VP).
D) Verificar os Requisitos de Segurança (VS).
E) Mitigar os Riscos de Segurança (MR).

**Gabarito: A.** Os quatro grupos do SSDF (NIST SP 800-218) são PO, PS, PW e RV: Prepare the Organization, Protect the Software, Produce Well-Secured Software e Respond to Vulnerabilities. É o núcleo do que o edital chama de boas práticas de codificação segura e DevSecOps: segurança desde o requisito, no código, nos testes e na resposta a vulnerabilidades depois da entrega.

## Questão 20 (Aplicações, OWASP e DevSecOps) - FCC, TRT-14 (RO/AC) 2022, Técnico Judiciário, questão 56

A solução de segurança intermediária, entre um servidor de aplicação web e o usuário externo, capaz de analisar e restringir o tráfego com base no comportamento e lógica da requisição e resposta contida no cabeçalho da camada de aplicação é o

A) IDS
B) WAF
C) IPS
D) NAC
E) Antivírus

**Gabarito: B.** O WAF (Web Application Firewall) entende HTTP/HTTPS e filtra requisições e respostas na camada 7, bloqueando padrões como injeção de SQL e XSS. IDS só detecta e alerta; IPS bloqueia mas trabalha sobre assinaturas e anomalias de rede em geral; NAC controla a admissão de dispositivos na rede; antivírus protege o terminal. Os ataques que o WAF mitiga são os mesmos do laboratório L6 (injeção de SQL, XSS e travessia de diretório). A defesa de fundo continua sendo o código seguro: o WAF é uma camada a mais, não um substituto.

## Questão 21 (Aplicações, OWASP e DevSecOps) - AUTORAL (não é de prova real)

Em um sistema de processos, um usuário autenticado altera na URL o número do processo <code>/processo/123</code> para <code>/processo/124</code> e consegue ver os dados de outro setor, sem ter permissão. Segundo o OWASP Top 10:2025, a categoria dessa falha é

A) A01:2025 Broken Access Control.
B) A04:2025 Cryptographic Failures.
C) A05:2025 Injection.
D) A07:2025 Authentication Failures.
E) A09:2025 Security Logging and Alerting Failures.

**Gabarito: A.** O usuário está autenticado, mas o sistema não verifica se ele é autorizado a acessar aquele objeto: é Broken Access Control (A01:2025), que inclui o IDOR (referência direta insegura a objeto) e a travessia de diretório. A autenticação (A07) trata de provar quem é o usuário; aqui o problema é a autorização. No laboratório L6, o ../segredo.txt foi lido pela versão vulnerável e barrado pela segura, com validação do caminho (também A01). Lista 2025: A01 Broken Access Control, A02 Security Misconfiguration, A03 Software Supply Chain Failures, A04 Cryptographic Failures, A05 Injection, A06 Insecure Design, A07 Authentication Failures, A08 Software or Data Integrity Failures, A09 Security Logging and Alerting Failures, A10 Mishandling of Exceptional Conditions.

## Questão 22 (Aplicações, OWASP e DevSecOps) - AUTORAL (não é de prova real)

Um desenvolvedor monta uma consulta SQL concatenando diretamente o texto digitado pelo usuário à cláusula WHERE e a executa sem tratamento. A defesa principal contra a falha e a categoria do OWASP Top 10:2025 são, respectivamente,

A) escapar apenas aspas duplas; A02 Security Misconfiguration.
B) consultas parametrizadas (prepared statements); A05 Injection.
C) bloquear o IP do atacante; A07 Authentication Failures.
D) cifrar a coluna nome; A04 Cryptographic Failures.
E) aumentar o tempo de resposta; A10 Mishandling of Exceptional Conditions.

**Gabarito: B.** Concatenar entrada do usuário na consulta é injeção de SQL, categoria A05:2025 Injection. A defesa principal é separar código e dados com consultas parametrizadas, com privilégio mínimo para a conta do banco e validação como reforço. No laboratório L6, a entrada ' OR '1'='1 retornou todos os usuários e admin'-- entrou como admin; a versão parametrizada negou os dois. Um WAF ajuda, mas não substitui o código seguro.

## Questão 23 (Aplicações, OWASP e DevSecOps) - AUTORAL (não é de prova real)

Uma equipe inclui no pipeline de CI/CD uma ferramenta que analisa o código-fonte e o conjunto de dependências em busca de padrões inseguros e bibliotecas com vulnerabilidades conhecidas, sem executar a aplicação. Esse tipo de análise é conhecido como

A) DAST e teste de penetração, respectivamente.
B) SAST (código) e SCA (dependências).
C) fuzzing e DAST.
D) monitoramento em produção (RASP) apenas.
E) teste de carga.

**Gabarito: B.** SAST (Static Application Security Testing) analisa o código-fonte sem executá-lo; SCA (Software Composition Analysis) olha as dependências e suas vulnerabilidades conhecidas e também ajuda no OWASP A03:2025 (cadeia de suprimentos de software). DAST testa a aplicação em execução, como atacante externo. No DevSecOps, a ideia é &quot;deslocar para a esquerda&quot; (shift left): rodar essas verificações a cada commit, e não só no final.

## Questão 24 (Aplicações, OWASP e DevSecOps) - AUTORAL (não é de prova real)

Uma equipe empacota uma aplicação em contêiner. Entre as práticas abaixo, a que MAIS reduz o risco é

A) executar o processo como root para evitar erros de permissão e guardar a senha do banco na imagem.
B) usar a imagem mais recente com a tag latest e executar em modo privilegiado.
C) montar o socket do Docker no contêiner para facilitar a automação.
D) usar uma imagem base mínima de origem confiável, escanear as dependências, executar como usuário sem privilégio e passar segredos em tempo de execução, não na imagem.
E) abrir todas as portas do contêiner para facilitar a depuração.

**Gabarito: D.** Práticas de endurecimento: imagem mínima e confiável, verificação de vulnerabilidades (SCA/scan de imagem), usuário não root, sistema de arquivos somente leitura quando possível, sem segredos na imagem (qualquer um que puxe a imagem os lê) e menor número possível de portas e capacidades. Modo privilegiado e montar o socket do Docker equivalem a entregar o host ao contêiner. Observação: este módulo não executou práticas de hardening de contêineres (não testado).

## Questão 25 (Aplicações, OWASP e DevSecOps) - AUTORAL (não é de prova real)

Uma prefeitura contrata um serviço de máquinas virtuais em nuvem (IaaS). Pelo modelo de responsabilidade compartilhada, a responsabilidade pela aplicação de correções de segurança no sistema operacional da máquina virtual e pela configuração das regras de acesso à rede da instância é

A) exclusivamente do provedor de nuvem.
B) do contratante (cliente).
C) do fabricante do hardware.
D) do provedor de internet do cliente.
E) dividida igualmente e sem distinção, pois a nuvem é gerenciada.

**Gabarito: B.** Em IaaS, o provedor cuida da infraestrutura física, do virtualizador e da rede base; o cliente cuida do sistema operacional convidado (patches), das regras de firewall/grupos de segurança, das identidades e acessos (IAM) e dos dados. Quanto mais gerenciado é o serviço (PaaS e SaaS), mais o provedor assume, mas dados e identidades continuam sendo do cliente. Observação: não foi usado serviço de nuvem real neste módulo (não testado).

## Questão 26 (Backup e continuidade) - FCC, TRT-1 (RJ) 2014, Técnico Judiciário, questão 38

Um usuário deseja implantar um sistema de backup que apresente um tempo de restauração menor que outras técnicas, mesmo que para isso seja necessário utilizar um maior espaço de armazenamento. Dentre os tipos usuais de backup praticados, o mais recomendado para esse caso é o

A) completo.
B) diferencial.
C) incremental.
D) semidiferencial.
E) semi-incremental.

**Gabarito: B.** O enunciado pede restauração mais rápida com mais espaço, e isso descreve o backup diferencial: guarda tudo o que mudou desde o último completo, então a restauração usa só 2 conjuntos (completo + último diferencial). O incremental ocupa menos espaço, mas exige a cadeia inteira. Nuance: o completo também restaura rápido, mas é ele que mais consome espaço e tempo de backup; a banca escolheu o diferencial como o &quot;meio-termo&quot;. No laboratório L8, no dia 3: o diferencial guardou 5 arquivos e o incremental, 2; restaurar exigiu 2 conjuntos no diferencial e 4 no incremental.

## Questão 27 (Backup e continuidade) - FCC, TRT-22 (PI) 2022, Técnico Judiciário, questão 35

Para implementar, manter e melhorar continuamente a eficácia do Sistema de Gestão de Continuidade de Negócios de uma organização, a norma ABNT NBR ISO 22301:2020 adota

A) o ciclo Plan, Do, Check e Act (PDCA).
B) a análise SWOT.
C) o método 3M (Modificar, Melhorar e Manter).
D) a metodologia Six Sigma.
E) a abordagem DevOps.

**Gabarito: A.** A ISO 22301 (Sistema de Gestão de Continuidade de Negócios, SGCN) usa o ciclo PDCA (Plan, Do, Check, Act), como as demais normas de sistemas de gestão da ISO, inclusive a ISO/IEC 27001. SWOT, 3M, Six Sigma e DevOps não são o modelo adotado pela norma.

## Questão 28 (Backup e continuidade) - FCC, TRT-4 (RS) 2022, Técnico Judiciário, questão 37

Segundo a norma ABNT NBR 22301:2020, cada Plano de Continuidade de Negócio deve incluir: seu propósito, escopo e objetivo; os papéis e responsabilidades da equipe que implementará o plano; ações para implementar as soluções; informações necessárias para ativar, operar, coordenar e se comunicar com as ações da equipe; as interdependências internas e externas; requisitos de relatórios; um processo de evacuação e

A) a política de segurança da organização.
B) as ações de automelhoria.
C) os recursos necessários.
D) a análise de riscos de segurança da informação.
E) o termo de comprometimento da direção.

**Gabarito: C.** A lista da norma para o plano de continuidade termina com o processo de evacuação e os recursos necessários (pessoas, instalações, tecnologia, informação, fornecedores). Política de segurança, análise de riscos e comprometimento da direção são outros documentos do sistema de gestão, não o conteúdo do plano. Para o plano funcionar, ele precisa de metas de recuperação (RTO e RPO) vindas da análise de impacto no negócio (BIA); veja o laboratório L8.

## Questão 29 (Backup e continuidade) - AUTORAL (não é de prova real)

Uma organização exige RPO de 4 horas e RTO de 2 horas para seu sistema de protocolo. A estratégia de backup atual faz uma cópia completa todas as noites. Sobre essa situação, é correto afirmar que

A) o RPO está atendido, pois a cópia noturna garante a recuperação completa.
B) o RPO não está atendido: em um incidente à tarde, a perda de dados pode chegar a cerca de 24 horas.
C) o RTO é definido pela frequência de backup, e não pelo tempo de restauração.
D) o RPO é o tempo máximo de indisponibilidade tolerado, e por isso está atendido.
E) o RTO e o RPO se referem à mesma grandeza e só mudam de nome.

**Gabarito: B.** O RPO (Recovery Point Objective) é a quantidade máxima de dados que se admite perder, medida em tempo; ele define a frequência das cópias. Com backup só à noite, o pior caso perde quase 24 h, e o requisito é de 4 h: não atende. O RTO (Recovery Time Objective) é o tempo máximo para restaurar o serviço, e depende de como a restauração é feita (esse tempo, no L8, não foi medido: vem da BIA). Valores de RPO e RTO são metas da análise de impacto no negócio. No L8, a regra 3-2-1 só passou com 3 cópias, 2 mídias e 1 externa.

## Questão 30 (Backup e continuidade) - AUTORAL (não é de prova real)

Um órgão faz uma cópia completa no domingo e cópias incrementais de segunda a sexta. Na quinta-feira à noite, um incidente apaga os dados. Para restaurar o estado da quarta-feira, é necessário recuperar

A) apenas a cópia completa de domingo.
B) a cópia completa de domingo e apenas a incremental de quarta-feira.
C) a cópia completa de domingo e as incrementais de segunda, terça e quarta-feira, em ordem.
D) somente as incrementais de segunda a quarta-feira.
E) a cópia completa de domingo e a incremental de quinta-feira.

**Gabarito: C.** No esquema incremental, cada cópia só guarda o que mudou desde a última cópia de qualquer tipo, então a restauração precisa da cadeia inteira: completo + seg + ter + qua, em ordem. No laboratório L8, faltando um elo (d2) o resultado não ficou idêntico ao original. Com diferencial, bastariam o completo e a diferencial de quarta (2 conjuntos).

## Questão 31 (Malware, ataques e engenharia social) - FCC, TRT-14 (RO/AC) 2022, Técnico Judiciário, questão 55

Ao executar um software de antivírus, um técnico verificou a existência de um trojan em execução no computador. Sobre os trojans,

A) eles têm a capacidade de se replicar rapidamente pela rede ou internet sem a intervenção do usuário.
B) eles criptografam arquivos, mantendo-os bloqueados até o pagamento de resgate.
C) eles se disfarçam de programas legítimos e, uma vez instalados, abrem portas para invasão dos computadores.
D) eles espionam as atividades dos usuários e capturam informações sobre eles.
E) eles causam a indisponibilidade dos recursos do sistema por meio do envio de múltiplas requisições de conexão em direção ao computador infectado.

**Gabarito: C.** Trojan (cavalo de Troia) se disfarça de programa legítimo e, depois de instalado pelo próprio usuário, abre uma porta para o invasor. A: replicação sozinha é de worm; B: sequestro de arquivos é ransomware; D: espionagem é spyware (e keylogger); E: inundação de requisições é DoS/DDoS.

## Questão 32 (Malware, ataques e engenharia social) - FCC, TRT-22 (PI) 2022, Técnico Judiciário, questão 58

Considere as seguintes características aplicáveis a malwares:

I. Projetado especificamente para apresentar propagandas. Pode ser usado para fins legítimos, quando incorporado a programas e serviços, como forma de patrocínio ou retorno financeiro, como também pode ser usado para fins maliciosos, quando as propagandas apresentadas são redirecionadas sem conhecimento do usuário.

II. Capaz de capturar e armazenar as teclas digitadas pelo usuário no teclado do computador. Sua ativação, em muitos casos, é condicionada a uma ação prévia do usuário, como o acesso a um site específico de comércio eletrônico ou de Internet Banking, por exemplo.

III. É um tipo de código malicioso que torna inacessíveis os dados armazenados em um equipamento, geralmente usando criptografia, e que exige pagamento de resgate para restabelecer o acesso ao usuário. O pagamento do resgate geralmente é feito utilizando-se bitcoins.

Os itens I, II e III são características, correta e respectivamente, correspondentes a

A) Spyware − Printscreen − Spyware.
B) Adware − Screenlogger − Wormware.
C) Worm − Printlog − Warmware.
D) Adware − Keylogger − Ransomware.
E) Spyware − Keylogger − Trojan.

**Gabarito: D.** I é adware (propaganda), II é keylogger (captura teclas) e III é ransomware (sequestro de dados com pedido de resgate). &quot;Wormware&quot;, &quot;Warmware&quot;, &quot;Printlog&quot; e &quot;Printscreen&quot; como categorias são invenções das alternativas erradas. Screenlogger existe (captura telas), mas o item II fala de teclas digitadas. O principal remédio contra o ransomware é o backup testado e isolado (regra 3-2-1 do laboratório L8).

## Questão 33 (Malware, ataques e engenharia social) - FCC, TCE-GO 2009, Técnico de Controle Externo, questão 57

O vírus de computador que, após ter entrado no sistema, pode movimentar-se sozinho, duplicar-se em grande volume, enviar cópias de si próprio para todos os contatos do de correio eletrônico, causando um efeito de avalanche, que resulta em congestionamentos nas redes das empresas e em toda a Internet é o

A) worm.
B) backdoor.
C) keylogger.
D) botnets.
E) rootkit.

**Gabarito: A.** Replicar-se sozinho, em grande volume, e se espalhar por rede e e-mail é a marca do worm, que ao contrário do vírus clássico não precisa de um arquivo hospedeiro nem da ação do usuário. Backdoor é a porta dos fundos para acesso remoto, keylogger captura teclas, botnet é uma rede de máquinas comandadas à distância e rootkit esconde a presença do invasor.

## Questão 34 (Malware, ataques e engenharia social) - FCC, TRT-14 (RO/AC) 2022, Técnico Judiciário, questão 60

O ataque caracterizado pela falsificação de um endereço IP, DNS ou e-mail para ter acesso não autorizado ao sistema é

A) Phishing.
B) Man-in-the-middle.
C) DDoS.
D) Spoofing.
E) ZeroDay.

**Gabarito: D.** Spoofing é a falsificação de identidade: de IP (IP spoofing), de DNS (DNS spoofing ou cache poisoning) ou de e-mail. Phishing engana a vítima para obter dados; man-in-the-middle intercepta a comunicação entre duas partes; DDoS esgota recursos com tráfego de muitas origens; ZeroDay explora falha ainda sem correção. No laboratório L5, um cliente TLS que valida a cadeia e o nome do certificado recusou o servidor que não era o esperado, que é uma defesa contra impostores.

## Questão 35 (Malware, ataques e engenharia social) - FCC, TRT-22 (PI) 2022, Analista Judiciário, questão 59

No contexto de ataques DDos, considere o texto abaixo.

Um cliente mal-intencionado envia um grande volume de pacotes de SYN (primeira parte do handshake usual), mas nunca envia a confirmação para concluir o handshake. Isso deixa o servidor aguardando uma resposta a essas conexões semiabertas do TCP, que acabam ficando sem capacidade para aceitar novas conexões dos serviços que monitoram estados de conexão. Um exemplo disso no dia a dia seria como um trote feito por um grande número de pessoas, em que todos ligam para um mesmo restaurante delivery e pedem um prato no mesmo período. Então, quando o entregador vai organizar os pedidos, percebe que há pratos demais, que eles não cabem no carro e que os pedidos não têm endereço. Assim, todo o processo de entrega é interrompido.

O texto descreve um ataque do tipo

A) reflexão/amplificação de SYN/DNS.
B) inundação de TCP/DNS.
C) smurf.
D) flood de ICMP.
E) flood de SYN.

**Gabarito: E.** Muitos SYN sem o ACK final deixam conexões semiabertas e esgotam a tabela de conexões: é o SYN flood, um ataque contra a disponibilidade. Smurf e flood de ICMP usam pacotes ICMP; reflexão/amplificação usa servidores intermediários (como DNS) para multiplicar o tráfego. Mitigações clássicas: SYN cookies, limites de conexões por origem, firewall stateful e serviços anti-DDoS. No laboratório L9, o firewall com estado recusou um ACK sem conexão registrada, ao passo que o filtro sem estado o deixou passar.

## Questão 36 (Firewall, IDS/IPS e testes de invasão) - FCC, TRT-22 (PI) 2022, Técnico Judiciário, questão 55

Um Técnico pretende instalar um tipo de firewall que possua as seguintes características:

- Usa tecnologia de firewall de rede para filtrar pacotes de dados com base no estado e no contexto.

- Realiza análise do tráfego de dados, em busca de padrões aceitáveis pelas suas diretrizes, que seriam utilizadas para manter a comunicação.

- Armazena dados e os utiliza como parâmetro para o tráfego subsequente.

Ele deve instalar o tipo

A) pocket manager.
B) packet director.
C) stateful inspection.
D) scope manager inspection.
E) proxy filtering.

**Gabarito: C.** Filtrar com base no estado e no contexto da conexão, guardando informações para avaliar o tráfego seguinte, é o firewall com inspeção de estado (stateful inspection). &quot;Pocket manager&quot;, &quot;packet director&quot; e &quot;scope manager inspection&quot; não existem. O proxy trabalha na camada de aplicação, intermediando a conexão. No laboratório L9, a simulação mostrou a diferença: o filtro sem estado permitiu dois ACK soltos na porta 443; o com estado só aceitou o ACK da conexão registrada pelo SYN.

## Questão 37 (Firewall, IDS/IPS e testes de invasão) - FCC, TRT-1 (RJ) 2014, Técnico Judiciário, questão 60

O técnico administrador da rede local de computadores (LAN) instalou um Firewall do tipo filtragem de pacotes para melhorar a segurança na LAN. Esse tipo de Firewall é capaz de

A) identificar e bloquear mensagens de e-mail com vírus.
B) bloquear trocas de mensagens sigilosas por meio de chats.
C) bloquear pacotes pela identificação de endereço IP Origem desautorizado.
D) identificar e bloquear acesso a sites com conteúdo duvidoso.
E) filtrar o conteúdo das mensagens de e-mail e retirar SPAMs.

**Gabarito: C.** O filtro de pacotes decide olhando cabeçalhos (IP de origem e destino, protocolo, portas), então consegue bloquear um IP de origem desautorizado. Ler o conteúdo (vírus em e-mail, sites, chats, spam) exige proxy de aplicação, antivírus de gateway ou WAF. No laboratório L9, a regra de &quot;permitir 22 só da rede 10.0.0.0/8&quot; negou o IP externo e liberou o interno, com negação por padrão (default deny) para o resto.

## Questão 38 (Firewall, IDS/IPS e testes de invasão) - FCC, TRT-22 (PI) 2022, Técnico Judiciário, questão 57

No contexto de redes de computadores, considere as seguintes características de um sistema de segurança:

Ao invés de monitorar um único computador, ele monitora o tráfego do segmento de rede no qual está inserido. Sua atuação é feita através da captura e análise dos cabeçalhos e conteúdos dos pacotes, os quais são comparados com padrões ou assinaturas estabelecidas, sendo um mecanismo eficaz contra diversos tipos de ataques. O sistema é constituído por dois componentes principais: os sensores e a estação de gerenciamento. Ele apresenta a propriedade de não ser visível ao atacante, fazendo com que o ataque seja efetuado sem cuidados. As desvantagens deste sistema são a dificuldade em monitorar dados cifrados e, em redes saturadas, ocasionar perdas de pacotes.

Trata-se de

A) NIDS.
B) HIDS.
C) NIPS.
D) HIPS.
E) SIDS.

**Gabarito: A.** Monitora o segmento de rede, com sensores e estação de gerenciamento, e só detecta (não bloqueia): NIDS. O HIDS roda em um único computador (host). As versões &quot;P&quot; (NIPS e HIPS) são de prevenção, isto é, atuam bloqueando. A desvantagem citada, a dificuldade com tráfego cifrado, existe porque o sensor não consegue ler o conteúdo de um fluxo TLS. No laboratório L9, o detector por limiar sobre o log gerou o alerta, mas quem bloqueia seria um IPS.

## Questão 39 (Firewall, IDS/IPS e testes de invasão) - FCC, TRT-23 (MT) 2022, Técnico Judiciário, questão 31

Considere os tipos de testes de penetração (pentest) abaixo a serem realizados no Tribunal.

I. Este teste tem como objetivo realizar uma auditoria de segurança detalhada dos sistemas do Tribunal e fornecer ao pen tester o máximo de detalhes possível. Como resultado, os testes são mais completos porque o pen tester tem pleno conhecimento e acesso ao código-fonte e ao ambiente de desenvolvimento.

II. O agente responsável pelo teste, de forma mal-intencionada, tenta persuadir ou enganar os funcionários do Tribunal a fornecerem informações confidenciais, como nome de usuário, e-mail, senha etc.

III. Neste teste, o pen tester recebe pouca ou nenhuma informação sobre a infraestrutura de TI do Tribunal. O principal benefício é simular um ataque cibernético do mundo real, no qual o pen tester assume o papel de um invasor desinformado.

IV. Neste teste, o pen tester tenta comprometer as barreiras para acessar a infraestrutura, o prédio, os sistemas ou os funcionários do Tribunal. O principal benefício é expor pontos fracos e vulnerabilidades em controles de acesso (fechaduras, barreiras, câmeras ou sensores) para que as falhas possam ser corrigidas rapidamente.

Os testes de I a IV correspondem, correta e respectivamente, a

A) Black box – social engineering – white box – access control.
B) Black box – sensitive information – gray box – logical.
C) White box – social engineering – black box – physical.
D) Gray box – web application – white box – access control.
E) White box – sensitive information – black box – wireless.

**Gabarito: C.** I: pleno conhecimento e acesso ao código-fonte é white box (caixa branca). II: persuadir funcionários é engenharia social. III: pouca ou nenhuma informação é black box (caixa preta); o meio-termo é o gray box. IV: fechaduras, barreiras, câmeras e sensores é teste físico. Pentest e análise de vulnerabilidades são coisas diferentes: a análise lista falhas, o pentest tenta explorá-las com escopo e autorização formais.

## Questão 40 (Zero Trust e normas ISO 27000) - FCC, TRT-23 (MT) 2022, Técnico Judiciário, questão 28

Um Network Admission Control (NAC) implementado com

A) a configuração inline geralmente possui um servidor que não está diretamente no fluxo de tráfego de rede; esse servidor se comunica com dispositivos de infraestrutura de rede, como switches, roteadores e pontos de acesso sem fio, que aplicarão as políticas NAC e permitirão ou negarão o tráfego.
B) o controle de rede out-of-network aplica as políticas NAC depois que um dispositivo já recebeu acesso à rede; isso porque pode haver tráfego suspeito vindo do dispositivo ou este se conecte a algo que não deveria acessar, por exemplo.
C) a configuração pós-admissão possui um ponto que fica dentro do fluxo normal de tráfego; a partir desta posição in-flow, permite-se ou recusa-se o acesso, ou seja, decidem-se e aplicam-se simultaneamente as políticas NAC para cada solicitação.
D) o controle de rede out-of-network aplica as políticas NAC antes que um dispositivo receba acesso à rede; nesse caso, se o dispositivo não atender às condições da política, ele não será autorizado.
E) base no modelo zero trust access (ZTA) nega acesso a qualquer recurso, por padrão, e impõe políticas de reconhecimento de identidade e de contexto para acesso à rede privada ou corporativa.

**Gabarito: E.** O Zero Trust (ZTA/ZTNA) parte de &quot;nunca confie, sempre verifique&quot;: nega o acesso por padrão e só concede após verificar a identidade e o contexto (dispositivo, localização, risco), independentemente de estar dentro da rede corporativa (E). As demais alternativas descrevem o NAC de modo trocado: o controle inline fica dentro do fluxo de tráfego, e o pré-admissão avalia o dispositivo antes de liberar a rede, ao passo que o pós-admissão o faz depois. Questão trabalhosa de ler: o final de cada alternativa completa o enunciado &quot;Um NAC implementado com...&quot;.

## Questão 41 (Zero Trust e normas ISO 27000) - FCC, TRT-2 (SP) 2014, Técnico Judiciário, questão 54

De acordo com a norma ABNT NBR ISO/IEC 27002:2005, é conveniente que este documento contenha, dentre outras, as seguintes informações:

1. Uma declaração do comprometimento da direção, apoiando as metas e princípios da segurança da informação, alinhada com os objetivos e estratégias do negócio.

2. Uma estrutura para estabelecer os objetivos de controle e os controles, incluindo a estrutura de análise/avaliação e gerenciamento de risco.

3. Definição das responsabilidades gerais e específicas na gestão da segurança da informação, incluindo o registro dos incidentes de segurança da informação.

O documento citado no texto é

A) o Plano de Tratamento de Riscos.
B) o Plano de Recuperação de Desastres.
C) a Política de Segurança da Informação.
D) o Plano de Contingência.
E) o Plano de Continuidade do Negócio.

**Gabarito: C.** Comprometimento da direção, objetivos de controle e responsabilidades em segurança da informação são o conteúdo da Política de Segurança da Informação, o documento de mais alto nível, aprovado pela direção (ISO/IEC 27002, controle de política). Os planos de continuidade, contingência, recuperação e tratamento de riscos são documentos de nível tático ou operacional. A versão 2005 da norma citada na prova foi substituída pela de 2013 e depois pela de 2022; o conceito não mudou. A família 27000 reúne: 27000 (vocabulário), 27001 (requisitos do SGSI, certificável), 27002 (controles), 27005 (riscos) e 27035 (incidentes).

## Questão 42 (Zero Trust e normas ISO 27000) - FCC, TRT-4 (RS) 2022, Técnico Judiciário, questão 35

Para impedir perdas, danos, furtos ou roubos, ou comprometimento de ativos e interrupção das operações da organização, a norma ABNT NBR 27001:2013 recomenda que

A) os equipamentos sejam ligados diretamente em tomadas novas ou testadas por profissionais especializados e que a corrente elétrica seja 220 V.
B) os equipamentos devem ter uma manutenção correta para assegurar a sua contínua integridade e disponibilidade.
C) equipamentos ou softwares podem ser retirados do local sem autorização prévia, desde que sob a vista de um funcionário da área de TI.
D) os equipamentos que contenham mídias de armazenamento de dados não precisam ser examinados antes da reutilização, uma vez que são ativos registrados da organização.
E) o cabeamento de energia e telecomunicações deve ser colocado no mesmo conduíte.

**Gabarito: B.** No Anexo A da ISO/IEC 27001:2013 (segurança de equipamentos, A.11.2), pede-se manutenção correta dos equipamentos para assegurar sua integridade e disponibilidade contínuas (B). Os demais itens contrariam a norma: a retirada de equipamentos exige autorização (C); mídias devem ser verificadas e ter dados apagados antes do descarte ou reutilização (D); cabos de energia e de telecomunicações devem ficar separados para evitar interferência (E); a tensão de 220 V não é exigência da norma (A). Observação: o enunciado atribui à &quot;27001&quot; recomendações que detalham a 27002; a 27001 só traz os controles no Anexo A.

## Questão 43 (Zero Trust e normas ISO 27000) - AUTORAL (não é de prova real)

Pelos princípios de Zero Trust descritos no NIST SP 800-207, é correto afirmar que

A) quem está dentro da rede corporativa é confiável por padrão, e quem está fora, não.
B) a localização na rede é o principal critério para conceder acesso.
C) cada acesso a um recurso é autenticado e autorizado de forma dinâmica, com base na identidade, no estado do dispositivo e no contexto, com privilégio mínimo e assumindo que a rede já pode estar comprometida.
D) uma VPN, uma vez estabelecida, dispensa novas verificações.
E) o perímetro de rede deixa de existir e firewalls devem ser removidos.

**Gabarito: C.** Zero Trust é &quot;nunca confie, sempre verifique&quot;: nenhuma confiança implícita por localização de rede (A, B e D são o modelo de perímetro). O acesso é decidido por requisição (identidade, postura do dispositivo, contexto e risco), com privilégio mínimo, microssegmentação e monitoramento contínuo; assume-se violação. Firewalls e VPN continuam existindo como componentes, só que sem conceder confiança por si sós (E). Observação: o texto exato da norma NIST SP 800-207 foi consultado só nos resumos públicos do NIST.
