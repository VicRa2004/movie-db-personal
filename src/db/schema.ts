import { defineRelations } from "drizzle-orm";
import {
  integer,
  pgTable,
  primaryKey,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const usuarios = pgTable("usuarios", {
  id: serial().primaryKey(),
  nombre: varchar({ length: 100 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  edad: integer().notNull(),
});

export const peliculas = pgTable("peliculas", {
  id: serial().primaryKey(),
  nombre: varchar({ length: 100 }).notNull(),
  calificacion: varchar({ length: 10 }),
  // Para poder solicitar peticiones a la API - no es del todo necesario
  idApi: integer().notNull(),
});

export const peliculasFavoritas = pgTable(
  "peliculas_favoritas",
  {
    idUser: integer("id_user")
      .notNull()
      .references(() => usuarios.id, { onDelete: "restrict" }),
    idPelicula: integer("id_pelicula")
      .notNull()
      .references(() => peliculas.id, { onDelete: "restrict" }),
  },
  (t) => [primaryKey({ columns: [t.idUser, t.idPelicula] })],
);

export const relations = defineRelations(
  { peliculas, peliculasFavoritas, usuarios },
  (r) => ({
    usuarios: {
      // Acceso directo: usuario -> películas
      peliculasFavoritas: r.many.peliculas({
        from: r.usuarios.id.through(r.peliculasFavoritas.idUser),
        to: r.peliculas.id.through(r.peliculasFavoritas.idPelicula),
      }),
    },
    peliculas: {
      // Relación inversa: película -> usuarios que la marcaron como favorita
      usuariosFavoritos: r.many.usuarios({
        from: r.peliculas.id.through(r.peliculasFavoritas.idPelicula),
        to: r.usuarios.id.through(r.peliculasFavoritas.idUser),
      }),
    },
  }),
);
