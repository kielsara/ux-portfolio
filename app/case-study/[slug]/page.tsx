import { notFound } from 'next/navigation'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import DraggableCanvas from '@/components/DraggableCanvas'
import { getAllSlugs, getCaseStudy } from '@/lib/caseStudies'

// Tell Next.js which slugs exist at build time
export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cs = getCaseStudy(slug)
  return { title: cs ? `${cs.tag} • Your Name` : 'Not Found' }
}

// ── Placeholder image block ────────────────────────────
function ImgPlaceholder({
  gradient,
  caption,
  height = 280,
}: {
  gradient: string
  caption?: string
  height?: number
}) {
  return (
    <figure className="section-image">
      <div
        className="img-placeholder"
        style={{ background: gradient, height }}
      >
        {/* Replace with <Image src="..." alt="..." fill /> when you have real images */}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cs = getCaseStudy(slug)
  if (!cs) notFound()

  return (
    <div className="layout">
      {/* ── Sidebar with TOC ── */}
      <Sidebar variant="case-study" intro={cs.intro} toc={cs.toc} />

      <main className="main">

        {/* ── Header ── */}
        <header className="case-header">
          <div className="case-tag">{cs.tag}</div>
          <h1>{cs.title}</h1>
          <p>{cs.overview}</p>
          <div className="meta-row">
            <div className="meta-item">
              <span className="meta-label">Role</span>
              <span className="meta-value">{cs.role}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Timeline</span>
              <span className="meta-value">{cs.timeline}</span>
            </div>
          </div>
        </header>

        {/* ── Hero image ── */}
        <div
          className="hero-image"
          style={{ background: cs.heroGradient ?? 'linear-gradient(135deg,#d4c5b0,#c0ae96)' }}
        >
          {!cs.heroImage && (
            <span className="img-placeholder-label">[ your hero screenshot / mockup ]</span>
          )}
        </div>

        {/* ═══ Why it mattered ═══ */}
        <section className="article-section" id="why-it-mattered">
          <div className="section-eyebrow">Why it mattered</div>
          <h2>The headline that frames the business problem.</h2>
          <div className="stat-row">
            {cs.whyItMattered.stats.map(s => (
              <div key={s.number} className="stat-block">
                <div className="stat-number">{s.number}</div>
                <div className="stat-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ Where we started ═══ */}
        <section className="article-section" id="where-we-started">
          <div className="section-eyebrow">Where We Started</div>
          <h2>This part of the product hadn&rsquo;t been touched in years.</h2>
          {cs.whereWeStarted.body.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          <ImgPlaceholder
            gradient="linear-gradient(135deg,#e8e2d8,#d4cbbf)"
            caption={cs.whereWeStarted.imageCaption}
          />
        </section>

        {/* ═══ Research ═══ */}
        <section className="article-section" id="research">
          <div className="section-eyebrow">What Research Revealed</div>
          <h2>The issue wasn&rsquo;t what everyone assumed.</h2>
          <p>{cs.research.body}</p>
        </section>

        {/* ═══ Interactive Canvas ═══ */}
        <div className="canvas-section">
          <DraggableCanvas />
          <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6, marginTop: '16px' }}>
            Used AI to analyze chat threads at scale &mdash; identifying 16 distinct message
            categories across 1,000+ conversations.
          </p>
          <blockquote>
            <p>&ldquo;{cs.research.quote}&rdquo;</p>
            <cite>{cs.research.quoteAttrib}</cite>
          </blockquote>
        </div>

        {/* ═══ The Reframe ═══ */}
        <section className="article-section" id="reframe">
          <div className="section-eyebrow">The Reframe</div>
          <h2>But the obvious fix alone wouldn&rsquo;t solve it.</h2>
          <p>{cs.reframe.body}</p>
          <ImgPlaceholder gradient="linear-gradient(135deg,#dce8f0,#c4d8e8)" caption="Old model (left) vs new model (right)" />
          <p>{cs.reframe.body2}</p>
          <ImgPlaceholder gradient="linear-gradient(135deg,#e8f0dc,#d0e4c4)" caption="The new data model" />
        </section>

        {/* ═══ Solution ═══ */}
        <section className="article-section" id="solution">
          <div className="section-eyebrow">Solution</div>
          <h2>{cs.solution.intro}</h2>
          {cs.solution.features.map((f, i) => (
            <div key={i}>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
              <ImgPlaceholder
                gradient={[
                  'linear-gradient(135deg,#f0ece4,#e4dccf)',
                  'linear-gradient(135deg,#e4ecf0,#cfe0e4)',
                  'linear-gradient(135deg,#ece4f0,#e0cfe4)',
                ][i % 3]}
              />
            </div>
          ))}
        </section>

        {/* ═══ Enabling Ops ═══ */}
        <section className="article-section" id="ops">
          <div className="section-eyebrow">Enabling Ops</div>
          <h2>Enabling the team without rebuilding the platform.</h2>
          <p>{cs.ops.body}</p>
          <ImgPlaceholder gradient="linear-gradient(135deg,#f0ece4,#e8e0d4)" caption="Internal-facing component with additional context on hover" />
          <blockquote>
            <p>&ldquo;{cs.ops.quote}&rdquo;</p>
            <cite>{cs.ops.quoteAttrib}</cite>
          </blockquote>
        </section>

        {/* ═══ Outcomes ═══ */}
        <section className="article-section" id="outcomes">
          <div className="section-eyebrow">Outcomes</div>
          <h2>The numbers that mattered.</h2>
          <div className="outcome-row">
            {cs.outcomes.stats.map(s => (
              <div key={s.number} className="outcome-item">
                <div className="outcome-number">{s.number}</div>
                <div className="outcome-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ Collaboration ═══ */}
        <section className="article-section" id="collaboration">
          <div className="section-eyebrow">Collaboration &amp; Execution</div>
          <h2>How the team made it real.</h2>
          <p>{cs.collaboration.body}</p>
          {cs.collaboration.team.length > 0 && (
            <div className="team-grid">
              {cs.collaboration.team.map(member => (
                <div key={member.name} className="team-card">
                  <div className="team-name">{member.name}</div>
                  <div className="team-role">{member.role}</div>
                  <div className="team-desc">{member.desc}</div>
                </div>
              ))}
            </div>
          )}
          <ImgPlaceholder gradient="linear-gradient(135deg,#ece8e0,#ddd8ce)" caption="Just one of many pages from months of iteration." />
        </section>

        {/* ═══ Takeaway ═══ */}
        <section className="article-section" id="takeaway">
          <div className="section-eyebrow">Key Takeaway</div>
          <h2>Users didn&rsquo;t need more features &mdash; they needed to understand what was already happening.</h2>
          <p>{cs.takeaway.body}</p>
          <ImgPlaceholder gradient="linear-gradient(135deg,#d4c5b0,#c0ae96)" height={320} />
        </section>

        {/* ── Case footer nav ── */}
        <div className="case-footer">
          {cs.prevSlug ? (
            <Link href={`/case-study/${cs.prevSlug}`}>← Previous project</Link>
          ) : (
            <Link href="/">← All projects</Link>
          )}
          {cs.nextSlug ? (
            <Link href={`/case-study/${cs.nextSlug}`}>Next project →</Link>
          ) : (
            <span />
          )}
        </div>

        {/* ── Site footer ── */}
        <footer className="site-footer">
          <span>Built with Next.js</span>
          <div className="footer-links">
            <Link href="https://linkedin.com/in/yourhandle" target="_blank" rel="noopener noreferrer">LinkedIn</Link>
            <Link href="/resume.pdf">Resume</Link>
          </div>
        </footer>

      </main>
    </div>
  )
}
