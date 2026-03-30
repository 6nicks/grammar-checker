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

type Lang = 'zh' | 'en'
type Theme = 'dark' | 'light'

const texts = {
  zh: {
    title: '语法检查',
    subtitle: '智能英语语法检查，让写作更准确',
    placeholder: '输入英语句子...',
    check: '检查语法',
    checking: '检查中',
    clear: '清空',
    shortcut: '快速检查',
    result: '检查结果',
    correct: '语法正确',
    correctEn: 'Grammar is correct',
    original: '原文',
    corrected: '修正后',
    errors: '错误详情',
    story: '开发故事',
  },
  en: {
    title: 'Grammar Checker',
    subtitle: 'AI-powered English grammar checking',
    placeholder: 'Enter English sentences...',
    check: 'Check Grammar',
    checking: 'Checking',
    clear: 'Clear',
    shortcut: 'Quick check',
    result: 'Result',
    correct: 'Correct',
    correctEn: 'Grammar is correct',
    original: 'Original',
    corrected: 'Corrected',
    errors: 'Errors',
    story: 'Story',
  },
}

export default function GrammarChecker() {
  const [text, setText] = useState('')
  const [result, setResult] = useState<GrammarResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [lang, setLang] = useState<Lang>('zh')
  const [theme, setTheme] = useState<Theme>('dark')
  const resultRef = useRef<HTMLDivElement>(null)

  const t = texts[lang]

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const checkGrammar = async () => {
    if (!text.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/grammar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, lang }),
      })
      const data = await res.json()
      setResult(data)
    } catch (error) {
      console.error('Check grammar error:', error)
      alert(lang === 'zh' ? '检查失败，请稍后重试' : 'Check failed, please try again')
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
          <p className="success-title">{t.correct}</p>
          <p className="success-subtitle">{t.correctEn}</p>
          <p className="success-text">{result.original}</p>
        </div>
      )
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="result-card original">
          <p className="card-label">{t.original}</p>
          <p className="card-text">{result.original}</p>
        </div>
        <div className="result-card corrected">
          <p className="card-label">{t.corrected}</p>
          <p className="card-text">{result.corrected}</p>
        </div>
        {result.errors.length > 0 && (
          <div className="result-card errors">
            <p className="card-label error">{t.errors}</p>
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
                      {lang === 'zh' && error.explanationZh && <p>{error.explanationZh}</p>}
                      {lang === 'en' && error.explanationEn && <p>{error.explanationEn}</p>}
                      {lang === 'zh' && error.explanationEn && <p className="text-xs opacity-70">EN: {error.explanationEn}</p>}
                      {lang === 'en' && error.explanationZh && <p className="text-xs opacity-70">CN: {error.explanationZh}</p>}
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
    <div className="page-container" data-theme={theme}>
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
            <a href="/article" className="nav-link">{t.story}</a>
            <button 
              className="theme-toggle" 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              title={theme === 'dark' ? '切换浅色' : 'Switch to dark'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              ) : (
                <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
            <div className="lang-switch">
              <button 
                className={lang === 'zh' ? 'active' : ''} 
                onClick={() => setLang('zh')}
              >
                中
              </button>
              <button 
                className={lang === 'en' ? 'active' : ''} 
                onClick={() => setLang('en')}
              >
                EN
              </button>
            </div>
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
          <h1 className="title">
            <span className="title-main">{t.title}</span>
          </h1>
          <p className="subtitle">{t.subtitle}</p>
        </div>

        <div className="input-card">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.placeholder}
            className="input-textarea"
          />
          <div className="button-group">
            <button onClick={checkGrammar} disabled={loading || !text.trim()} className="btn-primary">
              {loading ? <><span className="loading-spinner" />{t.checking}</> : t.check}
            </button>
            <button onClick={() => { setText(''); setResult(null); }} className="btn-secondary">{t.clear}</button>
          </div>
          <p className="shortcut-hint"><kbd>Ctrl</kbd> + <kbd>Enter</kbd> {t.shortcut}</p>
        </div>

        {result && (
          <div className="result-section" ref={resultRef}>
            <p className="result-header">{t.result}</p>
            {renderResult()}
          </div>
        )}
      </main>

      <footer className="footer">Powered by AI · Built with Next.js</footer>
    </div>
  )
}