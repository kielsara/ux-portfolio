import Sidebar from '@/components/Sidebar'
import Marquee from '@/components/Marquee'
import SiteFooter from '@/components/SiteFooter'

export default function Home() {
  return (
    <div className="layout">
      <Sidebar variant="home" />

      <main className="main home-main">
        <div className="home-top-row">
          <section className="home-hero-section" aria-label="Introduction">
            <section className="hero" aria-label="Introduction">
              <h1>
                Designing human-centered digital experiences through<br />
                <em>research + data + empathy.</em>
              </h1>
              <p style={{ marginBottom: '1.5em' }}>
                My name is Sara. I bring a social science perspective to UX research and design —
                studying how people behave, communicate, and navigate digital systems to create
                intuitive, inclusive, and accessible experiences.
              </p>
              <div className="hero-chips" aria-label="Education and certifications">
                <span className="hero-chip">MS Information Management</span>
                <span className="hero-chip">BA Sociocultural Anthropology</span>
                <span className="hero-chip">Human-Centered Design Certificate</span>
                <span className="hero-chip">Accessibility Design Certificate</span>
              </div>
            </section>
          </section>

          <section className="home-work-section" aria-label="Selected work highlights">
            <div className="section-header">Selected Work</div>
            <Marquee orientation="vertical" />
          </section>
        </div>

        {/* ── Footer ── */}
        <SiteFooter />
      </main>
    </div>
  )
}
