# -*- coding: utf-8 -*-
# L1: lista as fontes em ingles guardadas em fontes/ (tamanho, SHA-256 e URL de origem) e conta palavras de cada uma.
import os,hashlib,re
F=os.path.join(os.path.dirname(os.path.abspath(__file__)),'fontes')
URL={'rfc2119.txt':'https://www.rfc-editor.org/rfc/rfc2119.txt','rfc9110.txt':'https://www.rfc-editor.org/rfc/rfc9110.txt','semver.clean.txt':'https://semver.org/','mdn_status.clean.txt':'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status',
 'keepachangelog.clean.txt':'https://keepachangelog.com/en/1.1.0/','py_venv.clean.txt':'https://docs.python.org/3/tutorial/venv.html','git_commit.clean.txt':'https://git-scm.com/docs/git-commit','man_curl.clean.txt':'https://man7.org/linux/man-pages/man1/curl.1.html',
 'openapi.clean.txt':'https://spec.openapis.org/oas/v3.1.0.html','pg_backup.clean.txt':'https://www.postgresql.org/docs/current/backup-dump.html',
 'prova_tjce_p4.txt':'prova FCC TJ-CE 2022 (PDF do agregador eticaconcursos.com.br), p. 4','prova_alesp_p7_esq.txt':'prova FCC AL-SP 2010 (PDF do agregador estudegratis.com.br), p. 7, coluna esquerda','prova_alesp_p7_dir.txt':'prova FCC AL-SP 2010, p. 7, coluna direita',
 'gab_tjce.txt':'gabarito FCC TJ-CE 2022 (PDF do agregador)','gab_alesp.txt':'gabarito FCC AL-SP 2010 (PDF do agregador)'}
print('%-28s %9s %8s  %-12s %s'%('arquivo','bytes','palavras','sha256','origem'))
for f in sorted(URL):
    b=open(os.path.join(F,f),'rb').read(); w=len(re.findall(r"[A-Za-z']+",b.decode('utf-8','ignore')))
    print('%-28s %9d %8d  %-12s %s'%(f,len(b),w,hashlib.sha256(b).hexdigest()[:12],URL[f]))
print('\nBaixado em 28/10/2026 (fetch.sh). Paginas web mudam: o conteudo vale para essa data.')
