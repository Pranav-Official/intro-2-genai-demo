import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Brain, Cpu, Zap, Sparkles } from 'lucide-react'

export const Route = createFileRoute('/foundations/basics')({ component: App })

function App() {
  return (
    <main className="page-wrap px-4 pb-12 pt-8">
      <Link
        to="/foundations"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to Foundations
      </Link>

      <section className="rise-in mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="topic-badge">
            <Brain size={12} />
            LLM Basics
          </span>
        </div>

        <h1 className="display-title text-4xl sm:text-5xl font-bold mb-4 text-[var(--text-primary)] tracking-tight">
          How the "Engine" 
          <br />
          <span className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
            Actually Works
          </span>
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
          LLMs aren't magic—they're incredibly powerful statistical engines. Let's look at the core mechanics.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-8">
          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Zap size={20} className="text-amber-500" />
              The Core Concept: Next-Token Prediction
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              At its simplest level, an LLM is a system that predicts the most likely next word (or token) in a sequence. It doesn't "know" facts; it knows the statistical patterns of how human language is structured.
            </p>
            
            <div className="bg-[var(--bg-base)] rounded-xl p-6 border border-[var(--border)] relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Sparkles size={48} />
               </div>
               <p className="text-sm font-medium mb-4 text-[var(--text-primary)]">The prediction process:</p>
               <div className="space-y-3 font-mono text-sm">
                 <div className="flex gap-2 items-center">
                   <span className="text-[var(--text-muted)] w-20">Input:</span>
                   <span className="bg-[var(--bg-surface)] px-2 py-1 rounded border border-[var(--border)]">The capital of France is</span>
                 </div>
                 <div className="flex gap-2 items-center">
                   <span className="text-[var(--text-muted)] w-20">Prediction:</span>
                   <div className="flex gap-1.5 flex-wrap">
                      <span className="status-badge status-badge-green">Paris (98.4%)</span>
                      <span className="status-badge status-badge-amber">Lyon (0.8%)</span>
                      <span className="status-badge status-badge-red">Nice (0.3%)</span>
                   </div>
                 </div>
               </div>
            </div>
          </section>

          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Cpu size={20} className="text-[var(--accent-primary)]" />
              The Architecture: Transformers
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Modern LLMs use the **Transformer** architecture. The breakthrough was a mechanism called **"Attention"**, which allows the model to look at every part of the input simultaneously and figure out which parts are most relevant to each other.
            </p>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 rounded-lg bg-[var(--bg-base)] border border-[var(--border)]">
                <h4 className="font-semibold text-sm mb-2 text-[var(--text-primary)]">Embeddings</h4>
                <p className="text-xs text-[var(--text-secondary)]">Words are converted into high-dimensional vectors (lists of numbers) that represent their meaning.</p>
              </div>
              <div className="p-4 rounded-lg bg-[var(--bg-base)] border border-[var(--border)]">
                <h4 className="font-semibold text-sm mb-2 text-[var(--text-primary)]">Self-Attention</h4>
                <p className="text-xs text-[var(--text-secondary)]">The model "attends" to different parts of the context to understand relationships (e.g., matching pronouns to nouns).</p>
              </div>
            </div>
          </section>

          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-4">
              Why Does This Matter for Devs?
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Understanding that the model is predicting tokens helps explain many common behaviors:
            </p>
            <ul className="space-y-4">
              {[
                {
                  title: 'Hallucination',
                  desc: 'Sometimes the "most statistically likely" next token is factually incorrect.',
                },
                {
                  title: 'Context Limits',
                  desc: 'The attention mechanism has a finite "window" of how much it can look at once.',
                },
                {
                  title: 'Reasoning',
                  desc: 'Models don\'t reason by logic, but by mimicking the language of logical reasoning.',
                },
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] flex items-center justify-center font-bold text-xs flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h5 className="font-semibold text-[var(--text-primary)] text-sm mb-1">{item.title}</h5>
                    <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="card p-5 sticky top-8">
            <h3 className="font-semibold text-[var(--text-primary)] mb-3 text-sm flex items-center gap-2">
              <Sparkles size={14} className="text-amber-500" />
              Quick Summary
            </h3>
            <ul className="space-y-3 text-xs text-[var(--text-secondary)]">
              <li className="flex gap-2">
                <span className="text-[var(--accent-primary)] font-bold">01</span>
                Input text is split into tokens.
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--accent-primary)] font-bold">02</span>
                Tokens are embedded into numeric vectors.
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--accent-primary)] font-bold">03</span>
                Self-attention computes context.
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--accent-primary)] font-bold">04</span>
                A probability map for the next token is generated.
              </li>
            </ul>
          </div>

          <div className="callout callout-blue">
            <p className="text-xs">
              <strong>Key insight:</strong> LLMs are autoregressive, meaning each predicted token becomes part of the input for the next prediction cycle.
            </p>
          </div>
        </aside>
      </div>
    </main>
  )
}
