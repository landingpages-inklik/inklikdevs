import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="ft-section">
      <div className="ft-inner">
        <div className="ft-top">
          <div className="ft-logo-group">
            <div className="ft-logo">
              <span className="ft-brand">Inklik</span>
              <span className="ft-code">
                <span className="ft-bracket">[</span>
                <span className="ft-text">devs</span>
                <span className="ft-bracket">]</span>
              </span>
              <span className="ft-cursor" />
            </div>
          </div>
          <span className="ft-dash">—</span>
          <div className="ft-tagline-wrap">
            <span className="ft-tagline">We build AI-powered software that scales.</span>
          </div>
        </div>
        <p className="ft-copy">© {year} InklikDevs. All rights reserved.</p>
      </div>
    </footer>
  )
}
