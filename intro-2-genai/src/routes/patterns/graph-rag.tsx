import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Share2, Network, Search, Layers, GitBranch, Zap } from 'lucide-react'

export const Route = createFileRoute('/patterns/graph-rag')({ component: App })

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
            <Share2 size={12} />
            GraphRAG (Knowledge Graphs)
          </span>
        </div>

        <h1 className="display-title text-4xl sm:text-5xl font-bold mb-4 text-[var(--text-primary)] tracking-tight">
          Beyond Text Chunks:
          <br />
          <span className="bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--accent-primary)] bg-clip-text text-transparent">
            Graph-Based Retrieval
          </span>
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
          Traditional RAG focuses on "needle in a haystack" retrieval. GraphRAG focuses on the "entire haystack" and how every piece of hay relates to the next.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-8">
          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-4">
              Why GraphRAG?
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              When documents are split into isolated chunks, we lose the **relationships** between entities. GraphRAG creates a map of your data to preserve these connections.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: 'Global Understanding', desc: 'Summarizes high-level themes across the entire dataset (e.g., "What are the common issues in these reports?").', icon: Network },
                { title: 'Relationship Discovery', desc: 'Identifies entities (people, concepts) and how they connect across multiple documents.', icon: GitBranch },
                { title: 'Multi-Hop Reasoning', desc: 'Follows chains of information (A connects to B, B connects to C) to answer complex queries.', icon: Layers },
                { title: 'Reduced Hallucinations', desc: 'Grounds the model in a structured fact map rather than fragmented text segments.', icon: Search },
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
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-6">
              The GraphRAG Workflow
            </h2>
            
            <div className="space-y-8">
              {/* Indexing Phase */}
              <div className="relative pl-8 border-l-2 border-[var(--accent-secondary)]/20 pb-4">
                <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-[var(--accent-secondary)] flex items-center justify-center text-[10px] text-white font-bold">1</div>
                <h3 className="font-bold text-sm text-[var(--text-primary)] mb-2 uppercase tracking-wider">Indexing Phase</h3>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="p-3 rounded bg-[var(--bg-base)] border border-[var(--border)] text-[10px]">
                    <p className="font-bold mb-1">Entity Extraction</p>
                    <p className="text-[var(--text-secondary)] italic">LLM identifies nodes (Entities) and edges (Relations) in text chunks.</p>
                  </div>
                  <div className="p-3 rounded bg-[var(--bg-base)] border border-[var(--border)] text-[10px]">
                    <p className="font-bold mb-1">Community Detection</p>
                    <p className="text-[var(--text-secondary)] italic">Algorithms group related nodes into clusters/communities.</p>
                  </div>
                  <div className="p-3 rounded bg-[var(--bg-base)] border border-[var(--border)] text-[10px]">
                    <p className="font-bold mb-1">Community Summaries</p>
                    <p className="text-[var(--text-secondary)] italic">LLM generates summaries for every entity and community.</p>
                  </div>
                </div>
              </div>

              {/* Retrieval Phase */}
              <div className="relative pl-8 border-l-2 border-[var(--accent-primary)]/20">
                <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-[10px] text-white font-bold">2</div>
                <h3 className="font-bold text-sm text-[var(--text-primary)] mb-2 uppercase tracking-wider">Retrieval Phase</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="p-3 rounded bg-[var(--bg-base)] border border-[var(--border)] text-[10px]">
                    <p className="font-bold mb-1 text-green-600">Local Search</p>
                    <p className="text-[var(--text-secondary)] italic">Retrieves specific entities and their direct neighbors for factual queries.</p>
                  </div>
                  <div className="p-3 rounded bg-[var(--bg-base)] border border-[var(--border)] text-[10px]">
                    <p className="font-bold mb-1 text-blue-600">Global Search</p>
                    <p className="text-[var(--text-secondary)] italic">Retrieves pre-generated community summaries for broad thematic queries.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="card p-6 sm:p-8">
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-4">
              Comparison: RAG vs. GraphRAG
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="py-2 pr-4 text-[var(--text-muted)] font-bold uppercase tracking-wider">Feature</th>
                    <th className="py-2 px-4 text-[var(--text-muted)] font-bold uppercase tracking-wider">Traditional RAG</th>
                    <th className="py-2 pl-4 text-[var(--accent-secondary)] font-bold uppercase tracking-wider">GraphRAG</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)] text-[var(--text-secondary)]">
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-[var(--text-primary)]">Unit of Retrieval</td>
                    <td className="py-3 px-4">Raw Text Chunks</td>
                    <td className="py-3 pl-4">Entities, Relationships & Summaries</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-[var(--text-primary)]">Search Type</td>
                    <td className="py-3 px-4">Vector Similarity (Semantic)</td>
                    <td className="py-3 pl-4">Graph Traversal + Vector Search</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-[var(--text-primary)]">Best Query For</td>
                    <td className="py-3 px-4">"What is X in document Y?"</td>
                    <td className="py-3 pl-4">"What are the main risks in this corpus?"</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-[var(--text-primary)]">Setup Cost</td>
                    <td className="py-3 px-4">Low (Just index)</td>
                    <td className="py-3 pl-4">High (Large LLM indexing cost)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="card p-5 sticky top-8">
            <h3 className="font-semibold text-[var(--text-primary)] mb-3 text-sm">
              Implementation Note
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mb-3">
              GraphRAG is computationally expensive to index. It often requires thousands of LLM calls during the indexing phase to identify every relationship.
            </p>
            <div className="callout callout-amber">
               <p className="text-[10px]">
                 <strong>Microsoft GraphRAG:</strong> A popular open-source implementation that uses community detection (Leiden algorithm) to build high-level summaries.
               </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
