from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class Trade(Base):
    __tablename__ = "trades"
    id = Column(Integer, primary_key=True, index=True)
    instrument = Column(String, index=True)       # e.g. GC, ES, CL
    direction = Column(String)                    # 'LONG' or 'SHORT'
    entry_time = Column(DateTime(timezone=True), default=func.now())
    exit_time = Column(DateTime(timezone=True), nullable=True)
    entry_price = Column(Float)
    exit_price = Column(Float, nullable=True)
    quantity = Column(Integer, default=1)         # number of contracts
    tick_value = Column(Float, default=10.0)      # monetary value per tick
    tick_size = Column(Float, default=0.1)        # price increment
    fees = Column(Float, default=0.0)
    tags = Column(String, default="")             # comma separated
    notes = Column(String, default="")
    closed = Column(Boolean, default=False)       # True if exit recorded
