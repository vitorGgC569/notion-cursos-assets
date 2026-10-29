# Casos de estudo comentados (Estudo de Caso, TI)

9 casos: 5 AUTORAIS de treino (A1 a A5), 1 AUTORAL de simulado (S1) e 3 REAIS da FCC (R1 e R2: TRF-4 2019, Analista Judiciário, Sistemas de TI; R3: TRT-20 2024, Analista Judiciário, TI), todos marcados no título. Os casos reais são de outros órgãos e do cargo de analista, não do TCE-GO. A prova do TRF-4 e a página do TRT-20 vieram de agregadores (eticaconcursos.com.br e Gran Questões), não do site da banca. O espelho oficial não foi localizado: o espelho, a resposta-modelo e os comentários são AUTORAIS, inclusive nos casos reais. O código PHP do R2 não foi testado.

## Fontes dos casos reais

- FCC, TRF-4 2019, Analista Judiciário, Sistemas de Tecnologia da Informação, caderno 04 tipo 001, Prova Estudo de Caso, questões 1 e 2. https://eticaconcursos.com.br/provas/arquivos/prova/fcc-2019-trf-4-regiao-analista-judiciario-sistemas-de-tecnologia-da-informacao-prova.pdf Página: https://eticaconcursos.com.br/provas/fcc-2019-trf-4-regiao-analista-judiciario-sistemas-de-tecnologia-da-informacao
- FCC, TRT-20 2024, Analista Judiciário, Área Tecnologia da Informação, questão discursiva Q3558872 (Estudo de Caso). https://questoes.grancursosonline.com.br/questoes-discursivas/tecnologia-da-informacao-14/3558872

## A1: Planilha com dados pessoais em link aberto na nuvem - AUTORAL

**Tipo e fonte**

AUTORAL (não é de prova real). Caso autoral (não é de prova real).

**Disciplinas:** Segurança da Informação e Legislação aplicada à TI. Limite: 15 linhas. Tempo de treino: 40 minutos. Módulos relacionados: Módulo 10, Módulo 13.

**Enunciado**

Um órgão de controle estadual publicou, em um serviço de armazenamento em nuvem, uma planilha com nome, CPF e e-mail de 3.000 participantes de um curso. O arquivo foi compartilhado por link aberto, sem senha, para facilitar o acesso dos instrutores. Dois dias depois, a Ouvidoria recebeu a mensagem de um participante informando que a planilha apareceu em um site de buscas. O Técnico de TI de plantão foi acionado.

**Comandos**

- a) Indique duas medidas imediatas de contenção e uma de preservação de evidências.
- b) Informe a quem o órgão deve comunicar o incidente, com base em qual dispositivo legal e em qual prazo.
- c) Proponha duas medidas para evitar que o problema se repita.

**Espelho de correção AUTORAL (soma 100; não é o espelho da banca)**

- Contenção 1: desativar o link aberto e restringir o compartilhamento a pessoas autorizadas: 15 pontos
- Contenção 2: pedir a remoção do arquivo do cache e da indexação do buscador e do site que o exibe: 10 pontos
- Preservação: guardar logs de acesso, data e hora, quem compartilhou e uma cópia do arquivo, antes de apagar: 15 pontos
- A quem comunicar: o órgão, como controlador, comunica a ANPD e os titulares afetados: 15 pontos
- Fundamento: LGPD, art. 48 (incidente que possa acarretar risco ou dano relevante): 10 pontos
- Prazo: três dias úteis (Resolução CD/ANPD 15/2024, art. 6º), contados do conhecimento: 10 pontos
- Prevenção 1: política de compartilhamento externo (padrão restrito, link com validade, autenticação) e ferramenta de prevenção de perda de dados: 15 pontos
- Prevenção 2: classificar a informação, aplicar a minimização (não publicar CPF sem necessidade) e treinar os servidores: 10 pontos

**Resposta-modelo AUTORAL** (estimativa: cerca de 12 de 15 linhas, a 90 caracteres por linha)

a. Contenção: desativar imediatamente o link aberto, restringindo o acesso às pessoas autorizadas, e pedir ao buscador e ao site a remoção do arquivo do cache e da indexação. Preservação: antes de apagar, guardar os logs de acesso, a data e a hora do compartilhamento, quem o fez e uma cópia do arquivo, registrando tudo no processo do incidente.

b. O órgão, como controlador, deve comunicar a ANPD e os titulares afetados, pois o incidente pode acarretar risco ou dano relevante (LGPD, art. 48). O prazo é de três dias úteis, conforme a Resolução CD/ANPD 15/2024, art. 6º.

c. Adotar política de compartilhamento externo com padrão restrito, link com validade e autenticação, apoiada por ferramenta de prevenção de perda de dados; e classificar a informação, aplicando a minimização (não publicar CPF sem necessidade), com treinamento periódico dos servidores.

**Comentários**

- O caso mistura duas disciplinas (Segurança da Informação e Legislação aplicada à TI), o que o edital prevê no item 11.6 (disciplinas inter-relacionadas).
- O art. 48 da LGPD fala em "prazo razoável, conforme definido pela autoridade nacional". Os três dias úteis vêm da Resolução CD/ANPD 15/2024, art. 6º, e a contagem começa quando o controlador sabe que o incidente afetou dados pessoais. Saber essa diferença rende pontos no item "prazo".
- Responda ao que foi perguntado: "duas medidas de contenção e uma de preservação" pede exatamente três itens, não uma lista de dez. Medida a mais não costuma pontuar e consome linhas.
- Se a banca esperasse comunicar também o encarregado ou o comitê interno, a resposta ainda estaria correta nos itens pedidos: a pergunta "a quem o órgão deve comunicar" foi lida aqui como as comunicações previstas no art. 48.

**Conferência nas fontes (trechos literais)**

- LGPD, art. 48: “Art. 48. O controlador deverá comunicar à autoridade nacional e ao titular a ocorrência de incidente de segurança que possa acarretar risco ou dano relevante aos titulares.”
- LGPD, art. 48, § 1º: “A comunicação será feita em prazo razoável, conforme definido pela autoridade nacional”
- Resolução CD/ANPD 15/2024, art. 6º: “Art. 6º A comunicação de incidente de segurança à ANPD deverá ser realizada pelo controlador no prazo de três dias úteis, ressalvada a existência de prazo para comunicação previsto em legislação específica.”
- Resolução CD/ANPD 15/2024, art. 6º, § 1º: “O prazo a que se refere o caput será contado do conhecimento pelo controlador de que o incidente afetou dados pessoais.”
- LGPD, art. 46: “Os agentes de tratamento devem adotar medidas de segurança, técnicas e administrativas aptas a proteger os dados pessoais de acessos não autorizados e de situações acidentais ou ilícitas de destruição, perda, alteração, comunicação ou qualquer forma de tratamento inadequado ou ilícito.”


## A2: Backup semanal no mesmo servidor e tabela apagada por engano - AUTORAL

**Tipo e fonte**

AUTORAL (não é de prova real). Caso autoral (não é de prova real).

**Disciplinas:** Banco de Dados, Segurança da Informação e Governança de TI. Limite: 15 linhas. Tempo de treino: 40 minutos. Módulos relacionados: Módulo 6, Módulo 10, Módulo 11.

**Enunciado**

O sistema de protocolo do órgão usa um banco PostgreSQL em um único servidor. O backup é um arquivo gerado uma vez por semana e guardado no próprio servidor, e a restauração nunca foi testada. Em uma terça-feira, às 16h40, um técnico apagou por engano uma tabela crítica e só percebeu na quarta-feira, às 9h.

**Comandos**

- a) Aponte dois problemas da estratégia de backup atual.
- b) Indique como seria possível recuperar o banco ao estado anterior ao erro e que tipo de backup isso exige.
- c) Explique como o órgão deve verificar se o backup é confiável.

**Espelho de correção AUTORAL (soma 100; não é o espelho da banca)**

- Problema 1: a cópia fica no mesmo servidor (sem cópia em outro local), então uma falha leva banco e backup juntos: 15 pontos
- Problema 2: frequência semanal permite perder até sete dias de dados (RPO alto): 15 pontos
- Recuperação até um ponto no tempo (PITR): restaurar um backup base e reaplicar o WAL até o instante anterior ao erro: 25 pontos
- Exige backup base mais arquivamento contínuo do WAL; o dump (pg_dump) só devolve o estado do momento em que foi gerado: 15 pontos
- Verificar: testar a restauração periodicamente, em ambiente separado, conferindo integridade dos dados e o tempo gasto (RTO): 20 pontos
- Automatizar e documentar o procedimento e monitorar falhas, com alertas: 10 pontos

**Resposta-modelo AUTORAL** (estimativa: cerca de 10 de 15 linhas, a 90 caracteres por linha)

a. Há dois problemas: a cópia fica no mesmo servidor, então uma falha de disco, um ataque ou um incêndio levam banco e backup juntos; e a frequência semanal permite perder até sete dias de dados, o que eleva o RPO.

b. É possível usar a recuperação até um ponto no tempo (PITR) do PostgreSQL: restaura-se um backup base e reaplicam-se os arquivos de WAL arquivados até o instante anterior ao erro. Isso exige backup base mais arquivamento contínuo do WAL; um dump com pg_dump só devolve o banco ao momento em que foi gerado.

c. O backup só é confiável se for testado: restaurar periodicamente, em ambiente separado, conferindo a integridade dos dados e o tempo gasto (RTO). Convém automatizar e documentar o procedimento e monitorar falhas, alertando a equipe.

**Comentários**

- Esta é a lógica de "problema, solução, verificação": três comandos, três parágrafos curtos, cada um começando pela letra do item (o enunciado de provas reais da FCC exige a letra, como no caso do TRT-20 2024).
- RPO (perda máxima de dados aceitável) e RTO (tempo máximo para voltar) são os termos usados em continuidade de serviços; as definições aqui são as do curso (veja o Módulo 10 e o Módulo 11) e não foram conferidas em uma norma nesta etapa.
- O PITR do PostgreSQL só funciona com a sequência contínua de WAL desde o backup base; sem ela, o que se tem é um backup do instante em que ele foi feito.

**Conferência nas fontes (trechos literais)**

- PostgreSQL, recuperação até um ponto no tempo: “this technique supports point-in-time recovery: it is possible to restore the database to its state at any time since your base backup was taken.”
- PostgreSQL, sequência contínua de WAL: “you need a continuous sequence of archived WAL files that extends back at least as far as the start time of your backup.”
- PostgreSQL, testar o procedimento: “you should set up and test your procedure for archiving WAL files before you take your first base backup.”
- PostgreSQL, pg_dump: “Dumps created by pg_dump are internally consistent, meaning, the dump represents a snapshot of the database at the time pg_dump began running.”


## A3: Login de API com consulta concatenada, senha em texto puro e token eterno - AUTORAL

**Tipo e fonte**

AUTORAL (não é de prova real). Caso autoral (não é de prova real).

**Disciplinas:** Desenvolvimento de Sistemas e Segurança da Informação. Limite: 15 linhas. Tempo de treino: 40 minutos. Módulos relacionados: Módulo 1, Módulo 10.

**Enunciado**

Uma API REST em Python recebe usuário e senha e monta a consulta por concatenação de texto: "SELECT * FROM usuarios WHERE login = '" + login + "' AND senha = '" + senha + "'". As senhas estão gravadas no banco em texto puro. Se o login der certo, a API devolve um JWT sem data de expiração, assinado com uma chave escrita no código-fonte, que está em um repositório compartilhado.

**Comandos**

- a) Identifique a vulnerabilidade da consulta e a forma correta de corrigi-la.
- b) Indique como as senhas devem ser armazenadas.
- c) Aponte dois problemas do token e como corrigi-los.

**Espelho de correção AUTORAL (soma 100; não é o espelho da banca)**

- Vulnerabilidade: SQL injection (a entrada do usuário vira sintaxe SQL por concatenação): 20 pontos
- Correção: consultas parametrizadas (prepared statements), com placeholders, tratando os valores como dados: 15 pontos
- Mínimo privilégio na conta do banco usada pela API: 5 pontos
- Senhas: nunca em texto puro; guardar só o hash, com algoritmo lento (Argon2id, bcrypt ou PBKDF2): 25 pontos
- Salt único por senha e não usar hash rápido como SHA-256 simples: 10 pontos
- Token 1: sem expiração; definir expiração curta (claim exp) e renovação controlada: 15 pontos
- Token 2: chave de assinatura no código-fonte; guardar em cofre de segredos ou variável de ambiente e rotacionar: 10 pontos

**Resposta-modelo AUTORAL** (estimativa: cerca de 10 de 15 linhas, a 90 caracteres por linha)

a. A consulta concatena os dados do usuário no texto SQL, o que permite SQL injection: uma entrada como ' OR TRUE; -- altera a lógica e libera o acesso. A correção é usar consultas parametrizadas (prepared statements) com placeholders, de modo que os valores sejam tratados como dados, e dar à conta do banco o mínimo de privilégios.

b. Nunca em texto puro: guardar apenas o hash da senha, com algoritmo lento e de custo configurável (Argon2id, bcrypt ou PBKDF2) e salt único por senha, evitando hash rápido como SHA-256 simples.

c. O token não expira, então, se vazar, vale para sempre: definir expiração curta (claim exp), com renovação controlada. A chave de assinatura no código-fonte também vaza com o repositório: guardá-la em cofre de segredos ou variável de ambiente e rotacioná-la.

**Comentários**

- O item c pede "dois problemas e como corrigi-los": cada problema tem de vir com a correção, senão a resposta fica parcial (item 11.10: abordagem parcial reduz a nota proporcionalmente).
- Guardar a chave fora do código e rotacioná-la é boa prática de segurança; esta etapa não a confirmou em uma fonte citável, por isso a resposta-modelo a trata como recomendação do curso e o espelho dá só 10 pontos a ela.
- O edital de Desenvolvimento de Sistemas cita OAuth 2.0, OpenID Connect e JWT; o caso usa só o JWT. O código Python não precisa aparecer: a questão pede identificar e indicar.

**Conferência nas fontes (trechos literais)**

- Python (sqlite3), placeholders: “Always use placeholders instead of string formatting to bind Python values to SQL statements, to avoid SQL injection attacks”
- OWASP, injeção de SQL: “SQL injection occurs when untrusted data becomes part of a query's SQL syntax.”
- OWASP, consultas parametrizadas: “Prepared statements treat bound values as data rather than SQL syntax.”
- OWASP, privilégio mínimo: “DO NOT ASSIGN DBA OR ADMIN TYPE ACCESS TO YOUR APPLICATION ACCOUNTS.”
- OWASP, senhas: “Passwords should never be stored in plain text.”
- OWASP, algoritmos lentos: “they must be protected using strong, slow hashing algorithms such as Argon2id, bcrypt, or PBKDF2.”
- OWASP, salt: “A unique salt must be added to each password to prevent attackers from using precomputed lookup tables like rainbow tables.”
- RFC 7519, claim exp: “The "exp" (expiration time) claim identifies the expiration time on or after which the JWT MUST NOT be accepted for processing.”


## A4: Contratação do suporte técnico de 800 estações de trabalho - AUTORAL

**Tipo e fonte**

AUTORAL (não é de prova real). Caso autoral (não é de prova real).

**Disciplinas:** Governança de TI e Legislação aplicada à TI. Limite: 15 linhas. Tempo de treino: 40 minutos. Módulos relacionados: Módulo 11, Módulo 13.

**Enunciado**

A área de TI do órgão precisa contratar o suporte técnico de 800 estações de trabalho, hoje prestado por servidores em número insuficiente. O gestor pediu ao Técnico de TI que ajude a preparar a contratação e, depois, que acompanhe a execução do contrato.

**Comandos**

- a) Indique dois documentos da fase preparatória e o que cada um define, conforme a Lei nº 14.133/2021.
- b) Cite dois itens que o documento que descreve a necessidade da contratação deve conter.
- c) Descreva o papel do fiscal do contrato durante a execução.

**Espelho de correção AUTORAL (soma 100; não é o espelho da banca)**

- Estudo técnico preliminar (ETP): primeira etapa do planejamento; caracteriza o interesse público e a melhor solução (art. 6º, XX): 20 pontos
- Termo de referência: define o objeto (natureza, quantitativos, prazo) e demais parâmetros da contratação (art. 6º, XXIII): 20 pontos
- Itens do ETP: descrição da necessidade e requisitos da contratação (art. 18, § 1º, I e III); aceita também plano de contratações anual, estimativas de quantidades: 20 pontos
- Análise de riscos que possam comprometer a contratação e a execução (art. 18, X, na fase preparatória): 10 pontos
- Fiscal: representante da Administração, designado, que acompanha e fiscaliza a execução (art. 117): 15 pontos
- Registra em registro próprio as ocorrências e determina a regularização de faltas e defeitos (art. 117, § 1º): 10 pontos
- Informa os superiores, em tempo hábil, o que demandar decisão fora da sua competência (art. 117, § 2º): 5 pontos

**Resposta-modelo AUTORAL** (estimativa: cerca de 12 de 15 linhas, a 90 caracteres por linha)

a. O estudo técnico preliminar (ETP), primeira etapa do planejamento, caracteriza o interesse público e a melhor solução; o termo de referência define o objeto (natureza, quantitativos e prazo) e os demais parâmetros da contratação (Lei 14.133/2021, art. 6º, XX e XXIII).

b. O ETP deve conter, entre outros itens, a descrição da necessidade, sob a ótica do interesse público, e os requisitos da contratação (art. 18, § 1º, I e III); traz ainda a previsão no plano de contratações anual e as estimativas de quantidades; a análise dos riscos que possam comprometer a licitação e a execução do contrato também integra a fase preparatória (art. 18, X).

c. O fiscal é representante da Administração, designado para acompanhar e fiscalizar a execução (art. 117): anota em registro próprio as ocorrências, determina a regularização de falhas e informa os superiores, em tempo hábil, o que ultrapassar sua competência.

**Comentários**

- A Lei 14.133/2021 é a norma geral; o curso a leu na edição do Senado Federal atualizada até julho de 2026. Normas internas do TCE-GO ou de Goiás sobre contratação de TIC não foram lidas aqui: se a prova pedir uma norma específica, o espelho dela prevalece.
- O Técnico de TI não decide a contratação, mas ajuda a elaborar os documentos e pode ser fiscal: por isso o caso fala em "ajudar a preparar" e "acompanhar a execução". Isto se liga ao item "adequabilidade quanto à atribuição do cargo" (edital 11.7).
- Conferir "a quais itens o documento deve conter" no art. 18, § 1º, evita inventar itens: a lista é longa e a banca costuma exigir poucos.

**Conferência nas fontes (trechos literais)**

- Lei 14.133/2021, art. 6º, XX: “XX – estudo técnico preliminar: documento constitutivo da primeira etapa do planejamento de uma contratação que caracteriza o interesse público envolvido e a sua melhor solução”
- Lei 14.133/2021, art. 6º, XXIII: “XXIII – termo de referência: documento necessário para a contratação de bens e serviços, que deve conter os seguintes parâmetros e elementos descritivos:”
- Lei 14.133/2021, art. 18, § 1º: “deverá evidenciar o problema a ser resolvido e a sua melhor solução, de modo a permitir a avaliação da viabilidade técnica e econômica da contratação”
- Lei 14.133/2021, art. 18, § 1º, I: “I – descrição da necessidade da contratação, considerado o problema a ser resolvido sob a perspectiva do interesse público;”
- Lei 14.133/2021, art. 18, § 1º, III: “III – requisitos da contratação;”
- Lei 14.133/2021, art. 18, X: “X – a análise dos riscos que possam comprometer o sucesso da licitação e a boa execução contratual;”
- Lei 14.133/2021, art. 117: “Art. 117. A execução do contrato deverá ser acompanhada e fiscalizada por 1 (um) ou mais fiscais do contrato, representantes da Administração especialmente designados”
- Lei 14.133/2021, art. 117, § 1º: “O fiscal do contrato anotará em registro próprio todas as ocorrências relacionadas à execução do contrato, determinando o que for necessário para a regularização das faltas ou dos defeitos observados.”
- Lei 14.133/2021, art. 117, § 2º: “O fiscal do contrato informará a seus superiores, em tempo hábil para a adoção das medidas convenientes, a situação que demandar decisão ou providência que ultrapasse sua competência.”


## A5: Servidores colando dados de processos em uma IA generativa pública - AUTORAL

**Tipo e fonte**

AUTORAL (não é de prova real). Caso autoral (não é de prova real).

**Disciplinas:** IA, Engenharia de Software assistida por IA e Legislação aplicada à TI. Limite: 15 linhas. Tempo de treino: 40 minutos. Módulos relacionados: Módulo 4, Módulo 9, Módulo 13.

**Enunciado**

Servidores do órgão passaram a colar, em uma ferramenta pública de IA generativa, trechos de processos com nomes e CPFs de pessoas, para obter resumos. A direção pediu um parecer técnico antes de decidir se proíbe ou regula esse uso.

**Comandos**

- a) Aponte dois riscos desse uso.
- b) Indique, com base na LGPD, dois princípios que esse uso pode violar.
- c) Proponha duas medidas para permitir o uso com segurança.

**Espelho de correção AUTORAL (soma 100; não é o espelho da banca)**

- Risco 1: vazamento ou exposição de dados pessoais e sigilosos a um provedor externo, fora do controle do órgão: 20 pontos
- Risco 2: alucinação, ou seja, resumo com erros ou omissões usado no processo sem validação: 15 pontos
- Princípios do art. 6º da LGPD: dois entre finalidade (I), necessidade (III) e segurança (VII): 20 pontos
- Medida 1: política de uso com ferramenta corporativa contratada, sem retenção nem treinamento com os dados do órgão, e registro de uso: 20 pontos
- Medida 2: anonimizar ou remover os dados pessoais antes do envio: 15 pontos
- Medida 3 (complementar): revisão humana obrigatória da resposta e treinamento dos servidores: 10 pontos

**Resposta-modelo AUTORAL** (estimativa: cerca de 9 de 15 linhas, a 90 caracteres por linha)

a. Primeiro, o vazamento: nomes e CPFs enviados a um provedor externo saem do controle do órgão e podem ser retidos ou reutilizados. Segundo, a alucinação: o resumo pode conter erros ou omissões e ser usado em processo sem validação.

b. O uso viola o princípio da finalidade (art. 6º, I), pois o dado foi coletado para o processo e não para ser enviado a terceiro, e o da necessidade (art. 6º, III), pois o resumo não exige expor o CPF; também afronta o da segurança (art. 6º, VII).

c. Regular o uso por política interna, com ferramenta corporativa contratada, sem retenção nem treinamento com os dados do órgão e com registro de uso; e exigir anonimização ou remoção dos dados pessoais antes do envio, além de revisão humana obrigatória da resposta.

**Comentários**

- O edital de IA inclui "LGPD aplicada à IA" e o de Engenharia de Software assistida por IA inclui "segurança, privacidade, propriedade intelectual e ética": o caso cruza as duas, como o item 11.6 do edital permite.
- Dois riscos e dois princípios: o espelho costuma ter um ponto por elemento pedido. Se você der três princípios, o terceiro não soma; se der um só, perde a parte.
- Reter ou reutilizar dados enviados depende do contrato com o provedor; por isso a resposta fala em "podem ser" e não afirma que o provedor reutiliza.

**Conferência nas fontes (trechos literais)**

- LGPD, art. 6º, I: “I - finalidade: realização do tratamento para propósitos legítimos, específicos, explícitos e informados ao titular, sem possibilidade de tratamento posterior de forma incompatível com essas finalidades;”
- LGPD, art. 6º, III: “III - necessidade: limitação do tratamento ao mínimo necessário para a realização de suas finalidades”
- LGPD, art. 6º, VII: “VII - segurança: utilização de medidas técnicas e administrativas aptas a proteger os dados pessoais de acessos não autorizados e de situações acidentais ou ilícitas de destruição, perda, alteração, comunicação ou difusão;”
- LGPD, art. 46: “Os agentes de tratamento devem adotar medidas de segurança, técnicas e administrativas aptas a proteger os dados pessoais de acessos não autorizados e de situações acidentais ou ilícitas de destruição, perda, alteração, comunicação ou qualquer forma de tratamento inadequado ou ilícito.”


## S1: Protocolo eletrônico fora do ar por 6 horas depois de uma atualização - AUTORAL

**Tipo e fonte**

AUTORAL (não é de prova real). Caso autoral inédito do simulado (não é de prova real).

**Disciplinas:** DevOps, Banco de Dados, Governança de TI e Segurança da Informação. Limite: 15 linhas. Tempo de treino: 40 minutos. Módulos relacionados: Módulo 8, Módulo 6, Módulo 10, Módulo 11.

**Enunciado**

O sistema de protocolo eletrônico do órgão ficou indisponível por 6 horas depois de uma atualização feita manualmente, em horário de expediente, diretamente no servidor de produção, sem testes prévios e sem plano de retorno. A base PostgreSQL só tinha backup semanal e, para recuperar um cadastro apagado na atualização, parte dos dados foi refeita à mão. A diretoria quer reduzir a chance de repetição.

**Comandos**

- a) Indique duas práticas de entrega contínua (CI/CD) que reduziriam o risco de novas atualizações.
- b) Proponha como estruturar a política de backup e recuperação do banco, citando um indicador de perda máxima de dados e um de tempo de recuperação.
- c) Indique duas ações de gestão de incidentes para o próximo evento.

**Espelho de correção AUTORAL (soma 100; não é o espelho da banca)**

- Prática 1: pipeline com build e testes automatizados antes de implantar: 20 pontos
- Prática 2: implantação gradual ou em homologação, com plano de retorno (rollback): 20 pontos
- Mudança controlada: janela de mudança fora do horário de pico, com aprovação: 10 pontos
- Backup compatível com o indicador: backup diário mais arquivamento do WAL (PITR), em vez de só semanal: 15 pontos
- Definir RPO (perda máxima de dados) e RTO (tempo máximo de recuperação) e ligar o backup a eles: 15 pontos
- Teste periódico de restauração e cópia fora do servidor: 10 pontos
- Incidentes: registrar e classificar, comunicar os usuários e fazer análise de causa raiz depois: 10 pontos

**Resposta-modelo AUTORAL** (estimativa: cerca de 10 de 15 linhas, a 90 caracteres por linha)

a. Adotar um pipeline de CI/CD que compile e execute testes automatizados antes de qualquer implantação, e implantar primeiro em homologação e depois de forma gradual, com plano de retorno (rollback) pronto; as mudanças devem ocorrer em janela definida, fora do horário de pico, com aprovação.

b. Definir o RPO, perda máxima de dados aceitável, e o RTO, tempo máximo de recuperação. Para um RPO baixo, fazer backup diário e arquivar o WAL, permitindo recuperação até um ponto no tempo (PITR), com cópia fora do servidor e teste periódico de restauração.

c. Registrar e classificar o incidente, comunicando os usuários sobre o impacto e o prazo previsto, e, depois da recuperação, fazer a análise de causa raiz e registrar as lições aprendidas para corrigir o processo.

**Comentários**

- Este é o caso do Simulado: reúne quatro disciplinas (DevOps, Banco de Dados, Governança e Segurança), como o item 11.6 do edital prevê.
- As práticas de CI/CD citadas (teste automatizado, implantação gradual e rollback) são conhecimento geral de entrega contínua, visto no Módulo 8; só a execução de varreduras de segurança no pipeline foi conferida em documentação oficial (GitLab, citada na Teoria).
- Quando a questão pede "um indicador de perda máxima de dados e um de tempo", responda com os dois nomes (RPO e RTO) e uma frase sobre cada um: citar só a sigla pode não bastar.

**Conferência nas fontes (trechos literais)**

- PostgreSQL, recuperação até um ponto no tempo: “this technique supports point-in-time recovery: it is possible to restore the database to its state at any time since your base backup was taken.”
- PostgreSQL, testar o procedimento: “you should set up and test your procedure for archiving WAL files before you take your first base backup.”


## R1: TRF-4 2019, Analista Judiciário, Sistemas de TI: Questão 1 (Segurança da Informação) - REAL

**Tipo e fonte**

REAL (FCC, outro órgão e cargo). FCC, TRF da 4ª Região, Analista Judiciário, Área Apoio Especializado, Especialidade Tecnologia da Informação (Sistemas), 2019, caderno 04 tipo 001, Prova Estudo de Caso, Questão 1 (limite de 20 linhas, item 10.9 do edital do certame). Origem: prova em PDF obtida no agregador eticaconcursos.com.br, não no site da banca. O espelho oficial não foi localizado.

**Disciplinas:** Segurança da Informação. Limite: 20 linhas. Tempo de treino: 40 minutos. Módulos relacionados: Módulo 10.

**Enunciado**

Considere a seguinte situação hipotética:

Requisita-se a um Analista do TRF4 a implantação de processos de segurança da informação no ambiente do Tribunal. Para isso, vem pesquisando algumas bases a respeito de sistemas de criptografia, infraestrutura de chaves públicas, assinatura e certificação digital, protocolos criptográficos, VPN e SSL.

Tendo em vista essa pesquisa, pede-se:

O enunciado original traz, entre os itens a2 e b: "Para aprimorar seu ambiente computacional no que diz respeito à segurança lógica e física da informação, o processo de melhoria deve ser conduzido e orientado com base nas melhores práticas e em normas de segurança internacionalmente aceitas. Para tanto, deve-se implementar e implantar um Sistema de Gestão de Segurança da Informação − SGSI."

**Comandos**

- a1) Relacione os nomes e os tipos de chave dos processos de criptografia.
- a2) Explique, sucintamente, como funciona cada um desses processos de criptografia.
- b) Identifique procedimentos que devem ser estabelecidos para prevenir o acesso não autorizado aos sistemas e aplicações.
- c) Identifique procedimentos para proteger a confidencialidade, autenticidade e/ou integridade da informação.
- d) Descreva, sucintamente, o funcionamento de uma rede privada virtual e os benefícios de seu uso no ambiente de redes do TRF4.

**Espelho de correção AUTORAL (soma 100; não é o espelho da banca)**

- a1: criptografia simétrica (chave única compartilhada; exemplos AES, 3DES) e assimétrica (par de chaves, pública e privada; exemplos RSA, curvas elípticas): 15 pontos
- a2: simétrica usa a mesma chave para cifrar e decifrar (rápida; exige distribuir a chave com segurança); assimétrica cifra com a chave pública e decifra com a privada, ou assina com a privada e verifica com a pública: 20 pontos
- b: política de controle de acesso, gestão de usuários e privilégios (mínimo privilégio) com revisão periódica, autenticação forte (senhas robustas, MFA), registro e monitoração de acessos (logs): 20 pontos
- c: criptografia (confidencialidade), assinatura e certificado digital (autenticidade, integridade, não repúdio), função de hash (integridade) e controle de acesso: 20 pontos
- d: a VPN cria um túnel criptografado e autenticado sobre rede pública (por exemplo IPsec ou SSL/TLS); benefícios: sigilo e integridade do tráfego, acesso remoto seguro, menor custo que link dedicado: 25 pontos

**Resposta-modelo AUTORAL** (estimativa: cerca de 14 de 20 linhas, a 90 caracteres por linha)

a1. Simétrica: uma única chave compartilhada (AES, 3DES). Assimétrica: par de chaves, pública e privada (RSA, curvas elípticas).

a2. Na simétrica, a mesma chave cifra e decifra, o que é rápido, mas exige distribuir a chave com segurança. Na assimétrica, cifra-se com a chave pública e só a privada decifra; para assinar, usa-se a privada e verifica-se com a pública.

b. Política de controle de acesso; gestão de usuários e privilégios com mínimo privilégio e revisão periódica; autenticação forte, com senhas robustas e múltiplos fatores; registro e monitoração dos acessos em logs.

c. Criptografia, para a confidencialidade; assinatura e certificado digital, para autenticidade, integridade e não repúdio; função de hash, para a integridade; e controle de acesso.

d. A VPN cria um túnel criptografado e autenticado sobre uma rede pública, com protocolos como IPsec ou SSL/TLS. Benefícios: sigilo e integridade do tráfego, acesso remoto seguro e custo menor que o de um link dedicado.

**Comentários**

- Cinco comandos em 20 linhas dão em média 4 linhas por comando: a resposta-modelo é telegráfica de propósito, com uma ideia por frase.
- Os itens a2 e d dizem "sucintamente": profundidade só no que pontua. A palavra "relacione" (a1) pede nomes e tipos, sem explicação.
- O enunciado menciona SGSI e normas internacionais, mas não pede norma por nome: não cite número de norma de memória se não tiver certeza (a abordagem "diluída" ou errada pesa, item 11.10 do edital do TCE-GO).
- A banca divulga o espelho de correção na vista da prova (item 10.11 do edital do TRF-4 e item 11.20 do edital do TCE-GO). Aqui o espelho não é o oficial: foi montado a partir dos comandos.

**Conferência nas fontes (trechos literais)**

- AES (FIPS 197): “The AES algorithm is a symmetric block cipher that can encrypt (encipher) and decrypt (decipher) digital information.”
- RSA (RFC 8017): “This document provides recommendations for the implementation of public-key cryptography based on the RSA algorithm”
- IPsec (RFC 4301): “which is designed to provide security services for traffic at the IP layer.”


## R2: TRF-4 2019, Analista Judiciário, Sistemas de TI: Questão 2 (Programação PHP) - REAL

**Tipo e fonte**

REAL (FCC, outro órgão e cargo). FCC, TRF da 4ª Região, Analista Judiciário, Especialidade Tecnologia da Informação (Sistemas), 2019, caderno 04 tipo 001, Prova Estudo de Caso, Questão 2 (limite de 20 linhas, item 10.9 do edital do certame). Origem: prova em PDF obtida no agregador eticaconcursos.com.br, não no site da banca. O espelho oficial não foi localizado. O enunciado completo traz cerca de 150 linhas de código PHP (index.php, cadastrar.html, cadastra.php, Usuario.php, UsuarioDAO.php, recebe.php, p1.php e o comando CREATE TABLE); aqui estão a descrição resumida (autoral) e os comandos literais.

**Disciplinas:** Desenvolvimento de Sistemas e Segurança da Informação. Limite: 20 linhas. Tempo de treino: 40 minutos. Módulos relacionados: Módulo 1, Módulo 10.

**Enunciado**

Resumo autoral do enunciado: um Analista entregou a um Programador a parte de login de uma aplicação PHP, com lacunas I, II e III para completar. O formulário index.php envia usuário e senha a recebe.php; o cadastro (cadastrar.html) envia os dados a cadastra.php, que usa as classes Usuario e UsuarioDAO e grava em um banco MySQL chamado acesso, tabela usuarios (nome, email, usuario, senha). A página p1.php deve ser acessível só a quem fez login.

No papel de Programador(a), apresente:

**Comandos**

- a) O código faltante na lacuna I para receber nos arquivos cadastra.php e recebe.php os dados dos formulários filtrando-os (por meio de sanitize filters) para evitar os efeitos nocivos de caracteres especiais usados muitas vezes em ataques de hackers.
- b) O código faltante na lacuna II para incluir os dados recebidos no método inserir na tabela do banco de dados.
- c) O código faltante na lacuna III para fazer com que somente o usuário que tenha efetuado o login possa acessar a página p1.php, evitando o acesso direto de usuário sem sessão.
- d) O código para fazer a conexão com o Banco de Dados usando MySQLi.

**Espelho de correção AUTORAL (soma 100; não é o espelho da banca)**

- a: filter_input (ou filter_var) com INPUT_POST e filtro de sanitização (por exemplo FILTER_SANITIZE_SPECIAL_CHARS) para usuario e senha (e nome e email no cadastro): 25 pontos
- b: INSERT com declaração preparada (prepare e execute, com marcadores ?) na conexão PDO que o método inserir já abre, gravando nome, email, usuario e senha: 25 pontos
- c: se $_SESSION['usuario'] não estiver definida (isset), redirecionar com header("Location: index.php") e encerrar com exit: 25 pontos
- d: conexão MySQLi com new mysqli(servidor, usuário, senha, banco), com verificação de erro de conexão: 25 pontos

**Resposta-modelo AUTORAL** (estimativa: cerca de 8 de 20 linhas, a 90 caracteres por linha)

a. $usuario = filter_input(INPUT_POST, 'usuario', FILTER_SANITIZE_SPECIAL_CHARS); $senha = filter_input(INPUT_POST, 'senha', FILTER_SANITIZE_SPECIAL_CHARS); (em cadastra.php, o mesmo para $nome e $email, este com FILTER_SANITIZE_EMAIL).

b. $stmt = $conn->prepare("INSERT INTO usuarios (nome, email, usuario, senha) VALUES (?, ?, ?, ?)"); $stmt->execute([$User->Nome, $User->Email, $User->Usuario, $User->Senha]);

c. if (!isset($_SESSION['usuario'])) { header("Location: index.php"); exit(); }

d. $conn = new mysqli("localhost", "root", "", "acesso"); if ($conn->connect_error) { die("Falha na conexão: " . $conn->connect_error); }

**Comentários**

- PHP não está no programa do edital do TCE-GO (Desenvolvimento de Sistemas cita Java, JavaScript/Node.js, Python, React, TypeScript). Este caso treina o raciocínio de "completar a lacuna e justificar", não a sintaxe PHP. Código PHP aqui: não testado (PHP não está instalado na máquina do curso).
- O método inserir do enunciado já abre uma conexão PDO e o método buscar já usa marcadores (?); o item b segue esse mesmo estilo. O enunciado grava a senha como veio. Em produção, a senha deveria ser guardada com hash (a função password_hash do PHP cria um hash com algoritmo forte e de uma via). A questão não pede isso: responder o que foi pedido primeiro, e só acrescentar se sobrar linha.
- Filtros de sanitização não substituem consultas preparadas contra injeção de SQL; por isso o item b usa marcadores. Se o item a for lido ao pé da letra, sanitizar a senha altera caracteres especiais dela: é o que o comando pede ("filtrando-os"), mas vale a ressalva.
- Na prova do TCE-GO o tema da questão prática versa sobre os Conhecimentos Específicos (item 11.6 do edital), então o foco é o conteúdo do Anexo II; use este caso para treinar o formato (lacunas e comandos curtos).

**Conferência nas fontes (trechos literais)**

- PHP, filter_input: “filter_input — Gets a specific external variable by name and optionally filters it”
- PHP, filtro SANITIZE_SPECIAL_CHARS: “This filter HTML-encodes ', ", <, >, & and characters with an ASCII value less than 32.”
- PHP, mysqli::prepare: “The statement template can contain zero or more question mark (?) parameter markers”
- PHP, mysqli (conexão): “Opens a connection to the MySQL Server.”
- PHP, isset: “Determine if a variable is considered set, this means if a variable is declared and is different than null.”
- PHP, password_hash: “password_hash() creates a new password hash using a strong one-way hashing algorithm.”


## R3: TRT-20 2024, Analista Judiciário, Tecnologia da Informação (nuvem, DevSecOps e rede) - REAL

**Tipo e fonte**

REAL (FCC, outro órgão e cargo). FCC, TRT da 20ª Região, Analista Judiciário, Área Tecnologia da Informação, 2024, questão discursiva Q3558872 do Gran Questões (limite de 15 linhas, item 11.12 do edital do certame). Origem: texto da página do agregador questoes.grancursosonline.com.br, não do site da banca; o espelho oficial não foi localizado e o texto a seguir é só o enunciado.

**Disciplinas:** Computação em Nuvem, DevOps e Redes. Limite: 15 linhas. Tempo de treino: 40 minutos. Módulos relacionados: Módulo 3, Módulo 8.

**Enunciado**

Um Tribunal de Justiça Trabalhista está modernizando sua infraestrutura de TI para adotar uma abordagem ágil e DevSecOps, buscando melhorar a eficiência, segurança e escalabilidade no desenvolvimento de sistemas judiciais e administrativos. O Tribunal deseja desenvolver aplicações sem gerenciar a infraestrutura subjacente. Com relação à infraestrutura de redes, possui três switches interligados com múltiplos caminhos, resultando em tempestades de broadcast e alta utilização da CPU, causando lentidão na rede.

Desafios:

Migração para a nuvem: O Tribunal precisa de uma solução que permita focar no desenvolvimento e integração de segurança, sem preocupação com a infraestrutura subjacente.

Desenvolvimento web e mobile: É necessário entregar novos sistemas e aplicativos web e mobile de forma contínua e integrada, sem preocupação com a infraestrutura subjacente.

Interação de segurança (DevSecOps): A solução deve incluir automação e verificações de segurança e suporte a plugins de segurança com testes integrados.

Performance da rede: A rede com os 3 switches precisa de redundância de caminho, balanceamento de carga e alta largura de banda, sem depender de gerenciamento via SNMP, segmentação por VLANS e redes definidas por software (SDN).

Nesse cenário, diante dos desafios apresentados, considere que um Analista de Tecnologia da Informação do Tribunal deve informar, justificando sua resposta:

Observação do enunciado: "É necessário informar na sua resposta, obrigatoriamente, a letra do item correspondente."

**Comandos**

- a) o modelo de serviço em nuvem que atenda às necessidades do Tribunal.
- b) a solução mais adequada de integração continua e entrega continua com automação nativa de verificações de segurança e suporte a plugins de segurança que seria a mais adequada para o Tribunal.
- c) a solução mais adequada para resolver o problema da tempestade de broadcast, fornecer redundância de caminho entre os switches com convergência rápida, compartilhamento de carga, maior largura de banda e tolerância a falhas.

**Espelho de correção AUTORAL (soma 100; não é o espelho da banca)**

- a: PaaS (o consumidor implanta suas aplicações na infraestrutura do provedor, sem gerenciá-la), com justificativa ligada a "desenvolver sem gerenciar a infraestrutura": 30 pontos
- b: plataforma de CI/CD com varreduras de segurança no próprio pipeline (SAST, análise de dependências, DAST, contêineres) e extensível por plugins; um produto pode ser citado só como exemplo, justificando pelos requisitos: 35 pontos
- c1: RSTP (padrão 802.1w, incorporado ao 802.1Q) para eliminar os laços e a tempestade de broadcast, com convergência rápida: 20 pontos
- c2: agregação de links com LACP (802.1AX, antes 802.3ad) para somar banda, dividir carga e tolerar a falha de um link: 15 pontos

**Resposta-modelo AUTORAL** (estimativa: cerca de 11 de 15 linhas, a 90 caracteres por linha)

a. PaaS (plataforma como serviço): o Tribunal implanta e executa suas aplicações sem gerenciar servidores, rede ou sistema operacional, o que atende ao desejo de desenvolver sem se preocupar com a infraestrutura.

b. Uma plataforma de CI/CD que execute, dentro do pipeline, as varreduras de segurança (análise estática do código, de dependências e de contêineres, testes dinâmicos) a cada alteração e aceite plugins ou extensões de segurança. Exemplos: GitLab CI/CD ou Jenkins com plugins; o critério é a verificação integrada ao pipeline.

c. RSTP, que bloqueia os caminhos redundantes para eliminar os laços e a tempestade de broadcast e recupera a rede rapidamente após falha; somado à agregação de links com LACP, que une portas físicas em um canal lógico, somando banda, dividindo a carga e tolerando a queda de um link.

**Comentários**

- A questão exige a letra do item na resposta ("obrigatoriamente"): começar cada parágrafo por a., b. e c. garante isso.
- O item b depende do que a banca esperava. A página do agregador não traz o espelho, e fontes de resposta que encontrei na web divergem entre si (GitHub Actions, GitLab CI/CD, Jenkins), por isso este curso não declara um produto como o "certo": a resposta-modelo justifica pelos critérios do enunciado (varreduras nativas e plugins) e cita exemplos.
- O item c pede quatro propriedades (convergência rápida, compartilhamento de carga, banda e tolerância a falhas) para "a solução": RSTP resolve laço e convergência; LACP resolve banda, carga e tolerância a falhas. Se a banca esperava só um dos dois, a resposta com os dois ainda cobre o esperado.
- Fontes de rede aqui são a documentação do kernel Linux (modo 802.3ad) e a Wikipedia (STP, RSTP e LAG): não substituem o texto dos padrões IEEE, que não foram lidos.

**Conferência nas fontes (trechos literais)**

- NIST SP 800-145, PaaS: “Platform as a Service (PaaS). The capability provided to the consumer is to deploy onto the cloud infrastructure consumer-created or acquired applications”
- NIST SP 800-145, IaaS: “Infrastructure as a Service (IaaS). The capability provided to the consumer is to provision processing, storage, networks, and other fundamental computing resources”
- GitLab, varreduras no pipeline: “During development, scans run automatically as part of CI/CD pipelines when code is committed or merge requests are created.”
- Jenkins, plugins: “Plugins are the primary means of enhancing the functionality of a Jenkins environment to suit organization- or user-specific needs.”
- Wikipedia, laço de comutação (STP): “However, this connection configuration creates a switching loop resulting in broadcast radiations and MAC table instability.”
- Wikipedia, RSTP: “RSTP provides significantly faster recovery in response to network changes or failures”
- Linux bonding, modo 802.3ad: “IEEE 802.3ad Dynamic link aggregation. Creates aggregation groups that share the same speed and duplex settings.”
- Wikipedia, agregação de links: “Link aggregation increases total bandwidth beyond what a single connection could sustain, and provides redundancy where all but one of the physical links may fail without losing connectivity.”

