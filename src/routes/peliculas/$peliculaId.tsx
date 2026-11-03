import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/peliculas/$peliculaId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/peliculas/$peliculaId"!</div>
}
