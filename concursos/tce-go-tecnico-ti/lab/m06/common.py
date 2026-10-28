# -*- coding: utf-8 -*-
# Utilitarios do laboratorio: executa SQL de verdade em SQLite (modulo sqlite3 do Python) e em PostgreSQL (servidor real via pixeltable-pgserver).
import sqlite3, re, shutil, os, sys, textwrap
try:
    import psycopg, pixeltable_pgserver
except ImportError:
    psycopg = None

def fmt(rows, cols):
    if not cols: return ''
    data = [[('NULL' if v is None else str(v)) for v in r] for r in rows]
    w = [max([len(c)] + [len(r[i]) for r in data]) for i, c in enumerate(cols)]
    line = lambda r: ' | '.join(x.ljust(w[i]) for i, x in enumerate(r)).rstrip()
    out = [line(cols), '-+-'.join('-' * x for x in w)]
    out += [line(r) for r in data]
    out.append('(%d linha%s)' % (len(rows), '' if len(rows) == 1 else 's'))
    return '\n'.join(out)

def h(t):
    print('\n' + '=' * 70); print(t); print('=' * 70)

def sub(t):
    print('\n--- ' + t)

class DB:
    def __init__(self, kind, conn):
        self.kind = kind; self.c = conn
    def run(self, sql, params=(), show=True, echo=True):
        s = textwrap.dedent(sql).strip()
        if echo and show: print('%s> %s' % (('pg','sq')[self.kind=='SQLite'], s.replace('\n', '\n   ')))
        try:
            cur = self.c.cursor() if self.kind == 'SQLite' else self.c.cursor()
            cur.execute(s, params) if params else cur.execute(s)
            if cur.description:
                rows = cur.fetchall(); cols = [d[0] if self.kind == 'SQLite' else d.name for d in cur.description]
                if show: print(fmt(rows, cols))
                return rows
            if show: print('OK' + (' (%d linha%s afetada%s)' % (cur.rowcount, '' if cur.rowcount == 1 else 's', '' if cur.rowcount == 1 else 's') if cur.rowcount and cur.rowcount > 0 else ''))
            return []
        except Exception as e:
            msg = str(e).strip().split('\n')[0]
            if show: print('ERRO: ' + msg)
            return 'ERRO: ' + msg
    def ins(self, table, rows):
        lit = lambda v: 'NULL' if v is None else (str(v) if isinstance(v, (int, float)) else "'" + str(v).replace("'", "''") + "'")
        for r in rows:
            self.run('INSERT INTO %s VALUES (%s)' % (table, ', '.join(lit(v) for v in r)), show=False)

def sqlite_mem():
    c = sqlite3.connect(':memory:', isolation_level=None)
    c.execute('PRAGMA foreign_keys = ON')
    return DB('SQLite', c)

class PGServer:
    def __init__(self, name):
        self.dir = '/tmp/pgdata_m06_' + name
        shutil.rmtree(self.dir, ignore_errors=True)
        self.srv = pixeltable_pgserver.get_server(self.dir, cleanup_mode='delete')
        self.uri = self.srv.get_uri()
    def conn(self, dbname=None, autocommit=True):
        uri = self.uri if not dbname else re.sub(r'/postgres\?', '/%s?' % dbname, self.uri)
        c = psycopg.connect(uri, autocommit=autocommit)
        c.add_notice_handler(lambda d: print('AVISO (RAISE NOTICE): ' + d.message_primary))
        return DB('PostgreSQL', c)
    def close(self):
        try: self.srv.cleanup()
        except Exception: pass

def versions(pg=None):
    print('SQLite %s (modulo sqlite3 do Python %s)' % (sqlite3.sqlite_version, sys.version.split()[0]))
    if pg:
        v = pg.run('select version()', show=False)[0][0]
        print('PostgreSQL ' + re.search(r'PostgreSQL ([\d.]+)', v).group(1))
