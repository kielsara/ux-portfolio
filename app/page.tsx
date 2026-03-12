import Sidebar from '@/components/Sidebar'
import Marquee from '@/components/Marquee'
import SiteFooter from '@/components/SiteFooter'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="layout">
      <Sidebar variant="home" />

      <main className="main">
        {/* ── Hero ── */}
        <div className="home-hero-layout">
          <section className="hero">
            <h1>
              Designing human-centered digital experiences through<br />
              <em>research + data + empathy.</em>
            </h1>
            <p style={{ marginBottom: '1.5em' }}>
              My name is Sara. I bring a social science perspective to UX research and design —
              studying how people behave, communicate, and navigate digital systems to create
              intuitive, inclusive, and accessible experiences.
            </p>
            <p>
              <em><strong>Please note:</strong> This portfolio is a work in progress — you will notice missing images throughout that I am actively working on uploading.
              If you have any questions about my work or experience, please feel free to reach out!</em>
            </p>
            <div className="hero-chips" aria-label="Education and certifications">
              <span className="hero-chip">MS Information Management</span>
              <span className="hero-chip">BA Anthropology</span>
              <span className="hero-chip">Human-Centered Design Certificate</span>
              <span className="hero-chip">Accessibility Design Certificate</span>
            </div>
          </section>

          <section className="home-hero-image-section" aria-label="Sara and Truffle photo">
            <Image
              src="/sara-truffle.png"
              alt="Sara and Truffle"
              width={1000}
              height={1000}
              className="home-hero-image"
              priority
            />
          </section>
        </div>

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
