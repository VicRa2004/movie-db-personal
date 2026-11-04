import type { PeliculaDetalleAPI } from '#/features/peliculas_api/peliculas.api.types'
import { minutosAHoras } from '#/lib/tiempo'
import { Bookmark, Eye } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { ButtonGroup } from '../ui/button-group'

interface PeliculaHeaderProps {
  pelicula: PeliculaDetalleAPI
}

export const PeliculaHeader = ({ pelicula }: PeliculaHeaderProps) => {
  return (
    <header className="bg-primary w-full p-5 flex items-center justify-between">
      <section>
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
      <section>
        <ButtonGroup>
          <Button variant="secondary">
            <Bookmark /> Ver mas tarde
          </Button>
          <Button variant="secondary">
            <Eye /> Marcar como vista
          </Button>
        </ButtonGroup>
      </section>
    </header>
  )
}
