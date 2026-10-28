# Questões reais (FCC, FGV e Cebraspe) com gabarito comentado

44 questões reais de DevOps, sendo 14 da FCC, 10 da FGV e 20 do Cebraspe (formato Certo ou Errado, letras C e E). A FCC, banca do concurso, tem pouco histórico neste tema, por isso o banco foi completado com a FGV e o Cebraspe, sempre com a banca, o órgão, o ano e o número identificados. Por assunto: Docker e contêineres 9, Kubernetes e orquestração 9, observabilidade e monitoramento 6, Git e controle de versão 5, DevOps, DevSecOps e qualidade 5, CI/CD e automação de build 5, pipelines (GitHub Actions, GitLab CI e Jenkins) 4 e infraestrutura como código 1. Entre as questões da FCC aqui incluídas não há nenhuma sobre infraestrutura como código, Terraform, GitHub Actions, Jenkins, Prometheus ou Grafana (as de observabilidade da FCC tratam de Zabbix e Logstash e a de pipeline trata de GitLab CI); esses temas aparecem só por FGV e Cebraspe, e o simulado autoral cobre o restante. O gabarito é o oficial (definitivo, quando houve recurso). Ficaram de fora a questão 101 do BCB 2024 e a 130 do TCU 2025, anuladas, e as questões de serverless e microsserviços (BCB 84, 85 e 86, TCU 152, FUNPRESP 64), que não estão no escopo do módulo. Os gabaritos da FCC do TRT-3 2015 e do TRT-4 2022 estavam em PDF escaneado e foram lidos a partir das imagens. As resoluções são próprias.

## Fontes das provas

- FCC, TRT-3 (MG) 2015, Técnico Judiciário, Tecnologia da Informação, caderno T32 tipo 1
- FCC, TRT-4 (RS) 2022, Técnico Judiciário, Apoio Especializado, TI, caderno T17 tipo 1
- FCC, TRT-5 (BA) 2022, Técnico Judiciário, Apoio Especializado, TI, caderno T20 tipo 1
- FCC, TRT-22 (PI) 2022, Técnico Judiciário, Apoio Especializado, TI, caderno K11 tipo 1
- FCC, TRT-23 (MT) 2022, Técnico Judiciário, Apoio Especializado, TI, caderno T18 tipo 1
- FCC, TRT-14 (RO/AC) 2022, Analista Judiciário, TI, caderno D04 tipo 1
- FCC, TRT-22 (PI) 2022, Analista Judiciário, TI, caderno G07 tipo 1
- FCC, TRT-5 (BA) 2022, Analista Judiciário, TI, caderno N14 tipo 1
- FGV, SEFAZ-AM 2022, Analista de Tecnologia da Informação da Fazenda Estadual, prova 2 (tarde), tipo 1 (branca)
- FGV, TJDFT 2022, Analista Judiciário, Suporte em Tecnologia da Informação, tipo 1 (branca)
- FGV, TJDFT 2022, Analista Judiciário, Análise de Sistemas, tipo 1 (branca)
- Cebraspe, Banco Central do Brasil (BCB) 2024, Analista, Tecnologia da Informação (cargo 2), aplicação em 04/08/2024
- Cebraspe, TCU 2025, Auditor Federal de Controle Externo, Tecnologia da Informação (Edital 1, de 24/10/2025)
- Cebraspe, FUNPRESP-JUD 2026, Analista de Tecnologia da Informação, Emprego 10, aplicação em 05/07/2026

## Questão 1 (Git e controle de versão) - FCC, TRT-3 (MG) 2015, questão 22

Um técnico de TI, utilizando o Git, marcou um arquivo modificado em sua versão corrente para que ele faça parte do snapshot do próximo commit. Esta ação colocou o arquivo no estado

A) preparado.
B) modificado.
C) consolidado.
D) persistido.
E) depreciado.

**Gabarito: A.** No Git um arquivo passa por três estados: modificado (alterado no diretório de trabalho), preparado (staged: marcado com git add para entrar no próximo commit) e consolidado (committed: guardado no repositório). Marcar o arquivo para o snapshot do próximo commit é prepará-lo. "Persistido" e "depreciado" não são estados do Git. Laboratório L1: git status --short mostra ?? para o arquivo novo, A  depois do git add (preparado) e  M quando ele é alterado depois do commit (modificado).

## Questão 2 (Git e controle de versão) - FCC, TRT-5 (BA) 2022, questão 26

Utilizando a ferramenta de versionamento Git, para mostrar, em linha de comando, a relação de arquivos com alterações pendentes para serem adicionados a um commit, um técnico deve utilizar o comando

A) git staged
B) git status
C) git remote show
D) git show files
E) git fetch files

**Gabarito: B.** git status lista os arquivos modificados ainda não preparados, os preparados (staged) e os não rastreados. git staged, git show files e git fetch files não existem como comandos (para ver só os preparados usa-se git diff --staged); git remote show mostra dados de um repositório remoto. Laboratório L1: a saída de git status separa "Changes to be committed" de "Changes not staged for commit".

## Questão 3 (Git e controle de versão) - FCC, TRT-14 (RO/AC) 2022, questão 28

Um analista está no diretório local ao qual o repositório Git remoto está vinculado. A partir desse diretório, para mover o arquivo tribunal.txt para a staging area, ele deve utilizar o comando

A) git move tribunal.txt to stage
B) git add tribunal.txt
C) git move tribunal.txt
D) git add tribunal.txt to stage
E) git stage tribunal.txt

**Gabarito: B.** A staging area (índice) recebe o arquivo com git add tribunal.txt. Não existem git move nem git stage como sintaxe válida desse tipo, e to stage não faz parte do comando. Não confunda com git mv, que renomeia ou move arquivos dentro do repositório. Laboratório L1: git add seguido de git status --short mostra a letra A na primeira coluna.

## Questão 4 (Git e controle de versão) - FCC, TRT-5 (BA) 2022, questão 30

Considere que um analista adicionou o repositório Git remoto por meio do comando abaixo.

git remote add analista https://github.com/analista/projeto.git

Para remover essa conexão do repositório remoto utiliza-se a instrução

A) git remote remove analista
B) git remote delete origin
C) git remote remove projeto.git
D) git remote prune analista
E) git remote delete https://github.com/analista/projeto.git

**Gabarito: A.** O argumento é sempre o nome do remoto (aqui analista), nunca a URL nem o nome do arquivo do projeto: git remote remove analista (existe também o apelido git remote rm). git remote delete não é subcomando. git remote prune apaga apenas as referências locais a ramos remotos que já não existem, e não a conexão. Laboratório L2: depois de git remote add analista ../origem.git o git remote -v lista os dois remotos, e depois do remove sobra apenas origin.

## Questão 5 (Git e controle de versão) - Cebraspe, FUNPRESP-JUD 2026, questão 65

Julgue o item a seguir.

Por ser um sistema de controle de versão distribuído, o Git permite que cada desenvolvedor mantenha uma cópia local do repositório com seu histórico de versões, o que possibilita a realização de operações como consulta ao histórico, criação de commits e gerenciamento de ramificações sem dependência imediata de um repositório remoto.


**Gabarito: C.** (Certo) Certo. No modelo distribuído cada clone traz o histórico completo. Por isso git log, git commit e git branch funcionam offline; só push, pull e fetch precisam de um remoto. Laboratório L1: todo o laboratório é feito sem nenhum remoto; no L2 aparecem dois clones independentes de um repositório bare.

## Questão 6 (DevOps, DevSecOps e qualidade) - Cebraspe, Banco Central do Brasil (BCB) 2024, questão 77

Julgue o item a seguir.

Integração, entrega e implementação contínuas e com segurança em todo o ciclo de vida do desenvolvimento de software são os princípios básicos do DevOps.


**Gabarito: E.** (Errado) Errado. Integração, entrega e implantação contínuas, com segurança, são práticas (CI/CD e DevSecOps) que operacionalizam o DevOps; os princípios básicos são a cultura de colaboração entre desenvolvimento e operações, a automação, a medição e o compartilhamento (CALMS: cultura, automação, *lean*, medição e compartilhamento). Em provas do Cebraspe, trocar "princípios" por "práticas" ou "ferramentas" é uma pegadinha frequente. Este é um item de interpretação: o gabarito oficial é Errado.

## Questão 7 (DevOps, DevSecOps e qualidade) - Cebraspe, Banco Central do Brasil (BCB) 2024, questão 76

Julgue o item a seguir.

A realização de testes no DevSecOps apoia-se no uso de ferramentas de teste dinâmico de segurança de aplicativos (DAST) com base nas recomendações do OWASP.


**Gabarito: C.** (Certo) Certo. O DAST testa a aplicação em execução, de fora para dentro, procurando falhas como as do OWASP Top 10, e é uma das ferramentas do pipeline DevSecOps, ao lado do SAST (análise estática do código), do SCA (dependências vulneráveis) e da busca de segredos no repositório.

## Questão 8 (DevOps, DevSecOps e qualidade) - Cebraspe, TCU 2025, questão 132

Julgue o item a seguir.

No DevSecOps, a execução de varreduras automatizadas de segurança é premissa fundamental do pipeline de desenvolvimento e deve ocorrer de forma integrada e contínua ao longo de todo o ciclo de entrega.


**Gabarito: C.** (Certo) Certo. A ideia central do DevSecOps é automatizar a segurança dentro do pipeline (SAST, SCA, DAST, varredura de imagens e de segredos) em cada alteração, e não deixá-la para uma auditoria no fim. É o que a FGV chama de *shift left*, como na questão do TJDFT 2022 (Análise de Sistemas, Q33).

## Questão 9 (DevOps, DevSecOps e qualidade) - FGV, TJDFT 2022, questão 33

A equipe de analista de sistemas Alfa aplica o DevSecOps ativamente em seu processo de desenvolvimento de software. Todos os membros da equipe Alfa são incentivados a se preocuparem com a segurança do software de forma proativa desde o início do processo de desenvolvimento, aplicando diretamente a prática DevSecOps:

A) shift left;
B) rastreabilidade;
C) auditabilidade;
D) visibilidade;
E) bug bounty.

**Gabarito: A.** *Shift left* (deslocar para a esquerda) é levar a segurança para as fases iniciais do ciclo (requisitos, projeto, código), em vez de testar só no fim. Rastreabilidade, auditabilidade e visibilidade são propriedades desejáveis, não a prática descrita. *Bug bounty* é pagar recompensa a pesquisadores externos por vulnerabilidades encontradas, o oposto de uma ação interna precoce.

## Questão 10 (DevOps, DevSecOps e qualidade) - FGV, SEFAZ-AM 2022, questão 12

A inspeção contínua do código é uma prática fundamental para desenvolver sistemas computacionais de alta qualidade. A plataforma de código aberto cujo propósito é detectar código duplicado, padrões de codificação e bugs por meio de revisões automáticas com análise estática de código é

A) Docker.
B) Gitlab.
C) Jenkins.
D) Maven.
E) SonarQube.

**Gabarito: E.** O SonarQube faz análise estática, mede duplicação, *code smells*, bugs, vulnerabilidades e cobertura, e aplica um *quality gate* (critério de aprovação). Docker empacota aplicações; GitLab hospeda repositórios e pipelines; Jenkins orquestra pipelines; Maven gerencia build e dependências Java. Na prática o Sonar roda como etapa do pipeline de CI (veja também o item do TCU sobre Jenkinsfile e waitForQualityGate).

## Questão 11 (CI/CD e automação de build) - FCC, TRT-4 (RS) 2022, questão 40

Integração e implantação contínuas (CI/CD) é uma coleção de práticas usadas para integrar e entregar código rapidamente. Usando a prática de

A) integração contínua (CI), em um cronograma pré-acordado, provavelmente no final do ciclo de sprint, o pacote de código é liberado e testado manualmente pelo time de desenvolvimento.
B) implantação contínua (CD), depois que todo o código é validado com sucesso pelo time de desenvolvimento e qualidade, implanta-se o código manualmente no ambiente de teste ou de produção.
C) implantação contínua (CD) em que o grupo controle de qualidade realiza testes manuais para todos os códigos novos ou modificados. Se for bem-sucedido, o código será liberado para implantação; caso contrário, o lançamento é rejeitado e colocado em espera até que os bugs sejam corrigidos.
D) integração contínua (CI), os desenvolvedores são incentivados a fazer pequenos ajustes de código, mesclar seu código na ramificação de código principal e validá-lo usando testes automatizados.
E) integração contínua (CI), para implementar pipelines devem ser utilizadas ferramentas como Zuul e Eureka.

**Gabarito: D.** CI é integrar com frequência pequenas mudanças ao ramo principal e validá-las automaticamente com build e testes (alternativa D). As alternativas A, B e C descrevem etapas manuais ou em cronograma fixo no fim da sprint, o que contraria CI (frequência e automação) e CD (a implantação contínua não tem aprovação manual de QA). Zuul e Eureka, citados em E, são componentes do ecossistema Spring Cloud (gateway e descoberta de serviços), e não ferramentas de pipeline. Laboratório L3: em cada *push* o workflow roda lint, testes e build e falha quando um teste quebra.

## Questão 12 (CI/CD e automação de build) - FCC, TRT-3 (MG) 2015, questão 23

Um técnico de TI está editando um arquivo XML simplificado, que tem o código fonte mostrado abaixo.

<project>
<modelVersion>2.0.0</modelVersion>
<groupId>br.com.trt3</groupId>
<artifactId>Conect_Project</artifactId>
<version>1.0</version>
</project>

Este arquivo é a unidade de configuração básica do Maven e deve ficar na raiz do projeto para que se possa chamar as targets de build do projeto. Nele, pode-se declarar a estrutura, dependências e características do projeto. Trata-se do arquivo

A) build.xml
B) log4j.xml
C) maven.xml
D) mvn.xml
E) pom.xml

**Gabarito: E.** O Maven descreve o projeto no POM (Project Object Model), arquivo pom.xml na raiz, com groupId, artifactId, version (as coordenadas do artefato), dependências e plugins. build.xml é o arquivo do Ant; log4j.xml configura logs; maven.xml e mvn.xml não são arquivos do Maven. O Gradle usa build.gradle.

## Questão 13 (CI/CD e automação de build) - Cebraspe, TCU 2025, questão 119

Julgue o item a seguir.

O pipeline de CI/CD consiste em duas etapas sequenciais: implantação rápida em produção e posterior integração com os demais serviços.


**Gabarito: E.** (Errado) Errado, e a ordem está invertida: primeiro vem a integração (build, testes e análises do código integrado) e só depois a entrega ou implantação. Além disso, um pipeline típico tem várias etapas (*build*, teste, empacotamento, publicação do artefato, implantação), e não duas. Laboratório L3: o workflow tem lint, teste, build e deploy encadeados por needs; o deploy só roda se as etapas anteriores passarem.

## Questão 14 (CI/CD e automação de build) - Cebraspe, TCU 2025, questão 156

Julgue o item a seguir.

A abordagem CI/CD visa otimizar e acelerar o ciclo de vida do desenvolvimento de software, combinando a integração automática e frequente de alterações ao repositório por meio da integração contínua, com processos automatizados de testes, entrega e implantação que conduzem a mudanças no ambiente de produção, assegurando agilidade e qualidade.


**Gabarito: C.** (Certo) Certo, é a descrição conceitual correta do CI/CD: integração contínua mais entrega e/ou implantação contínuas, com testes automatizados, para dar agilidade sem abrir mão da qualidade.

## Questão 15 (CI/CD e automação de build) - Cebraspe, TCU 2025, questão 125

Julgue o item a seguir.

No fluxo padrão do Serverless Framework Dashboard CI/CD, as branch deployments permitem que cada commit em uma branch configurada do repositório GitHub seja implantado automaticamente em um stage associado.


**Gabarito: C.** (Certo) Certo. Nesse recurso do Serverless Framework Dashboard associa-se uma branch do GitHub a um *stage* (por exemplo, dev ou prod) e cada *commit* na branch dispara a implantação automática. É o mesmo princípio de "ambiente por branch" dos pipelines (if: github.ref == 'refs/heads/main' no Laboratório L3). Item de ferramenta específica: não testado no laboratório.

## Questão 16 (Pipelines: GitHub Actions, GitLab CI e Jenkins) - FCC, TRT-22 (PI) 2022, questão 32

Considere o recorte de um arquivo .gitlab-ci.yml que traz algumas opções de configuração de um pipeline GitLab CI/CD, nas seções que são separadas pelas global keywords.

stages:
- sync
- prepare
- build-images
I :
  interruptible: true
  timeout: 90m
workflow:
  # regras
variables:
  # variáveis
II :
  - local: .gitlab/ci/*.gitlab-ci.yml
  - remote: 'https://gitlab.com/gitlab-org/frontend/-/merge_request_pipelines.yml'

As global keywords I e II correspondem, correta e respectivamente, a

A) tags e directories
B) dependencies e environment
C) dependencies e pages
D) default e include
E) default e directories

**Gabarito: D.** default define valores padrão herdados por todos os jobs (como interruptible e timeout), e include importa outros arquivos YAML (local, remote, project, template). As demais palavras ou são chaves de job (tags, dependencies, environment, pages) ou não existem (directories). Laboratório L4: o .gitlab-ci.yml usa workflow, stages, default e a execução local com gitlab-ci-local lista os jobs.

## Questão 17 (Pipelines: GitHub Actions, GitLab CI e Jenkins) - FGV, TJDFT 2022, questão 31

O analista Mateus configurou um pipeline CI/CD para o projeto TJApp no GitLab. O repositório de TJApp denomina-se TJAppRepo. Mateus precisou controlar o comportamento do pipeline de TJApp condicionando o início de sua execução aos eventos de push de tags para o TJAppRepo. Para aplicar essa condição ao pipeline de TJApp, Mateus precisou modificar o arquivo .gitlab-ci.yml na raiz de TJAppRepo, adicionando uma regra na seção:

A) default;
B) include;
C) stages;
D) variables;
E) workflow.

**Gabarito: E.** workflow:rules decide se o pipeline inteiro é criado, com base em variáveis como $CI_PIPELINE_SOURCE, $CI_COMMIT_TAG e $CI_COMMIT_BRANCH. Por exemplo, workflow: rules: - if: $CI_COMMIT_TAG cria o pipeline só em push de tag. rules dentro de um job controla apenas aquele job. Laboratório L4: o arquivo traz um workflow:rules; o gitlab-ci-local não avalia o workflow como o GitLab real, então esse comportamento específico é "não testado em GitLab real".

## Questão 18 (Pipelines: GitHub Actions, GitLab CI e Jenkins) - Cebraspe, TCU 2025, questão 133

Julgue o item a seguir.

O seguinte trecho do arquivo de workflow do GitHub Actions faz que o workflow seja acionado em duas situações distintas: quando uma nova etiqueta é criada no repositório e quando ocorre um push especificamente para a branch main.

on:
  label:
    types:
      - created
  page_build:
    types:
      - main


**Gabarito: E.** (Errado) Errado. label é o evento de criação ou edição de *rótulos* (etiquetas de issues), e não de tags do Git (para tags, usa-se push com tags:). page_build é o evento de publicação do GitHub Pages e não aceita types; main não é um tipo. Para um push na branch main o certo é on: push: branches: [main]. Laboratório L3: o actionlint rejeita o trecho com "types" cannot be specified for "page_build" Webhook event.

## Questão 19 (Pipelines: GitHub Actions, GitLab CI e Jenkins) - Cebraspe, TCU 2025, questão 136

Julgue o item a seguir.

No trecho de código a seguir, a implementação individualizada do QualityGate permite que o resultado do estágio Quality Gate 1 não interrompa o pipeline, caso o resultado da análise do SonarQube seja FAILED, e que ele prossiga normalmente para a execução do estágio SonarQube analysis 2.

pipeline {
    agent any
    stages {
        stage('SonarQube analysis 1') {
            steps { sh 'mvn clean verify org.sonarsource.scanner.maven:sonar-maven-plugin:sonar' }
        }
        stage("Quality Gate 1") {
            steps { waitForQualityGate abortPipeline: true }
        }
        stage('SonarQube analysis 2') {
            steps { sh 'gradle sonar' }
        }
        stage("Quality Gate 2") {
            steps { waitForQualityGate abortPipeline: true }
        }
    }
}


**Gabarito: E.** (Errado) Errado. Com abortPipeline: true o waitForQualityGate aborta o pipeline quando o *quality gate* do SonarQube falha, e o estágio "SonarQube analysis 2" não chega a rodar. Para deixar o pipeline prosseguir seria preciso abortPipeline: false (e tratar o resultado com a variável devolvida). Jenkins e Jenkinsfile: não testado no laboratório (o equivalente de uma etapa que falha e interrompe as seguintes foi executado no L3 com GitHub Actions).

## Questão 20 (Docker e contêineres) - FCC, TRT-22 (PI) 2022, questão 29

O Docker tornou muito mais fácil para os desenvolvedores entender e usar a tecnologia de contêineres. Para isso, oferece diversos recursos ou ferramentas, dentre as quais encontram-se:

I. Ferramenta de clustering e scheduling para contêineres do Docker, que permite que os administradores e desenvolvedores de TI possam estabelecer e gerenciar um cluster de nós do Docker como um único sistema virtual.II. Reúne instruções necessárias para construir uma imagem de contêiner.III. Aplicativo para plataforma Mac ou Windows que permite criar e compartilhar microsserviços e containerized applications. Inclui diversas ferramentas como o cliente Docker, o Docker Compose, o Docker Content Trust, o Kubernetes e o Credential Helper.

Os itens I, II e III correspondem, correta e respectivamente, a

A) Docherd – Docker Compose – Docker Hub.
B) Docker Engine – Docker Compose – Docker Desktop.
C) Docker Build – Docherd – Docker Swam.
D) Docker Engine – Dockerfile – Docker Hub.
E) Docker Swarm – Dockerfile – Docker Desktop.

**Gabarito: E.** I é o Docker Swarm, o modo de orquestração nativo que junta vários nós em um cluster. II é o Dockerfile, arquivo de instruções para construir a imagem. III é o Docker Desktop, aplicativo para Mac e Windows que traz o cliente, o Compose e até um Kubernetes de teste. O Docker Engine é o daemon e o Docker Hub é o registro público; "Docherd" e "Docker Swam" não existem. Laboratório L5: o Dockerfile gera a imagem; L6: o Compose sobe vários serviços (o Swarm não foi testado).

## Questão 21 (Docker e contêineres) - FCC, TRT-23 (MT) 2022, questão 42

Um Técnico precisa administrar e monitorar containers Docker em produção. Para isso pode utilizar a ferramenta

A) Rancher
B) Webhooker
C) Swagger
D) Zuul
E) Flyway

**Gabarito: A.** O Rancher é uma plataforma de gerenciamento de contêineres e clusters Kubernetes (e Docker) com interface web. Swagger documenta APIs REST, Zuul é um gateway de APIs do ecossistema Spring e Flyway versiona migrações de banco de dados; "Webhooker" não é uma ferramenta de administração de contêineres. Rancher: não testado no laboratório.

## Questão 22 (Docker e contêineres) - FGV, SEFAZ-AM 2022, questão 67

Leia o fragmento a seguir.

“A plataforma Docker usa uma arquitetura do tipo _____. O cliente Docker conversa com o daemon do Docker, que constrói, executa e distribui _____ Docker. O cliente e o daemon do Docker podem ser executados em um mesmo sistema ou se conectar um cliente do Docker a um daemon remoto. O cliente Docker e o daemon se comunicam usando _____ ou uma interface de redes.”

Assinale a opção cujos itens completam corretamente as lacunas do fragmento acima, na ordem apresentada.

A) MVC – imagens – chamadas RPC ou bluetooth.
B) thin client – contêineres – wireless ou bluetooth.
C) serverless – componentes – chamadas MPI ou RPC.
D) cliente-servidor – contêineres – API REST ou soquetes UNIX.
E) mesh app and service – imagens – API RESTFULL ou wireless.

**Gabarito: D.** A arquitetura do Docker é cliente-servidor: o cliente (docker) fala com o *daemon* (dockerd) por uma API REST, sobre um soquete UNIX (/var/run/docker.sock), ou por interface de rede. O daemon constrói, executa e distribui contêineres. Laboratório L5: o mesmo docker version mostra "Client" e "Server", e um curl --unix-socket no soquete devolve a versão da API em JSON, sem usar o cliente.

## Questão 23 (Docker e contêineres) - FGV, SEFAZ-AM 2022, questão 68

A plataforma Docker pode criar imagens automaticamente, executando as instruções de um arquivo Dockerfile. A primeira instrução presente em um Dockerfile é denominada

A) ADD.
B) RUN.
C) FROM.
D) EXPOSE.
E) WORKDIR.

**Gabarito: C.** FROM define a imagem base e abre o Dockerfile (a única instrução que pode vir antes dela é ARG). RUN executa comandos e cria uma camada, ADD copia arquivos, EXPOSE documenta portas e WORKDIR define o diretório de trabalho. Laboratório L5: o docker history mostra uma camada por instrução, e o *multi-stage build* tem vários FROM no mesmo arquivo.

## Questão 24 (Docker e contêineres) - FGV, SEFAZ-AM 2022, questão 69

Um Docker Hub consiste em um índice e registro do Docker. Com relação ao registro do Docker, analise as afirmativas a seguir e assinale (V) para a verdadeira e (F) para a falsa.

( ) Possui recursos avançados que incluem bugsnag, new relic e cors.( ) Suporta diferentes tipos de back-end de armazenamento de arquivos em nuvem ou sistema de arquivos local.( ) Armazena dados referentes às contas de usuários em banco de dados local.

As afirmativas são, na ordem apresentada, respectivamente

A) F – V – V.
B) V – V – F.
C) F – F – V.
D) F – V – F.
E) V – F – F.

**Gabarito: B.** O gabarito oficial é V – V – F. O registro do Docker (*Docker Registry*) é a aplicação que armazena e distribui imagens: oferece configuração de *middleware* e integrações de monitoramento (bugsnag, new relic) e *cors*, aceita vários *drivers* de armazenamento (sistema de arquivos local, S3, Azure, GCS) e não guarda contas de usuário em banco de dados próprio (a autenticação é delegada). A questão é muito específica da documentação; para a prova, decore que o registro armazena imagens, tem armazenamento plugável e delega a autenticação. Laboratório L5: subimos um registro local (registry:2) na porta 15808 e listamos o catálogo e as tags pela API.

## Questão 25 (Docker e contêineres) - FGV, SEFAZ-AM 2022, questão 70

Com relação à segurança dos contêineres Docker, analise as afirmativas a seguir e assinale (V) para a verdadeira e (F) para a falsa.

( ) Possuem isolamento no nível do processo no sistema operacional e isolamento adicional, usando recursos especiais tais como namespaces e cgroups.( ) Aproveitam-se dos mecanismos interprocess communication padrão, tais como sinais, pipes e sockets, onde cada contêiner possui a sua própria network stack.( ) Os contêineres possuem um multi level security no sistema operacional do host e os recursos físicos que são gerenciados por um hypervisor compartilhado.

As afirmativas são, na ordem apresentada, respectivamente,

A) F – V – V.
B) F – F – V.
C) V – F – V.
D) V – F – F.
E) V – V – F.

**Gabarito: E.** V – V – F. Contêineres são processos isolados pelo kernel com namespaces (o que o processo enxerga) e cgroups (quanto pode usar); usam os mecanismos de IPC do Linux e cada um tem sua pilha de rede; mas não são gerenciados por hipervisor, pois compartilham o kernel do host (a VM é que usa hipervisor). Laboratório L5: --read-only, --cap-drop ALL e USER 10001 reduzem a superfície de ataque, e o Trivy lista CVEs da imagem.

## Questão 26 (Docker e contêineres) - FGV, TJDFT 2022, questão 56

A analista Sara modificou alguns arquivos do container Docker TJSiteContainer que se encontra em execução. Para criar uma imagem Docker a partir do estado atual de TJSiteContainer, a fim de persistirem as modificações efetuadas em seus arquivos, Sara deve utilizar o comando:

A) docker create
B) docker diff
C) docker export
D) docker image save
E) docker commit

**Gabarito: E.** docker commit cria uma imagem nova a partir do estado atual do contêiner. docker create cria um contêiner sem iniciá-lo, docker diff lista as mudanças no sistema de arquivos, docker export gera um tar do sistema de arquivos (sem camadas nem metadados) e docker image save grava uma imagem existente em tar. Laboratório L5: depois de echo configurado-a-mao > /etc/marca dentro do contêiner, o docker commit gerou a imagem e um novo contêiner dela leu o arquivo. Na prática, prefere-se o Dockerfile, que é reprodutível.

## Questão 27 (Docker e contêineres) - Cebraspe, FUNPRESP-JUD 2026, questão 68

Julgue o item a seguir.

No ambiente de implantação do ecossistema DevOps, os containers compartilham o kernel do sistema operacional hospedeiro e empacotam a aplicação e suas dependências de execução, diferindo das máquinas virtuais, que executam sistemas operacionais convidados próprios sobre um hipervisor.


**Gabarito: C.** (Certo) Certo. A diferença básica: a VM virtualiza o hardware e roda um SO convidado completo sobre um hipervisor; o contêiner virtualiza o sistema operacional, isolando processos que compartilham o kernel do host, por isso é mais leve e inicia em segundos. Laboratório L5: o uname -r dentro do contêiner devolve o mesmo kernel do host.

## Questão 28 (Docker e contêineres) - Cebraspe, TCU 2025, questão 151

Julgue o item a seguir.

Docker e Kubernetes são software intercambiáveis em qualquer ambiente, pois ambos criam, executam e orquestram contêineres de forma idêntica.


**Gabarito: E.** (Errado) Errado. Docker constrói imagens e executa contêineres em um host; o Kubernetes orquestra contêineres em um cluster (agendamento, escala, recuperação, rede e atualização contínua) e hoje usa um *runtime* como o containerd ou o CRI-O. São complementares, não idênticos nem intercambiáveis. Laboratório L8: o Kubernetes recria Pods apagados, coisa que o Docker sozinho não faz.

## Questão 29 (Kubernetes e orquestração) - FCC, TRT-4 (RS) 2022, questão 31

Um Técnico está participando de um projeto de microsserviços distribuídos onde centenas de contêineres são utilizados. Para fazer a orquestração destes contêineres, ou seja, a coordenação e o monitoramento, ele precisa utilizar um recurso que possa permitir que a atualização da aplicação em um contêiner não interrompa o serviço. O recurso sugerido corretamente por ele, nesse caso, foi o

A) Qubes.
B) VirtualBox.
C) VMWare.
D) Docker, em modo padrão.
E) Kubernetes.

**Gabarito: E.** Orquestrar centenas de contêineres, com atualização sem parada, é o papel do Kubernetes (*rolling update*: Pods novos entram antes de os antigos saírem). Qubes OS, VirtualBox e VMware são ambientes de virtualização; o Docker em modo padrão (sem Swarm) roda contêineres em um único host. Laboratório L8: kubectl set image troca a versão com 3 réplicas sem derrubar o serviço, rollout history mostra 2 revisões e rollout undo volta.

## Questão 30 (Kubernetes e orquestração) - FCC, TRT-22 (PI) 2022, questão 28

No Kubernetes, os contêineres gerenciados pelo kubelet podem usar a estrutura de hook do ciclo de vida do contêiner para executar código acionado por eventos durante o gerenciamento de seu ciclo de vida. Há dois tipos de hooks:

I. Este hook é executado imediatamente após um contêiner ser criado. Mas não há garantia de que o hook será executado antes do ENTRYPOINT do contêiner. Nenhum parâmetro é passado para o handler.II. Esse hook é chamado imediatamente antes de um contêiner ser terminated devido a uma solicitação de API ou um gerenciamento de evento como liveness/startup probe failure, preemption, resource contention e outros. Uma chamada a este hook falha se o contêiner já está em um estado terminated ou completed e o hook deve ser concluído antes que o sinal TERM seja enviado para parar o contêiner. Nenhum parâmetro é passado para o handler.

Os hooks I e II são, correta e respectivamente,

A) PostStart e PreStop.
B) HookStart e HookStop.
C) PodStart e PodStop.
D) KubeStart e KubeStop.
E) KubeletStart e KubeletStop.

**Gabarito: A.** Os dois hooks do ciclo de vida são PostStart (logo depois da criação do contêiner, sem garantia de rodar antes do ENTRYPOINT) e PreStop (antes de terminar o contêiner, e deve concluir antes do SIGTERM). As outras opções são nomes inventados. Laboratório L8: o PostStart gravou um arquivo "iniciado" no contêiner e o PreStop com sleep 6 fez o kubectl delete pod levar cerca de 7 segundos, porque o Kubernetes espera o hook antes de enviar o TERM.

## Questão 31 (Kubernetes e orquestração) - FCC, TRT-14 (RO/AC) 2022, questão 27

Para coordenar e agendar vários contêineres, habilitar comunicações entre eles e escalar instâncias de contêiner, um analista pode utilizar o

A) Kubernetes, solução utilizada para vários tipos de contêiner, incluindo Docker.
B) Swagger, solução exclusiva para contêineres Docker.
C) Kubernetes, solução exclusiva para contêineres Docker.
D) Swagger, solução exclusiva para contêineres Zuul.
E) Keycloak, solução utilizada para qualquer tipo de contêiner.

**Gabarito: A.** O Kubernetes agenda, conecta e escala contêineres e não é exclusivo do Docker: aceita qualquer *runtime* compatível com a interface CRI (containerd, CRI-O). Swagger documenta APIs e Keycloak é gestão de identidade; nenhum dos dois orquestra contêineres. Veja a mesma ideia no item BCB Q99, abaixo.

## Questão 32 (Kubernetes e orquestração) - FGV, TJDFT 2022, questão 54

A analista Ana precisa implantar o pod LogPod no cluster de Kubernetes KCluster do TJDFT de forma que todos os nós elegíveis do KCluster executem uma cópia do LogPod. Para que o KCluster apresente uma cópia do LogPod em cada nó elegível, de forma automática, Ana deve implantar o LogPod utilizando o recurso do Kubernetes:

A) ReplicationController;
B) ReplicaSet;
C) StatefulSet;
D) DaemonSet;
E) EndpointSlice.

**Gabarito: D.** O DaemonSet garante uma cópia do Pod em cada nó elegível (agentes de log, de monitoramento, de rede). ReplicaSet e ReplicationController mantêm um número de réplicas, sem se importar com o nó; StatefulSet dá identidade estável a Pods com estado; EndpointSlice lista endereços de um Service. "Elegível" remete a *taints* e *tolerations*. Laboratório L8: o nó de controle tem o *taint* node-role.kubernetes.io/control-plane; sem tolerância o DaemonSet roda só no worker, e com ela passa a rodar nos dois nós.

## Questão 33 (Kubernetes e orquestração) - Cebraspe, Banco Central do Brasil (BCB) 2024, questão 82

Julgue o item a seguir.

Na orquestração de serviços em cluster kubernetes, um pod sempre será executado em um nó, ainda que seja em uma máquina física.


**Gabarito: C.** (Certo) Certo. O Pod é a menor unidade implantável e roda em um nó do cluster, que pode ser uma máquina virtual ou física. Laboratório L8: kubectl get pods -o wide mostra o nó de cada Pod.

## Questão 34 (Kubernetes e orquestração) - Cebraspe, Banco Central do Brasil (BCB) 2024, questão 83

Julgue o item a seguir.

No caso hipotético em tela, a área de TIC deve dimensionar a quantidade de pods de acordo com a demanda esperada, uma vez que os pods nesse modo são o ponto focal para avaliação de performance. Isso se deve ao fato de que, ao se utilizar o Kubernetes no modo serverless, cada pod gerencia os kubelets e os contêineres que estiverem contidos nos nós do cluster.


**Gabarito: E.** (Errado) Errado. No Kubernetes, quem gerencia os Pods e contêineres de um nó é o kubelet, e não o contrário: o Pod não gerencia kubelets. Além disso, no modelo serverless o provedor ajusta a capacidade automaticamente, e a equipe não dimensiona servidores nem Pods "à mão" por demanda esperada. O erro está na explicação ("cada pod gerencia os kubelets").

## Questão 35 (Kubernetes e orquestração) - Cebraspe, Banco Central do Brasil (BCB) 2024, questão 98

Julgue o item a seguir.

O kube-scheduler é o escalonador do Kubernetes e sua função consiste em controlar o aumento e a diminuição da quantidade de pods de acordo com as configurações de consumo.


**Gabarito: E.** (Errado) Errado. O kube-scheduler escolhe em qual nó cada Pod novo vai rodar (considera recursos, afinidades, *taints*). Aumentar ou diminuir o número de Pods conforme o consumo é função do Horizontal Pod Autoscaler (HPA), com o ReplicaSet/Deployment aplicando a nova contagem. Laboratório L8: kubectl scale muda o número de réplicas e o *self-healing* recria Pods apagados, mas quem escolhe o nó é o scheduler.

## Questão 36 (Kubernetes e orquestração) - Cebraspe, Banco Central do Brasil (BCB) 2024, questão 99

Julgue o item a seguir.

O Kubernetes pode operar sem usar o Docker e suporta a execução com CRI-O e Containerd.


**Gabarito: C.** (Certo) Certo. Desde que o Kubernetes passou a falar com o *runtime* pela interface CRI, o Docker deixou de ser necessário: o containerd e o CRI-O são *runtimes* suportados. Laboratório L8: o cluster do kind usa o containerd nos nós, sem Docker dentro deles.

## Questão 37 (Kubernetes e orquestração) - Cebraspe, Banco Central do Brasil (BCB) 2024, questão 96

Julgue o item a seguir.

Ao se executar o arquivo YAML descrito a seguir, será criado um deployment com uma imagem do NGINX.

apiVersion: v1
kind: Service
metadata:
  name: my-nginx-svc
  labels:
    app: nginx
spec:
  type: LoadBalancer
  ports:
  - port: 80
  selector:
    app: nginx


**Gabarito: E.** (Errado) Errado. O kind é Service, e não Deployment: o arquivo cria um serviço do tipo LoadBalancer que encaminha para os Pods com o rótulo app: nginx, mas não cria nenhum Pod nem referencia imagem alguma. Laboratório L8: o kubectl apply --dry-run=server deste mesmo YAML respondeu service/my-nginx-svc created (server dry run). Um Deployment teria apiVersion: apps/v1, kind: Deployment e spec.template com image.

## Questão 38 (Infraestrutura como código) - Cebraspe, Banco Central do Brasil (BCB) 2024, questão 97

Julgue o item a seguir.

No modelo de infraestrutura como código, é possível a implantação de uma infraestrutura com definição de sub-redes, balanceadores de carga e máquinas virtuais com a utilização de código, sem a necessidade de configurações manuais.


**Gabarito: C.** (Certo) Certo. Esse é o objetivo da IaC: descrever redes, balanceadores, máquinas e demais recursos em arquivos versionados (Terraform/OpenTofu, CloudFormation, Pulumi) e criá-los de forma automática, repetível e auditável. Laboratório L7: o tofu apply criou arquivo, imagem e contêiner a partir de um main.tf, a segunda execução disse "No changes" (idempotência) e o destroy removeu tudo. Os recursos na nuvem (sub-redes, balanceadores, VMs) não foram criados no laboratório: não testado.

## Questão 39 (Observabilidade e monitoramento) - FCC, TRT-4 (RS) 2022, questão 60

Sobre ferramentas de monitoramento, considere as seguintes características:

I. Permite monitoramento agentless (sem agentes) para diversos protocolos e conta com funções de auto-discovery (descoberta automática de itens) e low level discovery (descoberta de métricas em itens monitorados). Seus principais módulos do sistema de monitoramento são: server, proxy e agent.II. Solução de código aberto para executar análises de dados, obtendo métricas que dão sentido à enorme quantidade de dados e para monitorar aplicativos com a ajuda de painéis personalizáveis. Se conecta a diversas fontes de dados, comumente chamadas de bancos de dados como Graphite, Prometheus, Influx DB, ElasticSearch, MySQL, PostgreSQL etc., que são algumas das muitas fontes de dados que suporta por padrão. Permite escrever plug-ins do zero para integração com várias fontes de dados diferentes.III. Solução de busca e visualização de dados indexados no Elasticsearch e análise dos dados por meio da visualização em gráficos padrão ou apps integrados como o Lens, o Canvas e o Maps. Possibilita a análise visual de dados de um índice do Elasticsearch ou de vários índices.

As características I, II e III são, correta e respectivamente, correspondentes a

A) Grafana – Kibana – Zabbix.
B) Zabbix – Grafana – Kibana.
C) Kibana – Zabbix – Grafana.
D) Grafana – Zabbix – Kibana.
E) Zabbix – Kibana – Grafana.

**Gabarito: B.** I é o Zabbix (server, proxy e agent, monitoramento sem agente, *low level discovery*). II é o Grafana (painéis sobre várias fontes: Prometheus, Graphite, InfluxDB, Elasticsearch, bancos SQL). III é o Kibana (visualização dos dados indexados no Elasticsearch, com Lens, Canvas e Maps). Laboratório L9: o Prometheus coletou as métricas e a regra de alerta disparou; o Grafana é quem desenharia o painel sobre essa fonte (o servidor Grafana não foi executado, só a imagem foi consultada para as portas).

## Questão 40 (Observabilidade e monitoramento) - FCC, TRT-22 (PI) 2022, questão 45

Considere o código abaixo presente em um arquivo de configuração criado por um analista, que especifica qual plug-in será utilizado em determinado contexto e as configurações deste plug-in.

input { stdin { } }
output {
  elasticsearch { hosts => ["localhost:9200"] }
}

As configurações mostram que, quando esse arquivo for lido, será gerada uma saída para o Elasticsearch. Trata-se de um arquivo de configuração do

A) Kibana.
B) Rancher.
C) Jenkins.
D) Logstash.
E) ElasticData.

**Gabarito: D.** A estrutura input { } filter { } output { } com *plugins* (stdin, elasticsearch) é a sintaxe do Logstash, o coletor e transformador de logs da pilha ELK. O Kibana é configurado em YAML (kibana.yml), o Jenkins usa Jenkinsfile e o Rancher é gestão de clusters; "ElasticData" não existe. Logstash: não executado no laboratório (não testado).

## Questão 41 (Observabilidade e monitoramento) - FGV, TJDFT 2022, questão 57

O analista Pedro definiu no Logstash do TJDFT um novo pipeline de processamento de dados de nome SPipeline. A saída definida em SPipeline exige que os dados sejam estruturados. No entanto, a entrada definida em SPipeline consiste em um arquivo de texto arbitrário e não estruturado. A fim de estruturar a entrada do SPipeline com o uso de expressões regulares, Pedro deve adicionar ao SPipeline o filtro do Logstash:

A) drop;
B) mutate;
C) grok;
D) clone;
E) aggregate.

**Gabarito: C.** O filtro grok transforma texto livre em campos estruturados com padrões baseados em expressões regulares (%{IP:cliente} %{WORD:metodo}). drop descarta eventos, mutate altera campos (renomear, converter tipo), clone duplica o evento e aggregate combina eventos relacionados. Logstash: não testado. Para sentir a ideia, o Laboratório L9 gera logs em JSON já estruturados, o contrário do texto livre que exige o grok.

## Questão 42 (Observabilidade e monitoramento) - Cebraspe, Banco Central do Brasil (BCB) 2024, questão 100

Julgue o item a seguir.

O Grafana é capaz de fazer queries em diferentes tipos de data source, transformar os dados obtidos e gerar a visualização em forma de dashboard.


**Gabarito: C.** (Certo) Certo. O Grafana é a camada de visualização: consulta várias fontes de dados (Prometheus, Loki, Elasticsearch, bancos SQL), aplica transformações e monta painéis e *dashboards*, além de alertas. Ele não guarda as métricas: quem guarda, no nosso laboratório, é o Prometheus.

## Questão 43 (Observabilidade e monitoramento) - Cebraspe, Banco Central do Brasil (BCB) 2024, questão 102

Julgue o item a seguir.

Uma ferramenta de APM é capaz de capturar traces de uma aplicação e registrar a taxa de erros de requisições com retorno HTTP 500.


**Gabarito: C.** (Certo) Certo. Uma ferramenta de APM (*application performance monitoring*) instrumenta a aplicação, captura *traces* (o caminho de cada requisição entre serviços), mede latência e taxa de erros, inclusive respostas 5xx. Laboratório L9: os spans de uma requisição compartilham o mesmo trace_id e o contador por status mostra os erros 500.

## Questão 44 (Observabilidade e monitoramento) - Cebraspe, TCU 2025, questão 134

Julgue o item a seguir.

O parâmetro http_addr define a interface em que o Grafana realiza a escuta, sendo um valor equivalente a 127.0.0.1, e expõe o serviço apenas na interface local (localhost), enquanto o http_port, cujo padrão é 8080, especifica a porta de escuta.


**Gabarito: E.** (Errado) Errado. A porta padrão do Grafana é a 3000, e não 8080. O resto do item é plausível: http_addr define a interface de escuta (vazio escuta em todas) e 127.0.0.1 restringe ao localhost. Laboratório L9: o defaults.ini da imagem oficial do Grafana mostra http_addr = (vazio) e http_port = 3000.
