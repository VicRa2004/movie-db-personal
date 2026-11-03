import type { PeliculaDetalleAPI } from '#/features/peliculas_api/peliculas.api.types'
import { minutosAHoras } from '#/lib/tiempo'
import { Badge } from '../ui/badge'

interface PeliculaHeaderProps {
  pelicula: PeliculaDetalleAPI
}

export const PeliculaHeader = ({ pelicula }: PeliculaHeaderProps) => {
  return (
    <section className="bg-primary w-full p-5">
      <h1 className="flex items-center gap-3 text-4xl text-white font-bold">
        {pelicula.titulo}{' '}
        <Badge
          variant="secondary"
          className={`text-white font-bold ${pelicula.voteAverage > 7 ? 'bg-green-500' : 'bg-red-500'}`}
        >
          {pelicula.voteAverage.toFixed(2)}
        </Badge>
      </h1>

      <h2 className="text-white">Director: {pelicula.director}</h2>
      <p className="text-white">
        Duración: {minutosAHoras(pelicula.duracionMinutos)}
      </p>
    </section>
  )
}
