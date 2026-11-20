import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'

const INSTRUCTOR = { name: 'Dhonita Tripura', role: 'Assistant Professor', email: 'dhonita@rmstu.ac.bd', org: 'Rangamati Science & Technology University', photo: '/instructor/dhonita-tripura.webp', badge: 'Course Instructor' }
const DEVELOPERS = [
  { name: 'Saifur Rahman', role: 'Developer', id: '2101011020', photo: '/developer/saifur-rahman.jpg' },
  { name: 'MD Jahed Hossain', role: 'Developer', id: '2201011010', photo: '/developer/jahed-hossain.jpg' },
]

function ProfileCard({ person, wide = false }) {
  return <article className={`profile-card ${wide ? 'profile-card-wide' : ''}`}><div className="profile-photo">{person.photo ? <img src={person.photo} alt={person.name} loading="lazy"/> : <span>{person.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span>}{person.badge && <small>{person.badge}</small>}</div><div className="profile-info"><span className="eyebrow-mini">{person.role}</span><h3>{person.name}</h3>{person.id && <p className="profile-sub">Student ID: {person.id}</p>}{person.org && <p className="profile-org">{person.org}</p>}{person.email && <a className="source-link" href={`mailto:${person.email}`}>{person.email} ↗</a>}</div></article>
}

export default function DevelopersPage() {
  return <>
    <SiteHeader/>
    <main className="inner-page developers-page">
      <section className="page-hero page-hero-developers"><div className="container page-hero-content"><span className="eyebrow">People behind the project</span><h1>Built with curiosity. <span className="gradient-text">Guided by learning.</span></h1><p>CheckIfYouFit is an academic project developed at Rangamati Science & Technology University.</p></div></section>
      <div className="container page-content">
        <section className="team-section"><div className="section-heading"><span className="eyebrow-mini">Academic guidance</span><h2>Course instructor</h2></div><div className="profile-grid instructor-grid"><ProfileCard person={INSTRUCTOR} wide/></div></section>
        <section className="team-section"><div className="section-heading"><span className="eyebrow-mini">Project team</span><h2>Developers</h2><p>The people responsible for designing and building the current project.</p></div><div className="profile-grid dev-grid">{DEVELOPERS.map((person) => <ProfileCard key={person.name} person={person}/>)}</div></section>
        <section className="university-block"><img src="/developer/rmst-university.jpg" alt="Rangamati Science and Technology University"/><div><span className="eyebrow-mini">Academic institution</span><h2>Rangamati Science & Technology University</h2><p>Rangamati, Bangladesh</p></div><a className="btn btn-glass" href="https://rmstu.ac.bd" target="_blank" rel="noreferrer">Visit university ↗</a></section>
      </div>
    </main>
    <SiteFooter/>
  </>
}
