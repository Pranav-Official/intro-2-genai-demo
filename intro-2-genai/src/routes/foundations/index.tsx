import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Brain, Clock, Shuffle, Lightbulb } from 'lucide-react'

export const Route = createFileRoute('/foundations/')({ component: App })

const topics = [
  {
    id: 'basics',
    title: 'LLM Basics',
    description:
      'How the "engine" actually works under the hood. Next-token prediction and the transformer architecture.',
    icon: Brain,
    href: '/foundations/basics',
  },
  {
    id: 'tokens',
    title: 'Tokens & Constraints',
    description:
      'Why context windows matter for large repos and how tokens affect cost and latency.',
    icon: Clock,
    href: '/foundations/tokens',
  },
  {
    id: 'nondet',
    title: 'Non-Deterministic Nature',
    description:
      "Strategies for handling LLMs that don't always give the same answer twice.",
    icon: Shuffle,
    href: '/foundations/nondet',
  },
  {
    id: 'prompting',
    title: 'Prompt Engineering for Devs',
    description:
      'Mastering Chain-of-Thought and Few-Shot prompting to get high-quality TypeScript and SQL.',
    icon: Lightbulb,
    href: '/foundations/prompting',
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
          <span className="time-badge">
            <Clock size={12} />
            9:00 AM - 10:30 AM
          </span>
        </div>

        <h1 className="display-title text-4xl sm:text-5xl font-bold mb-4 text-[var(--text-primary)] tracking-tight leading-[1.1]">
          Foundations – The
          <br />
          <span className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
            Probabilistic Engine
          </span>
        </h1>

        <p className="text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          Before we build, we need to understand why the "engine" sometimes
          stalls. This session covers the fundamental concepts that every
          software engineer needs to know about LLMs.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-4">
          Topics Covered
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
            <Brain size={24} style={{ color: 'var(--accent-secondary)' }} />
          </div>

          <div>
            <h3 className="section-title text-lg font-semibold text-[var(--text-primary)] mb-2">
              Why This Matters
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Understanding these fundamentals will help you debug issues,
              optimize costs, and build more reliable AI-powered features.
              You'll learn why "it works sometimes" happens and how to make it
              work consistently.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
