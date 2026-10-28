# Questões reais da FCC com resolução passo a passo

51 questões reais de Matemática e Raciocínio Lógico, todas da FCC (51). Vêm de provas de Técnico Judiciário de TI de tribunais regionais do trabalho e do próprio TCE-GO (caderno de 2009), que cobram o mesmo conteúdo do edital atual. Cada questão traz a banca, o órgão, o ano, o caderno e o número, e o gabarito oficial de cada prova. Questões anuladas, as que dependem de figura sem possibilidade de redesenho e as de matéria fora do edital não foram incluídas. As resoluções são próprias, não texto da banca, e foram conferidas por código no Laboratório (51 de 51 respostas iguais ao gabarito oficial). Distribuição por subtema: Contagem (4); Sequências e relações lógicas (14); Quantificadores e verdades e mentiras (5); Operações e expressões (2); Frações, razão e proporção (5); Proposições e tabelas-verdade (1); Médias (2); Conjuntos (3); Regra de três (4); Múltiplos e divisores (3); Porcentagem (3); Dedução e argumentos (5). Pontos de atenção: na questão 20 do TCE-GO a leitura do enunciado admite duas interpretações; na questão 11 do TRT-23 as alternativas A e E estão repetidas no caderno oficial; algumas resoluções assumem uma leitura do enunciado, declarada no comentário.

Provas de origem:
- FCC, TCE-GO 2009, Técnico de Controle Externo, Tecnologia da Informação, caderno N14 tipo 1
- FCC, TRT-1 (RJ) 2014, Técnico Judiciário, Tecnologia da Informação, caderno C03 tipo 1
- FCC, TRT-2 (SP) 2014, Técnico Judiciário, Tecnologia da Informação, caderno M13 tipo 1
- FCC, TRT-2 (SP) 2018, Técnico Judiciário, Tecnologia da Informação, caderno TJ05 tipo 1
- FCC, TRT-14 (RO/AC) 2022, Técnico Judiciário, Tecnologia da Informação, caderno F06 tipo 1
- FCC, TRT-22 (PI) 2022, Técnico Judiciário, Apoio Especializado, TI, caderno K11 tipo 1
- FCC, TRT-5 (BA) 2022, Técnico Judiciário, Apoio Especializado, TI, caderno T20 tipo 1
- FCC, TRT-23 (MT) 2022, Técnico Judiciário, Apoio Especializado, TI, caderno T18 tipo 1
- FCC, TRT-4 (RS) 2022, Técnico Judiciário, Apoio Especializado, TI, caderno T17 tipo 1

## Questão 1 (Contagem) - FCC, TCE-GO 2009, questão 17

No próximo domingo, Dona Marieta completará 100 anos de idade e sua bisneta Julieta resolveu presenteá-la construindo a árvore genealógica de seus descendentes. Para tal, Julieta usou as seguintes informações: Dona Marieta teve 10 filhos, três dos quais não lhe deram netos e cada um dos demais lhe deu 3 netos; apenas quatro dos netos de Dona Marieta não tiveram filhos, enquanto que cada um dos demais lhe deu 5 bisnetos; dos bisnetos de Dona Marieta, apenas nove não tiveram filhos e cada um dos outros teve 2 filhos; os tataranetos de Dona Marieta ainda não têm filhos. Nessas condições, é correto afirmar que o total de descendentes de Dona Marieta é

A) 226
B) 264
C) 268
D) 272
E) 277

**Gabarito: C.** Passo 1. Filhos: são 10. Três não deram netos, então 10 − 3 = 7 filhos deram 3 netos cada: 7 × 3 = 21 netos.

Passo 2. Netos: são 21. Quatro não tiveram filhos, então 21 − 4 = 17 netos deram 5 bisnetos cada: 17 × 5 = 85 bisnetos.

Passo 3. Bisnetos: são 85. Nove não tiveram filhos, então 85 − 9 = 76 tiveram 2 filhos cada: 76 × 2 = 152 tataranetos.

Passo 4. Os tataranetos ainda não têm filhos, então a árvore termina aí. O total de descendentes soma todas as gerações: 10 + 21 + 85 + 152 = 268.

Conclusão. alternativa C. O erro comum é parar em uma geração ou esquecer de somar os filhos (10) ao total.

## Questão 2 (Sequências e relações lógicas) - FCC, TCE-GO 2009, questão 18

Abaixo tem-se uma sucessão de grupos de três letras, cada qual seguido de um número que o representa, entre parênteses.

ABH (11) − DBX (30) − MAR (32) − KIT (40) − CYN (42)

Considerando que o número representante de cada grupo de letras foi escolhido segundo determinado critério e o alfabeto usado é o oficial, ou seja, tem 26 letras, então, segundo o mesmo critério, o grupo PAZ deve ser representado pelo número

A) 31
B) 36
C) 40
D) 43
E) 46

**Gabarito: D.** Passo 1. Numere o alfabeto de 1 a 26 (A = 1, B = 2, C = 3, ..., Z = 26).

Passo 2. Teste a hipótese "soma das posições das três letras" no primeiro grupo: ABH = 1 + 2 + 8 = 11, que é o número dado.

Passo 3. Confirme nos demais: DBX = 4 + 2 + 24 = 30; MAR = 13 + 1 + 18 = 32; KIT = 11 + 9 + 20 = 40; CYN = 3 + 25 + 14 = 42. A regra vale para os cinco.

Passo 4. Aplique a PAZ: P = 16, A = 1, Z = 26, e 16 + 1 + 26 = 43.

Conclusão. alternativa D. Em sequências de letras, a primeira hipótese a testar é a soma das posições; confirme sempre em todos os termos antes de aplicar.

## Questão 3 (Sequências e relações lógicas) - FCC, TCE-GO 2009, questão 19

Considere que os números que compõem a sequência seguinte obedecem a uma lei de formação.

(120; 120; 113; 113; 105; 105; 96; 96; 86; 86; . . .)

A soma do décimo quarto e décimo quinto termos dessa sequência é um número

A) ímpar.
B) menor do que 100.
C) divisível por 3.
D) maior do que 130.
E) múltiplo de 5.

**Gabarito: A.** Passo 1. Cada valor aparece duas vezes seguidas. Então basta olhar os valores distintos: 120, 113, 105, 96, 86, ...

Passo 2. As diferenças entre valores distintos consecutivos são 7, 8, 9, 10, ... (cada uma uma unidade maior que a anterior). As próximas são 11, 12, 13.

Passo 3. Continue: 86 − 11 = 75; 75 − 12 = 63; 63 − 13 = 50. Os valores distintos são 120, 113, 105, 96, 86, 75, 63, 50.

Passo 4. Cada valor ocupa duas posições: 1º e 2º termos = 120; 3º e 4º = 113; 5º e 6º = 105; 7º e 8º = 96; 9º e 10º = 86; 11º e 12º = 75; 13º e 14º = 63; 15º e 16º = 50.

Passo 5. O 14º termo é 63 e o 15º é 50. A soma é 63 + 50 = 113.

Conclusão. 113 é ímpar, alternativa A. As demais falham: 113 > 100, 113 não é divisível por 3 (1 + 1 + 3 = 5), é menor que 130 e não termina em 0 ou 5.

## Questão 4 (Quantificadores e verdades e mentiras) - FCC, TCE-GO 2009, questão 20

Serena está muito preocupada com sua amiga Corina, pois descobriu que todas as quartas, quintas e sextas-feiras ela só fala mentiras e nos demais dias da semana ela fala apenas a verdade. Certo dia em que foram almoçar juntas, Corina disse a Serena: “Ontem foi meu dia de mentir, mas só voltarei a fazê-lo daqui a três dias.” Com base na afirmação de Corina, tal almoço só pode ter ocorrido em

A) uma segunda-feira.
B) uma quarta-feira.
C) uma sexta-feira.
D) um sábado.
E) um domingo.

**Gabarito: B.** Passo 1. Corina mente em quarta, quinta e sexta, e diz a verdade nos outros quatro dias. A frase tem duas partes ligadas por "mas": (1) "ontem foi meu dia de mentir" e (2) "só voltarei a mentir daqui a três dias".

Passo 2. Dia em que ela diz a verdade (dom, seg, ter ou sáb): a frase inteira teria de ser verdadeira. A parte (1) exige que ontem fosse quarta, quinta ou sexta, ou seja, hoje seria quinta, sexta ou sábado; só o sábado é dia de verdade. Mas, no sábado, a próxima mentira é na quarta, daqui a 4 dias, e não a 3: a parte (2) é falsa. Então nenhum dia de verdade serve.

Passo 3. Dia em que ela mente: a frase tem de ser falsa. Pela leitura que fecha com o gabarito, quem mente erra as duas partes. A parte (1) falsa significa que ontem NÃO foi dia de mentir: de quarta, quinta e sexta, só a quarta tem a terça (dia de verdade) como véspera.

Passo 4. Confira a quarta-feira: ontem (terça) ela falou a verdade, então a parte (1) é mesmo falsa; e hoje e amanhã ela mente, então a parte (2) é falsa também. A frase é toda falsa, compatível com uma mentirosa.

Conclusão. quarta-feira, alternativa B. Observação: pela negação lógica estrita de "A e B" (basta uma parte falsa), a quinta e a sexta também serviriam; o gabarito oficial só fecha com a leitura em que as duas partes são falsas. O Laboratório L8 testa as duas leituras. Na prova, marque a oficial.

## Questão 5 (Quantificadores e verdades e mentiras) - FCC, TCE-GO 2009, questão 21

São dadas as afirmações: Toda cobra é um réptil. Existem répteis venenosos. Se as duas afirmações são verdadeiras, então, com certeza, também é verdade que

A) toda cobra é venenosa.
B) algum réptil venenoso é uma cobra.
C) qualquer réptil é uma cobra.
D) Se existe um réptil venenoso, então ele é uma cobra.
E) Se existe uma cobra venenosa, então ela é um réptil.

**Gabarito: E.** Passo 1. Desenhe os conjuntos: o conjunto das cobras está inteiro dentro do conjunto dos répteis (toda cobra é réptil). Dentro dos répteis há uma parte de venenosos (existem répteis venenosos), mas não se sabe se esse grupo toca o das cobras.

Passo 2. Teste cada alternativa com o desenho: (A) toda cobra ser venenosa não é obrigatório, as cobras podem estar fora da região dos venenosos. (B) pode não haver réptil venenoso que seja cobra (por exemplo, só lagartos venenosos). (C) afirmaria que os répteis estão todos dentro das cobras, o contrário do que se sabe. (D) diz que todo réptil venenoso é cobra, o que não decorre.

Passo 3. (E) "Se existe uma cobra venenosa, então ela é um réptil" só repete a primeira afirmação (toda cobra é réptil): qualquer cobra, venenosa ou não, é réptil. Isso é verdadeiro em todos os desenhos possíveis.

Conclusão. alternativa E. Com "todo" e "existe", a conclusão certa só pode ser a que decorre de "todo A é B" sem acrescentar informação sobre a interseção.

## Questão 6 (Sequências e relações lógicas) - FCC, TCE-GO 2009, questão 22

Alguns resultados curiosos podem ser observados em algumas operações matemáticas, como mostra o exemplo seguinte:

4² = 16

34² = 1 156

334² = 111 556

3 334² = 11 115 556

. . .

O exemplo dado, permite que se conclua corretamente que a soma dos algarismos do número 333 333 334² é um número compreendido entre

A) 0 e 25
B) 25 e 50
C) 50 e 75
D) 75 e 100
E) 100 e 125

**Gabarito: C.** Passo 1. Observe o padrão no resultado: 4² tem 1 dígito no número e dá 16 (um 1 e um 6). 34² dá 1156: dois 1, um 5, um 6. 334² dá 111556: três 1, dois 5, um 6. 3334² dá 11115556: quatro 1, três 5, um 6.

Passo 2. Regra: um número com n dígitos (n − 1 algarismos 3 seguidos de um 4) tem quadrado com n algarismos 1, n − 1 algarismos 5 e um algarismo 6.

Passo 3. O número 333 333 334 tem 9 dígitos (oito 3 e um 4), então n = 9. O quadrado tem nove 1, oito 5 e um 6.

Passo 4. Soma dos algarismos: 9 × 1 + 8 × 5 + 1 × 6 = 9 + 40 + 6 = 55.

Conclusão. 55 está entre 50 e 75, alternativa C. O Laboratório L1 calcula o quadrado de verdade e confere a soma.

## Questão 7 (Operações e expressões) - FCC, TCE-GO 2009, questão 23

Uma operação ∗ deve ser efetuada de acordo com a seguinte definição: a ∗ b = a + b + a · b, sendo a e b números inteiros. Assim, calculando-se 2 ∗ (12 ∗ 5) obtém-se

A) 217
B) 223
C) 227
D) 233
E) 237

**Gabarito: D.** Passo 1. Resolva primeiro o parêntese, como em qualquer expressão: 12 ∗ 5 = 12 + 5 + 12 · 5.

Passo 2. Faça a multiplicação antes da soma: 12 · 5 = 60. Então 12 ∗ 5 = 12 + 5 + 60 = 77.

Passo 3. Agora aplique a operação de novo: 2 ∗ 77 = 2 + 77 + 2 · 77 = 2 + 77 + 154 = 233.

Conclusão. alternativa D. Operação definida no enunciado: não use o "∗" como multiplicação comum, apenas substitua a e b na fórmula, de dentro para fora. Dica: a ∗ b = (a + 1)(b + 1) − 1, o que dá (3)(78) − 1 = 233 também.

## Questão 8 (Sequências e relações lógicas) - FCC, TCE-GO 2009, questão 24

Alceste, Carmo, Germano, Irineu e Mustafá, funcionários do Tribunal de Contas do Estado de Goiás, nasceram nas cidades de Anápolis, Catalão, Goiânia, Inhumas e Morrinhos. Certo dia, eles foram incumbidos da execução das seguintes tarefas: arquivar documentos, conferir documentos, guardar documentos, implementar um sistema de informação e manutenção de veículos. Considere como verdadeiras as seguintes afirmações:a letra inicial do nome de cada um deles, bem como as letras iniciais da cidade onde nasceram e da primeira palavra que designa as suas respectivas tarefas são duas a duas distintas entre si;o funcionário que deveria conferir documentos não nasceu em Goiânia;Carmo não deveria guardar documentos e nem fazer a manutenção de veículos; também não nasceu em Goiânia e nem em Inhumas;Irineu nasceu em Morrinhos, não deveria conferir documentos e tampouco deveria arquivá-los;Alceste e Mustafá não nasceram em Catalão;Mustafá não deveria conferir documentos e nem implementar um sistema de informação.Se todos cumpriram as tarefas que lhe foram designadas, então, com base nas informações dadas, é correto concluir que Carmo e Germano nasceram, respectivamente, em

A) Anápolis e Catalão.
B) Anápolis e Morrinhos.
C) Inhumas e Anápolis.
D) Morrinhos e Catalão.
E) Morrinhos e Inhumas.

**Gabarito: A.** Passo 1. Regra das iniciais: para cada pessoa, a inicial do nome, a da cidade e a da tarefa são todas diferentes. Logo Alceste não nasceu em Anápolis nem arquiva; Carmo não nasceu em Catalão nem confere; Germano não nasceu em Goiânia nem guarda; Irineu não nasceu em Inhumas nem implementa; Mustafá não nasceu em Morrinhos nem faz manutenção.

Passo 2. Cidade de Carmo: ele não nasceu em Goiânia nem em Inhumas (dado), nem em Catalão (inicial C, igual à do nome) e Morrinhos já é de Irineu. Sobra Anápolis.

Passo 3. Cidade de Germano: Anápolis e Morrinhos já têm dono, então as cidades livres são Catalão, Goiânia e Inhumas. Germano não nasceu em Goiânia (inicial G). Alceste e Mustafá não nasceram em Catalão, e Catalão precisa de alguém dos três que sobram (Alceste, Germano, Mustafá). Só Germano pode ser de Catalão.

Passo 4. Para fechar o quebra-cabeça (não é necessário para responder): Irineu guarda ou faz manutenção; Carmo arquiva ou implementa; ao distribuir as cinco tarefas e as duas cidades que sobram (Goiânia e Inhumas) para Alceste e Mustafá, resta uma única solução: Alceste (Inhumas, conferir), Carmo (Anápolis, implementar), Germano (Catalão, manutenção), Irineu (Morrinhos, guardar) e Mustafá (Goiânia, arquivar).

Conclusão. Carmo nasceu em Anápolis e Germano em Catalão, alternativa A. O Laboratório L8 testa todas as combinações e confirma que só existe essa solução.

## Questão 9 (Frações, razão e proporção) - FCC, TRT-14 (RO/AC) 2022, questão 11

Sete netos, todos com idades diferentes entre si, devem dividir a quantia de R$ 4.664,00 da seguinte maneira: o neto mais novo deve receber três oitavos dessa quantia e, do que sobrar, o mais velho deve receber um quinto. Finalmente a quantia que ainda restar deve ser igualmente distribuída entre os demais netos. André não é o neto mais novo, nem é o neto mais velho, e a diferença entre as quantias recebidas pelo neto mais velho e André é

A) R$ 111,50.
B) R$ 116,60.
C) R$ 124,40.
D) R$ 128,50.
E) R$ 132,50.

**Gabarito: B.** Passo 1. O mais novo recebe 3/8 de 4.664: 4.664 ÷ 8 = 583 e 583 × 3 = 1.749.

Passo 2. Sobra 4.664 − 1.749 = 2.915. O mais velho recebe 1/5 do que sobrou: 2.915 ÷ 5 = 583.

Passo 3. Resta 2.915 − 583 = 2.332 para os cinco netos do meio (7 − 2 = 5). Cada um recebe 2.332 ÷ 5 = 466,40. André é um desses cinco.

Passo 4. A diferença entre o mais velho e André é 583,00 − 466,40 = 116,60.

Conclusão. alternativa B. Cuidado: "do que sobrar" muda a base da fração; o 1/5 não é de 4.664.

## Questão 10 (Frações, razão e proporção) - FCC, TRT-14 (RO/AC) 2022, questão 12

Um professor possui vários livros, uma parte em inglês e a outra em português, sendo a razão entre o número de livros em inglês e o número de livros em português igual a 2/7. Esse professor trocou 120 livros que tinha em inglês por 90 outros livros, sendo 56 em português e os demais em inglês. Após a troca, a razão entre o número de livros em inglês e o número de livros em português desse professor passou a ser de 9/40. Agora, o número de livros que ele possui é

A) 1974.
B) 2037.
C) 2016.
D) 1995.
E) 2058.

**Gabarito: E.** Passo 1. Chame de 2k os livros em inglês e de 7k os livros em português (razão 2/7).

Passo 2. Na troca, saem 120 livros em inglês e entram 90, sendo 56 em português e 90 − 56 = 34 em inglês. Inglês: 2k − 120 + 34 = 2k − 86. Português: 7k + 56.

Passo 3. Nova razão: (2k − 86)/(7k + 56) = 9/40. Multiplique em cruz: 40(2k − 86) = 9(7k + 56), isto é, 80k − 3.440 = 63k + 504.

Passo 4. Resolva: 17k = 3.944, logo k = 232.

Passo 5. Agora: inglês = 2 · 232 − 86 = 378 e português = 7 · 232 + 56 = 1.680. Total = 378 + 1.680 = 2.058. Confira a razão: 378/1.680 = 9/40.

Conclusão. alternativa E. Atenção ao que se pede: o total depois da troca, não o inicial (que seria 9k = 2.088).

## Questão 11 (Quantificadores e verdades e mentiras) - FCC, TRT-14 (RO/AC) 2022, questão 13

Em uma aula de improvisação, Alex, Beto e Caio foram escolhidos para conversar com os demais alunos e, cada um, durante toda a conversa, falou apenas verdades ou apenas mentiras. Os três escolhidos combinaram entre si quem falaria verdades e quem falaria mentiras, mas o resto do grupo não sabia o papel que cada um interpretava. Quando a improvisação começou, Alex disse: “Beto escolheu o papel de mentiroso” e Beto disse: “dois entre nós três escolheram o papel de mentiroso”. O professor, que também não sabia quem falava a verdade e quem mentia, perguntou a Caio em que ano ele havia nascido, ao que Caio respondeu. Paula, em seguida, repetiu para Caio a mesma pergunta que o professor havia feito e, com a resposta que Caio lhe deu, somente assim, ela pôde concluir logicamente que os papéis representados por Alex, Beto e Caio eram, respectivamente,

A) mentiroso, honesto, mentiroso.
B) mentiroso, mentiroso, honesto.
C) mentiroso, honesto, honesto.
D) mentiroso, mentiroso, mentiroso.
E) honesto, mentiroso, honesto.

**Gabarito: A.** Passo 1. Há 8 combinações de papéis para Alex, Beto e Caio (honesto, H, ou mentiroso, M). Só valem as que tornam coerentes as duas falas: Alex diz "Beto é mentiroso" e Beto diz "exatamente dois de nós três são mentirosos".

Passo 2. Suponha Alex honesto (H). Sua fala é verdadeira, então Beto é mentiroso (M). A fala de Beto é falsa, logo o número de mentirosos não é dois. Com Beto M e Alex H, se Caio fosse M teríamos dois mentirosos (a fala de Beto seria verdadeira: contradição). Então Caio é H: combinação (H, M, H).

Passo 3. Suponha Alex mentiroso (M). Sua fala é falsa, logo Beto é honesto (H). A fala de Beto é verdadeira, então há exatamente dois mentirosos: Alex e Caio. Combinação (M, H, M).

Passo 4. Restam duas combinações: (H, M, H) e (M, H, M). Elas diferem no papel de todos, e Caio é do mesmo tipo de Alex nas duas. A pergunta do ano de nascimento resolve isso: um honesto responde sempre o mesmo ano, o verdadeiro. Um mentiroso nunca diz o verdadeiro, e pode variar o ano falso.

Passo 5. Paula só conseguiu concluir "somente assim", depois da segunda resposta. Isso só acontece se Caio deu uma resposta diferente da primeira: um honesto nunca se contradiz, então ele só pode ser o mentiroso. Se a resposta se repetisse, Paula não decidiria, pois um mentiroso também pode repetir a mesma mentira. Logo Caio é mentiroso e a combinação é (M, H, M).

Conclusão. alternativa A. Passo a passo: testar Alex honesto e Alex mentiroso elimina seis das oito combinações; o argumento da resposta repetida decide entre as duas que sobram.

Observação: O enunciado é longo; o raciocínio está nas duas falas e no fato de que um honesto não se contradiz. O Laboratório L8 testa as oito combinações.

## Questão 12 (Sequências e relações lógicas) - FCC, TRT-14 (RO/AC) 2022, questão 14

A sequência mista 4, 8, 7, 5, 10, 9, 13, 6, 16, 10, 19, 7, … contém os elementos de duas sequências, sendo uma delas formada pelos elementos que ocupam as posições ímpares e a outra pelos elementos das posições pares. Nessa sequência mista, subtraindo seu 100º elemento de seu 99º elemento, obtemos

A) 115.
B) 125.
C) 119.
D) 122.
E) 118.

**Gabarito: D.** Passo 1. Separe as posições ímpares e as pares. Ímpares (1ª, 3ª, 5ª, ...): 4, 7, 10, 13, 16, 19, ... Pares (2ª, 4ª, 6ª, ...): 8, 5, 9, 6, 10, 7, ...

Passo 2. Sequência dos ímpares: soma 3 a cada passo. A k-ésima é 4 + 3(k − 1). O 99º elemento é o 50º dos ímpares (posição 2k − 1 = 99, k = 50): 4 + 3 · 49 = 151.

Passo 3. Sequência dos pares: 8, 5, 9, 6, 10, 7, ... Ela mesma é mista: nos lugares ímpares dela (8, 9, 10, ...) soma 1; nos lugares pares dela (5, 6, 7, ...) também soma 1. O 100º elemento é o 50º dos pares (2k = 100, k = 50). O 50º dos pares é um lugar par da subsequência (5, 6, 7, ...), que é o 25º termo dela: 5 + 24 = 29.

Passo 4. Subtraia como pede o enunciado (99º menos 100º): 151 − 29 = 122.

Conclusão. alternativa D. Sequência mista: separe em duas, e se uma delas ainda for mista, separe de novo.

## Questão 13 (Proposições e tabelas-verdade) - FCC, TRT-14 (RO/AC) 2022, questão 15

Considere seguintes proposições:

p: Em março há 2 feriados ou 5 domingos.

q: Em março nunca há carnaval.

A negação da condicional p → q é equivalente à afirmação:

A) Em março não há 2 feriados e não há 5 domingos e em março sempre há carnaval.
B) Em março não há 2 feriados ou não há 5 domingos e em março sempre há carnaval.
C) Em março há 2 feriados ou 5 domingos e em março pode haver carnaval.
D) Se em março não há 2 feriados e não há 5 domingos, então em março sempre há carnaval.
E) Se em março não há 2 feriados e não há 5 domingos, então em março pode haver carnaval.

**Gabarito: C.** Passo 1. A negação de uma condicional mantém a primeira parte e nega a segunda: ~(p → q) ≡ p ∧ ~q. A negação de "se, então" nunca é outro "se, então".

Passo 2. Mantenha p: "Em março há 2 feriados ou 5 domingos", sem alterar o "ou".

Passo 3. Negue q ("nunca há carnaval"): negar "nunca" dá "pelo menos uma vez há", isto é, "em março pode haver carnaval" (algum março tem carnaval).

Passo 4. Ligue por "e": "Em março há 2 feriados ou 5 domingos e em março pode haver carnaval".

Conclusão. alternativa C. As alternativas A e B negam p (errado), D e E ainda são condicionais (errado).

## Questão 14 (Médias) - FCC, TRT-5 (BA) 2022, questão 11

Numa prova com dez questões, a pontuação na correção de cada questão pode variar entre 0 e 10 pontos. A média dos pontos obtidos por um estudante nas 6 primeiras questões é 6,5. A pontuação média nas quatro últimas questões para que ele atinja um total de 71 pontos na prova deverá ser:

A) 7
B) 7,5
C) 8
D) 8,5
E) 9

**Gabarito: C.** Passo 1. A média das 6 primeiras é 6,5, então elas somam 6 × 6,5 = 39 pontos.

Passo 2. Para chegar a 71, faltam 71 − 39 = 32 pontos nas quatro últimas.

Passo 3. A média das quatro últimas é 32 ÷ 4 = 8.

Conclusão. alternativa C. Média é soma dividida pela quantidade: volte sempre à soma.

## Questão 15 (Conjuntos) - FCC, TRT-5 (BA) 2022, questão 12

Uma pesquisa em um grupo de 25 estudantes constatou que 15 deles gostam de assistir jogos de futebol pela televisão, 12 gostam de assistir jogos de tênis e 10 gostam de assistir jogos de futebol e de tênis. O número de alunos dessa classe que não gostam de assistir jogos de futebol ou tênis é:

A) 5
B) 6
C) 7
D) 8
E) 10

**Gabarito: D.** Passo 1. Use a união de dois conjuntos: n(F ∪ T) = n(F) + n(T) − n(F ∩ T). Os que gostam dos dois esportes foram contados duas vezes, então se subtrai a interseção uma vez.

Passo 2. n(F ∪ T) = 15 + 12 − 10 = 17 alunos gostam de futebol ou de tênis (ou dos dois).

Passo 3. Os que não gostam de nenhum são o restante do universo: 25 − 17 = 8.

Conclusão. alternativa D. Só futebol: 15 − 10 = 5; só tênis: 12 − 10 = 2; ambos: 10; nenhum: 8. Soma 5 + 2 + 10 + 8 = 25.

## Questão 16 (Regra de três) - FCC, TRT-5 (BA) 2022, questão 13

Um grupo de 6 pessoas, em que todas trabalham no mesmo ritmo, realiza uma certa tarefa em cinco dias se cada uma delas trabalhar 2 horas por dia. Para fazer a mesma tarefa, duas dessas pessoas trabalharam inicialmente 4 horas por dia durante cinco dias, e nesse momento, uma delas desistiu. A outra, mantendo a mesma carga de trabalho de 4 horas por dia, deverá terminar a tarefa em:

A) 4 dias.
B) 5 dias.
C) 6 dias.
D) 7 dias.
E) 8 dias.

**Gabarito: B.** Passo 1. Meça a tarefa em "pessoa-hora": 6 pessoas × 5 dias × 2 h/dia = 60 pessoa-horas.

Passo 2. Trabalho já feito: 2 pessoas × 5 dias × 4 h/dia = 40 pessoa-horas. Falta 60 − 40 = 20 pessoa-horas.

Passo 3. Uma pessoa a 4 h/dia faz 4 pessoa-horas por dia. Dias que faltam: 20 ÷ 4 = 5.

Conclusão. alternativa B. Esse é o método mais seguro para regra de três composta: reduza tudo a uma unidade única de trabalho.

## Questão 17 (Frações, razão e proporção) - FCC, TRT-5 (BA) 2022, questão 14

Ana e Marcos têm uma despesa mensal de R$ 2.000,00 cada um e o salário de Ana é 5/6 do salário de Marcos. Ana economiza mensalmente 80% do que Marcos consegue economizar. O salário de Marcos, em reais, é:

A) 5.200,00
B) 7.400,00
C) 9.300,00
D) 10.500,00
E) 12.000,00

**Gabarito: E.** Passo 1. Chame o salário de Marcos de M. O de Ana é (5/6)M. Economia = salário − despesa: Marcos economiza M − 2.000 e Ana economiza (5/6)M − 2.000.

Passo 2. Ana economiza 80% do que Marcos economiza: (5/6)M − 2.000 = 0,8 · (M − 2.000) = 0,8M − 1.600.

Passo 3. Junte os termos em M: (5/6)M − 0,8M = 2.000 − 1.600 = 400. Como 5/6 ≈ 0,8333, a diferença 0,8333 − 0,8 = 1/30.

Passo 4. Então M/30 = 400 e M = 12.000.

Conclusão. alternativa E. Conferência: Ana ganha 10.000 e economiza 8.000; Marcos economiza 10.000; 8.000 é 80% de 10.000.

## Questão 18 (Múltiplos e divisores) - FCC, TRT-5 (BA) 2022, questão 15

Dois ciclistas partem de um mesmo ponto para percorrer o mesmo circuito. O primeiro ciclista completa uma volta do circuito em 5 minutos e o segundo, em 6 minutos. Se eles derem voltas no circuito durante 1 hora e meia, passarão pelo ponto de partida ao mesmo tempo somente

A) uma vez.
B) duas vezes.
C) três vezes.
D) quatro vezes.
E) cinco vezes.

**Gabarito: C.** Passo 1. Eles passam juntos pelo ponto de partida nos instantes que são múltiplos de 5 e de 6 ao mesmo tempo, isto é, múltiplos do MMC(5, 6) = 30 minutos.

Passo 2. O tempo total é 1 h 30 min = 90 minutos. Os instantes comuns são 30, 60 e 90 minutos.

Passo 3. O instante 0 é a largada (partem juntos), e a pergunta fala em passar pelo ponto depois da partida. Logo são 3 encontros.

Conclusão. alternativa C. Em MMC com tempo, conte se o instante inicial entra: aqui o enunciado conta só as passagens após a largada.

## Questão 19 (Sequências e relações lógicas) - FCC, TRT-22 (PI) 2022, questão 16

Cada um dos números 1, 2, 3 e 4 foram colocados em um quadriculado 2 × 2. Se a soma da primeira linha é 3 e a soma da diagonal principal (da esquerda para a direita) é 4, então a soma da primeira coluna é

A) 5.
B) 4.
C) 6.
D) 7.
E) 8.

**Gabarito: A.** Passo 1. Chame as casas de a (linha 1, coluna 1), b (linha 1, coluna 2), c (linha 2, coluna 1) e d (linha 2, coluna 2). Os números 1, 2, 3 e 4 aparecem uma vez cada.

Passo 2. Primeira linha: a + b = 3. Com números distintos de 1 a 4, só serve {1, 2}.

Passo 3. Diagonal principal: a + d = 4. Os pares possíveis de números distintos são {1, 3}. Como a é 1 ou 2, a = 1 e d = 3 (a = 2 pediria d = 2, repetido). Então b = 2.

Passo 4. O número que sobra é 4, que fica em c. Primeira coluna: a + c = 1 + 4 = 5.

Conclusão. alternativa A.

## Questão 20 (Sequências e relações lógicas) - FCC, TRT-22 (PI) 2022, questão 17

No último vestibular Davi, Eduardo e Felipe foram aprovados em cursos diferentes. Os rapazes têm idades diferentes.Davi, 18 anos, não entrou em Medicina.Eduardo não entrou em Engenharia e tem 20 anos.Quem entrou em Direito tem 22 anos.O nome e a idade de quem entrou na Engenharia é

A) Eduardo com 20 anos.
B) Eduardo com 18 anos.
C) Felipe com 20 anos.
D) Davi com 22 anos.
E) Davi com 18 anos.

**Gabarito: E.** Passo 1. Idades: Davi tem 18 e Eduardo tem 20. Quem entrou em Direito tem 22 anos, então não é Davi nem Eduardo: é Felipe, com 22 anos.

Passo 2. Sobram Medicina e Engenharia para Davi e Eduardo. Davi não entrou em Medicina, então entrou em Engenharia.

Passo 3. Eduardo ficou com Medicina, o que combina com "Eduardo não entrou em Engenharia".

Conclusão. Davi, 18 anos, entrou em Engenharia, alternativa E.

## Questão 21 (Operações e expressões) - FCC, TRT-22 (PI) 2022, questão 18

Considere dois números distintos, tais que a soma desses dois números é igual ao dobro do produto desses dois números e que um dos números é o dobro do outro. O valor do maior número é

A) 1/2.
B) 1/4.
C) 3/2.
D) 5/2.
E) 2/4.

**Gabarito: C.** Passo 1. Chame os números de x e 2x (um é o dobro do outro). Eles são distintos, então x ≠ 0.

Passo 2. A soma é x + 2x = 3x. O produto é x · 2x = 2x², e o dobro do produto é 4x².

Passo 3. Monte a equação: 3x = 4x². Como x ≠ 0, divida por x: 3 = 4x, logo x = 3/4.

Passo 4. O maior número é 2x = 2 · 3/4 = 3/2. Confira: soma 3/4 + 3/2 = 9/4; produto 3/4 · 3/2 = 9/8, e o dobro é 9/4.

Conclusão. alternativa C. A alternativa E (2/4) é igual a 1/2, que é só uma isca; a solução x = 0 foi descartada por serem números distintos.

## Questão 22 (Frações, razão e proporção) - FCC, TRT-22 (PI) 2022, questão 19

Alberto tem 25 anos, Breno 40 anos e Carlos 35 anos. Os três trabalham como garçons em um restaurante e decidiram dividir entre eles o valor total das gorjetas. Alberto, que trabalha no restaurante há apenas 5 meses, propôs dividir o total das gorjetas proporcionalmente à idade de cada um, mas Carlos, que trabalha há 1 ano e 3 meses, discorda e propõe que a divisão seja proporcional ao tempo de serviço de cada um no restaurante. Breno, com 1 ano e 8 meses no restaurante foi convidado a desempatar e decidiu que o valor total fosse dividido proporcionalmente ao tempo de serviço. Com um valor total de gorjetas de R$ 1.200,00 e considerando as duas propostas, Alberto deixou de ganhar, em reais,

A) 100,00.
B) 250,00.
C) 30,00.
D) 150,00.
E) 300,00.

**Gabarito: D.** Passo 1. Proposta pela idade: 25 + 40 + 35 = 100 anos no total. Alberto receberia 25/100 de 1.200 = 300,00.

Passo 2. Proposta pelo tempo de serviço, em meses: Alberto 5, Carlos 1 ano e 3 meses = 15, Breno 1 ano e 8 meses = 20. Total 5 + 15 + 20 = 40 meses.

Passo 3. Alberto fica com 5/40 = 1/8 de 1.200 = 150,00 (a proposta escolhida).

Passo 4. A diferença é o que ele "deixou de ganhar": 300,00 − 150,00 = 150,00.

Conclusão. alternativa D. Divisão proporcional: some as partes, divida o total pela soma e multiplique pela parte de cada um.

## Questão 23 (Conjuntos) - FCC, TRT-22 (PI) 2022, questão 20

Em uma festa com 80 pessoas serão servidos dois pratos quentes, massa ou carne. Todos os convidados gostam de ao menos um dos pratos. Dos 80 convidados, 45 gostam de massa e 52 gostam de carne. O número de convidados que gostam dos dois pratos é

A) 15.
B) 17.
C) 16.
D) 14.
E) 22.

**Gabarito: B.** Passo 1. Todos gostam de pelo menos um prato, então a união dos dois grupos é o total: n(M ∪ C) = 80.

Passo 2. Fórmula: n(M ∪ C) = n(M) + n(C) − n(M ∩ C), então 80 = 45 + 52 − n(M ∩ C).

Passo 3. n(M ∩ C) = 97 − 80 = 17.

Conclusão. alternativa B. Quando a soma das partes passa do total, o excesso é a interseção.

## Questão 24 (Sequências e relações lógicas) - FCC, TRT-23 (MT) 2022, questão 11

André, Breno e Pedro são corretores de imóveis na cidade de São Paulo. Todos os três nasceram em estados diferentes, um deles nasceu em Alagoas, outro na Paraíba e o terceiro na Bahia. Cada um deles viaja nas férias para exatamente um desses três Estados, mas somente André passa as férias no Estado em que nasceu. Breno não nasceu na Bahia e nem passa suas férias na Bahia. Pedro passa suas férias em Alagoas. Podemos afirmar corretamente que

A) André nasceu na Paraíba e Pedro passa férias em Alagoas.
B) Breno nasceu em Alagoas e André nasceu na Paraíba.
C) Pedro nasceu na Bahia e passa férias em Alagoas.
D) Breno nasceu em Alagoas e André passa férias na Bahia.
E) André nasceu na Paraíba e Pedro passa férias em Alagoas.

**Gabarito: D.** Passo 1. Leitura do enunciado: os três corretores viajam para os três estados, um para cada, sem repetir destino (é o que torna o problema determinado; se dois pudessem ir ao mesmo estado, nenhuma alternativa seria necessariamente verdadeira).

Passo 2. Férias: Pedro vai a Alagoas. Breno não vai à Bahia e Alagoas já é de Pedro, então Breno vai à Paraíba. Sobra a Bahia para André.

Passo 3. André é o único que passa as férias no estado em que nasceu, então André nasceu na Bahia.

Passo 4. Nascimento dos outros dois: Breno não nasceu na Bahia (que é de André) e não nasceu na Paraíba (onde passa férias, e só André passa férias onde nasceu). Logo Breno nasceu em Alagoas. Pedro nasceu na Paraíba, o que sobra.

Passo 5. Resultado: André nasceu na Bahia e passa férias na Bahia; Breno nasceu em Alagoas e passa férias na Paraíba; Pedro nasceu na Paraíba e passa férias em Alagoas. A alternativa D ("Breno nasceu em Alagoas e André passa férias na Bahia") é verdadeira; B e C e as duas que dizem "André nasceu na Paraíba" são falsas.

Conclusão. alternativa D. O Laboratório L8 enumera todas as combinações e confirma a solução única nessa leitura.

Observação: No caderno oficial, as alternativas A e E têm o mesmo texto ("André nasceu na Paraíba e Pedro passa férias em Alagoas"). O enunciado também não diz expressamente que os destinos são diferentes; a solução oficial pressupõe isso.

## Questão 25 (Porcentagem) - FCC, TRT-23 (MT) 2022, questão 12

Carlos tem uma caixa com bolinhas de gude. O primo de Carlos perdeu quatro bolinhas de gude que estavam na caixa. Carlos verificou que o total de bolinhas da caixa se reduziu a 90% do que ele tinha na caixa. Nessas condições, é correto afirmar que o número de bolinhas na caixa antes da perda era

A) 40
B) 60
C) 80
D) 32
E) 44

**Gabarito: A.** Passo 1. O total ficou em 90% do que era, então a perda de 4 bolinhas corresponde a 100% − 90% = 10% do total original.

Passo 2. Se 10% do total são 4 bolinhas, o total (100%) é 4 ÷ 0,10 = 40.

Passo 3. Confira: 90% de 40 = 36 = 40 − 4.

Conclusão. alternativa A. Em porcentagem, descubra qual parte do todo a quantidade conhecida representa e use a regra de três.

## Questão 26 (Médias) - FCC, TRT-23 (MT) 2022, questão 13

Para que um time de basquete, com 5 jogadores, possa se inscrever em um torneio juvenil, a idade média dos jogadores, no momento da inscrição, deve ser estritamente menor do que 15 anos. Quatro amigos com idades 13, 14, 14 e 16 anos querem se inscrever nesse torneio e precisam de mais um jogador. A idade máxima do jogador que vai completar o time é

A) 17
B) 18
C) 16
D) 19
E) 15

**Gabarito: A.** Passo 1. Média menor que 15 com 5 jogadores significa soma menor que 5 × 15 = 75.

Passo 2. Os quatro amigos somam 13 + 14 + 14 + 16 = 57. Seja x a idade do quinto: 57 + x Passo 3. As idades são números inteiros, e x tem de ser estritamente menor que 18. A maior é 17.

Conclusão. alternativa A. A palavra "estritamente" exclui 18; com 18 a média seria exatamente 15.

## Questão 27 (Conjuntos) - FCC, TRT-23 (MT) 2022, questão 14

Em uma pesquisa com 30 indústrias farmacêuticas sobre os tipos de insumos utilizados na produção de um determinado remédio, verificou-se que elas usam no máximo 2 tipos de insumos. Dentre as 30 indústrias pesquisadas, 16 usam insumo tipo A, 9 usam insumo tipo B e 8 usam insumo tipo C. O número de indústrias que usam exatamente dois tipos de insumos é

A) 3
B) 6
C) 4
D) 5
E) 2

**Gabarito: A.** Passo 1. Some o que cada insumo registra: 16 + 9 + 8 = 33 usos. Cada indústria foi contada uma vez por insumo que usa.

Passo 2. Como cada uma usa no máximo 2 tipos (e, pelo problema, pelo menos 1), há indústrias com 1 tipo (contadas uma vez) e com 2 tipos (contadas duas vezes). Sejam u e d os números dessas indústrias: u + d = 30 e u + 2d = 33.

Passo 3. Subtraindo: d = 3. Há 3 indústrias com exatamente dois tipos e 27 com um só.

Conclusão. alternativa A. Hipótese implícita: todas usam ao menos um insumo; sem ela, a resposta não seria única.

## Questão 28 (Sequências e relações lógicas) - FCC, TRT-23 (MT) 2022, questão 15

Em um teatro, cada fileira tem o mesmo número de assentos. José observou que havia 5 pessoas sentadas à sua frente 4 pessoas sentadas atrás dele, e essas 9 pessoas estavam sentadas em fileiras diferentes. José também observou que havia 3 pessoas sentadas à sua direita e 2 pessoas sentadas à sua esquerda. O número mínimo de assentos que esse teatro tem é

A) 100
B) 45
C) 60
D) 50
E) 65

**Gabarito: C.** Passo 1. Fileiras: as 5 pessoas à frente e as 4 atrás estão em fileiras diferentes entre si e da de José. Então há pelo menos 5 + 4 + 1 = 10 fileiras.

Passo 2. Assentos por fileira: na fileira de José há ele, 3 à direita e 2 à esquerda, ou seja, no mínimo 3 + 1 + 2 = 6 assentos por fileira.

Passo 3. Mínimo de assentos do teatro: 10 fileiras × 6 assentos = 60.

Conclusão. alternativa C. Em "número mínimo", use os menores valores compatíveis com cada informação.

## Questão 29 (Dedução e argumentos) - FCC, TRT-4 (RS) 2022, questão 16

Toda vez que viaja ao interior, Luciano não vai à feira. Quando está em férias e não é dia útil, Luciano viaja ao interior. Se hoje Luciano foi à feira, então, necessariamente,

A) é dia útil.
B) Luciano está em férias.
C) Luciano não está em férias.
D) não é dia útil.
E) Luciano não viajou ao interior.

**Gabarito: E.** Passo 1. Escreva as premissas como condicionais. (1) Viaja ao interior → não vai à feira. (2) Férias e não é dia útil → viaja ao interior.

Passo 2. O fato: hoje Luciano foi à feira, isto é, a conclusão de (1) é falsa. Pela contrapositiva de (1), ir à feira → não viajar ao interior. Logo Luciano não viajou ao interior.

Passo 3. Isso nega a conclusão de (2): como ele não viajou, a premissa de (2) é falsa, ou seja, não vale "férias e não é dia útil". Isso só diz que (não está de férias) ou (é dia útil); não permite afirmar cada um deles separadamente.

Conclusão. alternativa E. As alternativas A a D escolhem um dos lados do "ou" sem poder: são as iscas.

## Questão 30 (Frações, razão e proporção) - FCC, TRT-4 (RS) 2022, questão 17

Um terreno foi dividido entre quatro irmãos, Ana, Bento, Carla e Daniel. Ana ficou com metade do terreno; Bento ficou com um terço do terreno; Carla ficou com um sétimo do terreno e Daniel ficou com 500 m². A área total do terreno, antes da divisão, era de:

A) 21.000 m²
B) 20.000 m²
C) 25.000 m²
D) 18.000 m²
E) 15.000 m²

**Gabarito: A.** Passo 1. Some as frações dos três primeiros: 1/2 + 1/3 + 1/7. O denominador comum é 42: 21/42 + 14/42 + 6/42 = 41/42.

Passo 2. Daniel ficou com o que sobra: 1 − 41/42 = 1/42 do terreno, e isso vale 500 m².

Passo 3. O terreno inteiro tem 42 vezes isso: 42 × 500 = 21.000 m².

Conclusão. alternativa A. A fração que falta é 1 menos a soma das outras.

## Questão 31 (Sequências e relações lógicas) - FCC, TRT-4 (RS) 2022, questão 18

Três amigos, Leonardo, Marcelo e Nelson, marcaram um almoço na casa de um deles. Os amigos combinaram de cada um trazer um prato salgado, dentre carne, torta e farofa, uma bebida, dentre suco, refrigerante e vinho, e uma sobremesa, dentre bolo, pudim e frutas. Não houve repetições entre o que os amigos trouxeram. Leonardo trouxe frutas. Quem trouxe suco trouxe, também, carne. Nelson trouxe farofa e não trouxe pudim. Marcelo não trouxe carne. A partir dessas informações, conclui-se, necessariamente, que

A) Nelson trouxe vinho e bolo.
B) Marcelo trouxe torta e refrigerante.
C) Leonardo trouxe carne e suco.
D) quem trouxe torta trouxe, também, vinho.
E) quem trouxe bolo trouxe, também, refrigerante.

**Gabarito: C.** Passo 1. Pratos salgados: Nelson trouxe farofa e Marcelo não trouxe carne. Então a carne é de Leonardo e a torta de Marcelo.

Passo 2. Sobremesas: Leonardo trouxe frutas. Nelson não trouxe pudim, então trouxe bolo e Marcelo trouxe pudim.

Passo 3. Bebidas: quem trouxe suco trouxe carne, e a carne é de Leonardo, então o suco é de Leonardo (os três tipos de bebida foram trazidos, então alguém trouxe suco). Marcelo e Nelson dividem refrigerante e vinho, sem que o enunciado diga quem trouxe qual.

Passo 4. Avalie as alternativas: A e B dependem da bebida de Nelson e Marcelo, que não se sabe. D e E também (torta é de Marcelo, bolo de Nelson, cada um com refrigerante ou vinho). Só C, Leonardo com carne e suco, vale nas duas distribuições possíveis.

Conclusão. alternativa C. "Necessariamente" quer dizer que vale em todas as soluções: aqui existem duas (refrigerante e vinho trocados entre Marcelo e Nelson).

## Questão 32 (Múltiplos e divisores) - FCC, TRT-4 (RS) 2022, questão 19

Em um auditório, sabe-se que há entre 300 e 400 cadeiras e que elas podem ser arrumadas tanto em 24 fileiras com o mesmo número de cadeiras em cada uma delas, como em 30 fileiras, também com o mesmo número de cadeiras em cada uma. A soma dos algarismos do número total de cadeiras no auditório é igual a:

A) 6
B) 8
C) 7
D) 9
E) 10

**Gabarito: D.** Passo 1. O total de cadeiras é divisível por 24 e por 30, ou seja, é múltiplo comum dos dois.

Passo 2. Calcule o MMC: 24 = 2³ · 3 e 30 = 2 · 3 · 5, então MMC = 2³ · 3 · 5 = 120.

Passo 3. Os múltiplos comuns são os múltiplos de 120: 120, 240, 360, 480, ... O único entre 300 e 400 é 360.

Passo 4. Soma dos algarismos: 3 + 6 + 0 = 9.

Conclusão. alternativa D.

## Questão 33 (Regra de três) - FCC, TRT-4 (RS) 2022, questão 20

Uma gráfica tem 3 impressoras que trabalham em velocidades diferentes. Essa gráfica recebeu uma encomenda de impressão de 162 apostilas iguais. Sabe-se que a impressora 1 imprime 5 apostilas por minuto, a impressora 2 imprime 4 apostilas por minuto e a impressora 3 imprime 9 apostilas por minuto. Para que as impressoras comecem e terminem o trabalho ao mesmo tempo, a divisão da tarefa de impressão das 162 apostilas entre as três impressoras deve ser feita de modo que a impressora 2 imprima

A) 18 apostilas.
B) 36 apostilas.
C) 45 apostilas.
D) 24 apostilas.
E) 54 apostilas.

**Gabarito: B.** Passo 1. Se todas começam e terminam juntas, trabalham o mesmo tempo, e cada uma imprime em proporção direta à sua velocidade: 5, 4 e 9 por minuto.

Passo 2. Juntas, imprimem 5 + 4 + 9 = 18 apostilas por minuto. O tempo para 162 é 162 ÷ 18 = 9 minutos.

Passo 3. A impressora 2 imprime 4 por minuto durante 9 minutos: 4 × 9 = 36 apostilas.

Conclusão. alternativa B. Confira: 5 × 9 = 45, 4 × 9 = 36 e 9 × 9 = 81; a soma é 162. É uma divisão proporcional a 5, 4 e 9.

## Questão 34 (Porcentagem) - FCC, TRT-2 (SP) 2018, questão 11

O salário de Arthur equivale a 3/7 do salário de Bárbara. Para que o salário de ambos fosse igual, o salário de Arthur teria que aumentar em 130% e, depois disso, ainda ser acrescido de R$ 60,00. Nas condições descritas, a soma dos atuais salários de Arthur e Bárbara, em reais, é igual a

A) 6.000,00
B) 5.400,00
C) 6.200,00
D) 6.400,00
E) 5.900,00

**Gabarito: A.** Passo 1. Chame o salário de Bárbara de B. O de Arthur é (3/7)B.

Passo 2. Aumentar 130% é multiplicar por 1 + 1,30 = 2,3. Depois soma-se 60 e o resultado iguala o salário de Bárbara: 2,3 · (3/7)B + 60 = B.

Passo 3. Calcule 2,3 · 3/7 = 6,9/7. Então (6,9/7)B + 60 = B e 60 = B − (6,9/7)B = (0,1/7)B.

Passo 4. Logo B = 60 · 7 ÷ 0,1 = 4.200. Arthur: (3/7) · 4.200 = 1.800.

Passo 5. Soma dos atuais salários: 4.200 + 1.800 = 6.000.

Conclusão. alternativa A. Confira: 1.800 × 2,3 = 4.140 e 4.140 + 60 = 4.200.

## Questão 35 (Porcentagem) - FCC, TRT-2 (SP) 2018, questão 12

Do total de funcionários(as) de um tribunal, 20% têm menos de 40 anos de idade, e 70% são homens. Sabe-se ainda que 20% das mulheres que trabalham nesse tribunal têm menos de 40 anos de idade. A porcentagem do total de funcionários(as) desse tribunal que são homens e com 40 anos ou mais de idade é igual a

A) 52%
B) 48%
C) 56%
D) 54%
E) 45%

**Gabarito: C.** Passo 1. Tome o total como 100. Homens: 70. Mulheres: 100 − 70 = 30.

Passo 2. Mulheres com menos de 40 anos: 20% de 30 = 6.

Passo 3. Pessoas com menos de 40 anos no total: 20% de 100 = 20. Então homens com menos de 40 são 20 − 6 = 14.

Passo 4. Homens com 40 anos ou mais: 70 − 14 = 56, ou seja, 56% do total.

Conclusão. alternativa C. Em porcentagem de duas características, monte a tabela 2 × 2 com o total igual a 100.

## Questão 36 (Regra de três) - FCC, TRT-2 (SP) 2018, questão 13

Quinze fiscais iam vistoriar todos os estabelecimentos comerciais da zona sul da cidade em 25 dias, trabalhando 8 horas por dia cada um e todos com mesma produtividade. Depois de 5 dias completos desse serviço, a superintendência regional solicitou, em regime de urgência e com pagamento de hora extra, que os 15 funcionários passassem a trabalhar 10 horas por dia para finalizar a vistoria em menos dias do que os 25. Considerando que a solicitação foi atendida e que os funcionários continuaram o trabalho com mesma produtividade, a vistoria completa dos estabelecimentos comerciais da zona sul ocorreu em um total de

A) 20 dias.
B) 17 dias.
C) 19 dias.
D) 21 dias.
E) 18 dias.

**Gabarito: D.** Passo 1. Meça o serviço em pessoa-horas: 15 fiscais × 25 dias × 8 h/dia = 3.000 pessoa-horas.

Passo 2. Em 5 dias foram feitas 15 × 5 × 8 = 600 pessoa-horas. Faltam 3.000 − 600 = 2.400.

Passo 3. Com 15 fiscais a 10 h/dia, o grupo faz 15 × 10 = 150 pessoa-horas por dia. Dias restantes: 2.400 ÷ 150 = 16.

Passo 4. Total de dias: 5 + 16 = 21.

Conclusão. alternativa D. A pergunta é pelo total (5 dias já feitos mais 16), não pelos dias restantes.

## Questão 37 (Sequências e relações lógicas) - FCC, TRT-1 (RJ) 2014, questão 21

A sequência (2; 5; 4; 7; 6; 9; 8; 11; 10; 13; 12; . . . ) é ilimitada e segue sempre o mesmo padrão. Dessa maneira é possível determinar que o 112º elemento dessa sequência é o número

A) 121.
B) 151.
C) 115.
D) 125.
E) 117.

**Gabarito: C.** Passo 1. Separe as posições ímpares e pares. Ímpares (1ª, 3ª, 5ª, ...): 2, 4, 6, 8, 10, 12, ... (soma 2). Pares (2ª, 4ª, 6ª, ...): 5, 7, 9, 11, 13, ... (soma 2).

Passo 2. A 112ª posição é par: é a 56ª da subsequência dos pares (112 ÷ 2 = 56).

Passo 3. Na subsequência dos pares, o k-ésimo termo é 5 + 2(k − 1) = 2k + 3. Para k = 56: 2 · 56 + 3 = 115.

Conclusão. alternativa C. Teste a fórmula no começo: k = 1 dá 5 (2ª posição) e k = 2 dá 7 (4ª posição).

## Questão 38 (Múltiplos e divisores) - FCC, TRT-1 (RJ) 2014, questão 22

No universo dos números naturais, os números 16; 61; 31; 46 possuem uma característica comum que é apresentar o mesmo resto da divisão, no caso o número 1, quando são divididos por 5. O número 31 dividido por 5 apresenta o quociente 6 e resto da divisão igual a 1, por exemplo. Considere essa mesma ideia e um divisor maior que 5 e menor do que 10. Dentre os cinco números que seguem, apenas um não possui essa característica comum que os outros quatro números possuem, em relação a um mesmo divisor.

30    37    65    45    79

O número que não apresenta essa característica comum é

A) 37.
B) 65.
C) 30.
D) 45.
E) 79.

**Gabarito: D.** Passo 1. Procure um divisor d entre 6 e 9 para o qual quatro dos números deixam o mesmo resto. Quando dois números têm o mesmo resto em d, a diferença entre eles é múltipla de d.

Passo 2. Diferenças entre os números: 37 − 30 = 7, 65 − 37 = 28, 79 − 65 = 14. Todas são múltiplas de 7. Teste d = 7.

Passo 3. Restos por 7: 30 → 2; 37 → 2; 65 → 2; 79 → 2; 45 → 3.

Passo 4. O que destoa é o 45. Os outros divisores (6, 8 e 9) não dão restos iguais para quatro números.

Conclusão. alternativa D. Resto igual significa diferença múltipla do divisor: procure o divisor nas diferenças.

## Questão 39 (Sequências e relações lógicas) - FCC, TRT-1 (RJ) 2014, questão 23

Cinco pessoas formam uma fila ordenada. A é a 1ª da fila, B a 2ª, C a 3ª, D a 4ª e E a 5ª. A primeira pessoa da fila, no caso A, recua uma posição e a nova configuração da fila passa a ser: B; A; C; D; E. Há uma segunda mudança. A atual primeira pessoa da fila recua duas posições e uma nova configuração se forma. Uma terceira mudança com a atual primeira pessoa da fila recuando três posições e uma nova configuração aparece. Uma quarta e última mudança se dá com a atual primeira pessoa da fila recuando quatro posições e formando a última configuração da fila. Nesta última configuração, a pessoa que ocupa a 2ª posição na fila, é a pessoa

A) A.
B) D.
C) C.
D) B.
E) E.

**Gabarito: B.** Passo 1. Configuração inicial: A, B, C, D, E. Primeira mudança (A recua 1): B, A, C, D, E.

Passo 2. Segunda mudança: a primeira é B, que recua 2 posições: A, C, B, D, E.

Passo 3. Terceira mudança: a primeira é A, que recua 3: C, B, D, A, E.

Passo 4. Quarta mudança: a primeira é C, que recua 4 e vai para o fim: B, D, A, E, C.

Passo 5. A 2ª posição da última fila é D.

Conclusão. alternativa B. Escreva cada fila por extenso; fazer de cabeça é onde se erra.

## Questão 40 (Sequências e relações lógicas) - FCC, TRT-1 (RJ) 2014, questão 24

Alberto é mais velho do que Beatriz e mais novo do que Débora. Beatriz não tem 30 anos, mas tem mais do que 20 anos. Cleuza não é mais nova do que Alberto, mas é mais nova do que Débora. Débora tem menos de 40 anos e mais do que 30 anos. Com essas informações é possível concluir que

A) a soma das idades dessas quatro pessoas é menor do que 80 anos.
B) Cleuza e Débora possuem um ano de diferença em suas idades.
C) Débora tem 25 anos e Alberto 35 anos.
D) a soma das idades dessas quatro pessoas não ultrapassa 150 anos.
E) a soma das idades de Cleuza e Débora é 50 anos a mais que a soma das idades de Alberto e Beatriz.

**Gabarito: D.** Passo 1. Ordem das idades: Beatriz Passo 2. Soma mínima: Beatriz 21, Alberto 22, Cleuza 23, Débora 31, total 97. Então "menor do que 80" (A) é falsa.

Passo 3. Soma máxima, com idades inteiras e todas diferentes: Débora 39, Cleuza 38, Alberto 37, Beatriz 36, total 150. Então a soma não ultrapassa 150 e (D) vale.

Passo 4. Teste as demais: (B) a diferença de 1 ano não é obrigatória (Cleuza pode ter 33 e Débora 39). (C) Débora tem mais de 30, não 25. (E) Cleuza + Débora somam no máximo 77 e Alberto + Beatriz no mínimo 43: a diferença é no máximo 34, nunca 50.

Conclusão. alternativa D. Em "é possível concluir", só vale o que acontece em todos os casos.

Observação: O enunciado não diz que as idades são diferentes. Se Alberto e Cleuza pudessem ter a mesma idade, o teto subiria para 152 e nenhuma alternativa seria certa; o gabarito D pressupõe idades diferentes. O Laboratório L9 testa as duas leituras.

## Questão 41 (Dedução e argumentos) - FCC, TRT-1 (RJ) 2014, questão 25

Considere as seguintes afirmações como verdadeiras:Carlos só jantaria com Júlia se tomasse o ônibus das 19 horas.Júlia só jantaria com Carlos se ele a convidasse.Carlos só conseguiria tomar o ônibus das 19 horas se o seu chefe o liberasse mais cedo do serviço.Carlos tomou o ônibus das 19 horas.A partir dessas informações é possível concluir que

A) Carlos jantou com Júlia.
B) O chefe de Carlos o liberou mais cedo do serviço.
C) Júlia aceitou o convite de Carlos.
D) Carlos não jantou com Júlia.
E) Carlos não convidou Júlia para o jantar.

**Gabarito: B.** Passo 1. Traduza "X só se Y" como "X → Y" (o "só se" aponta a condição necessária). (1) Jantar → ônibus das 19 h. (2) Jantar → convite. (3) Ônibus das 19 h → chefe liberou.

Passo 2. O fato: Carlos tomou o ônibus das 19 h. Em (3), o antecedente é verdadeiro, então o consequente também: o chefe o liberou mais cedo.

Passo 3. Em (1) e (2), saber que ele tomou o ônibus não obriga o jantar (afirmar o consequente não prova o antecedente). Por isso A, D, C e E não decorrem.

Conclusão. alternativa B. Cuidado com a falácia: "só jantaria se tomasse o ônibus" não diz que, tomando o ônibus, ele jantou.

## Questão 42 (Quantificadores e verdades e mentiras) - FCC, TRT-1 (RJ) 2014, questão 26

Dos oito técnicos que trabalham em um departamento de uma repartição, menos do que a metade deles, mas não apenas um, exercem a coordenação dos trabalhos. Dentre os coordenadores, não todos e nem apenas um, há os que exercem a chefia de trabalhos especiais. O total de pessoas em uma reunião, na qual estiveram presentes apenas os chefes de trabalhos especiais e os técnicos que não exerciam coordenação, é igual a

A) 6.
B) 8.
C) 5.
D) 4.
E) 7.

**Gabarito: E.** Passo 1. Coordenadores: menos da metade de 8 (então no máximo 3) e não apenas um (então pelo menos 2). Pode ser 2 ou 3.

Passo 2. Chefes de trabalhos especiais, dentre os coordenadores: não todos e não apenas um. Com 2 coordenadores, o número de chefes teria de ser maior que 1 e menor que 2: impossível. Logo há 3 coordenadores e 2 chefes.

Passo 3. Técnicos que não coordenam: 8 − 3 = 5.

Passo 4. Presentes na reunião: os 2 chefes especiais e os 5 que não coordenam, 2 + 5 = 7.

Conclusão. alternativa E. "Não todos e nem apenas um" tira os extremos: com 3 elementos sobra só 2.

## Questão 43 (Quantificadores e verdades e mentiras) - FCC, TRT-1 (RJ) 2014, questão 27

No enquadramento de determinados elementos verificou-se que todos se enquadram na categoria J; nem todos, mas alguns se enquadram na categoria K; nem todos, mas alguns se enquadram na categoria L; nem todos, mas alguns se enquadram na categoria M, estes porém, não se enquadram, em hipótese alguma, na categoria L. Sendo assim, um elemento que se enquadra na categoria K

A) não está enquadrado na categoria M, mas está enquadrado na categoria J.
B) pode estar enquadrado na categoria M e também estar enquadrado na categoria L.
C) pode estar enquadrado na categoria L, mas não na categoria M.
D) pode não estar enquadrado na categoria J.
E) está enquadrado na categoria L.

**Gabarito: C.** Passo 1. Traduza: todo elemento é J. Existem K, existem L e existem M. M e L não se encontram (nenhum M é L).

Passo 2. Teste (D): todo elemento é J, então um elemento de K não "pode não ser J". Falsa.

Passo 3. Teste (B): um elemento que fosse M e L ao mesmo tempo contraria "M não se enquadra em L". Falsa.

Passo 4. Teste (A) e (E): ser K não obriga a ser M nem a ser L. Um K pode ser M (e então não é L), então (A) "não está em M" não é obrigatória; e (E) "está em L" também não é obrigatória.

Passo 5. Teste (C): é possível um K ser L (e não ser M). A frase diz "pode", e o caso existe sem contrariar nada.

Conclusão. alternativa C. Com "pode" a alternativa só precisa de um caso possível; com "está" ou "não está" precisa valer sempre.

## Questão 44 (Regra de três) - FCC, TRT-1 (RJ) 2014, questão 28

Um relógio adianta 40 segundos a cada 4 horas. Outro relógio atrasa 15 segundos a cada 3 horas. Às 13 horas de um dia, os dois relógios foram acertados e marcavam exatamente 13 horas. O tempo decorrido para que os relógios apresentassem uma diferença de marcação de um minuto e meio foi de

A) 6 horas.
B) 4 horas e meia.
C) 5 horas.
D) 5 horas e meia.
E) 6 horas e meia.

**Gabarito: A.** Passo 1. Taxa do primeiro: adianta 40 s em 4 h, isto é, 10 s por hora. Taxa do segundo: atrasa 15 s em 3 h, isto é, 5 s por hora.

Passo 2. Um adianta e o outro atrasa, então a diferença cresce 10 + 5 = 15 s por hora.

Passo 3. Diferença pedida: 1 min 30 s = 90 s. Tempo: 90 ÷ 15 = 6 horas.

Conclusão. alternativa A. Se os dois adiantassem, subtrairia as taxas; como um adianta e outro atrasa, soma.

## Questão 45 (Dedução e argumentos) - FCC, TRT-1 (RJ) 2014, questão 29

Considere verdadeiras as afirmações:Se Manuel é engenheiro, então Edileuza não é médica.Ou João é analista, ou Ricardo é advogado.Se Ricardo não é advogado, então Edileuza é médica.João é analista.A partir da veracidade das afirmações, conclui-se corretamente que

A) Manuel é engenheiro ou Ricardo é advogado.
B) Manuel não é engenheiro e Edileuza não é médica.
C) Edileuza não é médica e João é analista.
D) João é analista e Manuel é engenheiro.
E) Manuel não é engenheiro e Ricardo não é advogado.

**Gabarito: E.** Passo 1. Comece pelo fato (IV): João é analista.

Passo 2. A afirmação (II) é um "ou ... ou" exclusivo: ou João é analista, ou Ricardo é advogado, mas não os dois. Como João é analista, Ricardo não é advogado.

Passo 3. Em (III), o antecedente "Ricardo não é advogado" é verdadeiro, então Edileuza é médica.

Passo 4. Em (I), a contrapositiva é: se Edileuza é médica, então Manuel não é engenheiro. Logo Manuel não é engenheiro.

Passo 5. Resumo: João analista, Ricardo não advogado, Edileuza médica, Manuel não engenheiro. A única alternativa que repete isso é "Manuel não é engenheiro e Ricardo não é advogado".

Conclusão. alternativa E.

## Questão 46 (Dedução e argumentos) - FCC, TRT-1 (RJ) 2014, questão 30

Considere as afirmações:Ou caí, ou escorreguei.Escorreguei ou tropecei.Caí ou deitei.Tropecei ou deitei.Se escorreguei, então não deitei.Das afirmações, sabe-se que a afirmação (III) é falsa e as outras verdadeiras. Deste modo, conclui-se corretamente que

A) Tropecei e escorreguei.
B) Escorreguei e caí.
C) Tropecei e deitei.
D) Não escorreguei e tropecei.
E) Caí e deitei.

**Gabarito: A.** Passo 1. (III) "Caí ou deitei" é falsa. Um "ou" só é falso quando as duas partes são falsas: não caí e não deitei.

Passo 2. (I) "Ou caí, ou escorreguei" é verdadeira e eu não caí, então escorreguei.

Passo 3. (IV) "Tropecei ou deitei" é verdadeira e não deitei, então tropecei.

Passo 4. Confira (II) e (V): "escorreguei ou tropecei" é verdadeira; e "se escorreguei, então não deitei" também (não deitei).

Conclusão. alternativa A: tropecei e escorreguei.

## Questão 47 (Contagem) - FCC, TRT-2 (SP) 2014, questão 16

Uma escola de Ensino Fundamental estabelece um limite máximo para o número de alunos em cada classe. Quando o número de alunos matriculados em determinado ano é maior do que esse limite, são abertas duas ou mais classes desse ano. A tabela a seguir mostra esse limite para cada ano do Ensino Fundamental.AnoNúmero máximo de alunos por classe1º202º e 3º254º e 5º306º a 9º35Em 2014, há 100 alunos matriculados em cada um dos nove anos do Ensino Fundamental nessa escola. Assim, para que o limite máximo de alunos por classe seja respeitado em todos os anos, a escola deverá abrir, no mínimo, um total de

A) 31 classes.
B) 32 classes.
C) 33 classes.
D) 34 classes.
E) 35 classes.

**Gabarito: C.** Passo 1. Em cada ano, o número mínimo de classes é 100 ÷ limite, arredondado para cima (não existe meia classe).

Passo 2. 1º ano: 100 ÷ 20 = 5 classes. 2º e 3º anos: 100 ÷ 25 = 4 classes cada, 8 no total.

Passo 3. 4º e 5º anos: 100 ÷ 30 = 3,33, arredonda para 4 cada, 8 no total. 6º ao 9º: 100 ÷ 35 = 2,86, arredonda para 3 cada, 12 no total.

Passo 4. Soma: 5 + 8 + 8 + 12 = 33.

Conclusão. alternativa C. Arredonde cada ano separadamente, e só depois some; somar os alunos e dividir daria outro resultado.

## Questão 48 (Contagem) - FCC, TRT-2 (SP) 2014, questão 17

Uma cidade pode ser representada por um quadrado maior subdividido em 100 quadradinhos idênticos, formando um quadriculado 10 × 10. Os lados dos quadradinhos correspondem às ruas da cidade e cada quadradinho é um quarteirão. Andando somente pelas ruas dessa cidade, uma pessoa pretende sair de um dos cantos (vértices) do quadrado maior e chegar ao canto diagonalmente oposto, passando pelo centro do quadrado maior. Se o lado de cada quadradinho mede 200 metros, então essa pessoa percorrerá uma distância de, no mínimo,

A) 1.400 metros.
B) 2.000 metros.
C) 2.800 metros.
D) 4.000 metros.
E) 8.000 metros.

**Gabarito: D.** Passo 1. Do canto ao centro de um quadrado 10 × 10, andando pelas ruas, é preciso avançar 5 quarteirões na horizontal e 5 na vertical: 10 lados de quadradinho, qualquer que seja a ordem.

Passo 2. Do centro ao canto oposto, mais 5 + 5 = 10 lados.

Passo 3. Total mínimo: 20 lados × 200 m = 4.000 m.

Conclusão. alternativa D. Em malhas quadriculadas, o caminho mais curto andando só pelas ruas não depende da ordem dos passos (distância de Manhattan).

## Questão 49 (Contagem) - FCC, TRT-2 (SP) 2014, questão 18

Maurício escreveu, em uma folha de papel, a sequência de todos os números ímpares, desde o 1 até o 349, como reproduzido parcialmente a seguir: (1, 3, 5, 7, 9, 11, ... , 347, 349). O total de algarismos que foram escritos por Maurício na folha de papel é igual a. Observação: o número 227, por exemplo, possui três algarismos: 2, 2 e 7.

A) 350.
B) 420.
C) 470.
D) 455.
E) 525.

**Gabarito: C.** Passo 1. Conte os ímpares por quantidade de algarismos. De 1 dígito: 1, 3, 5, 7, 9, são 5 números e 5 algarismos.

Passo 2. De 2 dígitos (11 a 99): ímpares de 11 a 99 são (99 − 11) ÷ 2 + 1 = 45 números, com 2 · 45 = 90 algarismos.

Passo 3. De 3 dígitos (101 a 349): (349 − 101) ÷ 2 + 1 = 125 números, com 3 · 125 = 375 algarismos.

Passo 4. Total: 5 + 90 + 375 = 470.

Conclusão. alternativa C. Confira a quantidade de ímpares: 5 + 45 + 125 = 175 (de 1 a 349 há 175 ímpares).

## Questão 50 (Sequências e relações lógicas) - FCC, TRT-2 (SP) 2014, questão 19

Uma senha é formada por uma sequência de quatro algarismos distintos, colocados em ordem crescente (o primeiro é menor do que o segundo, o segundo menor do que o terceiro, e assim sucessivamente). Sabe-se que a sequência 9401 tem um único algarismo em comum com essa senha, ocupando a mesma posição que ele ocupa na senha. Além disso, o primeiro algarismo da senha é maior do que 2 e o da terceira posição é maior do que 6. Assim, a soma dos quatro algarismos que compõem a senha é igual a

A) 22.
B) 24.
C) 20.
D) 23.
E) 21.

**Gabarito: A.** Passo 1. Qual algarismo de 9401 está na senha, na mesma posição? O 9 é impossível no primeiro lugar (nada é maior que 9 em ordem crescente). O 0 no terceiro lugar contraria "terceiro maior que 6". O 1 no quarto lugar contraria "primeiro maior que 2" (o quarto seria o maior). Sobra o 4, na segunda posição.

Passo 2. Com o 4 na segunda posição: o primeiro é maior que 2 e menor que 4, então vale 3. A senha é 3, 4, c, d, com c maior que 6 e d maior que c.

Passo 3. Os candidatos para c e d vêm de 7, 8 e 9. Como a senha tem só um algarismo em comum com 9401 (o 4), ela não pode conter o 9. Então c = 7 e d = 8.

Passo 4. A senha é 3478 e a soma é 3 + 4 + 7 + 8 = 22.

Conclusão. alternativa A.

## Questão 51 (Dedução e argumentos) - FCC, TRT-2 (SP) 2014, questão 20

Cinco irmãs, discutindo sobre a festa que aconteceria na cidade no final do mês, fizeram as afirmações abaixo.Se a Paula for à festa, então a Bruna também irá.Se a Renata não for à festa, então a Laura irá.Se a Flávia não for à festa, então a Bruna também não irá.Se a Laura for à festa, então a Paula também irá.Sabendo que as quatro afirmações são verdadeiras e que Paula não foi à festa, pode-se concluir que, necessariamente,

A) Bruna não foi à festa.
B) Flávia não foi à festa.
C) Flávia foi à festa.
D) Renata não foi à festa.
E) Renata foi à festa.

**Gabarito: E.** Passo 1. Fato: Paula não foi. Use a quarta afirmação (Laura vai → Paula vai) na forma contrapositiva: se Paula não vai, Laura não vai.

Passo 2. Laura não foi. Use a segunda afirmação (Renata não vai → Laura vai) na forma contrapositiva: se Laura não vai, Renata vai.

Passo 3. Renata foi. A primeira e a terceira afirmações têm antecedentes que o fato "Paula não foi" não alcança: não dá para concluir nada sobre Bruna e Flávia.

Conclusão. alternativa E. Contrapositiva: p → q é equivalente a ~q → ~p.
