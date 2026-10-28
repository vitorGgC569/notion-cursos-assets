# Roteiro para usar no NotebookLM (Módulo 9: Engenharia de Software Assistida por IA e Sistemas Agentivos)

Passo a passo para montar o caderno pelo navegador. Os links finais devem ser colados na seção "NotebookLM" da página do módulo no Notion.

## 1. Montar o caderno
1. Crie um caderno novo com o nome "TCE-GO TI, Módulo 9: IA no desenvolvimento e agentes".
2. Em Fontes, envie os arquivos desta pasta: 01-resumo-teorico.md, 03-questoes-reais-comentadas.md e 04-simulado-autoral.md (se o NotebookLM não aceitar .md, use o 01-resumo-teorico.pdf ou cole o texto).
3. Adicione as URLs do arquivo 02-urls-publicas.md como fontes de Site ou YouTube. Comece pela documentação do MCP, pelo OWASP Top 10 para LLM, pelo guia "Building effective agents", pela documentação de prompt engineering e de tool use, pelo artigo do RAG e pelas 6 videoaulas.

## 2. Resumo em áudio (Audio Overview)
Instrução sugerida para personalizar: "Faça uma conversa em português do Brasil, para quem estuda para o concurso do TCE-GO (banca FCC, cargo Técnico de Controle Externo, TI). Foque em engenharia de software assistida por IA: LLMs, tokens, janela de contexto e temperatura; engenharia de prompt e de contexto; embeddings, busca semântica e bancos vetoriais; RAG (chunking, precision, recall e MRR); agentes de IA e o ciclo agentivo (descobrir, planejar, executar, verificar e corrigir); MCP, tool use e skills; assistentes de código em terminal e IDE; alucinações; segurança (injeção de prompt, OWASP Top 10 para LLM, excesso de agência), privacidade (LGPD), propriedade intelectual e ética. Explique as pegadinhas mais comuns de prova e diga o que é testado em cada tópico. Quando um assistente de código específico não tiver sido testado nas fontes, diga que é só documentação."

## 3. Resumo em vídeo (Video Overview)
Instrução sugerida: "Explique em português do Brasil, com exemplos visuais, o caminho de um pedido em linguagem natural até um código verificado: contexto, prompt, recuperação de trechos (RAG), laço do agente com ferramentas (MCP), testes automatizados e revisão humana, mostrando onde entram os riscos de segurança, para um candidato a Técnico de TI do TCE-GO."

## 4. Outras saídas úteis
- Mapa mental (Mind Map) a partir de todas as fontes.
- Cartões de estudo e quiz gerados a partir de 03-questoes-reais-comentadas.md (34 questões: 18 reais, sendo 10 da FGV, 6 do Cebraspe e 2 da FCC, e 16 autorais).
- Perguntas para o chat: "Quanto custa em tokens um agente que reenvia o histórico a cada passo?", "Qual a diferença entre RAG e fine-tuning?", "O que mede precision@k e o que mede recall@k?", "Qual a diferença entre um workflow e um agente?", "O que são host, cliente e servidor no MCP?", "Qual a diferença entre injeção de prompt direta e indireta?", "O que significa pass@k?", "O que é LLM06, Excessive Agency?".

## 5. Aviso importante sobre as questões
As questões de 03-questoes-reais-comentadas.md são 18 reais (10 da FGV, 6 do Cebraspe e 2 da FCC), cada uma com a banca, o órgão, o ano e o número, e 16 AUTORAIS, marcadas no título como "AUTORAL (não é de prova real)". Três questões reais (Câmara 2025, TRT-6 2025 e CPU-PE 2026) vieram de transcrições de agregadores e estão identificadas como tal. Não há questão real sobre MCP entre as incluídas: o tema é coberto por questões autorais. O arquivo 04-simulado-autoral.md traz 20 questões AUTORAIS no estilo FCC, que não são de provas reais. Peça ao NotebookLM para manter essa distinção e para nunca atribuir uma questão autoral a uma banca.

## 6. Sobre os laboratórios
Os laboratórios foram executados de verdade, localmente: contagem de tokens e janela de contexto, prompts, recuperação (chunking, BM25, precision, recall e MRR), embeddings e busca híbrida, RAG com um modelo local, um agente escrito do zero, um servidor MCP com o SDK oficial em Python, testes de injeção de prompt, geração de código avaliada por testes (pass@k) e uma conferência cruzada entre Python e JavaScript. O modelo de linguagem foi pequeno (Qwen2.5-1.5B-Instruct quantizado, rodando em CPU): os números ilustram os conceitos e não representam o desempenho dos assistentes de ponta. Itens não testados, marcados como tal no resumo teórico: Claude Code, Antigravity CLI, GitHub Copilot, APIs hospedadas, bancos vetoriais dedicados, treinamento (LoRA e RLHF) e padrões como ReWOO e ReAct além do laço simples. A norma TI-07 usada nos laboratórios é fictícia.

## 7. Depois de gerar
Cole na página do módulo (seção NotebookLM): o link do caderno, o link do resumo em vídeo e o link do resumo em áudio. Não compartilhe o caderno publicamente sem conferir as configurações de compartilhamento.
