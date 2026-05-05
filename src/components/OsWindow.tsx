import { useEffect, useRef, useState } from 'react'
import './OsWindow.css'

export default function OsWindow() {
  const [phase, setPhase] = useState<'coding' | 'dashboard'>('coding')
  const flowBarRef = useRef<HTMLDivElement>(null)
  const riskCircleRef = useRef<SVGCircleElement>(null)
  const chartBarsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('dashboard')
      // Animate dashboard elements
      setTimeout(() => {
        if (flowBarRef.current) flowBarRef.current.style.width = '72%'
        if (riskCircleRef.current) {
          const r = 26
          const circ = 2 * Math.PI * r
          riskCircleRef.current.style.strokeDashoffset = String(circ * (1 - 0.23))
        }
        chartBarsRef.current.forEach((bar, i) => {
          if (bar) {
            const heights = [60, 40, 75, 55, 85, 45, 70, 90, 50, 65]
            bar.style.height = heights[i % heights.length] + '%'
          }
        })
      }, 100)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const r = 26
  const circ = 2 * Math.PI * r

  return (
    <div className="ow-section">
      <div className="ow-wrapper">
        <div className="ow-window">
          <div className="ow-frame">
            <div className="ow-titlebar">
              <div className="ow-dots">
                <div className="ow-dot" />
                <div className="ow-dot" />
                <div className="ow-dot" />
              </div>
              <span className="ow-titlebar-label">
                {phase === 'coding' ? 'AI_AGENT.PY' : 'DASHBOARD'}
              </span>
            </div>
            <div className="ow-body">
              {/* Coding view */}
              <div className="ow-coding" style={{ opacity: phase === 'coding' ? 1 : 0 }}>
                <div><span className="ow-dim">01 </span><span className="ow-blue">import</span> openai, pandas</div>
                <div><span className="ow-dim">02 </span></div>
                <div><span className="ow-dim">03 </span><span className="ow-blue">def</span> <span className="ow-bold">analyze_leads</span>(df):</div>
                <div><span className="ow-dim">04 </span>  client = openai.OpenAI()</div>
                <div><span className="ow-dim">05 </span>  <span className="ow-blue">for</span> _, row <span className="ow-blue">in</span> df.iterrows():</div>
                <div><span className="ow-dim">06 </span>    score = client.chat(row)</div>
                <div><span className="ow-dim">07 </span>    <span className="ow-blue">yield</span> score</div>
              </div>

              {/* Dashboard view */}
              <div className="ow-dashboard" style={{ opacity: phase === 'dashboard' ? 1 : 0, pointerEvents: phase === 'dashboard' ? 'auto' : 'none' }}>
                <div className="ow-stat-primary">
                  <span className="ow-stat-label">LEADS SCORED</span>
                  <span className="ow-stat-value-lg">2,847</span>
                  <span className="ow-stat-sub">↑ 18.4% this week</span>
                </div>
                <div className="ow-stat-netflow">
                  <span className="ow-label-muted ow-stat-label">NET FLOW</span>
                  <span className="ow-stat-value-dark">$94.2k</span>
                  <div className="ow-flow-track">
                    <div className="ow-flow-bar" ref={flowBarRef} />
                  </div>
                </div>
                <div className="ow-stat-risk">
                  <span className="ow-label-muted ow-stat-label">RISK</span>
                  <div className="ow-risk-ring">
                    <svg viewBox="0 0 60 60">
                      <circle cx="30" cy="30" r={r} fill="none" stroke="#f1f5f9" strokeWidth="6" />
                      <circle
                        ref={riskCircleRef}
                        cx="30" cy="30" r={r}
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="6"
                        strokeDasharray={circ}
                        strokeDashoffset={circ}
                      />
                    </svg>
                    <span className="ow-risk-label">LOW</span>
                  </div>
                </div>
                <div className="ow-perf-card">
                  <div className="ow-perf-header">
                    <span className="ow-perf-title">PERFORMANCE</span>
                    <span className="ow-perf-badge">LIVE</span>
                  </div>
                  <div className="ow-chart">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className={`ow-chart-bar ${i % 3 === 0 ? 'ow-bar-gray' : 'ow-bar-blue'}`}
                        style={{ height: '0%' }}
                        ref={el => { if (el) chartBarsRef.current[i] = el }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
