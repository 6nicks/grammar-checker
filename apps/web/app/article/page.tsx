import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '开发故事',
  description: 'AI英语语法检查工具开发实录',
}

export default function ArticlePage() {
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
          <Link href="/" className="logo">
            <div className="logo-icon">G</div>
            <span className="logo-text">Grammar Checker</span>
          </Link>
          <div className="nav-links">
            <Link href="/" className="nav-link">检查语法</Link>
            <a href="https://github.com/6nicks/grammar-checker" target="_blank" rel="noopener noreferrer" className="github-link">
              <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </header>

      <main className="main-content article-content">
        <article className="article">
          <h1 className="article-title">从想法到上线只需4小时</h1>
          <div className="article-meta">
            <span>2026.03.28</span>
            <span>8 min read</span>
          </div>

          <section className="article-section">
            <h2>起因</h2>
            <p>作为一个英语学习者，我经常会遇到这样的困扰：</p>
            <ul>
              <li>写了一句英语，心里却总犯嘀咕："这句话语法对吗？"</li>
              <li>用了某个短语，不确定是否地道自然</li>
              <li>想表达一个意思，却不知道该怎么组织句子</li>
            </ul>
            <p>比如写下 <code>He go to school yesterday</code> 时，心里就开始打鼓。</p>
          </section>

          <section className="article-section">
            <h2>技术选型</h2>
            <p>选择 <strong>Next.js 14</strong> 作为技术栈，AI 使用阿里云千问 API。</p>
            <pre><code>{`mm-demo/\n├── apps/web/\n│   ├── app/\n│   ├── components/\n│   └── lib/\n└── packages/shared/`}</code></pre>
          </section>

          <section className="article-section">
            <h2>遇到的坑</h2>
            <div className="bug-card">
              <h4>响应时间过长</h4>
              <p>API 响应需要 60-80 秒</p>
              <p><strong>解决</strong>：<code>enable_thinking: false</code>，降至 3-5 秒</p>
            </div>
            <div className="bug-card">
              <h4>部署后无法访问</h4>
              <p><strong>解决</strong>：修复 Dockerfile 中 server.js 路径</p>
            </div>
          </section>

          <section className="article-section">
            <h2>功能演示</h2>
            <div className="demo-table">
              <table>
                <thead><tr><th>错误</th><th>修正</th><th>说明</th></tr></thead>
                <tbody>
                  <tr><td><del>go</del></td><td>went</td><td>过去时态</td></tr>
                  <tr><td><del>apple</del></td><td>apples</td><td>可数名词</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="article-section">
            <h2>技术架构</h2>
            <div className="tech-stack">
              <div className="tech-item"><h4>Frontend</h4><ul><li>Next.js 14</li><li>TailwindCSS</li><li>React</li></ul></div>
              <div className="tech-item"><h4>Backend</h4><ul><li>Next.js API</li><li>Qwen AI</li><li>MongoDB</li></ul></div>
              <div className="tech-item"><h4>Deploy</h4><ul><li>Docker</li><li>Aliyun ECS</li></ul></div>
            </div>
          </section>

          <section className="article-section">
            <h2>未来规划</h2>
            <div className="roadmap">
              <div className="roadmap-item"><h4>Short-term</h4><ul><li>语音输入</li><li>批量检查</li><li>历史记录</li></ul></div>
              <div className="roadmap-item"><h4>Long-term</h4><ul><li>用户系统</li><li>学习建议</li><li>浏览器插件</li></ul></div>
            </div>
          </section>

          <section className="article-section">
            <h2>总结</h2>
            <p>得益于 AI 辅助编程，从想法到上线仅用了 <strong>4 小时</strong>。</p>
          </section>

          <section className="cta-section">
            <h2>立即体验</h2>
            <p>让 AI 帮你检查英语语法</p>
            <Link href="/" className="cta-button">开始检查</Link>
          </section>

          <section className="article-footer">
            <p>2026.03.28</p>
            <p><a href="https://github.com/6nicks/mm-demo" target="_blank" rel="noopener noreferrer">GitHub</a></p>
          </section>
        </article>
      </main>

      <footer className="footer">Powered by AI · Built with Next.js</footer>
    </div>
  )
}