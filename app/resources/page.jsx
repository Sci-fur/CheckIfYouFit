import Link from 'next/link'
import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'

const GUIDES = [
  { tag: 'Getting started', title: 'How to shortlist a study destination', summary: 'Compare course availability, entry requirements, total cost, funding options, climate, distance and support networks.', points: ['Start with your intended subject and study level.', 'Compare actual programmes, not only country reputations.', 'Check entry requirements and application dates on official university pages.', 'Build a realistic budget for the city where you may live.'] },
  { tag: 'English tests', title: 'Understanding English language requirements', summary: 'IELTS is not a universal country-level rule; each institution and programme sets its own accepted tests and minimum scores.', points: ['Check the overall score and each component score.', 'Confirm accepted alternatives such as TOEFL, PTE or other tests.', 'Ask whether a waiver or previous-medium-of-instruction evidence is accepted.', 'Check the test validity period for both admission and visa purposes.'] },
  { tag: 'Budget planning', title: 'Build a realistic study-abroad budget', summary: 'Tuition is only one part of the cost. Include accommodation, food, transport, insurance, visa fees and initial setup costs.', points: ['Use the university fee page for the exact course and intake.', 'Estimate rent and living costs for the specific city.', 'Include deposits, insurance, travel and emergency funds.', 'Review currency changes and official proof-of-funds rules.'] },
  { tag: 'Scholarships', title: 'Prepare a stronger scholarship application', summary: 'Scholarship criteria differ. Build a clear record of academic performance, leadership, community work and career goals.', points: ['Read the scholarship’s official eligibility criteria first.', 'Prepare a tailored statement rather than reusing one generic essay.', 'Request references early and give referees useful context.', 'Keep a calendar for deadlines, documents and interviews.'] },
  { tag: 'Documents', title: 'Organise your application documents', summary: 'A clear document system helps prevent missing files and last-minute errors.', points: ['Keep scans of passports, certificates and transcripts in secure storage.', 'Use consistent file names and check translation requirements.', 'Prepare a course-specific CV and statement of purpose.', 'Never submit altered or misleading documents.'] },
  { tag: 'Safety', title: 'Avoid common study-abroad application risks', summary: 'Verify institutions, representatives, payment instructions and visa information before sharing money or sensitive documents.', points: ['Use the institution’s official website and contact details.', 'Be cautious of guaranteed-admission or guaranteed-visa claims.', 'Confirm payment details directly with the institution.', 'Do not share passwords, one-time codes or original documents unnecessarily.'] },
]

export default function ResourcesPage() {
  return <>
    <SiteHeader/>
    <main className="inner-page resources-page">
      <section className="page-hero page-hero-library"><div className="container page-hero-content"><span className="eyebrow">Student knowledge hub</span><h1>Make informed decisions, <span className="gradient-text">one step at a time.</span></h1><p>Practical guides for researching destinations, planning costs, preparing documents and protecting yourself during the application process.</p></div></section>
      <div className="container page-content">
        <div className="resource-intro"><div><span className="eyebrow-mini">A useful starting point</span><h2>Guides built around the decisions students actually make.</h2></div><p>These guides are general educational information. Always check the current instructions from your chosen university, scholarship provider and immigration authority.</p></div>
        <div className="resource-grid">{GUIDES.map((guide, index) => <article className="resource-card" key={guide.title}><span className="resource-index">0{index + 1}</span><span className="resource-tag">{guide.tag}</span><h3>{guide.title}</h3><p>{guide.summary}</p><details><summary>Read the key points</summary><ul>{guide.points.map((point) => <li key={point}>{point}</li>)}</ul></details></article>)}</div>
        <div className="resource-cta"><div><span className="eyebrow-mini">Put the guide into action</span><h2>Build your own application plan.</h2><p>Use the assessment, cost estimator and checklist to turn your research into a clear plan.</p></div><div><Link className="btn btn-primary" href="/#eligibility">Start assessment ↗</Link><Link className="btn btn-glass" href="/tools">Open student tools</Link></div></div>
      </div>
    </main>
    <SiteFooter/>
  </>
}
