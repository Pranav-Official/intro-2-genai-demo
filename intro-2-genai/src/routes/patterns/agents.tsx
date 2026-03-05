import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Bot, Repeat, Cpu, Zap, Target } from 'lucide-react'

export const Route = createFileRoute('/patterns/agents')({ component: App })

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
          <span className="topic-badge" style={{ backgroundColor: 'rgba(124, 58, 237, 0.12)', color: 'var(--accent-primary)' }}>
            <Bot size={12} />
            Agentic Workflows
          </span>
        </div>

        <h1 className="display-title text-4xl sm:text-5xl font-bold mb-4 text-[var(--text-primary)] tracking-tight">
          Autonomous Agents &
          <br />
          <span className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
            Reasoning Loops
          </span>
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
          Agents are systems where the LLM is given a goal and autonomy to determine the steps needed to achieve it.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-8">
          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Cpu size={20} className="text-[var(--accent-primary)]" />
              What Makes an Agent?
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              An agent isn't just a prompt. It's a loop that combines **Reasoning**, **Planning**, and **Action**.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { title: 'Perception', desc: 'Understanding the current state and the user goal.', icon: Target },
                { title: 'Brain', desc: 'The LLM deciding what to do next based on history.', icon: Cpu },
                { title: 'Tools', desc: 'The ability to interact with the world to get info.', icon: Zap },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-base)] text-center">
                  <div className="mx-auto w-10 h-10 rounded-full bg-[var(--bg-surface)] flex items-center justify-center mb-3 shadow-sm border border-[var(--border)]">
                    <item.icon size={18} className="text-[var(--accent-primary)]" />
                  </div>
                  <h4 className="font-semibold text-xs mb-1 text-[var(--text-primary)]">{item.title}</h4>
                  <p className="text-[10px] text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <Repeat size={20} className="text-[var(--accent-secondary)]" />
              The ReAct Pattern
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              **ReAct** (Reason + Act) is the most fundamental agent pattern. It forces the model to document its thinking before taking an action.
            </p>
            <div className="bg-[var(--bg-base)] rounded-xl p-5 border border-[var(--border)] space-y-3 font-mono text-xs">
               <div className="flex gap-2">
                 <span className="text-purple-600 font-bold">Thought:</span>
                 <span className="text-[var(--text-secondary)]">I need to find the CEO of Acme Corp and then find their email. I'll start by searching for the CEO.</span>
               </div>
               <div className="flex gap-2 border-l-2 border-amber-400 pl-3 ml-1">
                 <span className="text-amber-600 font-bold">Action:</span>
                 <span className="text-[var(--text-primary)]">google_search("Acme Corp CEO")</span>
               </div>
               <div className="flex gap-2 border-l-2 border-blue-400 pl-3 ml-1">
                 <span className="text-blue-600 font-bold">Observation:</span>
                 <span className="text-[var(--text-secondary)]">The CEO is Jane Doe.</span>
               </div>
               <div className="flex gap-2">
                 <span className="text-purple-600 font-bold">Thought:</span>
                 <span className="text-[var(--text-secondary)]">Now that I have the name, I will search for Jane Doe's email at Acme Corp.</span>
               </div>
            </div>
          </section>

          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-4">
              Autonomous vs. Directed
            </h2>
            <div className="space-y-4">
               <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-base)]">
                 <h4 className="font-semibold text-sm mb-1 text-[var(--text-primary)]">Autonomous Agents</h4>
                 <p className="text-xs text-[var(--text-secondary)]">Example: OpenClaw, AutoGPT, NanoBot. You give a goal ("Build a website"), and it loops indefinitely trying to fulfill it. High variance, high risk, high potential.</p>
               </div>
               <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-base)]">
                 <h4 className="font-semibold text-sm mb-1 text-[var(--text-primary)]">Directed (Stateful) Agents</h4>
                 <p className="text-xs text-[var(--text-secondary)]">Example: LangGraph. You define a state machine or graph. The agent moves between nodes (Reasoning, Coding, Testing). Much more reliable for production.</p>
               </div>
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="card p-5 sticky top-8">
            <h3 className="font-semibold text-[var(--text-primary)] mb-3 text-sm">
              The Agent Trap
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mb-3">
              Agents are prone to "infinite loops" where they keep trying the same failing action. 
            </p>
            <div className="space-y-2">
               <div className="status-badge status-badge-red w-full justify-start text-[10px] py-2 px-3">
                 <span>Always set a <strong>max_iterations</strong> limit.</span>
               </div>
               <div className="status-badge status-badge-green w-full justify-start text-[10px] py-2 px-3">
                 <span>Use <strong>structured output</strong> for actions.</span>
               </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
