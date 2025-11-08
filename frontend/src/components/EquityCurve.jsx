import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function EquityCurve({ data }) {
  if (!data || data.length === 0) return null
  return (
    <div style={{border: '1px solid #eee', borderRadius: 12, padding: 12}}>
      <div style={{fontWeight: 600, marginBottom: 8}}>Equity curve</div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tickFormatter={(v) => new Date(v).toLocaleDateString()} />
          <YAxis />
          <Tooltip labelFormatter={(v) => new Date(v).toLocaleString()} />
          <Line type="monotone" dataKey="equity" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
