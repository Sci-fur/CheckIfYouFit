'use client'

import { useState } from 'react'
import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: 'Eligibility assessment', message: '' })
  const [error, setError] = useState('')
  const update = (key, value) => setForm((previous) => ({ ...previous, [key]: value }))
  const submit = (event) => {
    event.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) { setError('Please complete your name, email and message.'); return }
    const body = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || 'Not provided'}\nInterest: ${form.interest}\n\nMessage:\n${form.message}`
    window.location.href = `mailto:info@flyeducationbd.com?subject=${encodeURIComponent('CheckIfYouFit enquiry')}&body=${encodeURIComponent(body)}`
    setError('Your email application should open with the enquiry prepared. Please review and send it there.')
  }
  const whatsappText = 'Hello, I would like to know more about CheckIfYouFit and study-abroad guidance.'

  return <>
    <SiteHeader/>
    <main className="inner-page contact-page">
      <section className="page-hero page-hero-consultation"><div className="container page-hero-content"><span className="eyebrow">Talk to the team</span><h1>Let’s plan your <span className="gradient-text">next step.</span></h1><p>Send an enquiry or contact the team directly. Share only the information needed to respond to your question.</p></div></section>
      <div className="container page-content contact-layout">
        <section className="tool-panel contact-form-panel"><span className="eyebrow-mini">Send an enquiry</span><h2>How can we help?</h2><p>The form prepares an email in your email application; it does not submit to a website database.</p><form onSubmit={submit} className="contact-form"><label>Your name<input value={form.name} onChange={(event) => update('name', event.target.value)} required placeholder="Full name"/></label><label>Email address<input type="email" value={form.email} onChange={(event) => update('email', event.target.value)} required placeholder="you@example.com"/></label><label>Phone / WhatsApp <span>optional</span><input value={form.phone} onChange={(event) => update('phone', event.target.value)} placeholder="+880..."/></label><label>What would you like help with?<select value={form.interest} onChange={(event) => update('interest', event.target.value)}><option>Eligibility assessment</option><option>Country and course selection</option><option>Scholarship guidance</option><option>Budget planning</option><option>Application documents</option><option>Other enquiry</option></select></label><label className="full-span">Your message<textarea rows="5" value={form.message} onChange={(event) => update('message', event.target.value)} required placeholder="Tell us briefly what you are planning..."/></label><button className="btn btn-primary" type="submit">Prepare email ↗</button>{error && <p className="inline-feedback" role="status">{error}</p>}</form></section>
        <aside className="contact-side"><div className="contact-info-card"><span className="contact-info-icon">✉</span><h3>Email</h3><a href="mailto:info@flyeducationbd.com">info@flyeducationbd.com</a></div><div className="contact-info-card"><span className="contact-info-icon">☎</span><h3>Phone</h3><a href="tel:+8801773863356">+880 1773-863356</a></div><div className="contact-info-card"><span className="contact-info-icon">⌖</span><h3>Location</h3><p>Rangamati, Bangladesh</p></div><a className="whatsapp-card" href={`https://wa.me/8801773863356?text=${encodeURIComponent(whatsappText)}`} target="_blank" rel="noreferrer"><span>◉</span><div><strong>Chat on WhatsApp</strong><small>Open a direct conversation</small></div><b>↗</b></a><p className="tool-disclaimer">Do not send passwords, one-time codes, bank card details or original identity documents through an enquiry form or chat.</p></aside>
      </div>
    </main>
    <SiteFooter/>
  </>
}
