"""Servidor MCP didatico (SDK oficial 'mcp' 2.x): uma ferramenta de busca, uma de conta, um recurso e um prompt."""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from lib import BM25, n_chunks
from corpus import DOCS
from mcp.server.mcpserver import MCPServer
bm = BM25(DOCS)
app = MCPServer("normas-ti")

@app.tool()
def buscar_norma(consulta: str, k: int = 1) -> str:
    """Busca trechos da norma interna TI-07 (somente leitura)."""
    return "\n".join(f"[{i}] {DOCS[i]}" for i, _ in bm.top(consulta, k))

@app.tool()
def contar_trechos(palavras: int, tamanho: int, sobreposicao: int) -> int:
    """Calcula quantos trechos um documento gera ao ser fatiado para RAG."""
    return n_chunks(palavras, tamanho, sobreposicao)

@app.resource("norma://ti-07/{secao}")
def secao(secao: str) -> str:
    """Texto de uma seção da norma (ex.: norma://ti-07/S08)."""
    return DOCS[secao]

@app.prompt()
def revisar_pr(resumo: str) -> str:
    """Modelo de prompt para revisar um pull request segundo a norma."""
    return f"Revise o pull request abaixo seguindo a norma TI-07 (revisão humana, testes, cobertura mínima). Resumo: {resumo}"

if __name__ == "__main__":
    app.run("stdio")
