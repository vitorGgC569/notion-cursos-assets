# Simulado autoral estilo FCC, Governança de TI (20 questões)

Questões AUTORAIS, elaboradas para este módulo no estilo da FCC (cinco alternativas, uma correta). Não são questões de provas reais; cada uma está marcada como autoral. Os números usados nos comentários vêm dos laboratórios executados de verdade (L1 a L10).

## Questão 1 (COBIT 2019) - AUTORAL (não é de prova real)

No COBIT 2019, a distinção entre governança e gestão é que

A) a governança planeja e executa as atividades de TI, e a gestão apenas avalia os resultados.
B) a governança é exercida pelo órgão de governança (avaliar, dirigir e monitorar) e a gestão planeja, constrói, executa e monitora as atividades para alcançar os objetivos definidos.
C) os dois termos são sinônimos e não têm domínios distintos.
D) a governança trata somente de segurança da informação, e a gestão, de projetos.
E) a gestão define a estratégia da organização, e a governança só a executa.

**Gabarito: B.** É o princípio distinção entre governança e gestão. Os objetivos de governança estão no domínio EDM (avaliar, dirigir e monitorar); os de gestão, em APO, BAI, DSS e MEA. A diretoria avalia e dirige; a gerência planeja, constrói, executa e monitora. Laboratório L7.

## Questão 2 (COBIT 2019) - AUTORAL (não é de prova real)

Os fatores de projeto (design factors) do COBIT 2019 servem para

A) adequar o sistema de governança ao contexto da organização, como estratégia, perfil de risco, requisitos de conformidade e tamanho; são 11 fatores.
B) medir o retorno financeiro de cada projeto de TI.
C) listar os 40 objetivos de governança e gestão, que são fixos e iguais para toda organização.
D) definir os níveis de maturidade de 0 a 5 para todos os processos.
E) substituir a avaliação de capacidade dos processos.

**Gabarito: A.** O COBIT 2019 é sob medida (tailored): os 11 fatores de projeto (estratégia, metas, perfil de risco, problemas de TI, cenário de ameaças, requisitos de conformidade, papel da TI, modelo de sourcing, métodos de implementação, estratégia de adoção de tecnologia e tamanho da organização) priorizam objetivos e níveis-alvo. Laboratório L7, partes 3 e 4: a priorização do laboratório é didática, não o kit oficial da ISACA.

## Questão 3 (COBIT 2019) - AUTORAL (não é de prova real)

Sobre a escala de capacidade de processos do COBIT 2019, é correto afirmar:

A) vai de 1 a 3, sendo 3 o nível otimizado.
B) vai de 0 a 10, com um ponto por objetivo atendido.
C) não existe: o COBIT 2019 só mede conformidade.
D) ela vai de 0 a 5, sendo 0 a ausência de capacidade e 5 o nível mais alto, em que o processo é otimizado.
E) tem apenas os níveis "executado" e "não executado".

**Gabarito: D.** Capacidade de 0 a 5; o COBIT 2019 trocou a avaliação baseada em ISO/IEC 15504 pelo modelo inspirado no CMMI. A questão real do TRT-3 de 2015 (COBIT 5) cobrou o nível mais alto, "otimizado".

## Questão 4 (ITIL 4) - AUTORAL (não é de prova real)

O sistema de valor de serviço (SVS) do ITIL 4 é composto por

A) estratégia, desenho, transição, operação e melhoria contínua.
B) pessoas, processos, produtos, parceiros e preço.
C) princípios orientadores, governança, cadeia de valor de serviço, práticas e melhoria contínua.
D) incidente, problema, mudança, liberação e configuração.
E) planejar, fazer, verificar e agir.

**Gabarito: C.** O SVS tem cinco componentes: princípios orientadores, governança, cadeia de valor de serviço, práticas e melhoria contínua, com oportunidade/demanda de entrada e valor de saída. A alternativa A é o ciclo de vida do ITIL v3; D, o PDCA.

## Questão 5 (ITIL 4) - AUTORAL (não é de prova real)

Um dos sete princípios orientadores do ITIL 4 recomenda "começar de onde você está". Isso significa

A) descartar todo o ambiente atual antes de qualquer melhoria.
B) iniciar sempre pelo ciclo de estratégia de serviço.
C) esperar a conclusão de uma auditoria externa.
D) substituir a medição por opinião do gestor.
E) aproveitar o que já existe (serviços, processos e ferramentas) antes de construir algo novo do zero, medindo e reutilizando o que funciona.

**Gabarito: E.** Os sete princípios: focar em valor; começar de onde você está; progredir iterativamente com feedback; colaborar e promover visibilidade; pensar e trabalhar de forma holística; manter simples e prático; otimizar e automatizar.

## Questão 6 (SLA e disponibilidade) - AUTORAL (não é de prova real)

Um serviço depende de três componentes em série, cada um com disponibilidade de 99,9%. Sem redundância, a disponibilidade do serviço é, aproximadamente,

A) 99,70%.
B) 99,90%.
C) 99,99%.
D) 99,97%.
E) 100%.

**Gabarito: A.** Em série, multiplicam-se as disponibilidades: 0,999 × 0,999 × 0,999 ≈ 0,9970. Cada componente adicional em série piora o resultado. Em paralelo, multiplicam-se as indisponibilidades: dois componentes de 99,5% dão 1 − 0,005² = 99,9975%. Laboratório L4 (conferido no L10).

## Questão 7 (SLA e disponibilidade) - AUTORAL (não é de prova real)

Um objetivo de nível de serviço (SLO) de 99,9% de disponibilidade em 30 dias corresponde a um orçamento de erro (tempo máximo de indisponibilidade) de

A) 4,32 minutos.
B) 432 minutos.
C) 43,2 minutos.
D) 72 minutos.
E) 7,2 horas.

**Gabarito: C.** Em 30 dias há 30 × 24 × 60 = 43.200 minutos; 0,1% disso é 43,2 minutos. Com 99% o orçamento seria de 432 minutos (7,2 horas), e com 99,99%, de 4,32 minutos. Laboratório L4.

## Questão 8 (Projetos e EVM) - AUTORAL (não é de prova real)

Em gerenciamento de projetos, um TCPI (índice de desempenho para término) para atingir o BAC maior que 1,0 indica que

A) o projeto está adiantado e abaixo do custo.
B) o projeto já foi concluído dentro do orçamento.
C) o custo real é exatamente igual ao valor agregado.
D) o trabalho restante precisa ser executado com eficiência de custo superior à observada até aqui, o que torna a meta mais difícil.
E) o cronograma foi encerrado antecipadamente.

**Gabarito: D.** TCPI = (BAC − EV) / (BAC − AC). No laboratório L1, com BAC 500.000, EV 213.000 e AC 255.000, o TCPI vale 1,1714: é preciso render 17% mais do que o necessário para fechar no BAC, enquanto o CPI atual é 0,84. Se o TCPI é muito acima do CPI, o BAC provavelmente é inalcançável e vale revisar o EAC.

## Questão 9 (Projetos e EVM) - AUTORAL (não é de prova real)

Em uma rede de atividades, a atividade C tem folga total de 4 dias. Isso significa que ela

A) é a primeira atividade do projeto.
B) pode atrasar até 4 dias sem atrasar o término do projeto, pois não está no caminho crítico.
C) está no caminho crítico e não pode atrasar.
D) deve ser cancelada para economizar 4 dias.
E) tem duração de 4 dias, apenas.

**Gabarito: B.** Folga total é quanto a atividade pode atrasar sem afetar a data final. O caminho crítico tem folga zero. Laboratório L2: A→B→D→F→G soma 18 dias e C tem 4 dias de folga.

## Questão 10 (Projetos e EVM) - AUTORAL (não é de prova real)

Na técnica PERT, uma atividade tem estimativa otimista de 4 dias, mais provável de 6 dias e pessimista de 14 dias. A duração esperada (te) é

A) 6 dias.
B) 8 dias.
C) 9 dias.
D) 5 dias.
E) 7 dias.

**Gabarito: E.** te = (o + 4m + p) / 6 = (4 + 24 + 14) / 6 = 7 dias. O desvio padrão da atividade é (p − o) / 6 = 10/6 ≈ 1,67 dia. No laboratório L2, as durações PERT elevam o caminho crítico de 18 para 19 dias, e a simulação de Monte Carlo deu 14,3% de chance de terminar em 18 dias ou menos.

## Questão 11 (Portfólio) - AUTORAL (não é de prova real)

Em avaliação de portfólio, um projeto de TI com valor presente líquido (VPL) positivo, calculado com a taxa mínima de atratividade da organização, indica que

A) os fluxos de caixa descontados superam o investimento inicial, ou seja, o projeto gera valor acima do mínimo exigido.
B) o projeto nunca terá retorno.
C) o payback é obrigatoriamente de um ano.
D) a TIR é negativa.
E) o projeto deve ser descartado por ter VPL maior que zero.

**Gabarito: A.** VPL > 0 cria valor; VPL < 0 destrói. A TIR é a taxa que zera o VPL e, se maior que a taxa mínima, também aprova o projeto. Com orçamento limitado, escolhe-se a combinação de maior VPL, e não o projeto individual de maior VPL. Laboratório L3: com R$ 1.000.000 de orçamento, vence a combinação de modernizar o sistema de processos e migrar para a nuvem (VPL 475.950).

## Questão 12 (Ágil (Kanban e Scrum)) - AUTORAL (não é de prova real)

No método Kanban, limitar o trabalho em andamento (WIP) tem como efeito principal

A) aumentar o lead time, para que as tarefas fiquem mais tempo em análise.
B) impedir que o time entregue qualquer item.
C) substituir a retrospectiva.
D) reduzir o tempo de espera (lead time) e expor gargalos, sem reduzir a vazão média do sistema estável.
E) obrigar o uso de sprints de duas semanas.

**Gabarito: D.** Pela lei de Little (WIP = vazão × lead time), com a mesma vazão, menos WIP significa menos lead time. No laboratório L6, com vazão de 1,05 item/dia, WIP 20 dá 19 dias, WIP 10 dá 9,5 e WIP 5 dá 4,8.

## Questão 13 (Ágil (Kanban e Scrum)) - AUTORAL (não é de prova real)

De acordo com o Guia do Scrum 2020, a Daily Scrum

A) é uma reunião mensal de status para a diretoria.
B) é conduzida pelo Product Owner e dura 4 horas.
C) é um evento de 15 minutos para inspecionar o progresso rumo ao Objetivo da Sprint e adaptar o Backlog da Sprint.
D) serve para avaliar o desempenho individual dos desenvolvedores.
E) ocorre apenas no fim da Sprint, antes da Revisão.

**Gabarito: C.** A Daily Scrum tem 15 minutos, é dos Desenvolvedores e ocorre todo dia da Sprint. Os eventos são: Sprint, Planejamento da Sprint, Daily Scrum, Revisão da Sprint e Retrospectiva. Cada artefato tem um compromisso: Product Goal, Sprint Goal e Definição de Pronto.

## Questão 14 (Lei 14.133) - AUTORAL (não é de prova real)

A Lei nº 14.133/2021 organiza o processo licitatório em fases. A ordem correta é:

A) divulgação do edital; preparatória; habilitação; julgamento; recursal; homologação.
B) preparatória; habilitação; divulgação do edital; julgamento; homologação.
C) julgamento; propostas; edital; habilitação; homologação.
D) homologação; preparatória; recursal; julgamento.
E) preparatória; divulgação do edital; apresentação de propostas e lances; julgamento; habilitação; recursal; homologação.

**Gabarito: E.** Art. 17: 7 fases. A habilitação vem, em regra, depois do julgamento (inversão de fases em relação à Lei 8.666), e a fase recursal precede a homologação. Laboratório L8, parte 4.

## Questão 15 (Lei 14.133) - AUTORAL (não é de prova real)

Quanto ao diálogo competitivo, na Lei nº 14.133/2021, é correto afirmar que

A) é a modalidade obrigatória para qualquer compra de bens comuns.
B) é modalidade usada, por exemplo, quando a Administração vislumbra inovação tecnológica ou técnica e não consegue definir com precisão suficiente as especificações; a licitação é conduzida por comissão de no mínimo 3 servidores.
C) dispensa a fase preparatória e o ETP.
D) dispensa a publicação do edital e a competição.
E) só pode ser usada para obras públicas com menos de dois anos de prazo.

**Gabarito: B.** Art. 6º, XLII e art. 32: o diálogo competitivo permite conversar com licitantes previamente selecionados para desenvolver alternativas, até que a Administração identifique a solução que atende à necessidade. A comissão tem no mínimo 3 servidores efetivos (os prazos mínimos, de 25 e 60 dias úteis, estão no art. 32). Na IN SGD/ME nº 94/2022 ele é permitido nos casos do art. 32. Laboratório L8, parte 2.

## Questão 16 (Lei 14.133) - AUTORAL (não é de prova real)

A estimativa do valor da contratação, na Lei nº 14.133/2021 (art. 23), deve ser feita

A) apenas com a proposta de um único fornecedor escolhido pelo gestor.
B) somente depois da homologação do certame.
C) com base no maior preço encontrado, para garantir segurança.
D) com o melhor preço aferido por parâmetros como painel de preços (PNCP), contratações similares, mídia especializada, pesquisa direta com no mínimo três fornecedores e notas fiscais eletrônicas, de forma combinada ou não, com a metodologia justificada no processo.
E) sem registro da metodologia, por ser matéria sigilosa.

**Gabarito: D.** Art. 23, § 1º: melhor preço por parâmetros combinados ou não. Não se usa o maior preço nem um único fornecedor; a pesquisa é da fase preparatória, antes do edital. No laboratório L8 (parte 1), com seis fontes de preço, o menor valor foi R$ 118.000 e a mediana, R$ 129.500, mas a escolha final precisa ser justificada.

## Questão 17 (Lei 14.133) - AUTORAL (não é de prova real)

A Instrução Normativa SGD/ME nº 94/2022, que trata das contratações de soluções de TIC no âmbito do SISP, divide o processo em

A) três fases: planejamento da contratação, seleção do fornecedor e gestão do contrato, com a gestão de riscos acompanhando o processo.
B) sete fases idênticas às do art. 17 da Lei 14.133.
C) duas fases: aquisição e descarte.
D) cinco fases: estratégia, desenho, transição, operação e melhoria.
E) uma fase única, sem equipe de planejamento.

**Gabarito: A.** A IN 94/2022 tem três fases: planejamento (equipe de planejamento, ETP e termo de referência), seleção do fornecedor e gestão do contrato. Ela vale para o Executivo federal (SISP); órgãos de outros poderes e estados usam as regras locais, como a Lei 14.133, mas costumam se inspirar nela. No pregão, a IN determina que a solução comum de TIC seja contratada por pregão.

## Questão 18 (Lei 14.133) - AUTORAL (não é de prova real)

A matriz de riscos da Lei nº 14.133/2021 (art. 6º, XXVII e art. 22) é uma cláusula contratual que

A) proíbe qualquer reajuste de preços.
B) é um gráfico de probabilidade e impacto de uso exclusivo da equipe de TI.
C) é obrigatória apenas em compras de pequeno valor.
D) substitui o termo de referência.
E) define a alocação de riscos e responsabilidades entre contratante e contratado, para preservar o equilíbrio econômico-financeiro do contrato.

**Gabarito: E.** A matriz de alocação de riscos distribui entre as partes os riscos previsíveis (quem arca com o quê) e protege o equilíbrio econômico-financeiro. Não confundir com a matriz 3×3 de probabilidade × impacto do gerenciamento de riscos de projeto (laboratório L9).

## Questão 19 (Riscos) - AUTORAL (não é de prova real)

Em gerenciamento de riscos de projetos, para uma ameaça de baixo impacto e baixa probabilidade, uma resposta adequada e comum é

A) explorar, pois é uma oportunidade.
B) transferir sempre a um terceiro, mesmo com custo maior que o dano.
C) aceitar, monitorando o risco e mantendo uma pequena reserva.
D) eliminar o projeto.
E) compartilhar com o patrocinador, em todos os casos.

**Gabarito: C.** Respostas a ameaças: evitar, transferir, mitigar e aceitar. Para oportunidades: explorar, compartilhar, melhorar e aceitar. No laboratório L9, o risco R6 (5% de chance, perda de R$ 30.000, VME de −1.500) tem resposta de aceitar e monitorar.

## Questão 20 (Governo Digital) - AUTORAL (não é de prova real)

A Lei nº 14.129/2021 (Lei do Governo Digital) e o Decreto nº 12.069/2024 (Estratégia Nacional de Governo Digital 2024-2027) têm como foco

A) regras exclusivas para licitação de obras de engenharia.
B) a transformação digital do setor público, com serviços digitais, uso de dados, interoperabilidade e eficiência da administração.
C) a criação de cargos de analista de TI.
D) a tributação de serviços digitais pelos municípios.
E) a regulamentação da profissão de analista de sistemas.

**Gabarito: B.** A Lei 14.129/2021 traz princípios, regras e instrumentos para o Governo Digital e a eficiência pública; o Decreto 12.069/2024 dispõe sobre a Estratégia Nacional de Governo Digital 2024-2027 e a Rede Nacional de Governo Digital. A TIC do órgão deve estar alinhada a essa estratégia por meio de seu planejamento (PDTIC), conforme a IN 94/2022 para o SISP.
