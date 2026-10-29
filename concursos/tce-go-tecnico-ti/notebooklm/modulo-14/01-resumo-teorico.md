# Módulo 14: Língua Inglesa (resumo teórico)

Resumo teórico em português para estudo, com trechos em inglês. Cobre o escopo do módulo 14 do edital do TCE-GO (Técnico de Controle Externo, TI, banca FCC): Língua Inglesa (2 questões, peso 2). Compreensão de textos técnicos e científicos em língua inglesa relacionados à tecnologia da informação. Estratégias de leitura: identificação da ideia principal e localização de informações específicas. Vocabulário técnico da área de Tecnologia da Informação. Interpretação de manuais, documentação de software, artigos técnicos e documentação de APIs.

As citações entre aspas são trechos literais das fontes baixadas em 28/10/2026 e conferidos por script. Os exemplos sem aspas são autorais. As questões reais citadas são de outros órgãos e cargos (TJ-CE 2022 e AL-SP 2010).

## 1. O que o edital pede e como a FCC cobra

O edital reúne, em Língua Inglesa, quatro frentes: compreensão de textos técnicos e científicos de TI, estratégias de leitura (ideia principal e informação específica), vocabulário técnico da área e interpretação de manuais, documentação de software, artigos técnicos e documentação de APIs. São 2 questões, peso 2.

Não encontrei prova de Técnico ou Analista de TI do TCE-GO com questões de inglês (as provas do TCE-GO de 2009 e 2014 que li não têm). Por isso o estilo da FCC foi observado em duas provas reais da mesma banca: TJ-CE 2022, Analista Judiciário, Ciência da Computação (2 questões) e AL-SP 2010, Agente Legislativo, Processamento de Dados (8 questões). A prova do TCE-GO 2026 pode diferir.

| O que apareceu nas 10 questões reais | Exemplo (questão real) |
|---|---|
| Interpretação em inglês: "According to the text" | TJ-CE 2022, questão 11 |
| Conectivo que pode substituir outro | TJ-CE 2022, questão 12 (Nonetheless); AL-SP 2010, questão 31 (Whereas) |
| Sinônimo de uma palavra no contexto | AL-SP 2010, questão 28 (grating) |
| Lacuna com phrasal verb ou expressão fixa | AL-SP 2010, questões 29 (turn off) e 30 (take chances) |
| Lacuna de gramática (condicional) | AL-SP 2010, questão 32 |
| Lacuna de coerência (qual frase cabe) | AL-SP 2010, questão 33 |
| Perguntas em português sobre o texto em inglês | AL-SP 2010, questões 34 e 35 |

As provas e os gabaritos em PDF vieram de sites agregadores (eticaconcursos.com.br e estudegratis.com.br), não do site da FCC. Os textos-base são de revistas de tecnologia (um da Wired, outro sobre o UAC do Windows 7); documentação de API não apareceu nas duas provas, mas está no edital, por isso este módulo treina também com documentação real.

## 2. Estratégias de leitura

Roteiro de prova, em cinco passos:

1. Leia o enunciado e as alternativas antes do texto: você já sabe o que procurar.
2. Faça o skimming: título, primeira frase de cada parágrafo e última frase.
3. Para cada pergunta, faça o scanning: volte ao texto e ache a frase que sustenta a resposta.
4. Marque nomes, números e conectivos (but, however, although, therefore).
5. Elimine as alternativas com palavras absolutas ou que o texto não diz.

A ideia principal resume o texto inteiro; um exemplo ou um número é detalhe. Já uma inferência é o que o texto permite concluir sem escrever literalmente: escolha a mais moderada, que o texto sustenta, e não a que exige conhecimento de fora.

## 3. Armadilhas das alternativas

- **Absolutos:** all, never, only, always, eliminate, any. Raramente aparecem em respostas certas de interpretação.
- **Verdadeiro, mas fora do texto:** a alternativa é correta no mundo real, mas o texto não diz. Em "According to the text", não vale.
- **Detalhe certo, pergunta errada:** a alternativa cita algo do texto que não responde ao que foi perguntado.
- **Inversão:** causa e efeito trocados, ou o que o texto atribui a um grupo atribuído a outro.
- **Tradução parcial:** em perguntas em português, uma palavra da alternativa pode mudar o sentido do original. Confira palavra por palavra.
- **NOT, EXCEPT, "não mencionado":** procure cada alternativa no texto; a resposta é a que não consta.

Na questão real 34 da AL-SP 2010 (em português), o texto diz que o UAC pedia aprovação continuamente; a alternativa errada afirmava que os usuários apreciavam o recurso, o que o texto contradiz. O comentário completo está nos Exercícios.

## 4. Conectivos e relações entre ideias

| Função | Conectivos | Frase autoral |
|---|---|---|
| Contraste ou concessão | however, nonetheless, nevertheless, but, yet, although, though, even though, whereas, while, despite, in spite of | The tool is fast. However, it is hard to configure. |
| Causa | because, since, as, due to | Since the endpoint is deprecated, clients should migrate. |
| Consequência ou conclusão | therefore, thus, hence, so, consequently, as a result | The key was exposed, so we rotated it. |
| Adição | moreover, furthermore, besides, in addition, also | Besides saving money, BYOD gives employees freedom of choice. |
| Exemplo | for example, for instance, such as | Many devices, such as laptops and phones, are supported. |
| Ênfase | in fact, indeed | In fact, many users turned the feature off. |
| Condição | if, unless, provided that, as long as | Unless the restore is tested, the backup is not reliable. |

Dois casos reais: na questão 12 do TJ-CE 2022, "Nonetheless" (contraste) podia ser trocado por "However"; na questão 31 da AL-SP 2010, "Whereas" (contraste dentro da frase) podia ser trocado por "While". Atenção: *so ... that* expressa consequência ("The experience was so grating that many users preferred to turn UAC off", trecho da prova da ALESP).

## 5. Gramática que aparece nas provas

**Condicionais.** If + passado simples pede would + infinitivo (situação hipotética). If + presente pede will. If + past perfect pede would have + particípio. A questão 32 da AL-SP 2010 cobra o primeiro caso: "If Microsoft had its druthers, all Windows 7 users would use UAC".

**Modais.** Must e shall indicam obrigação; should, recomendação; may e can, permissão ou possibilidade; must not e shall not, proibição. Em especificações técnicas, a RFC 2119 fixa o sentido das palavras em maiúsculas:

- MUST: “This word, or the terms "REQUIRED" or "SHALL", mean that the definition is an absolute requirement of the specification.”
- MUST NOT: “This phrase, or the phrase "SHALL NOT", mean that the definition is an absolute prohibition of the specification.”
- SHOULD: “This word, or the adjective "RECOMMENDED", mean that there may exist valid reasons in particular circumstances to ignore a particular item, but the full implications must be understood and carefully weighed before choosing a different course.”
- MAY: “This word, or the adjective "OPTIONAL", mean that an item is truly optional.”

**Phrasal verbs.** O sentido muda com a partícula. Em TI: turn on/off (ligar, desligar), set up (configurar), log in/out (entrar, sair), back up (fazer backup; o substantivo é backup), roll back (reverter), look up (consultar), carry out (executar), run into (deparar-se com). A questão 29 da AL-SP 2010 pedia a partícula de "turn UAC [ ]": a resposta era off, confirmada pelo próprio texto mais adiante ("turn it off").

**Expressões fixas (collocations).** Dizemos take chances (arriscar-se); make, do, get e give não formam essa expressão. As colocações (verbo + substantivo) precisam ser aprendidas em bloco. A questão 30 da AL-SP 2010 cobrou take.

**Prefixos e sufixos.** -less (sem), -able (que pode ser), un- (não, desfazer), re- (de novo): useless, readable, unauthenticated, retry.

## 6. Vocabulário técnico e falsos amigos

| Termo em inglês | Sentido em português | Cuidado |
|---|---|---|
| library | biblioteca de código | livraria é bookstore |
| actually | na verdade | atualmente é currently |
| eventually | por fim, no final | eventualmente (às vezes) é occasionally |
| pretend | fingir | pretender é intend |
| realize | perceber, dar-se conta | realizar é carry out |
| resume (verbo) | retomar | resumir é summarize |
| attend | comparecer | atender é answer ou serve |
| support | apoiar, dar suporte a | não é "suportar" no sentido de tolerar |
| deprecated | obsoleto, a ser removido | continua funcionando por enquanto |
| endpoint | endereço de uma API | |
| payload | conteúdo enviado ou recebido | |
| workaround | solução alternativa | |
| timeout | tempo limite | |
| default | valor padrão | |

O vocabulário também se deduz por contexto e por formação de palavras. Em "The experience was so grating that many users preferred to turn UAC off", o consequente diz que o efeito era ruim: grating = irritante (questão real 28 da AL-SP 2010).

## 7. Documentação de software e APIs

Documentação técnica tem estrutura previsível, e saber onde está cada informação ajuda no scanning. README e manuais costumam trazer: descrição, prerequisites (pré-requisitos), installation, usage, configuration, troubleshooting, known issues e license. Isso é uma convenção, não uma regra. Avisos usam note, warning e caution, em gravidade crescente.

**Exemplos reais de documentação (em inglês).** Leia cada um com a pergunta "o que o texto afirma e o que não afirma?":

- Manual do curl: “curl is a tool for transferring data from or to a server using URLs.”
- Git, git-commit: “Create a new commit containing the current contents of the index and the given log message describing the changes.” Sobre a mensagem: “The text up to the first blank line in a commit message is treated as the commit title, and that title is used throughout Git.”
- Python, ambientes virtuais: “Python applications will often use packages and modules that don't come as part of the standard library. Applications will sometimes need a specific version of a library, because the application may require that a particular bug has been fixed or the application may be written using an obsolete version of the library's interface.” “The solution for this problem is to create a virtual environment, a self-contained directory tree that contains a Python installation for a particular version of Python, plus a number of additional packages.”
- PostgreSQL, SQL Dump: “An important advantage of pg_dump over the other backup methods described later is that pg_dump's output can generally be re-loaded into newer versions of PostgreSQL, whereas file-level backups and continuous archiving are both extremely server-version-specific.”
- OpenAPI Specification: “The OpenAPI Specification (OAS) defines a standard, programming language-agnostic interface description for HTTP APIs, which allows both humans and computers to discover and understand the capabilities of a service without requiring access to source code, additional documentation, or inspection of network traffic.” “Similar to what interface descriptions have done for lower-level programming, the OpenAPI Specification removes guesswork in calling a service.”

Leitura guiada do trecho do Python: o problema é que aplicações precisam de versões específicas de bibliotecas, e a solução é um virtual environment, definido como um diretório autocontido (self-contained). Language-agnostic, no OpenAPI, quer dizer que a descrição não depende de uma linguagem de programação.

## 8. HTTP: métodos e códigos de status

Os métodos e os códigos aparecem em documentação de API e em mensagens de erro. A RFC 9110 define "seguro" e "idempotente":

- “Request methods are considered "safe" if their defined semantics are essentially read-only; i.e., the client does not request, and does not expect, any state change on the origin server as a result of applying a safe method to a target resource.”
- “A request method is considered "idempotent" if the intended effect on the server of multiple identical requests with that method is the same as the effect for a single such request.”
- “Of the request methods defined by this specification, PUT, DELETE, and safe request methods are idempotent.”

A MDN diz: “Responses are grouped in five classes:” Os códigos que mais aparecem em textos de API:

| Código | Descrição da MDN (trecho literal) |
|---|---|
| 201 | “The request succeeded, and a new resource was created as a result. This is typically the response sent after POST requests, or some PUT requests.” |
| 301 | “The URL of the requested resource has been changed permanently. The new URL is given in the response.” |
| 400 | “The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).” |
| 401 | “Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated".” |
| 403 | “The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource.” |
| 404 | “The server cannot find the requested resource.” |
| 429 | “The user has sent too many requests in a given amount of time (rate limiting).” |
| 500 | “The server has encountered a situation it does not know how to handle.” |
| 503 | “The server is not ready to handle the request.” |

Macete: 401 é "quem é você?" (autenticação) e 403 é "você não pode" (autorização). O 429 está ligado a *rate limiting*, a limitação de requisições por período. Segundo a MDN, o código 102 está obsoleto: “The response code has been deprecated and it is no longer used.”

## 9. Versionamento e notas de versão

**Versionamento semântico (SemVer).** A página oficial resume:

- “Given a version number MAJOR.MINOR.PATCH, increment the: MAJOR version when you make incompatible API changes MINOR version when you add functionality in a backward compatible manner PATCH version when you make backward compatible bug fixes”

Regras de detalhe do mesmo documento:

- “Patch version Z (x.y.Z | x > 0) MUST be incremented if only backward compatible bug fixes are introduced.”
- “Minor version Y (x.Y.z | x > 0) MUST be incremented if new, backward compatible functionality is introduced to the public API. It MUST be incremented if any public API functionality is marked as deprecated.”
- “Major version X (X.y.z | X > 0) MUST be incremented if any backward incompatible changes are introduced to the public API.”
- “Major version zero (0.y.z) is for initial development. Anything MAY change at any time. The public API SHOULD NOT be considered stable.”
- “A pre-release version indicates that the version is unstable and might not satisfy the intended compatibility requirements as denoted by its associated normal version.”

**Changelog e release notes.** O Keep a Changelog define: “A changelog is a file which contains a curated, chronologically ordered list of notable changes for each version of a project.” E explica a finalidade: “To make it easier for users and contributors to see precisely what notable changes have been made between each release (or version) of the project.” Os tipos de mudança são:

- “Added for new features.”
- “Changed for changes in existing functionality.”
- “Deprecated for soon-to-be removed features.”
- “Removed for now removed features.”
- “Fixed for any bug fixes.”
- “Security in case of vulnerabilities.”

Para treinar, o módulo traz notas de versão autorais (version 3.2.0) com New, Changed, Deprecated, Fixed e Known issue, e questões sobre elas no Simulado.

## 10. Dois exemplos resolvidos

**Exemplo 1: "According to the text" (real).** Na questão 11 do TJ-CE 2022, a alternativa certa afirma que a política BYOD reduz os erros de uso de plataformas diferentes. O apoio está na frase do texto sobre os atalhos de teclado de cada plataforma, ligeiramente diferentes, e sobre o uso do mesmo MacBook para trabalho e uso pessoal eliminar esses erros de troca. As demais alternativas falam de perda de dados, falhas de hardware e exigências que o texto não faz.

**Exemplo 2: lacuna de coerência (real).** Na questão 33 da AL-SP 2010, antes da lacuna o autor diz que a Microsoft gostaria que todos usassem o UAC no máximo; depois, que pretende recomendar as configurações intermediárias. A frase que cabe é a que expressa discordância, não a que concorda. A leitura do que vem antes e depois da lacuna resolve.

## 11. Limites e o que não foi testado

- Não achei questão real de inglês em prova de TI do TCE-GO; as 10 reais deste módulo são de outros órgãos (TJ-CE e AL-SP) e de outro cargo ou nível.
- As provas vieram de agregadores; recursos e anulações não foram verificados.
- As páginas de documentação em inglês foram lidas em 28/10/2026 e podem mudar.
- Os textos-base das questões reais são os que constam nas provas, com o crédito que elas trazem (Wired; PCWorld, adaptado). O texto original nos sites não foi conferido.
- Windows e macOS: não testado (os laboratórios foram rodados só em Linux).
