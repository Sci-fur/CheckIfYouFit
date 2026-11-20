'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

const SUGGESTIONS = [
  'Is my profile strong enough for the UK?',
  'How do I estimate my study costs?',
  'What documents do I need for a master\'s?',
]

function renderRichText(text) {
  const nodes = []
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g
  let last = 0
  let match
  let key = 0
  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index))
    const token = match[0]
    if (token.startsWith('**')) {
      nodes.push(<strong key={key++}>{token.slice(2, -2)}</strong>)
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/)
      const href = linkMatch?.[2] || '#'
      const safe = href.startsWith('/') || href.startsWith('https://') || href.startsWith('http://') ? href : '#'
      nodes.push(<a key={key++} href={safe} target={safe.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{linkMatch?.[1] || token}</a>)
    }
    last = match.index + token.length
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

export default function AiHelper() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Hi! I\'m FitHelper 👋 Ask me anything about studying abroad — destinations, budgets, documents, scholarships or your eligibility score.' },
  ])
  const pathname = usePathname()
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open, busy])

  const send = async (text) => {
    const message = (text ?? input).trim()
    if (!message || busy) return
    setInput('')
    setError('')
    const next = [...messages, { role: 'user', text: message }]
    setMessages(next)
    setBusy(true)
    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          page: pathname,
          history: next.slice(-12).map(({ role, text: value }) => ({ role: role === 'model' ? 'model' : 'user', text: value })),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.reply) throw new Error(data.error || 'Something went wrong.')
      setMessages((previous) => [...previous, { role: 'model', text: data.reply }])
    } catch (err) {
      setError(err.message || 'Could not reach the assistant.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <button
        type="button"
        className={`ai-fab ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
      >
        {open ? '✕' : '✦'}
      </button>

      {open && (
        <section className="ai-panel" aria-label="AI study-abroad assistant">
          <header className="ai-panel-head">
            <div>
              <strong>FitHelper</strong>
              <span>AI study-abroad assistant</span>
            </div>
            <span className="ai-online"><i />Online</span>
          </header>

          <div className="ai-messages" ref={scrollRef}>
            {messages.map((message, index) => (
              <div key={index} className={`ai-msg ${message.role === 'user' ? 'is-user' : 'is-model'}`}>
                {message.role === 'model' ? renderRichText(message.text) : message.text}
              </div>
            ))}
            {busy && <div className="ai-msg is-model is-typing"><i /><i /><i /></div>}
          </div>

          {messages.length <= 2 && !busy && (
            <div className="ai-suggestions">
              {SUGGESTIONS.map((item) => (
                <button key={item} type="button" onClick={() => send(item)}>{item}</button>
              ))}
            </div>
          )}

          {error && <p className="ai-error" role="alert">{error}</p>}

          <form className="ai-input-row" onSubmit={(event) => { event.preventDefault(); send() }}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about destinations, budgets, documents…"
              maxLength={2000}
              disabled={busy}
            />
            <button type="submit" disabled={busy || !input.trim()} aria-label="Send message">➤</button>
          </form>
          <p className="ai-disclaimer">AI guidance is general information — always verify official sources before applying.</p>
        </section>
      )}
    </>
  )
}
