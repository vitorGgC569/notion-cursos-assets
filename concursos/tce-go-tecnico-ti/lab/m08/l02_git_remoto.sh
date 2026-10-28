#!/usr/bin/env bash
# Pratica 2: Git com remoto (push, pull, fetch), rejeicao, Git Flow, trunk-based, hook, remote remove
source "$(dirname "$0")/common.sh"
W=$(mktemp -d /tmp/m8-git2-XXXX); cd "$W"
export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null
t "1. Remoto bare (o 'servidor') e duas pessoas clonando"
c "git init -q --bare -b main origem.git && git clone -q origem.git ana 2>&1; git clone -q origem.git bia 2>&1; ls"
cd ana; git config user.name 'Ana Dev'; git config user.email ana@exemplo.test
printf 'v=1\n' > app.py; git add app.py; tick; git commit -q -m 'feat: inicio'
c "git push -u origin main"
c "git remote -v && git branch -vv"
cd ../bia; git config user.name 'Bia Dev'; git config user.email bia@exemplo.test
c "git pull -q && git log --oneline"
t "2. Push rejeitado (non-fast-forward) e pull --rebase"
printf 'v=1\nbia=1\n' > app.py; git add app.py; export GIT_AUTHOR_NAME='Bia Dev' GIT_COMMITTER_NAME='Bia Dev' GIT_AUTHOR_EMAIL=bia@exemplo.test GIT_COMMITTER_EMAIL=bia@exemplo.test; tick; git commit -q -m 'feat: parte da Bia'
c "git push"
cd ../ana; export GIT_AUTHOR_NAME='Ana Dev' GIT_COMMITTER_NAME='Ana Dev' GIT_AUTHOR_EMAIL=ana@exemplo.test GIT_COMMITTER_EMAIL=ana@exemplo.test
printf 'ana=1\n' > ana.py; git add ana.py; tick; git commit -q -m 'feat: parte da Ana'
c "git push"
c "git fetch && git status -sb"
c "git log --oneline --graph --all"
tick; c "git pull --rebase && git log --oneline --graph"
c "git push && git status -sb"
t "3. fetch nao altera o seu trabalho; pull = fetch + integracao"
cd ../bia
c "git fetch && git log --oneline HEAD..origin/main"
c "git merge --ff-only origin/main && git log --oneline -3"
t "4. Branch remoto, push -u e exclusao"
c "git switch -c feature/x && git push -u origin feature/x 2>&1 | tail -2"
c "git branch -r"
c "git push origin --delete feature/x 2>&1 | tail -1; git branch -r"
t "5. Remote: adicionar e remover (questao TRT-5/2022)"
c "git remote add analista ../origem.git && git remote -v"
c "git remote remove analista && git remote -v"
t "6. Git Flow na pratica: main, develop, feature, release, hotfix"
cd ../ana
c "git switch -c develop && git push -q -u origin develop 2>&1 | tail -1; git branch"
c "git switch -c feature/boleto develop"
printf 'boleto=1\n' > boleto.py; git add boleto.py; tick; git commit -q -m 'feat: boleto'
c "git switch develop && git merge --no-ff -q feature/boleto -m 'Merge feature/boleto em develop' && git branch -d feature/boleto"
c "git switch -c release/1.0.0 develop"
echo '1.0.0' > VERSION; git add VERSION; tick; git commit -q -m 'chore: versao 1.0.0'
c "git switch main && git merge --no-ff -q release/1.0.0 -m 'Release 1.0.0' && git tag -a v1.0.0 -m 'release 1.0.0'"
c "git switch develop && git merge --no-ff -q release/1.0.0 -m 'Merge release 1.0.0 em develop' && git branch -d release/1.0.0"
c "git switch -c hotfix/1.0.1 main"
echo '1.0.1' > VERSION; git add VERSION; tick; git commit -q -m 'fix: corrige bug critico'
c "git switch main && git merge --no-ff -q hotfix/1.0.1 -m 'Hotfix 1.0.1' && git tag -a v1.0.1 -m 'hotfix 1.0.1'"
c "git switch develop && git merge --no-ff -q hotfix/1.0.1 -m 'Merge hotfix 1.0.1 em develop' ; git branch -d hotfix/1.0.1"
c "git log --oneline --graph --all --decorate | head -20"
t "7. Trunk-based: ramos curtos e feature flag"
c "git switch main && git switch -c tb/pagamento-pix"
cat > flags.py <<'P'
FLAGS = {"pix": False}   # codigo novo entra desligado
def pagar(v):
    if FLAGS["pix"]:
        return f"pix:{v}"
    return f"boleto:{v}"
P
git add flags.py; tick; git commit -q -m 'feat: pix atras de feature flag'
c "git switch main && git merge --ff-only tb/pagamento-pix && git branch -d tb/pagamento-pix && git log --oneline -2"
c "python3 -c 'import flags; print(flags.pagar(10)); flags.FLAGS[\"pix\"]=True; print(flags.pagar(10))'"
t "8. Hook pre-commit: o Git recusa o commit"
mkdir -p .git/hooks
cat > .git/hooks/pre-commit <<'H'
#!/bin/sh
if git diff --cached | grep -q 'SENHA='; then echo "pre-commit: segredo detectado, commit recusado"; exit 1; fi
H
chmod +x .git/hooks/pre-commit
echo 'SENHA=123' > cfg.env; git add cfg.env
c "git commit -m 'add cfg'"
c "git status --short"
git rm -q --cached cfg.env; rm cfg.env
t "9. Inspecao: log com autor, blame, shortlog"
c "git log --format='%h %an %s' | head -4"
c "git blame -L1,2 app.py | cut -c1-60"
c "git shortlog -sn --all | head"
c "git diff --stat v1.0.0 v1.0.1"
cd /; rm -rf "$W"
