import { TMDB_BASE_URL, TMDB_TOKEN } from '#/config/env.ts'

export async function tmdbFetch<T>(
  endpoint: string,
  params: Record<string, string> = {},
): Promise<T> {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`)

  // Por defecto pedimos los textos en español de México
  url.searchParams.set('language', 'es-MX')

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Error en TMDB: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<T>
}
