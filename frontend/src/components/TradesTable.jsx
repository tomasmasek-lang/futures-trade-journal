import React from 'react'

export default function TradesTable({ rows }) {
  return (
    <div style={{border: '1px solid #eee', borderRadius: 12}}>
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr style={{background: '#fafafa'}}>
            <th style={{textAlign: 'left', padding: 8}}>ID</th>
            <th style={{textAlign: 'left', padding: 8}}>Instrument</th>
            <th style={{textAlign: 'left', padding: 8}}>Směr</th>
            <th style={{textAlign: 'left', padding: 8}}>Vstup</th>
            <th style={{textAlign: 'left', padding: 8}}>Výstup</th>
            <th style={{textAlign: 'left', padding: 8}}>Cena vstup</th>
            <th style={{textAlign: 'left', padding: 8}}>Cena výstup</th>
            <th style={{textAlign: 'left', padding: 8}}>Kontrakty</th>
            <th style={{textAlign: 'left', padding: 8}}>Tagy</th>
          </tr>
        </thead>
        <tbody>
          {rows?.map(r => (
            <tr key={r.id} style={{borderTop: '1px solid #f0f0f0'}}>
              <td style={{padding: 8}}>{r.id}</td>
              <td style={{padding: 8}}>{r.instrument}</td>
              <td style={{padding: 8}}>{r.direction}</td>
              <td style={{padding: 8}}>{new Date(r.entry_time).toLocaleString()}</td>
              <td style={{padding: 8}}>{r.exit_time ? new Date(r.exit_time).toLocaleString() : '-'}</td>
              <td style={{padding: 8}}>{r.entry_price}</td>
              <td style={{padding: 8}}>{r.exit_price ?? '-'}</td>
              <td style={{padding: 8}}>{r.quantity}</td>
              <td style={{padding: 8}}>{r.tags}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
