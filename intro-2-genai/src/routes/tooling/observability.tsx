import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Eye, Activity, Bug, Search, ListChecks, Zap } from 'lucide-react'

export const Route = createFileRoute('/tooling/observability')({ component: App })

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
            <Eye size={12} />
            Observability & Tracing
          </span>
        </div>

        <h1 className="display-title text-4xl sm:text-5xl font-bold mb-4 text-[var(--text-primary)] tracking-tight">
          Monitoring the
          <br />
          <span className="bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--accent-primary)] bg-clip-text text-transparent">
            Black Box
          </span>
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
          AI applications are non-deterministic. To build reliably, you need to see exactly what happened at every step of the chain.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-8">
          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-6">
              What is Tracing?
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              A trace records the full execution path of an AI request. In a complex RAG or agent workflow, a single user query might trigger multiple LLM calls, searches, and tool executions.
            </p>
            <div className="bg-[var(--bg-base)] rounded-xl p-5 border border-[var(--border)] font-mono text-[10px] space-y-2">
               <div className="flex justify-between border-b border-[var(--border)] pb-2 mb-2">
                 <span className="text-[var(--text-muted)] uppercase font-bold tracking-widest">Trace: "Summarize PDF"</span>
                 <span className="text-green-600 font-bold">2.4s</span>
               </div>
               <div className="flex items-center gap-3 pl-2">
                 <span className="text-blue-500 font-bold">● GET_CHUNKS</span>
                 <div className="h-1 flex-1 bg-blue-100 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-500 w-[30%]" />
                 </div>
                 <span className="text-[var(--text-muted)]">400ms</span>
               </div>
               <div className="flex items-center gap-3 pl-2">
                 <span className="text-purple-500 font-bold">● LLM_SUMMARIZE</span>
                 <div className="h-1 flex-1 bg-purple-100 rounded-full overflow-hidden">
                   <div className="h-full bg-purple-500 w-[60%]" />
                 </div>
                 <span className="text-[var(--text-muted)]">1.8s</span>
               </div>
               <div className="flex items-center gap-3 pl-2">
                 <span className="text-amber-500 font-bold">● FORMAT_OUTPUT</span>
                 <div className="h-1 flex-1 bg-amber-100 rounded-full overflow-hidden">
                   <div className="h-full bg-amber-500 w-[10%]" />
                 </div>
                 <span className="text-[var(--text-muted)]">200ms</span>
               </div>
            </div>
          </section>

          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-6">
              Core Observability Pillars
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: 'Tracing', desc: 'Step-by-step logs of every operation in your chain.', icon: Activity },
                { title: 'Evaluation (Evals)', desc: 'Scoring LLM outputs using other models or metrics.', icon: ListChecks },
                { title: 'Cost/Usage', desc: 'Tracking token spend per user or per request.', icon: Zap },
                { title: 'Debugging', desc: 'Replaying failed requests with different prompts.', icon: Bug },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-base)]">
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon size={18} className="text-[var(--accent-secondary)]" />
                    <h4 className="font-semibold text-sm text-[var(--text-primary)]">{item.title}</h4>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-4">
              Evaluation (LLM-as-a-Judge)
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              How do you know if your summary is "good"? You can't use unit tests. 
              Instead, you use **Evals**: a separate, powerful model (like GPT-4o) 
              that grades your application's output based on:
            </p>
            <div className="flex flex-wrap gap-2">
               <span className="status-badge status-badge-green">Faithfulness</span>
               <span className="status-badge status-badge-green">Relevance</span>
               <span className="status-badge status-badge-green">Tone</span>
               <span className="status-badge status-badge-green">Accuracy</span>
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="card p-5 sticky top-8">
            <h3 className="font-semibold text-[var(--text-primary)] mb-3 text-sm">
              Popular Platforms
            </h3>
            <div className="space-y-4 text-xs">
               <div className="p-3 rounded-lg bg-[var(--bg-base)] border border-[var(--border)]">
                 <p className="font-bold mb-1">LangSmith</p>
                 <p className="text-[var(--text-secondary)]">Deep integration with LangChain. Great for tracing complex agents.</p>
               </div>
               <div className="p-3 rounded-lg bg-[var(--bg-base)] border border-[var(--border)]">
                 <p className="font-bold mb-1">Arize Phoenix</p>
                 <p className="text-[var(--text-secondary)]">OSS, self-hostable. Excellent for RAG and embedding visualization.</p>
               </div>
               <div className="p-3 rounded-lg bg-[var(--bg-base)] border border-[var(--border)]">
                 <p className="font-bold mb-1">Weights & Biases</p>
                 <p className="text-[var(--text-secondary)]">The industry standard for ML experiments and model tracking.</p>
               </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
