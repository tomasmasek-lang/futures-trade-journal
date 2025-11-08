# Futures Trade Journal — Starter (FastAPI + React)

This is a minimal full‑stack starter to **zaznamenávat a vyhodnocovat obchody s futures**.

## Stack
- **Backend**: FastAPI, SQLAlchemy, SQLite
- **Frontend**: React (Vite), Recharts
- **Docker**: optional `docker-compose`

## Rychlý start (bez Dockeru)
### Backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload
```
Server poběží na `http://127.0.0.1:8000` (Swagger: `/docs`).

### Frontend
```bash
cd ../frontend
npm install
npm run dev
```
Dev server běží na `http://127.0.0.1:5173`.

## Rychlý start (Docker)
```bash
docker compose up --build
```
- Backend: `http://localhost:8000`
- Frontend: `http://localhost:5173`

## Funkce v MVP
- Přidání/úprava/smazání obchodu (instrument, směr, vstup/výstup, kontrakty, poplatky, tagy, poznámky)
- Výpočet PnL (v měně účtu), R‑multiple, win‑rate, expectancy, profit factor, max. drawdown
- Filtry dle instrumentu, strategie (tagy), data
- Equity curve

> Pozn.: Model je jednoduchý (1 trade = 1 vstup + 1 výstup). Multi‑entry/scale‑out lze doplnit později (viz komentáře v kódu).
