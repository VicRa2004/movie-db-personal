import type { TMDBMovieSummary } from './peliculas.api'
import type { PeliculaAPI } from './peliculas.api.types'

export const peliculaAPiMapper = (pelicula: TMDBMovieSummary): PeliculaAPI => {
  return {
    id: pelicula.id,
    titulo: pelicula.title,
    descripcion: pelicula.overview,
    posterPath: pelicula.poster_path,
    backdropPath: pelicula.backdrop_path,
    voteAverage: pelicula.vote_average,
    fechaDeLanzamiento: pelicula.release_date,
    generosIds: pelicula.genre_ids,
  }
}
