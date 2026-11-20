const MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite'
const MAX_MESSAGE = 2000
const MAX_HISTORY = 12

const SYSTEM_PROMPT = `You are FitHelper, the friendly AI assistant built into CheckIfYouFit — a study-abroad planning platform for Bangladeshi students covering 22 destinations.

What the site offers (reference these when relevant):
- A 7-step eligibility assessment producing an indicative fit score (weighted: English 30%, grades 25%, budget 25%, qualification 20%)
- Destination directory, country comparison table, scholarship finder, cost estimator, document checklist, and a university shortlist tracker
- All planning is local/browser-based; the site does not connect to live admissions systems

Rules:
- Answer in the same language the user writes in (English or Bangla).
- Be practical, warm and concise (under ~150 words unless detail is needed).
- Always remind users that scores, costs and requirements are indicative — they must verify official university, government and immigration sources before applying or paying anything.
- You may suggest using the site's own tools (assessment, cost estimator, checklist, shortlist) with their anchors like /#eligibility, /tools#budget, /tools#checklist, /shortlist.
- Never invent specific deadlines, fees or admission guarantees. If unsure, say to check official sources.`

export async function POST(request) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
  if (!apiKey) {
    return Response.json({ error: 'The AI helper is not configured yet. Add GEMINI_API_KEY to .env and restart the dev server.' }, { status: 503 })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const message = typeof body?.message === 'string' ? body.message.trim() : ''
  if (!message) return Response.json({ error: 'Message is required.' }, { status: 400 })
  if (message.length > MAX_MESSAGE) return Response.json({ error: 'Message is too long.' }, { status: 400 })

  const page = typeof body?.page === 'string' ? body.page.slice(0, 120) : '/'
  const history = Array.isArray(body?.history) ? body.history.slice(-MAX_HISTORY) : []
  const contents = [
    ...history
      .filter((item) => item && (item.role === 'user' || item.role === 'model') && typeof item.text === 'string' && item.text.trim())
      .map((item) => ({ role: item.role, parts: [{ text: item.text.slice(0, MAX_MESSAGE) }] })),
    { role: 'user', parts: [{ text: `[User is currently on page: ${page}]\n${message}` }] },
  ]

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: { temperature: 0.4, maxOutputTokens: 700 },
      }),
    })

    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      console.error('Gemini API error', res.status, detail.slice(0, 500))
      return Response.json({ error: 'The assistant is unavailable right now. Please try again later.' }, { status: 502 })
    }

    const data = await res.json()
    const text = data?.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('').trim()
    if (!text) return Response.json({ error: 'The assistant returned an empty response.' }, { status: 502 })
    return Response.json({ reply: text })
  } catch (error) {
    console.error('Assistant request failed', error)
    return Response.json({ error: 'Could not reach the assistant service.' }, { status: 502 })
  }
}
