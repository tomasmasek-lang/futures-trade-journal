from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class TradeBase(BaseModel):
    instrument: str = Field(..., examples=["GC", "ES"])
    direction: str = Field(..., examples=["LONG", "SHORT"])
    entry_time: datetime
    entry_price: float
    quantity: int = 1
    tick_value: float = 10.0
    tick_size: float = 0.1
    fees: float = 0.0
    tags: str = ""
    notes: str = ""

class TradeCreate(TradeBase):
    pass

class TradeUpdate(BaseModel):
    exit_time: Optional[datetime] = None
    exit_price: Optional[float] = None
    direction: Optional[str] = None
    instrument: Optional[str] = None
    entry_time: Optional[datetime] = None
    entry_price: Optional[float] = None
    quantity: Optional[int] = None
    tick_value: Optional[float] = None
    tick_size: Optional[float] = None
    fees: Optional[float] = None
    tags: Optional[str] = None
    notes: Optional[str] = None
    closed: Optional[bool] = None

class TradeOut(TradeBase):
    id: int
    exit_time: Optional[datetime] = None
    exit_price: Optional[float] = None
    closed: bool = False

    class Config:
        from_attributes = True

class Metrics(BaseModel):
    total_trades: int
    win_rate: float
    expectancy: float
    profit_factor: float
    gross_profit: float
    gross_loss: float
    net_profit: float
    max_drawdown: float
