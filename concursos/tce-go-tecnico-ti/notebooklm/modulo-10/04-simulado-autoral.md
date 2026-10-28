# Simulado autoral estilo FCC, Segurança da Informação (20 questões)

Questões AUTORAIS, elaboradas para este módulo no estilo da FCC (cinco alternativas, uma correta). Não são questões de provas reais; cada uma está marcada como autoral. Os números usados nos comentários vêm dos laboratórios executados de verdade (L1 a L10).

## Questão 1 (Princípios) - AUTORAL (não é de prova real)

Um órgão quer que um servidor não possa negar, depois, que enviou determinada ordem de pagamento. A propriedade de segurança que atende a esse requisito e o mecanismo que a viabiliza são, respectivamente,

A) confidencialidade; criptografia simétrica da mensagem.
B) disponibilidade; redundância dos servidores.
C) não repúdio; assinatura digital com a chave privada do remetente.
D) integridade; apenas o hash da mensagem, sem chave.
E) autenticidade; senha compartilhada entre as partes.

**Gabarito: C.** Impedir que o autor negue a autoria é o não repúdio, que só a assinatura com chave privada dá, porque só o titular possui essa chave. Um hash sozinho não tem chave e qualquer um o recalcula (integridade, sem autoria). Senha compartilhada autentica entre as partes, mas qualquer uma poderia ter gerado a mensagem. Laboratório L4.

## Questão 2 (Princípios) - AUTORAL (não é de prova real)

A classificação da informação (por exemplo, pública, interna, confidencial e secreta) tem como finalidade principal

A) definir o nível de proteção proporcional ao valor e à sensibilidade da informação, orientando quem pode acessá-la e como deve ser tratada.
B) aumentar a velocidade de acesso aos dados mais antigos.
C) substituir o controle de acesso e a criptografia.
D) eliminar a necessidade de análise de riscos.
E) definir o formato dos arquivos usados na organização.

**Gabarito: A.** A classificação diz o que proteger e com que rigor; ela alimenta controle de acesso, criptografia e retenção, mas não os substitui nem dispensa a análise de riscos.

## Questão 3 (Riscos) - AUTORAL (não é de prova real)

Uma instituição contrata um seguro contra prejuízos de um incidente que ela não consegue evitar totalmente. Entre as formas de tratamento de risco, essa decisão corresponde a

A) evitar o risco.
B) aceitar o risco.
C) mitigar o risco, reduzindo a probabilidade.
D) transferir o risco.
E) ignorar o risco.

**Gabarito: D.** As opções de tratamento são mitigar (reduzir probabilidade ou impacto), transferir (seguro, terceirização), evitar (abandonar a atividade) e aceitar (conscientemente, dentro do apetite de risco). Ignorar não é uma opção de tratamento. Laboratório L9.

## Questão 4 (Riscos) - AUTORAL (não é de prova real)

Em gestão de riscos, uma falha de software conhecida e sem correção aplicada, que pode ser explorada por um atacante, é classificada como

A) ameaça.
B) vulnerabilidade.
C) impacto.
D) incidente.
E) controle compensatório.

**Gabarito: B.** Vulnerabilidade é a fraqueza; ameaça é a causa potencial de dano (o atacante, o malware); risco combina a probabilidade de a ameaça explorar a vulnerabilidade com o impacto; incidente é quando isso de fato acontece. Controles reduzem o risco.

## Questão 5 (Incidentes) - AUTORAL (não é de prova real)

Em um plano de resposta a incidentes, a revisão do que ocorreu para ajustar processos e controles, após a recuperação dos serviços, é a fase de

A) detecção e análise.
B) contenção.
C) erradicação.
D) preparação.
E) lições aprendidas (pós-incidente).

**Gabarito: E.** Ciclo típico: preparação, detecção e análise, contenção, erradicação e recuperação e lições aprendidas, que realimenta a preparação. Na ISO/IEC 27035 as fases têm nomes parecidos. Laboratório L9: o alerta do log de força bruta é o início da fase de detecção.

## Questão 6 (IAM) - AUTORAL (não é de prova real)

Em um sistema, os usuários recebem permissões conforme a função que exercem (por exemplo, &quot;auditor&quot;, &quot;gestor&quot;, &quot;operador&quot;), e não individualmente. Esse modelo de controle de acesso é o

A) DAC puro, em que cada dono define as permissões de cada usuário.
B) RBAC (baseado em papéis).
C) MAC, em que o usuário escolhe o nível do recurso.
D) ABAC, em que só o endereço IP define o acesso.
E) ACL de rede sem identidade.

**Gabarito: B.** RBAC associa permissões a papéis e usuários a papéis; facilita auditoria e o menor privilégio. ABAC decide por atributos (usuário, recurso, horário, local). No laboratório L7, a mesma ação foi decidida por papel e por atributo, com tabelas lado a lado.

## Questão 7 (IAM) - AUTORAL (não é de prova real)

A regra pela qual cada usuário, processo ou sistema recebe apenas as permissões estritamente necessárias para executar sua tarefa denomina-se

A) defesa em profundidade.
B) segregação de ambientes.
C) não repúdio.
D) princípio do menor privilégio.
E) alta disponibilidade.

**Gabarito: D.** Menor privilégio limita o dano de uma credencial comprometida. A segregação de funções é parente próxima: ninguém deve concentrar todas as etapas de uma operação crítica, como cadastrar e aprovar um pagamento.

## Questão 8 (IAM) - AUTORAL (não é de prova real)

Uma senha com 8 caracteres escolhidos ao acaso em um alfabeto de 62 símbolos (maiúsculas, minúsculas e dígitos) tem uma entropia de cerca de

A) 47,6 bits.
B) 24 bits.
C) 37,6 bits.
D) 62 bits.
E) 78,7 bits.

**Gabarito: A.** Entropia = comprimento × log₂(tamanho do alfabeto) = 8 × log₂(62) = 8 × 5,954 ≈ 47,6 bits. Para 8 minúsculas (26 símbolos) seria 37,6; para 12 caracteres de um alfabeto de 94, 78,7. Só vale para escolha aleatória: senhas humanas têm bem menos. Laboratórios L2 e L10.

## Questão 9 (Criptografia) - AUTORAL (não é de prova real)

Em uma organização com 50 pessoas que precisam trocar mensagens sigilosas entre si, comparando o número de chaves necessárias, a criptografia simétrica (uma chave para cada par) e a assimétrica (um par de chaves por pessoa) exigem, respectivamente,

A) 50 chaves e 100 chaves.
B) 100 chaves e 50 chaves.
C) 1225 chaves e 100 chaves.
D) 2450 chaves e 50 chaves.
E) 1225 chaves e 50 chaves.

**Gabarito: C.** Simétrica: n(n−1)/2 = 50 × 49 / 2 = 1225. Assimétrica: 2n = 100 (uma pública e uma privada por pessoa). Para n = 1000: 499.500 contra 2.000. Laboratório L4 e conferência L10 (Python e JavaScript iguais).

## Questão 10 (Criptografia) - AUTORAL (não é de prova real)

Um técnico observa que, ao cifrar um arquivo com blocos repetidos usando AES no modo ECB, a imagem cifrada ainda revela o contorno do desenho original. A recomendação correta é

A) trocar o AES por Base64.
B) aumentar a chave de 128 para 256 bits, mantendo o ECB.
C) manter o ECB e cifrar duas vezes.
D) usar o mesmo nonce em todas as mensagens para facilitar a decifragem.
E) usar um modo de operação autenticado, como o GCM, com nonce único por mensagem.

**Gabarito: E.** No ECB, blocos iguais produzem blocos cifrados iguais, e o padrão vaza (no L3: 7 blocos repetidos vistos no ECB; 0 no CBC e no GCM). O tamanho da chave não corrige isso. O GCM cifra e autentica; mas exige nonce único por chave: o reuso é falha grave (veja o item seguinte).

## Questão 11 (Criptografia) - AUTORAL (não é de prova real)

Em um modo de operação de fluxo, como o AES-GCM ou o CTR, o mesmo nonce foi reutilizado com a mesma chave para cifrar duas mensagens. A consequência direta é que

A) o XOR dos dois textos cifrados é igual ao XOR dos dois textos claros, o que permite recuperar uma mensagem quando a outra é conhecida.
B) as mensagens se tornam impossíveis de decifrar.
C) a chave é revelada imediatamente.
D) nada muda, pois o nonce é público.
E) o hash das mensagens fica idêntico.

**Gabarito: A.** Com o mesmo fluxo de chave nas duas mensagens, c1 ⊕ c2 = p1 ⊕ p2. No laboratório L3 isso foi demonstrado e a segunda mensagem foi recuperada a partir da primeira. O nonce pode ser público, mas nunca repetido com a mesma chave.

## Questão 12 (PKI e TLS) - AUTORAL (não é de prova real)

Em uma assinatura digital de um documento, o signatário e o verificador utilizam, respectivamente,

A) a chave pública do destinatário para assinar; a privada do destinatário para verificar.
B) a mesma chave secreta compartilhada para assinar e verificar.
C) a chave privada do verificador para assinar; a pública do signatário para verificar.
D) a chave privada do signatário para assinar o hash do documento; a chave pública do signatário para verificar.
E) nenhuma chave, apenas o hash do documento.

**Gabarito: D.** Assina-se o hash com a chave privada do signatário; qualquer um verifica com a chave pública dele (do certificado). Cifrar com a pública do destinatário serve para confidencialidade, não para assinar. No L4, o documento alterado em 1 byte e a verificação com a chave pública de outra pessoa foram ambos inválidos.

## Questão 13 (PKI e TLS) - AUTORAL (não é de prova real)

Uma autoridade certificadora quer invalidar, antes do vencimento, um certificado cuja chave privada foi comprometida. Os mecanismos usados para que os clientes saibam disso são

A) apenas o período de validade do certificado.
B) a lista de certificados revogados (CRL) e o protocolo de verificação online (OCSP).
C) a troca do nome do servidor no DNS.
D) a reinicialização do servidor.
E) o aumento do tamanho da chave pública.

**Gabarito: B.** A revogação é publicada na CRL ou consultada por OCSP; sem isso, o certificado continuaria válido até o fim do prazo. No laboratório L5, o OpenSSL com -crl_check acusou &quot;certificate revoked&quot; para o certificado de série 1000, motivo keyCompromise; o outro continuou válido.

## Questão 14 (Aplicações) - AUTORAL (não é de prova real)

Uma aplicação web mostra, sem tratamento, um comentário digitado por um usuário, que contém um trecho de script, e o navegador de outro usuário o executa. A medida principal de defesa contra essa falha é

A) aumentar o comprimento da senha dos usuários.
B) cifrar o banco de dados.
C) codificar (escapar) a saída conforme o contexto em que é exibida, além de validar a entrada.
D) fazer backup diário.
E) bloquear o acesso às portas 22 e 3306.

**Gabarito: C.** É XSS (Cross-Site Scripting), ligado à categoria de injeção do OWASP (A05:2025). A defesa é escapar a saída (html.escape no laboratório L6), validar a entrada e reforçar com uma política de segurança de conteúdo (CSP). As outras medidas não tratam essa falha.

## Questão 15 (Aplicações) - AUTORAL (não é de prova real)

Um sistema não registra as tentativas de login que falharam e não gera alertas quando ocorre um volume anormal de erros, e um ataque de força bruta passa despercebido por semanas. Segundo o OWASP Top 10:2025, essa falha corresponde a

A) A01:2025 Broken Access Control.
B) A03:2025 Software Supply Chain Failures.
C) A06:2025 Insecure Design.
D) A10:2025 Mishandling of Exceptional Conditions.
E) A09:2025 Security Logging and Alerting Failures.

**Gabarito: E.** Sem registro e sem alerta, não há detecção nem resposta: é a categoria A09:2025 (que ganhou &quot;Alerting&quot; no nome em 2025). No laboratório L9, um limiar sobre o log (10 falhas em 60 s) bastou para o alerta. A10:2025 trata de tratamento inadequado de erros e condições excepcionais, o que é diferente.

## Questão 16 (Backup) - AUTORAL (não é de prova real)

Pela regra 3-2-1 de backup, uma organização deve manter

A) ao menos 3 cópias dos dados, em 2 tipos de mídia diferentes, com 1 cópia fora do local (ou isolada).
B) 3 cópias na mesma mídia e no mesmo local.
C) 2 cópias em 1 mídia e 3 locais.
D) 1 cópia em 3 mídias e 2 locais.
E) 3 cópias no mesmo NAS, com 2 senhas e 1 administrador.

**Gabarito: A.** No laboratório L8, &quot;um HD sozinho&quot; e &quot;3 cópias no mesmo NAS&quot; reprovaram; disco + NAS + nuvem passou. A cópia isolada ou imutável é também a principal defesa contra ransomware, que tenta cifrar ou apagar as cópias acessíveis.

## Questão 17 (Backup) - AUTORAL (não é de prova real)

Um serviço promete disponibilidade de 99,9% ao ano. O tempo máximo de indisponibilidade equivalente, em um ano de 8760 horas, é de cerca de

A) 87,6 horas.
B) 8,76 horas.
C) 0,876 hora.
D) 43,8 horas.
E) 1 hora e 12 minutos por mês, apenas.

**Gabarito: B.** Indisponibilidade = (1 − 0,999) × 8760 = 8,76 h. Para 99% são 87,6 h; para 99,99%, 0,876 h (cerca de 52 minutos); para 99,5%, 43,8 h. Dois componentes em série de 99% dão 99% × 99% = 98,01%; em paralelo (redundância), 99,99%. Conferência L10.

## Questão 18 (Malware e engenharia social) - AUTORAL (não é de prova real)

Um funcionário do financeiro recebe um e-mail que parece ser do presidente da empresa, com tom de urgência, pedindo uma transferência sigilosa e proibindo que ele confirme com outras pessoas. A melhor conduta é

A) executar rapidamente, pois o remetente é uma autoridade.
B) responder ao próprio e-mail pedindo confirmação.
C) clicar no link do e-mail para verificar a autenticidade.
D) não executar a ordem e confirmá-la por outro canal já conhecido, comunicando o fato à equipe de segurança.
E) encaminhar o e-mail a todos os colegas para opinarem.

**Gabarito: D.** É engenharia social (phishing direcionado, fraude do falso executivo): usa urgência, autoridade e sigilo. A defesa é verificar por canal independente e reportar. Responder ao mesmo e-mail ou clicar no link leva ao próprio atacante.

## Questão 19 (Firewall e IDS) - AUTORAL (não é de prova real)

Em relação ao IDS e ao IPS, é correto afirmar que

A) o IDS bloqueia pacotes e o IPS apenas gera relatórios.
B) ambos são antivírus de estação de trabalho.
C) o IDS detecta e alerta, em geral de forma passiva; o IPS fica no caminho do tráfego (inline) e pode bloquear a ameaça.
D) ambos substituem o firewall e o controle de acesso.
E) o IPS só funciona com tráfego cifrado.

**Gabarito: C.** IDS = detecção; IPS = prevenção (atua no fluxo). Podem ser de rede (NIDS/NIPS) ou de host (HIDS/HIPS). Não substituem o firewall. Não testado aqui: Snort ou Suricata reais; o laboratório L9 simulou a lógica de limiar em Python.

## Questão 20 (Zero Trust e ISO 27000) - AUTORAL (não é de prova real)

A norma da família ABNT NBR ISO/IEC 27000 que especifica os requisitos de um Sistema de Gestão da Segurança da Informação (SGSI) e permite certificação é a

A) ISO/IEC 27002, que traz o código de prática de controles.
B) ISO/IEC 27005, que trata de continuidade de negócios.
C) ISO/IEC 27035, que define a classificação da informação.
D) ISO/IEC 22301, que trata de segurança em aplicações.
E) ISO/IEC 27001.

**Gabarito: E.** 27001: requisitos do SGSI (certificável). 27002: controles e orientações. 27005: gestão de riscos. 27035: gestão de incidentes. 22301: continuidade de negócios (SGCN). 27000: visão geral e vocabulário. Os textos das normas são pagos, e o resumo vem de fontes públicas e das provas da FCC.
