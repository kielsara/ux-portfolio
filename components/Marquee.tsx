import Link from 'next/link'

// ── Edit this array to add/remove your projects ──
const PROJECTS = [
  { id: 'project-one',   label: 'Project One',   gradient: 'linear-gradient(135deg,#d4c5b0,#a89880)', hasLink: true },
  { id: 'project-two',   label: 'Project Two',   gradient: 'linear-gradient(135deg,#b8c9d4,#8aaab8)', hasLink: true },
  { id: 'project-three', label: 'Project Three', gradient: 'linear-gradient(135deg,#c9c0d3,#9e91b0)', hasLink: false },
  { id: 'project-four',  label: 'Project Four',  gradient: 'linear-gradient(135deg,#d4b0b0,#b88080)', hasLink: true },
  { id: 'project-five',  label: 'Project Five',  gradient: 'linear-gradient(135deg,#b0d4c0,#80b898)', hasLink: false },
  { id: 'project-six',   label: 'Project Six',   gradient: 'linear-gradient(135deg,#d4d0b0,#b8b080)', hasLink: true },
]

// Duplicate for seamless CSS loop
const CARDS = [...PROJECTS, ...PROJECTS]

export default function Marquee() {
  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {CARDS.map((project, i) => (
          <div key={`${project.id}-${i}`} className="marquee-card">
            {/* Replace the div below with an <Image> when you have real screenshots */}
            <div
              className="marquee-card-img"
              style={{ background: project.gradient, width: '100%', height: '100%' }}
            />
            <div className="card-label">
              <span>{project.label}</span>
              {project.hasLink && (
                <Link href={`/case-study/${project.id}`}>View →</Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
