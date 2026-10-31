import type {
  TamanoBackdrop,
  TamanoPoster,
  TMDBPaginatedResponse,
} from './peliculas.api.types'

export function obtenerUrlImagenTmdb(
  path: string | null | undefined,
  tamano: TamanoPoster | TamanoBackdrop = 'w500',
): string | null {
  if (!path) return null
  return `https://image.tmdb.org/t/p/${tamano}${path}`
}

export function limitarPaginacionTmdb<T>(
  data: TMDBPaginatedResponse<T>,
  opciones?: { tamanoPagina?: number; maxPaginas?: number },
): TMDBPaginatedResponse<T> {
  const maxPaginas = opciones?.maxPaginas ?? 10
  const tamanoPagina = opciones?.tamanoPagina ?? 10

  const results = data.results.slice(0, tamanoPagina)
  const total_pages = Math.min(data.total_pages, maxPaginas)

  return {
    page: data.page,
    results,
    total_pages,
    total_results: Math.min(data.total_results, total_pages * results.length),
  }
}
