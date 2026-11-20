'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const SiteContext = createContext(null)

const COPY = {
  en: {
    home: 'Home', eligibility: 'Eligibility', destinations: 'Destinations', tools: 'Tools', shortlist: 'Shortlist', scholarships: 'Scholarships', resources: 'Resources', about: 'About', developers: 'Developers', contact: 'Contact',
    book: 'Book consultation', language: 'বাংলা',
    heroEyebrow: 'Study abroad, made clearer',
    heroTitleA: 'Your next chapter', heroTitleB: 'starts with a better plan.',
    heroBody: 'Check your study-abroad profile, compare destinations, explore funding routes and build a practical next-step plan — all in one place.',
    startAssessment: 'Check my eligibility', howItWorks: 'How it works',
    destinationsTitle: 'Explore 22 study destinations',
    destinationsBody: 'Start with a country, then verify the exact course requirements with the institution and official authorities.',
    toolsTitle: 'Useful tools for your study plan',
    toolsBody: 'Practical planning tools to help you organise your budget, documents and next steps.',
    ctaTitle: 'A clearer plan starts with a conversation.',
    ctaBody: 'Share your goals with the team and get guidance on your next steps.',
    contactUs: 'Contact the team',
  },
  bn: {
    home: 'হোম', eligibility: 'যোগ্যতা যাচাই', destinations: 'গন্তব্য', tools: 'টুলস', shortlist: 'শর্টলিস্ট', scholarships: 'স্কলারশিপ', resources: 'রিসোর্স', about: 'আমাদের সম্পর্কে', developers: 'ডেভেলপার', contact: 'যোগাযোগ',
    book: 'পরামর্শ নিন', language: 'English',
    heroEyebrow: 'বিদেশে পড়াশোনা, আরও সহজ পরিকল্পনায়',
    heroTitleA: 'আপনার পরবর্তী অধ্যায়', heroTitleB: 'শুরু হোক সঠিক পরিকল্পনায়।',
    heroBody: 'আপনার স্টাডি-অ্যাব্রড প্রোফাইল যাচাই করুন, দেশ তুলনা করুন, স্কলারশিপের সুযোগ দেখুন এবং পরবর্তী করণীয় সাজিয়ে নিন — এক জায়গায়।',
    startAssessment: 'যোগ্যতা যাচাই করুন', howItWorks: 'যেভাবে কাজ করে',
    destinationsTitle: '২২টি দেশের পড়াশোনার সুযোগ দেখুন',
    destinationsBody: 'প্রথমে দেশ বেছে নিন, এরপর বিশ্ববিদ্যালয় ও সরকারি ওয়েবসাইটে নির্দিষ্ট কোর্সের শর্ত যাচাই করুন।',
    toolsTitle: 'আপনার স্টাডি প্ল্যানের প্রয়োজনীয় টুলস',
    toolsBody: 'বাজেট, ডকুমেন্ট এবং পরবর্তী পদক্ষেপ গুছিয়ে নিতে ব্যবহারিক টুলস।',
    ctaTitle: 'সঠিক পরিকল্পনা শুরু হয় একটি আলোচনার মাধ্যমে।',
    ctaBody: 'আপনার লক্ষ্য জানান, পরবর্তী পদক্ষেপ নিয়ে টিমের কাছ থেকে দিকনির্দেশনা নিন।',
    contactUs: 'টিমের সঙ্গে যোগাযোগ',
  },
}

export function SiteProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const [lang, setLang] = useState('en')

  useEffect(() => {
    const savedTheme = localStorage.getItem('cyf-theme-v3')
    const savedLang = localStorage.getItem('cyf-language')
    const nextTheme = savedTheme === 'dark' ? 'dark' : 'light'
    setTheme(nextTheme)
    setLang(savedLang === 'bn' ? 'bn' : 'en')
    document.documentElement.dataset.theme = nextTheme
    document.documentElement.lang = savedLang === 'bn' ? 'bn' : 'en'
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    localStorage.setItem('cyf-theme-v3', next)
  }

  const toggleLanguage = () => {
    const next = lang === 'en' ? 'bn' : 'en'
    setLang(next)
    document.documentElement.lang = next
    localStorage.setItem('cyf-language', next)
  }

  const value = useMemo(() => ({ theme, lang, toggleTheme, toggleLanguage, t: (key) => COPY[lang]?.[key] || COPY.en[key] || key }), [theme, lang])
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export function useSite() {
  const context = useContext(SiteContext)
  if (!context) throw new Error('useSite must be used inside SiteProvider')
  return context
}
