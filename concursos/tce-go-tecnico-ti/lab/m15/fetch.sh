#!/bin/bash
# Baixa as fontes publicas usadas no modulo 15 (requer rede). As copias ficam em fontes/.
# As paginas HTML sao reduzidas a texto com o trecho em Python abaixo (sem bibliotecas externas).
cd "$(dirname "$0")/fontes" || exit 1
while IFS='|' read -r f url; do
  code=$(curl -s -m 90 -L -A "Mozilla/5.0" -o "$f" -w "%{http_code}" "$url"); echo "$f $code $url"
done <<'L'
lgpd.html|https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html
lei14133_senado.pdf|https://www2.senado.leg.br/jspui/bitstream/id/962232/1/Lei_licitacoes_contratos_administrativos_6ed_2026.pdf
nist800145.pdf|https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-145.pdf
pg_dump_doc.html|https://www.postgresql.org/docs/current/backup-dump.html
pg_pitr.html|https://www.postgresql.org/docs/current/continuous-archiving.html
py_sqlite3.html|https://docs.python.org/3/library/sqlite3.html
owasp_sqli.html|https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html
owasp_pwd.html|https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
rfc7519.txt|https://www.rfc-editor.org/rfc/rfc7519.txt
rfc9110.txt|https://www.rfc-editor.org/rfc/rfc9110.txt
rfc4301.txt|https://www.rfc-editor.org/rfc/rfc4301.txt
rfc8017.txt|https://www.rfc-editor.org/rfc/rfc8017.txt
fips197.pdf|https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.197-upd1.pdf
gitlab_appsec.html|https://docs.gitlab.com/ee/user/application_security/
jenkins_plugins.html|https://www.jenkins.io/doc/book/managing/plugins/
linux_bonding.html|https://www.kernel.org/doc/html/latest/networking/bonding.html
wiki_stp.html|https://en.wikipedia.org/wiki/Spanning_Tree_Protocol
wiki_lacp.html|https://en.wikipedia.org/wiki/Link_aggregation
php_filter_input.html|https://www.php.net/manual/en/function.filter-input.php
php_filter_sanitize.html|https://www.php.net/manual/en/filter.constants.sanitization.php
php_mysqli_construct.html|https://www.php.net/manual/en/mysqli.construct.php
php_mysqli_prepare.html|https://www.php.net/manual/en/mysqli.prepare.php
php_password_hash.html|https://www.php.net/manual/en/function.password-hash.php
php_isset.html|https://www.php.net/manual/en/function.isset.php
anpd15.html|https://bibliotecadigital.mj.gov.br/bitstream/1/12879/2/RES_ANPD_2024_15.html
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
pdftotext -layout nist800145.pdf nist800145.txt 2>/dev/null; pdftotext fips197.pdf fips197.txt 2>/dev/null; pdftotext lei14133_senado.pdf lei14133_senado.txt 2>/dev/null
