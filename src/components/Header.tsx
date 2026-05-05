import { useState } from 'react'
import './Header.css'

interface HeaderProps {
  onContactClick: () => void
}

export default function Header({ onContactClick }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="header-inner" style={{ padding: '18px 40px' }}>
        {/* Logo */}
        <a href="#" className="inklik-logo-container" style={{ textDecoration: 'none' }}>
          <div className="logo-flex-row">
            <span className="brand-inklik">Inklik</span>
            <span className="code-syntax">
              <span className="syn-bracket">[</span>
              <span className="syn-text">devs</span>
              <span className="syn-bracket">]</span>
            </span>
            <span className="logo-cursor-long" />
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="header-nav">
          <a href="#what-we-offer" className="nav-link">Services</a>
          <a href="#process" className="nav-link">Process</a>
          <a href="#projects" className="nav-link">Projects</a>
          <button className="btn btn-dark" onClick={onContactClick}>
            Hire Us
          </button>
        </nav>

        {/* Hamburger */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="mobile-nav">
            <a href="#what-we-offer" className="nav-link" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#process" className="nav-link" onClick={() => setMenuOpen(false)}>Process</a>
            <a href="#projects" className="nav-link" onClick={() => setMenuOpen(false)}>Projects</a>
            <button className="btn btn-dark" onClick={() => { setMenuOpen(false); onContactClick() }}>
              Hire Us
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}
