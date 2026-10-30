import { promises as fs } from "node:fs";
import path from "node:path";
import { Migrator, FileMigrationProvider } from "kysely/migration";
import { db } from "./index";

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder: path.join(import.meta.dirname, "migrations"),
  }),
});

const cmd = process.argv[2];
const { error, results } =
  cmd === "down"
    ? await migrator.migrateDown()
    : await migrator.migrateToLatest();

results?.forEach((r) => console.log(`${r.status}: ${r.migrationName}`));
if (error) {
  console.error(error);
  process.exit(1);
}
await db.destroy();
