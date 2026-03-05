import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Zap, Rocket, Workflow, Layers, MousePointer2, Bot } from 'lucide-react'

export const Route = createFileRoute('/tooling/no-code')({ component: App })

function App() {
  return (
    <main className="page-wrap px-4 pb-12 pt-8">
      <Link
        to="/tooling"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to Tooling
      </Link>

      <section className="rise-in mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="topic-badge">
            <Zap size={12} />
            No-Code & Automation
          </span>
        </div>

        <h1 className="display-title text-4xl sm:text-5xl font-bold mb-4 text-[var(--text-primary)] tracking-tight">
          Rapid Prototyping
          <br />
          <span className="bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--accent-primary)] bg-clip-text text-transparent">
            with No-Code AI
          </span>
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
          Don't build everything from scratch. Use no-code platforms to test AI logic, 
          automate workflows, and connect models to 5,000+ apps in minutes.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-8">
          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-6">
              Why Start with No-Code?
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: 'Speed', desc: 'Go from idea to functional AI workflow in 30 minutes, not 3 days.', icon: Rocket },
                { title: 'Connectivity', desc: 'Instantly connect LLMs to Slack, Discord, Google Sheets, and CRM tools.', icon: Workflow },
                { title: 'Testing Logic', desc: 'Verify your RAG or Agent logic before committing to a code-heavy backend.', icon: Layers },
                { title: 'Accessibility', desc: 'Enable non-engineers to contribute to AI internal tools and automations.', icon: MousePointer2 },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-base)]">
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon size={18} className="text-[var(--accent-primary)]" />
                    <h4 className="font-semibold text-sm text-[var(--text-primary)]">{item.title}</h4>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-6">
              The Professional No-Code Stack
            </h2>
            <div className="space-y-6">
               <div className="flex gap-4 items-start p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-base)]">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0 text-orange-600">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-[var(--text-primary)] mb-1">n8n (The Developer's Choice)</h4>
                    <p className="text-sm text-[var(--text-secondary)] mb-2">Fair-code, self-hostable, and supports JavaScript snippets. Its AI nodes make building RAG chains incredibly simple.</p>
                    <div className="flex gap-2">
                       <span className="status-badge status-badge-green text-[10px]">Self-Hostable</span>
                       <span className="status-badge status-badge-green text-[10px]">AI-Native Nodes</span>
                    </div>
                  </div>
               </div>

               <div className="flex gap-4 items-start p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-base)]">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                    <Bot size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-[var(--text-primary)] mb-1">Zapier (The App Connector)</h4>
                    <p className="text-sm text-[var(--text-secondary)] mb-2">The largest integration ecosystem. Best for connecting AI to legacy enterprise software and web apps.</p>
                    <div className="flex gap-2">
                       <span className="status-badge status-badge-amber text-[10px]">5,000+ Apps</span>
                       <span className="status-badge status-badge-amber text-[10px]">Enterprise-Ready</span>
                    </div>
                  </div>
               </div>

               <div className="flex gap-4 items-start p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-base)]">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0 text-purple-600">
                    <Layers size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-[var(--text-primary)] mb-1">Make.com (Visual Complexity)</h4>
                    <p className="text-sm text-[var(--text-secondary)] mb-2">Highly visual workflow builder. Great for multi-step branches and complex data transformation logic.</p>
                    <div className="flex gap-2">
                       <span className="status-badge status-badge-red text-[10px]">Visual Logic</span>
                       <span className="status-badge status-badge-red text-[10px]">Deep Customization</span>
                    </div>
                  </div>
               </div>
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="card p-5 sticky top-8">
            <h3 className="font-semibold text-[var(--text-primary)] mb-3 text-sm">
              Use Case: Support Bot
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mb-4">
              How a typical n8n AI workflow looks:
            </p>
            <ol className="space-y-3 text-xs text-[var(--text-secondary)]">
              <li className="flex gap-2">
                <span className="font-bold text-[var(--accent-primary)]">1.</span>
                Trigger: New Email Recv.
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-[var(--accent-primary)]">2.</span>
                Retrieval: Search Vector DB.
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-[var(--accent-primary)]">3.</span>
                AI Agent: Draft Response.
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-[var(--accent-primary)]">4.</span>
                Tool: Slack Notify Team.
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-[var(--accent-primary)]">5.</span>
                Action: Send Reply.
              </li>
            </ol>
          </div>
        </aside>
      </div>
    </main>
  )
}
