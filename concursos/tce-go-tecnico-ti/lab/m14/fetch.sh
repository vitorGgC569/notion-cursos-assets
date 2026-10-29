#!/bin/bash
# Baixa as fontes em ingles usadas no modulo 14 (requer rede). As copias usadas nas saidas ficam em fontes/.
# Os HTML sao reduzidos a texto com o trecho em Python abaixo (sem bibliotecas externas).
cd "$(dirname "$0")/fontes" || exit 1
while IFS='|' read -r f url; do
  code=$(curl -s -m 60 -L -A "Mozilla/5.0" -o "$f" -w "%{http_code}" "$url"); echo "$f $code $url"
done <<'L'
rfc2119.txt|https://www.rfc-editor.org/rfc/rfc2119.txt
rfc9110.txt|https://www.rfc-editor.org/rfc/rfc9110.txt
semver.html|https://semver.org/
mdn_status.html|https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
keepachangelog.html|https://keepachangelog.com/en/1.1.0/
py_venv.html|https://docs.python.org/3/tutorial/venv.html
git_commit.html|https://git-scm.com/docs/git-commit
man_curl.html|https://man7.org/linux/man-pages/man1/curl.1.html
openapi.html|https://spec.openapis.org/oas/v3.1.0.html
pg_backup.html|https://www.postgresql.org/docs/current/backup-dump.html
L
python3 - <<'P'
import re,html,glob
for f in glob.glob('*.html'):
    s=open(f,encoding='utf-8',errors='ignore').read()
    s=re.sub(r'<(script|style|nav|header|footer)[^>]*>.*?</\1>','',s,flags=re.S)
    s=re.sub(r'<br\s*/?>|</(p|li|h\d|div|tr|dt|dd|pre|section)>','\n',s)
    s=html.unescape(re.sub(r'<[^>]+>','',s))
    s=re.sub(r'[ \t\xa0]+',' ',s); s=re.sub(r'\n\s*\n+','\n',s)
    open(f[:-5]+'.clean.txt','w',encoding='utf-8').write(s)
P
rm -f ./*.html
