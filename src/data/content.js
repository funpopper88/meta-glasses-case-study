// All site copy lives here. Facts marked [verify] are publicly documented
// Ray-Ban Meta features added beyond the paper — confirm before presenting.

export const nav = [
  { id: 'why', label: 'Why' },
  { id: 'spot', label: 'Spot It' },
  { id: 'protections', label: 'Protections' },
  { id: 'etiquette', label: 'Etiquette' },
  { id: 'programs', label: 'Programs' },
  { id: 'faq', label: 'FAQ' },
]

export const stats = [
  { value: 73, suffix: '%', label: "Meta's share of global smart glasses sales, first half of 2025", source: 'Clark, 2026' },
  { value: 3, suffix: '%', label: 'of smart glasses users strongly trust their device', source: 'Cruz & Petrino, 2026' },
  { value: 78, suffix: '%', label: 'of adult women are concerned about smart glasses secretly recording in public', source: 'Cruz & Petrino, 2026' },
  { value: 35, suffix: '%', label: 'of people considering smart glasses are women', source: 'Shah, 2025' },
]

export const headlines = [
  { outlet: 'The Guardian', text: 'Creators lose followers as the "pervert glasses" label sticks', source: 'Gecsoyler, 2026' },
  { outlet: 'PetaPixel', text: 'UK venues, including Wetherspoons, ban smart glasses en masse', source: 'Growcoot, 2026' },
  { outlet: 'CNN', text: '"Turn the cameras off": London pushes back on smart glasses', source: 'Tanno & Eadicicco, 2026' },
  { outlet: 'Legal Newsline', text: 'Lawsuits question how recordings are reviewed', source: 'Bilyk, 2026' },
]

export const ledStates = {
  idle: { tag: 'LED OFF', tone: 'text-white/60', text: 'No light means the camera is not capturing photos or video.' },
  recording: { tag: 'CAPTURE LED ON', tone: 'text-rec', text: 'The light is on: a photo, video, or livestream is being captured right now.' },
  covered: { tag: 'TAMPER DETECTED', tone: 'text-amber-400', text: 'The light is covered, so capture is blocked until it is uncovered.' },
}

export const spotTips = [
  { title: 'Look for the light', body: 'Every pair has a capture light on the front of the frame. If it is on, the camera is capturing.' },
  { title: 'No light, no capture', body: "Covering the light doesn't hide recording. It blocks recording." },
  { title: "It's okay to ask", body: 'You can always ask a wearer to stop, or to turn their glasses off. Good wearers will.' },
]

export const protections = [
  { icon: 'Lightbulb', title: 'Capture LED', body: 'A light on the front of the frame turns on whenever the glasses take a photo, record video, or go live.' },
  { icon: 'ShieldAlert', title: 'Tamper detection', body: "If the capture light is covered, the glasses won't take photos or video until it's uncovered.", verify: true },
  { icon: 'Hand', title: 'Intentional capture', body: 'Photos and video start with a deliberate press of the capture button or a "Hey Meta" voice command.', verify: true },
  { icon: 'Power', title: 'Full power off', body: 'A physical power switch turns the glasses completely off, including the camera and microphones.', verify: true },
  { icon: 'Smartphone', title: 'Your media, your phone', body: 'Photos and videos import to the Meta AI app on your phone. You decide what gets shared and where.', verify: true },
  { icon: 'Mic', title: 'Voice history control', body: "Review and delete your voice interactions any time in the Meta AI app's privacy settings.", verify: true },
]

export const code = [
  { title: 'Ask before you capture', body: "If someone's in the shot, get a yes first." },
  { title: 'Never cover the light', body: 'The light exists so people around you stay informed.' },
  { title: 'Power down in private spaces', body: "Restrooms, locker rooms, medical offices: switch them off." },
  { title: 'Respect the venue', body: 'Some places ban recording devices. House rules win.' },
  { title: 'If asked to stop, stop', body: 'No debate. Turn off capture or take the glasses off.' },
  { title: "Don't post people who didn't agree", body: 'Consent to be filmed is not the same as consent to be posted.' },
]

export const programs = [
  {
    id: 'live',
    label: 'Live It',
    audience: 'For adventurers, travelers and concertgoers',
    headline: "Live it, don't film it.",
    body: "Trails, concerts, cities you've never seen. Meta glasses keep you hands-free and in the moment, and the people around you always know when you're capturing.",
    program: 'The Live It Creator Kit',
    items: [
      'Two pairs of glasses per creator, so every shot features a partner who knowingly agreed to be filmed.',
      'A Guide to Privacy & Safety covering the capture light, how footage is stored and controlled, and how to film in public with consent.',
      'Lead creator: Austin runner Chase Ridgeway (800K+ followers) takes on a trail run with his brother, and they film only each other.',
    ],
    quote: "The light on my glasses lets everyone around me know when I'm filming.",
  },
  {
    id: 'night',
    label: 'Night Out',
    audience: 'For anyone heading out tonight',
    headline: 'You’ll always know. You stay in control.',
    body: "78% of women are concerned about smart glasses being used to record them in secret. We won't ask you to trust strangers. We'll show you exactly how to tell when a pair is recording.",
    program: 'The Night Out Safety Kit',
    items: [
      'A limited-edition kit co-created with brands women already rely on: drink-testing nail polish, personal safety alarms and pepper spray.',
      'Partner brands receive consented footage, shot on Meta glasses, of their products working in real night-out settings.',
      'Shareable "Know the Signs" cards that show how to spot when glasses are recording.',
    ],
    quote: 'No light, no recording.',
  },
  {
    id: 'work',
    label: 'At Work',
    audience: 'For professionals building their careers',
    headline: 'Real answers, not a sales pitch.',
    body: 'Capture a busy life without sacrificing privacy. Hear exactly how the glasses protect you and the people around you from the people who build those protections.',
    program: 'Straight Talk on Privacy',
    items: [
      "A feature in outlets like Fast Company or Forbes pairing a member of Meta's safety and privacy team with a female founder from a tech or AI startup.",
      'A plain-language walkthrough of the recording indicator and of how captured data is stored and controlled.',
      'A LinkedIn Live panel where viewers ask their questions in real time.',
    ],
    quote: 'Privacy proven, not promised.',
  },
]

export const faq = [
  { q: "How can I tell if someone's glasses are recording?", a: 'Look at the front of the frame. A capture light turns on whenever the glasses take a photo, record video, or livestream.' },
  { q: 'What if someone covers the light?', a: "Meta glasses use tamper detection: if the capture light is blocked, the glasses won't take photos or video until it's uncovered." },
  { q: 'Where does footage go after it’s captured?', a: "Photos and videos are stored on the glasses and imported to the wearer's phone through the Meta AI app. The wearer controls what gets shared, saved, or deleted." },
  { q: 'Does Meta use captured photos to train AI?', a: 'According to Meta, photos and videos you capture stay in your camera roll and are not used to train AI. Images you send to Meta AI, for example by asking it about what you see, are processed under Meta’s AI terms.' },
  { q: 'What should I do if I think I’m being recorded without consent?', a: 'Ask the wearer to stop. If you feel unsafe or they refuse, let venue staff or security know.' },
  { q: 'Are smart glasses allowed everywhere?', a: 'No. Venues can set their own rules about recording devices, and good wearers follow them.' },
]

export const team = ['Ariana Grant', 'Brenna Rutherford', 'Jess Hall', 'Mia DeBerry', 'Roxy Fusco']

export const sources = [
  'Bilyk, J. (2026, March 24). Lawsuit blitz hits Meta over AI glasses “privacy invasion.” Legal Newsline.',
  'Clark, A. (2026, February 16). Meta stock in focus after unveiling $299 AI smart glasses to expand wearables push. TradingView.',
  'Cruz, B., & Petrino, G. (2026, August 13). 2026 smart glasses market report and adoption statistics. Security.org.',
  'Faisal, S. (2026, September 28). XO Kylie: Meta’s AI glasses and problematic marketing. New University, UC Irvine.',
  'Gecsoyler, S. (2026, August 9). “I’ve definitely lost followers”: Influencers face backlash over Meta “pervert glasses” content. The Guardian.',
  'Growcoot, M. (2026, August 10). UK venues ban Meta smart glasses en masse. PetaPixel.',
  'Meta. (2026). Company info; Meta AI glasses: Ray-Ban Meta & Oakley Meta. meta.com.',
  'Shah, K. (2025, June 30). Who’s ready for smart glasses – and how can brands reach them? YouGov.',
  'Tanno, S., & Eadicicco, L. (2026, September 22). “Turn the cameras off”: London’s growing privacy pushback against smart glasses. CNN.',
]
