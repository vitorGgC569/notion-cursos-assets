FROM golang:1.23-alpine AS builder
WORKDIR /src
COPY . .
RUN CGO_ENABLED=0 go build -ldflags="-s -w" -o /app .

FROM scratch
COPY --from=builder /app /app
USER 10001
ENTRYPOINT ["/app"]
