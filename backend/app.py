from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from .database import Base, engine, get_db
from . import models, schemas, analytics

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Futures Trade Journal")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/trades", response_model=schemas.TradeOut)
def create_trade(payload: schemas.TradeCreate, db: Session = Depends(get_db)):
    t = models.Trade(**payload.model_dump())
    db.add(t)
    db.commit()
    db.refresh(t)
    return t

@app.get("/trades", response_model=List[schemas.TradeOut])
def list_trades(
    instrument: Optional[str] = None,
    tag: Optional[str] = None,
    date_from: Optional[datetime] = None,
    date_to: Optional[datetime] = None,
    db: Session = Depends(get_db)
):
    q = db.query(models.Trade)
    if instrument:
        q = q.filter(models.Trade.instrument == instrument)
    if tag:
        q = q.filter(models.Trade.tags.like(f"%{tag}%"))
    if date_from:
        q = q.filter(models.Trade.entry_time >= date_from)
    if date_to:
        q = q.filter(models.Trade.exit_time <= date_to)
    return q.order_by(models.Trade.entry_time.desc()).all()

@app.get("/trades/{trade_id}", response_model=schemas.TradeOut)
def get_trade(trade_id: int, db: Session = Depends(get_db)):
    return db.get(models.Trade, trade_id)

@app.patch("/trades/{trade_id}", response_model=schemas.TradeOut)
def update_trade(trade_id: int, payload: schemas.TradeUpdate, db: Session = Depends(get_db)):
    t = db.get(models.Trade, trade_id)
    if not t:
        return {"error": "not found"}
    for k, v in payload.model_dump(exclude_none=True).items():
        setattr(t, k, v)
    db.add(t)
    db.commit()
    db.refresh(t)
    return t

@app.delete("/trades/{trade_id}")
def delete_trade(trade_id: int, db: Session = Depends(get_db)):
    t = db.get(models.Trade, trade_id)
    if t:
        db.delete(t)
        db.commit()
    return {"ok": True}

@app.get("/metrics")
def get_metrics(
    instrument: Optional[str] = None,
    tag: Optional[str] = None,
    db: Session = Depends(get_db)
):
    q = db.query(models.Trade)
    if instrument:
        q = q.filter(models.Trade.instrument == instrument)
    if tag:
        q = q.filter(models.Trade.tags.like(f"%{tag}%"))
    trades = q.all()
    return analytics.metrics(trades)

@app.get("/equity")
def get_equity_curve(db: Session = Depends(get_db)):
    trades = db.query(models.Trade).all()
    curve = analytics.equity_curve(trades)
    return [{"time": t.isoformat(), "equity": eq} for t, eq in curve]
