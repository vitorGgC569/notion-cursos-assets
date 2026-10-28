#!/usr/bin/env python3
"""Pratica 10: confere o modelo de Git do simulador e as respostas do gerador contra o Git de verdade.
Uso: python3 l10_conferencia.py  (precisa de node e git; usa git-core.js e gerador-git-core.js desta pasta)"""
import json, os, re, shlex, subprocess, sys, tempfile, shutil
H = os.path.dirname(os.path.abspath(__file__))
N = int(os.environ.get('N', '300'))
JS = """
globalThis.GitSim=require('./git-core.js');const G=require('./gerador-git-core.js');const o=[];
for(let s=1;s<=%d;s++){const q=G.gerar('Todos',(s%%3)+1,s);o.push({seed:s,nivel:(s%%3)+1,id:q.id,script:q.script,query:q.query,answer:q.answer,certa:q.opcoes[q.certa]})}
console.log(JSON.stringify(o))""" % N
raw = subprocess.run(['node', '-e', JS], cwd=H, capture_output=True, text=True, check=True).stdout
Q = json.loads(raw)
print('node: %d questoes geradas (sementes 1 a %d) com a resposta do modelo' % (len(Q), N))

def git(args, cwd, env, check=True):
    r = subprocess.run(['git'] + args, cwd=cwd, env=env, capture_output=True, text=True)
    if check and r.returncode != 0:
        raise RuntimeError('git %s: %s' % (' '.join(args), r.stderr.strip()))
    return r.stdout

def replay(script):
    d = tempfile.mkdtemp(prefix='m8-l10-')
    env = dict(os.environ, GIT_CONFIG_GLOBAL='/dev/null', GIT_CONFIG_SYSTEM='/dev/null', GIT_AUTHOR_NAME='Ana Dev',
               GIT_AUTHOR_EMAIL='ana@exemplo.test', GIT_COMMITTER_NAME='Ana Dev', GIT_COMMITTER_EMAIL='ana@exemplo.test')
    n = 0
    for line in script:
        n += 1
        env['GIT_AUTHOR_DATE'] = env['GIT_COMMITTER_DATE'] = '2026-01-01T10:%02d:%02d-03:00' % (n // 60, n % 60)
        m = re.match(r'^echo "([^"]*)" > (\S+)$', line)
        if m:
            open(os.path.join(d, m.group(2)), 'w').write(m.group(1) + '\n'); continue
        a = shlex.split(line)
        if a[:2] == ['git', 'init']:
            git(['init', '-b', 'main', '-q'], d, env); continue
        if a[0] == 'git':
            r = subprocess.run(['git'] + a[1:], cwd=d, env=env, capture_output=True, text=True)
            if r.returncode != 0:
                raise RuntimeError(line + ': ' + r.stderr.strip())
            continue
        raise RuntimeError('comando desconhecido: ' + line)
    return d, env

def status(d, env):
    l = [x for x in git(['status', '--short'], d, env).split('\n') if x]
    return ' | '.join(l) if l else '(vazio: nada a mostrar)'

def cnt(d, env, b):
    return int(git(['rev-list', '--count', b], d, env).strip())

def npar(d, env, b):
    return len(git(['log', '-1', '--format=%P', b], d, env).split())

def real(q, d, env):
    k = q['query']
    if k == 'count:main+parents': return '%d:%d' % (cnt(d, env, 'main'), npar(d, env, 'main'))
    if k == 'status': return status(d, env)
    if k == 'count+status': return '%d:%s' % (cnt(d, env, 'main'), status(d, env))
    if k == 'count:feature+parents': return '%d:%d' % (cnt(d, env, 'feature'), npar(d, env, 'feature'))
    if k == 'count+files':
        fs = sorted(x for x in os.listdir(d) if x != '.git')
        return '%d:%s' % (cnt(d, env, 'main'), ', '.join(fs) if fs else '(nenhum)')
    raise RuntimeError(k)

ok = 0; bad = []; porid = {}
for q in Q:
    d, env = replay(q['script'])
    try:
        r = real(q, d, env)
    finally:
        shutil.rmtree(d, ignore_errors=True)
    p = porid.setdefault(q['id'], [0, 0]); p[1] += 1
    if r == q['answer']:
        ok += 1; p[0] += 1
    else:
        bad.append((q['seed'], q['id'], q['answer'], r))
print('\n--- Git real contra o modelo, por tipo de questao ---')
for k in sorted(porid): print('%-10s %3d de %3d iguais' % (k, porid[k][0], porid[k][1]))
print('\nTotal: %d de %d respostas do gerador iguais as do Git real' % (ok, len(Q)))
for b in bad[:10]: print('DIVERGENCIA semente %d (%s): modelo=%r git=%r' % b)

print('\n--- Cenarios fixos: ff, --no-ff, conflito, rebase, revert, stash ---')
CEN = {
 'ff': ['git init','echo "a" > a.txt','git add a.txt','git commit -m "um"','git switch -c feature','echo "b" > b.txt','git add b.txt','git commit -m "dois"','git switch main','git merge feature'],
 'noff': ['git init','echo "a" > a.txt','git add a.txt','git commit -m "um"','git switch -c feature','echo "b" > b.txt','git add b.txt','git commit -m "dois"','git switch main','git merge --no-ff feature'],
 'conflito': ['git init','echo "a" > a.txt','git add a.txt','git commit -m "um"','git switch -c feature','echo "x" > a.txt','git commit -am "x"','git switch main','echo "y" > a.txt','git commit -am "y"','git merge feature'],
 'rebase': ['git init','echo "a" > a.txt','git add a.txt','git commit -m "um"','git switch -c feature','echo "b" > b.txt','git add b.txt','git commit -m "dois"','git switch main','echo "c" > c.txt','git add c.txt','git commit -m "tres"','git switch feature','git rebase main'],
 'revert': ['git init','echo "a" > a.txt','git add a.txt','git commit -m "um"','echo "b" > b.txt','git add b.txt','git commit -m "dois"','git revert HEAD'],
 'stash': ['git init','echo "a" > a.txt','git add a.txt','git commit -m "um"','echo "z" > a.txt','git stash','git stash pop'],
}
RS = """
globalThis.GitSim=require('./git-core.js');const C=%s;const out={};
for(const k in C){const g=new GitSim();C[k].forEach(c=>g.exec(c));
 const subj=b=>Object.keys(g.c).filter(id=>g.anc(g.br[b])[id]).sort((a,b)=>g.c[b].n-g.c[a].n).map(id=>g.c[id].msg).join(' <- ');
 out[k]={st:g.statusEntries().join(' | ')||'(vazio)',head:g.head.b,log:subj(g.head.b),par:g.c[g.tip()].p.length,files:Object.keys(g.wt).sort().join(',')}}
console.log(JSON.stringify(out))""" % json.dumps(CEN)
M = json.loads(subprocess.run(['node', '-e', RS], cwd=H, capture_output=True, text=True, check=True).stdout)
allok = True
for k, sc in CEN.items():
    d, env = replay(sc) if k != 'conflito' else (None, None)
    if k == 'conflito':
        d = tempfile.mkdtemp(prefix='m8-l10-'); env = dict(os.environ, GIT_CONFIG_GLOBAL='/dev/null', GIT_CONFIG_SYSTEM='/dev/null', GIT_AUTHOR_NAME='Ana Dev', GIT_AUTHOR_EMAIL='ana@exemplo.test', GIT_COMMITTER_NAME='Ana Dev', GIT_COMMITTER_EMAIL='ana@exemplo.test')
        n = 0
        for line in sc:
            n += 1; env['GIT_AUTHOR_DATE'] = env['GIT_COMMITTER_DATE'] = '2026-01-01T10:00:%02d-03:00' % n
            m = re.match(r'^echo "([^"]*)" > (\S+)$', line)
            if m: open(os.path.join(d, m.group(2)), 'w').write(m.group(1) + '\n'); continue
            a = shlex.split(line)
            if a[:2] == ['git', 'init']: git(['init', '-b', 'main', '-q'], d, env); continue
            subprocess.run(['git'] + a[1:], cwd=d, env=env, capture_output=True, text=True)
    st = [x for x in git(['status', '--short'], d, env).split('\n') if x]
    st = ' | '.join(st) if st else '(vazio)'
    head = git(['symbolic-ref', '--short', 'HEAD'], d, env).strip()
    log = ' <- '.join(git(['log', '--format=%s', '--first-parent' if False else 'HEAD'], d, env).split('\n')[:-1][::1]) if False else None
    subs = git(['log', '--format=%s'], d, env).split('\n')[:-1]
    par = len(git(['log', '-1', '--format=%P'], d, env).split())
    fs = sorted(x for x in os.listdir(d) if x != '.git')
    shutil.rmtree(d, ignore_errors=True)
    m = M[k]
    same = (st == m['st'] and head == m['head'] and par == m['par'] and ' <- '.join(subs) == m['log'] and ','.join(fs) == m['files'])
    allok &= same
    print('%-9s status=%-22s pais=%d commits=%d  %s' % (k, st, par, len(subs), 'IGUAL ao modelo' if same else 'DIVERGE: modelo=%r git=%r' % (m, dict(st=st, head=head, par=par, log=subs, files=fs))))
print('\nCenarios fixos: %s' % ('todos iguais ao Git real' if allok else 'HA DIVERGENCIAS'))
