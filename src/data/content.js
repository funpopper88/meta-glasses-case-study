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
  { value: 73, suffix: '%', label: 'of global smart glasses sales are Meta', source: 'Clark, 2026' },
  { value: 3, suffix: '%', label: 'of smart glasses users strongly trust their device', source: 'Cruz & Petrino, 2026' },
  { value: 78, suffix: '%', label: 'of women worry about being secretly recorded', source: 'Cruz & Petrino, 2026' },
]

export const ledStates = {
  idle: { tag: 'LED OFF', tone: 'text-white/60', text: 'No light means the camera is not capturing photos or video.' },
  recording: { tag: 'CAPTURE LED ON', tone: 'text-rec', text: 'The light is on: a photo, video, or livestream is being captured right now.' },
  covered: { tag: 'TAMPER DETECTED', tone: 'text-amber-400', text: 'The light is covered, so capture is blocked until it is uncovered.' },
}

export const protections = [
  { icon: 'Lightbulb', title: 'Capture light', body: 'Turns on whenever the glasses take a photo, record, or go live.' },
  { icon: 'ShieldAlert', title: 'Tamper detection', body: "Cover the light and the glasses won't record.", verify: true },
  { icon: 'Power', title: 'Full power off', body: 'A physical switch shuts off the camera and mics completely.', verify: true },
  { icon: 'Smartphone', title: 'Your media, your phone', body: 'Footage goes to your phone. You decide what gets shared.', verify: true },
]

export const code = [
  'Ask before you capture',
  'Never cover the light',
  'Power down in private spaces',
  'If asked to stop, stop',
]

export const programs = [
  {
    id: 'live',
    label: 'Live It',
    audience: 'For adventurers',
    headline: "Live it, don't film it.",
    body: 'Hands-free on the trail, at the show, or abroad, and everyone around you knows when you are capturing.',
    program: 'Live It Creator Kit: two pairs per creator, so every shot shows a partner who agreed to be filmed.',
  },
  {
    id: 'night',
    label: 'Night Out',
    audience: 'For your night out',
    headline: 'You’ll always know. You stay in control.',
    body: "We won't ask you to trust strangers. We'll show you exactly how to tell when a pair is recording.",
    program: 'Night Out Safety Kit: made with drink-testing nail polish, safety alarm and pepper spray brands.',
  },
  {
    id: 'work',
    label: 'At Work',
    audience: 'For professionals',
    headline: 'Real answers, not a sales pitch.',
    body: "Hear how the glasses protect you and the people around you, straight from Meta's safety and privacy team.",
    program: 'Straight Talk on Privacy: a Forbes / Fast Company feature plus a LinkedIn Live Q&A.',
  },
]

export const faq = [
  { q: 'How can I tell if glasses are recording?', a: 'Look at the front of the frame. The capture light is on whenever the glasses take a photo, record video, or livestream.' },
  { q: 'What if someone covers the light?', a: "Tamper detection blocks photos and video until the light is uncovered." },
  { q: 'Where does footage go?', a: "It goes to the wearer's phone through the Meta AI app, where they control what's shared or deleted." },
  { q: 'Are the glasses always listening?', a: 'The microphones listen for the "Hey Meta" wake word on the device. Voice is only processed after the wake word, and you can turn the wake word off or delete voice history in the Meta AI app.', verify: true },
  { q: 'Does Meta use my photos and videos to train AI?', a: "According to Meta, photos and videos you capture stay in your camera roll and aren't used to train AI. Images you send to Meta AI, for example by asking about what you see, are handled under Meta's AI terms.", verify: true },
  { q: 'What if I think I’m being recorded without consent?', a: 'Ask the wearer to stop. If you feel unsafe, tell venue staff or security.' },
]

export const team = ['Jess Hall', 'Ariana Grant', 'Mia DeBerry', 'Roxy Fusco', 'Brenna Rutherford']

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
