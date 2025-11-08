const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function fetchTrades() {
  const r = await fetch(`${API}/trades`)
  return r.json()
}

export async function createTrade(t) {
  const r = await fetch(`${API}/trades`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(t)
  })
  return r.json()
}

export async function patchTrade(id, patch) {
  const r = await fetch(`${API}/trades/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(patch)
  })
  return r.json()
}

export async function getMetrics() {
  const r = await fetch(`${API}/metrics`)
  return r.json()
}

export async function getEquity() {
  const r = await fetch(`${API}/equity`)
  return r.json()
}
