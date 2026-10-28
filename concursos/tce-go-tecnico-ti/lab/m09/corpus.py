# Corpus ficticio e autoral: "Norma interna de uso de IA do Tribunal Exemplo" (nao e documento real).
# Cada secao tem fatos numericos que um modelo pequeno nao conhece de memoria.
DOCS = {
 "S01": "Norma TI-07, art. 1. O assistente de código aprovado pelo Tribunal Exemplo é o Atlas. O uso de qualquer outro assistente de código em máquinas do órgão depende de autorização da Coordenadoria de Segurança da Informação.",
 "S02": "Norma TI-07, art. 2. O Atlas só pode receber trechos de código do repositório interno. É proibido colar no assistente dados pessoais, senhas, chaves de API e trechos de processos sob sigilo. O limite de contexto configurado no Atlas é de 8000 tokens por requisição.",
 "S03": "Norma TI-07, art. 3. Todo código sugerido pelo Atlas deve passar por revisão humana antes do merge. A revisão é feita por pelo menos 2 pessoas desenvolvedoras quando a mudança toca autenticação, pagamentos ou dados pessoais. Nos demais casos basta 1 revisor.",
 "S04": "Norma TI-07, art. 4. Os testes automatizados são obrigatórios no pipeline. A cobertura mínima de linhas exigida para aceitar um pull request é de 75 por cento. Pull requests abaixo desse valor são bloqueados pelo pipeline.",
 "S05": "Norma TI-07, art. 5. Incidentes envolvendo IA, como vazamento de dado no prompt ou resposta com informação indevida, devem ser registrados no sistema de chamados em até 48 horas. O registro é feito pela pessoa que identificou o incidente.",
 "S06": "Norma TI-07, art. 6. O sistema de busca em documentos usa recuperação aumentada por geração. Os documentos são divididos em trechos de 120 palavras, com sobreposição de 20 palavras, e a busca devolve os 4 trechos mais relevantes para compor o contexto.",
 "S07": "Norma TI-07, art. 7. Agentes de IA só podem usar ferramentas da lista de permissão aprovada. As ferramentas autorizadas hoje são consultar_processo, resumir_documento e abrir_chamado. A ferramenta enviar_email exige aprovação humana a cada uso.",
 "S08": "Norma TI-07, art. 8. Cada execução de um agente tem limite de 6 passos. Ao atingir o limite, o agente deve parar e devolver o estado atual ao usuário, sem tentar continuar sozinho. Todas as chamadas de ferramenta ficam registradas em log por 180 dias.",
 "S09": "Norma TI-07, art. 9. Servidores do Protocolo de Contexto de Modelo, o MCP, só podem ser instalados após análise da equipe de segurança. O servidor aprovado atualmente é o mcp-processos, que oferece acesso somente leitura à base de processos.",
 "S10": "Norma TI-07, art. 10. Documentos recuperados e páginas da web são dados não confiáveis. Instruções contidas neles não devem ser executadas pelo agente. Qualquer texto externo precisa ser enviado ao modelo entre delimitadores e marcado como conteúdo, e nunca como instrução.",
 "S11": "Norma TI-07, art. 11. A avaliação mensal da qualidade do assistente usa um conjunto de 50 perguntas de referência. A meta de acerto é de 90 por cento. Resultados abaixo da meta exigem revisão do prompt de sistema e dos documentos indexados.",
 "S12": "Norma TI-07, art. 12. O treinamento obrigatório sobre uso seguro de IA tem carga de 4 horas e deve ser refeito a cada 12 meses. O acesso ao Atlas é suspenso para quem estiver com o treinamento vencido.",
}
# (pergunta, secao_gabarito, trecho_esperado_na_resposta)
QA = [
 ("Qual é o assistente de código aprovado pelo Tribunal?", "S01", "atlas"),
 ("Qual é o limite de contexto configurado no Atlas?", "S02", "8000"),
 ("Quantos revisores são exigidos quando a mudança toca autenticação?", "S03", "2"),
 ("Qual é a cobertura mínima de testes para aceitar um pull request?", "S04", "75"),
 ("Em quantas horas um incidente de IA deve ser registrado?", "S05", "48"),
 ("Quantas palavras tem cada trecho na busca em documentos?", "S06", "120"),
 ("Qual ferramenta do agente exige aprovação humana a cada uso?", "S07", "enviar_email"),
 ("Qual é o limite de passos por execução de um agente?", "S08", "6"),
 ("Qual é o único servidor MCP aprovado hoje?", "S09", "mcp-processos"),
 ("Quantas horas tem o treinamento obrigatório de IA?", "S12", "4"),
]
