# Preparação de dados com pandas: duplicados, ausentes, outliers e padronização (requer pandas).
import pandas as pd,numpy as np
df=pd.DataFrame({'id':[1,2,3,3,4,5,6,7],'orgao':['A','B','A','A','C','B',None,'A'],
 'valor':[1200.0,1350.0,980.0,980.0,None,1100.0,1250.0,98000.0]})
print('BRUTO\n',df,'\n')
print('ausentes por coluna:\n',df.isna().sum().to_string(),'\n')
df=df.drop_duplicates(); print('após remover duplicados:',len(df),'linhas')
q1,q3=df['valor'].quantile([.25,.75]); iqr=q3-q1; lim=q3+1.5*iqr
print(f'IQR: Q1={q1:.1f} Q3={q3:.1f} limite superior={lim:.1f}')
df['outlier']=df['valor']>lim; print('outliers marcados:',df.loc[df.outlier,'id'].tolist())
print(f'média={df.valor.mean():.1f}  mediana={df.valor.median():.1f}  (o outlier puxa a média)')
df['valor_imp']=df['valor'].fillna(df['valor'].median()); df['orgao']=df['orgao'].fillna('desconhecido')
limpo=df[~df.outlier].copy()
limpo['z']=(limpo.valor_imp-limpo.valor_imp.mean())/limpo.valor_imp.std(ddof=0)
limpo['minmax']=(limpo.valor_imp-limpo.valor_imp.min())/(limpo.valor_imp.max()-limpo.valor_imp.min())
limpo=pd.get_dummies(limpo,columns=['orgao'],dtype=int)
print('\nLIMPO E TRANSFORMADO (z-score, min-max e one-hot)\n',limpo.drop(columns=['valor','outlier']).round(3).to_string(index=False))
print(f'\nz-score: média={limpo.z.mean():.3f}, desvio={limpo.z.std(ddof=0):.3f}')
