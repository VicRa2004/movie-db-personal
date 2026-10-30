import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  date,
  index,
  integer,
  pgTable,
  primaryKey,
  serial,
  smallint,
  text,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

// Columnas de auditoría reutilizables
const creadoEn = () =>
  timestamp("creado_en", { withTimezone: true }).notNull().defaultNow();
const actualizadoEn = () =>
  timestamp("actualizado_en", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date());

// ─────────────────────────────── Usuarios ───────────────────────────────

export const usuarios = pgTable("usuarios", {
  id: serial().primaryKey(),
  nombre: varchar({ length: 100 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  edad: integer().notNull(),
  creadoEn: creadoEn(),
});

// ─────────────────────────────── Películas ──────────────────────────────

export const peliculas = pgTable("peliculas", {
  id: serial().primaryKey(),
  nombre: varchar({ length: 100 }).notNull(),
  // Clasificación por edad (PG-13, B15, etc.). La nota del usuario va en peliculas_vistas.
  calificacion: varchar({ length: 10 }),
  // Id en la API externa (TMDB u otra). Único para no duplicar la misma película.
  idApi: integer("id_api").notNull().unique(),
  posterUrl: varchar("poster_url", { length: 500 }),
  fechaEstreno: date("fecha_estreno"),
  duracionMin: smallint("duracion_min"),
  sinopsis: text(),
  creadoEn: creadoEn(),
});

export const generos = pgTable("generos", {
  id: serial().primaryKey(),
  nombre: varchar({ length: 50 }).notNull().unique(),
  idApi: integer("id_api").unique(),
});

export const peliculasGeneros = pgTable(
  "peliculas_generos",
  {
    idPelicula: integer("id_pelicula")
      .notNull()
      .references(() => peliculas.id, { onDelete: "cascade" }),
    idGenero: integer("id_genero")
      .notNull()
      .references(() => generos.id, { onDelete: "cascade" }),
  },
  (t) => [
    primaryKey({ columns: [t.idPelicula, t.idGenero] }),
    index("peliculas_generos_genero_idx").on(t.idGenero),
  ],
);

// ──────────────────────── Listas del usuario ────────────────────────────

// Películas vistas: aquí vive la calificación personal (1–10).
export const peliculasVistas = pgTable(
  "peliculas_vistas",
  {
    idUser: integer("id_user")
      .notNull()
      .references(() => usuarios.id, { onDelete: "cascade" }),
    idPelicula: integer("id_pelicula")
      .notNull()
      .references(() => peliculas.id, { onDelete: "restrict" }),
    calificacion: smallint(), // null = vista pero sin calificar
    vecesVista: smallint("veces_vista").notNull().default(1),
    fechaVista: timestamp("fecha_vista", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    primaryKey({ columns: [t.idUser, t.idPelicula] }),
    index("peliculas_vistas_pelicula_idx").on(t.idPelicula),
    check(
      "peliculas_vistas_calificacion_rango",
      sql`${t.calificacion} IS NULL OR ${t.calificacion} BETWEEN 1 AND 10`,
    ),
    check("peliculas_vistas_veces_positivo", sql`${t.vecesVista} >= 1`),
  ],
);

// Favoritas: sin calificación (esa se toma de peliculas_vistas).
export const peliculasFavoritas = pgTable(
  "peliculas_favoritas",
  {
    idUser: integer("id_user")
      .notNull()
      .references(() => usuarios.id, { onDelete: "cascade" }),
    idPelicula: integer("id_pelicula")
      .notNull()
      .references(() => peliculas.id, { onDelete: "restrict" }),
    creadoEn: creadoEn(),
  },
  (t) => [
    primaryKey({ columns: [t.idUser, t.idPelicula] }),
    index("peliculas_favoritas_pelicula_idx").on(t.idPelicula),
  ],
);

// Guardadas para ver más tarde (watchlist).
export const peliculasGuardadas = pgTable(
  "peliculas_guardadas",
  {
    idUser: integer("id_user")
      .notNull()
      .references(() => usuarios.id, { onDelete: "cascade" }),
    idPelicula: integer("id_pelicula")
      .notNull()
      .references(() => peliculas.id, { onDelete: "restrict" }),
    nota: varchar({ length: 255 }), // p. ej. "me la recomendó Ana"
    creadoEn: creadoEn(),
  },
  (t) => [
    primaryKey({ columns: [t.idUser, t.idPelicula] }),
    index("peliculas_guardadas_pelicula_idx").on(t.idPelicula),
  ],
);

// ─────────────────────────────── Reseñas ────────────────────────────────

export const resenas = pgTable(
  "resenas",
  {
    id: serial().primaryKey(),
    idUser: integer("id_user")
      .notNull()
      .references(() => usuarios.id, { onDelete: "cascade" }),
    idPelicula: integer("id_pelicula")
      .notNull()
      .references(() => peliculas.id, { onDelete: "restrict" }),
    titulo: varchar({ length: 150 }),
    contenido: text().notNull(),
    esPublica: boolean("es_publica").notNull().default(false),
    contieneSpoilers: boolean("contiene_spoilers").notNull().default(false),
    creadoEn: creadoEn(),
    actualizadoEn: actualizadoEn(),
  },
  (t) => [
    // Una reseña por usuario y película (se edita, no se duplica)
    unique("resenas_user_pelicula_uq").on(t.idUser, t.idPelicula),
    // Listar reseñas públicas de una película, más recientes primero
    index("resenas_pelicula_publica_idx").on(
      t.idPelicula,
      t.esPublica,
      t.creadoEn,
    ),
  ],
);

// "Me gusta" en reseñas (solo tiene sentido en las públicas; se valida en la app).
export const resenasLikes = pgTable(
  "resenas_likes",
  {
    idUser: integer("id_user")
      .notNull()
      .references(() => usuarios.id, { onDelete: "cascade" }),
    idResena: integer("id_resena")
      .notNull()
      .references(() => resenas.id, { onDelete: "cascade" }),
    creadoEn: creadoEn(),
  },
  (t) => [
    primaryKey({ columns: [t.idUser, t.idResena] }),
    index("resenas_likes_resena_idx").on(t.idResena),
  ],
);
