export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-[var(--border)] px-4 pb-14 pt-10 text-[var(--text-secondary)]">
      <div className="page-wrap flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="m-0 text-sm">
          &copy; {year} GenAI for Software Engineering Workshop
        </p>
        <p
          className="kickicker m-0"
          style={{
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontSize: '0.69rem',
            fontWeight: 700,
            color: 'var(--accent-primary)',
          }}
        >
          Built with TanStack Start
        </p>
      </div>
    </footer>
  )
}
