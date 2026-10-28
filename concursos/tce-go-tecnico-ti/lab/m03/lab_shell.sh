#!/usr/bin/env bash
# Pratica de shell Linux em uma pasta temporaria (nao altera nada fora dela).
set -e
D=$(mktemp -d); cd "$D"
echo "== 1. Arquivos, inodes e links =="
echo "relatorio de auditoria" > relatorio.txt
ln relatorio.txt link_duro.txt          # mesmo inode
ln -s relatorio.txt link_simbolico.txt  # novo inode, aponta pelo nome
ls -li
echo
echo "== 2. Permissões: chmod octal e simbólico =="
chmod 640 relatorio.txt; stat -c '%A %a %n' relatorio.txt
chmod u+x,g-r,o+r relatorio.txt; stat -c '%A %a %n' relatorio.txt
echo "umask atual: $(umask)  -> arquivo novo nasce com $(touch novo.txt; stat -c '%a' novo.txt)"
echo
echo "== 3. Pipes e filtros (grep, sort, uniq, wc, cut) =="
printf 'GET /a 200\nGET /b 404\nPOST /a 200\nGET /c 500\nGET /a 200\nGET /b 404\n' > acessos.log
echo "linhas com erro (4xx/5xx):"; grep -E ' (4|5)[0-9]{2}$' acessos.log
echo "contagem por status:";  cut -d' ' -f3 acessos.log | sort | uniq -c | sort -rn
echo "total de linhas: $(wc -l < acessos.log)"
echo
echo "== 4. Redirecionamento e códigos de saída =="
ls arquivo_que_nao_existe 2> erros.txt || echo "ls falhou com código $?"
echo "stderr guardado: $(cat erros.txt)"
echo
echo "== 5. Espaço e processos =="
du -sh . | sed "s|$D|.|"
df -h --output=size,pcent / | head -2
ps -o pid,ppid,stat,comm -p $$
echo
echo "== 6. Um script com variável, teste e laço =="
for f in *.txt; do [ -s "$f" ] && echo "$f tem conteúdo" || echo "$f está vazio"; done
cd /; rm -rf "$D"; echo "(pasta temporária removida)"
