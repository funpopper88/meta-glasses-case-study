// All site copy lives here. Items marked verify: true are publicly documented
// Ray-Ban Meta features added beyond the paper — confirm before presenting.
// Citations use AP style everywhere.

export const nav = [
  { id: 'situation', label: 'Situation' },
  { id: 'objectives', label: 'Objectives' },
  { id: 'audiences', label: 'Audiences' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'tactics', label: 'Tactics' },
  { id: 'evaluation', label: 'Evaluation' },
  { id: 'engage', label: 'Work With Us' },
  { id: 'faq', label: 'FAQ' },
]

export const situation = {
  current: [
    'Meta leads the category with 73% of global smart glasses sales in the first half of 2025.',
    'The public calls them "pervert glasses," and creators lose followers for wearing them.',
    'Venues across the UK, including pub chain Wetherspoons, are banning them.',
    'Lawsuits allege that reviewers saw everything from living rooms to bank cards in recordings.',
  ],
  ideal: [
    'Anyone who sees smart glasses trusts Meta to protect their information and their rights.',
    'Bystanders know every recording is visible and consented.',
    'The "pervert glasses" label fades and venue bans lift.',
    'Smart glasses become as everyday as the smartphone.',
  ],
  insight:
    "People aren't rejecting the product for its design or quality. They don't trust Meta, or the person wearing the glasses, with their privacy.",
  whyPR:
    'This is a reactive situation, and the core problem is trust. Trust can’t be bought with advertising. An ad asking for it only deepens doubt. The public needs to be shown.',
}

export const headlines = [
  { outlet: 'The Guardian', text: 'Creators lose followers as the "pervert glasses" label sticks', source: 'Aug. 9, 2026' },
  { outlet: 'PetaPixel', text: 'UK venues ban Meta smart glasses en masse', source: 'Aug. 10, 2026' },
  { outlet: 'CNN', text: '"Turn the cameras off": London pushes back on smart glasses', source: 'Sept. 22, 2026' },
  { outlet: 'Legal Newsline', text: 'Lawsuit blitz hits Meta over AI glasses "privacy invasion"', source: 'March 24, 2026' },
]

export const goal =
  'Make Meta smart glasses trusted by both the people who wear them and the people around them, by establishing Meta as the leader in user privacy, data protection and responsible wearable technology.'

export const angle = 'Your privacy and protection come first.'

export const objectives = [
  {
    label: 'Objective 1 · Trust',
    from: 3,
    to: 20,
    text: 'Increase the share of Meta smart glasses users ages 18 to 40 who strongly trust Meta to protect their data.',
    by: 'October 2028',
    note: 'Baseline: 3% of smart glasses users strongly trust their device, according to Security.org, Aug. 13, 2026.',
  },
  {
    label: 'Objective 2 · Women buyers',
    from: 35,
    to: 40,
    text: 'Increase the share of smart glasses purchased by women ages 18 to 30 to 40%.',
    by: 'October 2028',
    note: 'Reference point: 35% of smart glasses considerers are women, according to YouGov, June 30, 2025. No published figure exists for Meta buyers.',
  },
]

export const audiences = [
  {
    tag: 'Live It',
    name: 'Young, adventurous men',
    age: '20–38',
    who: 'Metro dwellers who value experiences: the outdoors, concerts and travel.',
    message: "Live it, don't film it.",
  },
  {
    tag: 'At Work',
    name: 'Young professional women',
    age: '18–30',
    who: 'Want an innovative way to capture busy lives without sacrificing privacy. If they feel safe wearing the glasses, the strategy is working.',
    message: 'Safety, privacy and real information.',
  },
  {
    tag: 'Night Out',
    name: 'Partygoing women',
    age: '21–31',
    who: 'The group most fearful of being recorded without consent. 78% of adult women are concerned.',
    message: "You'll always know when you're being recorded, and you stay in control.",
  },
]

export const strategy = {
  title: "Prove it. Don't promise it.",
  body: "Meta's lack of disclosure, combined with the public's limited understanding of data and privacy, creates a credibility gap. Every tactic demonstrates privacy in clear, everyday terms, paired with helpful use cases so the glasses feel useful, not dystopian.",
}

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

export const tactics = [
  {
    id: 'live',
    label: 'Live It',
    audience: 'Adventurous men, 20–38',
    headline: "Live it, don't film it.",
    teaser: 'A creator program that puts the capture light front and center, designed so every shot is consented.',
    locked: ['Vetted creator roster and lead partner', 'Custom PR package concept', 'Privacy and safety guide with talking points'],
    kpis: ['Engagement', 'Shares and saves', 'Sentiment'],
  },
  {
    id: 'night',
    label: 'Night Out',
    audience: 'Partygoing women, 21–31',
    headline: 'You’ll always know. You stay in control.',
    teaser: 'A partnership with brands women already trust for safety, positioning Meta as part of the solution, not the threat.',
    locked: ['Partner brand shortlist', 'Co-branded product concept', 'Shareable consumer safety messaging'],
    kpis: ['Reach', 'Shares', 'Sentiment'],
  },
  {
    id: 'work',
    label: 'At Work',
    audience: 'Professional women, 18–30',
    headline: 'Real answers, not a sales pitch.',
    teaser: 'Credible expert voices explaining privacy in plain terms, on the platforms professionals already use.',
    locked: ['Spokesperson pairing', 'Target outlets and pitch angles', 'Live event format'],
    kpis: ['Earned media', 'Attendance', 'Engagement'],
  },
]

export const keyStats = [
  { value: 73, suffix: '%', label: "Meta's share of global smart glasses sales, first half of 2025", source: 'TradingView, Feb. 16, 2026' },
  { value: 3, suffix: '%', label: 'of smart glasses users strongly trust their device', source: 'Security.org, Aug. 13, 2026' },
  { value: 78, suffix: '%', label: 'of adult women are concerned about secret recording in public', source: 'Security.org, Aug. 13, 2026' },
  { value: 35, suffix: '%', label: 'of smart glasses considerers are women', source: 'YouGov, June 30, 2025' },
]

// Outcomes only; methods are part of the paid engagement
export const measures = [
  { title: 'Trust', target: '3% → 20%', body: 'A repeatable trust benchmark of Meta glasses users, ages 18 to 40.' },
  { title: 'Purchase share', target: '→ 40%', body: 'Share of purchases by women ages 18 to 30.' },
  { title: 'Sentiment', target: 'Negative mentions ↓', body: 'How people talk about smart glasses online.' },
  { title: 'Earned media', target: 'Placements ↑', body: 'Coverage that explains the privacy features.' },
]

export const timeline = [
  { when: 'Phase 1', what: 'Benchmark and launch' },
  { when: 'Phase 2', what: 'Scale across all three audiences' },
  { when: 'Oct. 2028', what: 'Final evaluation against both objectives' },
]

export const engagement = {
  title: 'The full playbook comes with the partnership.',
  body: 'This pitch shows what we will achieve. Once we are hired, we deliver how.',
  deliverables: [
    'Complete tactic playbooks with named creators, partners and spokespeople',
    'Media list and tailored pitch angles',
    '24-month campaign calendar',
    'Measurement framework and trust benchmark design',
    'Rapid-response messaging for privacy flashpoints',
  ],
}

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
  'Jonathan Bilyk, “Lawsuit Blitz Hits Meta Over AI Glasses ‘Privacy Invasion,’” Legal Newsline, March 24, 2026.',
  'A. Clark, “Meta Stock in Focus After Unveiling $299 AI Smart Glasses to Expand Wearables Push,” TradingView, Feb. 16, 2026.',
  'Brett Cruz and Gene Petrino, “2026 Smart Glasses Market Report and Adoption Statistics,” Security.org, Aug. 13, 2026.',
  'S. Faisal, “XO Kylie: Meta’s AI Glasses and Problematic Marketing,” New University, UC Irvine, Sept. 28, 2026.',
  'Sammy Gecsoyler, “‘I’ve Definitely Lost Followers’: Influencers Face Backlash Over Meta ‘Pervert Glasses’ Content,” The Guardian, Aug. 9, 2026.',
  'Matt Growcoot, “UK Venues Ban Meta Smart Glasses En Masse,” PetaPixel, Aug. 10, 2026.',
  'Meta, “Company Info” and “Meta AI Glasses: Ray-Ban Meta & Oakley Meta,” Meta.com, 2026.',
  'K. Shah, “Who’s Ready for Smart Glasses — and How Can Brands Reach Them?” YouGov, June 30, 2025.',
  'Sophie Tanno and Lisa Eadicicco, “‘Turn the Cameras Off’: London’s Growing Privacy Pushback Against Smart Glasses,” CNN, Sept. 22, 2026.',
]
