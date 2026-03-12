import { notFound } from 'next/navigation'
import Link from 'next/link'
import Sidebar, { LocalPageNav } from '@/components/Sidebar'
import DraggableCanvas from '@/components/DraggableCanvas'
import HeroZoomImage from '@/components/HeroZoomImage'
import ZoomableImage from '../../../components/ZoomableImage'
import { getAllSlugs, getSelectedWork } from '@/lib/selectedWork'
import SiteFooter from '@/components/SiteFooter'

// Tell Next.js which slugs exist at build time
export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cs = getSelectedWork(slug)
  return { title: cs ? `${cs.tag} · Selected Work • Sara Kiel` : 'Not Found' }
}

// ── Placeholder image block ────────────────────────────
function ImgPlaceholder({
  src,
  alt,
  gradient,
  caption,
  height = 280,
  label,
}: {
  src?: string
  alt?: string
  gradient?: string
  caption?: string
  height?: number
  label?: string
}) {
  return (
    <figure className="section-image">
      {src ? (
        <ZoomableImage
          src={src}
          alt={alt ?? 'Case study section image'}
          wrapperClassName="section-image-media"
          imageClassName="section-image-img"
          imageStyle={{ height }}
          triggerClassName="section-image-zoom-trigger"
          dialogLabel="Full section image preview"
        />
      ) : (
        <div
          className="img-placeholder"
          style={{ background: gradient ?? 'linear-gradient(135deg,#2d2d44,#1a1a2e)', height }}
        >
          {label && <span className="img-placeholder-label">{label}</span>}
        </div>
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

function CaseMetaRow({
  role,
  team,
  timeline,
  tools,
  methods,
}: {
  role: string
  team?: string
  timeline: string
  tools?: string
  methods?: string
}) {
  return (
    <div className="meta-row">
      <div className="meta-item">
        <span className="meta-label">Role</span>
        <span className="meta-value">{role}</span>
      </div>
      <div className="meta-item meta-item-team">
        <span className="meta-label">Team</span>
        <span className="meta-value">{team ?? 'Individual project'}</span>
      </div>
      <div className="meta-item">
        <span className="meta-label">Duration</span>
        <span className="meta-value">{timeline}</span>
      </div>
      {tools && (
        <div className="meta-item meta-item-tools">
          <span className="meta-label">Tools</span>
          <span className="meta-value">{tools}</span>
        </div>
      )}
      {methods && (
        <div className="meta-item meta-item-methods">
          <span className="meta-label">Methods</span>
          <span className="meta-value">{methods}</span>
        </div>
      )}
    </div>
  )
}

export default async function SelectedWorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cs = getSelectedWork(slug)
  if (!cs) notFound()
  const isProjectOne = cs.slug === 'project-one'

  // Render audit-style project
  if (cs.isAuditProject) {
    return (
      <div className="layout">
        <Sidebar variant="project" />

        <div className="page-with-local-nav page-with-local-nav--fixed">
          <LocalPageNav intro={cs.intro} toc={cs.toc} persistInView />

          <main className="main">

          {/* ── Header ── */}
          <header className="case-header">
            <div className="case-tag">{cs.tag}</div>
            <h1>{cs.title}</h1>
            <p>{cs.overview}</p>
            <CaseMetaRow
              role={cs.role}
              team={cs.team}
              timeline={cs.timeline}
              tools={cs.tools}
              methods={cs.methods}
            />
          </header>

          {/* ── Hero image ── */}
          {cs.heroImage ? (
            <HeroZoomImage
              src={cs.heroImage}
              alt={`${cs.title} hero image`}
              imagePosition={cs.heroImagePosition}
            />
          ) : (
            <div
              className="hero-image"
              style={{ background: cs.heroGradient ?? 'linear-gradient(135deg,#1a1a2e,#16213e)' }}
            >
              <span className="img-placeholder-label">[ before &amp; after hero image ]</span>
            </div>
          )}

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
                src={cs.challenge.image?.src}
                alt={cs.challenge.image?.alt}
                gradient="linear-gradient(135deg,#2d2d44,#1a1a2e)"
                label="[ screenshot of problematic UI state ]"
                caption={cs.challenge.image?.caption}
                height={cs.challenge.image?.height ?? 500}
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
                src={cs.approach.image?.src}
                alt={cs.approach.image?.alt}
                gradient="linear-gradient(135deg,#16213e,#0f3460)"
                label="[ FigJam audit board overview ]"
                caption={cs.approach.image?.caption}
                height={cs.approach.image?.height ?? 300}
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
              {isProjectOne ? (
                <div className="canvas-section">
                  <DraggableCanvas items={cs.canvasImages} />
                  <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6, marginTop: '16px' }}>
                    A look inside the audit — findings captured in FigJam.
                  </p>
                </div>
              ) : (
                <ImgPlaceholder
                  src={cs.findings.image?.src}
                  alt={cs.findings.image?.alt}
                  gradient="linear-gradient(135deg,#1a1a2e,#2d2d44)"
                  label="[ annotated screenshot showing specific issues ]"
                  caption={cs.findings.image?.caption}
                  height={cs.findings.image?.height ?? 300}
                />
              )}
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
              {isProjectOne && cs.findings?.image && (
                <ImgPlaceholder
                  src={cs.findings.image.src}
                  alt={cs.findings.image.alt}
                  gradient="linear-gradient(135deg,#1a1a2e,#2d2d44)"
                  label="[ annotated screenshot showing specific issues ]"
                  caption={cs.findings.image.caption}
                  height={cs.findings.image.height ?? 300}
                />
              )}
            </section>
          )}

          {/* ── Interactive Canvas ── */}
          {!isProjectOne && (
            <div className="canvas-section">
              <DraggableCanvas items={cs.canvasImages} />
              <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6, marginTop: '16px' }}>
                Affinity mapping in FigJam &mdash; clustering 80+ observations into actionable themes.
              </p>
            </div>
          )}

          {/* ═══ Getting Buy-In (Alignment) ═══ */}
          {cs.alignment && (
            <section className="article-section" id="alignment">
              <div className="section-eyebrow">Getting Buy-In</div>
              <h2>{cs.alignment.headline}</h2>
              <p>{cs.alignment.body}</p>
              <ImgPlaceholder
                src={cs.alignment.image?.src}
                alt={cs.alignment.image?.alt}
                gradient="linear-gradient(135deg,#0f3460,#16213e)"
                label="[ stakeholder presentation slide ]"
                caption={cs.alignment.image?.caption}
                height={cs.alignment.image?.height ?? 280}
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
                    src={change.image?.src}
                    alt={change.image?.alt}
                    gradient={[
                      'linear-gradient(135deg,#1a1a2e,#2d2d44)',
                      'linear-gradient(135deg,#16213e,#0f3460)',
                      'linear-gradient(135deg,#2d2d44,#1a1a2e)',
                    ][i % 3]}
                    label={`[ before & after: ${change.title.toLowerCase()} ]`}
                    caption={change.image?.caption}
                    height={change.image?.height ?? 260}
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

          {/* ── Back to top ── */}
          <div className="back-to-top">
            <a href="#">click to go back to the top of page ↑</a>
          </div>

          {/* ── Case footer nav ── */}
          <div className="case-footer">
            {cs.prevSlug ? (
              <Link href={`/selected-work/${cs.prevSlug}`}>← Previous project</Link>
            ) : (
              <Link href="/">← All projects</Link>
            )}
            {cs.nextSlug ? (
              <Link href={`/selected-work/${cs.nextSlug}`}>Next project →</Link>
            ) : (
              <span />
            )}
          </div>

          {/* ── Site footer ── */}
            <SiteFooter />

          </main>
        </div>
      </div>
    )
  }

  // ── Design System project layout ──
  if (cs.isDesignSystem) {
    return (
      <div className="layout">
        <Sidebar variant="project" />

        <div className="page-with-local-nav page-with-local-nav--fixed">
          <LocalPageNav intro={cs.intro} toc={cs.toc} persistInView />

          <main className="main">

          {/* ── Header ── */}
          <header className="case-header">
            <div className="case-tag">{cs.tag}</div>
            <h1>{cs.title}</h1>
            <p>{cs.overview}</p>
            <CaseMetaRow
              role={cs.role}
              team={cs.team}
              timeline={cs.timeline}
              tools={cs.tools}
              methods={cs.methods}
            />
          </header>

          {/* ── Hero image ── */}
          {cs.heroImage ? (
            <HeroZoomImage
              src={cs.heroImage}
              alt={`${cs.title} hero image`}
              imagePosition={cs.heroImagePosition}
            />
          ) : (
            <div
              className="hero-image hero-image--ds"
              style={{ background: cs.heroGradient ?? 'linear-gradient(135deg,#1a1a2e,#16213e)' }}
            >
              <span className="hero-title-overlay">DESIGN SYSTEM</span>
            </div>
          )}

          {/* ═══ Context ═══ */}
          {cs.context && (
            <section className="article-section" id="context">
              <div className="section-eyebrow">Context</div>
              <h2>{cs.context.headline}</h2>
              <p>{cs.context.body}</p>
              {cs.context.body2 && <p>{cs.context.body2}</p>}
              {cs.context.linkText && (
                <a href="#architecture" className="context-link">{cs.context.linkText}</a>
              )}
            </section>
          )}

          {/* ═══ Goals ═══ */}
          {cs.goals && (
            <section className="article-section" id="goals">
              <div className="section-eyebrow">Goals</div>
              {cs.goals.headline && <h2>{cs.goals.headline}</h2>}
              <ul className="goals-list">
                {cs.goals.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {/* ═══ Results ═══ */}
          {cs.results && (
            <section className="article-section" id="results">
              <div className="section-eyebrow">Results</div>
              {cs.results.headline && <h2>{cs.results.headline}</h2>}
              <ul className="results-list">
                {cs.results.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {/* ═══ Reflections ═══ */}
          {cs.reflections && (
            <section className="article-section" id="reflections">
              <div className="section-eyebrow">Reflections</div>
              <h2>{cs.reflections.headline}</h2>
              <p>{cs.reflections.body}</p>
            </section>
          )}

          {/* ═══ Process & Design Decisions — Component Architecture ═══ */}
          {cs.componentArchitecture && (
            <section className="article-section article-section--wide" id="architecture">
              <div className="section-eyebrow">Process &amp; Design Decisions</div>
              <h2 className="section-subhead">Component Architecture</h2>
              <h3>{cs.componentArchitecture.headline}</h3>
              <p>{cs.componentArchitecture.body}</p>
              {cs.componentArchitecture.body2 && <p>{cs.componentArchitecture.body2}</p>}
              {cs.componentArchitecture.body3 && <p>{cs.componentArchitecture.body3}</p>}
              <ImgPlaceholder
                gradient="linear-gradient(135deg,#1a1a2e,#2d2d44)"
                label="[ component architecture diagram ]"
                caption="Design system structure showing foundations, styles, and component layers."
                height={360}
              />
            </section>
          )}

          {/* ═══ Chart & Graph Components ═══ */}
          {cs.chartComponents && (
            <section className="article-section article-section--wide" id="charts">
              <h2 className="section-subhead">Chart &amp; Graph Components</h2>
              <h3>{cs.chartComponents.headline}</h3>
              <p>{cs.chartComponents.body}</p>
              
              {cs.chartComponents.tableData && (
                <div className="chart-categories">
                  <div className="chart-categories-header">
                    <span>Overview/Summary</span>
                    <span>Charts &amp; Graphs</span>
                  </div>
                  {cs.chartComponents.tableData.map((row, i) => (
                    <div key={i} className="chart-category-row">
                      <span className="chart-category-label">{row.label}</span>
                      <span className="chart-category-value">{row.value}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {cs.chartComponents.body2 && <p>{cs.chartComponents.body2}</p>}
              
              <ImgPlaceholder
                gradient="linear-gradient(135deg,#16213e,#0f3460)"
                label="[ chart component library overview ]"
                caption="Chart and graph components with usage guidelines and documentation."
                height={320}
              />
            </section>
          )}

          {/* ═══ Static Mockups — System-Driven Components ═══ */}
          {cs.staticMockups && (
            <section className="article-section article-section--wide" id="mockups">
              <h2 className="section-subhead">Static Mockups</h2>
              <div className="section-eyebrow" style={{ marginTop: 0 }}>System-Driven Components</div>
              <h3>{cs.staticMockups.headline}</h3>
              <p>{cs.staticMockups.body}</p>
              {cs.staticMockups.body2 && <p>{cs.staticMockups.body2}</p>}
              
              <div className="before-after-grid">
                <div className="before-after-item">
                  <div className="before-after-label">Before</div>
                  <ImgPlaceholder
                    gradient="linear-gradient(135deg,#2d2d44,#1a1a2e)"
                    label="[ before: ad-hoc frames ]"
                    height={240}
                  />
                </div>
                <div className="before-after-item">
                  <div className="before-after-label">After</div>
                  <ImgPlaceholder
                    gradient="linear-gradient(135deg,#1a1a2e,#16213e)"
                    label="[ after: system-driven components ]"
                    height={240}
                  />
                </div>
              </div>
              
              {cs.staticMockups.body3 && <p>{cs.staticMockups.body3}</p>}
            </section>
          )}

          {/* ── Interactive Canvas ── */}
          <div className="canvas-section">
            <DraggableCanvas items={cs.canvasImages} />
            <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6, marginTop: '16px' }}>
              Component library exploration &mdash; drag to explore the design system structure.
            </p>
          </div>

          {/* ── Back to top ── */}
          <div className="back-to-top">
            <a href="#">click to go back to the top of page ↑</a>
          </div>

          {/* ── Case footer nav ── */}
          <div className="case-footer">
            {cs.prevSlug ? (
              <Link href={`/selected-work/${cs.prevSlug}`}>← Previous project</Link>
            ) : (
              <Link href="/">← All projects</Link>
            )}
            {cs.nextSlug ? (
              <Link href={`/selected-work/${cs.nextSlug}`}>Next project →</Link>
            ) : (
              <span />
            )}
          </div>

          {/* ── Site footer ── */}
            <SiteFooter />

          </main>
        </div>
      </div>
    )
  }

  // ── AI-Powered UX/UI Design project layout (ABCapture) ──
  if (cs.isAIDesign) {
    return (
      <div className="layout">
        <Sidebar variant="project" />

        <div className="page-with-local-nav page-with-local-nav--fixed">
          <LocalPageNav intro={cs.intro} toc={cs.toc} persistInView />

          <main className="main">

          {/* ── Header ── */}
          <header className="case-header">
            <div className="case-tag">{cs.tag}</div>
            <h1>{cs.title}</h1>
            <p>{cs.overview}</p>
            <CaseMetaRow
              role={cs.role}
              team={cs.team}
              timeline={cs.timeline}
              tools={cs.tools}
              methods={cs.methods}
            />
          </header>

          {/* ── Hero image ── */}
          {cs.heroImage ? (
            <HeroZoomImage
              src={cs.heroImage}
              alt={`${cs.title} hero image`}
              imagePosition={cs.heroImagePosition}
            />
          ) : (
            <div
              className="hero-image hero-image--ai-design"
              style={{ background: cs.heroGradient ?? 'linear-gradient(135deg,#3b1d6e,#1a3a5c)' }}
            >
              <span className="hero-title-overlay">UX/UI DESIGN<br/>WITH AI</span>
            </div>
          )}

          {/* ═══ Context ═══ */}
          {cs.context && (
            <section className="article-section" id="context">
              <div className="section-eyebrow">Context</div>
              <h2>{cs.context.headline}</h2>
              <p>{cs.context.body}</p>
              {cs.context.body2 && <p>{cs.context.body2}</p>}
            </section>
          )}

          {/* ═══ Goals ═══ */}
          {cs.goals && (
            <section className="article-section" id="goals">
              <div className="section-eyebrow">Goals</div>
              {cs.goals.headline && <h2>{cs.goals.headline}</h2>}
              <ul className="goals-list">
                {cs.goals.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {/* ═══ Results ═══ */}
          {cs.results && (
            <section className="article-section" id="results">
              <div className="section-eyebrow">Results</div>
              {cs.results.headline && <h2>{cs.results.headline}</h2>}
              <ul className="results-list">
                {cs.results.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {/* ═══ Reflections ═══ */}
          {cs.reflections && (
            <section className="article-section" id="reflections">
              <div className="section-eyebrow">Reflections</div>
              <h2>{cs.reflections.headline}</h2>
              <p>{cs.reflections.body}</p>
            </section>
          )}

          {/* ═══ Process & Design Decisions ═══ */}
          {cs.processSteps && cs.processSteps.length > 0 && (
            <>
              <div className="process-divider">
                <div className="process-divider-line" />
                <span className="process-divider-label">Process &amp; Design Decisions</span>
                <div className="process-divider-line" />
              </div>

              {cs.processSteps.map((step, i) => (
                <section
                  key={step.id}
                  className="article-section article-section--process"
                  id={step.id}
                >
                  <div className="section-eyebrow">{step.eyebrow}</div>
                  <h2>{step.title}</h2>
                  <p>{step.body}</p>
                  {step.body2 && <p>{step.body2}</p>}
                  {step.body3 && <p>{step.body3}</p>}
                  {step.imageLabels && step.imageLabels.map((img, j) => (
                    <ImgPlaceholder
                      key={j}
                      gradient={[
                        'linear-gradient(135deg,#3b1d6e,#1a2a40)',
                        'linear-gradient(135deg,#1a3a5c,#2d1b4e)',
                        'linear-gradient(135deg,#2d1b4e,#1a3a5c)',
                        'linear-gradient(135deg,#1a2a40,#3b1d6e)',
                      ][(i + j) % 4]}
                      label={img.label}
                      caption={img.caption}
                      height={img.height ?? 280}
                    />
                  ))}
                </section>
              ))}
            </>
          )}

          {/* ── Back to top ── */}
          <div className="back-to-top">
            <a href="#">click to go back to the top of page ↑</a>
          </div>

          {/* ── Case footer nav ── */}
          <div className="case-footer">
            {cs.prevSlug ? (
              <Link href={`/selected-work/${cs.prevSlug}`}>← Previous project</Link>
            ) : (
              <Link href="/">← All projects</Link>
            )}
            {cs.nextSlug ? (
              <Link href={`/selected-work/${cs.nextSlug}`}>Next project →</Link>
            ) : (
              <span />
            )}
          </div>

          {/* ── Site footer ── */}
            <SiteFooter />

          </main>
        </div>
      </div>
    )
  }

  // ── App Redesign project layout (Strava) ──
  if (cs.isAppRedesign) {
    return (
      <div className="layout">
        <Sidebar variant="project" />

        <div className="page-with-local-nav page-with-local-nav--fixed">
          <LocalPageNav intro={cs.intro} toc={cs.toc} persistInView />

          <main className="main">

          {/* ── Header ── */}
          <header className="case-header">
            <div className="case-tag">{cs.tag}</div>
            <h1>{cs.title}</h1>
            <p>{cs.overview}</p>
            <CaseMetaRow
              role={cs.role}
              team={cs.team}
              timeline={cs.timeline}
              tools={cs.tools}
              methods={cs.methods}
            />
          </header>

          {/* ── Hero image ── */}
          {cs.heroImage ? (
            <HeroZoomImage
              src={cs.heroImage}
              alt={`${cs.title} hero image`}
              imagePosition={cs.heroImagePosition}
            />
          ) : (
            <div
              className="hero-image hero-image--app-redesign"
              style={{ background: cs.heroGradient ?? 'linear-gradient(135deg,#fc4c02,#e03e00)' }}
            >
              <span className="hero-title-overlay">APP &amp; EXPERIENCE REDESIGN</span>
            </div>
          )}

          {/* ═══ Context ═══ */}
          {cs.context && (
            <section className="article-section" id="context">
              <div className="section-eyebrow">Context</div>
              <h2>{cs.context.headline}</h2>
              <p>{cs.context.body}</p>
              {cs.context.body2 && <p>{cs.context.body2}</p>}
            </section>
          )}

          {/* ═══ Goals ═══ */}
          {cs.goals && (
            <section className="article-section" id="goals">
              <div className="section-eyebrow">Goals</div>
              {cs.goals.headline && <h2>{cs.goals.headline}</h2>}
              <ul className="goals-list">
                {cs.goals.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {/* ═══ Results ═══ */}
          {cs.results && (
            <section className="article-section" id="results">
              <div className="section-eyebrow">Results</div>
              {cs.results.headline && <h2>{cs.results.headline}</h2>}
              <ul className="results-list">
                {cs.results.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {/* ═══ Reflections ═══ */}
          {cs.reflections && (
            <section className="article-section" id="reflections">
              <div className="section-eyebrow">Reflections</div>
              <h2>{cs.reflections.headline}</h2>
              <p>{cs.reflections.body}</p>
            </section>
          )}

          {/* ═══ Process & Design Decisions ═══ */}
          {cs.processSteps && cs.processSteps.length > 0 && (
            <>
              <div className="process-divider">
                <div className="process-divider-line" />
                <span className="process-divider-label">Process &amp; Design Decisions</span>
                <div className="process-divider-line" />
              </div>

              {cs.processSteps.map((step, i) => (
                <section
                  key={step.id}
                  className="article-section article-section--process"
                  id={step.id}
                >
                  <div className="section-eyebrow">{step.eyebrow}</div>
                  <h2>{step.title}</h2>
                  <p>{step.body}</p>
                  {step.body2 && <p>{step.body2}</p>}
                  {step.body3 && <p>{step.body3}</p>}
                  {step.imageLabels && step.imageLabels.map((img, j) => (
                    <ImgPlaceholder
                      key={j}
                      gradient={[
                        'linear-gradient(135deg,#2d2d44,#1a1a2e)',
                        'linear-gradient(135deg,#1a1a2e,#16213e)',
                        'linear-gradient(135deg,#16213e,#0f3460)',
                        'linear-gradient(135deg,#2a2a3a,#1e1e30)',
                      ][(i + j) % 4]}
                      label={img.label}
                      caption={img.caption}
                      height={img.height ?? 280}
                    />
                  ))}
                </section>
              ))}
            </>
          )}

          {/* ── Back to top ── */}
          <div className="back-to-top">
            <a href="#">click to go back to the top of page ↑</a>
          </div>

          {/* ── Case footer nav ── */}
          <div className="case-footer">
            {cs.prevSlug ? (
              <Link href={`/selected-work/${cs.prevSlug}`}>← Previous project</Link>
            ) : (
              <Link href="/">← All projects</Link>
            )}
            {cs.nextSlug ? (
              <Link href={`/selected-work/${cs.nextSlug}`}>Next project →</Link>
            ) : (
              <span />
            )}
          </div>

          {/* ── Site footer ── */}
            <SiteFooter />

          </main>
        </div>
      </div>
    )
  }

  // ── CX Research / Persona project layout (Busey Bank) ──
  if (cs.isCxResearch) {
    return (
      <div className="layout">
        <Sidebar variant="project" />

        <div className="page-with-local-nav page-with-local-nav--fixed">
          <LocalPageNav intro={cs.intro} toc={cs.toc} persistInView />

          <main className="main">

          {/* ── Header ── */}
          <header className="case-header">
            <div className="case-tag">{cs.tag}</div>
            <h1>{cs.title}</h1>
            <p>{cs.overview}</p>
            <CaseMetaRow
              role={cs.role}
              team={cs.team}
              timeline={cs.timeline}
              tools={cs.tools}
              methods={cs.methods}
            />
          </header>

          {/* ── Hero image ── */}
          {cs.heroImage ? (
            <HeroZoomImage
              src={cs.heroImage}
              alt={`${cs.title} hero image`}
              imagePosition={cs.heroImagePosition}
            />
          ) : (
            <div
              className="hero-image hero-image--cx-research"
              style={{ background: cs.heroGradient ?? 'linear-gradient(135deg,#1a3a4a,#0d2633)' }}
            >
              <span className="hero-title-overlay">PERSONA &amp;<br/>USER JOURNEY CREATION</span>
            </div>
          )}

          {/* ═══ Context ═══ */}
          {cs.context && (
            <section className="article-section" id="context">
              <div className="section-eyebrow">Context</div>
              <h2>{cs.context.headline}</h2>
              <p>{cs.context.body}</p>
              {cs.context.body2 && <p>{cs.context.body2}</p>}
              {cs.context.linkText && (
                <a href="#research" className="context-link">{cs.context.linkText}</a>
              )}
            </section>
          )}

          {/* ═══ Goals ═══ */}
          {cs.goals && (
            <section className="article-section" id="goals">
              <div className="section-eyebrow">Goals</div>
              {cs.goals.headline && <h2>{cs.goals.headline}</h2>}
              <ul className="goals-list">
                {cs.goals.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {/* ═══ Results ═══ */}
          {cs.results && (
            <section className="article-section" id="results">
              <div className="section-eyebrow">Results</div>
              {cs.results.headline && <h2>{cs.results.headline}</h2>}
              <ul className="results-list">
                {cs.results.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {/* ═══ Reflections ═══ */}
          {cs.reflections && (
            <section className="article-section" id="reflections">
              <div className="section-eyebrow">Reflections</div>
              <h2>{cs.reflections.headline}</h2>
              <p>{cs.reflections.body}</p>
            </section>
          )}

          {/* ═══ Process & Design Decisions ═══ */}
          {cs.processSteps && cs.processSteps.length > 0 && (
            <>
              <div className="process-divider">
                <div className="process-divider-line" />
                <span className="process-divider-label">Process &amp; Design Decisions</span>
                <div className="process-divider-line" />
              </div>

              {cs.processSteps.map((step, i) => (
                <section
                  key={step.id}
                  className="article-section article-section--process"
                  id={step.id}
                >
                  <div className="section-eyebrow">{step.eyebrow}</div>
                  <h2>{step.title}</h2>
                  <p>{step.body}</p>
                  {step.body2 && <p>{step.body2}</p>}
                  {step.body3 && <p>{step.body3}</p>}
                  {step.ndaNotice && (
                    <div className="nda-notice">
                      <span className="nda-icon">🔒</span>
                      <p>{step.ndaNotice}</p>
                    </div>
                  )}
                  {step.imageLabels && step.imageLabels.map((img, j) => (
                    <ImgPlaceholder
                      key={j}
                      gradient={[
                        'linear-gradient(135deg,#1a3a4a,#0d2633)',
                        'linear-gradient(135deg,#0d2633,#1a2a36)',
                        'linear-gradient(135deg,#2a3a44,#1a2a34)',
                      ][(i + j) % 3]}
                      label={img.label}
                      caption={img.caption}
                      height={img.height ?? 280}
                    />
                  ))}
                </section>
              ))}
            </>
          )}

          {/* ── Back to top ── */}
          <div className="back-to-top">
            <a href="#">click to go back to the top of page ↑</a>
          </div>

          {/* ── Case footer nav ── */}
          <div className="case-footer">
            {cs.prevSlug ? (
              <Link href={`/selected-work/${cs.prevSlug}`}>← Previous project</Link>
            ) : (
              <Link href="/">← All projects</Link>
            )}
            {cs.nextSlug ? (
              <Link href={`/selected-work/${cs.nextSlug}`}>Next project →</Link>
            ) : (
              <span />
            )}
          </div>

          {/* ── Site footer ── */}
            <SiteFooter />

          </main>
        </div>
      </div>
    )
  }

  // ── Standard project layout (unchanged) ──
  return (
    <div className="layout">
      <Sidebar variant="project" />

      <div className="page-with-local-nav page-with-local-nav--fixed">
        <LocalPageNav intro={cs.intro} toc={cs.toc} persistInView />

        <main className="main">

        {/* ── Header ── */}
        <header className="case-header">
          <div className="case-tag">{cs.tag}</div>
          <h1>{cs.title}</h1>
          <p>{cs.overview}</p>
          <CaseMetaRow
            role={cs.role}
            team={cs.team}
            timeline={cs.timeline}
            tools={cs.tools}
            methods={cs.methods}
          />
        </header>

        {/* ── Hero image ── */}
        {cs.heroImage ? (
          <HeroZoomImage
            src={cs.heroImage}
            alt={`${cs.title} hero image`}
            imagePosition={cs.heroImagePosition}
          />
        ) : (
          <div
            className="hero-image"
            style={{ background: cs.heroGradient ?? 'linear-gradient(135deg,#d4c5b0,#c0ae96)' }}
          >
            <span className="img-placeholder-label">[ your hero screenshot / mockup ]</span>
          </div>
        )}

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
            <DraggableCanvas items={cs.canvasImages} />
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

        {/* ── Back to top ── */}
        <div className="back-to-top">
          <a href="#">click to go back to the top of page ↑</a>
        </div>

        {/* ── Case footer nav ── */}
        <div className="case-footer">
          {cs.prevSlug ? (
            <Link href={`/selected-work/${cs.prevSlug}`}>← Previous project</Link>
          ) : (
            <Link href="/">← All projects</Link>
          )}
          {cs.nextSlug ? (
            <Link href={`/selected-work/${cs.nextSlug}`}>Next project →</Link>
          ) : (
            <span />
          )}
        </div>

        {/* ── Site footer ── */}
          <SiteFooter />

        </main>
      </div>
    </div>
  )
}
