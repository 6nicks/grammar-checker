'use client'

import { useState, useRef, useEffect } from 'react'

interface GrammarError {
  original: string
  correction: string
  explanationZh?: string
  explanationEn?: string
}

interface GrammarResult {
  original: string
  corrected: string
  errors: GrammarError[]
  isCorrect: boolean
}

export default function GrammarChecker() {
  const [text, setText] = useState('')
  const [result, setResult] = useState<GrammarResult | null>(null)
  const [loading, setLoading] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  const checkGrammar = async () => {
    if (!text.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/grammar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      const data = await res.json()
      setResult(data)
    } catch (error) {
      console.error('Check grammar error:', error)
      alert('检查失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (result && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [result])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) checkGrammar()
  }

  const renderResult = () => {
    if (!result) return null
    if (result.isCorrect) {
      return (
        <div className="result-card success">
          <div className="success-icon">✓</div>
          <p className="success-title">语法正确</p>
          <p className="success-subtitle">Grammar is correct</p>
          <p className="success-text">{result.original}</p>
        </div>
      )
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div className="result-card original">
          <p className="card-label">原文 / Original</p>
          <p className="card-text">{result.original}</p>
        </div>
        <div className="result-card corrected">
          <p className="card-label">修正后 / Corrected</p>
          <p className="card-text">{result.corrected}</p>
        </div>
        {result.errors.length > 0 && (
          <div className="result-card errors">
            <p className="card-label error">错误详情 / Errors</p>
            <ul className="error-list">
              {result.errors.map((error, idx) => (
                <li key={idx} className="error-item">
                  <div className="error-row">
                    <span className="error-word">{error.original}</span>
                    <span className="error-arrow">→</span>
                    <span className="correct-word">{error.correction}</span>
                  </div>
                  {(error.explanationZh || error.explanationEn) && (
                    <div className="error-explain">
                      {error.explanationZh && <p>CN: {error.explanationZh}</p>}
                      {error.explanationEn && <p>EN: {error.explanationEn}</p>}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }

  // 生成带线条的焦点
  const renderPulsePoints = () => {
    const points = []
    for (let i = 1; i <= 24; i++) {
      points.push(
        <div key={i} className="grid-pulse">
          <div className="line-v" />
          <div className="line-v line-v-down" />
        </div>
      )
    }
    return points
  }

  return (
    <div className="page-container">
      <div className="animated-grid">
        <div className="grid-layer" />
      </div>
      <div className="grid-pulse-container">
        {renderPulsePoints()}
      </div>

      <header className="header">
        <div className="header-content">
          <a href="/" className="logo">
            <div className="logo-icon">G</div>
            <span className="logo-text">Grammar Checker</span>
          </a>
          <div className="nav-links">
            <a href="/article" className="nav-link">开发故事</a>
            <a href="https://github.com/6nicks/grammar-checker" target="_blank" rel="noopener noreferrer" className="github-link">
              <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="hero">
          <div className="tag">
            <span className="tag-dot" />
            AI-Powered
          </div>
          <h1 className="title">
            <span className="title-main">Grammar Checker</span>
          </h1>
          <p className="subtitle">智能英语语法检查，让写作更准确</p>
        </div>

        <div className="input-card">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入英语句子..."
            className="input-textarea"
          />
          <div className="button-group">
            <button onClick={checkGrammar} disabled={loading || !text.trim()} className="btn-primary">
              {loading ? <><span className="loading-spinner" />检查中</> : '检查语法'}
            </button>
            <button onClick={() => { setText(''); setResult(null); }} className="btn-secondary">清空</button>
          </div>
          <p className="shortcut-hint"><kbd>Ctrl</kbd> + <kbd>Enter</kbd> 快速检查</p>
        </div>

        {result && (
          <div className="result-section" ref={resultRef}>
            <p className="result-header">检查结果</p>
            {renderResult()}
          </div>
        )}
      </main>

      <footer className="footer">Powered by AI · Built with Next.js</footer>
    </div>
  )
}