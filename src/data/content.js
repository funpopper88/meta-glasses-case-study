// All site copy lives here. FAQ items marked verify: true are publicly documented
// Ray-Ban Meta features added beyond the paper — confirm before presenting.
// Citations use AP style everywhere.

export const nav = [
  { id: 'research', label: 'Research', race: true },
  { id: 'action', label: 'Action', race: true },
  { id: 'communication', label: 'Communication', race: true },
  { id: 'evaluation', label: 'Evaluation', race: true },
  { id: 'faq', label: 'Q&A' },
  { id: 'credits', label: 'Credits' },
]

export const research = {
  intro:
    "People aren't rejecting Meta glasses for their design or quality. They don't trust Meta, or the person wearing them, with their privacy. Because the core problem is trust, it calls for public relations, not advertising.",
  current: [
    'Meta leads the category with 73% of global smart glasses sales in the first half of 2025.',
    'The glasses have been labeled "pervert glasses," and creators have lost followers for wearing them.',
    'Venues across the UK, including pub chain Wetherspoons, are banning them.',
    'Lawsuits allege that reviewers saw sensitive footage captured by the glasses.',
  ],
  ideal: [
    'People who see smart glasses trust Meta to protect their information and their rights.',
    'Bystanders know when recording is happening and that it is consented.',
    'The negative label fades and venue bans lift.',
    'Smart glasses become as common as the smartphone.',
  ],
}

export const keyStats = [
  { value: 73, suffix: '%', label: "Meta's share of global smart glasses sales, first half of 2025", source: 'TradingView, Feb. 16, 2026' },
  { value: 78, suffix: '%', label: 'of adult women are concerned about secret recording in public', source: 'Security.org, Aug. 13, 2026' },
  { value: 3, suffix: '%', label: 'of smart glasses users strongly trust their device', source: 'Security.org, Aug. 13, 2026' },
]

export const goal =
  'Make Meta smart glasses trusted by both the people who wear them and the people around them, by establishing Meta as the leader in user privacy, data protection and responsible wearable technology.'

export const angle = 'Your privacy and protection come first.'

export const objectives = [
  {
    label: 'Objective 1',
    from: 3,
    to: 20,
    text: 'Increase the share of Meta smart glasses users ages 18 to 40 who strongly trust Meta to protect their data from 3% to 20% by October 2028.',
    note: 'Baseline: 3% of smart glasses users strongly trust their device, according to Security.org, Aug. 13, 2026.',
    short: 'Users ages 18 to 40 who strongly trust Meta with their data',
    measure: 'A repeatable trust survey of Meta glasses users, run at launch, midpoint and finish.',
  },
  {
    label: 'Objective 2',
    from: 35,
    to: 40,
    text: 'Increase the share of smart glasses purchased by women ages 18 to 30 to 40% by October 2028.',
    note: 'Reference point: 35% of smart glasses considerers are women, according to YouGov, June 30, 2025.',
    short: 'Share of smart glasses purchased by women ages 18 to 30',
    measure: 'Purchase data broken out by gender and age.',
  },
]

export const strategy =
  'The campaign demonstrates privacy in clear, everyday terms instead of promising it, and pairs that with useful, positive ways people use the glasses.'

export const audiences = [
  {
    name: 'Young, adventurous men',
    age: '20–38',
    who: 'Live in metro areas and value experiences like the outdoors, concerts and travel.',
    direction: 'Creator-led content in outdoor and travel settings that shows the privacy features in real use.',
  },
  {
    name: 'Young professional women',
    age: '18–30',
    who: 'Want an innovative way to capture busy lives without giving up privacy.',
    direction: 'Expert voices in business and tech media explaining how the glasses protect wearers and the people around them.',
  },
  {
    name: 'Partygoing women',
    age: '21–31',
    who: 'The group most concerned about being recorded without consent.',
    direction: 'Partnerships with brands women already trust for safety, plus clear guidance on how to tell when glasses are recording.',
  },
]

export const ledStates = {
  idle: { tag: 'LIGHT OFF', tone: 'text-white/50', text: 'No light means the camera is not capturing photos or video.' },
  recording: { tag: 'CAPTURE LIGHT ON', tone: 'text-white', text: 'The white light is on: a photo, video, or livestream is being captured right now.' },
  covered: { tag: 'LIGHT COVERED', tone: 'text-amber-400', text: 'The light is covered, so the glasses block capture until it is uncovered.' },
}

export const alsoTracked = [
  { title: 'Sentiment', body: 'How people talk about smart glasses online, including use of the negative label.' },
  { title: 'Earned media', body: 'Coverage that explains how the privacy features work.' },
]

// Each answer: a lead sentence (a) plus optional practical points.
// verify: true = feature details from public product info, not the paper.
export const faq = [
  {
    q: 'How can I tell if glasses are recording?',
    a: 'Look at the front of the frame, near the outer corner. A small white capture light turns on whenever the glasses take a photo, record video or livestream, and it faces the people around the wearer.',
    points: [
      'Light on: the camera is capturing right now.',
      'Light off: no photo or video is being captured.',
      "Not sure? It's fair to ask the wearer directly, or ask them to take the glasses off.",
    ],
  },
  {
    q: 'What if someone covers the light?',
    a: "The glasses check that the capture light can be seen. If it's covered with tape, a sticker or a finger, they won't take photos or video and prompt the wearer to uncover it.",
    points: ['A covered or blacked-out light is a red flag worth raising with the wearer or venue staff.'],
    verify: true,
  },
  {
    q: 'Where does footage go?',
    a: "Photos and videos are saved on the glasses, then imported to the wearer's phone through the Meta AI app. Nothing is posted automatically: the wearer chooses what to keep, share or delete.",
    points: ['Livestreams are the exception. They go out in real time, and the capture light stays on the whole time.'],
    verify: true,
  },
  {
    q: 'Are the glasses always listening?',
    a: 'The microphones listen only for the "Hey Meta" wake word, and that check happens on the glasses. After the wake word, the request is sent to Meta to be processed.',
    points: [
      'Turn the wake word off in the Meta AI app to use the button only.',
      "Review or delete voice recordings in the app's privacy settings.",
      'Use the power switch to turn the glasses fully off, including the camera and microphones.',
    ],
    verify: true,
  },
  {
    q: 'Does Meta use my photos and videos to train AI?',
    a: "According to Meta, photos and videos you capture stay in your camera roll and aren't used to train its AI.",
    points: [
      "If you ask Meta AI about something you're looking at, that image is sent to Meta AI and handled under Meta's AI terms, which can include improving its AI.",
      'To keep an image out of that process, capture it normally instead of asking Meta AI about it.',
    ],
    verify: true,
  },
  {
    q: 'What should I do if I think I’m being recorded without consent?',
    a: "You don't have to put up with it.",
    points: [
      'Ask the wearer to stop recording, or to show you the capture light is off.',
      'If they refuse, tell venue staff or security. Many venues have rules about recording devices.',
      'If you feel unsafe, or think you were filmed somewhere private like a restroom or changing area, contact local authorities.',
      'Report footage posted without your consent on the platform where it appears.',
    ],
  },
  {
    q: 'Are smart glasses allowed everywhere?',
    a: 'No. Businesses can set their own rules, and some venues, including UK pub chain Wetherspoons, ban recording devices.',
    points: ['Responsible wearers follow posted rules and take the glasses off in private spaces like restrooms, locker rooms and medical offices.'],
  },
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
