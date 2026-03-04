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
  return { title: cs ? `${cs.tag} • Sara Kiel` : 'Not Found' }
}

// ── Placeholder image block ────────────────────────────
function ImgPlaceholder({
  gradient,
  caption,
  height = 280,
  label,
}: {
  gradient: string
  caption?: string
  height?: number
  label?: string
}) {
  return (
    <figure className="section-image">
      <div
        className="img-placeholder"
        style={{ background: gradient, height }}
      >
        {label && <span className="img-placeholder-label">{label}</span>}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cs = getCaseStudy(slug)
  if (!cs) notFound()

  // Render audit-style project
  if (cs.isAuditProject) {
    return (
      <div className="layout">
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
                <span className="meta-label">Duration</span>
                <span className="meta-value">{cs.timeline}</span>
              </div>
              {cs.tools && (
                <div className="meta-item">
                  <span className="meta-label">Tools</span>
                  <span className="meta-value">{cs.tools}</span>
                </div>
              )}
              {cs.methods && (
                <div className="meta-item meta-item-wide">
                  <span className="meta-label">Methods</span>
                  <span className="meta-value">{cs.methods}</span>
                </div>
              )}
            </div>
          </header>

          {/* ── Hero image ── */}
          <div
            className="hero-image"
            style={{ background: cs.heroGradient ?? 'linear-gradient(135deg,#1a1a2e,#16213e)' }}
          >
            <span className="img-placeholder-label">[ before &amp; after hero image ]</span>
          </div>

          {/* ═══ The Challenge ═══ */}
          {cs.challenge && (
            <section className="article-section" id="challenge">
              <div className="section-eyebrow">The Challenge</div>
              <h2>{cs.challenge.headline}</h2>
              <p>{cs.challenge.body}</p>
              {cs.challenge.stats && (
                <div className="stat-row">
                  {cs.challenge.stats.map(s => (
                    <div key={s.number} className="stat-block">
                      <div className="stat-number">{s.number}</div>
                      <div className="stat-desc">{s.desc}</div>
                    </div>
                  ))}
                </div>
              )}
              <ImgPlaceholder
                gradient="linear-gradient(135deg,#2d2d44,#1a1a2e)"
                label="[ screenshot of problematic UI state ]"
                caption="The analytics dashboard before the audit — accumulated UX debt from years of feature additions."
              />
            </section>
          )}

          {/* ═══ Audit Approach ═══ */}
          {cs.approach && (
            <section className="article-section" id="approach">
              <div className="section-eyebrow">Audit Approach</div>
              <h2>{cs.approach.headline}</h2>
              <p>{cs.approach.body}</p>
              {cs.approach.steps && (
                <div className="process-steps">
                  {cs.approach.steps.map((step, i) => (
                    <div key={i} className="process-step">
                      <div className="step-num">{step.num}</div>
                      <div className="step-content">
                        <div className="step-title">{step.title}</div>
                        <div className="step-desc">{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <ImgPlaceholder
                gradient="linear-gradient(135deg,#16213e,#0f3460)"
                label="[ FigJam audit board overview ]"
                caption="Systematic walkthrough documented in FigJam with heuristic annotations."
                height={320}
              />
            </section>
          )}

          {/* ═══ What I Found ═══ */}
          {cs.findings && (
            <section className="article-section" id="findings">
              <div className="section-eyebrow">What I Found</div>
              <h2>{cs.findings.headline}</h2>
              <p>{cs.findings.body}</p>
              {cs.findings.items && (
                <div className="findings-grid">
                  {cs.findings.items.map((item, i) => (
                    <div key={i} className="finding-card">
                      <div className="finding-icon">{item.icon}</div>
                      <div className="finding-title">{item.title}</div>
                      <div className="finding-desc">{item.desc}</div>
                    </div>
                  ))}
                </div>
              )}
              <ImgPlaceholder
                gradient="linear-gradient(135deg,#1a1a2e,#2d2d44)"
                label="[ annotated screenshot showing specific issues ]"
                caption="Example findings: contrast failures, unclear data labels, inconsistent navigation patterns."
                height={300}
              />
            </section>
          )}

          {/* ═══ Making Sense (Synthesis) ═══ */}
          {cs.synthesis && (
            <section className="article-section" id="synthesis">
              <div className="section-eyebrow">Making Sense of It</div>
              <h2>{cs.synthesis.headline}</h2>
              <p>{cs.synthesis.body}</p>
              {cs.synthesis.themes && (
                <div className="theme-tags">
                  {cs.synthesis.themes.map((theme, i) => (
                    <span key={i} className="theme-tag">{theme}</span>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* ── Interactive Canvas ── */}
          <div className="canvas-section">
            <DraggableCanvas />
            <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6, marginTop: '16px' }}>
              Affinity mapping in FigJam &mdash; clustering 80+ observations into actionable themes.
            </p>
          </div>

          {/* ═══ Getting Buy-In (Alignment) ═══ */}
          {cs.alignment && (
            <section className="article-section" id="alignment">
              <div className="section-eyebrow">Getting Buy-In</div>
              <h2>{cs.alignment.headline}</h2>
              <p>{cs.alignment.body}</p>
              <ImgPlaceholder
                gradient="linear-gradient(135deg,#0f3460,#16213e)"
                label="[ stakeholder presentation slide ]"
                caption="Audit readout presentation with prioritized recommendations."
              />
              {cs.alignment.quote && (
                <blockquote>
                  <p>&ldquo;{cs.alignment.quote}&rdquo;</p>
                  {cs.alignment.quoteAttrib && <cite>{cs.alignment.quoteAttrib}</cite>}
                </blockquote>
              )}
            </section>
          )}

          {/* ═══ The Redesign ═══ */}
          {cs.redesign && (
            <section className="article-section" id="redesign">
              <div className="section-eyebrow">The Redesign</div>
              <h2>{cs.redesign.headline}</h2>
              <p>{cs.redesign.body}</p>
              {cs.redesign.changes && cs.redesign.changes.map((change, i) => (
                <div key={i} className="redesign-block">
                  <h3>{change.title}</h3>
                  <p>{change.desc}</p>
                  <ImgPlaceholder
                    gradient={[
                      'linear-gradient(135deg,#1a1a2e,#2d2d44)',
                      'linear-gradient(135deg,#16213e,#0f3460)',
                      'linear-gradient(135deg,#2d2d44,#1a1a2e)',
                    ][i % 3]}
                    label={`[ before & after: ${change.title.toLowerCase()} ]`}
                    height={260}
                  />
                </div>
              ))}
            </section>
          )}

          {/* ═══ Impact ═══ */}
          {cs.impact && (
            <section className="article-section" id="impact">
              <div className="section-eyebrow">Impact</div>
              <h2>{cs.impact.headline}</h2>
              <p>{cs.impact.body}</p>
              {cs.impact.stats && (
                <div className="outcome-row">
                  {cs.impact.stats.map(s => (
                    <div key={s.number} className="outcome-item">
                      <div className="outcome-number">{s.number}</div>
                      <div className="outcome-desc">{s.desc}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* ═══ Reflection ═══ */}
          {cs.reflection && (
            <section className="article-section" id="reflection">
              <div className="section-eyebrow">Reflection</div>
              <h2>{cs.reflection.headline}</h2>
              <p>{cs.reflection.body}</p>
              {cs.reflection.learnings && (
                <ul className="learnings-list">
                  {cs.reflection.learnings.map((learning, i) => (
                    <li key={i}>{learning}</li>
                  ))}
                </ul>
              )}
            </section>
          )}

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

  // ── Standard project layout (unchanged) ──
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
        {cs.whyItMattered && (
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
        )}

        {/* ═══ Where we started ═══ */}
        {cs.whereWeStarted && (
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
        )}

        {/* ═══ Research ═══ */}
        {cs.research && (
          <section className="article-section" id="research">
            <div className="section-eyebrow">What Research Revealed</div>
            <h2>The issue wasn&rsquo;t what everyone assumed.</h2>
            <p>{cs.research.body}</p>
          </section>
        )}

        {/* ═══ Interactive Canvas ═══ */}
        {cs.research && (
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
        )}

        {/* ═══ The Reframe ═══ */}
        {cs.reframe && (
          <section className="article-section" id="reframe">
            <div className="section-eyebrow">The Reframe</div>
            <h2>But the obvious fix alone wouldn&rsquo;t solve it.</h2>
            <p>{cs.reframe.body}</p>
            <ImgPlaceholder gradient="linear-gradient(135deg,#dce8f0,#c4d8e8)" caption="Old model (left) vs new model (right)" />
            <p>{cs.reframe.body2}</p>
            <ImgPlaceholder gradient="linear-gradient(135deg,#e8f0dc,#d0e4c4)" caption="The new data model" />
          </section>
        )}

        {/* ═══ Solution ═══ */}
        {cs.solution && (
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
        )}

        {/* ═══ Enabling Ops ═══ */}
        {cs.ops && (
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
        )}

        {/* ═══ Outcomes ═══ */}
        {cs.outcomes && (
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
        )}

        {/* ═══ Collaboration ═══ */}
        {cs.collaboration && (
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
        )}

        {/* ═══ Takeaway ═══ */}
        {cs.takeaway && (
          <section className="article-section" id="takeaway">
            <div className="section-eyebrow">Key Takeaway</div>
            <h2>Users didn&rsquo;t need more features &mdash; they needed to understand what was already happening.</h2>
            <p>{cs.takeaway.body}</p>
            <ImgPlaceholder gradient="linear-gradient(135deg,#d4c5b0,#c0ae96)" height={320} />
          </section>
        )}

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
