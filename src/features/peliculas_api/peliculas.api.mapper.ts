import type {
  ActorAPI,
  GeneroAPI,
  PeliculaAPI,
  PeliculaDetalleAPI,
  ProveedorStreamingAPI,
  RespuestaPaginadaAPI,
  TMDBGenre,
  TMDBMovieDetail,
  TMDBMovieSummary,
  TMDBPaginatedResponse,
  TMDBWatchProvider,
} from './peliculas.api.types'
import { obtenerUrlImagenTmdb } from './peliculas.api.utils'

// 1. Mapper de película individual para listados
export const peliculaAPiMapper = (pelicula: TMDBMovieSummary): PeliculaAPI => {
  return {
    id: pelicula.id,
    titulo: pelicula.title,
    descripcion: pelicula.overview,
    posterPath: pelicula.poster_path,
    backdropPath: pelicula.backdrop_path,
    posterUrl: obtenerUrlImagenTmdb(pelicula.poster_path, 'w500'),
    backdropUrl: obtenerUrlImagenTmdb(pelicula.backdrop_path, 'w780'),
    voteAverage: pelicula.vote_average,
    fechaDeLanzamiento: pelicula.release_date,
    generosIds: pelicula.genre_ids,
  }
}

// 2. Mapper genérico para respuestas paginadas
export const paginacionApiMapper = (
  respuesta: TMDBPaginatedResponse<TMDBMovieSummary>,
): RespuestaPaginadaAPI<PeliculaAPI> => {
  return {
    pagina: respuesta.page,
    resultados: respuesta.results.map(peliculaAPiMapper),
    totalPaginas: respuesta.total_pages,
    totalResultados: respuesta.total_results,
  }
}

// 3. Mappers de catálogo (Géneros y Plataformas)
export const generoApiMapper = (genero: TMDBGenre): GeneroAPI => ({
  id: genero.id,
  nombre: genero.name,
})

export const proveedorApiMapper = (
  proveedor: TMDBWatchProvider,
): ProveedorStreamingAPI => ({
  id: proveedor.provider_id,
  nombre: proveedor.provider_name,
  logoPath: proveedor.logo_path,
  logoUrl: obtenerUrlImagenTmdb(proveedor.logo_path, 'w185'),
})

// 4. Mapper completo para la vista de detalle de una película
export const peliculaDetalleApiMapper = (
  pelicula: TMDBMovieDetail,
): PeliculaDetalleAPI => {
  const trailer = pelicula.videos?.results.find(
    (v) => v.site === 'YouTube' && v.type === 'Trailer',
  )
  const director = pelicula.credits?.crew.find((c) => c.job === 'Director')

  const repartoPrincipal: ActorAPI[] = (pelicula.credits?.cast ?? [])
    .slice(0, 10)
    .map((actor) => ({
      id: actor.id,
      nombre: actor.name,
      personaje: actor.character,
      fotoPath: actor.profile_path,
      fotoUrl: obtenerUrlImagenTmdb(actor.profile_path, 'w185'),
    }))

  const plataformasStreamingMX = (
    pelicula['watch/providers']?.results?.MX?.flatrate ?? []
  ).map(proveedorApiMapper)

  const recomendaciones = (pelicula.recommendations?.results ?? [])
    .slice(0, 10)
    .map(peliculaAPiMapper)

  return {
    id: pelicula.id,
    titulo: pelicula.title,
    descripcion: pelicula.overview,
    posterPath: pelicula.poster_path,
    backdropPath: pelicula.backdrop_path,
    posterUrl: obtenerUrlImagenTmdb(pelicula.poster_path, 'w500'),
    backdropUrl: obtenerUrlImagenTmdb(pelicula.backdrop_path, 'w1280'),
    voteAverage: pelicula.vote_average,
    fechaDeLanzamiento: pelicula.release_date,
    duracionMinutos: pelicula.runtime,
    eslogan: pelicula.tagline,
    estado: pelicula.status,
    presupuesto: pelicula.budget,
    recaudacion: pelicula.revenue,
    generos: pelicula.genres.map(generoApiMapper),
    director: director?.name ?? 'Desconocido',
    trailerYoutubeUrl: trailer
      ? `https://www.youtube.com/watch?v=${trailer.key}`
      : null,
    repartoPrincipal,
    plataformasStreamingMX,
    recomendaciones,
  }
}
