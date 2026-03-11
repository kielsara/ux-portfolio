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
  isAppRedesign?: boolean   // flag for app redesign case study layout
  isCxResearch?: boolean     // flag for CX research / persona project layout

  // TOC — must match section IDs in the page
  toc: { id: string; symbol: string; label: string }[]

  // Section content (app redesign / CX research projects)
  processSteps?: {
    id: string
    eyebrow: string
    title: string
    body: string
    body2?: string
    body3?: string
    ndaNotice?: string  // shown instead of images when NDA restricts visuals
    imageLabels?: { label: string; caption?: string; height?: number }[]
  }[]

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
    tag: 'App & Experience Redesign',
    title: 'Improving navigation and beginner accessibility for Strava through a comprehensive audit and targeted redesign of the "Groups" ecosystem.',
    intro: 'Redesigning Strava\'s Groups for discoverability & ease of use',
    overview:
      'As part of a student-directed UX project, my team took on a comprehensive evaluation and redesign of Strava\'s "Groups" feature — tackling how new and casual users discover, navigate, and participate in group-based fitness communities. Through heuristic evaluation, competitive analysis, user interviews, and iterative prototyping, we identified core navigation friction points and redesigned the Groups experience to be more intuitive, welcoming, and accessible for beginners.',
    role: 'UX Researcher & UX/UI Designer',
    timeline: '4 months',
    tools: 'Figma & FigJam',
    methods: 'Heuristic Evaluation, Competitive Analysis, User Surveys, User Interviews, Affinity Mapping, Card Sorting, Persona Development, Journey Mapping, Information Architecture, Wireframing, Prototyping',
    heroGradient: 'linear-gradient(135deg,#fc4c02,#e03e00)',
    isAppRedesign: true,
    toc: [
      { id: 'context',       symbol: '◇', label: 'Context'               },
      { id: 'goals',         symbol: '◈', label: 'Goals'                 },
      { id: 'results',       symbol: '✦', label: 'Results'               },
      { id: 'reflections',   symbol: '↻', label: 'Reflections'           },
      { id: 'audit',         symbol: '⊕', label: 'Audit & Analysis'      },
      { id: 'research',      symbol: '◎', label: 'User Research'         },
      { id: 'persona',       symbol: '⬡', label: 'Persona & Journey'     },
      { id: 'ia',            symbol: '◐', label: 'Info Architecture'     },
      { id: 'paper-wires',   symbol: '✎', label: 'Paper Wireframes'      },
      { id: 'lofi-wires',    symbol: '▤', label: 'Low-Fi Wireframes'     },
      { id: 'hifi-wires',    symbol: '◆', label: 'Hi-Fi & Prototyping'   },
    ],

    context: {
      headline: 'A popular fitness platform with a hidden social layer.',
      body: 'Strava is one of the most widely used fitness tracking platforms, with over 100 million athletes worldwide. While its core tracking features are well-regarded, the "Groups" ecosystem — including clubs, challenges, and community features — has grown organically without a cohesive design strategy. For new users, finding and joining a relevant group can feel unintuitive, buried under layers of navigation that prioritize activity feeds over community discovery.',
      body2: 'Our team specifically focused on the Groups experience because it represents a critical retention lever: users who join groups are significantly more likely to stay active on the platform. Yet the current design creates unnecessary friction — particularly for beginners who don\'t yet know Strava\'s conventions and navigation patterns.',
    },

    goals: {
      items: [
        'Make it easier for users who are familiar with fitness apps — but new to Strava — to discover, navigate, and engage with the Groups ecosystem',
        'Reduce navigation friction in the mobile experience so users can find relevant groups without getting lost or frustrated',
        'Improve the information hierarchy so that group details, activity, and membership actions are clear and accessible at a glance',
      ],
    },

    results: {
      items: [
        'Redesigned the Groups discovery flow with a clear entry point from the main navigation, improving discoverability by surfacing groups earlier in the user journey',
        'Created a streamlined group detail page with progressive disclosure — essential info upfront, deeper content on demand — reducing cognitive load for first-time visitors',
        'Introduced category-based browsing and improved search filters, enabling users to find groups by activity type, location, and skill level',
        'Validated the redesign through usability testing, with participants completing group discovery tasks significantly faster than in the existing Strava interface',
      ],
    },

    reflections: {
      headline: 'What redesigning a live product taught me about scope and advocacy.',
      body: 'This project was a formative experience in understanding that good UX work isn\'t just about interfaces — it\'s about advocating for users within the constraints of an existing product ecosystem. I learned to balance ambition with feasibility, to let research guide decisions rather than assumptions, and to communicate design rationale in ways that build consensus. Working through the full UX process — from heuristic evaluation to high-fidelity prototyping — gave me confidence in my ability to take a problem from discovery through delivery.',
    },

    processSteps: [
      {
        id: 'audit',
        eyebrow: 'Pain Point Audit & Competitive Analysis',
        title: 'Understanding what\'s broken — and what others do better.',
        body: 'We began by conducting a thorough heuristic evaluation of Strava\'s existing Groups feature, mapping every screen and interaction in the group discovery, joining, and participation flows. Using Nielsen\'s heuristics as our framework, we documented friction points ranging from unclear navigation labels to inconsistent interaction patterns between mobile and web.',
        body2: 'In parallel, we performed a competitive analysis of comparable social fitness platforms — including Nike Run Club, Peloton, MapMyRun, and Garmin Connect — evaluating how each handles group discovery, onboarding, and engagement. This helped us identify design patterns that users already understand from other products, and opportunities where Strava could differentiate.',
        body3: 'The audit surfaced several critical pain points: the Groups tab was buried in navigation, group search lacked meaningful filters, and the group detail page prioritized admin-facing information over what a prospective member would need to make a join decision.',
        imageLabels: [
          { label: '[ screenshot: Strava Groups current state — navigation pain points annotated ]', caption: 'Heuristic evaluation of the current Groups navigation flow, with friction points annotated.', height: 300 },
          { label: '[ competitive analysis matrix comparing Strava, Nike Run Club, Peloton, etc. ]', caption: 'Competitive analysis comparing group discovery features across fitness platforms.', height: 280 },
        ],
      },
      {
        id: 'research',
        eyebrow: 'Qualitative Data Collection & Analysis',
        title: 'Hearing directly from the users we\'re designing for.',
        body: 'To complement our heuristic findings with real user perspectives, we conducted a mixed-methods research phase. We distributed a screening survey to identify target participants — users who were active in fitness but relatively new to Strava or had tried and abandoned its Groups features.',
        body2: 'From survey respondents, we recruited participants for semi-structured 1-on-1 interviews. These sessions explored users\' mental models around fitness communities, their expectations when discovering groups in an app, and specific moments of confusion or frustration they\'d experienced with Strava.',
        body3: 'We synthesized findings using affinity mapping in FigJam, clustering interview excerpts and survey responses into themes. Key patterns emerged around discoverability gaps, unclear group value propositions, and a mismatch between what users wanted from groups versus what the current UI surfaced.',
        imageLabels: [
          { label: '[ affinity mapping board in FigJam — clustered sticky notes from interviews ]', caption: 'Affinity mapping session synthesizing qualitative data from user interviews and surveys.', height: 320 },
        ],
      },
      {
        id: 'persona',
        eyebrow: 'User Persona & Journey Map',
        title: 'Grounding our design decisions in a real user archetype.',
        body: 'From our research synthesis, we developed a primary user persona that represented our core audience: a fitness-motivated individual who uses tracking apps regularly but is new to Strava and unfamiliar with its social features. The persona captured key behaviors, goals, frustrations, and the context in which they\'d encounter Groups.',
        body2: 'We then mapped this persona\'s journey through the current Groups experience — from initial awareness to discovery, evaluation, joining, and first participation. The journey map revealed that the sharpest drop-off moments occurred during the discovery-to-evaluation transition: users could tell groups existed, but couldn\'t efficiently find relevant ones or understand what joining would actually give them.',
        imageLabels: [
          { label: '[ user persona card with demographics, goals, frustrations, and behaviors ]', caption: 'Primary user persona developed from synthesis of survey and interview data.', height: 340 },
          { label: '[ journey map showing touchpoints, emotions, and pain points across the Groups flow ]', caption: 'Journey map tracking the user experience from group discovery through first participation.', height: 300 },
        ],
      },
      {
        id: 'ia',
        eyebrow: 'Information Architecture',
        title: 'Restructuring the navigation to match user mental models.',
        body: 'Armed with research insights, we tackled the structural root of the navigation problems. We conducted an open card sorting exercise with participants to understand how users naturally categorize group-related content — and found significant mismatches with Strava\'s existing hierarchy.',
        body2: 'Based on card sorting results and competitive benchmarks, we proposed a restructured information architecture for the Groups section. The key changes included elevating Groups to a primary navigation item, introducing category-based browsing (by sport, location, and experience level), and reorganizing the group detail page to lead with value-oriented content rather than admin metadata.',
        body3: 'We validated the new IA through tree testing, confirming that users could locate target groups significantly faster under the proposed structure.',
        imageLabels: [
          { label: '[ card sorting results — grouped categories from participant sessions ]', caption: 'Open card sorting results revealing how users naturally categorize group content.', height: 280 },
          { label: '[ revised information architecture diagram / sitemap for Groups ]', caption: 'Restructured information architecture for the Groups ecosystem.', height: 320 },
        ],
      },
      {
        id: 'paper-wires',
        eyebrow: 'Paper Wireframes',
        title: 'Rapid ideation before committing to pixels.',
        body: 'Before moving into digital tools, we sketched paper wireframes to rapidly explore layout options for key screens: the Groups discovery hub, search & filter interface, group detail page, and the join/onboarding flow. Paper allowed us to iterate through multiple concepts quickly, testing different information hierarchies and interaction patterns without the overhead of high-fidelity tools.',
        body2: 'We reviewed our sketches against the personas and journey map, selecting the strongest concepts for each screen based on how well they addressed our identified pain points. The paper phase helped us commit to a clear content hierarchy before investing in digital wireframes.',
        imageLabels: [
          { label: '[ photos of hand-drawn paper wireframes for key screens ]', caption: 'Paper wireframe explorations for the Groups discovery hub and detail page.', height: 300 },
        ],
      },
      {
        id: 'lofi-wires',
        eyebrow: 'Low-Fidelity Wireframes',
        title: 'Translating structure into screen-level designs.',
        body: 'We translated our strongest paper concepts into low-fidelity digital wireframes in Figma. At this stage, the focus was on layout, flow, and content placement — not visual polish. We wireframed the complete Groups journey: discovery landing page, category browsing, search with filters, group detail pages, and the join confirmation flow.',
        body2: 'The low-fi wireframes allowed us to conduct early usability walkthroughs with peers, catching navigation dead-ends and unclear labeling before investing in visual design. Feedback at this stage led to key refinements, including adding a "recommended for you" section to the discovery page and simplifying the group detail page to a single-scroll layout.',
        imageLabels: [
          { label: '[ low-fidelity wireframe screens from Figma — key flows ]', caption: 'Low-fidelity wireframes showing the redesigned Groups discovery and detail flows.', height: 320 },
        ],
      },
      {
        id: 'hifi-wires',
        eyebrow: 'High-Fidelity Wireframes & Prototyping',
        title: 'Bringing the redesign to life with full visual fidelity.',
        body: 'The final phase involved applying Strava\'s visual language — including its signature orange, athletic typography, and photography-forward card layouts — to produce high-fidelity screens ready for usability validation. We designed every screen in the Groups flow at full fidelity, paying close attention to touch targets, type hierarchy, and responsive behavior.',
        body2: 'We built an interactive prototype in Figma connecting the complete Groups journey, from the main navigation entry point through discovery, evaluation, joining, and first activity within a group. This allowed us to run moderated usability testing sessions where participants completed realistic tasks.',
        body3: 'Usability testing with the hi-fi prototype confirmed that our redesign significantly reduced task completion time for group discovery, and participants rated the new design as more intuitive and welcoming than the existing Strava interface.',
        imageLabels: [
          { label: '[ high-fidelity mockup screens — Groups discovery hub and detail page ]', caption: 'High-fidelity designs for the redesigned Groups experience.', height: 360 },
          { label: '[ before & after comparison — current Strava Groups vs redesigned version ]', caption: 'Before and after: the existing Strava Groups experience versus our redesign.', height: 300 },
        ],
      },
    ],

    prevSlug: 'project-three',
    nextSlug: 'project-five',
  },

  {
    slug: 'project-five',
    tag: 'Persona & User Journey Creation',
    title: 'Establishing a human-centered foundation for Busey Bank through the development of a formal Customer Journey Mapping and Persona program.',
    intro: 'Building personas & journey maps for a regional bank',
    overview:
      'During my two-semester internship at Busey Bank, I supported the Customer Experience Manager in transitioning the organization from a process-centric view to a customer-centric one. I was tasked with researching and proposing a formal Customer Journey Mapping — referred to as Customer Experience Mapping (CEM) at Busey — and Persona program. My first semester focused on market research and competitive analysis to advocate for the program\'s value. In the second semester, I moved from proposal to execution, designing the bank\'s foundational persona set and a standardized journey mapping template.',
    role: 'CX Intern',
    timeline: '6 months',
    tools: 'Draw.io, Microsoft Suite',
    methods: 'Market Research, Competitive Analysis, Persona Development, Journey Mapping',
    heroGradient: 'linear-gradient(135deg,#1a3a4a,#0d2633)',
    isCxResearch: true,
    toc: [
      { id: 'context',       symbol: '◇', label: 'Context'               },
      { id: 'goals',         symbol: '◈', label: 'Goals'                 },
      { id: 'results',       symbol: '✦', label: 'Results'               },
      { id: 'reflections',   symbol: '↻', label: 'Reflections'           },
      { id: 'research',      symbol: '⊕', label: 'Market Research'       },
      { id: 'business-case', symbol: '◎', label: 'Business Case'         },
      { id: 'personas',      symbol: '⬡', label: 'Persona Development'   },
      { id: 'cem-template',  symbol: '◐', label: 'Journey Map Template'  },
      { id: 'integration',   symbol: '◆', label: 'Org Integration'       },
    ],

    context: {
      headline: 'A bank ready to move beyond process maps.',
      body: 'At the time, Busey Bank relied on internal process maps that lacked the "human" element of the banking experience. These maps documented operational steps — account opening procedures, loan processing workflows — but captured nothing about how customers actually felt, what confused them, or where they dropped off.',
      body2: 'Leveraging my human-centered design background, I was tasked with researching and proposing a formal Customer Journey Mapping and Persona program. This wasn\'t a redesign of a digital product — it was an organizational design challenge: introducing customer empathy tools into a traditional financial institution that had never used them before.',
    },

    goals: {
      items: [
        'Move beyond business-focused process maps to incorporate customer emotions, thoughts, and perceptions.',
        'Create a unified journey mapping template that remains familiar to internal stakeholders while introducing new user-centric data.',
        'Develop data-driven personas that represent Busey\'s diverse customer base across various life stages and financial goals.',
      ],
    },

    results: {
      items: [
        'Presented research-backed proposals to the Marketing team, successfully gaining support to implement a formal mapping program.',
        'Developed a suite of personas covering diverse age groups and financial motivations, complete with goals, motivators, and pain points.',
        'Designed a comprehensive CEM template in Draw.io (due to program limitations) that integrates traditional KPIs and business goals with new customer-centric rows for emotion mapping and touchpoints.',
        'Proposed a cross-functional accountability structure to ensure journey maps remain living, actionable documents.',
      ],
    },

    reflections: {
      headline: 'What introducing human-centered design to a traditional institution taught me.',
      body: 'Leading the way for this program provided me an excellent experience in stakeholder management and organizational empathy. I learned that to introduce human-centered design into a traditional financial institution, I had to speak the language of the business — connecting "feelings" to "ROI" and "annual cost savings." Working within the constraints of Draw.io taught me how to maximize utility over aesthetics. The focus wasn\'t on flashy visuals, but on creating a functional tool that felt familiar enough for the team to actually use. This project reinforced that the best design solution isn\'t just the most innovative one, but the one that the organization is ready to adopt. I walk away with a deeper understanding of how to align UX methodology with high-level business strategy.',
    },

    processSteps: [
      {
        id: 'research',
        eyebrow: 'Market Research & Competitive Benchmarking',
        title: 'Understanding the landscape before proposing change.',
        body: 'My first step was building a foundation of evidence. I conducted market research into how other financial institutions and service-oriented companies approach customer journey mapping and persona development — examining published case studies, industry reports, and journey mapping frameworks from organizations like Forrester and the Customer Experience Professionals Association.',
        body2: 'I also performed a competitive analysis of peer regional banks and credit unions to understand where Busey stood relative to its competitors in terms of customer experience maturity. This research wasn\'t just academic — it was ammunition. I needed concrete examples and ROI benchmarks to demonstrate that investing in journey mapping and personas would produce measurable business value.',
        body3: 'The research phase produced a comprehensive slide deck that became the centerpiece of my proposal to leadership — framing the initiative not as a "design project" but as a strategic investment in customer retention and service differentiation.',
        imageLabels: [
          { label: '[ research presentation slide deck — "Reimagining Service Excellence Maps" ]', caption: 'The initial research presentation used to build the business case for a formal CEM and Persona program.', height: 300 },
        ],
      },
      {
        id: 'business-case',
        eyebrow: 'Building the Business Case',
        title: 'Translating UX methodology into language executives understand.',
        body: 'Presenting journey mapping to a bank\'s Marketing team required reframing UX methodology in business terms. Rather than leading with design jargon — "empathy maps," "touchpoint analysis" — I anchored every recommendation in outcomes the stakeholders already cared about: customer retention rate, Net Promoter Score, and operational efficiency.',
        body2: 'I structured the proposal around three pillars: (1) what the bank was missing by not having journey maps, illustrated with specific customer friction examples from branch and digital interactions; (2) what peer institutions were doing that Busey wasn\'t; and (3) a phased implementation plan that showed manageable effort for meaningful return.',
        body3: 'The presentation successfully gained approval from the Marketing team to move forward with designing the persona set and journey mapping template — transitioning me from a research role into an execution role for the second semester.',
      },
      {
        id: 'personas',
        eyebrow: 'Persona Development',
        title: 'Building data-driven personas for a diverse customer base.',
        body: 'With the program approved, I moved into designing the bank\'s foundational persona set. I worked with existing customer data — demographic segments, product usage patterns, and service interaction data — to define distinct customer archetypes that represented Busey\'s diverse customer base across various life stages and financial goals.',
        body2: 'Each persona included demographic context, financial goals and motivators, pain points and frustrations, preferred channels, and the emotional journey through key banking interactions. I deliberately designed the personas to be actionable rather than decorative — each one mapped directly to specific product lines and service touchpoints that teams could reference in their day-to-day decisions.',
        body3: 'The persona format was designed to be approachable for stakeholders who had never worked with personas before, using clear language and a structured layout that could be printed, posted in team spaces, and referenced during planning sessions.',
        ndaNotice: 'Due to NDA restrictions, I\'m unable to display the persona deliverables created during this internship. I\'m happy to discuss my process, methodology, and design decisions in more detail — feel free to reach out.',
      },
      {
        id: 'cem-template',
        eyebrow: 'Journey Mapping Template Design',
        title: 'Designing a CEM template that bridges process and empathy.',
        body: 'The core deliverable of the second semester was a standardized Customer Experience Mapping (CEM) template — built in Draw.io due to tooling constraints within the bank\'s tech stack. The challenge was creating a template that introduced customer-centric data layers (emotions, perceptions, pain points) while remaining visually and structurally familiar to teams already accustomed to traditional process maps.',
        body2: 'The template integrated traditional KPIs and business goals in the upper rows — metrics the teams already tracked — with new customer-centric rows below for emotion mapping, touchpoint quality, and moment-of-truth identification. This layered approach let teams see the business process and the customer experience side by side, making the connection between operational decisions and customer outcomes explicit.',
        body3: 'I iterated on the template structure through multiple rounds of feedback with the CX Manager, testing readability and ease of use with internal stakeholders who would be the primary users of the tool after my internship ended.',
        ndaNotice: 'Due to NDA restrictions, I\'m unable to display the journey mapping template created during this internship. I\'m happy to walk through the template structure, design rationale, and iteration process — feel free to reach out.',
      },
      {
        id: 'integration',
        eyebrow: 'Organizational Integration & Handoff',
        title: 'Designing for adoption, not just delivery.',
        body: 'A persona set and a journey mapping template only create value if the organization actually uses them. From the beginning, I designed the program with adoption in mind — structuring deliverables to fit into existing workflows rather than requiring teams to learn entirely new processes.',
        body2: 'I proposed a cross-functional accountability structure that assigned ownership of specific journey maps to the teams closest to those customer interactions. Each journey map had a designated owner responsible for keeping it current, with a quarterly review cadence built into existing team meeting structures.',
        body3: 'The handoff documentation included usage guidelines, examples of how to read and update the CEM template, and a roadmap for expanding the persona set as the bank\'s customer data matured. The goal was to leave behind a self-sustaining program, not a one-time deliverable.',
      },
    ],

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
