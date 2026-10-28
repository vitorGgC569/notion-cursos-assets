# Roteiro para usar no NotebookLM (Módulo 8: DevOps, Plataforma de Desenvolvimento e Engenharia de Entrega)

Passo a passo para montar o caderno pelo navegador. Os links finais devem ser colados na seção "NotebookLM" da página do módulo no Notion.

## 1. Montar o caderno
1. Crie um caderno novo com o nome "TCE-GO TI, Módulo 8: DevOps e Engenharia de Entrega".
2. Em Fontes, envie os arquivos desta pasta: 01-resumo-teorico.md, 03-questoes-reais-comentadas.md e 04-simulado-autoral.md (se o NotebookLM não aceitar .md, use o 01-resumo-teorico.pdf ou cole o texto).
3. Adicione as URLs do arquivo 02-urls-publicas.md como fontes de Site ou YouTube. Comece pelo livro Pro Git, pela documentação do Docker, do Kubernetes, do GitHub Actions, do GitLab CI/CD e do Terraform, pelas páginas sobre CI/CD da Red Hat e do GitLab, pela documentação do Prometheus e do OpenTelemetry e pelas 6 videoaulas.

## 2. Resumo em áudio (Audio Overview)
Instrução sugerida para personalizar: "Faça uma conversa em português do Brasil, para quem estuda para o concurso do TCE-GO (banca FCC, cargo Técnico de Controle Externo, TI). Foque em DevOps: cultura e métricas DORA, Git (três áreas, merge, rebase, reset e revert), fluxos de branching (Git Flow, GitHub Flow e trunk-based), pull request, integração e entrega contínuas, GitHub Actions, GitLab CI/CD e Jenkins, DevSecOps, Docker (imagem, camadas, Dockerfile, Compose), Kubernetes (Pod, Deployment, Service, probes), infraestrutura como código (Terraform e Ansible) e observabilidade (métricas, logs e traces, Prometheus e Grafana). Explique as pegadinhas mais comuns de prova e diga o que é testado em cada tópico."

## 3. Resumo em vídeo (Video Overview)
Instrução sugerida: "Explique em português do Brasil, com exemplos visuais, o caminho de um commit até a produção: Git e pull request, pipeline de CI/CD com testes, imagem Docker, implantação no Kubernetes e monitoramento, para um candidato a Técnico de TI do TCE-GO."

## 4. Outras saídas úteis
- Mapa mental (Mind Map) a partir de todas as fontes.
- Cartões de estudo e quiz gerados a partir de 03-questoes-reais-comentadas.md (44 questões reais: 14 da FCC, 10 da FGV e 20 do Cebraspe).
- Perguntas para o chat: "Qual a diferença entre merge e rebase?", "Quando usar reset e quando usar revert?", "Qual a diferença entre entrega contínua e implantação contínua?", "O que o depends_on do Compose garante?", "Para que servem as probes liveness e readiness?", "O que é drift na infraestrutura como código?", "Qual a diferença entre métricas, logs e traces?".

## 5. Aviso importante sobre as questões
As questões de 03-questoes-reais-comentadas.md são reais: 14 da FCC (provas de Técnico e de Analista Judiciário de TI de tribunais regionais do trabalho), 10 da FGV (SEFAZ-AM 2022 e TJDFT 2022) e 20 do Cebraspe (BCB 2024, TCU 2025 e FUNPRESP-JUD 2026, no formato Certo ou Errado), cada uma com a banca, o órgão, o ano e o número da questão. A FCC tem pouco histórico em DevOps: entre as questões da FCC incluídas não há nenhuma sobre infraestrutura como código, Terraform, GitHub Actions, Jenkins, Prometheus ou Grafana, e a cobertura desses temas vem de FGV e Cebraspe. O arquivo 04-simulado-autoral.md traz 27 questões AUTORAIS no estilo FCC, que não são de provas reais. Peça ao NotebookLM para manter essa distinção e para nunca atribuir uma questão autoral a uma banca.

## 6. Sobre os laboratórios
O Laboratório do módulo foi executado de verdade em Linux (Git, GitHub Actions com act, GitLab CI com gitlab-ci-local, Docker, Compose, OpenTofu, Ansible, Kubernetes com kind e observabilidade com Prometheus). Os itens não testados, como Jenkins, um servidor GitLab real, os runners hospedados do GitHub, a nuvem real e o balanceamento de Services do Kubernetes, estão marcados como "não testado" no resumo teórico. O simulador e o gerador de questões de Git são um modelo didático conferido contra o Git real, não substituem o Git.

## 7. Depois de gerar
Cole na página do módulo (seção NotebookLM): o link do caderno, o link do resumo em vídeo e o link do resumo em áudio. Não compartilhe o caderno publicamente sem conferir as configurações de compartilhamento.
