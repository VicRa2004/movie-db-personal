import { createServerFn } from '@tanstack/react-start'
import { getTendencias } from './peliculas.api'
import { peliculaAPiMapper } from './peliculas.api.mapper'
import { z } from 'zod'

export const getTendenciasFn = createServerFn({ method: 'GET' })
  .validator(z.number().optional())
  .handler(async ({ data }) => {
    const res = await getTendencias(data)

    const peliculas = res.results.map((r) => peliculaAPiMapper(r))

    return {
      peliculas,
    }
  })
