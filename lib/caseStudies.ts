// ─────────────────────────────────────────────────────────────
//  lib/caseStudies.ts
//
//  Add one entry per case study. The `slug` must match the
//  folder name used in the URL: /case-study/[slug]
// ─────────────────────────────────────────────────────────────

export interface Stat {
  number: string
  desc: string
}

export interface TeamMember {
  name: string
  role: string
  desc: string
}

export interface CaseStudy {
  slug: string
  title: string
  tag: string
  intro: string          // sidebar italic subtitle
  overview: string       // paragraph below h1
  role: string
  timeline: string
  heroGradient?: string  // fallback if no hero image
  heroImage?: string     // path to image in /public

  // TOC — must match section IDs in the page
  toc: { id: string; symbol: string; label: string }[]

  // Section content
  whyItMattered: { stats: Stat[] }
  whereWeStarted: { body: string; imageCaption?: string }
  research: { body: string; quote: string; quoteAttrib: string }
  reframe: { body: string; body2: string }
  solution: {
    intro: string
    features: { title: string; body: string }[]
  }
  ops: { body: string; quote: string; quoteAttrib: string }
  outcomes: { stats: Stat[] }
  collaboration: { body: string; team: TeamMember[] }
  takeaway: { body: string }

  prevSlug?: string
  nextSlug?: string
}

const caseStudies: CaseStudy[] = [
  {
    slug: 'project-one',
    tag: 'Project / Case Study Name',
    title: 'Your compelling project headline goes right here.',
    intro: 'A short italic subtitle describing the project',
    overview:
      'Write a 2–3 sentence overview of the project context. What product or platform is this? Who uses it, and what was the core problem you were solving? Keep it grounded and specific.',
    role: 'Your Title / Function',
    timeline: 'Month – Month, Year',
    heroGradient: 'linear-gradient(135deg,#d4c5b0,#c0ae96)',

    toc: [
      { id: 'why-it-mattered',  symbol: '→', label: 'Why it mattered'  },
      { id: 'where-we-started', symbol: '◊', label: 'Where we started' },
      { id: 'research',         symbol: '∞', label: 'Research'         },
      { id: 'reframe',          symbol: '↩', label: 'The reframe'      },
      { id: 'solution',         symbol: '√', label: 'Solution'         },
      { id: 'ops',              symbol: '⇥', label: 'Enabling ops'     },
      { id: 'outcomes',         symbol: '∑', label: 'Outcomes'         },
      { id: 'collaboration',    symbol: '↔', label: 'Collaboration'    },
      { id: 'takeaway',         symbol: '↪', label: 'Takeaway'         },
    ],

    whyItMattered: {
      stats: [
        { number: '30%',   desc: 'of support messages were asking the same question' },
        { number: '>$50k', desc: 'annual cost from churned high-value accounts' },
        { number: '30 days', desc: 'retention window — confusion broke the cycle' },
      ],
    },

    whereWeStarted: {
      body: 'Describe the starting state. What was the existing experience? What was the shared understanding among the team about the problem? What constraints did you inherit, and how did you approach getting stakeholder alignment to even begin?\n\nThis is also a good place to describe scope, phasing decisions, and the strategic tradeoffs that shaped the project before design even started.',
      imageCaption: 'The old experience before the redesign',
    },

    research: {
      body: 'Describe your research methods and what you found. What data did you analyze? Who did you talk to? What patterns emerged that reframed the problem? This is where you show your diagnostic thinking — not just what you did, but how you made sense of it.',
      quote: 'Replace this with a real quote from a user interview. The best quotes are specific and emotional, not generic praise. They reveal something true about the experience.',
      quoteAttrib: '— Job title, company type',
    },

    reframe: {
      body: 'Describe the structural or systemic insight that changed how you framed the problem. What was the real underlying issue? This is often the most memorable part of a case study — the moment where the problem revealed itself differently than expected.',
      body2: 'Explain what the new mental model is and why it matters. How does it change what users experience, and what internal changes had to happen to support it?',
    },

    solution: {
      intro: 'Three experiences that remove uncertainty.',
      features: [
        { title: 'Feature One',   body: 'What question does this feature answer? Describe it in one sentence, then explain the design logic. What did you choose to surface, and what did you choose to hide?' },
        { title: 'Feature Two',   body: 'Describe the continuity or unified timeline approach. What changed structurally and how does it manifest in the UI?' },
        { title: 'Feature Three', body: 'What third element rounds out the experience? What third-party integration or data signal did you surface proactively?' },
      ],
    },

    ops: {
      body: 'Describe the internal-facing challenge. What did other teams need in order for this to work? What was the expansive proposal on the table, and what did you recommend instead?',
      quote: 'Replace with a stakeholder quote that validates the approach — ideally someone who initially had concerns.',
      quoteAttrib: '— Role, team or company',
    },

    outcomes: {
      stats: [
        { number: '25%',  desc: 'reduction in [primary metric]'           },
        { number: '>80%', desc: 'positive feedback from [group]'           },
        { number: '70%',  desc: 'adoption of [key action] in first month'  },
      ],
    },

    collaboration: {
      body: 'Describe how you worked with engineering, PM, and your design team. What did you own? What did you delegate? What decisions did you make together? Good case studies show judgment in collaboration, not just solo craft.',
      team: [
        { name: 'Collaborator Name', role: 'Their Role', desc: 'Describe what they owned and how you partnered. Be specific about their contribution — this shows you can share credit and context.' },
        { name: 'Collaborator Name', role: 'Their Role', desc: 'Another collaborator and their specific area of ownership. Good case studies honor the team.' },
      ],
    },

    takeaway: {
      body: 'End with the insight that transfers. What does this project teach about design, systems, users, or your process that applies beyond this one context? This is your chance to show how you think, not just what you shipped.',
    },

    nextSlug: 'project-two',
  },

  // ── Add more case studies here, same shape ──
  {
    slug: 'project-two',
    tag: 'Project Two',
    title: 'Your second project headline.',
    intro: 'Subtitle for project two',
    overview: 'Overview paragraph for project two.',
    role: 'Your Title',
    timeline: 'Month – Month, Year',
    heroGradient: 'linear-gradient(135deg,#b8c9d4,#8aaab8)',
    toc: [
      { id: 'why-it-mattered',  symbol: '→', label: 'Why it mattered'  },
      { id: 'where-we-started', symbol: '◊', label: 'Where we started' },
      { id: 'research',         symbol: '∞', label: 'Research'         },
      { id: 'solution',         symbol: '√', label: 'Solution'         },
      { id: 'outcomes',         symbol: '∑', label: 'Outcomes'         },
      { id: 'takeaway',         symbol: '↪', label: 'Takeaway'         },
    ],
    whyItMattered:  { stats: [{ number: 'X%', desc: 'key metric' }] },
    whereWeStarted: { body: 'Where you started.', imageCaption: 'Before state' },
    research:       { body: 'Research findings.', quote: 'User quote.', quoteAttrib: '— Source' },
    reframe:        { body: 'The reframe.', body2: 'Second paragraph.' },
    solution:       { intro: 'The solution.', features: [{ title: 'Feature', body: 'Description.' }] },
    ops:            { body: 'Ops section.', quote: 'Stakeholder quote.', quoteAttrib: '— Source' },
    outcomes:       { stats: [{ number: 'X%', desc: 'outcome metric' }] },
    collaboration:  { body: 'How you collaborated.', team: [] },
    takeaway:       { body: 'Key takeaway.' },
    prevSlug: 'project-one',
  },
]

export function getAllSlugs(): string[] {
  return caseStudies.map(cs => cs.slug)
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find(cs => cs.slug === slug)
}
