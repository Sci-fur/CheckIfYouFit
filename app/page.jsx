'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { COUNTRIES, LEVELS, QUALIFICATIONS, GRADES, ENGLISH, BUDGETS, INTAKES } from '@/lib/data'
import { computeResults } from '@/lib/fit'
import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'
import DestinationCard from '@/components/destination-card'
import { useSite } from '@/components/site-provider'

const TOTAL_STEPS = 7
const STEP_TITLES = {
  1: ['Where would you like to study?', 'Choose a destination to start your assessment.'],
  2: ['What level do you plan to study?', 'Select the level you intend to apply for.'],
  3: ['What qualification do you hold?', 'Choose your highest completed or expected qualification.'],
  4: ['How are your academic results?', 'Select the range closest to your overall result.'],
  5: ['What is your English proficiency?', 'Choose your IELTS band or the closest current level.'],
  6: ['What is your annual study budget?', 'Include tuition and living costs, in USD per year.'],
  7: ['When would you like to begin?', 'Choose your preferred intake period.'],
}
const STEP_OPTIONS = {
  2: { data: LEVELS, key: 'level' },
  3: { data: QUALIFICATIONS, key: 'qualification' },
  4: { data: GRADES, key: 'grade' },
  5: { data: ENGLISH, key: 'english' },
  6: { data: BUDGETS, key: 'budget' },
  7: { data: INTAKES, key: 'intake' },
}
const REQUIRED_KEYS = ['country', 'level', 'qualification', 'grade', 'english', 'budget', 'intake']
const encodeAssessment = (value) => btoa(String.fromCharCode(...new TextEncoder().encode(JSON.stringify(value))))
const decodeAssessment = (value) => JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(value), (character) => character.charCodeAt(0))))

function Gauge({ score, color }) {
  const radius = 48
  const circumference = 2 * Math.PI * radius
  return (
    <div className="gauge-wrap" aria-label={`Indicative fit score ${score} out of 100`}>
      <svg className="gauge-svg" viewBox="0 0 120 120" role="img" aria-hidden="true">
        <circle cx="60" cy="60" r={radius} className="gauge-track" />
        <circle cx="60" cy="60" r={radius} className="gauge-progress" stroke={color} strokeDasharray={circumference} strokeDashoffset={circumference * (1 - score / 100)} />
      </svg>
      <div className="gauge-value"><strong>{score}</strong><span>out of 100</span></div>
    </div>
  )
}

function FactorBar({ factor }) {
  const tone = factor.val >= 70 ? 'high' : factor.val >= 45 ? 'medium' : 'low'
  return (
    <div className="factor-row">
      <div className="factor-top"><strong>{factor.name}</strong><span>{factor.val}/100 <small>· {factor.weight}</small></span></div>
      <div className="factor-track"><span className={`factor-fill ${tone}`} style={{ width: `${factor.val}%` }} /></div>
      <p>{factor.note}</p>
    </div>
  )
}

function ResultCard({ results, answers, onReset }) {
  const [feedback, setFeedback] = useState('')
  const saveReport = () => {
    localStorage.setItem('cyf-saved-report', JSON.stringify({ answers, results, savedAt: new Date().toISOString() }))
    window.dispatchEvent(new Event('cyf-report-saved'))
    setFeedback('Your report has been saved on this device.')
  }
  const shareReport = async () => {
    const url = new URL(window.location.href)
    url.hash = 'eligibility'
    url.searchParams.set('assessment', encodeAssessment(answers))
    try {
      if (navigator.share) await navigator.share({ title: 'My CheckIfYouFit assessment', text: `My indicative study-abroad fit score is ${results.overall}/100 for ${results.country.name}.`, url: url.toString() })
      else { await navigator.clipboard.writeText(url.toString()); setFeedback('Share link copied to clipboard.') }
    } catch (error) {
      if (error?.name !== 'AbortError') setFeedback('Could not share automatically. You can copy the page URL from your browser.')
    }
  }
  const emailReport = () => {
    const body = `My CheckIfYouFit assessment\nDestination: ${results.country.name}\nIndicative score: ${results.overall}/100\nProfile: ${answers.level}, ${answers.qualification}, ${answers.grade}, ${answers.english}, ${answers.budget}, ${answers.intake}\n\nThis is a planning estimate, not an admission decision.`
    window.location.href = `mailto:?subject=${encodeURIComponent('My CheckIfYouFit assessment')}&body=${encodeURIComponent(body)}`
  }
  const message = `Hello, I completed the CheckIfYouFit assessment. My selected destination is ${results.country.name} and my indicative score is ${results.overall}/100. I would like guidance on the next steps.`
  return (
    <div className="result-view" aria-live="polite">
      <div className="result-topline"><span className="status-dot"/> Your assessment is ready <span className="result-date">Indicative profile · not an admission decision</span></div>
      <div className="result-hero">
        <Gauge score={results.overall} color={results.verdict.ring}/>
        <div className="result-summary">
          <span className="result-country">{results.country.flag} {results.country.name}</span>
          <h3>{results.verdict.label}</h3>
          <p>{results.verdict.description}</p>
          <div className="result-actions">
            <button className="btn btn-primary" onClick={() => window.print()}>↓ Download / Print report</button>
            <button className="btn btn-glass" onClick={saveReport}>♡ Save report</button>
            <button className="btn btn-glass" onClick={shareReport}>↗ Share</button>
            <button className="btn btn-glass" onClick={emailReport}>✉ Email</button>
          </div>
          {feedback && <p className="inline-feedback" role="status">{feedback}</p>}
        </div>
      </div>

      <div className="result-grid">
        <section className="result-panel">
          <div className="panel-heading"><div><span className="eyebrow-mini">Your profile</span><h4>What shaped your score</h4></div><span className="panel-icon">◈</span></div>
          <div className="factor-list">{results.factors.map((factor) => <FactorBar factor={factor} key={factor.name}/>)}</div>
        </section>
        <section className="result-panel next-steps-panel">
          <div className="panel-heading"><div><span className="eyebrow-mini">Your action plan</span><h4>Recommended next steps</h4></div><span className="panel-icon">✦</span></div>
          <ol className="next-step-list">{results.nextSteps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}</ol>
          <div className="panel-links"><Link href="/tools#checklist">Build my document checklist ↗</Link><Link href="/scholarships">Explore scholarships ↗</Link></div>
        </section>
      </div>

      <section className="result-panel result-recommendations">
        <div className="panel-heading"><div><span className="eyebrow-mini">Explore further</span><h4>Other destinations worth comparing</h4><p>These alternatives use the same illustrative model and are not admission recommendations.</p></div><Link href="/compare" className="text-link">Compare countries ↗</Link></div>
        <div className="alternative-grid">{results.alternatives.map(({ country, score }) => <div className="alternative-card" key={country.code}><span className="alternative-flag">{country.flag}</span><div><strong>{country.name}</strong><small>Indicative score: {score}/100</small></div><button className="mini-link" onClick={() => { window.location.href = `/?country=${country.code}#eligibility` }}>Assess →</button></div>)}</div>
      </section>

      <section className="result-panel institution-panel">
        <div className="panel-heading"><div><span className="eyebrow-mini">Research starters</span><h4>Institutions to explore</h4><p>Examples only — these institutions are not matched to your specific course or eligibility.</p></div></div>
        <div className="institution-chips">{results.institutions.map((name) => <span key={name}>{name}</span>)}</div>
        <a className="source-link" href={results.country.src} target="_blank" rel="noreferrer">Open official country information ↗</a>
      </section>
      <div className="result-bottom"><p><strong>Important:</strong> This score is an early planning signal based on broad, editable starter assumptions. Entry requirements, tuition, scholarships and visa rules vary by course, institution, applicant and intake. Always confirm details from official sources.</p><div><a className="btn btn-primary" href={`https://wa.me/8801773863356?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer">Discuss my result on WhatsApp ↗</a><button className="btn btn-glass" onClick={onReset}>Start a new assessment</button></div></div>
  </div>
  )
}

const FEATURE_CARDS = [
  { icon: '◎', title: 'Compare destinations', text: 'Review entry pathways, English benchmarks and your own budget estimates side by side.', href: '/compare', label: 'Compare countries' },
  { icon: '✦', title: 'Scholarship finder', text: 'Search a starter directory of official scholarship programmes and funding routes.', href: '/scholarships', label: 'Find scholarships' },
  { icon: '◫', title: 'Cost estimator', text: 'Estimate tuition, monthly living costs and one-time expenses for your plan.', href: '/tools#budget', label: 'Estimate costs' },
  { icon: '✓', title: 'Document checklist', text: 'Create a level-based checklist and track what you have already prepared.', href: '/tools#checklist', label: 'Prepare documents' },
  { icon: '▤', title: 'University shortlist', text: 'Save programmes, official links, deadlines and application status in one place.', href: '/shortlist', label: 'Build my shortlist' },
]

export default function HomePage() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({})
  const [countrySearch, setCountrySearch] = useState('')
  const [wizardCountrySearch, setWizardCountrySearch] = useState('')
  const [ready, setReady] = useState(false)
  const [hasSavedReport, setHasSavedReport] = useState(false)
  const { t } = useSite()
  const results = useMemo(() => step === 'results' ? computeResults(answers) : null, [step, answers])

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const savedReport = localStorage.getItem('cyf-saved-report')
      if (savedReport) setHasSavedReport(true)
      const encoded = params.get('assessment')
      const requestedCountry = params.get('country')
      if (encoded) {
        const decoded = decodeAssessment(encoded)
        if (REQUIRED_KEYS.every((key) => decoded[key])) {
          setAnswers(decoded)
          setStep('results')
        }
      } else if (requestedCountry && COUNTRIES.some((country) => country.code === requestedCountry)) {
        setAnswers({ country: requestedCountry })
        setStep(1)
      } else {
        const draft = localStorage.getItem('cyf-assessment-draft')
        if (draft) {
          const restored = JSON.parse(draft)
          setAnswers(restored)
          const nextIndex = REQUIRED_KEYS.findIndex((key) => !restored[key])
          setStep(nextIndex === -1 ? 'results' : Math.max(1, nextIndex + 1))
        }
        const country = params.get('country')
        if (country && COUNTRIES.some((item) => item.code === country)) setAnswers((previous) => ({ ...previous, country }))
      }
    } catch (error) {
      console.warn('Could not restore the saved assessment.', error)
    }
    const onReportSaved = () => setHasSavedReport(true)
    window.addEventListener('cyf-report-saved', onReportSaved)
    setReady(true)
    return () => window.removeEventListener('cyf-report-saved', onReportSaved)
  }, [])

  useEffect(() => {
    if (ready && step !== 'results') localStorage.setItem('cyf-assessment-draft', JSON.stringify(answers))
  }, [answers, ready, step])

  const pick = (key, value) => setAnswers((previous) => ({ ...previous, [key]: value }))
  const canContinue = step === 1 ? Boolean(answers.country) : Boolean(answers[STEP_OPTIONS[step]?.key])
  const goNext = () => step === TOTAL_STEPS ? setStep('results') : setStep((value) => value + 1)
  const goBack = () => step === 'results' ? setStep(TOTAL_STEPS) : setStep((value) => Math.max(1, value - 1))
  const reset = () => { setAnswers({}); setStep(1); setHasSavedReport(false); setWizardCountrySearch(''); setCountrySearch(''); localStorage.removeItem('cyf-assessment-draft'); localStorage.removeItem('cyf-saved-report'); window.history.replaceState({}, '', '/#eligibility') }
  const restoreSavedReport = () => { try { const saved = JSON.parse(localStorage.getItem('cyf-saved-report') || 'null'); if (saved?.answers && REQUIRED_KEYS.every((key) => saved.answers[key])) { setAnswers(saved.answers); setStep('results'); document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth', block: 'center' }) } } catch (error) { console.warn('Could not restore saved report.', error) } }
  const chooseCountry = (code) => { pick('country', code); setStep(1); document.getElementById('eligibility')?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }
  const filteredCountries = COUNTRIES.filter((country) => `${country.name} ${country.region}`.toLowerCase().includes(countrySearch.toLowerCase()))
  const filteredWizardCountries = COUNTRIES.filter((country) => `${country.name} ${country.region}`.toLowerCase().includes(wizardCountrySearch.toLowerCase()))

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SiteHeader/>
      <main id="main-content">
        <section className="hero-section" id="eligibility">
          <div className="hero-image-overlay" aria-hidden="true"/>
          <div className="container hero-layout">
            <div className="hero-copy">
              <span className="eyebrow"><span className="pulse-dot"/>{t('heroEyebrow')}</span>
              <h1>{t('heroTitleA')} <span className="gradient-text">{t('heroTitleB')}</span></h1>
              <p className="hero-lede">{t('heroBody')}</p>
              <div className="hero-buttons"><a href="#assessment" className="btn btn-primary btn-large">{t('startAssessment')} <span>→</span></a><a href="#how-it-works" className="btn btn-outline">▷ {t('howItWorks')}</a></div>
              <div className="hero-metrics"><div><strong>22</strong><span>destinations</span></div><div><strong>7</strong><span>quick steps</span></div><div><strong>4</strong><span>profile factors</span></div></div>
              <div className="hero-note"><span>ⓘ</span> Free planning tool · No account required · Answers stay on this device</div>
              {hasSavedReport && <button className="restore-report-button" type="button" onClick={restoreSavedReport}>↻ Restore my saved assessment</button>}
            </div>

            <div className="wizard-card" id="assessment">
              <div className="wizard-head"><div><span className="eyebrow-mini">Personal profile check</span><h2>{step === 'results' ? 'Your eligibility overview' : 'Check your study-abroad fit'}</h2></div><span className="time-pill">◷ 3–4 min</span></div>
              <div className="wizard-progress"><div className="progress-track"><span style={{ width: `${step === 'results' ? 100 : (step / TOTAL_STEPS) * 100}%` }}/></div><div className="step-labels"><span>Step {step === 'results' ? 7 : step} of 7</span><span>{step === 'results' ? 'Complete' : `${Math.round((step / TOTAL_STEPS) * 100)}%`}</span></div></div>
              {step !== 'results' ? <div className="wizard-body" key={step}>
                <h3>{STEP_TITLES[step][0]}</h3><p className="step-description">{STEP_TITLES[step][1]}</p>
                {step === 1 ? <>
                  <input className="search-input country-search" value={wizardCountrySearch} onChange={(event) => setWizardCountrySearch(event.target.value)} placeholder="Search country or region..." aria-label="Search destinations"/>
                  <div className="country-picker">{filteredWizardCountries.map((country) => <button key={country.code} type="button" className={`country-option ${answers.country === country.code ? 'selected' : ''}`} onClick={() => pick('country', country.code)}><span>{country.flag}</span><strong>{country.name}</strong><small>{country.region}</small><i>{answers.country === country.code ? '✓' : '＋'}</i></button>)}</div>
                </> : <div className="wizard-options">{STEP_OPTIONS[step].data.map((option) => <button key={option.id} type="button" className={`wizard-option ${answers[STEP_OPTIONS[step].key] === option.id ? 'selected' : ''}`} onClick={() => pick(STEP_OPTIONS[step].key, option.id)}><span className="option-icon">{option.icon}</span><span className="option-copy"><strong>{option.title}</strong><small>{option.desc}</small></span><span className="option-check">{answers[STEP_OPTIONS[step].key] === option.id ? '✓' : ''}</span></button>)}</div>}
              </div> : <div className="wizard-results">{results ? <ResultCard results={results} answers={answers} onReset={reset}/> : <p>Please complete all seven steps to see your assessment.</p>}</div>}
              <div className="wizard-footer"><button className="btn btn-glass" type="button" onClick={goBack} disabled={step === 1}>← Back</button><span className="wizard-footer-note">{step === 'results' ? 'Assessment complete' : `${Object.keys(answers).filter((key) => REQUIRED_KEYS.includes(key)).length}/7 answered`}</span>{step !== 'results' && <button className="btn btn-primary" type="button" onClick={goNext} disabled={!canContinue}>{step === 7 ? 'View my result →' : 'Continue →'}</button>}</div>
            </div>
          </div>
          <div className="hero-bottom-glow" aria-hidden="true"/>
        </section>

        <section className="trust-strip"><div className="container trust-grid"><div><span className="trust-icon">◈</span><span><strong>Clear starting point</strong><small>Understand your current profile</small></span></div><div><span className="trust-icon">⌖</span><span><strong>22 destinations</strong><small>Explore global study options</small></span></div><div><span className="trust-icon">▤</span><span><strong>Practical tools</strong><small>Budget and document planning</small></span></div><div><span className="trust-icon">✓</span><span><strong>Official-source first</strong><small>Verify before you apply</small></span></div></div></section>

        <section className="section section-how" id="how-it-works"><div className="container"><div className="section-heading centered"><span className="eyebrow-mini">A simple process</span><h2>From uncertainty to a <span className="gradient-text">clearer plan</span></h2><p>Use the assessment as a starting point, then turn the result into a practical action list.</p></div><div className="steps-grid"><article className="step-card"><span className="step-number">01</span><div className="step-illustration">⌕</div><h3>Share your profile</h3><p>Choose your destination, study level, qualification, grades, English level, budget and intake.</p></article><article className="step-card"><span className="step-number">02</span><div className="step-illustration">◉</div><h3>Understand your fit</h3><p>See an indicative score with a breakdown of the factors that influence your planning profile.</p></article><article className="step-card"><span className="step-number">03</span><div className="step-illustration">✦</div><h3>Plan your next move</h3><p>Explore alternative destinations, funding routes, estimated costs and document preparation.</p></article></div></div></section>

        <section className="section destinations-section" id="destinations"><div className="destinations-image" aria-hidden="true"/><div className="container destinations-content"><div className="section-heading"><span className="eyebrow-mini">Explore globally</span><h2>{t('destinationsTitle')}</h2><p>{t('destinationsBody')}</p></div><div className="destination-toolbar"><div className="destination-search-wrap"><span>⌕</span><input className="search-input" value={countrySearch} onChange={(event) => setCountrySearch(event.target.value)} placeholder="Find a country..." aria-label="Search countries"/></div><Link href="/compare" className="text-link">Compare destinations ↗</Link></div><div className="destination-grid">{filteredCountries.map((country) => <DestinationCard key={country.code} country={country} onCheck={() => chooseCountry(country.code)} />)}</div><div className="destination-directory-link"><Link href="/destinations" className="btn btn-primary">Explore all 22 destinations <span aria-hidden="true">→</span></Link></div><div className="source-disclaimer">Country notes are starter research only. Credential recognition, course entry and visa rules can change; confirm with the university and official authorities.</div></div></section>

        <section className="section tools-section" id="tools"><div className="container"><div className="section-heading"><span className="eyebrow-mini">Plan with confidence</span><h2>{t('toolsTitle')}</h2><p>{t('toolsBody')}</p></div><div className="feature-grid">{FEATURE_CARDS.map((card) => <Link href={card.href} className="feature-card" key={card.title}><span className="feature-icon">{card.icon}</span><h3>{card.title}</h3><p>{card.text}</p><span className="feature-link">{card.label} <b>↗</b></span></Link>)}</div><div className="feature-banner"><div><span className="eyebrow-mini">More than a score</span><h3>Keep your research organised from the first shortlist to your application.</h3><p>Use the resources hub for planning guides, application preparation and official-source links.</p></div><Link href="/resources" className="btn btn-primary">Explore resources ↗</Link></div></div></section>

        <section className="section transparency-section" id="methodology"><div className="container transparency-grid"><div><span className="eyebrow-mini">Transparent by design</span><h2>Know what the score can — and cannot — tell you.</h2><p>The assessment uses a simple weighted model to help organise your thinking. It is not connected to live university admissions systems and does not predict an offer.</p><Link href="/about" className="text-link">Read the methodology ↗</Link></div><div className="weight-card"><h3>Assessment factors</h3><div className="weight-line"><span>English profile</span><strong>30%</strong><i style={{ width: '30%' }}/></div><div className="weight-line"><span>Academic results</span><strong>25%</strong><i style={{ width: '25%' }}/></div><div className="weight-line"><span>Budget planning</span><strong>25%</strong><i style={{ width: '25%' }}/></div><div className="weight-line"><span>Qualification route</span><strong>20%</strong><i style={{ width: '20%' }}/></div><small>Weights are part of the starter model and should be reviewed against verified programme-level data before production use.</small></div></div></section>

        <section className="cta-section"><div className="cta-image" aria-hidden="true"/><div className="container cta-content"><div><span className="eyebrow-mini">Need a second opinion?</span><h2>{t('ctaTitle')}</h2><p>{t('ctaBody')}</p></div><div className="cta-actions"><Link href="/contact" className="btn btn-primary btn-large">{t('contactUs')} ↗</Link><a href="https://wa.me/8801773863356" className="btn btn-outline" target="_blank" rel="noreferrer">WhatsApp us</a></div></div></section>

        <section className="section faq-section"><div className="container faq-layout"><div className="section-heading"><span className="eyebrow-mini">Questions, answered</span><h2>Before you take the next step</h2><p>Important context about what the platform does and how to use the information responsibly.</p></div><div className="faq-list"><details><summary>Does a high fit score guarantee admission?</summary><p>No. The score is an indicative planning tool. Universities assess full applications against course-specific criteria, documents, capacity and other factors.</p></details><details><summary>Are the university and programme results live?</summary><p>No. The current project uses a starter dataset and sample institution names. It does not query a live university catalogue or admissions database.</p></details><details><summary>Are the cost and IELTS figures exact?</summary><p>No. They are broad starter assumptions, not official requirements. Tuition and living costs vary by course, institution, city and year; English requirements vary by programme.</p></details><details><summary>Can I save or share my assessment?</summary><p>Yes. You can save a report on the current device, print it as a PDF, or share a link that contains your selected answers. Avoid sharing personal or sensitive information.</p></details><details><summary>Where should I verify visa and admission rules?</summary><p>Use the official university, government and immigration links provided for each destination. Check the current intake and your own circumstances before making payments or decisions.</p></details></div></div></section>
      </main>
      <SiteFooter/>
    </>
  )
}
