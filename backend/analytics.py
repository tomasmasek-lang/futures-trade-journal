from typing import List, Tuple
from datetime import datetime
from .models import Trade

def trade_pnl(t: Trade) -> float:
    if not t.closed or t.exit_price is None:
        return 0.0
    # points * (1 / tick_size) * tick_value * quantity minus fees
    points = (t.exit_price - t.entry_price) if t.direction.upper() == "LONG" else (t.entry_price - t.exit_price)
    ticks = points / t.tick_size
    gross = ticks * t.tick_value * t.quantity
    return gross - t.fees

def equity_curve(trades: List[Trade]) -> List[Tuple[datetime, float]]:
    # Sort by exit_time (fallback entry_time)
    ordered = sorted(trades, key=lambda x: x.exit_time or x.entry_time)
    eq = 0.0
    curve = []
    for tr in ordered:
        if tr.closed and tr.exit_time:
            eq += trade_pnl(tr)
            curve.append((tr.exit_time, eq))
    return curve

def metrics(trades: List[Trade]) -> dict:
    closed = [t for t in trades if t.closed and t.exit_price is not None]
    if not closed:
        return dict(total_trades=0, win_rate=0.0, expectancy=0.0, profit_factor=0.0,
                    gross_profit=0.0, gross_loss=0.0, net_profit=0.0, max_drawdown=0.0)

    pnls = [trade_pnl(t) for t in closed]
    wins = [p for p in pnls if p > 0]
    losses = [p for p in pnls if p <= 0]

    gross_profit = sum(wins) if wins else 0.0
    gross_loss = -sum(losses) if losses else 0.0  # positive number
    net_profit = sum(pnls)
    win_rate = len(wins) / len(closed)

    # Expectancy = avg PnL per trade
    expectancy = net_profit / len(closed)

    # Profit factor = gross profit / gross loss
    profit_factor = (gross_profit / gross_loss) if gross_loss > 0 else float("inf")

    # Max drawdown from equity curve
    eq = 0.0
    peak = 0.0
    max_dd = 0.0
    for p in pnls:
        eq += p
        if eq > peak:
            peak = eq
        dd = peak - eq
        if dd > max_dd:
            max_dd = dd

    return dict(
        total_trades=len(closed),
        win_rate=win_rate,
        expectancy=expectancy,
        profit_factor=profit_factor,
        gross_profit=gross_profit,
        gross_loss=gross_loss,
        net_profit=net_profit,
        max_drawdown=max_dd,
    )
