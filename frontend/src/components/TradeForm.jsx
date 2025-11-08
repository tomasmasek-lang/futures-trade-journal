import React, { useState } from 'react'

export default function TradeForm({ onCreate }) {
  const [form, setForm] = useState({
    instrument: 'GC',
    direction: 'LONG',
    entry_time: new Date().toISOString(),
    entry_price: 2400,
    quantity: 1,
    tick_value: 10,
    tick_size: 0.1,
    fees: 2.5,
    tags: '',
    notes: ''
  })

  const onChange = (e) => setForm(f => ({...f, [e.target.name]: e.target.value}))

  return (
    <div style={{border: '1px solid #ddd', borderRadius: 12, padding: 16}}>
      <h3 style={{marginTop: 0}}>Nový obchod</h3>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12}}>
        <label>Instrument
          <input name="instrument" value={form.instrument} onChange={onChange} />
        </label>
        <label>Směr
          <select name="direction" value={form.direction} onChange={onChange}>
            <option>LONG</option>
            <option>SHORT</option>
          </select>
        </label>
        <label>Vstupní čas
          <input name="entry_time" type="datetime-local"
            value={form.entry_time.slice(0,16)}
            onChange={e => setForm(f => ({...f, entry_time: new Date(e.target.value).toISOString()}))} />
        </label>
        <label>Vstupní cena
          <input name="entry_price" type="number" step="0.01" value={form.entry_price} onChange={onChange} />
        </label>

        <label>Kontrakty
          <input name="quantity" type="number" value={form.quantity} onChange={onChange} />
        </label>
        <label>Tick value
          <input name="tick_value" type="number" step="0.01" value={form.tick_value} onChange={onChange} />
        </label>
        <label>Tick size
          <input name="tick_size" type="number" step="0.0001" value={form.tick_size} onChange={onChange} />
        </label>
        <label>Poplatky
          <input name="fees" type="number" step="0.01" value={form.fees} onChange={onChange} />
        </label>

        <label style={{gridColumn: 'span 2'}}>Tagy
          <input name="tags" value={form.tags} onChange={onChange} placeholder="strategie, pattern, seance" />
        </label>
        <label style={{gridColumn: 'span 2'}}>Poznámky
          <input name="notes" value={form.notes} onChange={onChange} />
        </label>
      </div>

      <button
        style={{marginTop: 12, padding: '8px 14px', borderRadius: 10, border: '1px solid #ccc', cursor: 'pointer'}}
        onClick={() => onCreate({...form, entry_price: parseFloat(form.entry_price), quantity: parseInt(form.quantity, 10),
          tick_value: parseFloat(form.tick_value), tick_size: parseFloat(form.tick_size), fees: parseFloat(form.fees)})}
      >
        Uložit obchod
      </button>
    </div>
  )
}
