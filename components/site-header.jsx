'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSite } from './site-provider'

export function Logo() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 40 40" fill="none"><path d="M4 12.5 20 4l16 8.5-16 8.4L4 12.5Z" fill="currentColor"/><path d="M8 19.5 20 26l12-6.5v7L20 33l-12-6.5v-7Z" fill="currentColor" opacity=".72"/><path d="m14 14 6-3.2 6 3.2-6 3.2-6-3.2Z" fill="#fff" opacity=".85"/></svg>
    </span>
  )
}

const NAV = [
  { key: 'home', href: '/' },
  { key: 'eligibility', href: '/#eligibility' },
  { key: 'destinations', href: '/destinations' },
  { key: 'tools', href: '/tools' },
  { key: 'shortlist', href: '/shortlist' },
  { key: 'scholarships', href: '/scholarships' },
  { key: 'resources', href: '/resources' },
  { key: 'about', href: '/about' },
]

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { theme, toggleTheme, lang, toggleLanguage, t } = useSite()

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)} aria-label="CheckIfYouFit home">
          <Logo />
          <span className="brand-copy"><strong>CheckIf<span>YouFit</span></strong><small>Study abroad, made clearer</small></span>
        </Link>
        <button className="mobile-menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Toggle navigation">{open ? '✕' : '☰'}</button>
        <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
          {NAV.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : item.href.startsWith('/#') ? pathname === '/' : pathname === item.href || pathname.startsWith(`${item.href}/`)
            return <Link key={item.key} href={item.href} className={isActive ? 'active' : ''} onClick={() => setOpen(false)}>{t(item.key)}</Link>
          })}
          <Link href="/developers" className={pathname === '/developers' ? 'active' : ''} onClick={() => setOpen(false)}>{t('developers')}</Link>
          <Link href="/contact" className={pathname === '/contact' ? 'active' : ''} onClick={() => setOpen(false)}>{t('contact')}</Link>
        </nav>
        <div className="header-actions">
          <button className="icon-button language-toggle" type="button" onClick={toggleLanguage} aria-label="Change language">{lang === 'en' ? 'বাংলা' : 'EN'}</button>
          <button className="icon-button theme-toggle" type="button" onClick={toggleTheme} aria-label="Toggle colour theme">{theme === 'dark' ? '☼' : '☾'}</button>
          <Link href="/contact" className="btn btn-primary header-cta">{t('book')} <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </header>
  )
}
