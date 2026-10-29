# Simulado autoral estilo FCC, Língua Inglesa (10 questões)

Questões AUTORAIS, elaboradas para este módulo no estilo da FCC (cinco alternativas, uma correta). Não são questões de provas reais; cada uma está marcada como autoral. As respostas foram conferidas contra os textos no laboratório L4.

# Texto-base: Release notes (texto autoral)

Release notes, version 3.2.0.

New: the export endpoint now returns results in pages of 50 records. Use the next_page parameter to fetch the following page.

Changed: the default timeout was reduced from 60 to 30 seconds.

Deprecated: the /v1/reports endpoint will be removed in version 4.0, so clients should migrate to /v2/reports.

Fixed: a bug that caused duplicate entries when a request was retried.

Known issue: uploads larger than 2 GB may fail. The team is working on a fix.

## Questão 1 (Documentação: release notes) - AUTORAL (não é de prova real)

According to the release notes, the /v1/reports endpoint

A) was already removed.
B) will be removed in version 4.0.
C) replaces /v2/reports.
D) is the new default.
E) now returns 50 records per page.

**Gabarito: B.** "Deprecated: the /v1/reports endpoint **will be removed in version 4.0**". **Deprecated** significa "obsoleto, ainda existe mas será removido". A alternativa C inverte: os clientes devem migrar **para** /v2/reports. A alternativa E se refere ao endpoint de exportação.

## Questão 2 (Documentação: números e mudanças) - AUTORAL (não é de prova real)

Segundo as notas de versão, o tempo limite (timeout) padrão

A) foi reduzido de 60 para 30 segundos.
B) aumentou de 30 para 60 segundos.
C) foi removido.
D) passou a ser configurável por página.
E) continua sendo de 60 segundos.

**Gabarito: A.** "Changed: the default timeout **was reduced from 60 to 30 seconds**." Cuidado com a ordem dos números: "from 60 to 30" é redução. A banca troca os valores para testar a leitura atenta.

## Questão 3 (Documentação de APIs: parâmetros) - AUTORAL (não é de prova real)

The parameter next_page is used to

A) set the default timeout.
B) fetch the following page of results.
C) retry a failed request.
D) migrate to /v2/reports.
E) upload files larger than 2 GB.

**Gabarito: B.** "Use the next_page parameter to fetch the following page." **Fetch** = buscar; **following** = seguinte. Em documentação de API, o nome do parâmetro costuma aparecer junto do verbo "use ... to".

## Questão 4 (Vocabulário de documentação) - AUTORAL (não é de prova real)

Nas notas de versão, a expressão "Known issue" indica

A) um recurso novo.
B) um problema conhecido que ainda não foi resolvido.
C) um erro já corrigido.
D) uma mudança de configuração.
E) uma funcionalidade descontinuada.

**Gabarito: B.** "Known issue: uploads larger than 2 GB may fail. The team is working on a fix." **Known issue** é um problema conhecido ainda sem correção. O erro já corrigido aparece sob "Fixed"; o que será removido, sob "Deprecated".

# Texto-base: Semantic Versioning 2.0.0 (semver.org)

Minor version Y (x.Y.z | x > 0) MUST be incremented if new, backward compatible functionality is introduced to the public API. It MUST be incremented if any public API functionality is marked as deprecated.

## Questão 5 (Documentação técnica: versionamento) - AUTORAL (não é de prova real)

According to the text, the minor version MUST be incremented when

A) any backward incompatible change is introduced.
B) only bug fixes are introduced.
C) any public API functionality is marked as deprecated.
D) the pre-release identifier is empty.
E) the patch version is higher than the major.

**Gabarito: C.** O texto diz que a versão **minor** sobe quando há nova funcionalidade compatível e também "if any public API functionality is **marked as deprecated**". Mudança incompatível (A) sobe a **major**; só correções de bug (B) sobem a **patch**. MUST, em especificações, é obrigação (RFC 2119).

# Texto-base: MDN Web Docs, HTTP response status codes: 429 Too Many Requests

The user has sent too many requests in a given amount of time (rate limiting).

## Questão 6 (Documentação de APIs: códigos HTTP) - AUTORAL (não é de prova real)

The excerpt describes the status code 429. According to it, this code is returned when

A) the server cannot find the requested resource.
B) the user sends too many requests in a given amount of time.
C) the server is not ready to handle the request.
D) the URL of the resource has changed permanently.
E) a new resource was created.

**Gabarito: B.** "The user has sent too many requests in a given amount of time (rate limiting)." **Rate limiting** é o limite de taxa de requisições. As demais alternativas são os códigos 404, 503, 301 e 201.

# Texto-base: Git documentation, git-commit

The text up to the first blank line in a commit message is treated as the commit title, and that title is used throughout Git.

## Questão 7 (Documentação técnica: manual do Git) - AUTORAL (não é de prova real)

Segundo o trecho, o título (title) de um commit é

A) todo o texto da mensagem.
B) o texto até a primeira linha em branco.
C) a primeira palavra da mensagem.
D) o código (hash) do commit.
E) o texto depois da última linha em branco.

**Gabarito: B.** "The text up to the first blank line in a commit message is treated as the commit title." **Up to** = até; **blank line** = linha em branco. O restante é o corpo da mensagem.

# Texto-base: OpenAPI Specification v3.1.0

The OpenAPI Specification (OAS) defines a standard, programming language-agnostic interface description for HTTP APIs, which allows both humans and computers to discover and understand the capabilities of a service without requiring access to source code, additional documentation, or inspection of network traffic.

## Questão 8 (Vocabulário: documentação de APIs) - AUTORAL (não é de prova real)

In the excerpt, the expression "programming language-agnostic" indicates that the interface description

A) works only with Java.
B) does not depend on a particular programming language.
C) must be written in English only.
D) requires access to the source code.
E) replaces the HTTP protocol.

**Gabarito: B.** **Agnostic** = que não depende de. Uma descrição "language-agnostic" não está presa a uma linguagem. Note também "**without** requiring access to source code": a alternativa D inverte o sentido. A leitura do vocabulário vem do próprio texto.

# Texto-base: Passkeys (texto autoral)

Passwords have been the weakest link in online security for decades. People reuse them across sites, choose words that are easy to guess and, in many cases, hand them over to fake login pages. Passkeys were designed to solve these problems. Instead of typing a secret, the user proves who they are with a fingerprint, a face scan or a device PIN, and the website receives only a public key, which is useless to an attacker.

Because there is nothing to memorize, there is also nothing to forget. Nevertheless, passkeys are not a perfect solution yet. Some older systems do not support them, and recovering an account after losing every device can be slow. Security experts therefore recommend keeping a second sign-in method until passkeys become universal.

## Questão 9 (Interpretação: inferência) - AUTORAL (não é de prova real)

Which statement is best supported by the text?

A) Passkeys are risk-free and make other sign-in methods unnecessary.
B) Experts advise keeping a second sign-in option while passkey support is incomplete.
C) Fingerprints are sent to the website.
D) Passkeys cannot reduce the problem of fake login pages.
E) Passwords are the strongest part of online security.

**Gabarito: B.** Questão de inferência segura: a última frase diz que especialistas recomendam "keeping a second sign-in method until passkeys become universal". A) contradiz "not a perfect solution yet"; C) o site recebe só a chave pública; D) passkeys foram pensadas para resolver esses problemas; E) a primeira frase chama a senha de "weakest link".

# Texto-base: Backups (texto autoral)

Many companies only discover that their backups are broken when they need them. A backup that has never been restored is just a hope, not a plan. A widely used guideline, known as the 3-2-1 rule, recommends keeping three copies of every important file, on two different types of storage, with one copy stored off site.

Although this approach costs more, it protects the business against hardware failure, human error and ransomware. Moreover, teams should test the restore procedure regularly, because a copy that cannot be restored is worthless. Finally, backups must be protected as carefully as the original data: if an attacker can delete them, the whole strategy fails.

## Questão 10 (Interpretação de frase e inferência) - AUTORAL (não é de prova real)

A frase "A backup that has never been restored is just a hope, not a plan" significa que

A) um backup só é confiável se a restauração for testada.
B) todo backup é uma esperança.
C) um backup restaurado perde a validade.
D) planos de backup devem ser secretos.
E) a restauração dispensa o backup.

**Gabarito: A.** A ideia é reforçada adiante: "teams should test the restore procedure regularly, because a copy that cannot be restored is worthless". Uma cópia nunca restaurada é incerta (uma esperança), não um plano. A alternativa C inverte o sentido.

