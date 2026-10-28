"""Pratica 7: MCP de verdade: servidor e cliente com o SDK oficial, falando JSON-RPC por stdio."""
import asyncio, json, subprocess, sys, os
from mcp import Client
from mcp.client.stdio import StdioServerParameters
HERE = os.path.dirname(os.path.abspath(__file__))
SRV = os.path.join(HERE, "mcp", "servidor_normas.py")
async def main():
    params = StdioServerParameters(command=sys.executable, args=[SRV])
    async with Client(params) as c:
        print("--- 1. descoberta (tools/list) ---")
        for t in (await c.list_tools()).tools:
            print(f"ferramenta: {t.name} | descricao: {t.description} | parametros: {list(t.input_schema['properties'])}")
        print("\n--- 2. chamada (tools/call) ---")
        r = await c.call_tool("buscar_norma", {"consulta": "limite de passos do agente", "k": 1})
        print("buscar_norma ->", r.content[0].text[:110])
        r = await c.call_tool("contar_trechos", {"palavras": 1000, "tamanho": 120, "sobreposicao": 20})
        print("contar_trechos(1000,120,20) ->", r.content[0].text, "| isError =", r.is_error if hasattr(r, "is_error") else getattr(r, "isError", None))
        print("\n--- 3. erro de ferramenta inexistente / argumento invalido ---")
        for nome, args in (("apagar_tudo", {}), ("contar_trechos", {"palavras": "mil", "tamanho": 1, "sobreposicao": 0})):
            try:
                r = await c.call_tool(nome, args)
                print(nome, "-> isError =", getattr(r, "is_error", None), "|", r.content[0].text[:90])
            except Exception as e:
                print(nome, "-> excecao:", type(e).__name__, str(e)[:90])
        print("\n--- 4. recursos e prompts ---")
        print("modelos de recurso:", [x.uri_template for x in (await c.list_resource_templates()).resource_templates])
        rr = await c.read_resource("norma://ti-07/S08")
        print("recurso S08 ->", rr.contents[0].text[:80])
        print("prompts:", [p.name for p in (await c.list_prompts()).prompts])
        g = await c.get_prompt("revisar_pr", {"resumo": "troca o login"})
        print("prompt ->", g.messages[0].content.text[:90])
asyncio.run(main())
print("\n--- 5. a mesma conversa em JSON-RPC cru, linha a linha, por stdio ---")
p = subprocess.Popen([sys.executable, SRV], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, text=True)
def send(o):
    print("CLIENTE ->", json.dumps(o)[:300]); p.stdin.write(json.dumps(o) + "\n"); p.stdin.flush()
def recv():
    l = p.stdout.readline(); print("SERVIDOR->", l.strip()[:230]); return l
send({"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {"protocolVersion": "2025-06-18", "capabilities": {}, "clientInfo": {"name": "cru", "version": "0"}}}); recv()
send({"jsonrpc": "2.0", "method": "notifications/initialized"})
send({"jsonrpc": "2.0", "id": 2, "method": "tools/list"}); recv()
send({"jsonrpc": "2.0", "id": 3, "method": "tools/call", "params": {"name": "contar_trechos", "arguments": {"palavras": 3000, "tamanho": 120, "sobreposicao": 20}}}); recv()
p.stdin.close(); p.wait(timeout=10)
print("\n--- 6. a revisão 2026-07-28: sem initialize; server/discover e metadados em cada requisição ---")
p = subprocess.Popen([sys.executable, SRV], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, text=True)
META = {"io.modelcontextprotocol/protocolVersion": "2026-07-28", "io.modelcontextprotocol/clientInfo": {"name": "cru", "version": "0"}, "io.modelcontextprotocol/clientCapabilities": {}}
send({"jsonrpc": "2.0", "id": 1, "method": "server/discover", "params": {"_meta": META}}); recv()
send({"jsonrpc": "2.0", "id": 2, "method": "tools/call", "params": {"name": "contar_trechos", "arguments": {"palavras": 3000, "tamanho": 120, "sobreposicao": 20}, "_meta": META}}); recv()
p.stdin.close(); p.wait(timeout=10)
