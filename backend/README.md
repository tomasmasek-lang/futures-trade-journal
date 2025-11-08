# Backend (FastAPI)

## Endpoints
- `POST /trades` – vytvoření obchodu
- `GET /trades` – list s filtry
- `GET /trades/{id}` – detail
- `PATCH /trades/{id}` – update (např. doplnění výstupu, `closed=true`)
- `DELETE /trades/{id}` – smazání
- `GET /metrics` – souhrnné metriky (win-rate, expectancy, PF, drawdown, ...)
- `GET /equity` – equity curve

## Datový model
Zjednodušeně 1 trade = 1 vstup + 1 výstup. Multi‑entry/scale‑out lze přidat novou tabulí `executions`.
