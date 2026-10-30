import type { CreateTableBuilder } from "kysely";

export function baseColumns<T extends string>(t: CreateTableBuilder<T, never>) {
  return t
    .addColumn("id", "serial", (c) => c.primaryKey())
    .addColumn("created_at", "timestamptz", (c) =>
      c.notNull().defaultTo(new Date()),
    );
}
