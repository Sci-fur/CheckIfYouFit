import { COUNTRIES, COUNTRY_PROFILE, SAMPLE_UNIS, LEVELS, QUALIFICATIONS } from './data'

export const WEIGHTS = { english: 0.30, grade: 0.25, budget: 0.25, qualification: 0.20 }

const ENGLISH_VALUE = { ielts75: 7.5, ielts65: 6.5, ielts60: 6.0, below: 5.0 }
const GRADE_VALUE = { gpa35: 3.7, gpa30: 3.2, gpa25: 2.7, gpa20: 2.2 }
const BUDGET_VALUE = { b1: 12000, b2: 24000, b3: 48000, b4: 90000 }
const clamp = (value) => Math.max(0, Math.min(100, Math.round(value)))

export function factorScores(answers, profile) {
  const english = ENGLISH_VALUE[answers.english] ?? 0
  const grade = GRADE_VALUE[answers.grade] ?? 0
  const budget = BUDGET_VALUE[answers.budget] ?? 0
  const englishScore = clamp(((english - (profile.ielts - 1.5)) / 1.5) * 100)
  const gradeScore = clamp(((grade - 2.4) / 1.4) * 100)
  // Missing cost data receives a neutral score; it is never treated as free study.
  const budgetScore = profile.cost == null ? 50 : clamp((budget / profile.cost) * 100)

  const qualificationRank = { ssc: 0, hsc: 1, ib: 2, bachelor: 3, master: 4 }
  const levelNeed = { foundation: 0, bachelor: 1, master: 2, phd: 3 }
  const held = qualificationRank[answers.qualification] ?? 0
  const needed = levelNeed[answers.level] ?? 1
  let qualificationScore = held >= needed + 1 ? 100 : held === needed ? 85 : held === needed - 1 ? 55 : 25
  const country = COUNTRIES.find((item) => item.code === answers.country)
  if (country?.hsc?.toLowerCase().includes('supplementary')) qualificationScore = Math.min(qualificationScore, 45)
  else if (country?.hsc?.toLowerCase().includes('foundation')) qualificationScore = Math.min(qualificationScore, 70)

  return { englishScore, gradeScore, budgetScore, qualificationScore }
}

export function verdictFor(score) {
  if (score >= 75) return { label: 'Strong planning fit', ring: '#34d399', description: 'Your selected profile aligns well with the starter model. Confirm exact course requirements before applying.' }
  if (score >= 55) return { label: 'Promising profile', ring: '#fbbf24', description: 'You may have viable routes, but one or more factors deserve a closer review.' }
  if (score >= 35) return { label: 'Needs a closer look', ring: '#fb7185', description: 'A pathway option or profile improvement may help widen your choices.' }
  return { label: 'Plan before applying', ring: '#fb7185', description: 'Your current selections show several gaps against the starter model. Consider improving your profile or exploring alternatives.' }
}

export function computeResults(answers) {
  const country = COUNTRIES.find((item) => item.code === answers.country)
  if (!country) return null
  const profile = COUNTRY_PROFILE[answers.country] || { cost: null, ielts: 6.5 }
  const scores = factorScores(answers, profile)
  const overall = clamp(
    scores.englishScore * WEIGHTS.english +
    scores.gradeScore * WEIGHTS.grade +
    scores.budgetScore * WEIGHTS.budget +
    scores.qualificationScore * WEIGHTS.qualification
  )
  const verdict = verdictFor(overall)
  const english = ENGLISH_VALUE[answers.english] ?? 0
  const grade = GRADE_VALUE[answers.grade] ?? 0
  const budget = BUDGET_VALUE[answers.budget] ?? 0

  const reasons = [
    english >= profile.ielts
      ? `Your selected English band is around IELTS ${english.toFixed(1)}, at or above the model benchmark of ${profile.ielts.toFixed(1)}.`
      : `Your selected English band is around IELTS ${english.toFixed(1)}; the model benchmark is ${profile.ielts.toFixed(1)}.`,
    grade >= 3.0
      ? 'Your selected academic band is a positive starting point; individual courses may set higher or subject-specific requirements.'
      : 'Your academic band may limit direct-entry options; pathway and flexible-entry routes are worth checking.',
    profile.cost == null
      ? 'The starter dataset does not contain a reliable annual cost estimate for this destination.'
      : budget >= profile.cost
        ? 'Your selected budget band is above the starter model estimate; verify tuition and living costs by city and institution.'
        : 'Your selected budget band is below the starter model estimate; review lower-cost cities, funding and scholarships.',
  ]

  const nextSteps = []
  if (scores.englishScore < 70) nextSteps.push('Check the exact English requirement for your target course and plan a test or preparation timeline.')
  if (scores.gradeScore < 60) nextSteps.push('Shortlist programmes with entry routes that match your grades; check subject prerequisites and pathway options.')
  if (scores.budgetScore < 60) nextSteps.push('Build a city-specific budget and review scholarships, deposits, insurance and proof-of-funds requirements.')
  if (scores.qualificationScore < 60) nextSteps.push('Ask the institution how your Bangladeshi qualification is assessed for this level of study.')
  if (!nextSteps.length) nextSteps.push('Choose two or three real programmes and verify their entry, fee, deadline and visa requirements directly.')

  const factors = [
    { name: 'English', val: scores.englishScore, weight: '30%', note: `Selected band ~ IELTS ${english.toFixed(1)} · model benchmark ${profile.ielts.toFixed(1)}` },
    { name: 'Grades', val: scores.gradeScore, weight: '25%', note: `Selected GPA band ~ ${grade.toFixed(1)} · programme-specific thresholds vary` },
    { name: 'Budget', val: scores.budgetScore, weight: '25%', note: profile.cost == null ? 'No starter cost estimate available; neutral score used' : `Selected annual budget ~ $${budget.toLocaleString('en-US')} · starter estimate $${profile.cost.toLocaleString('en-US')}` },
    { name: 'Qualification', val: scores.qualificationScore, weight: '20%', note: `${QUALIFICATIONS.find((item) => item.id === answers.qualification)?.title || 'Selected qualification'} for ${LEVELS.find((item) => item.id === answers.level)?.title || 'selected level'}` },
  ]

  const alternatives = COUNTRIES
    .filter((item) => item.code !== country.code)
    .map((item) => {
      const altProfile = COUNTRY_PROFILE[item.code] || { cost: null, ielts: 6.5 }
      const altScore = factorScores({ ...answers, country: item.code }, altProfile)
      const score = clamp(altScore.englishScore * WEIGHTS.english + altScore.gradeScore * WEIGHTS.grade + altScore.budgetScore * WEIGHTS.budget + altScore.qualificationScore * WEIGHTS.qualification)
      return { country: item, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  return {
    country,
    profile,
    overall,
    verdict,
    reasons,
    factors,
    nextSteps,
    alternatives,
    institutions: (SAMPLE_UNIS[answers.country] || []).slice(0, 4),
  }
}
