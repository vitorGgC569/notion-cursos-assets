# L5: confere o gabarito das questoes contra o texto oficial atual. Cada linha: a afirmacao que sustenta a resposta
# (frase literal que deve existir no texto baixado) e, quando for o caso, uma frase que NAO pode constar.
import sys,re; sys.path.insert(0,'.'); import quotes
T=quotes.txt
# (rotulo, arquivo, [frases que devem existir], [frases que nao podem existir])
C=[
('REAL TRT-4 q27 (E, anonimizado)','lgpd_atual',['III - dado anonimizado: dado relativo a titular que não possa ser identificado, considerando a utilização de meios técnicos razoáveis e disponíveis na ocasião de seu tratamento'],[]),
('REAL TRT-4 q28 (B, nao precisa ser escrito)','lgpd_atual',['por escrito ou por outro meio','Cabe ao controlador o ônus da prova','as autorizações genéricas para o tratamento de dados pessoais serão nulas','dispensada a exigência do consentimento previsto no caput deste artigo para os dados tornados manifestamente públicos pelo titular'],[]),
('REAL TRT-5 q18 (B, jornalistico e artistico)','lgpd_atual',['II - realizado para fins exclusivamente: a) jornalístico e artísticos'],[]),
('REAL TRT-5 q19 (A, adequacao)','lgpd_atual',['II - adequação: compatibilidade do tratamento com as finalidades informadas ao titular'],[]),
('REAL TRT-5 q47 (A, certificado A1)','mp2200_atual',[],['A1','12 meses']),
('REAL TRT-23 q18 (A, nulo)','lgpd_atual',['esse será considerado nulo caso as informações fornecidas ao titular tenham conteúdo enganoso ou abusivo ou não tenham sido apresentadas previamente com transparência'],[]),
('REAL TRT-22 q37 (D, I, III e IV)','lgpd_atual',['dado pessoal sensível: dado pessoal sobre origem racial ou étnica, convicção religiosa, opinião política, filiação a sindicato ou a organização de caráter religioso, filosófico ou político'],['dado pessoal sensível: dado pessoal sobre identificação']),
('AUT Ex1 necessidade','lgpd_atual',['III - necessidade: limitação do tratamento ao mínimo necessário'],[]),
('AUT Ex2 pseudonimizacao','lgpd_atual',['informação adicional mantida separadamente pelo controlador em ambiente controlado e seguro'],[]),
('AUT Ex3 art. 46 par. 2','lgpd_atual',['desde a fase de concepção do produto ou do serviço até a sua execução'],[]),
('AUT Ex4 art. 48 par. 3','lgpd_atual',['tornem os dados pessoais afetados ininteligíveis','não autorizados a acessá-los'],[]),
('AUT Ex5 MCI art. 13','mci_atual',['pelo prazo de 1 (um) ano','não poderá ser transferida a terceiros'],[]),
('AUT Ex6 MCI art. 14','mci_atual',['é vedado guardar os registros de acesso a aplicações de internet'],[]),
('AUT Ex7 MCI art. 19 e STF','mci_atual',['ordem judicial específica','tornar indisponível o conteúdo apontado como infringente'],[]),
('AUT Ex7 STF (noticia)','stf',['parcialmente inconstitucional','RE 1037396','Tema 987'],[]),
('AUT Ex8 MP 2.200-2 art. 6','mp2200_atual',['gerado sempre pelo próprio titular','exclusivo controle, uso e conhecimento'],[]),
('AUT Ex9 Lei 14.063 art. 4 III','lei14063',['III - assinatura eletrônica qualificada: a que utiliza certificado digital'],[]),
('AUT Ex10 RN 5/2024 art. 16 par. 3','rn5_2024',['Não poderá atuar como encarregado o servidor','gestão financeira, de pessoas ou de tecnologia da informação'],[]),
('AUT Ex11 RN 13/2016 quorum','rn13_2016',['quórum mínimo de 4 (quatro) membros','será de 50% (cinquenta por cento) mais um','quórum mínimo de 04 membros'],[]),
('AUT Ex12 PDTI vigencia','pdti',['24 meses, compreendendo janeiro de 2025 a dezembro de 2026','2021-2030'],[]),
('AUT Ex13 RA 14/2025 art. 27 e 30','ra14_2025',['IV - Serviço de Inteligência Artificial','ambiente corporativo de big data','repositório de dados (Data Lake)'],[]),
('AUT Ex14 LC 205 art. 4','lc205',['salvo justificativa técnica apresentada pelo órgão responsável','a competitividade, a auditabilidade'],[]),
('AUT Sim1 LGPD art. 4 I','lgpd_atual',['I - realizado por pessoa natural para fins exclusivamente particulares e não econômicos'],[]),
('AUT Sim3 LGPD art. 41','lgpd_atual',['deverão ser divulgadas publicamente, de forma clara e objetiva, preferencialmente no sítio eletrônico do controlador'],[]),
('AUT Sim4 LGPD art. 37 e 38','lgpd_atual',['Art. 37. O controlador e o operador devem manter registro das operações','a descrição dos tipos de dados coletados, a metodologia utilizada para a coleta e para a garantia da segurança das informações'],[]),
('AUT Sim5 LGPD art. 52 II','lgpd_atual',['limitada, no total, a R$ 50.000.000,00 (cinquenta milhões de reais) por infração'],[]),
('AUT Sim6 LGPD art. 7 III','lgpd_atual',['III - pela administração pública, para o tratamento e uso compartilhado de dados necessários à execução de políticas públicas'],[]),
('AUT Sim7 MCI art. 15','mci_atual',['pelo prazo de 6 (seis) meses','deverá ser precedida de autorização judicial'],[]),
('AUT Sim8 MCI art. 10','mci_atual',['mediante ordem judicial','qualificação pessoal, filiação e endereço'],[]),
('AUT Sim9 MCI art. 9','mci_atual',['tratar de forma isonômica quaisquer pacotes de dados','requisitos técnicos indispensáveis','priorização de serviços de emergência'],[]),
('AUT Sim10 MP art. 13','mp2200_atual',['O ITI é a Autoridade Certificadora Raiz'],[]),
('AUT Sim11 Lei 14.063 art. 5 par. 2','lei14063',['É obrigatório o uso de assinatura eletrônica qualificada: I - nos atos assinados por chefes de Poder, por Ministros de Estado'],[]),
('AUT Sim12 RA 17/2024 art. 7','ra17_2024',['NBR ISO/IEC 27001:2022'],[]),
('AUT Sim13 IN 94 itens 7.1 e 7.4','in94',['7.4. A Equipe de Planejamento da Contratação deve garantir que o contrato contenha sanções administrativas pelo descumprimento','7.1. O Termo de Referência para contratação de Soluções de TIC deve conter, no que couber ao objeto contratado'],[]),
('AUT Sim14 LC 205 art. 12','lc205',['IV – direito à revisão humana das decisões, em recurso','a revisão humana das decisões será prévia à sua efetivação'],[]),
('AUT Sim15 LC 205 art. 42','lc205',['possibilidade técnica de intervenção imediata ( kill switch)','consentimento prévio informado'],[]),
('AUT Sim16 PDTI criterios','pdti',['Alta 2,5','Média 5','Baixa 10','Logo, menor a pontuação'],[]),
]
ok=0;bad=0;nt=0
for rot,f,deve,nao in C:
    if rot.startswith('REAL TRT-5 q47'):
        presentes=[x for x in nao if x in T(f)]
        print('NAO TESTADO  %s: o prazo do certificado A1 nao consta na MP 2.200-2 (frases buscadas presentes: %s). Vale so o gabarito oficial da FCC; as normas da ICP-Brasil nao foram abertas.'%(rot,presentes or 'nenhuma'))
        nt+=1; continue
    faltam=[x for x in deve if x not in T(f)]; indevidas=[x for x in nao if x in T(f)]
    if faltam or indevidas: bad+=1; print('FALHA %s | faltam: %s | indevidas: %s'%(rot,faltam,indevidas))
    else: ok+=1; print('OK    %s (%d frase(s))'%(rot,len(deve)+len(nao)))
print('\nquestoes conferidas: %d OK, %d FALHA, %d nao testada'%(ok,bad,nt))
sys.exit(1 if bad else 0)
