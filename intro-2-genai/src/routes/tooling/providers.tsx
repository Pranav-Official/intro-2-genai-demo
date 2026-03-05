import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Globe, Cloud, Server, Database, Zap, Cpu } from 'lucide-react'

export const Route = createFileRoute('/tooling/providers')({ component: App })

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
            <Globe size={12} />
            Model Providers & Deployment
          </span>
        </div>

        <h1 className="display-title text-4xl sm:text-5xl font-bold mb-4 text-[var(--text-primary)] tracking-tight">
          Cloud APIs vs.
          <br />
          <span className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
            Self-Hosted OSS
          </span>
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
          Where your model lives determines its latency, privacy, and cost. Let's compare the main deployment strategies.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-8">
          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-6">
              Major Model Providers
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-base)]">
                <div className="flex items-center gap-2 mb-2">
                  <Cloud size={18} className="text-blue-500" />
                  <h4 className="font-bold text-sm text-[var(--text-primary)]">Proprietary (Closed)</h4>
                </div>
                <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                  <li><strong>OpenAI:</strong> GPT-4o, o1-preview</li>
                  <li><strong>Anthropic:</strong> Claude 3.5 Sonnet</li>
                  <li><strong>Google:</strong> Gemini 1.5 Pro/Flash</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-base)]">
                <div className="flex items-center gap-2 mb-2">
                  <Server size={18} className="text-purple-500" />
                  <h4 className="font-bold text-sm text-[var(--text-primary)]">Open Source (OSS)</h4>
                </div>
                <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                  <li><strong>Meta:</strong> Llama 3.1 / 3.2</li>
                  <li><strong>Mistral:</strong> Mistral Large / Pixtral</li>
                  <li><strong>DeepSeek:</strong> DeepSeek V2.5 / Coder</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-6">
              Deployment Platforms
            </h2>
            <div className="space-y-4">
               {[
                 { title: 'Serverless APIs', desc: 'Pay-per-token. Best for getting started and prototyping.', tools: ['OpenAI SDK', 'Groq', 'Together AI'], icon: Zap },
                 { title: 'Managed Inference', desc: 'Deploy OSS models on dedicated hardware.', tools: ['Azure AI Studio', 'AWS Bedrock', 'Vertex AI'], icon: Database },
                 { title: 'Local / Self-Hosted', desc: 'Full control over privacy and hardware.', tools: ['Ollama', 'vLLM', 'LocalAI'], icon: Cpu },
               ].map((item, i) => (
                 <div key={i} className="flex gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-base)]">
                    <div className="w-10 h-10 rounded-lg bg-[var(--bg-surface)] flex items-center justify-center border border-[var(--border)] shadow-sm">
                      <item.icon size={20} className="text-[var(--accent-primary)]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[var(--text-primary)] mb-1">{item.title}</h4>
                      <p className="text-xs text-[var(--text-secondary)] mb-2">{item.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.tools.map(tool => (
                          <span key={tool} className="status-badge status-badge-green text-[9px] py-0.5 px-1.5">{tool}</span>
                        ))}
                      </div>
                    </div>
                 </div>
               ))}
            </div>
          </section>

          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-4">
              When to Host Your Own?
            </h2>
            <div className="callout callout-blue">
               <ul className="space-y-3">
                 <li className="text-sm flex gap-2">
                   <span className="text-[var(--accent-primary)] font-bold">Privacy:</span> 
                   Data never leaves your VPC. Essential for healthcare/finance.
                 </li>
                 <li className="text-sm flex gap-2">
                   <span className="text-[var(--accent-primary)] font-bold">Customization:</span> 
                   Ability to fine-tune on your specific codebase or domain.
                 </li>
                 <li className="text-sm flex gap-2">
                   <span className="text-[var(--accent-primary)] font-bold">Cost:</span> 
                   Cheaper at massive scale (100M+ tokens/day) compared to API rates.
                 </li>
               </ul>
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="card p-5 sticky top-8">
            <h3 className="font-semibold text-[var(--text-primary)] mb-3 text-sm">
              Selection Criteria
            </h3>
            <div className="space-y-4 text-xs">
               <div className="p-3 rounded-lg bg-[var(--bg-base)] border border-[var(--border)]">
                 <p className="font-bold mb-1">Low Latency</p>
                 <p className="text-[var(--text-secondary)]">Use <strong>Groq</strong> or <strong>Gemini Flash</strong>.</p>
               </div>
               <div className="p-3 rounded-lg bg-[var(--bg-base)] border border-[var(--border)]">
                 <p className="font-bold mb-1">Max Intelligence</p>
                 <p className="text-[var(--text-secondary)]">Use <strong>GPT-4o</strong> or <strong>Claude 3.5 Sonnet</strong>.</p>
               </div>
               <div className="p-3 rounded-lg bg-[var(--bg-base)] border border-[var(--border)]">
                 <p className="font-bold mb-1">Strict Privacy</p>
                 <p className="text-[var(--text-secondary)]">Use <strong>Ollama</strong> or <strong>vLLM</strong> on-prem.</p>
               </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
