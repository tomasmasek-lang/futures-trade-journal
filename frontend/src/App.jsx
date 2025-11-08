import React, { useEffect, useState } from 'react'
import { fetchTrades, createTrade, getMetrics, getEquity } from './api'
import TradeForm from './components/TradeForm'
import TradesTable from './components/TradesTable'
import MetricsCards from './components/MetricsCards'
import EquityCurve from './components/EquityCurve'

export default function App() {
  const [trades, setTrades] = useState([])
  const [metrics, setMetrics] = useState(null)
  const [equity, setEquity] = useState([])

  async function refresh() {
    const [t, m, e] = await Promise.all([fetchTrades(), getMetrics(), getEquity()])
    setTrades(t)
    setMetrics(m)
    setEquity(e)
  }

  useEffect(() => { refresh() }, [])

  return (
    <div style={{maxWidth: 1100, margin: '20px auto', padding: 16, fontFamily: 'system-ui, sans-serif'}}>
      <h1 style={{marginBottom: 8}}>Futures Trade Journal</h1>
      <p style={{marginTop: 0, color: '#555'}}>Jednoduché zaznamenávání a vyhodnocování obchodů.</p>

      <section style={{marginTop: 24}}>
        <TradeForm onCreate={async (t) => { await createTrade(t); await refresh() }} />
      </section>

      <section style={{marginTop: 24}}>
        <MetricsCards data={metrics} />
      </section>

      <section style={{marginTop: 24}}>
        <EquityCurve data={equity} />
      </section>

      <section style={{marginTop: 24}}>
        <TradesTable rows={trades} />
      </section>
    </div>
  )
}
