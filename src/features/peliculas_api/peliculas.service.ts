import { tmdbFetch } from '#/lib/tmdb_fetch.ts'
import type {
  TMDBMovieDetail,
  TMDBPaginatedResponse,
} from './peliculas.api.types'
import { limitarPaginacionTmdb } from './peliculas.api.utils'

export interface OpcionesPaginacion {
  pagina?: number
  tamanoPagina?: number // Ej: 9 o 10
  maxPaginas?: number // Ej: 10
}

// 1. Obtener tendencias de la semana
export async function getTendencias(opciones?: OpcionesPaginacion) {
  const data = await tmdbFetch<TMDBPaginatedResponse>('/trending/movie/week', {
    page: String(opciones?.pagina ?? 1),
  })
  return limitarPaginacionTmdb(data, opciones)
}

// 2. Obtener cartelera actual en México
export async function getTendenciasEnMexico(opciones?: OpcionesPaginacion) {
  const data = await tmdbFetch<TMDBPaginatedResponse>('/movie/now_playing', {
    region: 'MX',
    page: String(opciones?.pagina ?? 1),
  })
  return limitarPaginacionTmdb(data, opciones)
}

// 3. Descubrir películas con filtros personalizados
export async function descubrirPeliculas(
  filtros: {
    pagina?: number
    generosIds?: number[]
    proveedoresIds?: number[]
    calificacionMinima?: number
    anio?: number
  } & OpcionesPaginacion,
) {
  const params: Record<string, string> = {
    page: String(filtros.pagina ?? 1),
    sort_by: 'popularity.desc',
    include_adult: 'false',
    'vote_count.gte': '100',
  }

  if (filtros.generosIds?.length) {
    params.with_genres = filtros.generosIds.join(',')
  }

  if (filtros.proveedoresIds?.length) {
    params.watch_region = 'MX'
    params.with_watch_providers = filtros.proveedoresIds.join('|')
    params.watch_monetization_types = 'flatrate'
  }

  if (filtros.calificacionMinima) {
    params['vote_average.gte'] = String(filtros.calificacionMinima)
  }

  if (filtros.anio) {
    params.primary_release_year = String(filtros.anio)
  }

  const data = await tmdbFetch<TMDBPaginatedResponse>('/discover/movie', params)
  return limitarPaginacionTmdb(data, filtros)
}

// 4. Buscar películas por texto
// 4. Buscar películas por texto
export async function buscarPeliculas(
  opciones: { query: string } & OpcionesPaginacion,
) {
  const data = await tmdbFetch<TMDBPaginatedResponse>('/search/movie', {
    query: opciones.query.trim(),
    page: String(opciones.pagina ?? 1),
    include_adult: 'false',
    region: 'MX',
  })
  return limitarPaginacionTmdb(data, opciones)
}

// 5. Obtener una película individual con todos sus extras
export async function getPeliculaPorId(peliculaId: number | string) {
  return tmdbFetch<TMDBMovieDetail>(`/movie/${peliculaId}`, {
    append_to_response: 'credits,videos,watch/providers,recommendations',
    include_video_language: 'es-MX,es,en',
  })
}
