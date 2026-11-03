import { PeliculaContent } from '#/components/peliculas/PeliculaContent'
import { PeliculaHeader } from '#/components/peliculas/PeliculaHeader'
import { getPeliculaPorIdFn } from '#/features/peliculas_api/peliculas.api.functions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/peliculas/$peliculaId')({
  component: RouteComponent,
  params: {
    parse: ({ peliculaId }) => {
      if (!/^\d+$/.test(peliculaId)) {
        throw new Error('peliculaId debe ser numérico')
      }

      return { peliculaId: Number(peliculaId) }
    },
    stringify: ({ peliculaId }) => ({
      peliculaId: String(peliculaId),
    }),
  },
  loader: async ({ params }) => {
    return await getPeliculaPorIdFn({
      data: {
        peliculaId: params.peliculaId,
      },
    })
  },
})

function RouteComponent() {
  const pelicula = Route.useLoaderData()
  console.log(pelicula)

  return (
    <div className="flex flex-col min-h-screen w-full items-center">
      <PeliculaHeader pelicula={pelicula} />
      <PeliculaContent pelicula={pelicula} />
    </div>
  )
}
