from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import SimpleSpanProcessor, SpanExporter, SpanExportResult
import time


class Resumo(SpanExporter):
    def export(self, spans):
        for s in spans:
            pai = format(s.parent.span_id, "016x")[:6] if s.parent else "-"
            print(f"trace={format(s.context.trace_id, '032x')[:8]} span={format(s.context.span_id, '016x')[:6]} "
                  f"pai={pai} nome={s.name} dur_ms={round((s.end_time - s.start_time) / 1e6)}")
        return SpanExportResult.SUCCESS


tp = TracerProvider()
tp.add_span_processor(SimpleSpanProcessor(Resumo()))
t = tp.get_tracer("demo")
with t.start_as_current_span("POST /pedido"):
    with t.start_as_current_span("consulta-estoque"):
        time.sleep(0.01)
    with t.start_as_current_span("grava-banco"):
        time.sleep(0.03)
