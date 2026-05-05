import './Hero.css'
import OsWindow from './OsWindow'

interface HeroProps {
  onContactClick: () => void
}

export default function Hero({ onContactClick }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Hire<br />
          <span className="hero-title-accent">AI</span><br />
          Devs.
        </h1>
        <p className="hero-description body-text">
          We build AI-powered products — from intelligent automation to full-stack
          applications. Fast, reliable, and built to scale.
        </p>
        <button className="btn btn-dark" onClick={onContactClick}>
          Get in Touch →
        </button>
      </div>
      <div className="hero-visual">
        <OsWindow />
      </div>
    </section>
  )
}
