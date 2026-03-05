import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, Lightbulb, Target, FileCode, Database } from 'lucide-react'

export const Route = createFileRoute('/foundations/prompting')({
  component: App,
})

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
            <Lightbulb size={12} />
            Prompt Engineering
          </span>
        </div>

        <h1 className="display-title text-4xl sm:text-5xl font-bold mb-4 text-[var(--text-primary)] tracking-tight">
          Mastering Chain-of-Thought
          <br />
          <span className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
            & Few-Shot Prompting
          </span>
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
          Learn techniques to get high-quality, consistent TypeScript and SQL
          outputs.
        </p>
      </section>

      <div className="grid gap-8">
        <section className="card p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--accent-primary)]/10">
              <Target size={20} className="text-[var(--accent-primary)]" />
            </div>
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)]">
              Chain-of-Thought (CoT) Prompting
            </h2>
          </div>

          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
            Chain-of-Thought prompting encourages the model to show its
            reasoning process. By adding phrases like "Let me think step by
            step" or "Here's my reasoning:", you get better results on complex
            tasks.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 mt-6">
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                ❌ Without CoT
              </h3>
              <pre className="text-sm bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                {`Write a function to calculate 
factorial of a number.`}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                ✅ With CoT
              </h3>
              <pre className="text-sm bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                {`Write a function to calculate 
factorial. First explain the 
mathematical approach, then 
write the TypeScript code.`}
              </pre>
            </div>
          </div>
        </section>

        <section className="card p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--accent-secondary)]/10">
              <FileCode size={20} className="text-[var(--accent-secondary)]" />
            </div>
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)]">
              Few-Shot Prompting for TypeScript
            </h2>
          </div>

          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
            Show the model examples of what you want. Include input/output pairs
            in your prompt to guide the model toward your desired format and
            style.
          </p>

          <pre className="text-sm overflow-x-auto mt-4">
            {`Generate a TypeScript interface for a user.

Example 1:
Input: A product with name, price, and boolean for inStock
Output:
interface Product {
  name: string;
  price: number;
  inStock: boolean;
}

Example 2:
Input: An order with id, list of items, and total cost
Output:
interface Order {
  id: string;
  items: Array<{ productId: string; quantity: number }>;
  totalCost: number;
}

Now generate for:
Input: A blog post with title, content, author email, and array of tags`}
          </pre>

          <div className="callout callout-blue">
            <p>
              <strong>Key insight:</strong> The examples should match exactly
              the format and style you want. If you want JSDoc comments, include
              them in examples!
            </p>
          </div>
        </section>

        <section className="card p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--accent-primary)]/10">
              <Database size={20} className="text-[var(--accent-primary)]" />
            </div>
            <h2 className="section-title text-xl font-semibold text-[var(--text-primary)]">
              Few-Shot for SQL Generation
            </h2>
          </div>

          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
            SQL is notoriously tricky. Few-shot examples with your actual schema
            dramatically improve accuracy.
          </p>

          <pre className="text-sm overflow-x-auto mt-4">
            {`Given this schema:
users(id, name, email, created_at)
orders(id, user_id, total, status)

Write a query to:
Find top 5 users by order total

SELECT u.name, SUM(o.total) as total_spent
FROM users u
JOIN orders o ON u.id = o.user_id
GROUP BY u.id
ORDER BY total_spent DESC
LIMIT 5;

Now write for:
Get average order value by user`}
          </pre>
        </section>

        <section className="card p-6 sm:p-8">
          <h2 className="section-title text-xl font-semibold text-[var(--text-primary)] mb-4">
            Prompt Engineering Checklist
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 mt-4">
            {[
              {
                title: 'Be Specific',
                desc: 'Include exact types, formats, and constraints',
              },
              {
                title: 'Show Examples',
                desc: 'Use 2-3 few-shot examples for complex tasks',
              },
              {
                title: 'Structure Matters',
                desc: 'Use clear sections, bullet points, code blocks',
              },
              {
                title: 'Role Assignment',
                desc: 'System prompts like "You are a senior engineer..."',
              },
              {
                title: 'Output Formatting',
                desc: 'Specify JSON, markdown, or code format explicitly',
              },
              {
                title: 'Iterate & Test',
                desc: 'Refine prompts based on edge cases you find',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-3 p-3 rounded-lg bg-[var(--bg-base)] border border-[var(--border)]"
              >
                <span className="w-6 h-6 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <div>
                  <h4 className="font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
