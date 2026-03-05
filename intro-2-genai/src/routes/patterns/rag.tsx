import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Search, Database, FileText, Layers } from 'lucide-react'

export const Route = createFileRoute('/patterns/rag')({ component: App })

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
            <Search size={12} />
            Retrieval-Augmented Generation
          </span>
        </div>

        <h1 className="display-title text-4xl sm:text-5xl font-bold mb-4 text-[var(--text-primary)] tracking-tight">
          Giving LLMs
          <br />
          <span className="bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--accent-primary)] bg-clip-text text-transparent">
            a Long-Term Memory
          </span>
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
          RAG is the most popular pattern for connecting an LLM to your own private data without expensive fine-tuning.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-8">
          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-4">
              Why RAG?
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              LLMs have a knowledge cutoff and don't know about your private files, internal docs, or recent events. RAG solves this by:
            </p>
            <div className="grid gap-4 sm:grid-cols-2 mt-6">
              {[
                { title: 'Grounding', desc: 'Provides real facts to the model to reduce hallucinations.' },
                { title: 'Privacy', desc: 'Allows using internal data without sending it for training.' },
                { title: 'Freshness', desc: 'Connect to real-time data sources (wikis, slack, databases).' },
                { title: 'Cost', desc: 'Much cheaper than fine-tuning for large datasets.' },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-lg bg-[var(--bg-base)] border border-[var(--border)]">
                  <h4 className="font-semibold text-sm mb-1 text-[var(--text-primary)]">{item.title}</h4>
                  <p className="text-xs text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-6">
              The RAG Workflow
            </h2>
            <div className="space-y-6">
              {[
                { step: '1', title: 'Ingest', desc: 'Break docs into chunks and convert to numeric "embeddings".', icon: FileText },
                { step: '2', title: 'Retrieve', desc: 'Search a vector database for chunks relevant to the user\'s query.', icon: Database },
                { step: '3', title: 'Augment', desc: 'Add the retrieved text into the prompt as "context".', icon: Layers },
                { step: '4', title: 'Generate', desc: 'The LLM answers the query using the provided context.', icon: Search },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                   <div className="w-10 h-10 rounded-full bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] flex items-center justify-center font-bold flex-shrink-0 border border-[var(--accent-secondary)]/20">
                     {item.step}
                   </div>
                   <div>
                     <h4 className="font-semibold text-[var(--text-primary)] mb-1 flex items-center gap-2">
                       <item.icon size={16} />
                       {item.title}
                     </h4>
                     <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-4">
              Key Component: Vector Databases
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Traditional databases search by keywords. Vector databases search by **semantic meaning**. 
              This allows a search for "tropical fruit" to find a document about "mangoes" even if 
              the word "fruit" never appears.
            </p>
            <div className="callout callout-blue">
               <p className="text-sm">
                 <strong>Pro Tip:</strong> Chunking strategy is critical. If your chunks are too small, you lose context. If they're too large, you hit token limits and introduce noise.
               </p>
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="card p-5 sticky top-8">
            <h3 className="font-semibold text-[var(--text-primary)] mb-3 text-sm">
              RAG Tech Stack
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <p className="text-[var(--text-muted)] uppercase tracking-wider mb-2 font-bold">Orchestration</p>
                <div className="flex flex-wrap gap-2">
                  <span className="status-badge status-badge-green">LangChain</span>
                  <span className="status-badge status-badge-green">LlamaIndex</span>
                </div>
              </div>
              <div>
                <p className="text-[var(--text-muted)] uppercase tracking-wider mb-2 font-bold">Vector DBs</p>
                <div className="flex flex-wrap gap-2">
                  <span className="status-badge status-badge-amber">Pinecone</span>
                  <span className="status-badge status-badge-amber">Milvus</span>
                  <span className="status-badge status-badge-amber">pgvector</span>
                </div>
              </div>
              <div>
                <p className="text-[var(--text-muted)] uppercase tracking-wider mb-2 font-bold">Embeddings</p>
                <div className="flex flex-wrap gap-2">
                  <span className="status-badge status-badge-red">OpenAI text-3</span>
                  <span className="status-badge status-badge-red">Cohere</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
