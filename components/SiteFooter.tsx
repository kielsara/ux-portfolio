import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>
        Built with{' '}
        <Link href="https://nextjs.org" target="_blank" rel="noopener noreferrer">Next.js</Link>,{' '}
        <Link href="https://agentation.com" target="_blank" rel="noopener noreferrer">Agentation</Link>,{' '}
        <Link href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer">VS Code + Copilot Pro</Link>, and lots of coffee.
      </span>
      <ThemeToggle />
      <div className="footer-links">
        <Link href="https://linkedin.com/in/saramkiel" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </Link>
        <Link href="/Sara Kiel — Resume.pdf">Resume</Link>
      </div>
    </footer>
  )
}
