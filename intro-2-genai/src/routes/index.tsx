import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Brain, Cpu, Zap, Code, Sparkles } from 'lucide-react'

export const Route = createFileRoute('/')({ component: App })

const sessions = [
  {
    id: 'foundations',
    title: 'The Probabilistic Engine',
    time: '9:00 AM - 10:30 AM',
    description:
      'Understand the engine that powers GenAI. Tokens, constraints, non-determinism, and prompt engineering fundamentals.',
    icon: Brain,
    href: '/foundations',
    color: 'violet',
  },
  {
    id: 'patterns',
    title: 'AI Engineering Patterns',
    time: '10:45 AM - 12:15 PM',
    description:
      'Practical patterns for building AI-powered applications. RAG, agents, and tool use.',
    icon: Zap,
    href: '/patterns',
    color: 'cyan',
  },
  {
    id: 'tools',
    title: 'Tooling & Infrastructure',
    time: '1:30 PM - 3:00 PM',
    description:
      'LLM observability, evaluation frameworks, and deployment strategies for production systems.',
    icon: Cpu,
    href: '#',
    color: 'violet',
  },
  {
    id: 'hands-on',
    title: 'Hands-on Workshop',
    time: '3:15 PM - 5:00 PM',
    description:
      'Build a real AI-powered feature. Apply everything learned in a guided coding session.',
    icon: Code,
    href: '#',
    color: 'cyan',
  },
]

const colorMap: Record<
  string,
  { bg: string; text: string; border: string; iconBg: string }
> = {
  violet: {
    bg: 'rgba(124, 58, 237, 0.08)',
    text: '#7C3AED',
    border: 'rgba(124, 58, 237, 0.2)',
    iconBg: 'rgba(124, 58, 237, 0.15)',
  },
  cyan: {
    bg: 'rgba(8, 145, 178, 0.08)',
    text: '#0891B2',
    border: 'rgba(8, 145, 178, 0.2)',
    iconBg: 'rgba(8, 145, 178, 0.15)',
  },
}

function App() {
  return (
    <main className="page-wrap px-4 pb-12 pt-8">
      <section className="rise-in mb-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="topic-badge">
            <Sparkles size={12} />
            Workshop
          </span>
        </div>

        <h1 className="display-title text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-[var(--text-primary)] tracking-tight leading-[1.1]">
          GenAI for
          <br />
          <span className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
            Software Engineering
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mb-6 leading-relaxed">
          A practical introduction to building AI-powered applications. From
          understanding how LLMs work to deploying production-ready features.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link to="/foundations" className="btn-primary">
            Start Learning
            <ArrowRight size={16} />
          </Link>
          <a href="#schedule" className="btn-secondary">
            View Schedule
          </a>
        </div>
      </section>

      <section id="schedule">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title text-2xl font-semibold text-[var(--text-primary)]">
            Workshop Sessions
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {sessions.map((session, index) => {
            const colors = colorMap[session.color]
            const Icon = session.icon

            return (
              <Link
                key={session.id}
                to={session.href}
                disabled={session.href === '#'}
                className={`card rise-in stagger-${index + 1} block p-6 ${session.href === '#' ? 'pointer-events-none opacity-60' : ''}`}
                style={{
                  animationDelay: `${index * 80 + 100}ms`,
                  borderColor: colors.border,
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: colors.iconBg }}
                  >
                    <Icon size={22} style={{ color: colors.text }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="time-badge">{session.time}</span>
                    </div>
                    <h3 className="font-semibold text-lg text-[var(--text-primary)] mb-2">
                      {session.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {session.description}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section
        className="mt-12 card p-6 sm:p-8 rise-in"
        style={{ animationDelay: '500ms' }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <h3 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-2">
              Prerequisites
            </h3>
            <p className="text-[var(--text-secondary)]">
              Basic familiarity with JavaScript/TypeScript. No ML experience
              required.
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="flex gap-2">
              <span className="topic-badge">TypeScript</span>
              <span className="topic-badge">Node.js</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
