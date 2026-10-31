import { tmdbFetch } from '#/lib/tmdb_fetch.ts'

export interface TMDBMovieSummary {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  genre_ids: number[]
}

export interface TMDBPaginatedResponse {
  page: number
  results: TMDBMovieSummary[]
  total_pages: number
  total_results: number
}

// 1. Obtener tendencias de la semana
export async function getTendencias(page = 1) {
  return tmdbFetch<TMDBPaginatedResponse>('/trending/movie/week', {
    page: String(page),
  })
}

// 2. Obtener cartelera actual en México
export async function getTendenciasEnMexico(page = 1) {
  return tmdbFetch<TMDBPaginatedResponse>('/movie/now_playing', {
    region: 'MX',
    page: String(page),
  })
}

// 3. Descubrir películas con filtros personalizados
export async function descubrirPeliculas(options: {
  page?: number
  genreIds?: number[] // Ej: [28, 878] (Acción y Sci-Fi)
  providerIds?: number[] // Ej: [8, 1899] (Netflix o Max)
  minRating?: number // Ej: 7.5
  year?: number // Ej: 2025
}) {
  const params: Record<string, string> = {
    page: String(options.page ?? 1),
    sort_by: 'popularity.desc',
    include_adult: 'false',
    'vote_count.gte': '100', // Evita películas sin relevancia estadística
  }

  if (options.genreIds?.length) {
    // Coma (,) significa AND (debe tener ambos géneros). Pipe (|) significa OR.
    params.with_genres = options.genreIds.join(',')
  }

  if (options.providerIds?.length) {
    params.watch_region = 'MX'
    // Pipe (|) para que traiga películas de Netflix O de Max
    params.with_watch_providers = options.providerIds.join('|')
    params.watch_monetization_types = 'flatrate' // Solo suscripción incluida
  }

  if (options.minRating) {
    params['vote_average.gte'] = String(options.minRating)
  }

  if (options.year) {
    params.primary_release_year = String(options.year)
  }

  return tmdbFetch<TMDBPaginatedResponse>('/discover/movie', params)
}
