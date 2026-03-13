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

export interface CaseStudyImage {
  src: string
  alt: string
  caption?: string
  height?: number
}

export interface CanvasImageItem {
  src: string
  alt: string
  width: number
  height: number
  x: number
  y: number
  rot: number
  objectFit?: 'cover' | 'contain'
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
  canvasImages?: CanvasImageItem[]
  heroGradient?: string  // fallback if no hero image
  heroImage?: string     // path to image in /public
  heroImagePosition?: string // CSS object-position override for hero crop
  isAuditProject?: boolean  // flag for audit-style layout
  isDesignSystem?: boolean  // flag for design system layout
  isAppRedesign?: boolean   // flag for app redesign case study layout
  isCxResearch?: boolean     // flag for CX research / persona project layout
  isAIDesign?: boolean       // flag for AI-powered UX/UI design project layout

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
  challenge?: { headline: string; body: string; stats?: Stat[]; image?: CaseStudyImage }
  approach?: { headline: string; body: string; steps?: { num: string; title: string; desc: string }[]; image?: CaseStudyImage }
  findings?: { headline: string; body: string; items?: Finding[]; image?: CaseStudyImage }
  synthesis?: { headline: string; body: string; themes?: string[] }
  alignment?: { headline: string; body: string; quote?: string; quoteAttrib?: string; image?: CaseStudyImage }
  redesign?: { headline: string; body: string; changes?: { title: string; desc: string; image?: CaseStudyImage }[] }
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
      'I led a comprehensive UX audit of Synchrony Business Solutions\' analytics platform — a tool used by small-to-medium sized business clients to track customer reviews, marketing efforts, and business operations. What started as a usability review became a 7-month deep dive into data visualization clarity, accessibility, and design system foundations. The audit didn\'t stop at findings — it drove a product redesign, a new-year design roadmap, and ultimately sparked the design system documented in my next case study.',
    heroImage: '/selected-work/project-one/hero.png',
    role: 'UX/UI Design Intern',
    team: 'Grace Blondell, Lead UX Designer',
    timeline: '7 months',
    tools: 'Figma, FigJam',
    methods: 'Heuristic Evaluation, Laws of UX, WCAG Accessibility, Data Viz Best Practices',
    canvasImages: [
      {
        src: '/selected-work/project-one/canvas-one.png',
        alt: 'screenshot one from the figjam board',
        width: 200,
        height: 200,
        x: 34,
        y: 62,
        rot: -1.4,
      },
      {
        src: '/selected-work/project-one/canvas-two.png',
        alt: 'screenshot two from the figjam board',
        width: 200,
        height: 185,
        x: 100,
        y: 56,
        rot: 1.1,
      },
      {
        src: '/selected-work/project-one/canvas-three.png',
        alt: 'screenshot three from the figjam board',
        width: 200,
        height: 300,
        x: 72,
        y: 275,
        rot: -0.8,
      },
      {
        src: '/selected-work/project-one/canvas-four.png',
        alt: 'screenshot four from the figjam board',
        width: 270,
        height: 150,
        x: 0,
        y: 200,
        rot: 0.9,
      },
      {
        src: '/selected-work/project-one/canvas-five.png',
        alt: 'screenshot five from the audit board',
        width: 260,
        height: 200,
        x: 120,
        y: 220,
        rot: -2.0,
      },
      {
        src: '/selected-work/project-one/cavas-six.png',
        alt: 'screenshot six from the audit board',
        width: 225,
        height: 225,
        x: 220,
        y: 164,
        rot: 2.2,
      },
      {
        src: '/selected-work/project-one/canvas-seven.png',
        alt: 'screenshot seven from the audit board',
        width: 300,
        height: 250,
        x: 350,
        y: 200,
        rot: 0,
      },
      {
        src: '/selected-work/project-one/canvas-eight.png',
        alt: 'screenshot eight from the audit board',
        width: 200,
        height: 200,
        x: 200,
        y: 200,
        rot: 0,
      }
    ],
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
      body: 'The Synchrony Business Solutions analytics platform serves enterprise clients making critical business decisions. But years of feature additions without systematic design review had created inconsistencies — confusing data visualizations, accessibility gaps, and a fragmented user experience. The team had also recently transitioned from a legacy design workflow into Figma, and much of the UI had been migrated as screenshots of live production states instead of editable components. With limited team capacity to clean and restructure those files, the design environment itself became harder to maintain and scale. Leadership knew something was wrong, but needed clear evidence and a path forward.',
      stats: [
        { number: '50+', desc: 'screens evaluated across the platform' },
        { number: '2', desc: 'design sources of truth causing inconsistency and rework' },
        { number: '80+', desc: 'usability issues identified and categorized' },
      ],
      image: {
        src: '/selected-work/project-one/challenge.png',
        alt: 'Analytics dashboard before UX audit work',
        caption: 'Unnamed layers, ungrouped elements, and screenshot-based content — the design file reflected years of unstructured additions.',
      },
    },

    approach: {
      headline: 'Systematic evaluation, not subjective opinion.',
      body: 'I structured the audit around established frameworks — Nielsen Norman Group heuristics, Laws of UX, WCAG accessibility guidelines, and data visualization best practices. This gave stakeholders confidence that findings were grounded in research, not personal preference.',
      steps: [
        { num: '01', title: 'Framework Selection', desc: 'Chose evaluation criteria spanning usability heuristics, accessibility, data viz clarity, and content consistency.' },
        { num: '02', title: 'Systematic Walkthrough', desc: 'Documented every screen in Figjam with observations, severity ratings, and evidence-based recommendations.' },
        { num: '03', title: 'Stakeholder Calibration', desc: 'Reviewed findings with the lead UX designer to align severity scoring and prioritize recommendations for implementation.' },
        { num: '04', title: 'Pattern Identification', desc: 'Grouped issues into themes to reveal systemic problems, not just surface bugs.' },
      ],
      image: {
        src: '/selected-work/project-one/approach.png',
        alt: 'FigJam board showing UX audit approach and notes',
        caption: 'Systematic walkthrough documented in FigJam with heuristic annotations.',
        height: 320,
      },
    },

    findings: {
      headline: 'The findings were distilled into 3 opportunity areas, plus accessibility across all of them.',
      body: 'In the stakeholder deck, I translated detailed audit observations into three overarching opportunity areas: (1) adjusting visualizations to align with data visualization best practices, (2) ensuring content is consistent, clear, and valuable, and (3) leaning into a more intuitive dashboard/navigation model. Accessibility was treated as a cross-cutting requirement across all three areas, not a standalone add-on.',
      items: [
        { icon: '📊', title: 'Visualization Best Practices', desc: 'Several charts were undersized, visually dense, or relied on unnecessary elements/interactions, which reduced readability and interpretability.' },
        { icon: '📝', title: 'Content Clarity & Value', desc: 'Terminology, copy, and page-to-page information structure were inconsistent, making it harder for users to understand what mattered and what to do next.' },
        { icon: '🧭', title: 'Dashboard & Navigation UX', desc: 'Navigation patterns, spacing rules, and layout conventions were inconsistent, creating friction and reducing discoverability.' },
        { icon: '♿', title: 'Accessibility Across All Areas', desc: 'Accessibility gaps in contrast, interaction states, responsive behavior, and keyboard navigation reinforced the need for inclusive standards in every redesign decision.' },
      ],
      image: {
        src: '/selected-work/project-one/findings.png',
        alt: 'Affinity mapping sticky notes into issue areas',
        caption: 'Audit findings were organized into thematic issues areas, then refined three opportunity areas supported by accessibility.',
        height: 300,
      },
    },

    synthesis: {
      headline: 'From detailed observations to a decision-ready framework.',
      body: 'I used affinity mapping to cluster recurring issues, then refined those clusters into three redesign opportunity areas supported by a fourth, cross-cutting accessibility lens. This structure helped stakeholders prioritize by impact and effort while keeping the recommendations connected to concrete UX evidence.',
      themes: [
        'Adjust Visualizations to Data Viz Best Practices',
        'Ensure Content is Consistent, Clear, and Valuable',
        'Lean into Dashboard Design and Navigation Patterns',
        'Address Accessibility Across All Opportunity Areas',
      ],
    },

    alignment: {
      headline: 'I presented the audit as a focused stakeholder decision deck.',
      body: 'I used this opportunity-area framework in a cross-functional readout with product, design, and engineering stakeholders. Framing the audit this way kept the conversation anchored on implementation priorities (navigation, content, data storytelling, and accessibility) rather than one-off screen critiques, and made next-step planning more actionable.',
      quote: 'This gave us the evidence we needed to prioritize accessibility work that had been deprioritized for years. We did not realize the potential accessibility concerns with our visualizations.',
      quoteAttrib: '— Developer, Synchrony Business Solutions',
      image: {
        src: '/selected-work/project-one/alignment-presentation.pdf',
        alt: 'Stakeholder readout presentation for UX audit alignment',
        caption: 'Stakeholder readout deck (PDF).',
      },
    },

    redesign: {
      headline: 'Recommendations were phased based on real delivery constraints.',
      body: 'These were the next steps I recommended, but business constraints required prioritizing immediate, lower-risk fixes. With an upcoming code freeze and a parallel transition to a new data-visualization platform, the team focused on updates that could be implemented quickly without disrupting release readiness.',
      changes: [
        {
          title: 'Data Storytelling & Chart Clarity',
          desc: 'Implemented: I simplified dense chart treatments, reduced unnecessary visual noise/interactions, and resized key visualizations to improve legibility and scanability.',
          image: {
            src: '/selected-work/project-one/redesign-1.png',
            alt: 'Before and after redesign for data storytelling and chart clarity',
            height: 420,
          },
        },
        {
          title: 'Content Quality',
          desc: 'Partially implemented: I updated copy — including the design of error state charts (see top of page hero image), clarified terminology, and improved cross-page consistency. Personalization concepts were defined but deferred due to timeline and engineering constraints.',
          image: {
            src: '/selected-work/project-one/redesign-2.png',
            alt: 'Before and after redesign for content quality updates',
            height: 420,
          },
        },
        {
          title: 'Dashboard Layout & Navigation',
          desc: 'Deferred: I proposed a more intuitive modular dashboard structure, clearer hierarchy, and navigation improvements, but these changes were postponed during the code freeze window and platform transition work.',
        },
        {
          title: 'Accessibility Baseline',
          desc: 'Partially implemented: accessibility improvements began with color and contrast updates as seen above. Broader interaction-state, keyboard-navigation, and responsive behavior enhancements were documented for follow-on phases.',
        },
      ],
    },

    impact: {
      headline: 'From audit to action.',
      body: 'The audit deck became a shared reference point for prioritization and directly informed the product roadmap for the new year.',
      stats: [
        { number: '3', desc: 'overarching opportunity areas used to structure redesign priorities' },
        { number: '15', desc: 'potential design features identified during a backlog work session' },
        { number: '9', desc: 'audit-driven Jira stories handed off to the incoming design team' },
      ],
    },

    reflection: {
      headline: 'What 7 months of auditing taught me about design leadership.',
      body: 'This project pushed me beyond pixel-level critique into systems-level storytelling. I learned that doing the analysis is only half the job — the real leverage comes from framing findings in a way that helps stakeholders decide and act.',
      learnings: [
        'Evidence beats opinion. Grounding critique in heuristics gave my recommendations credibility with senior stakeholders.',
        'Scope discipline matters. I had to resist the urge to fix everything and focus on high-impact, achievable changes.',
        'Documentation is design. Structuring findings into opportunity areas made complex observations easier for stakeholders to prioritize and act on.',
        'Owning the full audit sharpened my systems thinking. Running it solo helped me spot recurring patterns quickly and build a clear, defensible prioritization model.',
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
    heroImage: '/selected-work/project-two/hero.png',
    role: 'UX/UI Design Intern',
    team: 'Grace Blondell, Lead UX Designer',
    timeline: '4.5 months',
    tools: 'Figma',
    methods: 'Design System Architecture, Component-Driven Design, Data Visualization Best Practices, Usage Documentation',
    heroImagePosition: '20% center',
    heroGradient: 'linear-gradient(135deg,#1a1a2e,#16213e)',
    isDesignSystem: true,

    toc: [
      { id: 'context',       symbol: '◇', label: 'Context'           },
      { id: 'goals',         symbol: '◈', label: 'Goals'             },
      { id: 'results',       symbol: '✦', label: 'Results'           },
      { id: 'reflections',   symbol: '↻', label: 'Reflections'       },
      { id: 'architecture',  symbol: '⊕', label: 'Architecture'      },
      { id: 'charts',        symbol: '◎', label: 'Charts & Graphs'   },
      { id: 'components',       symbol: '◐', label: 'System-Driven Components'    },
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

  // ── AI-Powered UX/UI Design — ABCapture ──
  {
    slug: 'project-three',
    tag: 'UX/UI Design with AI',
    title: 'Designing an AI-powered tool that turns classroom observations into structured behavioral reports.',
    intro: 'An AI-assisted incident reporting tool for special education',
    overview:
      'ABCapture is a web-based incident documentation system I helped design and build as part of a four-person team. It combines a conversational AI interface with speech-to-text input to help adults working with children with autism capture structured Antecedent-Behavior-Consequence (ABC) data in real time — reducing the cognitive burden of documentation so the adults can focus on the children under their care.',
    heroImage: '/selected-work/project-three/hero.png',
    role: 'Lead UX/UI Designer, Front-End Developer',
    team: 'Jiya Chachan, Manuela Rodriguez, Rithika Vennamaneni',
    timeline: '4 months',
    tools: 'Figma, React, TypeScript, Tailwind CSS',
    methods: 'Literature Review, System Design, UI Prototyping, Usability Testing, Thematic Analysis',
    heroGradient: 'linear-gradient(135deg,#3b1d6e,#1a3a5c)',
    isAIDesign: true,

    toc: [
      { id: 'context',       symbol: '◇', label: 'Context'               },
      { id: 'goals',         symbol: '◈', label: 'Goals'                 },
      { id: 'results',       symbol: '✦', label: 'Results'               },
      { id: 'reflections',   symbol: '↻', label: 'Reflections'           },
      { id: 'literature',    symbol: '⊕', label: 'Research'              },
      { id: 'system',        symbol: '◎', label: 'System Design'         },
      { id: 'interface',     symbol: '⬡', label: 'Interface Design'      },
      { id: 'evaluation',    symbol: '◐', label: 'Usability Study'       },
      { id: 'findings',      symbol: '◆', label: 'Findings'              },
      { id: 'ethics',        symbol: '✎', label: 'Ethics in AI'          },
    ],

    context: {
      headline: 'Teachers and caretakers are documenting behavior with one hand and managing classrooms/children groups with the other.',
      body: 'Adults who work with children with autism are expected to document behavioral incidents quickly and accurately, yet real worl scenarios rarely offer the conditions needed for thorough note-taking. When a behavior occurs, caretakers are managing instruction, safety, transitions, and emotional regulation all at once — leaving almost no time to write detailed ABC (Antecedent, Behavior, Consequence) notes.',
      body2: 'The ABC method, widely used in Applied Behavior Analysis, structures observations into what happened before a behavior, the behavior itself, and what happened after. This structured format is essential for identifying triggers, understanding the function of behavior, and tracking changes over time. But capturing all three components accurately in the moment is a well-documented challenge — and the gaps directly affect the quality of support plans, pattern recognition, and collaborative decision-making with specialists and families.',
    },

    goals: {
      items: [
        'Reduce the cognitive burden of behavioral documentation so teachers and caretakers can focus on the children under their care, not paperwork',
        'Combine speech-to-text input and conversational AI to extract structured ABC data from natural-language narratives',
        'Build a full-stack prototype that demonstrates the complete workflow: capture, extraction, review, and sharing',
        'Evaluate the system through a formative usability study to identify strengths and areas for improvement',
      ],
    },

    results: {
      items: [
        'Designed and built a working full-stack prototype with real-time conversational AI integration, speech-to-text input, and structured ABC form extraction',
        'Conducted a formative usability study with 9 participants across 3 task-based workflows, achieving high task success rates',
        'Received consistently positive feedback on interface clarity, ABC auto-extraction accuracy, and incident history views',
        'Identified actionable areas for improvement: timestamp handling, multi-step workflow clarity, and LLM consistency for follow-up prompting',
      ],
    },

    reflections: {
      headline: 'What designing with AI taught me about trust, control, and responsible defaults.',
      body: 'This project was my deepest experience designing around AI capabilities and limitations simultaneously. I learned that the most impactful design decisions weren\'t about making the AI smarter — they were about keeping the human in control. Editable ABC fields, visible audit history, and the deliberate exclusion of automated behavioral recommendations all reinforced that AI should augment professional judgment, never replace it. Working as part of a four-person team across research, design, and engineering also strengthened my ability to advocate for UX decisions within technical constraints — a skill I know will be essential in any product environment.',
    },

    processSteps: [
      {
        id: 'literature',
        eyebrow: 'Literature Review & Problem Framing',
        title: 'Understanding the gap between what teachers need and what tools provide.',
        body: 'Before designing anything, we immersed ourselves in the problem space. We reviewed foundational ABA literature on ABC documentation challenges, examined AI interventions in autism care, and mapped the current landscape of educator-facing tools. A consistent pattern emerged: while AI tools for autism are rapidly expanding, the vast majority are student-facing (social skill robots, gamified therapy, AR/VR). Almost nothing exists to support the adults responsible for documenting behavior.',
        body2: 'Research from Lindsay et al. (2013) confirmed that educators often feel undertrained and overwhelmed when supporting autistic students — particularly when managing behavior documentation. This framing shifted our design goal from "build an AI tool" to "reduce cognitive burden for an already-stretched professional."',
        body3: 'Ethical literature (Nguyen et al., 2023) and FERPA guidelines shaped our emphasis on role-based access, transparency, and editable AI outputs from the earliest stages of design.',
        imageLabels: [
          { label: '[ literature review synthesis — key themes and gaps identified across sources ]', caption: 'Synthesis of literature review showing the gap in educator-facing AI tools for behavioral documentation.', height: 300 },
        ],
      },
      {
        id: 'system',
        eyebrow: 'System Architecture & Data Pipeline',
        title: 'Designing the architecture as a UX decision, not just a technical one.',
        body: 'We designed ABCapture as a three-tier full-stack application: a React/TypeScript client, a Node.js/Express server, and a PostgreSQL database — with integrated AI services (Groq Cloud\'s Whisper for speech-to-text and LLaMA 3.3 for conversational extraction). Every architectural decision was filtered through a UX lens.',
        body2: 'The data pipeline flows through five stages: (1) the teacher speaks or types a narrative, (2) audio is transcribed and PII-redacted server-side, (3) the conversational AI asks clarifying follow-ups, (4) ABC fields are extracted and populated in real time alongside the chat, and (5) the teacher reviews, edits, signs, and submits. At every stage, the teacher retains full control — AI outputs are suggestions, never final answers.',
        body3: 'This "human-in-the-loop" architecture was a deliberate design choice. We treated AI transparency and editability as first-class UX requirements, not afterthoughts. Audit history tracking ensures every edit is versioned, supporting accountability in formal school records.',
        imageLabels: [
          { label: '[ system architecture diagram showing client, server, AI services, and database layers ]', caption: 'Three-tier architecture with integrated AI pipeline — designed for transparency and teacher control at every stage.', height: 340 },
          { label: '[ data pipeline flow diagram: capture → transcription → conversation → extraction → storage ]', caption: 'The five-stage data processing pipeline, from teacher narration to structured ABC report.', height: 280 },
        ],
      },
      {
        id: 'interface',
        eyebrow: 'Interface Design & Interaction Patterns',
        title: 'A split-screen workspace where conversation meets structure.',
        body: 'The core interaction model centers on a split-screen interface: the left panel functions as a conversational chat (accepting typed or spoken input), while the right panel displays the structured ABC form. As the teacher describes an incident, the AI processes the conversation and continuously updates the ABC fields in real time. This dual-panel approach lets teachers see the connection between what they\'re saying and how it\'s being structured — building trust in the AI\'s interpretation.',
        body2: '[ PLACEHOLDER — Sara, this section would benefit from more detail on your specific UI design contributions. Consider adding: your wireframing process, key design decisions around the chat interface layout, how you designed the form states (empty → populating → editable), any visual design system choices (color, typography, component library decisions), and how you iterated on the design based on team feedback. ]',
        body3: '[ PLACEHOLDER — Describe any specific interaction patterns you designed: how the microphone button works, how ABC fields highlight as they update, the signature flow, the incident history dashboard layout, etc. ]',
        imageLabels: [
          { label: '[ screenshot: split-screen interface — chat panel (left) and ABC form (right) ]', caption: 'The core workspace: conversational input on the left, structured ABC form auto-populating on the right.', height: 360 },
          { label: '[ screenshot: incident history dashboard showing logged incidents for a student ]', caption: 'Incident history view — enabling teachers to review patterns over time.', height: 300 },
        ],
      },
      {
        id: 'evaluation',
        eyebrow: 'Usability Evaluation Design',
        title: 'Testing with 9 participants across 3 task-based workflows.',
        body: 'We designed a formative usability study to evaluate ABCapture across five dimensions: task success and system reliability, perceived ease and speed, speech-to-text and LLM performance, professional language and bias sensitivity, and feature discoverability. Participants completed three sequential tasks using the deployed prototype: (1) creating a new student profile, (2) submitting an incident report using speech-to-text with one intentionally omitted detail, and (3) emailing the signed report to a guardian.',
        body2: 'We recruited 9 participants through convenience sampling. While we were unable to recruit our intended target users (elementary school special education teachers), participants were familiar with classroom software and AI conversational systems. All interactions used simulated student profiles — no real student data was involved.',
        body3: 'The study was delivered remotely through a Google Form paired with the live prototype, capturing both quantitative metrics (task completion, ease/speed ratings) and qualitative feedback (open-ended responses, error descriptions, language concerns).',
        imageLabels: [
          { label: '[ usability study structure: 3 tasks × 5 evaluation dimensions ]', caption: 'Study design mapping three task-based workflows to five evaluation dimensions.', height: 280 },
        ],
      },
      {
        id: 'findings',
        eyebrow: 'Findings & Discussion',
        title: 'What worked, what broke, and what it means for the design.',
        body: 'Task 1 (student creation) achieved 100% completion with ease ratings of 4-5/5 and no reported errors — validating that the core data entry workflow is highly learnable. Task 2 (incident reporting) saw 70% completion, with failures attributed to external API rate limits rather than design issues. Among those who completed it, the AI-powered ABC extraction received strong praise: "I really like the record incident features. It is intelligent and parses information correctly" (P5). However, the chatbot\'s follow-up prompting was inconsistent — only 4 of 7 participants who omitted a detail received a follow-up question.',
        body2: 'Task 3 (guardian email) achieved 67% completion, with failures tied to workflow discoverability and a participant who used a non-functional email. The qualitative feedback was overwhelmingly positive about the interface: "The UI design was extremely impressive" (P9), "The application is clean, consistent, and easy to use" (P5). Key issues identified were timestamp parsing errors, grade validation gaps, and microphone icon confusion.',
        body3: 'A critical participant insight flagged a security gap: "the form did not verify that the person who signed and the teacher\'s name that logged in is the same" (P9) — highlighting the importance of identity verification in formal documentation tools.',
        imageLabels: [
          { label: '[ task completion rates across 3 workflows — bar chart or summary visualization ]', caption: 'Task completion rates: 100% for student creation, 70% for incident reporting, 67% for guardian email.', height: 260 },
          { label: '[ selected participant quotes — positive feedback and identified issues ]', caption: 'Participant feedback highlighting both strengths (ABC extraction, clean UI) and improvement areas.', height: 280 },
        ],
      },
      {
        id: 'ethics',
        eyebrow: 'Ethical Design Decisions',
        title: 'What we deliberately chose not to automate — and why it matters.',
        body: 'One participant suggested ABCapture should provide recommended next steps to address behavior after an incident is logged. We intentionally excluded this feature because meaningful behavioral guidance for autistic students requires individualized knowledge of the child\'s history, goals, triggers, and support systems — information an LLM cannot responsibly infer. Automated advice risks oversimplification, inappropriate strategies, and liability concerns in a regulated education context.',
        body2: 'This decision reflects a broader design principle we carried throughout the project: AI should structure and accelerate documentation, but never replace professional judgment. Every AI output in ABCapture is editable. Every submission requires a human signature. Every edit is tracked with an audit trail. These aren\'t just technical features — they\'re design decisions rooted in FERPA compliance, professional accountability, and respect for the educators using the tool.',
        body3: 'Looking forward, the most important next step would be testing with real special education teachers in authentic classroom contexts. Our convenience sample provided valuable usability signal, but the true test of ABCapture\'s value depends on whether it meaningfully reduces documentation burden for the professionals it\'s designed to serve.',
      },
    ],

    prevSlug: 'project-two',
    nextSlug: 'project-four',
  },

  {
    slug: 'project-four',
    tag: 'App & Experience Redesign',
    title: 'Leading the Groups redesign within a team-based Strava app overhaul to improve navigation, discoverability, and beginner accessibility.',
    intro: 'Redesigning Strava for discoverability & ease of use',
    overview:
      'As part of a student-directed UX project, our team redesigned Strava end-to-end by splitting feature ownership based on capacity while maintaining shared critique and alignment throughout the process. I fully owned the Groups experience (Clubs and Challenges), while teammates led Profile, Maps, Home, and Record Activity. Each of us conducted research for our own section, then came together to compare findings, challenge assumptions, and provide feedback before moving into design. We also built a simple, shared design system so the final prototype felt cohesive when all sections were merged.',
    heroImage: '/selected-work/project-four/hero.png',
    role: 'UX Researcher & UX/UI Designer',
    team: 'Diana Ngo, Team Lead; Daria Meshcheriakova; Brianna Regione; Allie Bosch',
    timeline: '4 months',
    tools: 'Figma & FigJam',
    methods: 'Heuristic Evaluation, Competitive Analysis, User Surveys, User Interviews, Affinity Mapping, Information Architecture, Persona Development, Journey Mapping, Wireframing, Prototyping',
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
      body: 'Strava is one of the most widely used fitness tracking platforms, with over 100 million athletes worldwide. Our student-run UX club team chose to redesign the broader mobile experience, but divided ownership by feature area so each person could go deep: I focused on Groups, while other teammates focused on Profile, Maps, Home, and Record Activity.',
      body2: 'Although implementation was split, the process stayed collaborative. We regularly reviewed each other\'s findings, aligned on shared interaction patterns, and assembled one consistent prototype using a simple co-created design system. Within that larger effort, my scope was the complete Groups flow — from research and problem framing through final high-fidelity design.',
    },

    goals: {
      items: [
        'Lead a full redesign of the Groups experience so workout beginners or those new to Strava can discover, evaluate, and join communities and challenges more easily',
        'Reduce navigation friction in the Groups journey while keeping interaction patterns consistent with the team\'s broader app redesign',
        'Improve information hierarchy so group and challenge value, activity, and membership actions are clear at a glance for first-time users',
        'Address gaps in a beginner\'s Groups experience by introducing new features as necessary',
      ],
    },

    results: {
      items: [
        'Owned and delivered the complete Groups redesign, including discovery, detail, and join flow improvements that made community entry more intuitive for beginners',
        'Introduced a pull-up search/filter interaction that functioned in prototype testing and was reused in both Groups and the Maps section as a shared interaction pattern',
        'Built high-fidelity Groups screens using Strava-authentic visual elements, including sourced activity icons, logos, and challenge/group imagery to improve realism and fidelity',
        'Validated feature-level improvements through team-run usability testing, where each member tested the features they owned while using a single integrated prototype',
        'Implemented 2 new features to address gaps in the existing experience: beginner-friendly, untimed challenges and reviews for challenges',
      ],
    },

    reflections: {
      headline: 'What redesigning a live product taught me about scope and advocacy.',
      body: 'This project taught me how to own one feature deeply while still contributing to a larger product vision. I led the Groups redesign independently, but worked in constant dialogue with teammates to compare findings, pressure-test decisions, and maintain consistency across features. I also saw how valuable cross-feature contributions can be: interactions I designed, like the pull-up search/filter tab, improved usability beyond my section and strengthened the final integrated prototype. The experience reinforced my ability to drive end-to-end UX for a feature while collaborating effectively in a multi-designer team environment.',
    },

    processSteps: [
      {
        id: 'audit',
        eyebrow: 'Pain Point Audit & Competitive Analysis',
        title: 'Understanding what\'s broken — and what others do better.',
        body: 'I began by conducting a heuristic evaluation of Strava\'s existing Groups feature, mapping every screen and interaction in the discovery, joining, and participation flow. Using Nielsen\'s heuristics as my framework, I documented friction points ranging from unclear navigation labels to inconsistent interaction patterns between mobile and web.',
        body2: 'In parallel, I performed a competitive analysis of social fitness platforms — including Nike Run Club, Peloton, MapMyRun, and Garmin Connect — to evaluate how each handles group discovery, onboarding, and engagement. This helped me identify patterns users already understood and opportunities where Strava\'s Groups experience could improve.',
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
        body: 'To complement my heuristic findings with real user perspectives, I conducted research focused on Groups. I distributed a screening survey to identify participants who were active in fitness but relatively new to Strava or who had tried and abandoned Groups features.',
        body2: 'From respondents, I recruited participants for semi-structured 1-on-1 interviews. These sessions explored users\' mental models around fitness communities, their expectations when discovering groups in an app, and moments of confusion or frustration they experienced with Strava.',
        body3: 'I synthesized findings using affinity mapping in FigJam, clustering interview excerpts and survey responses into themes. At the team level, we then compared section-specific findings together, asked follow-up questions, and provided cross-feedback before design began.',
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
        body: 'The final phase involved applying Strava\'s visual language to produce high-fidelity Groups screens ready for validation. I designed every screen in the Groups flow at full fidelity, paying close attention to touch targets, type hierarchy, and responsive behavior. To increase realism, I sourced Strava-authentic UI assets such as activity icons, logos, and challenge/group imagery from Strava\'s web ecosystem.',
        body2: 'In parallel, our team aligned all feature sections using a simple shared design system, then merged our work into one interactive prototype in Figma. I also contributed a pull-up search/filter pattern that was implemented in my Groups section and reused in Maps to support consistency across the combined experience.',
        body3: 'Usability testing was run as a team on the integrated prototype, with each member testing the feature area they owned. In my sessions, participants completed Groups discovery tasks faster and rated the redesigned flow as more intuitive and welcoming than the current Strava experience.',
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
    heroImage: '/selected-work/project-five/hero.png',
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
    heroImage: '/selected-work/project-six/hero.png',
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
