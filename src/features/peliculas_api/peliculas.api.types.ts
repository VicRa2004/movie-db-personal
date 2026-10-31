export interface PeliculaAPI {
  id: number
  titulo: string
  descripcion: string
  posterPath: string | null
  backdropPath: string | null
  fechaDeLanzamiento: string
  voteAverage: number
  generosIds: number[]
}
