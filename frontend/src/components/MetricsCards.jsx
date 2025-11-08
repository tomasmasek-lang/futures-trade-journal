import React from 'react'

export default function MetricsCards({ data }) {
  if (!data) return null
  const fmt = (x) => typeof x === 'number' ? (Math.abs(x) > 1000 ? x.toFixed(0) : x.toFixed(2)) : x
  const items = [
    ['Počet obchodů', data.total_trades],
    ['Win‑rate', (data.win_rate * 100).toFixed(1) + '%'],
    ['Expectancy', fmt(data.expectancy)],
    ['Profit factor', fmt(data.profit_factor)],
    ['Hrubý zisk', fmt(data.gross_profit)],
    ['Hrubá ztráta', fmt(data.gross_loss)],
    ['Čistý zisk', fmt(data.net_profit)],
    ['Max drawdown', fmt(data.max_drawdown)],
  ]
  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12}}>
      {items.map(([k, v]) => (
        <div key={k} style={{border: '1px solid #eee', borderRadius: 12, padding: 12}}>
          <div style={{fontSize: 12, color: '#666'}}>{k}</div>
          <div style={{fontSize: 20, fontWeight: 600}}>{v}</div>
        </div>
      ))}
    </div>
  )
}
