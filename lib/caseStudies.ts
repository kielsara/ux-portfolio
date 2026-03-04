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

export interface Finding {
  icon: string
  title: string
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
  tools?: string
  methods?: string
  heroGradient?: string  // fallback if no hero image
  heroImage?: string     // path to image in /public
  isAuditProject?: boolean  // flag for audit-style layout

  // TOC — must match section IDs in the page
  toc: { id: string; symbol: string; label: string }[]

  // Section content (standard project)
  whyItMattered?: { stats: Stat[] }
  whereWeStarted?: { body: string; imageCaption?: string }
  research?: { body: string; quote: string; quoteAttrib: string }
  reframe?: { body: string; body2: string }
  solution?: {
    intro: string
    features: { title: string; body: string }[]
  }
  ops?: { body: string; quote: string; quoteAttrib: string }
  outcomes?: { stats: Stat[] }
  collaboration?: { body: string; team: TeamMember[] }
  takeaway?: { body: string }

  // Section content (audit project)
  challenge?: { headline: string; body: string; stats?: Stat[] }
  approach?: { headline: string; body: string; steps?: { num: string; title: string; desc: string }[] }
  findings?: { headline: string; body: string; items?: Finding[] }
  synthesis?: { headline: string; body: string; themes?: string[] }
  alignment?: { headline: string; body: string; quote?: string; quoteAttrib?: string }
  redesign?: { headline: string; body: string; changes?: { title: string; desc: string }[] }
  impact?: { headline: string; body: string; stats?: Stat[] }
  reflection?: { headline: string; body: string; learnings?: string[] }

  prevSlug?: string
  nextSlug?: string
}

const caseStudies: CaseStudy[] = [
  {
    slug: 'project-one',
    tag: 'UX Audit & Redesign',
    title: 'Turning 7 months of heuristic analysis into actionable design change.',
    intro: 'A systematic UX audit for enterprise analytics',
    overview:
      'I led a comprehensive UX audit of Synchrony Business Solutions\' analytics platform — a tool used by small-to-medium sized business clients to track performance, spending, and business insights. What started as a usability review became a 7-month deep dive into data visualization clarity, accessibility, a product redesign, and design system foundations.',
    role: 'UX/UI Design Intern',
    timeline: '7 months',
    tools: 'Figma & FigJam',
    methods: 'Heuristic Evaluation, Laws of UX, WCAG Accessibility, Data Viz Best Practices',
    heroGradient: 'linear-gradient(135deg,#1a1a2e,#16213e)',
    isAuditProject: true,

    toc: [
      { id: 'challenge',   symbol: '◇', label: 'The Challenge'   },
      { id: 'approach',    symbol: '◈', label: 'Audit Approach'  },
      { id: 'findings',    symbol: '⊕', label: 'What I Found'    },
      { id: 'synthesis',   symbol: '◎', label: 'Making Sense'    },
      { id: 'alignment',   symbol: '⬡', label: 'Getting Buy-In'  },
      { id: 'redesign',    symbol: '◐', label: 'The Redesign'    },
      { id: 'impact',      symbol: '✦', label: 'Impact'          },
      { id: 'reflection',  symbol: '↻', label: 'Reflection'      },
    ],

    challenge: {
      headline: 'An analytics platform that had grown faster than its design.',
      body: 'The Synchrony Business Solutions analytics platform serves enterprise clients making critical business decisions. But years of feature additions without systematic design review had created inconsistencies — confusing data visualizations, accessibility gaps, and a fragmented user experience. Leadership knew something was wrong, but needed clear evidence and a path forward.',
      stats: [
        { number: '50+', desc: 'screens evaluated across the platform' },
        { number: '6', desc: 'evaluators collaborating on heuristic analysis' },
        { number: '80+', desc: 'usability issues identified and categorized' },
      ],
    },

    approach: {
      headline: 'Systematic evaluation, not subjective opinion.',
      body: 'I structured the audit around established frameworks — Nielsen Norman Group heuristics, Laws of UX, WCAG accessibility guidelines, and data visualization best practices. This gave stakeholders confidence that findings were grounded in research, not personal preference.',
      steps: [
        { num: '01', title: 'Framework Selection', desc: 'Chose evaluation criteria spanning usability heuristics, accessibility, data viz clarity, and content consistency.' },
        { num: '02', title: 'Systematic Walkthrough', desc: 'Documented every screen with observations, severity ratings, and evidence-based recommendations.' },
        { num: '03', title: 'Cross-Evaluator Review', desc: 'Worked with 6 evaluators to validate findings and reduce individual bias.' },
        { num: '04', title: 'Pattern Identification', desc: 'Grouped issues into themes to reveal systemic problems, not just surface bugs.' },
      ],
    },

    findings: {
      headline: 'The problems weren\'t random — they were patterns.',
      body: 'What initially looked like scattered usability issues revealed deeper systemic problems. The same mistakes repeated across screens, suggesting gaps in design guidelines rather than one-off errors.',
      items: [
        { icon: '📊', title: 'Data Visualization Clarity', desc: 'Charts lacked clear labels, used inconsistent color coding, and buried critical insights in visual noise.' },
        { icon: '♿', title: 'Accessibility Gaps', desc: 'Color contrast failures, missing alt text, keyboard navigation issues — blocking users with disabilities.' },
        { icon: '🧭', title: 'Navigation Inconsistency', desc: 'Users couldn\'t predict where they\'d land. Same actions behaved differently across sections.' },
        { icon: '📝', title: 'Content & Labeling', desc: 'Jargon-heavy labels, inconsistent terminology, and missing context left users guessing.' },
      ],
    },

    synthesis: {
      headline: 'From 80+ sticky notes to 6 actionable themes.',
      body: 'I clustered findings using affinity mapping in FigJam, grouping raw observations into themes that could drive design decisions. This transformed an overwhelming spreadsheet of issues into a clear story stakeholders could act on.',
      themes: [
        'Data Visualization Standards',
        'Accessibility Compliance',
        'Navigation & Wayfinding',
        'Content Strategy & Labeling',
        'Visual Consistency',
        'Error States & Feedback',
      ],
    },

    alignment: {
      headline: 'Audit findings don\'t matter if nobody acts on them.',
      body: 'I presented findings in a structured design session with cross-functional stakeholders — product managers, developers, and senior designers. The goal wasn\'t just to share problems, but to build shared ownership of solutions. I prioritized issues by severity and effort, giving the team a clear roadmap.',
      quote: 'This gave us the evidence we needed to prioritize accessibility work that had been deprioritized for years.',
      quoteAttrib: '— Senior Product Designer, Synchrony',
    },

    redesign: {
      headline: 'Translating critique into craft.',
      body: 'I didn\'t stop at identifying problems. Working with the UX team, I developed design recommendations that addressed root causes — contributing to a variable design system that would prevent these issues from recurring.',
      changes: [
        { title: 'Chart Redesign Standards', desc: 'Created guidelines for data visualization clarity — consistent color palettes, clear axis labels, and progressive disclosure for complex datasets.' },
        { title: 'Accessibility Patterns', desc: 'Documented accessible component patterns with proper contrast ratios, focus states, and screen reader support.' },
        { title: 'Navigation Framework', desc: 'Proposed consistent navigation patterns that users could learn once and apply everywhere.' },
      ],
    },

    impact: {
      headline: 'From audit to action.',
      body: 'The audit became the foundation for ongoing design improvements and directly influenced the creation of a comprehensive design system.',
      stats: [
        { number: '100%', desc: 'of critical accessibility issues addressed in roadmap' },
        { number: '1', desc: 'new design system initiated from audit findings' },
        { number: '6', desc: 'design guidelines documented for future work' },
      ],
    },

    reflection: {
      headline: 'What 7 months of auditing taught me about design leadership.',
      body: 'This project pushed me beyond pixel-level thinking into systems thinking. I learned that identifying problems is only half the work — the harder part is building consensus and creating documentation that outlives your tenure.',
      learnings: [
        'Evidence beats opinion. Grounding critique in heuristics gave my recommendations credibility with senior stakeholders.',
        'Scope discipline matters. I had to resist the urge to fix everything and focus on high-impact, achievable changes.',
        'Documentation is design. The guidelines I created will shape decisions long after my internship ended.',
        'Collaboration amplifies impact. Working with 6 evaluators caught blind spots I would have missed alone.',
      ],
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
