# Módulo 7: Matemática e Raciocínio Lógico (resumo teórico)

Resumo teórico em português para estudo. Cobre o escopo do módulo 7 do edital do TCE-GO (Técnico de Controle Externo, TI): números inteiros e racionais, expressões, múltiplos e divisores, frações, razões e proporções, regra de três, porcentagem, e o raciocínio lógico (estrutura lógica de relações, dedução, proposições, argumentos, sequências, orientação espacial e temporal). Probabilidade e análise combinatória formal não constam do edital; a contagem entra aqui como raciocínio matemático, porque a FCC a cobra em problemas. As questões reais de treino são da FCC.

## 1. Números inteiros e racionais, operações e expressões

- Conjuntos numéricos: naturais (0, 1, 2, ...), inteiros (negativos, zero e positivos), racionais (que se escrevem como fração de inteiros, com denominador diferente de zero). Todo decimal exato e toda dízima periódica é racional. Raiz quadrada de 2 e o número pi não são racionais.
- Ordem das operações em uma expressão: primeiro o que está dentro de parênteses, depois colchetes, depois chaves, sempre de dentro para fora. Dentro de cada nível: potências e raízes, depois multiplicações e divisões na ordem em que aparecem (da esquerda para a direita), por fim somas e subtrações, também da esquerda para a direita.
- Armadilha comum: 8 ÷ 2 × 4 vale 16 e não 1, porque multiplicação e divisão têm a mesma prioridade e seguem da esquerda para a direita. Do mesmo modo, 10 − 4 + 2 vale 8 e não 4.
- Regra de sinais: na multiplicação e na divisão, sinais iguais dão resultado positivo e sinais diferentes dão negativo. Subtrair um número negativo equivale a somar o seu oposto: 5 − (−3) = 8.
- Potências: a^m · a^n = a^(m+n); a^m ÷ a^n = a^(m−n); (a^m)^n = a^(m·n); a^0 = 1 (para a diferente de zero); a^(−n) = 1 ÷ a^n. Cuidado: (−2)^2 = 4, mas −2^2 = −4, porque o expoente age só sobre o 2.
- Raízes: a raiz quadrada de um número positivo é positiva (raiz de 49 é 7). Raiz de a·b é raiz de a vezes raiz de b. A raiz quadrada de a^2 é o módulo de a.
- Dízimas periódicas e fração geratriz: uma dízima simples tem tantos noves no denominador quantos algarismos tem o período (0,333... = 3/9 = 1/3; 0,1212... = 12/99 = 4/33). Em uma dízima composta, o numerador é a parte até o fim do primeiro período menos a parte não periódica, e o denominador tem noves (período) seguidos de zeros (antiperíodo): 0,2333... = (23 − 2) ÷ 90 = 21/90 = 7/30.
- Decimais: ao somar ou subtrair, alinhe as vírgulas. Ao multiplicar, some as casas decimais dos fatores. Para dividir, multiplique dividendo e divisor por uma potência de 10 até eliminar as vírgulas.
- Estimativa e arredondamento: para eliminar alternativas, estime a ordem de grandeza antes de calcular. Se o enunciado pede arredondar, olhe apenas o primeiro algarismo descartado (5 ou mais sobe).
- Em problemas com expressões, converta tudo para a mesma forma (todas as frações ou todos os decimais) antes de operar, e confira o resultado simplificando.

## 2. Múltiplos e divisores de números naturais

- Múltiplos de n são os resultados de n vezes um natural. Divisores de n são os naturais que dividem n sem resto. O zero é múltiplo de todo número; o 1 é divisor de todo número.
- Critérios de divisibilidade: por 2, termina em algarismo par; por 3, a soma dos algarismos é múltipla de 3; por 4, os dois últimos algarismos formam múltiplo de 4; por 5, termina em 0 ou 5; por 6, é divisível por 2 e por 3; por 8, os três últimos algarismos formam múltiplo de 8; por 9, a soma dos algarismos é múltipla de 9; por 10, termina em 0; por 11, a diferença entre a soma dos algarismos de posições ímpares e a das posições pares é múltipla de 11 (inclusive zero).
- Número primo tem exatamente dois divisores (1 e ele mesmo). O 2 é o único primo par. O 1 não é primo nem composto. Primos até 30: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29.
- Fatoração em primos: todo composto se escreve de um único modo como produto de primos. 360 = 2^3 · 3^2 · 5.
- Quantidade de divisores: some 1 a cada expoente da fatoração e multiplique. 360 = 2^3 · 3^2 · 5 tem (3+1) · (2+1) · (1+1) = 24 divisores.
- MDC (máximo divisor comum): maior número que divide todos. Pela fatoração, tome os fatores comuns com o menor expoente. Pelo algoritmo de Euclides, divida o maior pelo menor e repita com o divisor e o resto até o resto ser zero.
- MMC (mínimo múltiplo comum): menor múltiplo comum positivo. Pela fatoração, tome todos os fatores, comuns e não comuns, com o maior expoente. Para dois números vale MMC × MDC = produto dos dois.
- Quando usar cada um: problemas de eventos que voltam a coincidir (sinais que piscam, ônibus que passam, rodas que giram) pedem MMC; problemas de dividir em partes iguais, o maior possível (ladrilhos, grupos, caixas), pedem MDC.
- Dois números são primos entre si quando o MDC é 1; então o MMC é o produto deles.
- Problemas com restos: se n deixa resto r ao dividir por a e por b, então n − r é múltiplo de MMC(a, b). Se falta sempre a mesma quantidade k para completar, então n + k é múltiplo do MMC.

## 3. Frações, razão e proporção

- Fração é a razão a/b, com b diferente de zero. Frações equivalentes representam o mesmo valor (multiplicando ou dividindo numerador e denominador pelo mesmo número). Simplifique dividindo pelo MDC.
- Soma e subtração: reduza ao mesmo denominador (o MMC dos denominadores) e opere os numeradores. Somar numerador com numerador e denominador com denominador é erro clássico. Multiplicação: numerador com numerador e denominador com denominador. Divisão: multiplique pelo inverso do divisor.
- Comparação: reduza ao mesmo denominador, ou compare em decimal. Com mesmo numerador, é maior a fração de menor denominador.
- Fração de fração: "2/3 de 3/4" é a multiplicação 2/3 · 3/4 = 1/2. Problemas de "gastou 1/3 e depois 1/4 do que restou": o que restou depois do primeiro gasto é 2/3; depois do segundo, 3/4 de 2/3 = 1/2 do total.
- Problemas de "parte e todo": se uma parte vale uma fração do total, o total é a parte dividida pela fração. Se 3/5 de uma quantia valem R$ 120, o total é 120 ÷ 3/5 = R$ 200.
- Razão é a comparação de duas grandezas por divisão (a:b). Proporção é a igualdade de duas razões, a/b = c/d. Propriedade fundamental: o produto dos meios é igual ao produto dos extremos (a · d = b · c).
- Propriedade da soma: a/b = c/d implica (a + c) ÷ (b + d) igual à mesma razão, e também (a + b) ÷ b = (c + d) ÷ d. Serve para achar valores a partir de somas e diferenças.
- Divisão em partes diretamente proporcionais: para dividir T em partes proporcionais a a, b e c, some a + b + c, calcule o valor de cada unidade (T ÷ soma) e multiplique. Divisão em partes inversamente proporcionais: use os inversos (1/a, 1/b, 1/c), reduzidos a denominador comum.
- Razões úteis: velocidade (distância ÷ tempo), densidade, escala (medida no desenho ÷ medida real, na mesma unidade). Converta sempre as unidades antes de montar a razão.
- Números proporcionais a sequências: se x, y e z são proporcionais a 2, 3 e 5, então x = 2k, y = 3k e z = 5k para um mesmo k.

## 4. Regra de três simples e composta

- Regra de três simples relaciona duas grandezas em dois casos, com uma incógnita. Monte a tabela com a mesma grandeza na mesma coluna, e decida se as grandezas são direta ou inversamente proporcionais.
- Direta: quando uma dobra, a outra dobra (quantidade e preço, distância e combustível, área e tinta). Multiplique em cruz: a/b = c/x implica x = b · c ÷ a.
- Inversa: quando uma dobra, a outra cai à metade (operários e dias, velocidade e tempo, torneiras e tempo para encher). O produto é constante: a · b = c · x, logo x = a · b ÷ c.
- Teste da seta: pergunte se, aumentando a grandeza conhecida, a incógnita aumenta ou diminui. Aumenta, é direta; diminui, é inversa.
- Regra de três composta: há três ou mais grandezas. Compare cada uma com a incógnita, separadamente, deixando as outras fixas. Multiplique as razões; inverta a razão das grandezas inversas. Exemplo: 8 máquinas, 6 horas por dia e 5 dias fazem 480 peças; 10 máquinas, 9 horas por dia e 4 dias fazem 480 · (10/8) · (9/6) · (4/5) = 720 peças.
- Problemas de trabalho conjunto: se um trabalhador faz uma tarefa em a dias e outro em b dias, juntos fazem 1/a + 1/b da tarefa por dia, e levam 1 ÷ (1/a + 1/b) dias. Torneira que enche e ralo que esvazia: subtraia as taxas.
- Cuidado com unidades (horas e minutos, metros e centímetros) e com grandezas que parecem proporcionais mas não são (idade e altura). A regra de três só vale quando há proporcionalidade.
- Verificação de bom senso: se há mais trabalhadores, o prazo deve cair; se há mais mercadoria, o preço deve subir. Resultado que contradiz isso indica erro no sentido das setas.

## 5. Porcentagem, acréscimos e descontos

- Por cento significa "por cem": 25% = 25/100 = 0,25 = 1/4. Porcentagem de um valor é o valor multiplicado pelo percentual dividido por 100. 15% de 400 = 400 · 0,15 = 60.
- Descubra sempre a base (o 100%): o percentual incide sobre ela. Em "o preço subiu 20%", a base é o preço antigo. Em "o preço atual é 20% maior que o do concorrente", a base é o do concorrente.
- Fator de multiplicação: um aumento de i% multiplica por (1 + i/100); um desconto de i% multiplica por (1 − i/100). Aumento de 20%: ×1,20. Desconto de 15%: ×0,85. Um passo só, sem somar nem subtrair em separado.
- Aumentos e descontos sucessivos: multiplique os fatores. +20% e depois −20% dá 1,20 · 0,80 = 0,96, uma perda líquida de 4%. Os percentuais incidem sobre bases diferentes e não se somam.
- Variação percentual: (valor final − valor inicial) ÷ valor inicial. De 80 para 100, a variação é 20 ÷ 80 = 25%. Para voltar de 100 a 80, a queda é 20 ÷ 100 = 20%. A queda que desfaz um aumento de i% é i ÷ (100 + i).
- Descobrir o valor original: se o preço final é o original com aumento de 20%, o original é o final dividido por 1,20. Dividir é o inverso de multiplicar pelo fator.
- Porcentagem de porcentagem: multiplique. 40% de 30% é 0,40 · 0,30 = 12% do total.
- Pontos percentuais: a diferença entre duas taxas. De 20% para 25% são 5 pontos percentuais, mas a variação percentual é 5 ÷ 20 = 25%. A banca explora essa troca de palavras.
- Lucro e prejuízo: lucro de 20% sobre o custo significa venda = 1,20 · custo. Lucro de 20% sobre a venda significa custo = 0,80 · venda, ou seja, venda = custo ÷ 0,80 = 1,25 · custo. Leia sobre o quê incide.
- Mistura e composição: porcentagens de grupos diferentes só se somam depois de levadas ao total. Em um grupo de 200 com 40% de mulheres e 25% delas com mais de 40 anos, são 80 mulheres e 20 mulheres com mais de 40 anos, ou seja, 10% do total.
- Juros simples e compostos aparecem como acréscimos sucessivos: no composto, os fatores se multiplicam; no simples, o acréscimo é sempre sobre o valor inicial.

## 6. Médias e medidas de posição

- Média aritmética: soma dos valores dividida pela quantidade. Propriedade central para problemas: soma = média × quantidade. Trabalhe com somas.
- Média ponderada: cada valor tem um peso; some valor vezes peso e divida pela soma dos pesos. A média de dois grupos é a média ponderada das médias, com os tamanhos dos grupos como pesos.
- Retirar ou acrescentar um valor: compare a soma antes e depois. Se a média de 5 números é 20 (soma 100) e, retirado um deles, a média dos 4 restantes é 18 (soma 72), o número retirado é 100 − 72 = 28.
- Somar uma constante k a todos os valores soma k à média; multiplicar todos por k multiplica a média por k.
- Mediana: valor central dos dados ordenados; com quantidade par, é a média dos dois centrais. Moda: valor que mais se repete (pode haver mais de uma ou nenhuma).
- A média é sensível a valores extremos; a mediana, não. Em uma distribuição com um valor muito grande, a média fica acima da mediana.
- Média geométrica de n valores positivos é a raiz de índice n do produto; média harmônica de dois valores a e b é 2ab ÷ (a + b). A harmônica é a média correta de velocidades em trechos de mesma distância.
- Média de uma sequência em PA é a média do primeiro e do último termo.
- Cuidado com a média das médias: só é igual à média geral quando os grupos têm o mesmo tamanho.

## 7. Conjuntos e diagramas de Venn

- Conjunto é uma coleção de elementos. Pertence (∈) relaciona elemento e conjunto; está contido (⊂) relaciona conjuntos. Operações: união (A ∪ B, está em A ou em B), interseção (A ∩ B, está em ambos), diferença (A − B, está em A e não em B) e complementar (o que falta para o universo).
- Número de elementos da união de dois conjuntos: n(A ∪ B) = n(A) + n(B) − n(A ∩ B). A interseção é contada duas vezes na soma, por isso é subtraída uma vez.
- Para três conjuntos: n(A ∪ B ∪ C) = n(A) + n(B) + n(C) − n(A ∩ B) − n(A ∩ C) − n(B ∩ C) + n(A ∩ B ∩ C).
- Método prático: comece pela interseção mais interna (a dos três conjuntos), preencha as regiões de fora para dentro subtraindo o que já foi contado e termine com o que está fora dos conjuntos (o complementar da união).
- Expressões da linguagem: "somente A" é A sem os outros; "pelo menos um" é a união; "exatamente dois" soma as regiões de interseção de pares sem a tripla; "nenhum" é o que está fora de todos.
- Diferença e complementar: n(A − B) = n(A) − n(A ∩ B). O número de subconjuntos de um conjunto com n elementos é 2^n.
- Propriedades: união e interseção são comutativas e associativas; valem as leis de De Morgan para conjuntos (o complementar da união é a interseção dos complementares).
- Pesquisas com respostas múltiplas: confira se a soma das regiões é igual ao total pesquisado; em geral, o enunciado traz um dado a mais (quantos não gostam de nenhum) que fecha a conta.
- Conjuntos se ligam à lógica: "todo A é B" quer dizer A contido em B; "algum A é B", que a interseção não é vazia; "nenhum A é B", que a interseção é vazia.

## 8. Contagem: princípios, permutação, arranjo e combinação

- Princípio multiplicativo: se uma tarefa tem etapas sucessivas, com m, n, p, ... escolhas, o total é m · n · p · ... Palavra-chave: "e". 3 camisas e 2 calças formam 6 trajes.
- Princípio aditivo: se as alternativas são excludentes (uma coisa ou outra, nunca as duas), o total é a soma. Palavra-chave: "ou". 3 ônibus ou 2 metrôs dão 5 maneiras. Se as alternativas se sobrepõem, subtraia a interseção (inclusão e exclusão).
- Fatorial: n! = n · (n − 1) · ... · 2 · 1, com 0! = 1. Permutação simples de n elementos distintos: n! maneiras de ordená-los. 4 pessoas em fila: 24.
- Elementos juntos: trate-os como um bloco, permute os blocos e multiplique pela permutação interna do bloco. Elementos que não podem ficar juntos: total menos os que ficam juntos.
- Permutação com elementos repetidos: n! ÷ (k1! · k2! · ...), dividindo pelo fatorial de cada elemento repetido. Anagramas de ARARA: 5! ÷ (3! · 2!) = 10.
- Arranjo A(n, p) = n! ÷ (n − p)!: escolhe p entre n, e a ordem importa (pódio, senha sem repetição, cargos distintos). A(10, 3) = 10 · 9 · 8 = 720.
- Combinação C(n, p) = n! ÷ [p! · (n − p)!]: escolhe p entre n, e a ordem não importa (comissão, grupo, equipe). C(n, p) = A(n, p) ÷ p!. Propriedade: C(n, p) = C(n, n − p). C(5, 2) = 10.
- Como escolher: etapas sucessivas, multiplique; alternativas, some; a ordem muda o resultado? Sim, arranjo ou permutação; não, combinação; há repetidos, divida por k!.
- Árvore de possibilidades: para problemas pequenos, liste os casos de forma organizada. Para contagem de caminhos em uma malha, o número de caminhos até um ponto é a soma dos caminhos até os dois pontos anteriores.
- Princípio da casa dos pombos: se n + 1 objetos são colocados em n caixas, alguma caixa tem pelo menos dois objetos. Em geral, com N objetos em k caixas, alguma caixa tem pelo menos o teto de N ÷ k. Serve para provar que "alguma resposta se repete".
- Números com algarismos: conte posição por posição, começando pela posição mais restrita (o primeiro algarismo não pode ser zero, o último de um número par é par).

## 9. Proposições, conectivos e tabelas-verdade

- Proposição é uma sentença declarativa que pode ser julgada verdadeira (V) ou falsa (F), e nunca as duas. Não são proposições: perguntas, ordens, exclamações e sentenças abertas (com variável sem valor, como x + 1 = 3).
- Proposição simples não tem outra dentro; composta é formada por simples ligadas por conectivos. Princípios: identidade, não contradição e terceiro excluído.
- Negação (~p): inverte o valor. Conjunção (p e q): V só quando as duas são V. Disjunção inclusiva (p ou q): F só quando as duas são F. Disjunção exclusiva (ou p ou q): V quando os valores são diferentes. Condicional (se p, então q): F só quando p é V e q é F. Bicondicional (p se e somente se q): V quando os valores são iguais.
- Leituras da condicional: "se p, então q", "p implica q", "p é suficiente para q", "q é necessário para p", "q, se p", "p somente se q". A condição suficiente é o antecedente; a necessária, o consequente.
- Tabela-verdade: uma proposição composta com n simples tem 2^n linhas. Preencha as colunas das simples alternando blocos de V e F (metade, um quarto, ...), monte as colunas intermediárias e termine no conectivo principal.
- Tautologia: todas as linhas V (p ou ~p). Contradição: todas F (p e ~p). Contingência: V e F. Equivalência: mesma coluna final; escreve-se p ≡ q.
- Leis de De Morgan: ~(p ∧ q) ≡ ~p ∨ ~q e ~(p ∨ q) ≡ ~p ∧ ~q. Negação da condicional: ~(p → q) ≡ p ∧ ~q. Dupla negação: ~(~p) ≡ p. Negação da bicondicional: ~(p ↔ q) ≡ p ou exclusivo q.
- Equivalências da condicional: p → q ≡ ~q → ~p (contrapositiva) ≡ ~p ∨ q. A recíproca (q → p) e a inversa (~p → ~q) não são equivalentes à original, mas são equivalentes entre si.
- Outras equivalências: p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r) e p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r) (distributivas); p ∧ p ≡ p; p ∨ (p ∧ q) ≡ p (absorção).
- Precedência ao ler fórmulas sem parênteses: negação, depois conjunção, depois disjunção, depois condicional e por último bicondicional. Em dúvida, use parênteses.
- Ferramenta do módulo: a calculadora de tabelas-verdade do site monta a tabela completa, classifica a fórmula e compara duas fórmulas.

## 10. Dedução, argumentos e estrutura lógica de relações

- Argumento é um conjunto de proposições, as premissas, que conduz a uma conclusão. Um argumento é válido quando é impossível ter premissas todas verdadeiras e conclusão falsa. Validade é uma propriedade da forma, não da verdade das frases: um argumento pode ser válido com premissas falsas.
- Teste por tabela-verdade: monte a tabela com as premissas e a conclusão; se existir linha com todas as premissas V e a conclusão F, o argumento é inválido. Caso contrário, é válido. É seguro, mas longo com muitas proposições.
- Teste rápido: suponha a conclusão falsa e as premissas verdadeiras e procure uma contradição. Se não for possível atribuir os valores sem contradição, o argumento é válido; se for possível, é inválido.
- Dedução com valores: comece pelas premissas simples (que não são condicionais) e pelas conjunções, que fixam valores. Substitua os valores nas demais e deduza o restante. Uma conjunção verdadeira tem as duas partes V; uma disjunção falsa tem as duas F; uma condicional falsa tem antecedente V e consequente F.
- Formas válidas: modus ponens (p → q; p; logo q); modus tollens (p → q; ~q; logo ~p); silogismo hipotético (p → q; q → r; logo p → r); silogismo disjuntivo (p ou q; ~p; logo q).
- Falácias comuns: afirmação do consequente (p → q; q; logo p) e negação do antecedente (p → q; ~p; logo ~q). Ambas são inválidas, porque confundem a condicional com a recíproca ou com a inversa.
- Estrutura lógica de relações arbitrárias entre pessoas, lugares, objetos ou eventos fictícios (o texto do edital): monte uma tabela com uma linha por pessoa e uma coluna por atributo; marque V na célula confirmada e F nas demais da mesma linha e coluna; use as pistas negativas para eliminar e repita até a solução ser única.
- Pistas de posição (fila, mesa, andares): desenhe as posições e vá encaixando as pistas mais restritivas primeiro ("está imediatamente à frente", "nas pontas").
- Avaliação das condições do enunciado: verifique se a solução encontrada obedece a todas as pistas, inclusive às negativas, e se é a única. Quando houver mais de uma solução, releia o enunciado em busca de uma condição ignorada.
- Raciocínio verbal: preste atenção aos quantificadores e conectivos escondidos na linguagem ("só", "somente", "a menos que", "mas") e traduza para símbolos antes de deduzir.

## 11. Quantificadores, verdades e mentiras

- Quantificadores: "todo" (universal), "algum" (existencial, ao menos um, podendo ser todos) e "nenhum". "Existe" e "pelo menos um" equivalem a "algum".
- Negações: nega-se "todo A é B" com "algum A não é B"; nega-se "algum A é B" com "nenhum A é B"; nega-se "nenhum A é B" com "algum A é B"; nega-se "algum A não é B" com "todo A é B". Armadilha: "nenhum A é B" não é a negação de "todo A é B"; as duas podem ser falsas ao mesmo tempo.
- Equivalências: "todo A é B" ≡ "nenhum A é não B". "Se é A, então é B" tem a mesma ideia de "todo A é B" (A contido em B).
- Diagramas: "todo A é B" é um círculo dentro do outro; "algum A é B" tem interseção com ao menos um elemento; "nenhum A é B" são círculos disjuntos. Nos silogismos, desenhe o caso mais geral e veja se a conclusão vale em todas as possibilidades de desenho.
- Conclusão que "decorre" das premissas é a que vale em todos os diagramas possíveis. Uma conclusão que só vale em um desenho possível não decorre.
- Verdades e mentiras: é o tipo mais cobrado do edital. Em cada problema, o enunciado diz quantos mentem (ou quantos falam a verdade). Estratégia: tome uma afirmação, suponha que é verdadeira (ou falsa), veja o que isso exige das outras e descarte a hipótese que gerar contradição.
- Quando as afirmações se contradizem entre si (uma é negação da outra), exatamente uma é verdadeira. Isso localiza rapidamente quem fala a verdade, se o enunciado limita o número de verdadeiros.
- Sempre que o enunciado diz "exatamente um mente", teste cada candidato ao mentiroso e conte se há de fato um só mentiroso. Se o enunciado diz "pelo menos um", mais de uma hipótese pode valer.
- Atenção à sentença do mentiroso: ela é inteiramente falsa, isto é, sua negação é verdadeira. Se o mentiroso diz "A e B", só se sabe que "não A ou não B". Se o enunciado fala de "erra em ambas", leia com cuidado qual parte é falsa.
- Problemas com cavaleiros e escudeiros, ilha de verdadeiros e mentirosos: monte uma tabela de hipóteses (quem é quem) e confira cada declaração contra o tipo de quem a disse.
- Uma sentença sobre si mesma ("esta frase é falsa") não é uma proposição. Evite aceitar enunciados paradoxais como dados.

## 12. Sequências, relações lógicas, orientação espacial e temporal

- Sequência numérica: procure a regra pela diferença entre termos consecutivos (progressão aritmética), pela razão (progressão geométrica), pela soma dos dois anteriores (Fibonacci), por quadrados e cubos, por duas sequências intercaladas ou por operações alternadas (+2, ×2, +2, ×2).
- Progressão aritmética: a(n) = a1 + (n − 1) · r. Soma dos n primeiros termos: S = (a1 + an) · n ÷ 2. O termo central é a média dos extremos. O número de termos entre a e b com razão r é (b − a) ÷ r + 1.
- Progressão geométrica: a(n) = a1 · q^(n−1). Soma dos n primeiros termos: S = a1 · (q^n − 1) ÷ (q − 1), para q diferente de 1.
- Sequências de letras e de palavras: use a posição no alfabeto (A = 1, B = 2, ...). Confira se o enunciado usa 23 ou 26 letras (K, W e Y); na dúvida, escreva o alfabeto e conte.
- Sequências de figuras e de matrizes: observe a regra por linha, por coluna e na diagonal (somas, produtos, rotações, adição de elementos). Se uma regra falha em algum termo, descarte-a.
- Calendário: os dias da semana se repetem de 7 em 7; use o resto da divisão por 7. Meses de 30 dias deixam resto 2; de 31 dias, resto 3; fevereiro de 28 dias, resto 0. Ano bissexto: divisível por 4, exceto os divisíveis por 100 que não o são por 400.
- Relógio: o ponteiro das horas anda 30 graus por hora (0,5 grau por minuto) e o dos minutos, 6 graus por minuto. O ângulo entre os ponteiros às H horas e M minutos é o módulo de 30H − 5,5M (ou o seu replemento em 360).
- Orientação espacial: direita e esquerda dependem de quem olha; desenhe o trajeto em um plano (norte para cima), marque cada deslocamento e calcule a distância final pelo teorema de Pitágoras. Um giro à direita de 90 graus muda o rumo de norte para leste.
- Orientação temporal: converta datas e horários para uma mesma unidade (minutos desde um marco) antes de comparar. Cuidado com "daqui a" (soma) e "há" (subtração), e com fusos horários se o enunciado os citar.
- Formação de conceitos, discriminação de elementos e analogias: identifique o critério que une os elementos (categoria, função, ordem) e o que separa o intruso. Em analogias A está para B como C está para D, descubra a relação entre A e B e aplique a C.
- Raciocínio matemático em enunciados verbais: dê nomes às incógnitas, traduza cada frase em uma equação, resolva e confira se a resposta satisfaz o texto original, não apenas as equações.
- Idades e problemas com diferenças: a diferença entre as idades de duas pessoas é constante ao longo do tempo; use-a para armar a equação.
