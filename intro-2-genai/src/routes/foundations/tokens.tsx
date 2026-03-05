import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Clock, AlertTriangle, DollarSign, Sparkles } from 'lucide-react'

export const Route = createFileRoute('/foundations/tokens')({ component: App })

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
            <Clock size={12} />
            Tokens & Constraints
          </span>
        </div>

        <h1 className="display-title text-4xl sm:text-5xl font-bold mb-4 text-[var(--text-primary)] tracking-tight">
          Why Context Windows
          <br />
          <span className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
            Matter for Large Repos
          </span>
        </h1>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-8">
          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-4">
              What Are Tokens?
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Tokens are the basic units that LLMs process. They're not exactly
              words— a token is typically about 4 characters of text, or roughly
              ¾ of a word. This has major implications for both capability and
              cost.
            </p>
            <div className="bg-[var(--bg-base)] rounded-lg p-4 border border-[var(--border)]">
              <p className="text-sm text-[var(--text-muted)] mb-2">
                Example: "The quick brown fox" →
              </p>
              <code className="text-xs">
                ["The", "▁quick", "▁brown", "▁fox"]
              </code>
            </div>
          </section>

          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-4">
              Context Window Limitations
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              The context window is the total amount of text (input + output)
              the model can handle at once. Current models range from 8K to
              200K+ tokens, but there are practical constraints:
            </p>
            <ul className="space-y-3 mt-4">
              {[
                'Longer contexts = higher latency and cost',
                'Performance degrades with very long contexts (lost in the middle)',
                'Different models have different context limits',
                'Code files can consume tokens quickly',
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-[var(--text-secondary)]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-4">
              Token Economics
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Understanding token pricing helps optimize costs. Most providers
              charge separately for input and output tokens:
            </p>

            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              <div className="bg-[var(--bg-base)] rounded-lg p-4 border border-[var(--border)]">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign
                    size={16}
                    className="text-[var(--accent-primary)]"
                  />
                  <span className="font-semibold text-[var(--text-primary)]">
                    Input Tokens
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  Your prompt + context + code files. Usually cheaper than
                  output.
                </p>
              </div>
              <div className="bg-[var(--bg-base)] rounded-lg p-4 border border-[var(--border)]">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign
                    size={16}
                    className="text-[var(--accent-secondary)]"
                  />
                  <span className="font-semibold text-[var(--text-primary)]">
                    Output Tokens
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  The model's response. More expensive as it requires more
                  computation.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-base font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                <Sparkles size={16} className="text-[var(--accent-primary)]" />
                Model Pricing Landscape (USD per 1M Tokens)
              </h3>
              <div className="flex items-end justify-between gap-1.5 sm:gap-3 h-64 px-2">
                {[
                  { name: 'gpt-oss-120B', price: 0.3 },
                  { name: 'DeepSeek V3.2', price: 0.3 },
                  { name: 'Gemini 3 Flash', price: 1.1 },
                  { name: 'GLM-5', price: 1.6 },
                  { name: 'Nova 2.0 Pro', price: 3.4 },
                  { name: 'Gemini 3.1 Pro', price: 4.5 },
                  { name: 'GPT-5.3 Codex', price: 4.8 },
                  { name: 'Claude Sonnet', price: 6.0 },
                  { name: 'Grok 4', price: 6.0 },
                  { name: 'Claude Opus', price: 10.0 },
                ].map((model) => (
                  <div
                    key={model.name}
                    className="flex-1 flex flex-col items-center group h-full"
                  >
                    <div className="relative w-full h-full flex flex-col justify-end bg-[var(--bg-base)] rounded-t-md overflow-visible border-x border-t border-[var(--border)]">
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ${model.price.toFixed(1)}
                      </div>
                      <div
                        className="w-full bg-gradient-to-t from-[var(--accent-primary)] to-[var(--accent-secondary)] transition-all duration-700 ease-out rounded-t-[2px]"
                        style={{ height: `${(model.price / 10) * 100}%` }}
                      />
                    </div>
                    <div className="mt-3 w-full">
                      <p className="text-[9px] sm:text-[10px] leading-tight text-center text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors line-clamp-2 h-6 overflow-hidden">
                        {model.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs text-[var(--text-muted)] italic text-center">
                Note: Prices represent blended rates. Lower is better for
                scaling. Hover to see exact USD.
              </p>
            </div>

            <div className="callout callout-amber">
              <div className="flex items-start gap-2">
                <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
                <p>
                  <strong>Pro tip:</strong> A 100K token context window sounds
                  large, but a medium-sized monorepo can exceed this quickly.
                  Strategic context management is essential.
                </p>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="card p-5 sticky top-8">
            <h3 className="font-semibold text-[var(--text-primary)] mb-3">
              Quick Reference
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)]">1 token ≈</span>
                <code className="text-xs">4 chars / 0.75 words</code>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)]">
                  1K tokens ≈
                </span>
                <code className="text-xs">~750 words</code>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)]">
                  GPT-4 context
                </span>
                <code className="text-xs">128K tokens</code>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)]">
                  Claude context
                </span>
                <code className="text-xs">200K tokens</code>
              </li>
            </ul>
          </div>

          <div className="card p-5">
            <h3 className="font-semibold text-[var(--text-primary)] mb-3">
              Best Practices
            </h3>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li>• Keep prompts concise</li>
              <li>• Use relevant context only</li>
              <li>• Consider chunking large files</li>
              <li>• Monitor token usage</li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  )
}
