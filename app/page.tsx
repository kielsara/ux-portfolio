import Sidebar from '@/components/Sidebar'
import Marquee from '@/components/Marquee'
import SiteFooter from '@/components/SiteFooter'

export default function Home() {
  return (
    <div className="layout">
      <Sidebar variant="home" />

      <main className="main">
        {/* ── Hero ── */}
        <section className="hero">
          <h1>
            Designing human-centered digital experiences through<br />
            <em>research + data + empathy.</em>
          </h1>
          <p>
            My name is Sara. I bring a social science perspective to UX research and design —
            studying how people behave, communicate, and navigate digital systems to create
            intuitive, inclusive, and accessible experiences.
          </p>
          <div className="hero-chips" aria-label="Education and certifications">
            <span className="hero-chip">MS Information Management</span>
            <span className="hero-chip">BA Anthropology</span>
            <span className="hero-chip">Human-Centered Design Certificate</span>
            <span className="hero-chip">Accessibility Design Certificate</span>
          </div>
        </section>

        {/* ── Selected Work ── */}
        <div className="section-header">Selected Work</div>

        {/* ── Marquee ── */}
        <Marquee />

        {/* ── Footer ── */}
        <SiteFooter />
      </main>
    </div>
  )
}
