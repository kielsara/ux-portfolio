import Sidebar from '@/components/Sidebar'
import Marquee from '@/components/Marquee'
import Link from 'next/link'

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
            I’m Sara, an Information Management graduate student currently pursuing a certificate 
            in Accessibility Design, with a background in Sociocultural and Linguistic Anthropology 
            and Human-Centered Design. I bring a social science perspective to UX research and 
            design — studying how people behave, communicate, and navigate digital systems to create
             more intuitive, inclusive, and accessible experiences.
          </p>
        </section>

        {/* ── Featured Work ── */}
        <div className="section-header">Featured Work</div>

        {/* ── Marquee ── */}
        <Marquee />

        {/* ── Footer ── */}
        <footer className="site-footer">
          <span>Built with Next.js</span>
          <div className="footer-links">
            <Link href="https://linkedin.com/in/saramkiel" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </Link>
            <Link href="/resume.pdf">Resume</Link>
          </div>
        </footer>
      </main>
    </div>
  )
}
