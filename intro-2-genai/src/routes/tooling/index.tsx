import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Cpu, Globe, Eye, ShieldCheck, Server, Zap } from 'lucide-react'

export const Route = createFileRoute('/tooling/')({ component: App })

const topics = [
  {
    id: 'providers',
    title: 'Model Providers & Deployment',
    description:
      'Cloud vs. Local. Understanding the trade-offs between OpenAI, Anthropic, and self-hosted models.',
    icon: Globe,
    href: '/tooling/providers',
  },
  {
    id: 'observability',
    title: 'Observability & Tracing',
    description:
      'Debug and monitor your AI. Using platforms like LangSmith and Arize Phoenix to track traces and evals.',
    icon: Eye,
    href: '/tooling/observability',
  },
  {
    id: 'safety',
    title: 'Safety, Compliance & Privacy',
    description:
      'Production-ready AI. Guardrails, PII masking, and ensuring your system is secure and compliant.',
    icon: ShieldCheck,
    href: '/tooling/safety',
  },
  {
    id: 'no-code',
    title: 'No-Code & Automation',
    description:
      'Rapid prototyping with tools like n8n and Zapier. Building complex AI workflows without writing code.',
    icon: Zap,
    href: '/tooling/no-code',
  },
]

function App() {
  return (
    <main className="page-wrap px-4 pb-12 pt-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to Workshop
      </Link>

      <section className="rise-in mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="time-badge" style={{ backgroundColor: 'rgba(124, 58, 237, 0.12)', color: 'var(--accent-primary)' }}>
            <Cpu size={12} />
            1:30 PM - 3:00 PM
          </span>
        </div>

        <h1 className="display-title text-4xl sm:text-5xl font-bold mb-4 text-[var(--text-primary)] tracking-tight leading-[1.1]">
          Tooling &
          <br />
          <span className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
            Infrastructure
          </span>
        </h1>

        <p className="text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          From prototype to production. This session covers the essential tools and platforms 
          needed to deploy, monitor, and secure your AI-powered applications.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-4">
          The AI Stack
        </h2>

        <div className="grid gap-4 sm:grid-cols-3">
          {topics.map((topic, index) => {
            const Icon = topic.icon

            return (
              <Link
                key={topic.id}
                to={topic.href}
                className={`card rise-in stagger-${index + 1} block p-5`}
                style={{ animationDelay: `${index * 80 + 100}ms` }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'rgba(124, 58, 237, 0.12)' }}
                >
                  <Icon size={20} style={{ color: 'var(--accent-primary)' }} />
                </div>

                <h3 className="font-semibold text-base text-[var(--text-primary)] mb-2">
                  {topic.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {topic.description}
                </p>
              </Link>
            )
          })}
        </div>
      </section>

      <section
        className="card p-6 sm:p-8 rise-in"
        style={{ animationDelay: '400ms' }}
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: 'rgba(8, 145, 178, 0.12)' }}
          >
            <Server size={24} style={{ color: 'var(--accent-secondary)' }} />
          </div>

          <div>
            <h3 className="section-title text-lg font-semibold text-[var(--text-primary)] mb-2">
              The "Boring" Part of AI
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Successful AI engineering isn't just about the prompt—it's about building a robust 
              infrastructure that can handle errors, trace failures, and scale securely. 
              This is where the "real" engineering happens.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
