import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import {
  getGenerosPeliculas,
  getProveedoresEnMexico,
} from './catalogo.api.service'
import {
  generoApiMapper,
  paginacionApiMapper,
  peliculaDetalleApiMapper,
  proveedorApiMapper,
} from './peliculas.api.mapper'
import {
  buscarPeliculas,
  descubrirPeliculas,
  getPeliculaPorId,
  getTendencias,
  getTendenciasEnMexico,
} from './peliculas.service'

const paginacionSchema = z
  .object({
    pagina: z.number().min(1).default(1),
    tamanoPagina: z.number().min(1).max(20).default(10), // Puedes pasar 9 o 10
    maxPaginas: z.number().min(1).max(500).default(10),
  })
  .optional()

// 1. Tendencias de la semana
export const getTendenciasFn = createServerFn({ method: 'GET' })
  .validator(paginacionSchema)
  .handler(async ({ data }) => {
    const res = await getTendencias(data)
    return paginacionApiMapper(res)
  })

// 2. Cartelera en México
export const getTendenciasEnMexicoFn = createServerFn({ method: 'GET' })
  .validator(paginacionSchema)
  .handler(async ({ data }) => {
    const res = await getTendenciasEnMexico(data)
    return paginacionApiMapper(res)
  })

// 3. Descubrir con filtros
export const descubrirPeliculasFn = createServerFn({ method: 'GET' })
  .validator(
    z.object({
      pagina: z.number().min(1).default(1),
      tamanoPagina: z.number().min(1).max(20).default(10),
      maxPaginas: z.number().min(1).max(500).default(10),
      generosIds: z.array(z.number()).optional(),
      proveedoresIds: z.array(z.number()).optional(),
      calificacionMinima: z.number().min(0).max(10).optional(),
      anio: z.number().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const res = await descubrirPeliculas(data)
    return paginacionApiMapper(res)
  })

// 4. Buscar películas por nombre
export const buscarPeliculasFn = createServerFn({ method: 'GET' })
  .validator(
    z.object({
      query: z.string().min(1),
      pagina: z.number().min(1).default(1),
      tamanoPagina: z.number().min(1).max(20).default(10),
      maxPaginas: z.number().min(1).max(500).default(10),
    }),
  )
  .handler(async ({ data }) => {
    const res = await buscarPeliculas(data)
    return paginacionApiMapper(res)
  })

// 5. Ver una película individual por ID
export const getPeliculaPorIdFn = createServerFn({ method: 'GET' })
  .validator(z.object({ peliculaId: z.union([z.number(), z.string()]) }))
  .handler(async ({ data }) => {
    const res = await getPeliculaPorId(data.peliculaId)
    return peliculaDetalleApiMapper(res)
  })

// 6. Obtener catálogos (géneros y plataformas en México)
export const getCatalogosPeliculasFn = createServerFn({
  method: 'GET',
}).handler(async () => {
  const [generosRaw, proveedoresRaw] = await Promise.all([
    getGenerosPeliculas(),
    getProveedoresEnMexico(),
  ])

  return {
    generos: generosRaw.map(generoApiMapper),
    proveedores: proveedoresRaw.map(proveedorApiMapper),
  }
})
