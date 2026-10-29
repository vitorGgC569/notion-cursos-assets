# -*- coding: utf-8 -*-
# Citacoes literais extraidas dos textos oficiais baixados (fontes/*.clean.txt). Nada e redigitado:
# cada trecho abaixo e localizado por um inicio e um fim e recortado do arquivo.
import re,os
D=os.path.join(os.path.dirname(os.path.abspath(__file__)),'fontes')
_c={}
def txt(f):
    if f not in _c: _c[f]=re.sub(r'\s+',' ',open(os.path.join(D,f+'.clean.txt'),encoding='utf-8').read())
    return _c[f]
SPEC=[ # chave, arquivo, inicio, fim (inclusive)
('lgpd5iii','lgpd_atual','dado anonimizado:','na ocasião de seu tratamento;'),
('lgpd5xi','lgpd_atual','anonimização: utilização','a um indivíduo;'),
('lgpd5xii','lgpd_atual','XII - consentimento:','para uma finalidade determinada;'),
('lgpd6iii','lgpd_atual','III - necessidade:','dados pertinentes, proporcionais e não excessivos em relação às finalidades do tratamento de dados;'),
('lgpd8p1','lgpd_atual','§ 1º Caso o consentimento seja fornecido por escrito','demais cláusulas contratuais.'),
('lgpd8p2','lgpd_atual','§ 2º Cabe ao controlador o ônus da prova','nesta Lei.'),
('lgpd8p4','lgpd_atual','§ 4º O consentimento deverá referir-se a finalidades determinadas','serão nulas.'),
('lgpd12','lgpd_atual','Art. 12. Os dados anonimizados não serão considerados dados pessoais','esforços razoáveis, puder ser revertido.'),
('lgpd13p4','lgpd_atual','§ 4º Para os efeitos deste artigo, a pseudonimização','ambiente controlado e seguro.'),
('lgpd37','lgpd_atual','Art. 37. O controlador e o operador devem manter registro','legítimo interesse.'),
('lgpd39','lgpd_atual','Art. 39. O operador deverá realizar o tratamento segundo as instruções','das próprias instruções e das normas sobre a matéria.'),
('lgpd46','lgpd_atual','Art. 46. Os agentes de tratamento devem adotar medidas de segurança','tratamento inadequado ou ilícito.'),
('lgpd46p2','lgpd_atual','§ 2º As medidas de que trata o caput deste artigo deverão ser observadas','até a sua execução.'),
('lgpd48','lgpd_atual','Art. 48. O controlador deverá comunicar à autoridade nacional e ao titular','risco ou dano relevante aos titulares.'),
('lgpd48p3','lgpd_atual','§ 3º No juízo de gravidade do incidente','não autorizados a acessá-los.'),
('lgpd49','lgpd_atual','Art. 49. Os sistemas utilizados para o tratamento de dados pessoais','às demais normas regulamentares.'),
('lgpd41','lgpd_atual','Art. 41. O controlador deverá indicar encarregado','tratamento de dados pessoais.'),
('lgpd52ii','lgpd_atual','II - multa simples, de até 2% (dois por cento) do faturamento','por infração;'),
('lgpd4i','lgpd_atual','I - realizado por pessoa natural para fins exclusivamente particulares e não econômicos;',None),
('lgpd16','lgpd_atual','Art. 16. Os dados pessoais serão eliminados após o término de seu tratamento','desde que anonimizados os dados.'),
('mci13','mci_atual','Art. 13. Na provisão de conexão à internet, cabe ao administrador de sistema autônomo','pelo prazo de 1 (um) ano, nos termos do regulamento.'),
('mci14','mci_atual','Art. 14. Na provisão de conexão, onerosa ou gratuita, é vedado guardar','aplicações de internet.'),
('mci15','mci_atual','Art. 15. O provedor de aplicações de internet constituído na forma de pessoa jurídica','pelo prazo de 6 (seis) meses, nos termos do regulamento.'),
('mci19','mci_atual','Art. 19. Com o intuito de assegurar a liberdade de expressão','ressalvadas as disposições legais em contrário.'),
('mci9','mci_atual','Art. 9º O responsável pela transmissão, comutação ou roteamento tem o dever','terminal ou aplicação.'),
('mci10p1','mci_atual','§ 1º O provedor responsável pela guarda somente será obrigado a disponibilizar os registros','mediante ordem judicial,'),
('mci21','mci_atual','Art. 21. O provedor de aplicações de internet que disponibilize conteúdo gerado por terceiros será responsabilizado subsidiariamente','nudez ou de atos sexuais de caráter privado'),
('mp1','mp2200_atual','Art. 1º Fica instituída a Infra-Estrutura de Chaves Públicas Brasileira - ICP-Brasil','transações eletrônicas seguras.'),
('mp6p','mp2200_atual','Parágrafo único. O par de chaves criptográficas será gerado sempre pelo próprio titular','exclusivo controle, uso e conhecimento.'),
('mp10p1','mp2200_atual','§ 1º As declarações constantes dos documentos em forma eletrônica','presumem-se verdadeiros em relação aos signatários'),
('mp10p2','mp2200_atual','§ 2º O disposto nesta Medida Provisória não obsta','aceito pela pessoa a quem for oposto o documento.'),
('mp13','mp2200_atual','Art. 13. O ITI é a Autoridade Certificadora Raiz','Brasileira.'),
('l14063i','lei14063','I - assinatura eletrônica simples:','do signatário;'),
('l14063iii','lei14063','III - assinatura eletrônica qualificada:','da Medida Provisória nº 2.200-2, de 24 de agosto de 2001.'),
('l14063p2','lei14063','§ 2º É obrigatório o uso de assinatura eletrônica qualificada: I - nos atos assinados por chefes de Poder','titulares de Poder ou de órgão constitucionalmente autônomo de ente federativo;'),
('rn13a1','rn13_2016','Art. 1º Instituir, no âmbito do TCE-GO, o Comitê Estratégico de Tecnologia de Informação (CETI)','consultiva e caráter permanente'),
('rn13a3','rn13_2016','Art. 3º O Comitê será composto por até 11 (dez) membros','4 (quatro) suplentes.'),
('rn13a9ii','rn13_2016','II - quórum mínimo de 4 (quatro) membros para início da reunião e votação;',None),
('rn13a9iii','rn13_2016','III - vedação de abstenção de voto',  'reuniões do CETI;'),
('rn13a13','rn13_2016','Art. 13. O quórum requerido para a realização das reuniões','mais um do total de seus membros.'),
('rn13a11','rn13_2016','Art. 11. A convocação para reunião do CETI ocorrerá com, no mínimo, 5 (cinco) dias','matérias urgentes.'),
('rn13a19p3','rn13_2016','§3º A aprovação da demanda pelo Comitê Estratégico de Tecnologia da Informação é indispensável','exame prévio.'),
('ra14_24a4','ra14_2024','Art. 4º Constituem princípios da governança no TCE-GO:','IX - capacidade de resposta.'),
('ra14_24a6','ra14_2024','Art. 6º São mecanismos para o exercício da governança institucional:','III - controle.'),
('ra17a7','ra17_2024','Art. 7º Os critérios para gestão da segurança da informação','requisitos legais aplicáveis e subscritos pelo TCE-GO.'),
('ra17a14','ra17_2024','Art. 14. São responsabilidades de parceiros e terceiros','instrumento congênere.'),
('ra17a17','ra17_2024','Art. 17. No âmbito do TCE-GO, em atendimento ao estabelecido no art. 41','Encarregado pelo Tratamento de Dados Pessoais (Data Protection Officer - DPO).'),
('ra17a18','ra17_2024','Art. 18. O Comitê de Segurança da Informação deve ser instituído bienalmente pela Presidência.',None),
('ra14_25a27','ra14_2025','Art. 27. A Diretoria de Tecnologia da Informação tem por finalidade assessorar diretamente','tecnologia da informação no âmbito do Tribunal.'),
('ra14_25a27p1','ra14_2025','§ 1º Integram a Diretoria de Tecnologia da Informação:','IV - Serviço de Inteligência Artificial.'),
('rn5a9p3','rn5_2024','§ 3º O registro do CPF nas hipóteses previstas neste artigo','mascaramento ou de ocultação.'),
('rn5a16p3','rn5_2024','§3º Não poderá atuar como encarregado o servidor:','meios de tratamento de dados pessoais.'),
('lc205a4','lc205','Art. 4º O Poder Executivo dará preferência','apresentada pelo órgão responsável.'),
('lc205a12iv','lc205','IV – direito à revisão humana das decisões, em recurso.',None),
('lc205a12p5','lc205','§ 5º No caso da tomada de decisões que impactem na fruição de serviços públicos considerados essenciais','será prévia à sua efetivação.'),
('lc205a42ii','lc205','II – os mecanismos eficazes de supervisão humana mínima','situações emergenciais ou não previstas;'),
('lc205a79','lc205','Art. 79. Esta Lei Complementar entra em vigor','data de sua publicação.'),
('in94a1','in94','Art. 1º As contratações de soluções de Tecnologia da Informação e Comunicação - TIC pelos órgãos e entidades integrantes do Sistema de Administração dos Recursos de Tecnologia da Informação - SISP','esta Instrução Normativa.'),
('in94a18v','in94','V - elaboração dos seguintes modelos de documentos, em se tratando de contratações de serviços de TIC:','diretamente envolvidos na contratação.'),
('in94n421','in94','4.2.1. Os órgãos e entidades devem exigir mediante justificativa prévia','riscos relativos à segurança da informação.'),
('in94n71','in94','7.1. O Termo de Referência para contratação de Soluções de TIC deve conter','riscos de segurança da informação e privacidade.'),
('in94n74','in94','7.4. A Equipe de Planejamento da Contratação deve garantir que o contrato contenha sanções administrativas','que forem especificados.'),
('stf1','stf','definiu, nesta quinta-feira (26), que é parcialmente inconstitucional a regra do artigo 19 do Marco Civil da Internet','Lei 12.965/2014).'),
('stf2','stf','A questão foi debatida no Recurso Extraordinário (RE) 1037396 (Tema 987 da repercussão geral)','(Temas 533)'),
('anpd6','anpd15b','Art. 6º A comunicação de incidente de segurança à ANPD','três dias úteis,'),
('anpd9','anpd15b','Art. 9º A comunicação de incidente de segurança ao titular','três dias úteis'),
('rn5a18p1','rn5_2024','§ 1º A confirmação de existência ou o acesso a dados pessoais','no prazo de até 15 (quinze) dias,'),
]
def _find(f,a,b):
    t=txt(f); i=t.find(a)
    if i<0: return None
    if b is None: 
        j=t.find(';',i+len(a)); j=j if j>0 else i+len(a)+200
        return t[i:j+1] if False else t[i:i+len(a)]
    j=t.find(b,i+len(a)-1 if False else i)
    if j<0: return None
    return t[i:j+len(b)]
_Q={}
for k,f,a,b in SPEC: _Q[k]=(_find(f,a,b),f)
def get(k): return _Q[k][0]
def all_(): return _Q
