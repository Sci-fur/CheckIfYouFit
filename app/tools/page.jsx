'use client'

import { useEffect, useMemo, useState } from 'react'
import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'
import { DOCUMENTS_BY_LEVEL, LEVELS } from '@/lib/data'

const DEFAULT_COSTS = { tuition: '12000', living: '850', duration: '2', visa: '300', insurance: '500', flight: '700', other: '250' }

function money(value, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(Number(value || 0))
}

export default function ToolsPage() {
  const [costs, setCosts] = useState(DEFAULT_COSTS)
  const [currency, setCurrency] = useState('USD')
  const [exchangeRate, setExchangeRate] = useState('')
  const [level, setLevel] = useState('master')
  const [checked, setChecked] = useState({})
  const [ready, setReady] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('cyf-tool-state') || '{}')
      if (saved.costs) setCosts({ ...DEFAULT_COSTS, ...saved.costs })
      if (saved.currency) setCurrency(saved.currency)
      if (saved.exchangeRate) setExchangeRate(saved.exchangeRate)
      if (saved.level) setLevel(saved.level)
      if (saved.checked) setChecked(saved.checked)
    } catch (error) { console.warn('Could not restore tool progress.', error) }
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready) localStorage.setItem('cyf-tool-state', JSON.stringify({ costs, currency, exchangeRate, level, checked }))
  }, [costs, currency, exchangeRate, level, checked, ready])

  const numbers = Object.fromEntries(Object.entries(costs).map(([key, value]) => [key, key === 'duration' ? Math.max(1, Number(value) || 1) : Math.max(0, Number(value) || 0)]))
  const annualLiving = numbers.living * 12
  const oneTime = numbers.visa + numbers.insurance + numbers.flight + numbers.other
  const firstYear = numbers.tuition + annualLiving + oneTime
  const courseTotal = (numbers.tuition + annualLiving) * numbers.duration + oneTime
  const conversionReady = currency === 'USD' || Number(exchangeRate) > 0
  const convert = (value) => currency === 'USD' ? value : value * Number(exchangeRate || 0)
  const displayCurrency = currency === 'USD' ? 'USD' : 'BDT'
  const showMoney = (value) => conversionReady ? money(convert(value), displayCurrency) : '—'
  const checklist = useMemo(() => DOCUMENTS_BY_LEVEL[level] || [], [level])
  const completed = checklist.filter((item) => checked[`${level}:${item}`]).length
  const progress = checklist.length ? Math.round((completed / checklist.length) * 100) : 0

  const updateCost = (key, value) => setCosts((previous) => ({ ...previous, [key]: value }))
  const copyChecklist = async () => {
    const lines = checklist.map((item) => `${checked[`${level}:${item}`] ? '[x]' : '[ ]'} ${item}`).join('\n')
    try { await navigator.clipboard.writeText(`CheckIfYouFit document checklist\nStudy level: ${level}\n\n${lines}`); setCopied(true); setTimeout(() => setCopied(false), 2500) }
    catch { setCopied(false) }
  }

  return <>
    <SiteHeader/>
    <main className="inner-page tools-page">
      <section className="page-hero page-hero-tools"><div className="container page-hero-content"><span className="eyebrow">Student planning toolkit</span><h1>Make your study plan <span className="gradient-text">practical.</span></h1><p>Estimate your first-year and full-course costs, then keep track of the documents you need to prepare.</p><div className="page-hero-pills"><span>✓ Saved on this device</span><span>✓ No account needed</span><span>✓ Editable assumptions</span></div></div></section>
      <div className="container page-content">
        <section className="tool-panel" id="budget">
          <div className="panel-heading"><div><span className="eyebrow-mini">Tool 01</span><h2>Study cost estimator</h2><p>Enter figures from your shortlisted university and city. The defaults are examples, not official fee quotes.</p></div><span className="tool-big-icon">＄</span></div>
          <div className="cost-layout">
            <div className="cost-form-grid">
              <label>Annual tuition fee <span>per year</span><div className="input-with-prefix"><b>$</b><input type="number" min="0" value={costs.tuition} onChange={(event) => updateCost('tuition', event.target.value)}/></div></label>
              <label>Monthly living cost <span>per month</span><div className="input-with-prefix"><b>$</b><input type="number" min="0" value={costs.living} onChange={(event) => updateCost('living', event.target.value)}/></div></label>
              <label>Course duration <span>in years</span><div className="input-with-prefix"><input type="number" min="1" max="8" step="0.5" value={costs.duration} onChange={(event) => updateCost('duration', event.target.value)}/><b>yrs</b></div></label>
              <label>Visa / application fees <span>one-time</span><div className="input-with-prefix"><b>$</b><input type="number" min="0" value={costs.visa} onChange={(event) => updateCost('visa', event.target.value)}/></div></label>
              <label>Insurance / health cover <span>one-time estimate</span><div className="input-with-prefix"><b>$</b><input type="number" min="0" value={costs.insurance} onChange={(event) => updateCost('insurance', event.target.value)}/></div></label>
              <label>Flight / travel <span>one-time estimate</span><div className="input-with-prefix"><b>$</b><input type="number" min="0" value={costs.flight} onChange={(event) => updateCost('flight', event.target.value)}/></div></label>
              <label>Other initial costs <span>one-time estimate</span><div className="input-with-prefix"><b>$</b><input type="number" min="0" value={costs.other} onChange={(event) => updateCost('other', event.target.value)}/></div></label>
            </div>
            <aside className="cost-summary"><span className="eyebrow-mini">Your estimate</span><h3>{conversionReady ? showMoney(firstYear) : 'Enter exchange rate'}</h3><p>Estimated first-year total</p><div className="cost-summary-line"><span>Annual tuition + living</span><strong>{showMoney(numbers.tuition + annualLiving)}</strong></div><div className="cost-summary-line"><span>One-time expenses</span><strong>{showMoney(oneTime)}</strong></div><div className="cost-summary-total"><span>Estimated full course</span><strong>{showMoney(courseTotal)}</strong></div><div className="currency-tools"><label>Display currency<select value={currency} onChange={(event) => setCurrency(event.target.value)}><option value="USD">USD</option><option value="BDT">BDT</option></select></label>{currency === 'BDT' && <label>Exchange rate (BDT per USD)<input type="number" min="1" placeholder="Enter current rate" value={exchangeRate} onChange={(event) => setExchangeRate(event.target.value)}/></label>}</div>{!conversionReady && <small className="warning-note">Enter a current exchange rate to show BDT totals. No live exchange rate is used.</small>}<button className="btn btn-primary full-width" type="button" onClick={() => window.print()}>Print cost estimate ↓</button></aside>
          </div>
          <p className="tool-disclaimer">Planning estimate only. Check current tuition, deposits, accommodation, health cover, visa fees and proof-of-funds rules with the university and official authorities. This calculator does not include exchange-rate movement or every possible expense.</p>
        </section>

        <section className="tool-panel checklist-panel" id="checklist">
          <div className="panel-heading"><div><span className="eyebrow-mini">Tool 02</span><h2>Personal document checklist</h2><p>Select your study level and tick off the items as you prepare them. Your progress is saved in this browser.</p></div><span className="tool-big-icon">☷</span></div>
          <div className="checklist-toolbar"><label>Study level<select value={level} onChange={(event) => setLevel(event.target.value)}>{LEVELS.map((item) => <option value={item.id} key={item.id}>{item.title}</option>)}</select></label><div className="checklist-progress"><div><strong>{completed}/{checklist.length}</strong><span>completed</span></div><div className="progress-track"><span style={{ width: `${progress}%` }}/></div></div></div>
          <div className="checklist-items">{checklist.map((item, index) => <label className={`checklist-item ${checked[`${level}:${item}`] ? 'is-checked' : ''}`} key={item}><input type="checkbox" checked={Boolean(checked[`${level}:${item}`])} onChange={(event) => setChecked((previous) => ({ ...previous, [`${level}:${item}`]: event.target.checked }))}/><span className="checkmark">✓</span><span><strong>{item}</strong><small>Confirm whether your chosen institution or visa route requires this document.</small></span><em>{String(index + 1).padStart(2, '0')}</em></label>)}</div>
          <div className="checklist-actions"><button className="btn btn-primary" type="button" onClick={copyChecklist}>Copy checklist</button><button className="btn btn-glass" type="button" onClick={() => window.print()}>Print checklist</button>{copied && <span role="status" className="inline-feedback">Checklist copied.</span>}</div>
          <p className="tool-disclaimer">This is a general preparation list, not a country-specific or university-issued checklist. Requirements vary by programme, applicant and visa category.</p>
        </section>
        <div className="shortlist-promo"><div><span className="eyebrow-mini">Keep everything together</span><h2>Tracking the universities you are considering?</h2><p>Save programme links, deadlines, notes and application status in your personal shortlist.</p></div><a className="btn btn-primary" href="/shortlist">Open my shortlist ↗</a></div>
      </div>
    </main>
    <SiteFooter/>
  </>
}
