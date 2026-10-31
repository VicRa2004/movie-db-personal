import { PeliculaAPICard } from '#/components/PeliculaAPICard.tsx'
import { getTendenciasFn } from '#/features/peliculas_api/peliculas.api.functions.ts'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
  loader: () => getTendenciasFn({ data: { pagina: 1, tamanoPagina: 9 } }),
})

function Home() {
  const { resultados } = Route.useLoaderData()

  return (
    <div className="p-8">
      <h1 className="text-4xl text-primary font-bold">
        Bienvenido a tu app de peliculas
      </h1>
      <p className="mt-4 text-lg">Estos son los ultimos estrenos disponibles</p>

      <main className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5 border">
        {resultados.map((pelicula) => (
          <PeliculaAPICard pelicula={pelicula} />
        ))}
      </main>
    </div>
  )
}
