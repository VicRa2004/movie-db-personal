import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  usuarios: {
    // Filas con datos extra (calificación, fecha, veces vista, etc.)
    vistas: r.many.peliculasVistas(),
    favoritas: r.many.peliculasFavoritas(),
    guardadas: r.many.peliculasGuardadas(),
    resenas: r.many.resenas(),
    likesDados: r.many.resenasLikes(),

    // Accesos directos: usuario -> películas
    peliculasVistas: r.many.peliculas({
      from: r.usuarios.id.through(r.peliculasVistas.idUser),
      to: r.peliculas.id.through(r.peliculasVistas.idPelicula),
    }),
    peliculasFavoritas: r.many.peliculas({
      from: r.usuarios.id.through(r.peliculasFavoritas.idUser),
      to: r.peliculas.id.through(r.peliculasFavoritas.idPelicula),
    }),
    peliculasGuardadas: r.many.peliculas({
      from: r.usuarios.id.through(r.peliculasGuardadas.idUser),
      to: r.peliculas.id.through(r.peliculasGuardadas.idPelicula),
    }),
  },

  peliculas: {
    vistas: r.many.peliculasVistas(),
    favoritas: r.many.peliculasFavoritas(),
    guardadas: r.many.peliculasGuardadas(),
    resenas: r.many.resenas(),
    // Solo las reseñas públicas
    resenasPublicas: r.many.resenas({
      from: r.peliculas.id,
      to: r.resenas.idPelicula,
      where: { esPublica: true },
    }),

    generos: r.many.generos({
      from: r.peliculas.id.through(r.peliculasGeneros.idPelicula),
      to: r.generos.id.through(r.peliculasGeneros.idGenero),
    }),

    // Inversas: película -> usuarios
    usuariosQueVieron: r.many.usuarios({
      from: r.peliculas.id.through(r.peliculasVistas.idPelicula),
      to: r.usuarios.id.through(r.peliculasVistas.idUser),
    }),
    usuariosFavoritos: r.many.usuarios({
      from: r.peliculas.id.through(r.peliculasFavoritas.idPelicula),
      to: r.usuarios.id.through(r.peliculasFavoritas.idUser),
    }),
    usuariosQueGuardaron: r.many.usuarios({
      from: r.peliculas.id.through(r.peliculasGuardadas.idPelicula),
      to: r.usuarios.id.through(r.peliculasGuardadas.idUser),
    }),
  },

  generos: {
    peliculas: r.many.peliculas({
      from: r.generos.id.through(r.peliculasGeneros.idGenero),
      to: r.peliculas.id.through(r.peliculasGeneros.idPelicula),
    }),
  },

  peliculasVistas: {
    usuario: r.one.usuarios({
      from: r.peliculasVistas.idUser,
      to: r.usuarios.id,
      optional: false,
    }),
    pelicula: r.one.peliculas({
      from: r.peliculasVistas.idPelicula,
      to: r.peliculas.id,
      optional: false,
    }),
  },

  peliculasFavoritas: {
    usuario: r.one.usuarios({
      from: r.peliculasFavoritas.idUser,
      to: r.usuarios.id,
      optional: false,
    }),
    pelicula: r.one.peliculas({
      from: r.peliculasFavoritas.idPelicula,
      to: r.peliculas.id,
      optional: false,
    }),
  },

  peliculasGuardadas: {
    usuario: r.one.usuarios({
      from: r.peliculasGuardadas.idUser,
      to: r.usuarios.id,
      optional: false,
    }),
    pelicula: r.one.peliculas({
      from: r.peliculasGuardadas.idPelicula,
      to: r.peliculas.id,
      optional: false,
    }),
  },

  resenas: {
    autor: r.one.usuarios({
      from: r.resenas.idUser,
      to: r.usuarios.id,
      optional: false,
    }),
    pelicula: r.one.peliculas({
      from: r.resenas.idPelicula,
      to: r.peliculas.id,
      optional: false,
    }),
    likes: r.many.resenasLikes(),
  },

  resenasLikes: {
    usuario: r.one.usuarios({
      from: r.resenasLikes.idUser,
      to: r.usuarios.id,
      optional: false,
    }),
    resena: r.one.resenas({
      from: r.resenasLikes.idResena,
      to: r.resenas.id,
      optional: false,
    }),
  },
}));
