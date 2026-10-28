# Simulado autoral estilo FCC, DevOps (27 questões)

Questões AUTORAIS, elaboradas para este módulo no estilo da FCC (cinco alternativas, uma correta). Não são questões de provas reais; cada uma está marcada como autoral.

## Questão 1 (DevOps) - autoral

Uma equipe adota DevOps e quer medir o desempenho da entrega de software. Entre as métricas DORA estão a frequência de implantação, o tempo de espera das mudanças, a taxa de falha das mudanças e o

A) número de linhas de código por desenvolvedor.
B) tempo para restaurar o serviço após uma falha.
C) custo da licença das ferramentas de pipeline.
D) número de commits por sprint, apenas.
E) percentual de cobertura de testes de unidade, apenas.

**Gabarito: B.** As quatro métricas DORA são: frequência de implantação, tempo de espera (*lead time*) das mudanças, taxa de falha das mudanças e tempo de recuperação do serviço. As demais alternativas são métricas de volume ou de qualidade isoladas, não métricas DORA.

## Questão 2 (Git) - autoral

O arquivo app.py acabou de ser criado e nunca foi adicionado ao Git. Em seguida o desenvolvedor executa git add app.py. A saída de git status --short passa de ?? para

A) A , indicando arquivo novo preparado (staged).
B) M, indicando arquivo modificado e não preparado.
C) D , indicando arquivo removido.
D) R , indicando arquivo renomeado.
E) UU, indicando conflito de merge.

**Gabarito: A.** O ?? marca arquivo não rastreado. Depois do git add ele fica preparado e a primeira coluna mostra A (added). A letra M aparece para arquivos já rastreados e alterados. Laboratório L1, seção 1.

## Questão 3 (Git) - autoral

Em um repositório Git, a branch main e a branch feature se separaram, e as duas receberam commits. Para integrar a feature à main preservando a história exatamente como ocorreu e criando um commit de junção, o desenvolvedor deve, estando na main, executar

A) git rebase feature.
B) git reset --hard feature.
C) git merge --no-ff feature.
D) git revert feature.
E) git cherry-pick feature, sem informar commit.

**Gabarito: C.** merge junta as histórias e, quando elas divergiram (ou com --no-ff), cria um commit de merge com dois pais. O rebase reescreve a história da branch atual sobre outra; reset --hard descarta alterações; revert desfaz um commit com outro commit. Laboratório L1: o --no-ff gera o commit de junção, e o git log --graph mostra o losango.

## Questão 4 (Git) - autoral

Em uma branch feature ainda não publicada, o desenvolvedor quer aplicar seus commits sobre o topo mais recente da main para obter uma história linear. O comando adequado, executado na feature, é

A) git merge --no-ff main.
B) git checkout -b main.
C) git reset --soft main.
D) git stash apply main.
E) git rebase main.

**Gabarito: E.** git rebase main reaplica os commits da feature sobre a ponta da main, produzindo história linear (os commits ganham novos hashes, por isso não se faz rebase de branch já publicada e compartilhada). O merge --no-ff criaria um commit de junção. Laboratório L1: o rebase muda os hashes dos commits.

## Questão 5 (Git) - autoral

Um desenvolvedor executa git reset --hard HEAD~1 por engano e perde o último commit. Para recuperá-lo, enquanto o Git ainda não coletou o objeto, ele pode consultar

A) o git blame, que guarda os commits excluídos.
B) o git stash list, que sempre guarda o último commit.
C) o git remote prune, que recria commits locais.
D) o git reflog, que registra os movimentos de HEAD, e voltar ao hash do commit perdido.
E) não há como recuperar, pois o reset apaga o objeto imediatamente.

**Gabarito: D.** O *reflog* é o diário local das posições de HEAD e das branches. O commit continua no banco de objetos até a coleta de lixo, então um git reset --hard <hash> o restaura. O blame mostra autoria de linhas. Laboratório L1: o reflog lista o commit antes do reset.

## Questão 6 (Git remoto) - autoral

Ao fazer git push para a branch main remota, o Git recusa o envio com a mensagem de que a atualização foi rejeitada porque o remoto contém trabalho que o desenvolvedor não tem localmente (*non-fast-forward*). A ação correta, mantendo uma história linear, é

A) executar git pull --rebase e depois repetir o git push.
B) usar git push --force sempre, sem verificar.
C) apagar a pasta .git e clonar de novo, perdendo os commits locais.
D) executar git remote remove origin.
E) executar git init novamente.

**Gabarito: A.** Alguém publicou commits antes. Trazê-los (git pull --rebase, ou fetch e merge) e só então publicar é o caminho seguro. O --force sobrescreveria o trabalho alheio. Laboratório L2: o push é rejeitado e, depois do pull --rebase, é aceito.

## Questão 7 (Git remoto) - autoral

Na estratégia Git Flow, correções urgentes de um defeito encontrado em produção devem sair de uma branch

A) feature, criada a partir da develop, e integrada apenas à develop.
B) release, criada a partir da feature, e apagada sem integração.
C) develop, que é sempre removida depois de cada deploy.
D) tag, que é uma branch móvel de produção.
E) hotfix, criada a partir da main, e depois integrada à main e à develop.

**Gabarito: E.** No Git Flow a main tem o que está em produção e a develop a integração; feature sai da develop, release prepara a versão e hotfix sai da main e volta para a main e a develop. Tag é uma marca fixa, não uma branch. Laboratório L2.

## Questão 8 (Git remoto) - autoral

No *trunk-based development*, a prática que permite integrar com frequência ao tronco código ainda incompleto, sem expô-lo ao usuário final, é

A) manter branches de longa duração por release.
B) o uso de *feature flags* (chaves de funcionalidade).
C) proibir testes automatizados.
D) publicar sempre direto em produção, sem pipeline.
E) exigir um merge por trimestre.

**Gabarito: B.** O tronco recebe commits pequenos e frequentes; a funcionalidade inacabada fica "desligada" por uma *flag*. Branches longas são típicas de fluxos como o Git Flow. Laboratório L2: o exemplo com flag liga e desliga a funcionalidade sem novo deploy.

## Questão 9 (CI/CD) - autoral

Em um pipeline de integração contínua, a etapa que verifica o código sem executá-lo, em busca de erros de estilo e de padrões, é a de

A) teste de carga em produção.
B) implantação em produção.
C) análise estática (*lint*).
D) monitoramento por métricas.
E) backup do repositório.

**Gabarito: C.** O *lint* (flake8, ESLint) e o SonarQube fazem análise estática: leem o código sem executá-lo. Teste de carga executa a aplicação; implantação publica o artefato. Laboratório L3: o flake8 reprovou o pipeline com F401, E305 e E402.

## Questão 10 (CI/CD) - autoral

A diferença entre entrega contínua (*continuous delivery*) e implantação contínua (*continuous deployment*) é que

A) a entrega contínua dispensa testes automatizados e a implantação contínua os exige.
B) as duas são sinônimos exatos em qualquer contexto.
C) na implantação contínua a produção é sempre publicada manualmente por um gerente.
D) na entrega contínua a publicação em produção depende de uma aprovação manual, e na implantação contínua toda mudança aprovada nos testes vai para produção automaticamente.
E) a entrega contínua só existe em Git Flow e a implantação em Scrum.

**Gabarito: D.** Nas duas o código está sempre pronto para publicar e passa por testes automatizados; a diferença é o último passo: aprovação humana (delivery) ou automático (deployment). Laboratório L4: o job deploy-producao com when: manual é entrega contínua; o deploy-homologacao automático é implantação contínua.

## Questão 11 (GitHub Actions) - autoral

Em um workflow do GitHub Actions, para que o job deploy só rode depois que o job test terminar com sucesso, usa-se, no job deploy, a chave

A) needs: test.
B) runs-on: test.
C) uses: test.
D) env: test.
E) strategy: test.

**Gabarito: A.** needs declara dependência entre jobs: sem ela os jobs rodam em paralelo. runs-on escolhe o executor, uses chama uma action, env define variáveis e strategy define a matriz. Laboratório L3: quando o teste falhou, os jobs build e deploy nem iniciaram.

## Questão 12 (GitHub Actions) - autoral

O trecho a seguir faz parte de um workflow do GitHub Actions.

on:
  push:
    branches: [main]
  pull_request:

É correto afirmar que o workflow é executado

A) somente quando uma tag é criada.
B) somente por agendamento (cron).
C) somente quando o repositório é criado.
D) nunca, pois branches exige lista com aspas duplas.
E) a cada push na branch main e a cada evento de pull request.

**Gabarito: E.** A chave on define os eventos que disparam o workflow: aqui, push filtrado pela branch main e qualquer pull_request. Tags usariam tags: e agendamento usaria schedule:. Laboratório L3: o cenário de pull request executa lint, teste e build e pula o deploy com if.

## Questão 13 (GitLab CI) - autoral

Em um .gitlab-ci.yml, a palavra-chave que define a lista e a ordem dos estágios do pipeline (por exemplo, test, build e deploy) é

A) include.
B) stages.
C) artifacts.
D) needs.
E) image.

**Gabarito: B.** stages declara os estágios e sua ordem; cada job escolhe o seu com stage:. include importa arquivos, artifacts guarda saídas do job, needs cria dependência direta entre jobs (ignorando a ordem estrita dos estágios) e image define a imagem do contêiner. Laboratório L4.

## Questão 14 (GitLab CI) - autoral

Sobre o GitLab CI/CD, é correto afirmar que o arquivo de configuração do pipeline

A) fica em .github/workflows e é executado por actions.
B) chama-se Jenkinsfile e é executado por agentes do Jenkins.
C) fica na raiz do repositório, chama-se .gitlab-ci.yml e é executado por runners.
D) chama-se docker-compose.yml e é executado pelo kubelet.
E) é gravado apenas na interface web e não pode ser versionado.

**Gabarito: C.** O pipeline é código versionado (*pipeline as code*) no .gitlab-ci.yml, e os *runners* executam os jobs. .github/workflows é do GitHub Actions e o Jenkinsfile do Jenkins. Laboratório L4 (gitlab-ci-local, sem GitLab real).

## Questão 15 (DevSecOps) - autoral

Uma ferramenta que escaneia as dependências do projeto em busca de bibliotecas com vulnerabilidades conhecidas (CVE) é classificada como

A) teste dinâmico de segurança (DAST).
B) teste de carga.
C) gerenciador de configuração.
D) análise de composição de software (SCA).
E) balanceador de carga.

**Gabarito: D.** SCA (*software composition analysis*) examina as dependências; SAST analisa o código-fonte; DAST ataca a aplicação em execução. No Laboratório L5 o Trivy fez algo semelhante sobre uma imagem de contêiner (CVEs do sistema e dos pacotes).

## Questão 16 (Docker) - autoral

Em um Dockerfile, a principal vantagem de copiar o arquivo de dependências e instalá-las antes de copiar o restante do código-fonte é

A) reduzir o tamanho da imagem para zero.
B) permitir que o contêiner rode sem kernel.
C) dispensar o uso da instrução FROM.
D) impedir que a imagem seja publicada em registro.
E) aproveitar o cache de camadas: se só o código mudar, a camada de instalação é reaproveitada.

**Gabarito: E.** Cada instrução gera uma camada e o *build* reaproveita as camadas intactas até a primeira que mudou. Colocar o que muda pouco (dependências) antes do que muda muito (código) evita reinstalar tudo. Laboratório L5: o Dockerfile ruim reinstalou o pip a cada alteração do código; o bom mostrou CACHED.

## Questão 17 (Docker) - autoral

O *multi-stage build* de um Dockerfile serve principalmente para

A) executar vários contêineres em hosts diferentes.
B) compilar em uma etapa e copiar apenas o resultado para uma imagem final pequena, sem as ferramentas de build.
C) substituir o Kubernetes na orquestração.
D) criptografar o registro de imagens.
E) eliminar a necessidade de um Dockerfile.

**Gabarito: B.** Cada FROM inicia um estágio; o último copia (COPY --from=) apenas o binário ou os artefatos. Laboratório L5: o programa em Go ocupou 2,04 MB em imagem scratch contra 412 MB na imagem única com o compilador.

## Questão 18 (Docker) - autoral

Um contêiner Docker grava dados em seu sistema de arquivos. Para que os dados sobrevivam à remoção do contêiner, deve-se usar

A) um volume (ou *bind mount*) montado no diretório de dados.
B) a camada gravável do contêiner, sem nenhuma montagem.
C) a instrução EXPOSE.
D) o comando docker stop, que sempre preserva tudo.
E) a instrução CMD.

**Gabarito: A.** A camada gravável do contêiner some com ele. Volumes são gerenciados pelo Docker e persistem. EXPOSE só documenta a porta. Laboratório L5 e L6: o contador do Redis continuou depois que o contêiner foi removido e recriado, porque estava em um volume nomeado.

## Questão 19 (Docker) - autoral

No Docker Compose, para que o serviço web só inicie depois que o serviço cache estiver saudável, usa-se em web

A) ports com o nome do serviço.
B) volumes com :ro.
C) depends_on com condition: service_healthy, junto de um healthcheck em cache.
D) image: latest.
E) restart: never.

**Gabarito: C.** O depends_on simples só ordena o início; com condition: service_healthy o Compose espera o *healthcheck* passar. Laboratório L6: o up mostra "Container cache Healthy" antes de "Container web Started".

## Questão 20 (Kubernetes) - autoral

No Kubernetes, o objeto que mantém um número desejado de réplicas de um Pod e permite atualização gradual (*rolling update*) e *rollback* é o

A) DaemonSet.
B) Namespace.
C) ConfigMap.
D) Deployment.
E) Node.

**Gabarito: D.** O Deployment gerencia ReplicaSets: cria o novo, reduz o antigo aos poucos e guarda o histórico para rollout undo. DaemonSet roda um Pod por nó; Namespace separa recursos; ConfigMap guarda configuração. Laboratório L8: os dois ReplicaSets (versões 1.29 e 1.30) ficam no cluster depois da atualização.

## Questão 21 (Kubernetes) - autoral

Em um Deployment do Kubernetes, a *readiness probe* do contêiner falha de forma contínua. O efeito esperado é que o Pod

A) seja reiniciado imediatamente pelo kubelet, em todos os casos.
B) seja movido para outro cluster.
C) seja excluído do namespace.
D) receba o dobro de tráfego.
E) continue em execução, mas seja retirado dos endpoints do Service, sem receber tráfego.

**Gabarito: E.** A *readiness* diz se o Pod está pronto para receber tráfego; falhar a tira dos endpoints. A *liveness* é que reinicia o contêiner. Laboratório L8: com a sonda apontada para um caminho inexistente, os Pods novos ficaram em 0/1 e o rollout não avançou.

## Questão 22 (IaC) - autoral

No Terraform (ou OpenTofu), o comando que mostra o que será criado, alterado ou destruído sem modificar a infraestrutura é

A) terraform plan.
B) terraform apply -auto-approve.
C) terraform destroy.
D) terraform taint.
E) terraform fmt.

**Gabarito: A.** plan compara o código, o estado e a infraestrutura real e exibe o plano; apply executa; destroy remove; fmt formata o código. Laboratório L7: o tofu plan anunciou "3 to add" antes do apply.

## Questão 23 (IaC) - autoral

Uma execução do terraform plan logo depois de um apply bem-sucedido, sem nenhuma alteração no código nem na infraestrutura, deve indicar

A) que todos os recursos serão recriados.
B) que o estado deve ser apagado.
C) que não há mudanças (*No changes*), por causa da idempotência.
D) erro obrigatório de sintaxe.
E) que o provedor foi desinstalado.

**Gabarito: C.** A infraestrutura como código declarativa converge para o estado desejado: se já está igual, nada muda. Laboratório L7: a segunda execução do plano e do Ansible (changed=0) mostrou isso.

## Questão 24 (IaC) - autoral

Sobre o Ansible, é correto afirmar que ele

A) exige um agente instalado em cada máquina e um servidor central obrigatório.
B) não exige agente nas máquinas gerenciadas (usa SSH) e procura ser idempotente.
C) só funciona com contêineres.
D) cria imagens Docker a partir de um Dockerfile.
E) substitui o Git no controle de versão.

**Gabarito: B.** O Ansible é *agentless*: o nó de controle conecta por SSH e aplica *playbooks* em YAML com módulos idempotentes. Puppet e Chef usam agente. Laboratório L7: o playbook mudou 3 itens na primeira execução e 0 na segunda; o --check --diff mostrou a correção que faria.

## Questão 25 (Observabilidade) - autoral

Na observabilidade, os três pilares são

A) CPU, memória e disco.
B) commits, branches e tags.
C) imagens, volumes e redes.
D) métricas, logs e traces.
E) alertas, tickets e relatórios.

**Gabarito: D.** Métricas são números ao longo do tempo (Prometheus), logs são registros de eventos (Logstash, Loki) e *traces* acompanham uma requisição entre serviços (OpenTelemetry, Jaeger). Laboratório L9 executa os três.

## Questão 26 (Observabilidade) - autoral

No Prometheus, um tipo de métrica que só aumenta (ou é zerada na reinicialização do processo), como o número total de requisições atendidas, é o

A) *gauge*.
B) *trace*.
C) *span*.
D) *dashboard*.
E) *counter*.

**Gabarito: E.** O *counter* só cresce; o *gauge* sobe e desce (conexões abertas, fila); o *histogram* mede distribuições (latência). Laboratório L9: Counter.inc(-1) levanta erro e o gauge, com inc(5) e dec(2), chega a 3.

## Questão 27 (Observabilidade) - autoral

No contexto de SRE, o acordo interno de que 99,9% das requisições devem ser atendidas com sucesso em uma janela de 30 dias é um exemplo de

A) SLO (objetivo de nível de serviço), medido por um SLI.
B) SLA contratual, sempre com multa.
C) tipo de teste de segurança.
D) estratégia de branching.
E) tipo de volume do Docker.

**Gabarito: A.** O SLI é o indicador medido (taxa de sucesso), o SLO é a meta interna e o SLA é o contrato com consequências para o cliente. A diferença entre 100% e o SLO é o *error budget* (orçamento de erro).
