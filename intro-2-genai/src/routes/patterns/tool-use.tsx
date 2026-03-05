import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Wrench, Code, Zap, Activity } from 'lucide-react'

export const Route = createFileRoute('/patterns/tool-use')({ component: App })

function App() {
  return (
    <main className="page-wrap px-4 pb-12 pt-8">
      <Link
        to="/patterns"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to Patterns
      </Link>

      <section className="rise-in mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="topic-badge" style={{ backgroundColor: 'rgba(8, 145, 178, 0.12)', color: 'var(--accent-secondary)' }}>
            <Wrench size={12} />
            Tool Use & Function Calling
          </span>
        </div>

        <h1 className="display-title text-4xl sm:text-5xl font-bold mb-4 text-[var(--text-primary)] tracking-tight">
          From Chat to
          <br />
          <span className="bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--accent-primary)] bg-clip-text text-transparent">
            Action & Execution
          </span>
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
          Tool use allows LLMs to interact with the real world—executing code, calling APIs, and querying live databases.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-8">
          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Zap size={20} className="text-amber-500" />
              What is Function Calling?
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              It is a structured way to describe your application's functions to the model. 
              The model doesn't *run* the function; instead, it outputs the **arguments** 
              needed to call the function in your code.
            </p>

            <div className="bg-[var(--bg-base)] rounded-xl p-5 border border-[var(--border)] font-mono text-xs">
              <p className="text-[var(--text-muted)] mb-2 uppercase tracking-widest font-bold">Model Definition</p>
              <pre className="text-blue-600 dark:text-blue-400">
{`{
  name: "get_weather",
  parameters: {
    location: "string",
    unit: "celsius" | "fahrenheit"
  }
}`}
              </pre>
              <div className="my-4 border-t border-[var(--border)] opacity-50" />
              <p className="text-[var(--text-muted)] mb-2 uppercase tracking-widest font-bold">Model Output</p>
              <pre className="text-green-600 dark:text-green-400">
{`tool_calls: [{
  function: "get_weather",
  arguments: { location: "Paris", unit: "celsius" }
}]`}
              </pre>
            </div>
          </section>

          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-4">
              Common Use Cases
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: 'API Integration', desc: 'Call external services like Stripe, GitHub, or Slack.', icon: Activity },
                { title: 'Data Extraction', desc: 'Convert messy user input into structured JSON objects.', icon: Code },
                { title: 'Database Queries', desc: 'Allow the model to generate and run safe SQL queries.', icon: Zap },
                { title: 'Calculations', desc: 'Let the model use a calculator instead of doing "vibes-based" math.', icon: Wrench },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-base)]">
                  <item.icon size={18} className="text-[var(--accent-secondary)] flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm mb-1 text-[var(--text-primary)]">{item.title}</h4>
                    <p className="text-xs text-[var(--text-secondary)]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-4">
              Safety & Security
            </h2>
            <div className="callout callout-amber">
               <p className="text-sm">
                 <strong>Critical Warning:</strong> Never give an LLM direct, unmitigated access to destructive functions (like `rm -rf` or `delete_user`). Always use a "human-in-the-loop" pattern for sensitive actions.
               </p>
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="card p-5 sticky top-8">
            <h3 className="font-semibold text-[var(--text-primary)] mb-3 text-sm">
              The Loop
            </h3>
            <ol className="space-y-4 text-xs text-[var(--text-secondary)]">
              <li className="flex gap-2">
                <span className="font-bold text-[var(--accent-secondary)]">1.</span>
                App sends user query + tool definitions.
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-[var(--accent-secondary)]">2.</span>
                Model decides to call a tool and returns JSON.
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-[var(--accent-secondary)]">3.</span>
                App executes the tool and gets a result.
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-[var(--accent-secondary)]">4.</span>
                App sends result back to the Model.
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-[var(--accent-secondary)]">5.</span>
                Model provides a final answer to the user.
              </li>
            </ol>
          </div>
        </aside>
      </div>
    </main>
  )
}
