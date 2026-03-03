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
            Your bold headline goes<br />
            <em>right here.</em>
          </h1>
          <p>
            I&rsquo;m [Your Name], a [your role] based in [your location]. Replace this with
            your story &mdash; what you do, who you do it for, and what makes your
            perspective unique. Keep it honest, specific, and human.
          </p>
        </section>

        {/* ── Selected Work ── */}
        <div className="section-header">Selected Work</div>

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
