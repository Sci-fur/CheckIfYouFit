'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'
import DestinationCard from '@/components/destination-card'
import { COUNTRIES } from '@/lib/data'

const REGIONS = ['All regions', ...new Set(COUNTRIES.map((country) => country.region))]
const QUICK_CODES = ['GB', 'AU', 'CA', 'US', 'MY', 'KR', 'IT']

export default function DestinationsPage() {
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('All regions')
  const filtered = useMemo(() => COUNTRIES.filter((country) => {
    const matchesQuery = `${country.name} ${country.code} ${country.region}`.toLowerCase().includes(query.toLowerCase())
    const matchesRegion = region === 'All regions' || country.region === region
    return matchesQuery && matchesRegion
  }), [query, region])

  return (
    <>
      <SiteHeader />
      <main className="destinations-directory-page">
        <section className="destinations-directory-hero">
          <div className="destinations-directory-hero-image" aria-hidden="true" />
          <div className="destinations-directory-hero-glow" aria-hidden="true" />
          <div className="container destinations-directory-hero-content">
            <span className="destination-eyebrow"><i /> Study abroad destinations</span>
            <h1>Explore 22+ Study <span>Destinations</span></h1>
            <p>Find the right country for your education, career, and future.</p>
            <div className="destination-directory-controls">
              <label className="destination-directory-search">
                <span aria-hidden="true">⌕</span>
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a country..." aria-label="Find a country" />
                {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search">×</button>}
              </label>
              <div className="destination-quick-pills" aria-label="Popular destinations">
                {QUICK_CODES.map((code) => {
                  const country = COUNTRIES.find((item) => item.code === code)
                  return country ? <button type="button" key={code} onClick={() => setQuery(country.name)} className={query === country.name ? 'selected' : ''}><span>{country.flag}</span>{country.name}</button> : null
                })}
                <button type="button" className="all-destinations-pill" onClick={() => { setQuery(''); setRegion('All regions') }}>All destinations (22+) <span>→</span></button>
              </div>
            </div>
            <div className="destination-hero-stats">
              <span><strong>22+</strong> countries</span>
              <span><strong>4</strong> global regions</span>
              <span><strong>1</strong> clearer study plan</span>
            </div>
          </div>
        </section>

        <section className="destination-directory-section">
          <div className="container">
            <div className="destination-directory-heading">
              <div>
                <span className="eyebrow-mini">Choose your next chapter</span>
                <h2>Find your study destination</h2>
                <p>Every card includes the national flag and a famous place to help you recognise the destination.</p>
              </div>
              <label className="destination-region-select">
                <span>Filter by region</span>
                <select value={region} onChange={(event) => setRegion(event.target.value)}>
                  {REGIONS.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
            </div>
            <div className="destination-results-line"><strong>{filtered.length}</strong> destinations found <span>·</span> <button type="button" onClick={() => { setQuery(''); setRegion('All regions') }}>Reset filters</button></div>
            {filtered.length ? <div className="destination-directory-grid">
              {filtered.map((country) => <DestinationCard key={country.code} country={country} />)}
            </div> : <div className="destination-no-results"><strong>No countries match that search.</strong><button type="button" onClick={() => { setQuery(''); setRegion('All regions') }}>Show all destinations</button></div>}
            <div className="destination-directory-note">
              <span>ⓘ</span>
              <p>Landmark photos are visual destination references. Admission, credential recognition, tuition and visa rules vary by institution and applicant; confirm details through official sources before applying.</p>
            </div>
          </div>
        </section>

        <section className="destination-directory-cta">
          <div className="container destination-directory-cta-inner">
            <div><span className="eyebrow-mini">Ready to take the next step?</span><h2>Check your fit for a destination.</h2><p>Complete the seven-step assessment to organise your profile and compare options.</p></div>
            <Link href="/#eligibility" className="btn btn-primary btn-large">Check my eligibility <span>→</span></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
