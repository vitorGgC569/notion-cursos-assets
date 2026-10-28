FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app.py .
RUN useradd --system --uid 10001 appuser
USER 10001
EXPOSE 8000
HEALTHCHECK --interval=2s --timeout=2s --retries=3 CMD ["python", "-c", "import urllib.request as u; u.urlopen('http://127.0.0.1:8000/saude', timeout=1)"]
CMD ["python", "app.py"]
