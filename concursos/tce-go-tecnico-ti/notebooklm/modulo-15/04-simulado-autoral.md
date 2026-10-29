# Simulado autoral, Estudo de Caso (1 caso)

Caso AUTORAL, elaborado para este módulo no formato da FCC. Não é de prova real. Limite de 15 linhas, 40 minutos. Responda antes de ler a resposta-modelo.

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

