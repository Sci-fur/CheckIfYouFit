import './globals.css'
import { SiteProvider } from '@/components/site-provider'
import AiHelper from '@/components/ai-helper'

export const metadata = {
  title: 'CheckIfYouFit — Study Abroad Planning & Eligibility',
  description: 'Explore study destinations, review an indicative eligibility profile, compare countries, plan your budget and organise your application documents.',
  applicationName: 'CheckIfYouFit',
  keywords: ['study abroad', 'eligibility checker', 'scholarships', 'study destinations', 'Bangladesh'],
}

const themeInit = `(function(){try{var t=localStorage.getItem('cyf-theme-v3');if(t!=='dark'&&t!=='light')t='light';document.documentElement.dataset.theme=t;var l=localStorage.getItem('cyf-language')||'en';document.documentElement.lang=l;}catch(e){}})()`

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0e4a3c" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <SiteProvider>{children}</SiteProvider>
        <AiHelper />
      </body>
    </html>
  )
}
