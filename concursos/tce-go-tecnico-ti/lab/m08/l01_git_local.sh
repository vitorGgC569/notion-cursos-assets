#!/usr/bin/env bash
# Pratica 1: Git local (commit, branch, merge, conflito, rebase, tag, stash, reset, revert, cherry-pick, reflog, bisect)
source "$(dirname "$0")/common.sh"
W=$(mktemp -d /tmp/m8-git1-XXXX); cd "$W"
export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null
git --version
t "1. Repositorio, primeiro commit e as tres areas"
c "git init -b main app && cd app && git config user.name 'Ana Dev' && git config user.email ana@exemplo.test"
cd app
printf 'print("ola")\n' > app.py
c "git status --short"
tick; c "git add app.py && git status --short"
tick; c "git commit -q -m 'feat: primeira versao' && git log --oneline"
printf 'print("ola")\nprint("mundo")\n' > app.py
c "git status --short && git diff"
c "git diff --staged | wc -l"
c "git add app.py && git diff --staged --stat"
tick; c "git commit -q -m 'feat: imprime mundo' && git log --oneline"
t "2. O que e um commit: objetos do Git"
c "git cat-file -p HEAD"
c "git cat-file -t HEAD && git cat-file -t HEAD^{tree} && git cat-file -t HEAD:app.py"
t "3. Branch e merge fast-forward"
c "git switch -c feature/login && git branch"
printf 'def login(): pass\n' > login.py; git add login.py; tick; git commit -q -m 'feat: login'
c "git switch main && git merge feature/login"
c "git log --oneline --graph --all"
t "4. Merge sem fast-forward (--no-ff) cria commit de merge"
c "git switch -c feature/relatorio"
printf 'def rel(): pass\n' > rel.py; git add rel.py; tick; git commit -q -m 'feat: relatorio'
c "git switch main"
printf 'print("v2")\n' >> app.py; git add app.py; tick; git commit -q -m 'chore: ajuste em main'
tick; c "git merge --no-ff feature/relatorio -m 'Merge feature/relatorio'"
c "git log --oneline --graph --all"
c "git cat-file -p HEAD | head -4"
t "5. Conflito de merge e resolucao"
c "git switch -c ajuste-a"
printf 'cor = "azul"\n' > cfg.py; git add cfg.py; tick; git commit -q -m 'cfg: azul'
c "git switch main && git switch -c ajuste-b"
printf 'cor = "verde"\n' > cfg.py; git add cfg.py; tick; git commit -q -m 'cfg: verde'
c "git merge ajuste-a"
c "git status --short"
c "cat cfg.py"
printf 'cor = "azul-esverdeado"\n' > cfg.py
c "git add cfg.py && git status --short"
tick; c "git commit -q -m 'merge: resolve conflito de cor' && git log --oneline --graph -5"
t "6. Rebase: historia linear"
c "git switch main && git switch -c feature/rebase"
printf 'a=1\n' > r1.py; git add r1.py; tick; git commit -q -m 'feat: r1'
c "git switch main"
printf 'b=2\n' > m1.py; git add m1.py; tick; git commit -q -m 'chore: m1 em main'
c "git switch feature/rebase"
c "git log --oneline --graph --all -6"
tick; c "git rebase main"
c "git log --oneline --graph -5"
c "git switch main && git merge --ff-only feature/rebase && git log --oneline -3"
t "7. Tag, stash, reset (soft, mixed, hard) e revert"
tick; c "git tag -a v1.0.0 -m 'primeira versao estavel' && git tag && git show v1.0.0 --stat | head -6"
printf 'trabalho em andamento\n' > wip.txt; git add wip.txt; echo mod >> app.py
c "git stash push -m 'wip' && git status --short && git stash list"
c "git stash pop && git status --short"
git add -A; tick; git commit -q -m 'wip: salva'
c "git log --oneline -3"
c "git reset --soft HEAD~1 && git status --short && git log --oneline -1"
c "git reset --mixed HEAD && git status --short"
git add -A; tick; git commit -q -m 'wip: salva de novo'
c "git reset --hard HEAD~1 && git status --short && git log --oneline -1 && ls wip.txt"
c "git reflog -4"
c "git reset --hard HEAD@{1} && git log --oneline -1 && ls wip.txt"
tick; c "git revert --no-edit HEAD && git log --oneline -3"
t "8. cherry-pick"
c "git switch -c hotfix main~2"
printf 'fix=1\n' > fix.py; git add fix.py; tick; git commit -q -m 'fix: corrige erro em producao'
H=$(git rev-parse --short HEAD)
c "git switch main"
tick; c "git cherry-pick $H && git log --oneline -2"
t "9. bisect: achar o commit que quebrou"
c "git switch -c busca main"
for i in 1 2 3 4 5 6; do echo "v=$i" > ver.txt; [ $i -ge 4 ] && echo "BUG" >> ver.txt; git add ver.txt; tick; git commit -q -m "ver $i"; done
c "git log --oneline -6"
c "git bisect start HEAD HEAD~5 && git bisect run sh -c '! grep -q BUG ver.txt' | tail -5; git bisect reset"
t "10. .gitignore e arquivos rastreados"
printf '*.log\nbuild/\n' > .gitignore; touch a.log; mkdir build; touch build/x
c "git status --short"
c "git check-ignore -v a.log"
cd /; rm -rf "$W"
