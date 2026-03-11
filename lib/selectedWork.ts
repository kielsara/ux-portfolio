// ─────────────────────────────────────────────────────────────
//  lib/selectedWork.ts
//
//  Add one entry per project. The `slug` must match the
//  folder name used in the URL: /selected-work/[slug]
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

export interface SelectedWorkItem {
  slug: string
  title: string
  tag: string
  intro: string          // sidebar italic subtitle
  overview: string       // paragraph below h1
  role: string
  team?: string
  timeline: string
  tools?: string
  methods?: string
  heroGradient?: string  // fallback if no hero image
  heroImage?: string     // path to image in /public
  isAuditProject?: boolean  // flag for audit-style layout
  isDesignSystem?: boolean  // flag for design system layout

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

  // Section content (design system project)
  context?: { headline: string; body: string; body2?: string; linkText?: string }
  goals?: { headline?: string; items: string[] }
  results?: { headline?: string; items: string[] }
  reflections?: { headline: string; body: string }
  componentArchitecture?: { headline: string; body: string; body2?: string; body3?: string }
  chartComponents?: { headline: string; body: string; body2?: string; tableData?: { label: string; value: string }[] }
  staticMockups?: { headline: string; body: string; body2?: string; body3?: string }

  prevSlug?: string
  nextSlug?: string
}

const selectedWorkItems: SelectedWorkItem[] = [
  {
    slug: 'project-one',
    tag: 'UX Audit & Redesign',
    title: 'Turning 7 months of heuristic analysis into actionable design change.',
    intro: 'A systematic UX audit for enterprise analytics',
    overview:
      'I led a comprehensive UX audit of Synchrony Business Solutions\' analytics platform — a tool used by small-to-medium sized business clients to track performance, spending, and business insights. What started as a usability review became a 7-month deep dive into data visualization clarity, accessibility, a product redesign, and design system foundations.',
    role: 'UX/UI Design Intern',
    team: 'Senior Product Design, Product Management, Engineering',
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

  // ── Design System Project ──
  {
    slug: 'project-two',
    tag: 'Design System',
    title: 'A scalable design system translating audit insights into consistent, accessible Synchrony Business Solutions Analytics experiences.',
    intro: 'From audit findings to reusable components',
    overview:
      'Following my comprehensive UX audit, I identified that inconsistent visual patterns, fragmented layouts, and scattered interaction rules were contributing to significant usability issues. To support future design improvements without disrupting existing product components, I created a component-based design system that translated audit insights into reusable UI patterns, layout rules, and interactive elements.',
    role: 'UX/UI Design Intern',
    team: 'UX, Product, Engineering',
    timeline: '4.5 months',
    tools: 'Figma',
    methods: 'Design System Architecture, Component-Driven Design, Data Visualization Best Practices, Usage Documentation',
    heroGradient: 'linear-gradient(135deg,#1a1a2e,#16213e)',
    isDesignSystem: true,

    toc: [
      { id: 'context',       symbol: '◇', label: 'Context'           },
      { id: 'goals',         symbol: '◈', label: 'Goals'             },
      { id: 'results',       symbol: '✦', label: 'Results'           },
      { id: 'reflections',   symbol: '↻', label: 'Reflections'       },
      { id: 'architecture',  symbol: '⊕', label: 'Architecture'      },
      { id: 'charts',        symbol: '◎', label: 'Charts & Graphs'   },
      { id: 'mockups',       symbol: '◐', label: 'Static Mockups'    },
    ],

    context: {
      headline: 'Turning audit findings into foundational infrastructure.',
      body: 'The Synchrony Business Solutions Analytics platform is a digital service built to help small- and mid-sized business clients get a holistic picture of their business health — tracking revenue, spending, and operational data with the purpose of delivering "Insights, Advice, Action."',
      body2: 'My comprehensive UX audit revealed that inconsistent visual patterns, fragmented layouts, and scattered interaction rules were contributing to significant usability issues across the product. To support future design improvements without disrupting existing revenue-generating components, I undertook the creation of a component-based design system. This system translated audit insights into reusable UI patterns, layout rules, and interactive elements that could be applied consistently across different dashboards and operating conditions.',
      linkText: 'How I approached this →',
    },

    goals: {
      items: [
        'Translate UX audit findings into a scalable, component-based design system',
        'Establish consistent visual, layout, and interaction patterns across analytics experiences',
        'Support accessibility, clarity, and ease of implementation for future product development and redesign work',
      ],
    },

    results: {
      items: [
        'Built a modular, component-based design system that replaced ad-hoc charts and inconsistent layouts with structured, reusable components',
        'Implemented data layer and streamlined component architecture for grids and page elements, enabling responsive behaviors and clearer reading flows',
        'Ensured visual consistency, accessibility alignment, and long-term scalability across analytics workstreams',
      ],
    },

    reflections: {
      headline: 'What building a design system from scratch taught me.',
      body: 'This project provided a unique opportunity to combine my background in data science with my passion for user experience. Because I wasn\'t required to work within an existing component library, I had the freedom to build foundational infrastructure from the ground up — designing for scalability without production constraints. Through this process, I became proficient in scalable UI workflows such as slab layout construction, variant creation, and clear variable naming, while also strengthening my ability to design flexible, maintainable components that support long-term consistency.',
    },

    componentArchitecture: {
      headline: 'Balancing consistency with flexibility.',
      body: 'I intentionally structured the design system library to balance consistency with flexibility. Components were organized into clear layers — foundations, styles, and components — to support scalability, reuse, and ease of reference across the product.',
      body2: 'Within each component category, existing Synchrony Web Design System components were used as the foundational base. These served as the starting point for child patterns and interactions. With specific components fine-tuned where practice requirements extended beyond the base system, allowing teams to adopt patterns without disrupting the broader design language.',
      body3: 'This layered approach made it easier to understand what was inherited versus what was extended, helping maintain alignment with the larger Synchrony patterns while supporting the unique needs of the analytics platform.',
    },

    chartComponents: {
      headline: 'Data visualization as a core focus.',
      body: 'Given the analytical nature of SBS Analytics, the data visualization components were a core focus of my design system work, with this area of the system aiming to provide fast-to-implement modules that fit the product theme. While the charts and graphs were initially adapted from Microsoft Power BI visualization templates, they were significantly modified to align with the product\'s needs, interaction patterns, and accessibility requirements.',
      body2: 'To support consistent implementation, each chart type includes usage guidance and documentation outlining use context, key elements, and appearance variations. Guidelines cover chart type behaviors, and color-based styling — all designed to reduce ambiguity and support accurate data interpretation across the team.',
      tableData: [
        { label: 'Overview/Summary', value: 'High-level KPI cards and summary statistics' },
        { label: 'Delivery Dashboard', value: 'Time-series and comparative visualizations' },
        { label: 'Tabular Components', value: 'Data tables with sorting and filtering' },
        { label: 'Multi-dimensional', value: 'Complex charts for cross-sectional analysis' },
      ],
    },

    staticMockups: {
      headline: 'From ad-hoc frames to system-driven components.',
      body: 'Prior to this work, dashboard mockups were represented as static frames or step-based stacks, with inconsistent layer naming and no use of auto-layout. This made pages difficult to maintain, hard to adapt to new data or layout changes, and time-consuming to update as requirements evolved.',
      body2: 'As part of modernizing the charts and graphs system, I rebuilt chart components to be fully auto-layout-driven. Charts were constructed using Figma\'s variants, visual states, and component subclassing, allowing designers to swap chart types, update notations, and adjust supporting elements without breaking layouts or nesting.',
      body3: 'These library changes improved layout clarity, enabled quick iteration on complex dashboards, and introduced a scalable foundation for future data visualization needs that can be applied consistently across the platform.',
    },

    prevSlug: 'project-one',
    nextSlug: 'project-three',
  },

  {
    slug: 'project-three',
    tag: 'Research Synthesis',
    title: 'Turning qualitative interview data into prioritized product opportunities.',
    intro: 'Synthesizing behavior patterns into roadmap-ready insights',
    overview:
      'This project focused on structuring interview and usability findings into a synthesis framework that product and engineering could quickly act on. I translated broad observations into themes, mapped opportunity areas, and documented a sequenced set of recommendations.',
    role: 'UX Researcher',
    team: 'Product, Engineering, Research',
    timeline: '8 weeks',
    tools: 'Dovetail, FigJam, Figma',
    methods: 'Interviews, Affinity Mapping, Opportunity Framing',
    heroGradient: 'linear-gradient(135deg,#c9c0d3,#9e91b0)',
    toc: [
      { id: 'why-it-mattered', symbol: '◇', label: 'Why it mattered' },
      { id: 'research', symbol: '◈', label: 'Research' },
      { id: 'outcomes', symbol: '✦', label: 'Outcomes' },
    ],
    whyItMattered: {
      stats: [
        { number: '24', desc: 'stakeholder and user interviews synthesized' },
        { number: '5', desc: 'opportunity themes prioritized' },
        { number: '1', desc: 'clear implementation sequence delivered' },
      ],
    },
    research: {
      body: 'I clustered recurring friction points across interviews and task recordings, then validated each theme with quantitative usage signals and support ticket trends.',
      quote: 'The synthesis made our next-quarter priorities obvious.',
      quoteAttrib: '— Product Manager',
    },
    outcomes: {
      stats: [
        { number: '3', desc: 'initiatives moved into active roadmap planning' },
        { number: '40%', desc: 'faster decision cycles in planning sessions' },
      ],
    },
    prevSlug: 'project-two',
    nextSlug: 'project-four',
  },

  {
    slug: 'project-four',
    tag: 'Workflow Redesign',
    title: 'Reducing operational friction in a multi-step internal workflow.',
    intro: 'Simplifying handoffs and decision points for operations teams',
    overview:
      'I redesigned a high-friction operational flow used daily by internal teams. The redesign reduced ambiguity at key decision points, improved status visibility, and made exception handling easier for first-time and returning users.',
    role: 'Product Designer',
    team: 'Operations, Product, Engineering',
    timeline: '10 weeks',
    tools: 'Figma, Maze',
    methods: 'Task Analysis, Journey Mapping, Iterative Prototyping',
    heroGradient: 'linear-gradient(135deg,#d4b0b0,#b88080)',
    toc: [
      { id: 'why-it-mattered', symbol: '◇', label: 'Why it mattered' },
      { id: 'solution', symbol: '◈', label: 'Solution' },
      { id: 'outcomes', symbol: '✦', label: 'Outcomes' },
    ],
    whyItMattered: {
      stats: [
        { number: '17', desc: 'steps in original workflow' },
        { number: '6', desc: 'critical error-prone moments identified' },
      ],
    },
    solution: {
      intro: 'A clearer, guided flow with better contextual feedback.',
      features: [
        { title: 'Progressive disclosure', body: 'Only high-signal information appears by default, with deeper details available on demand.' },
        { title: 'Inline guidance', body: 'Contextual helper text and status labels reduce avoidable errors and rework.' },
      ],
    },
    outcomes: {
      stats: [
        { number: '31%', desc: 'reduction in completion time during testing' },
        { number: '22%', desc: 'drop in preventable support requests' },
      ],
    },
    prevSlug: 'project-three',
    nextSlug: 'project-five',
  },

  {
    slug: 'project-five',
    tag: 'Accessibility Sprint',
    title: 'Improving accessibility compliance across shared interface patterns.',
    intro: 'Raising baseline accessibility across common components',
    overview:
      'This sprint focused on increasing accessibility quality across reused UI patterns. I audited key components, partnered with engineering on implementation details, and documented updated guidance for ongoing consistency.',
    role: 'UX Designer',
    team: 'Design, Engineering, QA',
    timeline: '6 weeks',
    tools: 'Figma, Axe, Storybook',
    methods: 'WCAG Review, Component Audit, Cross-functional QA',
    heroGradient: 'linear-gradient(135deg,#b0d4c0,#80b898)',
    toc: [
      { id: 'challenge', symbol: '◇', label: 'Challenge' },
      { id: 'redesign', symbol: '◈', label: 'Redesign' },
      { id: 'impact', symbol: '✦', label: 'Impact' },
    ],
    challenge: {
      headline: 'Critical accessibility issues were concentrated in shared components.',
      body: 'Recurring contrast, focus-state, and keyboard-navigation issues affected multiple product surfaces because they originated in reused patterns.',
    },
    redesign: {
      headline: 'Rework the patterns once, improve many screens at once.',
      body: 'I updated component specs and states, then worked with engineering to align implementation and QA checklists.',
      changes: [
        { title: 'Focus visibility standards', desc: 'Introduced consistent focus behavior and state contrast across interactive controls.' },
        { title: 'Semantic structure updates', desc: 'Improved heading hierarchy and control labeling patterns for assistive technologies.' },
      ],
    },
    impact: {
      headline: 'Higher baseline quality and faster future review cycles.',
      body: 'Teams now ship with stronger default accessibility behavior and fewer regressions during QA.',
      stats: [
        { number: '70+', desc: 'component instances improved by pattern updates' },
        { number: '35%', desc: 'faster accessibility QA cycle on subsequent releases' },
      ],
    },
    prevSlug: 'project-four',
    nextSlug: 'project-six',
  },

  {
    slug: 'project-six',
    tag: 'Onboarding Optimization',
    title: 'Clarifying first-use onboarding to improve activation and confidence.',
    intro: 'Designing first-run experiences that reduce uncertainty',
    overview:
      'I redesigned onboarding touchpoints to improve early-user confidence and reduce setup friction. The work focused on clear progression, better language, and guidance tailored to role-specific needs.',
    role: 'Product Designer',
    team: 'Product, Content, Engineering',
    timeline: '7 weeks',
    tools: 'Figma, GA4, Hotjar',
    methods: 'Funnel Analysis, Usability Testing, Content Design',
    heroGradient: 'linear-gradient(135deg,#d4d0b0,#b8b080)',
    toc: [
      { id: 'why-it-mattered', symbol: '◇', label: 'Why it mattered' },
      { id: 'reframe', symbol: '◈', label: 'Reframe' },
      { id: 'outcomes', symbol: '✦', label: 'Outcomes' },
    ],
    whyItMattered: {
      stats: [
        { number: '42%', desc: 'drop-off rate in original onboarding funnel' },
        { number: '3', desc: 'major confusion points identified in testing' },
      ],
    },
    reframe: {
      body: 'Rather than adding more help text, we reduced cognitive load by restructuring step order and clarifying default recommendations.',
      body2: 'Users needed confidence signals at each stage, not just instructions.',
    },
    outcomes: {
      stats: [
        { number: '19%', desc: 'increase in first-week activation' },
        { number: '27%', desc: 'fewer setup-related support tickets' },
      ],
    },
    prevSlug: 'project-five',
  },
]

export function getAllSlugs(): string[] {
  return selectedWorkItems.map(item => item.slug)
}

export function getSelectedWork(slug: string): SelectedWorkItem | undefined {
  return selectedWorkItems.find(item => item.slug === slug)
}
