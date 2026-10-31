import type { Kysely } from 'kysely'
import { baseColumns } from '../migration-helpers'

export async function up(db: Kysely<any>): Promise<void> {
  await baseColumns(db.schema.createTable('users'))
    .addColumn('nombre', 'varchar(50)', (c) => c.notNull())
    .addColumn('email', 'varchar(50)', (c) => c.notNull())
    .execute()

  await baseColumns(db.schema.createTable('peliculas'))
    .addColumn('titulo', 'varchar(70)', (c) => c.notNull())
    .addColumn('año_estreno', 'date', (c) => c.notNull())
    // Puede ser ID o clave, aun no veo la API.
    .addColumn('identificador_api', 'varchar(250)', (c) => c.notNull().unique())
    .addColumn('poster_url', 'varchar(100)', (c) => c.notNull())
    .addColumn('generos', 'varchar(150)', (c) => c.notNull())
    // Contar por minutos, 60 = 1 hora
    .addColumn('duracion', 'integer', (c) => c.notNull())
    .execute()

  await baseColumns(db.schema.createTable('historial_peliculas'))
    .addColumn('id_user', 'integer', (c) =>
      c.notNull().references('users.id').onDelete('restrict'),
    )
    .addColumn('id_peliculas', 'integer', (c) =>
      c.notNull().references('peliculas.id').onDelete('restrict'),
    )
    .addColumn('calificacion', 'integer', (c) => c.notNull().defaultTo(50))
    .addColumn('lugar', 'varchar(50)', (c) => c.notNull())
    .addColumn('notas', 'varchar(50)')
    .execute()

  await baseColumns(db.schema.createTable('peliculas_favoritas'))
    .addColumn('id_historial_pelicula', 'integer', (c) =>
      c.notNull().references('historial_peliculas.id').onDelete('restrict'),
    )
    .execute()

  await baseColumns(db.schema.createTable('peliculas_guardadas'))
    .addColumn('id_pelicula', 'integer', (c) =>
      c.notNull().references('peliculas.id').onDelete('restrict'),
    )
    .addColumn('id_user', 'integer', (c) =>
      c.notNull().references('users.id').onDelete('restrict'),
    )
    .execute()

  await baseColumns(db.schema.createTable('peliculas_reviews'))
    .addColumn('id_historial_pelicula', 'integer', (c) =>
      c.notNull().references('historial_peliculas.id').onDelete('restrict'),
    )
    .addColumn('review_texto', 'varchar(250)', (c) => c.notNull())
    // Si una reseña es publica o privada - "publico" "privado"
    .addColumn('estado', 'varchar(10)', (c) => c.notNull().defaultTo('publico'))
    .addColumn('spoilers', 'varchar(10)', (c) => c.notNull().defaultTo('si')) // "no"
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('peliculas_reviews').execute()
  await db.schema.dropTable('peliculas_guardadas').execute()
  await db.schema.dropTable('peliculas_favoritas').execute()
  await db.schema.dropTable('historial_peliculas').execute()
  await db.schema.dropTable('peliculas').execute()
  await db.schema.dropTable('users').execute()
}
