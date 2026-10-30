import type { Kysely } from "kysely";

export async function up(db: Kysely<any>) {
  await db.schema
    .createTable("users")
    .addColumn("id", "serial", (c) => c.primaryKey())
    .addColumn("nombre", "varchar(50)", (c) => c.notNull())
    .addColumn("email", "varchar(50)", (c) => c.notNull())
    .addColumn("created_at", "timestamptz", (c) =>
      c.notNull().defaultTo(new Date()),
    )
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable("users").execute();
}
