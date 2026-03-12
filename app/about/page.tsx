import Link from 'next/link'
import Sidebar, { LocalPageNav } from '@/components/Sidebar'
import SiteFooter from '@/components/SiteFooter'
import ToolDock from '@/components/ToolDock'

const ABOUT_TOC = [
  { id: 'about', symbol: '01', label: 'About' },
  { id: 'education', symbol: '02', label: 'Education' },
  { id: 'coursework', symbol: '03', label: 'Coursework' },
  { id: 'experience', symbol: '04', label: 'Experience' },
  { id: 'skills-tools', symbol: '05', label: 'Skills & Tools' },
  {id: 'beyond-resume', symbol: '06', label: 'Beyond The Resume' },
]

const COURSEWORK = [
  'INFO 490 - UX Design with AI',
  'SHS 480-482 - Accessible Design',
  'IS 586 - Usability Engineering',
  'IS 492 - Intro to Gen AI for Human Collaboration',
  'IS 445 - Data Viz & Storytelling',
  'IS 534 - Information Consulting',
]

const SKILL_CATEGORIES = [
  {
    category: 'Design',
    skills: [
      'Human-Centered Design',
      'Accessibility (WCAG 2.2 AA)',
      'Design Systems',
      'Prototyping & Wireframing',
      'Visual Hierarchy',
      'Design Documentation & Specs',
    ],
  },
  {
    category: 'Research',
    skills: [
      'Qualitative Research Methods',
      'Ethnographic Observation',
      'Semi-Structured Interviews',
      'Usability Testing',
      'UX Auditing',
      'Persona & Journey Mapping',
      'Survey Design',
    ],
  },
  {
    category: 'Code (Beginner)',
    skills: ['Python', 'R', 'SQL', 'HTML', 'Java/TS'],
  },
  {
    category: 'General',
    skills: [
      'Agile Methodologies',
      'Cross-Functional Collaboration',
      'Leadership',
      'Workshop Facilitation',
      'Adaptability',
      'Project Coordination',
    ],
  },
]

export default function AboutPage() {
  return (
    <div className="layout">
      <Sidebar variant="project" />

      <div className="page-with-local-nav page-with-local-nav--fixed">
        <LocalPageNav
          intro="Entry level designer + researcher focused on bringing human-centered design principles to complex problems."
          toc={ABOUT_TOC}
          persistInView
        />

        <main className="main">
        <header className="case-header" id="about">
          <div className="case-tag">About</div>
          <h1>Designing practical, evidence-backed experiences for people doing hard work.</h1>
          <p>
            My name is Sara. I bring a social science perspective to UX research and design — 
            studying how people behave, communicate, and navigate digital systems to create intuitive, 
            inclusive, and accessible experiences.
          </p>
          <div className="meta-row">
            <div className="meta-item">
              <span className="meta-label">Location</span>
              <span className="meta-value">U.S. Based</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Focus</span>
              <span className="meta-value">UX/UI Design and Research, Accessibility Design, CX Strategy</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Open To</span>
              <span className="meta-value">Full-time UX/Product roles</span>
            </div>
          </div>
        </header>

        <section className="article-section" id="education">
          <div className="section-eyebrow">Education</div>
          <h2>Human-centered design, rooted in the social sciences.</h2>
          <div className="about-stack">
            <article className="about-card">
              <div className="about-row">
                <h3>University of Illinois Urbana-Champaign</h3>
                <span className="about-date">AUG 2024 — MAY 2026</span>
              </div>
              <p>M.S. Information Management</p>
              <p className="about-muted">Certificate in Information Accessibility Design and Policy</p>
            </article>
            <article className="about-card">
              <div className="about-row">
                <h3>University of Illinois Urbana-Champaign</h3>
                <span className="about-date">AUG 2020 — MAY 2024</span>
              </div>
              <p>B.A. Liberal Arts and Sciences • Sociocultural and Linguistics Anthropology</p>
              <p className="about-muted">Interdisciplinary Certificate in Human-Centered Design</p>
            </article>
          </div>
        </section>

        <section className="article-section" id="coursework">
          <div className="section-eyebrow">Relevant Coursework</div>
          <h2>Coursework that directly informs my UX process.</h2>
          <ul className="about-grid-list">
            {COURSEWORK.map((course) => (
              <li key={course}>{course}</li>
            ))}
          </ul>
        </section>

        <section className="article-section" id="experience">
          <div className="section-eyebrow">Experience</div>
          <h2>Cross-functional product and research experience.</h2>
          <div className="about-stack">
            <article className="about-card">
              <div className="about-row">
                <h3>UX Research Intern · Synchrony Financial</h3>
                <span className="about-date">Jan 2026 – Present</span>
              </div>
              <ul className="about-bullets">
                <li>Support UX research initiatives by assisting with the planning and execution of user studies, including usability testing, card sorting, and click testing, to evaluate and improve digital experiences.</li>
                <li>Collaborate with designers and product partners to translate research questions into testable study designs and research artifacts such as discussion guides and task flows.</li>
                <li>Contribute to the development of research operations by organizing study materials, documentation, and insights to improve discoverability and reuse of research findings.</li>
                <li>Assist in synthesizing qualitative and quantitative research data into clear summaries and actionable insights for cross-functional stakeholders.</li>
              </ul>
            </article>

            <article className="about-card">
              <div className="about-row">
                <h3>UX/UI Design Intern · Synchrony Financial</h3>
                <span className="about-date">May 2025 – Dec 2025</span>
              </div>
              <ul className="about-bullets">
                <li>Conducted a thorough UX audit of a digital analytics dashboard product, identifying 80+ usability, information-hierarchy, and accessibility improvements within an Agile product lifecycle, translating audit findings into actionable insights.</li>
                <li>Led a multi-iteration, constraint-aware redesign in Figma, prioritizing immediate usability, information hierarchy, and accessibility improvements, while translating remaining audit findings into a UX roadmap for future work.</li>
                <li>Built 30+ design system components within Figma, including data visualization modules, navigation patterns, and reusable interface elements that improved consistency across the analytics platform.</li>
                <li>Established naming conventions, component variants, and auto-layout standards to ensure system-wide consistency and reduce designer/developer friction.</li>
                <li>Participated in weekly Agile design reviews with the Lead UX Designer, sharing in-progress work, gathering critique, and iterating designs based on feedback.</li>
                <li>Regularly presented UX audit findings and redesign concepts to the Product Leader, Product Owner, Product Manager, and engineering team during sprint reviews and planning, walking through prototypes to refine scope and feasibility.</li>
              </ul>
            </article>

            <article className="about-card">
              <div className="about-row">
                <h3>Customer Experience (CX) Intern · Busey Bank</h3>
                <span className="about-date">Aug 2024 – May 2025</span>
              </div>
              <ul className="about-bullets">
                <li>Supported the Customer Experience Manager in shifting the organization from a process-centric to a customer-centric perspective by introducing formal Customer Experience Mapping (CEM) and persona frameworks.</li>
                <li>Conducted market research and competitive analysis to evaluate customer journey mapping practices in the financial services industry and build a business case for adoption.</li>
                <li>Designed Busey’s foundational persona set, representing diverse customers with clearly defined goals, needs, and pain points.</li>
                <li>Created a standardized Customer Experience Mapping template that balanced employee familiarity with internal process maps while introducing customer emotions, perceptions, and touchpoints.</li>
                <li>Navigated program and organizational limitations by prioritizing usability and adoption over visual polish, delivering a practical solution aligned with team workflows.</li>
              </ul>
            </article>

            <article className="about-card">
              <div className="about-row">
                <h3>Project Coordinator &amp; Student Researcher · Community Data Clinic</h3>
                <span className="about-date">Aug 2023 – May 2025</span>
              </div>
              <ul className="about-bullets">
                <li>Led research, design, and execution of community digital-literacy modules, ensuring accessible, user-centered content and intuitive instructional layouts.</li>
                <li>Designed and evaluated workflows for community-facing tools, applying UX fundamentals and iterative refinements based on user feedback.</li>
                <li>Documented observations and insights from field research—workforce development class observations—to inform content, workflow, and service design decisions for community programs.</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="article-section" id="skills-tools">
          <div className="section-eyebrow">Skills &amp; Tools</div>
          <h2>Research depth, design craft, and execution speed.</h2>

          <h3>Skills</h3>
          {SKILL_CATEGORIES.map(({ category, skills }) => (
            <div key={category} className="about-skill-group">
              <h4>{category}</h4>
              <div className="about-chip-wrap">
                {skills.map((skill) => (
                  <span key={skill} className="about-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <h3>Tools</h3>
          <ToolDock />
        </section>

        <section className="article-section" id="beyond-resume">
          <div className="section-eyebrow">Beyond The Resume</div>
          <h2>I am a person outside of work!</h2>
          <p>
            When I'm not designing or researching, you can find me watching horror/thriller movies,
            cooking meals full of veggies, cuddling my cat Truffle, or going on hikes. I am also deeply
            passionate about educational outreach and mentorship, having been involved in various initiatives
            to support low income and first-generation students (like myself!) and women in tech.
          </p>
        </section>

          <SiteFooter />
        </main>
      </div>
    </div>
  )
}
