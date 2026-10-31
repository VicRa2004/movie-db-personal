// ==========================================
// 1. TIPOS CRUDOS DE TMDB (Respuestas HTTP)
// ==========================================

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

export interface TMDBPaginatedResponse<T = TMDBMovieSummary> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface TMDBGenre {
  id: number
  name: string
}

export interface TMDBWatchProvider {
  provider_id: number
  provider_name: string
  logo_path: string
}

export interface TMDBMovieDetail extends Omit<TMDBMovieSummary, 'genre_ids'> {
  runtime: number
  tagline: string
  status: string
  budget: number
  revenue: number
  genres: TMDBGenre[]
  credits?: {
    cast: {
      id: number
      name: string
      character: string
      profile_path: string | null
    }[]
    crew: {
      id: number
      name: string
      job: string
      department: string
    }[]
  }
  videos?: {
    results: {
      id: string
      key: string
      name: string
      site: string
      type: string
      official: boolean
    }[]
  }
  'watch/providers'?: {
    results: {
      MX?: {
        link: string
        flatrate?: TMDBWatchProvider[]
        rent?: TMDBWatchProvider[]
        buy?: TMDBWatchProvider[]
      }
    }
  }
  recommendations?: TMDBPaginatedResponse<TMDBMovieSummary>
}

// ==========================================
// 2. MODELOS PROPIOS (camelCase y Español)
// ==========================================

export interface PeliculaAPI {
  id: number
  titulo: string
  descripcion: string
  posterPath: string | null
  backdropPath: string | null
  posterUrl: string | null
  backdropUrl: string | null
  voteAverage: number
  fechaDeLanzamiento: string
  generosIds: number[]
}

export interface RespuestaPaginadaAPI<T = PeliculaAPI> {
  pagina: number
  resultados: T[]
  totalPaginas: number
  totalResultados: number
}

export interface GeneroAPI {
  id: number
  nombre: string
}

export interface ProveedorStreamingAPI {
  id: number
  nombre: string
  logoPath: string
  logoUrl: string | null
}

export interface ActorAPI {
  id: number
  nombre: string
  personaje: string
  fotoPath: string | null
  fotoUrl: string | null
}

export interface PeliculaDetalleAPI extends Omit<PeliculaAPI, 'generosIds'> {
  duracionMinutos: number
  eslogan: string
  estado: string
  presupuesto: number
  recaudacion: number
  generos: GeneroAPI[]
  director: string
  trailerYoutubeUrl: string | null
  repartoPrincipal: ActorAPI[]
  plataformasStreamingMX: ProveedorStreamingAPI[]
  recomendaciones: PeliculaAPI[]
}

export type TamanoPoster = 'w185' | 'w342' | 'w500' | 'w780' | 'original'
export type TamanoBackdrop = 'w300' | 'w780' | 'w1280' | 'original'
