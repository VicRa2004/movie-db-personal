import type { PeliculaDetalleAPI } from '#/features/peliculas_api/peliculas.api.types'
import { IframeYoutube } from '../IframeYoutube'

interface PeliculaContentProps {
  pelicula: PeliculaDetalleAPI
}

export const PeliculaContent = ({ pelicula }: PeliculaContentProps) => {
  return (
    <section className="flex flex-wrap w-full gap-2 p-2 justify-center">
      <img className="h-100" src={pelicula.posterUrl || ''} alt="" />
      <IframeYoutube
        className="w-full max-w-xl"
        urlYoutube={pelicula.trailerYoutubeUrl || ''}
      />
      <div className="border-3 border-primary rounded-lg flex-1 min-w-0 p-10 flex justify-center items-center">
        <p>{pelicula.descripcion}</p>
      </div>
    </section>
  )
}
