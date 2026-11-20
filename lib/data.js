export const COUNTRIES = [
  { code: 'US', name: 'United States', flag: '🇺🇸', region: 'North America', hsc: 'Yes — confirm programme equivalency', src: 'https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', region: 'UK & Europe', hsc: 'Yes — subject to university entry rules', src: 'https://www.gov.uk/student-visa' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', region: 'Asia-Pacific', hsc: 'Yes — check university and programme rules', src: 'https://www.studyinkorea.go.kr/' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', region: 'North America', hsc: 'Yes — programme-specific equivalency applies', src: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', region: 'Asia-Pacific', hsc: 'Yes — check course and provider requirements', src: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', region: 'Asia-Pacific', hsc: 'Yes — subject to institution requirements', src: 'https://educationmalaysia.gov.my/' },
  { code: 'MT', name: 'Malta', flag: '🇲🇹', region: 'UK & Europe', hsc: 'Usually considered; confirm with institution', src: 'https://um.edu.mt/study/admissionsadvice/international/' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', region: 'UK & Europe', hsc: 'Recognition requirements may apply', src: 'https://nawa.gov.pl/en/' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', region: 'Nordic & Baltic', hsc: 'Country-specific entry and subject requirements apply', src: 'https://www.universityadmissions.se/' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', region: 'UK & Europe', hsc: 'Recognition / equivalency may be required', src: 'https://www.universitaly.it/' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮', region: 'Nordic & Baltic', hsc: 'Recognition and programme requirements apply', src: 'https://www.studyinfinland.fi/' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴', region: 'UK & Europe', hsc: 'Recognition through the relevant authority may apply', src: 'https://cnred.edu.ro/en/' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', region: 'Asia-Pacific', hsc: 'Yes — confirm course-specific entry rules', src: 'https://www.immigration.govt.nz/' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', region: 'UK & Europe', hsc: 'Equivalence may be required depending on community and course', src: 'https://www.studyinbelgium.be/' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', region: 'Nordic & Baltic', hsc: 'GSU / country-specific requirements may include additional study', src: 'https://www.studyinnorway.no/' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺', region: 'UK & Europe', hsc: 'Confirm programme and credential recognition requirements', src: 'https://studyinhungary.hu/' },
  { code: 'CY', name: 'Cyprus', flag: '🇨🇾', region: 'UK & Europe', hsc: 'Confirm entry requirements with the institution', src: 'https://www.moi.gov.cy/' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', region: 'Nordic & Baltic', hsc: 'Supplementary qualifications may be required', src: 'https://studyindenmark.dk/' },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹', region: 'Nordic & Baltic', hsc: 'Recognition may be required', src: 'https://studyin.lt/' },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪', region: 'Nordic & Baltic', hsc: 'Recognition and programme requirements apply', src: 'https://studyinestonia.ee/' },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻', region: 'Nordic & Baltic', hsc: 'Recognition may be required', src: 'https://studyinlatvia.lv/' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', region: 'UK & Europe', hsc: 'Supplementary / subject-specific requirements may apply', src: 'https://studyinaustria.at/en/' },
]

export const REGIONS = [
  { name: 'Nordic & Baltic', countries: ['DK', 'SE', 'FI', 'NO', 'LT', 'LV', 'EE'] },
  { name: 'UK & Europe', countries: ['GB', 'AT', 'BE', 'CY', 'HU', 'IT', 'MT', 'PL', 'RO'] },
  { name: 'North America', countries: ['US', 'CA'] },
  { name: 'Asia-Pacific', countries: ['AU', 'NZ', 'KR', 'MY'] },
]

export const LEVELS = [
  { id: 'bachelor', icon: '🎓', title: "Bachelor's degree", desc: 'Undergraduate, usually 3–4 years' },
  { id: 'master', icon: '📚', title: "Master's degree", desc: 'Postgraduate taught, usually 1–2 years' },
  { id: 'phd', icon: '🔬', title: 'PhD / Research', desc: 'Doctoral and research programmes' },
  { id: 'foundation', icon: '🧭', title: 'Foundation / Diploma', desc: 'Pathway and pre-university study' },
]

export const QUALIFICATIONS = [
  { id: 'hsc', icon: '📄', title: 'HSC / A-Levels', desc: 'Bangladeshi HSC or British A-Levels' },
  { id: 'ib', icon: '🌍', title: 'IB Diploma', desc: 'International Baccalaureate' },
  { id: 'bachelor', icon: '🎓', title: "Bachelor's degree", desc: "For master's and PhD applications" },
  { id: 'master', icon: '📚', title: "Master's degree", desc: 'For PhD applications' },
  { id: 'ssc', icon: '✏️', title: 'SSC / O-Levels', desc: 'Secondary school certificate' },
]

export const GRADES = [
  { id: 'gpa35', icon: '⭐', title: '3.5 – 4.0 GPA', desc: 'Strong academic profile' },
  { id: 'gpa30', icon: '👍', title: '3.0 – 3.49 GPA', desc: 'Competitive for a range of options' },
  { id: 'gpa25', icon: '📊', title: '2.5 – 2.99 GPA', desc: 'Some pathway or flexible options may fit' },
  { id: 'gpa20', icon: '📉', title: 'Below 2.5 GPA', desc: 'A wider pathway search may be needed' },
]

export const ENGLISH = [
  { id: 'ielts75', icon: '🗣️', title: 'IELTS 7.0+', desc: 'Band 7.0 or above' },
  { id: 'ielts65', icon: '🗣️', title: 'IELTS 6.5 – 6.99', desc: 'Band 6.5 to 6.99' },
  { id: 'ielts60', icon: '🗣️', title: 'IELTS 6.0 – 6.49', desc: 'Band 6.0 to 6.49' },
  { id: 'below', icon: '📋', title: 'Below 6.0 / not taken', desc: 'IELTS under 6.0 or no test yet' },
]

export const BUDGETS = [
  { id: 'b1', icon: '💰', title: 'Under $15,000 / year', desc: 'Cost-sensitive plan' },
  { id: 'b2', icon: '💳', title: '$15,000 – $30,000 / year', desc: 'Moderate annual budget' },
  { id: 'b3', icon: '🏦', title: '$30,000 – $60,000 / year', desc: 'Higher annual budget' },
  { id: 'b4', icon: '💎', title: 'Over $60,000 / year', desc: 'Flexible annual budget' },
]

export const INTAKES = [
  { id: 'fall', icon: '🍂', title: 'Fall intake', desc: 'Often September / October' },
  { id: 'spring', icon: '🌸', title: 'Spring intake', desc: 'Often January / February' },
  { id: 'summer', icon: '☀️', title: 'Summer intake', desc: 'Often May / June' },
]

// Starter model assumptions only. Replace these with verified programme/city data before production use.
// null means the starter dataset does not contain a usable estimate; it must not be interpreted as free study.
export const COUNTRY_PROFILE = {
  US: { cost: 45000, ielts: 6.5 }, GB: { cost: 26000, ielts: 6.0 }, KR: { cost: 8000, ielts: 5.5 },
  CA: { cost: 30000, ielts: 6.5 }, AU: { cost: 32000, ielts: 6.0 }, MY: { cost: 7000, ielts: 5.5 },
  MT: { cost: 11000, ielts: 6.0 }, PL: { cost: 4000, ielts: 6.0 }, SE: { cost: null, ielts: 6.0 },
  IT: { cost: 4000, ielts: 6.0 }, FI: { cost: null, ielts: 6.0 }, RO: { cost: 5000, ielts: 6.0 },
  NZ: { cost: 28000, ielts: 6.0 }, BE: { cost: 3000, ielts: 6.0 }, NO: { cost: null, ielts: 6.0 },
  HU: { cost: 8000, ielts: 6.0 }, CY: { cost: 9000, ielts: 6.5 }, DK: { cost: null, ielts: 6.5 },
  LT: { cost: 3000, ielts: 6.0 }, EE: { cost: 3000, ielts: 6.0 }, LV: { cost: 3000, ielts: 6.0 },
  AT: { cost: null, ielts: 6.0 },
}

export const SAMPLE_UNIS = {
  US: ['MIT', 'Stanford University', 'New York University', 'Georgia Tech', 'University of Michigan'],
  GB: ['University of Manchester', 'University of Edinburgh', "King's College London", 'University of Leeds', 'University of Glasgow'],
  KR: ['KAIST', 'Seoul National University', 'Yonsei University', 'Korea University', 'POSTECH'],
  CA: ['University of Toronto', 'University of British Columbia', 'McGill University', 'University of Waterloo', 'McMaster University'],
  AU: ['University of Melbourne', 'UNSW Sydney', 'University of Sydney', 'Monash University', 'University of Queensland'],
  MY: ['University of Malaya', "Taylor's University", 'Monash University Malaysia', 'Sunway University', 'INTI International University'],
  MT: ['University of Malta', 'Global College Malta', 'MCAST'],
  PL: ['University of Warsaw', 'Jagiellonian University', 'Warsaw University of Technology'],
  SE: ['KTH Royal Institute of Technology', 'Lund University', 'Uppsala University', 'Stockholm University'],
  IT: ['Politecnico di Milano', 'Sapienza University of Rome', 'University of Bologna', 'Politecnico di Torino'],
  FI: ['Aalto University', 'University of Helsinki', 'Tampere University'],
  RO: ['Bucharest University of Economic Studies', 'Politehnica Bucharest', 'University of Bucharest'],
  NZ: ['University of Auckland', 'University of Otago', 'Victoria University of Wellington'],
  BE: ['KU Leuven', 'Ghent University', 'UCLouvain'],
  NO: ['University of Oslo', 'NTNU', 'University of Bergen'],
  HU: ['Eötvös Loránd University', 'Budapest University of Technology', 'Central European University'],
  CY: ['University of Cyprus', 'Cyprus University of Technology'],
  DK: ['University of Copenhagen', 'Aarhus University', 'Technical University of Denmark'],
  LT: ['Vilnius University', 'Kaunas University of Technology', 'Vytautas Magnus University'],
  EE: ['University of Tartu', 'TalTech', 'Estonian Business School'],
  LV: ['University of Latvia', 'Riga Technical University', 'Riga Stradiņš University'],
  AT: ['University of Vienna', 'TU Wien', 'University of Graz'],
}

export const SCHOLARSHIPS = [
  { id: 'chevening', name: 'Chevening Scholarships', country: 'United Kingdom', code: 'GB', levels: ['master'], funding: 'Fully funded', summary: 'UK government scholarship for eligible one-year taught master’s study.', url: 'https://www.chevening.org/scholarships/' },
  { id: 'commonwealth', name: 'Commonwealth Scholarships', country: 'United Kingdom', code: 'GB', levels: ['master', 'phd'], funding: 'Fully funded', summary: 'Scholarship schemes for eligible Commonwealth citizens; scheme rules vary.', url: 'https://cscuk.fcdo.gov.uk/Scholarships' },
  { id: 'australia-awards', name: 'Australia Awards', country: 'Australia', code: 'AU', levels: ['master'], funding: 'Fully funded', summary: 'Australian government awards for eligible partner-country applicants; Bangladesh has country-specific criteria.', url: 'https://www.dfat.gov.au/people-to-people/australia-awards', countryUrl: 'https://www.dfat.gov.au/people-to-people/australia-awards/participating-countries/bangladesh-information-for-intake' },
  { id: 'erasmus', name: 'Erasmus Mundus Joint Masters', country: 'Europe', code: 'EU', levels: ['master'], funding: 'Full or partial', summary: 'Joint master’s programmes offered by international university consortia.', url: 'https://erasmus-plus.ec.europa.eu/opportunities/individuals/students/erasmus-mundus-joint-masters' },
  { id: 'daad', name: 'DAAD Scholarships', country: 'Germany', code: 'DE', levels: ['master', 'phd'], funding: 'Varies by scheme', summary: 'Search the DAAD scholarship database for eligible study and research funding.', url: 'https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/' },
  { id: 'mext', name: 'MEXT Scholarship', country: 'Japan', code: 'JP', levels: ['bachelor', 'master', 'phd'], funding: 'Fully funded', summary: 'Japanese government scholarship routes, including embassy and university recommendations.', url: 'https://www.studyinjapan.go.jp/en/planning/scholarships/mext-scholarships/' },
  { id: 'gks', name: 'Global Korea Scholarship (GKS)', country: 'South Korea', code: 'KR', levels: ['bachelor', 'master', 'phd'], funding: 'Fully funded', summary: 'Korean government scholarship programme for eligible international students.', url: 'https://www.studyinkorea.go.kr/swb/plan/scholarship.do' },
  { id: 'fulbright', name: 'Fulbright Foreign Student Program', country: 'United States', code: 'US', levels: ['master', 'phd'], funding: 'Varies by country', summary: 'Graduate study and research opportunities; availability is country-specific.', url: 'https://foreign.fulbrightonline.org/' },
]

export const DOCUMENTS_BY_LEVEL = {
  foundation: ['Valid passport', 'SSC / O-Level certificate and transcript', 'HSC / A-Level certificate and transcript (if completed)', 'English proficiency evidence (if required)', 'Statement of purpose or personal statement', 'Financial evidence and sponsor documents', 'Passport-size photographs', 'Certified translations (if documents are not in the required language)'],
  bachelor: ['Valid passport', 'SSC certificate and transcript', 'HSC certificate and transcript', 'English proficiency evidence (if required)', 'Personal statement / statement of purpose', 'Recommendation letters (if required)', 'Financial evidence and sponsor documents', 'Passport-size photographs', 'Certified translations (if required)'],
  master: ['Valid passport', 'Bachelor’s certificate and full transcript', 'Updated academic CV / résumé', 'Statement of purpose', 'English proficiency evidence (if required)', 'Two recommendation letters (if required)', 'Portfolio or writing sample (programme-dependent)', 'Financial evidence and sponsor documents', 'Passport-size photographs', 'Certified translations (if required)'],
  phd: ['Valid passport', 'Bachelor’s and master’s certificates and transcripts (as applicable)', 'Academic CV', 'Research proposal / statement of research interests', 'Writing sample or publications (if available / required)', 'Two or three academic recommendation letters', 'English proficiency evidence (if required)', 'Supervisor correspondence (where applicable)', 'Financial evidence or funding plan', 'Certified translations (if required)'],
}

export const fmt = (n) => Number(n || 0).toLocaleString('en-US')

// Destination photography and landmark labels for the 22-country directory.
// Nine landmark photographs are bundled locally; the remaining source URLs are
// downloaded by `npm run images:download` and also work as online fallbacks.
export const DESTINATION_MEDIA = {
  US: { landmark: 'Statue of Liberty & Manhattan', image: '/images/destinations/united-states.jpg', source: 'Original generated destination photograph' },
  GB: { landmark: 'Big Ben & Westminster', image: '/images/destinations/united-kingdom.jpg', source: 'Original generated destination photograph' },
  KR: { landmark: 'Gyeongbokgung Palace & Seoul', image: '/images/destinations/south-korea.jpg', source: 'Original generated destination photograph' },
  CA: { landmark: 'CN Tower & Toronto waterfront', image: '/images/destinations/canada.jpg', source: 'Original generated destination photograph' },
  AU: { landmark: 'Sydney Opera House & Harbour Bridge', image: '/images/destinations/australia.jpg', source: 'Original generated destination photograph' },
  MY: { landmark: 'Petronas Twin Towers', image: '/images/destinations/malaysia.jpg', source: 'Original generated destination photograph' },
  MT: { landmark: 'Valletta Grand Harbour', image: '/images/destinations/malta.jpg', source: 'Original generated destination photograph' },
  PL: { landmark: 'Warsaw Old Town', image: '/images/destinations/poland.jpg', source: 'Original generated destination photograph' },
  SE: { landmark: 'Gamla Stan, Stockholm', image: '/images/destinations/sweden.jpg', source: 'Original generated destination photograph' },
  IT: { landmark: 'Colosseum, Rome', image: '/images/destinations/italy.jpg', fallback: 'https://images.unsplash.com/photo-1514896856000-91cb6de818e0?auto=format&fit=crop&fm=jpg&q=85&w=1600', source: 'Unsplash — Braden Collum' },
  FI: { landmark: 'Helsinki Cathedral', image: '/images/destinations/finland.jpg', fallback: 'https://assets.princess.com/is/image/princesscruises/helsinki-finland-cathedral-statue%3A3x2?ts=1777914663484', source: 'Princess Cruises image library' },
  RO: { landmark: 'Palace of Parliament, Bucharest', image: '/images/destinations/romania.jpg', fallback: 'https://cdn-imgix.headout.com/media/images/b6224c1ce830e1230cc8d24f387c1dcf-PalaceofParliament.jpg?auto=compress&fit=crop&w=1400&q=85', source: 'Headout' },
  NZ: { landmark: 'Auckland Sky Tower & Waitemata Harbour', image: '/images/destinations/new-zealand.jpg', fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Waitemata_Harbour%2C_Ferry_dock_and_the_Skytower%2C_Auckland_-_0206.jpg/1920px-Waitemata_Harbour%2C_Ferry_dock_and_the_Skytower%2C_Auckland_-_0206.jpg', source: 'Wikimedia Commons — Waitemata Harbour and Sky Tower' },
  BE: { landmark: 'Grand Place, Brussels', image: '/images/destinations/belgium.jpg', fallback: 'https://imagenes.20minutos.es/uploads/imagenes/2023/03/22/bruselas-belgica.jpeg', source: '20minutos — Brussels Grand Place' },
  NO: { landmark: 'Geirangerfjord', image: '/images/destinations/norway.jpg', fallback: 'https://www.carolus.be/Media/CARE/_Profiles/f728e8a8/659d01b8/6558-Carolus_PremiumTours_bus_vliegtuig_Noorwegen_Noorse%20fjorden_Geirangerfjord%201%20%282%29.jpg?v=637480589065486668', source: 'Carolus Reizen — Geirangerfjord' },
  HU: { landmark: 'Hungarian Parliament, Budapest', image: '/images/destinations/hungary.jpg', fallback: 'https://commons.wikimedia.org/wiki/Special:FilePath/Hungarian_Parliament_Building_from_across_the_Danube,_Budapest_(54179693007).jpg?width=1600', source: 'Wikimedia Commons — Jorge Franganillo (CC BY 2.0)' },
  CY: { landmark: 'Paphos Harbour Castle', image: '/images/destinations/cyprus.jpg', fallback: 'https://commons.wikimedia.org/wiki/Special:FilePath/Paphos_Harbour_Castle.jpg?width=1400', source: 'Wikimedia Commons — Mriana Agbaria (CC BY-SA 4.0)' },
  DK: { landmark: 'Nyhavn waterfront, Copenhagen', image: '/images/destinations/denmark.jpg', fallback: 'https://static.standard.co.uk/2025/01/16/16/55/SEI235364100.jpg?width=1200', source: 'The Standard — Copenhagen Nyhavn' },
  LT: { landmark: 'Vilnius Old Town', image: '/images/destinations/lithuania.jpg', fallback: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/6c/71/88.jpg', source: 'Tripadvisor — Vilnius Old Town' },
  EE: { landmark: 'Tallinn Old Town', image: '/images/destinations/estonia.jpg', fallback: 'https://static2.tripoto.com/media/filter/nl/img/67267/TripDocument/1592998944_tallinn.jpg', source: 'Tripoto — Tallinn Old Town' },
  LV: { landmark: 'House of the Blackheads, Riga', image: '/images/destinations/latvia.jpg', fallback: 'https://commons.wikimedia.org/wiki/Special:FilePath/House_of_the_Blackheads_Riga.jpg?width=1400', source: 'Wikimedia Commons — Edgars Košovojs (CC BY-SA 3.0)' },
  AT: { landmark: 'Schönbrunn Palace, Vienna', image: '/images/destinations/austria.jpg', fallback: 'https://commons.wikimedia.org/wiki/Special:FilePath/Schonbrunn_Palace.jpg?width=1400', source: 'Wikimedia Commons — Truete (CC0)' },
}
