import { useEffect, useRef, useState } from 'react'
import './AIPowered.css'

const terminalLines = [
  '$ python agent.py --task "analyze leads"',
  '> Loading model: gpt-4o...',
  '> Processing 847 records...',
  '> Scoring intent signals...',
  '> High-intent leads: 124',
  '> Drafting outreach emails...',
  '> Done. 124 emails queued. ✓',
]

export default function AIPowered() {
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let i = 0
          const interval = setInterval(() => {
            i++
            setVisibleLines(i)
            if (i >= terminalLines.length) clearInterval(interval)
          }, 500)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="ap-section" ref={sectionRef}>
      <div className="ap-inner">
        <div className="ap-terminal">
          <div className="ap-term-chrome">
            <div className="ap-dots">
              <span /><span /><span />
            </div>
            <span className="ap-term-title">TERMINAL</span>
          </div>
          <div className="ap-term-body">
            {terminalLines.slice(0, visibleLines).map((line, i) => (
              <div className="ap-term-line" key={i}>{line}</div>
            ))}
            {visibleLines < terminalLines.length && (
              <span className="ap-term-cursor">█</span>
            )}
          </div>
        </div>

        <div className="ap-content">
          <span className="eyebrow" style={{ color: 'var(--color-muted)' }}>AI-Powered</span>
          <h2 className="section-heading ap-heading">
            Automation that<br />actually works
          </h2>
          <ul className="ap-list">
            {[
              'AI agents that handle repetitive tasks end-to-end',
              'LLM integrations with GPT-4, Claude, and Gemini',
              'Custom fine-tuned models for your domain',
              'Real-time pipelines with sub-second latency',
            ].map((item) => (
              <li className="ap-list-item" key={item}>
                <span className="num-label">→</span>
                <span className="body-text ap-list-text">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
