import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/tooling')({
  component: () => <Outlet />,
})
