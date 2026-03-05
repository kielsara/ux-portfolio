import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import SiteFooter from '@/components/SiteFooter'

const ABOUT_TOC = [
  { id: 'about', symbol: '01', label: 'About' },
  { id: 'education', symbol: '02', label: 'Education' },
  { id: 'coursework', symbol: '03', label: 'Coursework' },
  { id: 'experience', symbol: '04', label: 'Experience' },
  { id: 'skills-tools', symbol: '05', label: 'Skills & Tools' },
]

const COURSEWORK = [
  'Human-Computer Interaction',
  'UX Research Methods',
  'Interaction Design Studio',
  'Information Architecture',
  'Visual Communication for Designers',
  'Product Strategy & Metrics',
]

const SKILLS = [
  'Mixed-method UX research',
  'Journey mapping & service blueprints',
  'Information architecture',
  'Wireframing & prototyping',
  'Usability testing',
  'Stakeholder facilitation',
  'Storytelling with data',
]

const TOOLS = [
  'Figma',
  'FigJam',
  'Miro',
  'Maze',
  'Optimal Workshop',
  'Dovetail',
  'Notion',
  'Jira',
  'Google Analytics',
  'Hotjar',
]

export default function AboutPage() {
  return (
    <div className="layout">
      <Sidebar
        variant="project"
        intro="Designer + researcher focused on reducing complexity and improving confidence in high-friction workflows."
        toc={ABOUT_TOC}
      />

      <main className="main">
        <header className="case-header" id="about">
          <div className="case-tag">About</div>
          <h1>Designing practical, evidence-backed experiences for people doing hard work.</h1>
          <p>
            I&rsquo;m Sara Kiel, a UX designer and researcher who blends qualitative insight with product thinking.
            I specialize in B2B and operational workflows where clarity, trust, and speed matter.
          </p>
          <div className="meta-row">
            <div className="meta-item">
              <span className="meta-label">Location</span>
              <span className="meta-value">Champaign, Illinois</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Focus</span>
              <span className="meta-value">UX Research, Product Design, Systems Thinking</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Open To</span>
              <span className="meta-value">Full-time UX/Product roles</span>
            </div>
          </div>
        </header>

        <section className="article-section" id="education">
          <div className="section-eyebrow">Education</div>
          <h2>Foundations in human-centered design and product decision-making.</h2>
          <div className="about-stack">
            <article className="about-card">
              <div className="about-row">
                <h3>University of Illinois Urbana-Champaign</h3>
                <span className="about-date">2021 — 2025</span>
              </div>
              <p>B.S. in Information Sciences, concentration in Human-Centered Design.</p>
              <p className="about-muted">Minor: Psychology • Dean&rsquo;s List</p>
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
                <h3>UX Designer Intern · Company Name</h3>
                <span className="about-date">Summer 2025</span>
              </div>
              <p>
                Led discovery and design for a scheduling workflow used by internal operations teams.
                Synthesized interviews, mapped handoffs, and translated insights into a phased roadmap.
              </p>
              <ul className="about-bullets">
                <li>Reduced key task completion time by identifying and removing unnecessary decision points.</li>
                <li>Partnered with product and engineering to define MVP scope and launch criteria.</li>
                <li>Presented findings to leadership and aligned teams around measurable success metrics.</li>
              </ul>
            </article>

            <article className="about-card">
              <div className="about-row">
                <h3>Product Design Fellow · Program Name</h3>
                <span className="about-date">2024 — 2025</span>
              </div>
              <p>
                Collaborated with a startup team to redesign onboarding and improve first-week activation.
                Built prototypes, ran usability sessions, and iterated quickly based on evidence.
              </p>
            </article>
          </div>
        </section>

        <section className="article-section" id="skills-tools">
          <div className="section-eyebrow">Skills &amp; Tools</div>
          <h2>Research depth, design craft, and execution speed.</h2>

          <h3>Skills</h3>
          <div className="about-chip-wrap">
            {SKILLS.map((skill) => (
              <span key={skill} className="about-chip">{skill}</span>
            ))}
          </div>

          <h3>Tools</h3>
          <div className="about-chip-wrap">
            {TOOLS.map((tool) => (
              <span key={tool} className="about-chip">{tool}</span>
            ))}
          </div>
        </section>

        <section className="article-section">
          <div className="section-eyebrow">Beyond The Resume</div>
          <h2>How I like to work.</h2>
          <p>
            My best work happens in collaborative environments where teams are open to testing assumptions,
            learning quickly, and shipping meaningful improvements in small, measurable steps.
          </p>
        </section>

        <SiteFooter />
      </main>
    </div>
  )
}
