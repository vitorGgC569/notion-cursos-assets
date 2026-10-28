# -*- coding: utf-8 -*-
"""Apoio dos scripts do Laboratório do Módulo 7: gabaritos oficiais (FCC, caderno tipo 1) e registro das conferências."""
import json,os,sys
ORG={'tg':'TCE-GO 2009 (N14)','t1':'TRT-1 2014 (C03)','t2a':'TRT-2 2014 (M13)','t2':'TRT-2 2018 (TJ05)','t14':'TRT-14 2022 (F06)','t22':'TRT-22 2022 (K11)','t5':'TRT-5 2022 (T20)','t23':'TRT-23 2022 (T18)','t4':'TRT-4 2022 (T17)'}
GAB={('tg', 17): 'C', ('tg', 18): 'D', ('tg', 19): 'A', ('tg', 20): 'B', ('tg', 21): 'E', ('tg', 22): 'C', ('tg', 23): 'D', ('tg', 24): 'A', ('t14', 11): 'B', ('t14', 12): 'E', ('t14', 13): 'A', ('t14', 14): 'D', ('t14', 15): 'C', ('t5', 11): 'C', ('t5', 12): 'D', ('t5', 13): 'B', ('t5', 14): 'E', ('t5', 15): 'C', ('t22', 16): 'A', ('t22', 17): 'E', ('t22', 18): 'C', ('t22', 19): 'D', ('t22', 20): 'B', ('t23', 11): 'D', ('t23', 12): 'A', ('t23', 13): 'A', ('t23', 14): 'A', ('t23', 15): 'C', ('t4', 16): 'E', ('t4', 17): 'A', ('t4', 18): 'C', ('t4', 19): 'D', ('t4', 20): 'B', ('t2', 11): 'A', ('t2', 12): 'C', ('t2', 13): 'D', ('t1', 21): 'C', ('t1', 22): 'D', ('t1', 23): 'B', ('t1', 24): 'D', ('t1', 25): 'B', ('t1', 26): 'E', ('t1', 27): 'C', ('t1', 28): 'A', ('t1', 29): 'E', ('t1', 30): 'A', ('t2a', 16): 'C', ('t2a', 17): 'D', ('t2a', 18): 'C', ('t2a', 19): 'A', ('t2a', 20): 'E'}
REG=os.path.join(os.path.dirname(os.path.abspath(__file__)),'conferidas.json')
def _save(src,num,letra,ok):
    d=json.load(open(REG)) if os.path.exists(REG) else {}
    d[f'{src}-{num}']=[letra,ok]
    json.dump(d,open(REG,'w'),indent=0)
def letra_por_valor(valor,opcoes):
    """Devolve a letra da alternativa cujo valor numérico é igual ao calculado."""
    achou=[ 'ABCDE'[i] for i,o in enumerate(opcoes) if o==valor ]
    assert len(achou)==1,(valor,opcoes,achou)
    return achou[0]
def confere(src,num,letra,detalhe=''):
    ok=GAB[(src,num)]==letra
    print(f"[{'OK' if ok else 'ERRO'}] {ORG[src]} questão {num}: calculado {letra}, gabarito oficial {GAB[(src,num)]}. {detalhe}")
    _save(src,num,letra,ok)
    assert ok
def necessarias(src,num,preds,modelos,detalhe=''):
    """preds: letra -> função(modelo)->bool. A resposta é a única alternativa verdadeira em TODOS os modelos."""
    certas=[l for l,f in preds.items() if all(f(m) for m in modelos)]
    print(f"   {len(modelos)} modelo(s) possível(is); alternativas verdadeiras em todos: {certas}")
    assert len(certas)==1,certas
    confere(src,num,certas[0],detalhe)
