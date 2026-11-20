'use client'

import { useMemo, useState } from 'react'
import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'
import { SCHOLARSHIPS } from '@/lib/data'

export default function ScholarshipsPage() {
  const [query, setQuery] = useState('')
  const [country, setCountry] = useState('all')
  const [level, setLevel] = useState('all')
  const [funding, setFunding] = useState('all')
  const countries = [...new Set(SCHOLARSHIPS.map((item) => item.country))].sort()
  const filtered = useMemo(() => SCHOLARSHIPS.filter((item) => {
    const matchesQuery = `${item.name} ${item.country} ${item.summary}`.toLowerCase().includes(query.toLowerCase())
    const matchesCountry = country === 'all' || item.country === country
    const matchesLevel = level === 'all' || item.levels.includes(level)
    const matchesFunding = funding === 'all' || item.funding === funding
    return matchesQuery && matchesCountry && matchesLevel && matchesFunding
  }), [query, country, level, funding])

  return <>
    <SiteHeader/>
    <main className="inner-page scholarship-page">
      <section className="page-hero page-hero-campus"><div className="container page-hero-content"><span className="eyebrow">Funding directory</span><h1>Find funding for your <span className="gradient-text">next chapter.</span></h1><p>Explore a starter directory of well-known scholarship routes and continue to each official provider for current eligibility and application dates.</p></div></section>
      <div className="container page-content">
        <div className="scholarship-note"><span>ⓘ</span><p><strong>Important:</strong> This is a curated starting directory, not a live scholarship feed. Deadlines, eligible countries, benefits and selection rules change by cycle. Always check the official provider website.</p></div>
        <section className="tool-panel scholarship-filters"><div className="panel-heading"><div><span className="eyebrow-mini">Search opportunities</span><h2>Scholarship finder</h2><p>{filtered.length} opportunities match your filters.</p></div></div><div className="filter-grid"><label>Search<input className="search-input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search scholarship or country"/></label><label>Destination<select value={country} onChange={(event) => setCountry(event.target.value)}><option value="all">All destinations</option>{countries.map((item) => <option key={item} value={item}>{item}</option>)}</select></label><label>Study level<select value={level} onChange={(event) => setLevel(event.target.value)}><option value="all">All levels</option><option value="bachelor">Bachelor's</option><option value="master">Master's</option><option value="phd">PhD / Research</option></select></label><label>Funding<select value={funding} onChange={(event) => setFunding(event.target.value)}><option value="all">All funding types</option>{[...new Set(SCHOLARSHIPS.map((item) => item.funding))].map((item) => <option key={item} value={item}>{item}</option>)}</select></label></div></section>
        <div className="scholarship-grid">{filtered.map((item) => <article className="scholarship-card" key={item.id}><div className="scholarship-card-top"><span className="scholarship-country">{item.country}</span><span className="funding-pill">{item.funding}</span></div><h3>{item.name}</h3><p>{item.summary}</p><div className="scholarship-meta"><span>Study level: {item.levels.map((value) => value.toUpperCase()).join(', ')}</span><span>Cycle: check provider</span></div><div className="scholarship-links"><a className="btn btn-primary" href={item.url} target="_blank" rel="noreferrer">Official scholarship page ↗</a>{item.countryUrl && <a className="source-link" href={item.countryUrl} target="_blank" rel="noreferrer">Bangladesh intake details ↗</a>}</div></article>)}</div>
        {filtered.length === 0 && <div className="empty-state"><span>⌕</span><h3>No matching scholarships</h3><p>Try changing your search or filters.</p><button className="btn btn-glass" onClick={() => { setQuery(''); setCountry('all'); setLevel('all'); setFunding('all') }}>Clear filters</button></div>}
      </div>
    </main>
    <SiteFooter/>
  </>
}
