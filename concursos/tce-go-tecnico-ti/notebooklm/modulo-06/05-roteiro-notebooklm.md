# Roteiro para usar no NotebookLM (Módulo 6: Banco de Dados)

Passo a passo para montar o caderno pelo navegador. Os links finais devem ser colados na seção "NotebookLM" da página do módulo no Notion.

## 1. Montar o caderno
1. Crie um caderno novo com o nome "TCE-GO TI, Módulo 6: Banco de Dados".
2. Em Fontes, envie os arquivos desta pasta: 01-resumo-teorico.md, 03-questoes-reais-comentadas.md e 04-simulado-autoral.md (se o NotebookLM não aceitar .md, use o 01-resumo-teorico.pdf ou cole o texto).
3. Adicione as URLs do arquivo 02-urls-publicas.md como fontes de Site ou YouTube. Comece pelas páginas do PostgreSQL sobre transações, isolamento, índices e EXPLAIN, pelas páginas da Wikipédia sobre normalização e ACID, pelas páginas da AWS e da IBM sobre NoSQL, bancos vetoriais e data warehouse, e pelas 6 videoaulas.

## 2. Resumo em áudio (Audio Overview)
Instrução sugerida para personalizar: "Faça uma conversa em português do Brasil, para quem estuda para o concurso do TCE-GO (banca FCC, cargo Técnico de Controle Externo, TI). Foque em Banco de Dados: modelo entidade-relacionamento, normalização (1FN a FNBC) e desnormalização, SQL (junções, subconsultas, agregação e o comportamento do NULL), álgebra relacional, transações e propriedades ACID, índices e planos de execução, views, procedures e triggers, PostgreSQL e Oracle, NoSQL (documentos, chave-valor, colunas e grafos, MongoDB e Redis), bancos vetoriais e embeddings, replicação, backup e alta disponibilidade, segurança e governança de dados. Use exemplos curtos e aponte as pegadinhas comuns em prova, como COUNT(coluna) com NULL, NOT IN com NULL e a diferença entre 3FN e FNBC."

## 3. Resumo em vídeo (Video Overview)
Instrução sugerida: "Explique em português do Brasil, com exemplos visuais, como normalizar uma tabela da 1FN até a FNBC, como uma transação mantém as propriedades ACID e como um índice B-tree acelera uma consulta, para um candidato a Técnico de TI do TCE-GO."

## 4. Outras saídas úteis
- Mapa mental (Mind Map) a partir de todas as fontes.
- Cartões de estudo e quiz gerados a partir de 03-questoes-reais-comentadas.md (52 questões da FCC, da FGV e do Cebraspe).
- Perguntas para o chat: "Qual a diferença entre 3FN e FNBC?", "Por que COUNT(*) e COUNT(coluna) dão resultados diferentes num LEFT JOIN?", "Por que NOT IN devolve vazio quando a subconsulta tem NULL?", "Quais são as quatro propriedades ACID e como cada uma é garantida?", "Quando um índice não é usado pelo otimizador?", "Qual a diferença entre replicação, backup e alta disponibilidade?", "Quando escolher documento, chave-valor, colunas ou grafo?".

## 5. Aviso importante sobre as questões
As questões de 03-questoes-reais-comentadas.md são reais: 34 da FCC (provas de Técnico e de Analista Judiciário de TI de tribunais regionais do trabalho), 14 da FGV e 4 do Cebraspe, cada uma com a banca, o órgão, o ano e o número da questão. Não há questão real localizada sobre transações e ACID, views, procedures e triggers, bancos vetoriais, backup e replicação, nem sobre segurança. O arquivo 04-simulado-autoral.md traz 25 questões AUTORAIS no estilo FCC, que não são de provas reais, e cobre esses assuntos. Peça ao NotebookLM para manter essa distinção nas respostas.

## 6. Depois de gerar
Cole na página do módulo (seção NotebookLM): o link do caderno, o link do resumo em vídeo e o link do resumo em áudio. Não compartilhe o caderno publicamente sem conferir as configurações de compartilhamento.
