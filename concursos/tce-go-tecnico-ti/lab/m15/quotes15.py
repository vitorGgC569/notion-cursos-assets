# -*- coding: utf-8 -*-
# Citacoes literais usadas na Teoria, nos casos e nas questoes do Modulo 15.
# Cada chave aponta para um arquivo da pasta fontes/ e para o trecho literal esperado.
# get(chave) devolve o trecho SOMENTE se ele existir no arquivo (espacos normalizados).
import os,re
HERE=os.path.dirname(os.path.abspath(__file__))
FONTES=os.path.join(HERE,'fontes')
def norm(s):
    s=s.replace('\u2019',"'").replace('\u2018',"'").replace('\u201c','"').replace('\u201d','"').replace('\xa0',' ')
    return re.sub(r'\s+',' ',s).strip()
Q={
 # ---- Edital 01/2026 do TCE-GO (Capitulos 7, 8, 11 e 12; o Edital 02/2026 nao altera o Cap. 11)
 'ed_71':('edital_cap7.txt','Prova Discursiva - Estudo de Caso 01'),
 'ed_71b':('edital_cap7.txt','4h30'),
 'ed_75':('edital_cap7.txt','A Prova Discursiva-Estudo de Caso reger-se-á conforme o disposto no Capítulo 11 deste Edital e será realizada no mesmo dia e período da aplicação das Provas Objetivas.'),
 'ed_111':('edital_cap11_12.txt','A Prova Discursiva-Estudo de Caso será aplicada no mesmo dia e período da aplicação das Provas Objetivas de Conhecimentos Gerais e de Conhecimentos Específicos.'),
 'ed_112':('edital_cap11_12.txt','Serão corrigidas as Provas Discursivas-Estudo de Caso dos candidatos habilitados e mais bem classificados na Prova Objetiva'),
 'ed_112b':('edital_cap11_12.txt','48ª (quadragésima oitava)'),
 'ed_113':('edital_cap11_12.txt','Os candidatos não incluídos no limite estabelecido no item 11.2 acima, serão excluídos do Concurso.'),
 'ed_114':('edital_cap11_12.txt','A Prova Discursiva-Estudo de Caso, de caráter eliminatório e classificatório e constará de 01 questão prática, para a qual o candidato deverá apresentar, por escrito, as soluções.'),
 'ed_115':('edital_cap11_12.txt','Também não será permitida a utilização de lápis, lapiseira, marca-textos, líquido corretivo, régua, borracha, máquina calculadora ou similar.'),
 'ed_116':('edital_cap11_12.txt','O tema versará sobre conteúdo pertinente aos Conhecimentos Específicos e as disciplinas de conhecimentos específicos poderão estar inter-relacionadas'),
 'ed_117':('edital_cap11_12.txt','A Prova Discursiva-Estudo de Caso destinar-se-á a avaliar o domínio de conteúdo do tema abordado, a experiência prévia do candidato e sua adequabilidade quanto à atribuição do Cargo.'),
 'ed_118':('edital_cap11_12.txt','será avaliada na escala de 0 (zero) a 100 (cem) pontos.'),
 'ed_119':('edital_cap11_12.txt','Será considerado habilitado na Prova Discursiva-Estudo de Caso o candidato que obtiver nota igual ou superior a 50,00 (cinquenta) pontos.'),
 'ed_1110':('edital_cap11_12.txt','A nota será prejudicada, proporcionalmente, caso ocorra abordagem tangencial, parcial ou diluída em meio a divagações e/ou colagem de textos e de questões apresentados nas provas.'),
 'ed_1111':('edital_cap11_12.txt','deverão os candidatos valer-se das normas ortográficas em vigor'),
 'ed_1112':('edital_cap11_12.txt','Será atribuída nota ZERO à Prova Discursiva-Estudo de Caso nos seguintes casos:'),
 'ed_1112a':('edital_cap11_12.txt','a) fugir ao tema proposto;'),
 'ed_1112b':('edital_cap11_12.txt','b) apresentar textos sob forma não articulada verbalmente (apenas com desenhos, números e palavras soltas ou em versos) ou qualquer fragmento de texto escrito fora do local apropriado;'),
 'ed_1112c':('edital_cap11_12.txt','c) apresentar qualquer sinal, marca, risco, desenho, rubrica, assinatura ou nome, feito pelo candidato, nas linhas destinadas à resposta definitiva que, de alguma forma, possibilite a identificação do candidato;'),
 'ed_1112d':('edital_cap11_12.txt','d) estiver em branco;'),
 'ed_1112e':('edital_cap11_12.txt','e) apresentar letra ilegível e/ou incompreensível;'),
 'ed_1112f':('edital_cap11_12.txt','f) for assinada fora do local apropriado;'),
 'ed_1112g':('edital_cap11_12.txt','g) não atender aos requisitos definidos na grade de correção/critérios de correção/espelho de correção definidos pela Banca Examinadora.'),
 'ed_1113':('edital_cap11_12.txt','Será desconsiderado, com risco de perda de pontos, qualquer trecho que: a) apresentar rasura; b) for escrito fora do espaço reservado para o texto definitivo.'),
 'ed_1114':('edital_cap11_12.txt','qualquer fragmento de texto escrito fora do espaço reservado para o texto definitivo será desconsiderado e não será corrigido.'),
 'ed_1115':('edital_cap11_12.txt','Respostas que apresentarem trechos reproduzidos de textos já divulgados em fontes de acesso público à que a Banca Examinadora tenha acesso, ou que apresentem cópia de trecho dos textos motivadores, de questões ou textos das Provas Objetivas, poderão ser penalizadas com redução drástica da nota.'),
 'ed_1116':('edital_cap11_12.txt','deverá ser rigorosamente observado o limite de linhas estabelecidos na questão, sob pena de perda de pontos a serem atribuídos à Prova Discursiva.'),
 'ed_1117':('edital_cap11_12.txt','A folha para rascunho no Caderno de Provas é de preenchimento facultativo. Em hipótese alguma o rascunho elaborado pelo candidato será considerado na correção da Prova Discursiva-Estudo de Caso pela Banca Examinadora.'),
 'ed_1118':('edital_cap11_12.txt','O candidato deverá atentar para o espaço destinado ao rascunho e ao espaço destinado à resposta definitiva, a fim de que não seja prejudicado.'),
 'ed_1119':('edital_cap11_12.txt','Eventuais marcações nos enunciados das questões, que não excedam a palavras sublinhadas ou circuladas, não trarão prejuízo à correção da Prova Discursiva-Estudo de Caso.'),
 'ed_1120':('edital_cap11_12.txt','A grade de correção (espelho de correção/máscara de critérios) contendo a abordagem/requisitos de resposta definidos pela Banca Examinadora, as respostas apresentadas pelo candidato e a pontuação obtida pelo candidato serão divulgadas por ocasião da vista da Prova Discursiva-Estudo de Caso.'),
 'ed_1121':('edital_cap11_12.txt','O candidato não habilitado na Prova Discursiva-Estudo de Caso, conforme item 11.9 deste Capítulo, será excluído do Concurso.'),
 'ed_122':('edital_cap11_12.txt','acrescidas da nota da Prova Discursiva – Estudo de Caso'),
 'ed_1242':('edital_cap11_12.txt','a) obtido maior nota na Prova Discursiva-Estudo de Caso; b) obtido maior nota na Prova Objetiva de Conhecimentos Específicos;'),
 'ed_812':('edital_cap8.txt','munido de caneta esferográfica de material transparente de tinta preta ou azul'),
 'ed_820f':('edital_cap8.txt','ausentar-se do local de provas antes de decorridas 3 (três) horas do início da prova;'),
 'ed_820m':('edital_cap8.txt','estiver fazendo uso de qualquer espécie de relógio'),
 'ed_821':('edital_cap8.txt','O candidato não poderá adentrar nem permanecer no recinto das provas portando relógios, aparelhos celulares ou smartphones (mesmo desligados)'),
 'ed_crono_data':('edital_cronograma.txt','Aplicação das Provas Objetivas e Discursivas 17/01/2027'),
 'ed_crono_res':('edital_cronograma.txt','Publicação do Resultado Preliminar das Provas Objetivas e Discursivas 19/03/2027'),
 'ed_crono_alt':('edital_cronograma.txt','Cronograma sujeito a alterações.'),
 # ---- LGPD (Camara dos Deputados, texto atualizado) e Resolucao CD/ANPD 15/2024
 'lgpd_48':('lgpd.clean.txt','Art. 48. O controlador deverá comunicar à autoridade nacional e ao titular a ocorrência de incidente de segurança que possa acarretar risco ou dano relevante aos titulares.'),
 'lgpd_48p':('lgpd.clean.txt','A comunicação será feita em prazo razoável, conforme definido pela autoridade nacional'),
 'lgpd_46':('lgpd.clean.txt','Os agentes de tratamento devem adotar medidas de segurança, técnicas e administrativas aptas a proteger os dados pessoais de acessos não autorizados e de situações acidentais ou ilícitas de destruição, perda, alteração, comunicação ou qualquer forma de tratamento inadequado ou ilícito.'),
 'lgpd_6i':('lgpd.clean.txt','I - finalidade: realização do tratamento para propósitos legítimos, específicos, explícitos e informados ao titular, sem possibilidade de tratamento posterior de forma incompatível com essas finalidades;'),
 'lgpd_6iii':('lgpd.clean.txt','III - necessidade: limitação do tratamento ao mínimo necessário para a realização de suas finalidades'),
 'lgpd_6vii':('lgpd.clean.txt','VII - segurança: utilização de medidas técnicas e administrativas aptas a proteger os dados pessoais de acessos não autorizados e de situações acidentais ou ilícitas de destruição, perda, alteração, comunicação ou difusão;'),
 'anpd_6':('anpd15.clean.txt','Art. 6º A comunicação de incidente de segurança à ANPD deverá ser realizada pelo controlador no prazo de três dias úteis, ressalvada a existência de prazo para comunicação previsto em legislação específica.'),
 'anpd_6p1':('anpd15.clean.txt','O prazo a que se refere o caput será contado do conhecimento pelo controlador de que o incidente afetou dados pessoais.'),
 # ---- Lei 14.133/2021 (edicao do Senado Federal, atualizada ate julho de 2026)
 'l14133_etp':('lei14133_senado.txt','XX – estudo técnico preliminar: documento constitutivo da primeira etapa do planejamento de uma contratação que caracteriza o interesse público envolvido e a sua melhor solução'),
 'l14133_tr':('lei14133_senado.txt','XXIII – termo de referência: documento necessário para a contratação de bens e serviços, que deve conter os seguintes parâmetros e elementos descritivos:'),
 'l14133_trA':('lei14133_senado.txt','a) definição do objeto, incluídos sua natureza, os quantitativos, o prazo do contrato'),
 'l14133_18':('lei14133_senado.txt','I – a descrição da necessidade da contratação fundamentada em estudo técnico preliminar que caracterize o interesse público envolvido;'),
 'l14133_18p1':('lei14133_senado.txt','deverá evidenciar o problema a ser resolvido e a sua melhor solução, de modo a permitir a avaliação da viabilidade técnica e econômica da contratação'),
 'l14133_18p1i':('lei14133_senado.txt','I – descrição da necessidade da contratação, considerado o problema a ser resolvido sob a perspectiva do interesse público;'),
 'l14133_18p1iii':('lei14133_senado.txt','III – requisitos da contratação;'),
 'l14133_18x':('lei14133_senado.txt','X – a análise dos riscos que possam comprometer o sucesso da licitação e a boa execução contratual;'),
 'l14133_117':('lei14133_senado.txt','Art. 117. A execução do contrato deverá ser acompanhada e fiscalizada por 1 (um) ou mais fiscais do contrato, representantes da Administração especialmente designados'),
 'l14133_117p1':('lei14133_senado.txt','O fiscal do contrato anotará em registro próprio todas as ocorrências relacionadas à execução do contrato, determinando o que for necessário para a regularização das faltas ou dos defeitos observados.'),
 'l14133_117p2':('lei14133_senado.txt','O fiscal do contrato informará a seus superiores, em tempo hábil para a adoção das medidas convenientes, a situação que demandar decisão ou providência que ultrapasse sua competência.'),
 # ---- NIST SP 800-145 (modelos de servico em nuvem)
 'nist_saas':('nist800145.txt','Software as a Service (SaaS). The capability provided to the consumer is to use the provider’s applications running on a cloud infrastructure'),
 'nist_paas':('nist800145.txt','Platform as a Service (PaaS). The capability provided to the consumer is to deploy onto the cloud infrastructure consumer-created or acquired applications'),
 'nist_iaas':('nist800145.txt','Infrastructure as a Service (IaaS). The capability provided to the consumer is to provision processing, storage, networks, and other fundamental computing resources'),
 'nist_iaas2':('nist800145.txt','The consumer does not manage or control the underlying cloud infrastructure but has control over operating systems, storage, and deployed applications'),
 # ---- PostgreSQL
 'pg_pitr':('pg_pitr.clean.txt','this technique supports point-in-time recovery: it is possible to restore the database to its state at any time since your base backup was taken.'),
 'pg_test':('pg_pitr.clean.txt','you should set up and test your procedure for archiving WAL files before you take your first base backup.'),
 'pg_wal':('pg_pitr.clean.txt','you need a continuous sequence of archived WAL files that extends back at least as far as the start time of your backup.'),
 'pg_dump':('pg_dump_doc.clean.txt','Dumps created by pg_dump are internally consistent, meaning, the dump represents a snapshot of the database at the time pg_dump began running.'),
 # ---- Python, OWASP, RFC (SQL injection, senhas, JWT)
 'py_inject':('py_sqlite3.clean.txt','Always use placeholders instead of string formatting to bind Python values to SQL statements, to avoid SQL injection attacks'),
 'py_never':('py_sqlite3.clean.txt',"an attacker can simply close the single quote and inject OR TRUE to select all rows"),
 'owasp_sqli':('owasp_sqli.clean.txt','SQL injection occurs when untrusted data becomes part of a query\'s SQL syntax.'),
 'owasp_prep':('owasp_sqli.clean.txt','Prepared statements treat bound values as data rather than SQL syntax.'),
 'owasp_priv':('owasp_sqli.clean.txt','DO NOT ASSIGN DBA OR ADMIN TYPE ACCESS TO YOUR APPLICATION ACCOUNTS.'),
 'owasp_pwd':('owasp_pwd.clean.txt','Passwords should never be stored in plain text.'),
 'owasp_pwd2':('owasp_pwd.clean.txt','they must be protected using strong, slow hashing algorithms such as Argon2id, bcrypt, or PBKDF2.'),
 'owasp_salt':('owasp_pwd.clean.txt','A unique salt must be added to each password to prevent attackers from using precomputed lookup tables like rainbow tables.'),
 'owasp_fast':('owasp_pwd.clean.txt','Fast hashing algorithms such as SHA‑256 are not suitable for password storage'),
 'jwt_def':('rfc7519.txt','JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties.'),
 'jwt_exp':('rfc7519.txt','The "exp" (expiration time) claim identifies the expiration time on or after which the JWT MUST NOT be accepted for processing.'),
 'rfc9110_401':('rfc9110.txt','The 401 (Unauthorized) status code indicates that the request has not been applied because it lacks valid authentication credentials for the target resource.'),
 # ---- criptografia e VPN
 'aes':('fips197.txt','The AES algorithm is a symmetric block cipher that can encrypt (encipher) and decrypt (decipher) digital information.'),
 'rsa':('rfc8017.txt','This document provides recommendations for the implementation of public-key cryptography based on the RSA algorithm'),
 'ipsec':('rfc4301.txt','which is designed to provide security services for traffic at the IP layer.'),
 # ---- PHP (Manual oficial)
 'php_filter_input':('php_filter_input.clean.txt','filter_input — Gets a specific external variable by name and optionally filters it'),
 'php_special':('php_filter_sanitize.clean.txt','This filter HTML-encodes \', ", <, >, & and characters with an ASCII value less than 32.'),
 'php_prepare':('php_mysqli_prepare.clean.txt','The statement template can contain zero or more question mark (?) parameter markers'),
 'php_construct':('php_mysqli_construct.clean.txt','Opens a connection to the MySQL Server.'),
 'php_hash':('php_password_hash.clean.txt','password_hash() creates a new password hash using a strong one-way hashing algorithm.'),
 'php_isset':('php_isset.clean.txt','Determine if a variable is considered set, this means if a variable is declared and is different than null.'),
 # ---- CI/CD e rede
 'gl_scan':('gitlab_appsec.clean.txt','During development, scans run automatically as part of CI/CD pipelines when code is committed or merge requests are created.'),
 'jk_plugins':('jenkins_plugins.clean.txt','Plugins are the primary means of enhancing the functionality of a Jenkins environment to suit organization- or user-specific needs.'),
 'bond_8023ad':('linux_bonding.clean.txt','IEEE 802.3ad Dynamic link aggregation. Creates aggregation groups that share the same speed and duplex settings.'),
 'wiki_stp_loop':('wiki_stp.clean.txt','However, this connection configuration creates a switching loop resulting in broadcast radiations and MAC table instability.'),
 'wiki_stp_block':('wiki_stp.clean.txt','The spanning-tree algorithm then blocks forwarding on redundant links by setting up one preferred link between switches in the LAN.'),
 'wiki_rstp':('wiki_stp.clean.txt','RSTP provides significantly faster recovery in response to network changes or failures'),
 'wiki_lag':('wiki_lacp.clean.txt','Link aggregation increases total bandwidth beyond what a single connection could sustain, and provides redundancy where all but one of the physical links may fail without losing connectivity.'),
 'wiki_lacp_std':('wiki_lacp.clean.txt','Link Aggregation Control Protocol (LACP) for Ethernet, defined in IEEE 802.1AX or the previous IEEE 802.3ad'),
 # ---- enunciados reais (TRF-4 2019, caderno 04 tipo 001; TRT-20 2024, pagina do agregador)
 'trf4_ed103':('trf4_2019_prova.txt','10.3 A Prova Estudo de Caso destinar-se-á a avaliar o domínio de conteúdo dos temas abordados, a experiência prévia do candidato e sua adequabilidade quanto às atribuições do cargo e especialidade.'),
 'trf4_ed109':('trf4_2019_prova.txt','10.9 Na Prova Estudo de Caso, deverá ser rigorosamente observado o limite máximo de 20 (vinte) linhas, sob pena de perda de pontos a serem atribuídos ao Estudo de Caso.'),
 'trf4_ed1011':('trf4_2019_prova.txt','10.11 A grade de correção/máscara de critérios contendo a abordagem/requisitos de respostas definida pela Banca Examinadora, as respostas apresentadas pelo candidato e a pontuação obtida pelo candidato serão divulgadas por ocasião da Vista da Prova Estudo de Caso.'),
 'trf4_ed105':('trf4_2019_prova.txt','Cada uma das questões será avaliada na escala de 0 (zero) a 10 (dez) pontos, considerando-se habilitado o candidato que tiver obtido, no conjunto das duas questões, média igual ou superior a 5 (cinco).'),
 'trt20_ed':('gran2024_pagina.txt','11.2 A prova discursiva Estudo de caso constará de 01 (uma) questão prática'),
 'trt20_prova':('gran2024_pagina.txt','FCC - TRT 20 - Analista Judiciário - Área Tecnologia da Informação - 2024'),
 'trt20_lim':('gran2024_pagina.txt','11.12 Na Prova Discursiva-Estudo de Caso, deverá ser rigorosamente observado o limite máximo de 15 (quinze) linhas'),
}
def text(f):
    return norm(open(os.path.join(FONTES,f),encoding='utf-8',errors='ignore').read())
_cache={}
def check(k):
    f,t=Q[k]
    if f not in _cache: _cache[f]=text(f)
    return norm(t) in _cache[f]
def get(k):
    return norm(Q[k][1]) if check(k) else None
