import { tmdbFetch } from '#/lib/tmdb_fetch.ts'
import type { TMDBGenre, TMDBWatchProvider } from './peliculas.api.types'

export async function getGenerosPeliculas() {
  const data = await tmdbFetch<{ genres: TMDBGenre[] }>('/genre/movie/list')
  return data.genres
}

export async function getProveedoresEnMexico() {
  const data = await tmdbFetch<{ results: TMDBWatchProvider[] }>(
    '/watch/providers/movie',
    {
      watch_region: 'MX',
    },
  )
  return data.results
}
