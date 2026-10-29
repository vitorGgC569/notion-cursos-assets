# Roteiro para usar no NotebookLM (Módulo 14: Língua Inglesa)

Passo a passo para montar o caderno pelo navegador. Os links finais devem ser colados na seção "NotebookLM" da página do módulo no Notion.

## 1. Montar o caderno
1. Crie um caderno novo com o nome "TCE-GO TI, Módulo 14: Língua Inglesa".
2. Em Fontes, envie os arquivos desta pasta: 01-resumo-teorico.md, 03-questoes-reais-comentadas.md e 04-simulado-autoral.md (se o NotebookLM não aceitar .md, use o 01-resumo-teorico.pdf ou cole o texto).
3. Adicione as URLs do arquivo 02-urls-publicas.md como fontes de Site. Comece por RFC 2119, MDN (status HTTP), SemVer e Keep a Changelog. Se o NotebookLM não conseguir ler uma página grande, baixe o texto e envie como arquivo.

## 2. Resumo em áudio (Audio Overview)
Instrução sugerida: "Faça uma conversa em português do Brasil, para quem estuda para o concurso do TCE-GO (banca FCC, cargo Técnico de Controle Externo, TI). Foque em Língua Inglesa para TI: estratégias de leitura (skimming e scanning), armadilhas das alternativas, conectivos, falsos amigos, e leitura de documentação (RFC 2119, códigos HTTP, SemVer e changelog). Use termos em inglês quando necessário, explique em português e lembre que as questões reais citadas são de outros órgãos."

## 3. Resumo em vídeo (Video Overview)
Instrução sugerida: "Explique em português do Brasil, com esquemas visuais, a diferença entre skimming e scanning, as famílias de conectivos, os níveis MUST, SHOULD e MAY, as classes de códigos HTTP e o versionamento MAJOR.MINOR.PATCH. Use somente o que está nas fontes."

## 4. Outras saídas úteis
- Mapa mental (Mind Map) a partir de todas as fontes.
- Cartões de estudo e quiz gerados a partir de 03-questoes-reais-comentadas.md (22 questões: 10 reais da FCC e 12 autorais).
- Perguntas para o chat: "Qual a diferença entre must e should na RFC 2119?", "O que significa 401 e como difere de 403?", "Quando sobe o MINOR no SemVer?", "Quais conectivos indicam contraste?".

## 5. Aviso importante sobre as questões
As questões de 03-questoes-reais-comentadas.md são 10 reais da FCC (provas de TJ-CE 2022 e AL-SP 2010, de sites agregadores) e 12 AUTORAIS, marcadas no título como "AUTORAL (não é de prova real)". Peça ao NotebookLM para manter essa marcação ao gerar cartões e quizzes.

## 6. Sobre os laboratórios
Os laboratórios são scripts em Python executados de verdade, localmente, sobre as fontes baixadas, sem alterar configurações do sistema: lista de fontes (L1), provas reais (L2), 46 citações (L3), 32 questões (L4) e vocabulário e códigos HTTP (L5). Não testado: execução em Windows e macOS, o texto das páginas depois de 28/10/2026 e os recursos e anulações das provas.

## 7. Depois de gerar
Cole na página do módulo (seção NotebookLM): o link do caderno, o link do resumo em vídeo e o link do resumo em áudio. Não compartilhe o caderno publicamente sem conferir as configurações de compartilhamento.
