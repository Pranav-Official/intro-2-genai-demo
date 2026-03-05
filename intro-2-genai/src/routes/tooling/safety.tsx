import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ShieldCheck, Lock, EyeOff, Scale, AlertTriangle, FileCheck } from 'lucide-react'

export const Route = createFileRoute('/tooling/safety')({ component: App })

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
          <span className="topic-badge" style={{ backgroundColor: 'rgba(124, 58, 237, 0.12)', color: 'var(--accent-primary)' }}>
            <ShieldCheck size={12} />
            Safety, Compliance & Privacy
          </span>
        </div>

        <h1 className="display-title text-4xl sm:text-5xl font-bold mb-4 text-[var(--text-primary)] tracking-tight">
          Building 
          <br />
          <span className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
            Responsible AI
          </span>
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
          Deploying AI in production requires more than just performance. It requires trust, security, and legal compliance.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-8">
          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-6">
              The Three Pillars
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { title: 'Privacy', desc: 'Protecting user data and preventing PII leaks.', icon: Lock },
                { title: 'Safety', desc: 'Preventing harmful, biased, or toxic outputs.', icon: ShieldCheck },
                { title: 'Compliance', desc: 'Meeting regulatory standards like GDPR and SOC2.', icon: Scale },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-base)] text-center">
                  <div className="mx-auto w-10 h-10 rounded-full bg-[var(--bg-surface)] flex items-center justify-center mb-3 shadow-sm border border-[var(--border)]">
                    <item.icon size={18} className="text-[var(--accent-primary)]" />
                  </div>
                  <h4 className="font-semibold text-xs mb-1 text-[var(--text-primary)]">{item.title}</h4>
                  <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-6">
              PII Masking & Data Redaction
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Before sending data to a cloud LLM, you should identify and mask Personally Identifiable Information (PII) to ensure privacy.
            </p>
            <div className="bg-[var(--bg-base)] rounded-xl p-5 border border-[var(--border)] font-mono text-xs space-y-3">
               <div className="flex gap-2">
                 <span className="text-[var(--text-muted)] w-16">Input:</span>
                 <span className="text-[var(--text-primary)]">My email is john.doe@gmail.com and I live in London.</span>
               </div>
               <div className="flex gap-2 border-t border-[var(--border)] pt-2">
                 <span className="text-[var(--text-muted)] w-16">Masked:</span>
                 <span className="text-[var(--accent-secondary)]">My email is <span className="bg-amber-100 dark:bg-amber-900/40 px-1 rounded">[EMAIL_ADDRESS]</span> and I live in <span className="bg-amber-100 dark:bg-amber-900/40 px-1 rounded">[LOCATION]</span>.</span>
               </div>
            </div>
          </section>

          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-4">
              AI Guardrails
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Guardrails act as a firewall between your LLM and your users. They validate both the **Input** (prompt injection) and the **Output** (hallucination, structure).
            </p>
            <div className="space-y-3">
               <div className="flex items-start gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-base)]">
                 <div className="status-badge status-badge-red p-2 rounded-lg flex-shrink-0">
                   <AlertTriangle size={18} />
                 </div>
                 <div>
                   <h4 className="font-bold text-sm text-[var(--text-primary)] mb-1">Prompt Injection</h4>
                   <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Malicious users trying to override system instructions (e.g., "Ignore all previous instructions...").</p>
                 </div>
               </div>
               <div className="flex items-start gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-base)]">
                 <div className="status-badge status-badge-green p-2 rounded-lg flex-shrink-0">
                   <FileCheck size={18} />
                 </div>
                 <div>
                   <h4 className="font-bold text-sm text-[var(--text-primary)] mb-1">Output Validation</h4>
                   <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Ensuring the LLM returns valid JSON and doesn't reveal internal system prompts.</p>
                 </div>
               </div>
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="card p-5 sticky top-8">
            <h3 className="font-semibold text-[var(--text-primary)] mb-3 text-sm">
              Safety Tools
            </h3>
            <div className="space-y-4 text-xs">
               <div className="p-3 rounded-lg bg-[var(--bg-base)] border border-[var(--border)]">
                 <p className="font-bold mb-1">NeMo Guardrails</p>
                 <p className="text-[var(--text-secondary)]">NVIDIA's open-source toolkit for adding programmable guardrails to LLMs.</p>
               </div>
               <div className="p-3 rounded-lg bg-[var(--bg-base)] border border-[var(--border)]">
                 <p className="font-bold mb-1">Guardrails AI</p>
                 <p className="text-[var(--text-secondary)]">Python library for validating LLM outputs against a schema.</p>
               </div>
               <div className="p-3 rounded-lg bg-[var(--bg-base)] border border-[var(--border)]">
                 <p className="font-bold mb-1">Llama Guard</p>
                 <p className="text-[var(--text-secondary)]">A fine-tuned model specifically designed to detect unsafe content.</p>
               </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
