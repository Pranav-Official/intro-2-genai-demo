import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Zap, Search, Wrench, Bot, Repeat } from 'lucide-react'

export const Route = createFileRoute('/patterns/')({ component: App })

const topics = [
  {
    id: 'rag',
    title: 'RAG (Retrieval-Augmented Generation)',
    description:
      'Giving LLMs a memory. How to connect your private data to a model using vector databases.',
    icon: Search,
    href: '/patterns/rag',
  },
  {
    id: 'tool-use',
    title: 'Tool Use & Function Calling',
    description:
      'Moving from chat to action. How to let LLMs execute code, call APIs, and query databases.',
    icon: Wrench,
    href: '/patterns/tool-use',
  },
  {
    id: 'agents',
    title: 'Agentic Workflows',
    description:
      'Autonomous agents, ReAct pattern, and multi-agent systems. Orchestrating complex tasks.',
    icon: Bot,
    href: '/patterns/agents',
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
            <Zap size={12} />
            10:45 AM - 12:15 PM
          </span>
        </div>

        <h1 className="display-title text-4xl sm:text-5xl font-bold mb-4 text-[var(--text-primary)] tracking-tight leading-[1.1]">
          AI Engineering
          <br />
          <span className="bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--accent-primary)] bg-clip-text text-transparent">
            Patterns & Workflows
          </span>
        </h1>

        <p className="text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          Move beyond simple chat prompts. This session covers the architectural patterns 
          used to build reliable, production-ready AI applications.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-4">
          Core Patterns
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
                  style={{ backgroundColor: 'rgba(8, 145, 178, 0.12)' }}
                >
                  <Icon size={20} style={{ color: 'var(--accent-secondary)' }} />
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
            style={{ backgroundColor: 'rgba(124, 58, 237, 0.12)' }}
          >
            <Repeat size={24} style={{ color: 'var(--accent-primary)' }} />
          </div>

          <div>
            <h3 className="section-title text-lg font-semibold text-[var(--text-primary)] mb-2">
              From Linear to Loop
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Modern AI engineering is moving from linear request-response cycles 
              to iterative loops where the model can observe its own output, 
              use tools, and refine its strategy to solve complex goals.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
