'use client'

import Link from 'next/link'
import { Logo } from './site-header'
import { useSite } from './site-provider'

export default function SiteFooter() {
  const { t } = useSite()
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Link href="/" className="brand brand-footer"><Logo/><span className="brand-copy"><strong>CheckIf<span>YouFit</span></strong><small>Study abroad, made clearer</small></span></Link>
          <p>A Bangladesh-based study-abroad guidance platform helping students explore international education pathways across 22 destinations.</p>
          <div className="footer-contact"><a href="tel:+8801773863356">+880 1773-863356</a><a href="mailto:info@flyeducationbd.com">info@flyeducationbd.com</a><span>Rangamati, Jhagrabil, Rangamati - 4500, Bangladesh</span></div>
        </div>
        <div className="footer-column"><h4>Explore</h4><Link href="/#eligibility">{t('eligibility')}</Link><Link href="/destinations">{t('destinations')}</Link><Link href="/compare">Compare countries</Link><Link href="/scholarships">{t('scholarships')}</Link></div>
        <div className="footer-column"><h4>Student tools</h4><Link href="/tools">Budget estimator</Link><Link href="/tools#checklist">Document checklist</Link><Link href="/shortlist">University shortlist</Link><Link href="/resources">Guides & resources</Link><Link href="/about">How the score works</Link></div>
        <div className="footer-column"><h4>Company</h4><Link href="/about">About us</Link><Link href="/developers">Developers</Link><Link href="/contact">Contact</Link><a href="https://rmstu.ac.bd" target="_blank" rel="noreferrer">RMSTU ↗</a></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} CheckIfYouFit. All rights reserved.</span><span>Planning support only · Always verify official requirements.</span><div><Link href="/about">About the tool</Link><Link href="/contact">Contact / support</Link></div></div>
    </footer>
  )
}
