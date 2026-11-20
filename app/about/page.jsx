import Link from 'next/link'
import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'

export default function AboutPage() {
  return <>
    <SiteHeader/>
    <main className="inner-page about-page">
      <section className="page-hero page-hero-about"><div className="container page-hero-content"><span className="eyebrow">About CheckIfYouFit</span><h1>Better information. <span className="gradient-text">Better decisions.</span></h1><p>CheckIfYouFit is a study-abroad planning and guidance platform designed to make early international education research easier to understand and organise.</p></div></section>
      <div className="container page-content">
        <section className="about-intro-grid"><div className="about-card"><span className="eyebrow-mini">Our purpose</span><h2>Help students start with clarity, not guesswork.</h2><p>The platform brings an indicative profile check, destination comparison, scholarship links, cost planning and document preparation into one place. It is designed to support informed conversations — not replace university or immigration decisions.</p></div><div className="about-card about-card-accent"><span className="eyebrow-mini">Our promise</span><h3>We will be clear about what is known, estimated and still needs verification.</h3><p>Official sources should always be the final reference for admission, fees, scholarship rules and visa conditions.</p></div></section>
        <section className="methodology-section"><div className="section-heading"><span className="eyebrow-mini">How the assessment works</span><h2>A simple model, openly explained.</h2><p>The current starter assessment uses four weighted factors to organise a student's early profile.</p></div><div className="method-grid"><article><strong>30%</strong><h3>English profile</h3><p>Compares the selected English band with a broad model benchmark. Actual test and component requirements vary.</p></article><article><strong>25%</strong><h3>Academic results</h3><p>Uses a broad GPA band. Course prerequisites, subject grades and credential equivalency are not fully modelled.</p></article><article><strong>25%</strong><h3>Budget planning</h3><p>Uses starter cost assumptions where available. Missing values are neutral, never treated as free study.</p></article><article><strong>20%</strong><h3>Qualification route</h3><p>Checks the selected qualification against the intended level using simplified rules.</p></article></div></section>
        <section className="limitations-panel"><span className="eyebrow-mini">Current limitations</span><h2>What this version does not do</h2><ul><li>It does not connect to a live university or programme catalogue.</li><li>It does not submit applications or check admission decisions.</li><li>It does not provide legal, immigration or visa advice.</li><li>It does not guarantee scholarship eligibility, admission or visa approval.</li><li>Its cost and English benchmarks are broad starter assumptions that require ongoing verification.</li></ul></section>
        <div className="about-bottom-cta"><div><h2>Meet the people behind the project.</h2><p>Learn about the instructor, developers and university context.</p></div><Link className="btn btn-primary" href="/developers">Meet the team ↗</Link></div>
      </div>
    </main>
    <SiteFooter/>
  </>
}
