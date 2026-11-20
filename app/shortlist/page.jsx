'use client'

import { useEffect, useMemo, useState } from 'react'
import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'
import { COUNTRIES } from '@/lib/data'

const STATUSES = ['Researching', 'Requirements checked', 'Preparing documents', 'Applied', 'Offer received', 'Not proceeding']
const emptyForm = { university: '', programme: '', country: 'GB', source: '', deadline: '', status: 'Researching', notes: '' }

function safeHttpUrl(value) {
  try { const url = new URL(value); return ['http:', 'https:'].includes(url.protocol) ? url.toString() : '' }
  catch { return '' }
}

export default function ShortlistPage() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [ready, setReady] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    try { setItems(JSON.parse(localStorage.getItem('cyf-shortlist') || '[]')) }
    catch (error) { console.warn('Could not restore shortlist.', error) }
    setReady(true)
  }, [])
  useEffect(() => { if (ready) localStorage.setItem('cyf-shortlist', JSON.stringify(items)) }, [items, ready])

  const filtered = useMemo(() => items.filter((item) => {
    const matchesStatus = filter === 'all' || item.status === filter
    const matchesText = `${item.university} ${item.programme} ${item.countryName}`.toLowerCase().includes(query.toLowerCase())
    return matchesStatus && matchesText
  }), [items, filter, query])

  const update = (key, value) => setForm((previous) => ({ ...previous, [key]: value }))
  const addItem = (event) => {
    event.preventDefault()
    if (!form.university.trim() || !form.programme.trim()) { setMessage('Add both a university and programme name.'); return }
    const country = COUNTRIES.find((item) => item.code === form.country)
    const newItem = { ...form, id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, university: form.university.trim(), programme: form.programme.trim(), countryName: country?.name || form.country, createdAt: new Date().toISOString() }
    setItems((previous) => [newItem, ...previous])
    setForm(emptyForm)
    setMessage('Added to your shortlist. It is saved in this browser.')
  }
  const updateStatus = (id, status) => setItems((previous) => previous.map((item) => item.id === id ? { ...item, status } : item))
  const removeItem = (id) => setItems((previous) => previous.filter((item) => item.id !== id))
  const exportCsv = () => {
    const columns = ['university', 'programme', 'countryName', 'deadline', 'status', 'source', 'notes']
    const rows = [columns.join(','), ...items.map((item) => columns.map((key) => `"${String(item[key] || '').replaceAll('"', '""')}"`).join(','))]
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'checkifyoufit-shortlist.csv'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return <>
    <SiteHeader/>
    <main className="inner-page shortlist-page">
      <section className="page-hero page-hero-shortlist"><div className="container page-hero-content"><span className="eyebrow">Your application workspace</span><h1>Build your <span className="gradient-text">university shortlist.</span></h1><p>Keep track of programmes you are researching, the official links you have checked and the stage of each application.</p></div></section>
      <div className="container page-content">
        <section className="tool-panel"><div className="panel-heading"><div><span className="eyebrow-mini">Add a programme</span><h2>Save a university to your shortlist</h2><p>This is a personal tracker, not a live university search database. Enter details from official university pages.</p></div></div><form className="shortlist-form" onSubmit={addItem}><label>University name<input value={form.university} onChange={(event) => update('university', event.target.value)} required placeholder="e.g. University of Glasgow"/></label><label>Programme / course<input value={form.programme} onChange={(event) => update('programme', event.target.value)} required placeholder="e.g. MSc Data Science"/></label><label>Destination<select value={form.country} onChange={(event) => update('country', event.target.value)}>{COUNTRIES.map((country) => <option value={country.code} key={country.code}>{country.flag} {country.name}</option>)}</select></label><label>Application deadline<input type="date" value={form.deadline} onChange={(event) => update('deadline', event.target.value)}/></label><label>Official programme URL<input type="url" value={form.source} onChange={(event) => update('source', event.target.value)} placeholder="https://university.edu/programme"/></label><label>Status<select value={form.status} onChange={(event) => update('status', event.target.value)}>{STATUSES.map((status) => <option key={status}>{status}</option>)}</select></label><label className="shortlist-notes">Notes<textarea rows="3" value={form.notes} onChange={(event) => update('notes', event.target.value)} placeholder="Entry requirements, tuition, questions to ask..."/></label><button className="btn btn-primary" type="submit">＋ Add to shortlist</button>{message && <p className="inline-feedback" role="status">{message}</p>}</form></section>

        <section className="tool-panel"><div className="panel-heading shortlist-list-heading"><div><span className="eyebrow-mini">Your saved options</span><h2>Application tracker <span className="count-pill">{items.length}</span></h2><p>Your shortlist is saved locally in this browser and is not synced to an account.</p></div><div className="shortlist-tools"><button className="btn btn-glass" onClick={exportCsv} disabled={!items.length}>Export CSV ↓</button><button className="btn btn-glass" onClick={() => window.print()} disabled={!items.length}>Print</button></div></div><div className="shortlist-filters"><input className="search-input" placeholder="Search university or course..." value={query} onChange={(event) => setQuery(event.target.value)}/><select value={filter} onChange={(event) => setFilter(event.target.value)}><option value="all">All statuses</option>{STATUSES.map((status) => <option key={status}>{status}</option>)}</select></div>{filtered.length ? <div className="shortlist-grid">{filtered.map((item) => <article className="shortlist-card" key={item.id}><div className="shortlist-card-top"><span>{COUNTRIES.find((country) => country.name === item.countryName)?.flag || '🌍'} {item.countryName}</span><button className="remove-link" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.university}`}>Remove ×</button></div><h3>{item.university}</h3><p className="shortlist-programme">{item.programme}</p>{item.deadline && <p className="shortlist-deadline">Deadline: {item.deadline}</p>}{item.notes && <p className="shortlist-note-text">{item.notes}</p>}<div className="shortlist-card-bottom"><select aria-label={`Status for ${item.university}`} value={item.status} onChange={(event) => updateStatus(item.id, event.target.value)}>{STATUSES.map((status) => <option key={status}>{status}</option>)}</select>{safeHttpUrl(item.source) && <a className="source-link" href={safeHttpUrl(item.source)} target="_blank" rel="noreferrer">Official page ↗</a>}</div></article>)}</div> : <div className="empty-state"><span>▤</span><h3>{items.length ? 'No matching programmes' : 'Your shortlist is empty'}</h3><p>{items.length ? 'Try a different search or status filter.' : 'Add the universities and courses you are researching to keep them organised.'}</p></div>}</section>
      </div>
    </main>
    <SiteFooter/>
  </>
}
