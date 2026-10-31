import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl text-primary font-bold">
        Bienvenido a tu app de peliculas
      </h1>
      <p className="mt-4 text-lg">Estos son los ultimos estrenos disponibles</p>
    </div>
  )
}
