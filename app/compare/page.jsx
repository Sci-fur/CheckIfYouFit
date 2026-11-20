'use client'

import { useEffect, useState } from 'react'
import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'
import { COUNTRIES, COUNTRY_PROFILE } from '@/lib/data'

const DEFAULT_SELECTED = ['GB', 'AU', 'CA']
const DEFAULT_COSTS = Object.fromEntries(COUNTRIES.map((country) => [country.code, COUNTRY_PROFILE[country.code]?.cost ? String(COUNTRY_PROFILE[country.code].cost) : '']))

export default function ComparePage() {
  const [selected, setSelected] = useState(DEFAULT_SELECTED)
  const [costs, setCosts] = useState(DEFAULT_COSTS)
  const [search, setSearch] = useState('')

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('cyf-compare-state') || '{}')
      if (Array.isArray(saved.selected)) setSelected(saved.selected.slice(0, 3))
      if (saved.costs) setCosts(saved.costs)
    } catch (error) { console.warn('Could not restore comparison.', error) }
  }, [])
  useEffect(() => { localStorage.setItem('cyf-compare-state', JSON.stringify({ selected, costs })) }, [selected, costs])

  const toggleCountry = (code) => {
    setSelected((previous) => previous.includes(code) ? previous.filter((item) => item !== code) : previous.length < 3 ? [...previous, code] : previous)
  }
  const selectedCountries = selected.map((code) => COUNTRIES.find((country) => country.code === code)).filter(Boolean)
  const filtered = COUNTRIES.filter((country) => `${country.name} ${country.region}`.toLowerCase().includes(search.toLowerCase()))

  return <>
    <SiteHeader/>
    <main className="inner-page compare-page">
      <section className="page-hero page-hero-world"><div className="container page-hero-content"><span className="eyebrow">Destination planning</span><h1>Compare your <span className="gradient-text">study options.</span></h1><p>Put up to three destinations side by side. Add your own cost estimates and use official links to verify current rules.</p></div></section>
      <div className="container page-content">
        <section className="tool-panel country-select-panel"><div className="panel-heading"><div><span className="eyebrow-mini">Choose destinations</span><h2>Select up to three countries</h2><p>{selected.length}/3 selected · Your selection is saved in this browser.</p></div></div><input className="search-input" placeholder="Search destinations..." value={search} onChange={(event) => setSearch(event.target.value)}/><div className="compare-country-picker">{filtered.map((country) => <button type="button" key={country.code} className={`compare-country-option ${selected.includes(country.code) ? 'selected' : ''}`} onClick={() => toggleCountry(country.code)} disabled={!selected.includes(country.code) && selected.length >= 3}><span>{country.flag}</span><strong>{country.name}</strong><i>{selected.includes(country.code) ? '✓' : '+'}</i></button>)}</div></section>

        {selectedCountries.length > 0 ? <section className="tool-panel comparison-panel"><div className="panel-heading"><div><span className="eyebrow-mini">Side-by-side view</span><h2>Your destination comparison</h2><p>Country-level notes are not a substitute for a programme-specific assessment.</p></div><button className="btn btn-glass" type="button" onClick={() => setSelected([])}>Clear selection</button></div><div className="comparison-table-wrap"><table className="comparison-table"><thead><tr><th>Planning factor</th>{selectedCountries.map((country) => <th key={country.code}><span className="compare-flag">{country.flag}</span>{country.name}</th>)}</tr></thead><tbody><tr><th>Region</th>{selectedCountries.map((country) => <td key={country.code}>{country.region}</td>)}</tr><tr><th>Bangladeshi HSC route</th>{selectedCountries.map((country) => <td key={country.code}>{country.hsc}</td>)}</tr><tr><th>Indicative English benchmark</th>{selectedCountries.map((country) => <td key={country.code}>Around IELTS {COUNTRY_PROFILE[country.code]?.ielts?.toFixed(1) || '—'} <small>· course-specific</small></td>)}</tr><tr><th>Your annual budget estimate (USD)</th>{selectedCountries.map((country) => <td key={country.code}><label className="table-input"><span className="sr-only">Annual budget for {country.name}</span><input type="number" min="0" placeholder={COUNTRY_PROFILE[country.code]?.cost ? String(COUNTRY_PROFILE[country.code].cost) : 'Enter amount'} value={costs[country.code] ?? ''} onChange={(event) => setCosts((previous) => ({ ...previous, [country.code]: event.target.value }))}/></label><small>Enter a current city / university estimate</small></td>)}</tr><tr><th>Visa / official information</th>{selectedCountries.map((country) => <td key={country.code}><a className="source-link" href={country.src} target="_blank" rel="noreferrer">Check official rules ↗</a></td>)}</tr></tbody></table></div><p className="tool-disclaimer">The placeholder figures in the country profile are starter model assumptions, not verified current tuition or living-cost data. If a country has no starter estimate, it is intentionally left blank — not treated as free. IELTS benchmarks are broad model references and vary by course.</p></section> : <div className="empty-state"><span>◎</span><h3>Select destinations to compare</h3><p>Choose up to three countries from the list above.</p></div>}
        <div className="compare-tip"><span>✦</span><p><strong>Compare the full picture.</strong> Check course fit, tuition, city living costs, scholarship availability, visa rules, post-study work conditions and your personal support network before choosing a destination.</p></div>
      </div>
    </main>
    <SiteFooter/>
  </>
}
