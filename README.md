# IU5-66B — Прикладной уровень (Frontend + WebSocketServer)

В репозитории две ключевые части:

- **Frontend**: React + TypeScript + Vite (`/src`)
- **WebSocketServer**: Express + ws (`/WebSocketServer`)

## Документация (как это работает)

Главный файл с объяснениями “что без чего” и как устроены потоки данных:

- `METHODOLOGY_WEBSOCKET_APPLIED_LEVEL.md`

Контракт/Swagger для прикладного сервера:

- `WebSocketServer/openapi.yaml`

## Быстрый старт (локально)

### Frontend

```bash
npm install
npm run dev
```

### WebSocketServer

```bash
cd WebSocketServer
npm install
```

Дальше запустите сервер так, чтобы он слушал `http://localhost:8001` (подробности и проверки — в `METHODOLOGY_WEBSOCKET_APPLIED_LEVEL.md`).

## Проверка API

- Swagger UI: `http://localhost:8001/api-docs`
- OpenAPI YAML: `http://localhost:8001/openapi.yaml`
- REST ручка: `POST http://localhost:8001/receive`
