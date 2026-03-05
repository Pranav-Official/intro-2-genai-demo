import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, Shuffle, CheckCircle } from 'lucide-react'

export const Route = createFileRoute('/foundations/nondet')({ component: App })

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
            <Shuffle size={12} />
            Non-Deterministic Nature
          </span>
        </div>

        <h1 className="display-title text-4xl sm:text-5xl font-bold mb-4 text-[var(--text-primary)] tracking-tight">
          Strategies for Handling
          <br />
          <span className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
            Variability in LLM Output
          </span>
        </h1>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-8">
          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-4">
              Why LLMs Are Non-Deterministic
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Unlike traditional software where the same input always produces
              the same output, LLMs use probability distributions over tokens.
              This means:
            </p>
            <ul className="space-y-3 mt-4">
              {[
                'Same prompt can yield different responses',
                'Temperature and top-p sampling add randomness',
                'Position of information in context can affect output',
                'Minor prompt variations can cause major output changes',
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
              Key Concept: Temperature
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Temperature controls how "creative" vs "focused" the model is:
            </p>

            <div className="space-y-3 mt-4">
              <div className="bg-[var(--bg-base)] rounded-lg p-4 border border-[var(--border)]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-sm font-semibold text-[var(--accent-primary)]">
                    Temperature = 0
                  </span>
                  <span className="status-badge status-badge-green">
                    Deterministic
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  Greedy decoding. Same prompt → same output. Best for code,
                  math, factual tasks.
                </p>
              </div>

              <div className="bg-[var(--bg-base)] rounded-lg p-4 border border-[var(--border)]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-sm font-semibold text-[var(--accent-primary)]">
                    Temperature = 0.7
                  </span>
                  <span className="status-badge status-badge-amber">
                    Balanced
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  Good balance of creativity and coherence. Good for general
                  conversation.
                </p>
              </div>

              <div className="bg-[var(--bg-base)] rounded-lg p-4 border border-[var(--border)]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-sm font-semibold text-[var(--accent-primary)]">
                    Temperature = 1.0+
                  </span>
                  <span className="status-badge status-badge-red">
                    Creative
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  High randomness. Can produce unexpected (sometimes incoherent)
                  results.
                </p>
              </div>
            </div>
          </section>

          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-4">
              Strategies for Reproducibility
            </h2>

            <div className="space-y-4 mt-4">
              <div className="flex gap-3">
                <CheckCircle
                  size={20}
                  className="text-green-500 flex-shrink-0 mt-0.5"
                />
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">
                    Use Temperature = 0
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    For code generation, set temperature to 0 for consistent,
                    reproducible outputs.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle
                  size={20}
                  className="text-green-500 flex-shrink-0 mt-0.5"
                />
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">
                    Fix Random Seeds
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Some APIs allow setting a seed for reproducibility across
                    requests.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle
                  size={20}
                  className="text-green-500 flex-shrink-0 mt-0.5"
                />
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">
                    Output Validation
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Parse and validate outputs. Check for valid JSON, types,
                    expected structure.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle
                  size={20}
                  className="text-green-500 flex-shrink-0 mt-0.5"
                />
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">
                    Retry with Backoff
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Implement retry logic for failed generations with
                    exponential backoff.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-4">
              Code Example: Reproducible Code Generation
            </h2>
            <pre className="text-sm overflow-x-auto">
              {`// Set temperature to 0 for reproducible code
const response = await openai.chat.completions.create({
  model: "gpt-4",
  temperature: 0,  // Critical for reproducibility
  
  // Add structure to guide consistent output
  messages: [
    {
      role: "system", 
      content: "You generate TypeScript. Always use explicit types."
    },
    { 
      role: "user", 
      content: "Write a function to parse JSON" 
    }
  ]
});

// Validate the output
const code = response.choices[0].message.content;
if (!isValidTypeScript(code)) {
 Retry with better prompt  //
}`}
            </pre>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="card p-5 sticky top-8">
            <h3 className="font-semibold text-[var(--text-primary)] mb-3">
              When to Use What?
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="status-badge status-badge-green font-mono min-w-[60px]">
                  0
                </span>
                <span className="text-[var(--text-secondary)]">
                  Code, math, deterministic tasks
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="status-badge status-badge-amber font-mono min-w-[60px]">
                  0.1-0.3
                </span>
                <span className="text-[var(--text-secondary)]">
                  Classification, extraction
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="status-badge status-badge-amber font-mono min-w-[60px]">
                  0.5-0.7
                </span>
                <span className="text-[var(--text-secondary)]">
                  General writing, summarization
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="status-badge status-badge-red font-mono min-w-[60px]">
                  0.8-1.0
                </span>
                <span className="text-[var(--text-secondary)]">
                  Creative writing, brainstorming
                </span>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-semibold text-[var(--text-primary)] mb-3">
              Pro Tips
            </h3>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li>• Run code generation 3-5 times and pick best</li>
              <li>• Log prompts alongside outputs for debugging</li>
              <li>• Use system prompts to constrain format</li>
              <li>• Consider fine-tuning for consistent style</li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  )
}
