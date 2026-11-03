import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/peliculas/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/peliculas/"!</div>
}
