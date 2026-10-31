import { LoginForm } from '#/components/loginForm.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <LoginForm />
    </div>
  )
}
