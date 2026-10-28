# Simulado autoral estilo FCC, IA e agentes (20 questões)

Questões AUTORAIS, elaboradas para este módulo no estilo da FCC (cinco alternativas, uma correta). Não são questões de provas reais; cada uma está marcada como autoral. Usam a norma fictícia TI-07 do Tribunal Exemplo e os resultados reais dos laboratórios do módulo.

## Questão 1 (LLM) - AUTORAL (não é de prova real)

Sobre o funcionamento básico de um grande modelo de linguagem (LLM) baseado em transformer, é correto afirmar que ele

A) é treinado para prever o próximo token e usa o mecanismo de atenção para ponderar a relação entre os tokens do contexto.
B) processa a entrada obrigatoriamente de forma sequencial, uma palavra por vez, sem paralelismo.
C) guarda uma tabela fixa com um número para cada palavra e nunca usa o contexto.
D) consulta um banco de dados relacional a cada token gerado.
E) é determinístico em qualquer temperatura, pois usa regras formais.

**Gabarito: A.** O modelo aprende a prever o próximo token; a atenção permite que cada token pondere os demais, e o processamento da sequência é paralelo (diferença para as redes recorrentes). Os embeddings são vetores aprendidos, não uma tabela fixa. A saída só é quase determinística em temperatura 0. Laboratório L1.

## Questão 2 (Tokens) - AUTORAL (não é de prova real)

Uma equipe mediu que um texto em português de 56 caracteres gerou 15 tokens. Mantida essa proporção, aproximadamente quantos tokens terá um texto de 560 caracteres no mesmo idioma?

A) cerca de 56 tokens.
B) cerca de 150 tokens.
C) cerca de 560 tokens.
D) cerca de 15 tokens.
E) cerca de 1500 tokens.

**Gabarito: B.** Proporção de 15 tokens para 56 caracteres (cerca de 3,7 caracteres por token). Para 560 caracteres, 10 vezes mais: 15 × 10 = 150 tokens. O custo e o limite de um modelo são medidos em tokens, não em caracteres nem em palavras. Laboratório L1.

## Questão 3 (Tokens) - AUTORAL (não é de prova real)

Um modelo com janela de 8000 tokens recebe um prompt de sistema de 400 tokens, 3000 tokens de histórico e dois trechos recuperados de 1100 tokens cada. Reservando o restante da janela para a resposta, o limite máximo da resposta, em tokens, é

A) 1200.
B) 3600.
C) 4600.
D) 2400.
E) 5600.

**Gabarito: D.** Entrada = 400 + 3000 + 2 × 1100 = 5600. Restam 8000 − 5600 = 2400. Entrada e saída dividem a janela; 5600 é o tamanho da entrada, não o que resta. Laboratório L1.

## Questão 4 (Prompt) - AUTORAL (não é de prova real)

Em engenharia de prompt, fornecer ao modelo, dentro do próprio prompt, três exemplos de chamados já classificados antes de pedir a classificação de um novo chamado caracteriza a técnica

A) few-shot.
B) zero-shot.
C) chain-of-thought.
D) fine-tuning.
E) RLHF.

**Gabarito: A.** Few-shot = demonstrações no prompt. Zero-shot não tem exemplos; chain-of-thought pede raciocínio passo a passo; fine-tuning e RLHF alteram pesos, fora do prompt. Laboratório L2: 5/12 em zero-shot contra 8/12 com 3 exemplos (modelo local pequeno).

## Questão 5 (RAG) - AUTORAL (não é de prova real)

Uma equipe deseja que um assistente responda perguntas sobre normas internas que mudam todo mês, citando a fonte e sem retreinar o modelo a cada mudança. A abordagem mais adequada é

A) fine-tuning do modelo a cada mudança de norma.
B) reduzir a temperatura a zero, apenas.
C) RAG: recuperar os trechos da norma vigente e inseri-los no prompt.
D) aumentar o número de camadas do modelo.
E) usar zero-shot sem nenhum documento.

**Gabarito: C.** RAG mantém o conhecimento fora do modelo, no índice, e o atualiza sem retreinar; permite citar a fonte e reduz alucinação em fatos privados. Temperatura zero não cria conhecimento. Laboratório L5: sem recuperação 1/10; com RAG 10/10.

## Questão 6 (RAG) - AUTORAL (não é de prova real)

Um documento de 1000 palavras é dividido em trechos de 120 palavras com sobreposição de 20. Usando ⌈(N − tamanho) / (tamanho − sobreposição)⌉ + 1, o número de trechos é

A) 8.
B) 9.
C) 11.
D) 10.
E) 12.

**Gabarito: D.** (1000 − 120) / (120 − 20) = 880 / 100 = 8,8; o teto é 9; 9 + 1 = 10. O último trecho pode ser menor. Laboratório L3: código e fórmula deram 10.

## Questão 7 (RAG) - AUTORAL (não é de prova real)

A busca por similaridade em um índice vetorial devolveu 4 trechos, dos quais 2 são relevantes, e há 5 trechos relevantes no total. A precision@4 e o recall@4 valem, respectivamente,

A) 0,40 e 0,50.
B) 0,50 e 0,40.
C) 0,50 e 0,50.
D) 0,25 e 0,40.
E) 0,40 e 1,00.

**Gabarito: B.** precision@4 = 2/4 = 0,50; recall@4 = 2/5 = 0,40. Precisão divide pelo número de itens devolvidos; revocação divide pelo total de relevantes. Laboratório L3.

## Questão 8 (RAG) - AUTORAL (não é de prova real)

Em uma busca por embeddings, a pergunta do usuário não tem nenhuma palavra em comum com o trecho correto, mas tem o mesmo significado. A técnica que tende a encontrar o trecho é

A) a busca lexical BM25, apenas.
B) a ordenação alfabética dos trechos.
C) a busca densa por similaridade de vetores (cosseno).
D) o filtro por tamanho do trecho.
E) a contagem de caracteres do trecho.

**Gabarito: C.** Embeddings aproximam significados; o BM25 depende de termos em comum. No laboratório, com 4 perguntas parafraseadas, o BM25 acertou 0 e a busca densa acertou 3. Na prática combinam-se as duas (busca híbrida). Laboratório L4.

## Questão 9 (Agentes) - AUTORAL (não é de prova real)

Em um agente baseado em LLM, o laço em que o modelo decide a próxima ação, uma ferramenta é executada, o resultado é devolvido ao modelo e o ciclo se repete até a conclusão é descrito pelo padrão

A) ReWOO, em que nenhuma observação é lida antes do fim.
B) zero-shot, por não ter exemplos.
C) fine-tuning supervisionado.
D) RLHF.
E) ReAct (raciocínio e ação, com observação).

**Gabarito: E.** ReAct alterna pensar, agir e observar, replanejando a cada resultado. ReWOO planeja antes, sem esperar as observações. Os demais itens não descrevem laço de agente. Laboratório L6.

## Questão 10 (Agentes) - AUTORAL (não é de prova real)

Em um agente, o histórico completo é reenviado ao modelo a cada passo. Com pedido inicial de 200 tokens (S), 100 tokens acrescentados por passo (A) e 4 passos (N), o total de tokens de entrada, N·S + A·N(N−1)/2, é

A) 800.
B) 1000.
C) 1200.
D) 2400.
E) 1400.

**Gabarito: E.** 4 × 200 = 800; 100 × 4 × 3 / 2 = 600; total = 1400. O custo cresce de forma quadrática com o número de passos, por isso há limite de passos e poda do histórico. Laboratório L10.

## Questão 11 (Agentes) - AUTORAL (não é de prova real)

Para que um agente autônomo não execute ações destrutivas ou fora do escopo, mesmo que o modelo as solicite, o controle mais confiável é

A) pedir educadamente no prompt de sistema que o agente seja cuidadoso.
B) uma lista de permissão de ferramentas aplicada pelo código, com aprovação humana para ações irreversíveis.
C) aumentar a temperatura para diversificar as ações.
D) aumentar a janela de contexto.
E) desativar os logs para reduzir ruído.

**Gabarito: B.** O prompt é só uma sugestão ao modelo; o código que executa as ferramentas é quem pode impor a regra (privilégio mínimo). Laboratório L8: apagar_repositorio foi bloqueado por estar fora da lista, e enviar_email exigiu aprovação humana. OWASP LLM06, Excessive Agency.

## Questão 12 (MCP) - AUTORAL (não é de prova real)

No Model Context Protocol (MCP), as três primitivas que um servidor pode oferecer à aplicação são

A) hosts, clientes e servidores.
B) stdio, HTTP e WebSocket.
C) tokens, embeddings e chunks.
D) tools, resources e prompts.
E) commits, branches e tags.

**Gabarito: D.** Tools (funções executáveis), resources (dados somente leitura por URI) e prompts (modelos de instrução). Host, cliente e servidor são os participantes; stdio e HTTP são transportes. Laboratório L7.

## Questão 13 (MCP) - AUTORAL (não é de prova real)

Sobre o MCP, assinale a afirmativa correta.

A) A camada de dados usa JSON-RPC 2.0, e o transporte stdio liga a aplicação a um servidor local.
B) O MCP define qual LLM a aplicação deve usar.
C) O MCP só funciona com servidores remotos.
D) Cada servidor MCP precisa de um host diferente para cada cliente.
E) O MCP substitui a necessidade de controle de acesso nas ferramentas.

**Gabarito: A.** O MCP padroniza a conexão entre a aplicação de IA e ferramentas e dados; não define como a aplicação usa o LLM. Há transportes local (stdio) e remoto (HTTP). Servidores de terceiros continuam exigindo privilégio mínimo e revisão. Laboratório L7.

## Questão 14 (Segurança) - AUTORAL (não é de prova real)

Um agente que resume páginas da web é induzido por um texto escondido na página a enviar dados a um endereço externo. Esse ataque é um exemplo de

A) injeção de prompt direta, digitada pelo usuário.
B) envenenamento do pré-treino do modelo.
C) injeção de prompt indireta.
D) estouro da janela de contexto.
E) ataque de força bruta a senhas.

**Gabarito: C.** A instrução maliciosa veio de conteúdo externo lido pelo agente: é indireta (OWASP LLM01). A mitigação principal é limitar o que o agente pode fazer (LLM06) e exigir aprovação humana. Laboratório L8.

## Questão 15 (Segurança) - AUTORAL (não é de prova real)

Na edição 2025 do OWASP Top 10 para aplicações com LLM, o item LLM06 é o risco em que um agente recebe permissões, funções ou autonomia além do necessário. Esse risco é

A) Prompt Injection.
B) Excessive Agency.
C) System Prompt Leakage.
D) Unbounded Consumption.
E) Misinformation.

**Gabarito: B.** LLM01 Prompt Injection, LLM02 Sensitive Information Disclosure, LLM03 Supply Chain, LLM04 Data and Model Poisoning, LLM05 Improper Output Handling, LLM06 Excessive Agency, LLM07 System Prompt Leakage, LLM08 Vector and Embedding Weaknesses, LLM09 Misinformation, LLM10 Unbounded Consumption.

## Questão 16 (Código) - AUTORAL (não é de prova real)

Um assistente de código gerou uma função e o teste automatizado do projeto falhou. A conduta correta de um profissional é

A) aceitar o código, pois o assistente é confiável.
B) remover o teste para o pipeline passar.
C) pedir que o assistente declare que o código está correto.
D) publicar em produção e monitorar depois.
E) tratar o teste como critério, corrigir (ou devolver a falha ao assistente) e manter a revisão humana do diff.

**Gabarito: E.** O teste automatizado é o juiz objetivo; o assistente não se autoavalia. Laboratório L9: 4 de 8 funções passaram de primeira (50%); com uma retentativa guiada pela mensagem do teste, 5 de 8 (62%).

## Questão 17 (Avaliação) - AUTORAL (não é de prova real)

Para uma tarefa de geração de código foram geradas n = 5 amostras e c = 2 passaram nos testes. Pelo estimador pass@k = 1 − C(n−c, k) / C(n, k), o valor de pass@2 é

A) 0,40.
B) 0,50.
C) 0,60.
D) 0,70.
E) 0,80.

**Gabarito: D.** pass@2 = 1 − C(3,2)/C(5,2) = 1 − 3/10 = 0,70. Para k = 1: 1 − 3/5 = 0,40. Laboratório L9 e L10: o estimador em Python e em JavaScript concorda.

## Questão 18 (SDLC) - AUTORAL (não é de prova real)

Sobre o papel da IA no ciclo de vida de desenvolvimento de software, é correto afirmar que ela

A) pode auxiliar em requisitos, código, testes, revisão e documentação, mas o código gerado deve passar pelos mesmos testes e pela revisão humana.
B) dispensa testes automatizados, pois o código gerado é sempre correto.
C) só pode ser usada na fase de implantação.
D) elimina a necessidade de requisitos.
E) garante ausência de vulnerabilidades.

**Gabarito: A.** Os absolutos ("sempre", "dispensa", "garante", "elimina") são o erro das demais. A IA propõe; o teste, a análise estática e o humano decidem. Questão ALEGO 2026 (FGV) sobre o tema trouxe os três itens de vantagem como corretos.

## Questão 19 (Código) - AUTORAL (não é de prova real)

Um arquivo de instruções do repositório (por exemplo, AGENTS.md) lido por um assistente de código tem como função principal

A) substituir a revisão humana dos pull requests.
B) impor tecnicamente o que o assistente pode ou não fazer.
C) informar ao assistente comandos de build e teste, convenções e restrições do projeto, como parte do contexto.
D) treinar novamente o modelo com os arquivos do projeto.
E) armazenar as senhas do projeto de forma segura.

**Gabarito: C.** É contexto em linguagem natural entregue ao modelo: ajuda, mas não é controle técnico (quem impõe o limite é a permissão da ferramenta). Não retreina o modelo e não é cofre de segredos. Nomes e formatos variam por ferramenta (não testado aqui).

## Questão 20 (Avaliação) - AUTORAL (não é de prova real)

Uma equipe avalia seu assistente RAG com 50 perguntas de referência, cada uma com a resposta esperada, e exige 90% de acerto antes de liberar uma nova versão. Esse procedimento é um exemplo de

A) ajuste fino supervisionado do modelo.
B) injeção de prompt direta.
C) compressão do contexto.
D) busca lexical.
E) avaliação com conjunto de referência (golden set) e critério de aceite.

**Gabarito: E.** Um conjunto fixo de perguntas e respostas esperadas permite comparar versões e impedir regressões (como testes de regressão em software). A norma fictícia do laboratório define exatamente esse critério. Laboratório L5.
