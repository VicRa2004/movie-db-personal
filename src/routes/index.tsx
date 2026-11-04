import { Paginacion } from '#/components/Paginacion'
import { PeliculaAPICard } from '#/components/peliculas/PeliculaAPICard.tsx'
import { getTendenciasFn } from '#/features/peliculas_api/peliculas.api.functions.ts'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

interface IndexParams {
  page: number
}

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): IndexParams => {
    return {
      page: Number(search?.page ?? 1),
    }
  },
  loaderDeps: ({ search: { page } }) => ({ page }),
  component: Home,
  loader: ({ deps }) =>
    getTendenciasFn({ data: { pagina: deps.page, tamanoPagina: 9 } }),
})

function Home() {
  const { resultados, pagina, totalPaginas } = Route.useLoaderData()
  const navigate = useNavigate()

  const siguiente = () => {
    navigate({
      to: '/',
      search: { page: pagina + 1 },
    })
  }

  const atras = () => {
    navigate({
      to: '/',
      search: { page: pagina - 1 },
    })
  }

  const irAPagina = (page: number) => {
    navigate({
      to: '/',
      search: { page },
    })
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl text-primary font-bold">
        Bienvenido a tu app de peliculas
      </h1>
      <p className="mt-4 text-lg">Estos son los ultimos estrenos disponibles</p>

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {resultados.map((pelicula) => (
          <PeliculaAPICard key={pelicula.id} pelicula={pelicula} />
        ))}

        <section className="sm:col-span-2 lg:col-span-3">
          <Paginacion
            siguiente={siguiente}
            atras={atras}
            page={pagina}
            totalPages={totalPaginas}
            irAPagina={irAPagina}
          />
        </section>
      </main>
    </div>
  )
}
