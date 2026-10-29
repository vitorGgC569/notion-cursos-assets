# -*- coding: utf-8 -*-
# Citacoes literais extraidas dos textos oficiais baixados (src/*.clean.txt). Nada e redigitado.
import re,os
D=os.path.join(os.path.dirname(os.path.abspath(__file__)),'fontes')
_c={}
def txt(f):
    if f not in _c: _c[f]=re.sub(r'\s+',' ',open(os.path.join(D,f+'.clean.txt')).read())
    return _c[f]
SPEC=[ # key, arquivo, inicio, fim (inclusive)
('l112','lei16168','Art. 112. O Tribunal de Contas poderá aplicar multa de até R$','Resolução Normativa nº 2/2026-TCE.'),
('l13','lei16168','Art. 13. Considerar-se-á eleito: I','pelo menos quatro votos;'),
('l14','lei16168','Art. 14. A posse dos eleitos','até o dia 21 de dezembro.'),
('l25','lei16168','Art. 25. Os Auditores, mediante convocação prévia','vacância do cargo ou outro afastamento legal.'),
('l129','lei16168','Art. 129. De decisão definitiva em processo de prestação ou tomada de contas','dentro do prazo de 5 (cinco) anos,'),
('l128','lei16168','Art. 128. De despacho decisório','cabe agravo, no prazo de 10 (dez) dias,'),
('ri113p2','ri','§2º Para obtenção do quórum','até 3 (três) Auditores'),
('ra14a3','ra14_2025','Art. 3º O Tribunal Pleno é o órgão colegiado máximo','corpo deliberativo do TCE-GO.'),
('l20756a20','lei20756','§ 1º A posse deve ocorrer no prazo de 30','por mais 15'),
('ra1a14','ra1_2014','Art. 14. As situações de conflito de interesses','do desligamento'),
('l126','lei16168','Art. 126. Cabe pedido de reexame','fiscalização de atos e contratos.'),
('ri2','ri','Art. 2º O controle externo, a cargo da Assembleia Legislativa','a este competindo:'),
('ri2xxiv','ri','XXIV- decidir a respeito do ato de sustação do contrato','medidas que lhe forem cabíveis'),
('cf37','cf88','Art. 37. A administração pública direta e indireta','e eficiência e, também, ao seguinte:'),
('cf70','cf88','Art. 70. A fiscalização contábil','cada Poder.'),
('cf71','cf88','Art. 71. O controle externo, a cargo do Congresso Nacional','Tribunal de Contas da União,'),
('cf75','cf88','Art. 75. Os Tribunais de Contas são instituições permanentes','criação ou instalação.'),
('ce25','ce','Art. 25. A ﬁscalização contábil','de cada Poder.'),
('ce26','ce','Art. 26. Ao Tribunal de Contas do Estado compete: I -','publicado no Diário Oficial do Estado;'),
('ce26s2','ce','§ 2o Se a Assembleia Legislativa ou o Poder Executivo, no prazo de noventa dias','o Tribunal decidirá a respeito.'),
('ce26s3','ce','§ 3o As decisões do Tribunal de que resulte imputação de débito ou multa','eficácia de título executivo.'),
('ce28','ce','Art. 28. O Tribunal de Contas do Estado, integrado por sete conselheiros','previstas no art. 46 desta Constituição.'),
('l6','lei16168','Art. 6º O Tribunal de Contas do Estado de Goiás tem sede em Goiânia','7 (sete) Conselheiros.'),
('l9','lei16168','Art. 9º O Plenário do Tribunal de Contas, órgão máximo de deliberação','empate e nas eleições.'),
('l10','lei16168','Art. 10. O Tribunal de Contas divide-se em duas Câmaras','Presidente do Tribunal.'),
('l17i','lei16168','Art. 17. Os Conselheiros do Tribunal de Contas do Estado de Goiás são nomeados pelo Governador','I – ter mais de 35 (trinta e cinco) e menos de 65 (sessenta e cinco) anos de idade;'),
('l21','lei16168','Art. 21. Cada Conselheiro, com exceção do Presidente','ou do Plenário.'),
('l24','lei16168','Art. 24. Os Auditores, em número de 7 (sete)','em que será exigido curso superior.'),
('l46','lei16168','Art. 46. Nos processos serão observados','segurança jurídica.'),
('l55','lei16168','Art. 55. Os prazos referidos nesta Lei serão contados em dias úteis','incluindo o dia do vencimento,'),
('l56','lei16168','Art. 56. As contas anuais prestadas pelo Governador','abertura da sessão legislativa.'),
('l57','lei16168','Art. 57. As contas de que trata esta seção serão apreciadas','imediatamente encaminhadas à Assembléia Legislativa.'),
('l66','lei16168','Art. 66. A decisão em processo de prestação ou de tomada de contas','preliminar, definitiva ou terminativa.'),
('l66s2','lei16168','§ 2º Definitiva é a decisão pela qual o Tribunal julga as contas','regulares com ressalva ou irregulares.'),
('l67','lei16168','Art. 67. Verificada irregularidade nas contas','no prazo de 15 (quinze) dias, apresente alegações de defesa ou recolha a quantia devida,'),
('l69','lei16168','Art. 69. O Tribunal julgará as tomadas e prestações de contas','lhe tiverem sido apresentadas.'),
('l70','lei16168','Art. 70. Ao julgar as contas, o Tribunal decidirá','regulares com ressalva ou irregulares.'),
('l79','lei16168','Art. 79. A decisão do Tribunal de Contas, de que resulte imputação de débito','eficácia de título executivo.'),
('l80','lei16168','Art. 80. O responsável será intimado para efetuar e comprovar, no prazo de 15 (quinze) dias','multa.'),
('l87','lei16168','Art. 87. Qualquer cidadão, partido político, associação ou sindicato é parte legítima','perante o Tribunal de Contas.'),
('l107a','lei16168','Art. 107-A. Prescreve em 5 (cinco) anos','a seu cargo.'),
('l107a3','lei16168','§ 3º Interrompem a prescrição:','II – a interposição de recurso.'),
('l108','lei16168','Art. 108. O Plenário decidirá sobre consultas','concernentes à matéria de sua competência,'),
('l111','lei16168','Art. 111. Quando o responsável for julgado em débito','dano causado ao erário.'),
('l114','lei16168','Art. 114. Sem prejuízo das sanções previstas nos arts. 111 e 112','administração pública estadual.'),
('l115','lei16168','Art. 115. Verificada a ocorrência de fraude comprovada à licitação','administração pública estadual.'),
('l117','lei16168','Art. 117. Nas mesmas circunstâncias do art. 116','ressarcimento do dano em apuração.'),
('l120','lei16168','Art. 120. Cabem os seguintes recursos','IV – agravo.'),
('l125','lei16168','Art. 125. De decisão definitiva em processo de prestação ou tomada de contas, mesmo especial, cabe recurso de reconsideração','prevista no art. 55 desta Lei.'),
('l127','lei16168','Art. 127. Cabem embargos de declaração','contradição em acórdão do Tribunal de Contas.'),
('l127s1','lei16168','§ 1º Os embargos de declaração serão opostos por escrito','art. 55 desta Lei.'),
('l128','lei16168','Art. 128. De despacho decisório do Presidente do Tribunal de Contas','art. 55, ambos desta Lei,'),
('l129','lei16168','Art. 129. De decisão definitiva em processo de prestação ou tomada de contas, mesmo especial, cabe pedido de revisão ao Plenário','art. 55 desta Lei,'),
('ri113','ri','Art. 113. As Sessões do Plenário serão Ordinárias e Extraordinárias','incluído o Presidente.'),
('ri113p1','ri','§1º Para deliberação das matérias de sua competência o Plenário','incluído o Presidente.'),
('ri3','ri','Art. 3º Ao Tribunal de Contas do Estado, no âmbito de sua competência e jurisdição, assiste o poder regulamentar','sob pena de responsabilidade.'),
('ra14a2','ra14_2025','Art. 2º A estrutura organizacional do Tribunal de Contas do Estado de Goiás (TCE-GO) compõe-se','VII - Unidades Colegiadas: a) Comitês e Comissões permanentes.'),
('ra17a7','ra17_2024','Art. 7º Os critérios para gestão da segurança da informação','NBR ISO/IEC 27001:2022'),
('ra17a18','ra17_2024','Art. 18. O Comitê de Segurança da Informação deve ser instituído bienalmente pela Presidência.','bienalmente pela Presidência.'),
('rn5a16','rn5_2024','Art. 16. O Presidente do TCE-GO indicará o encarregado','tratamento de dados pessoais.'),
('ra19a3','ra19_2024','Art. 3º A gestão, a implementação, o desenvolvimento e a revisão da Política de Comunicação','Diretoria de Comunicação.'),
('ra15a2','ra15_2024','Art. 2º O sistema de planejamento e gestão consiste','missão institucional e o alcance da visão de futuro do TCE-GO.'),
('ra15p','ra15_2024','Parágrafo único. Para os fins desta Resolução, os planos institucionais compreendem','os planos diretores.'),
('ra5a2','ra5_2024','Art. 2º Esta Política de Gestão de Pessoas tem como finalidade','objetivos estratégicos da instituição.'),
('lei15122a6','lei15122','I – executar atividades de apoio técnico e administrativo','Estado de Goiás;'),
]
def get(key):
    for k,f,a,b in SPEC:
        if k==key:
            t=txt(f); i=t.find(a)
            if i<0: return None
            j=t.find(b,i)
            if j<0: return None
            return t[i:j+len(b)]
def all_():
    return {k:(get(k),f) for k,f,a,b in SPEC}
if __name__=='__main__':
    for k,(v,f) in all_().items(): print(('OK  ' if v else 'FALHA ')+k, len(v) if v else '')
