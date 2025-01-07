import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

let randomUUID: () => string;
if (process.env.MIGRATION === 'true') {
  randomUUID = () => '';
} else {
  const Crypto = require('expo-crypto');
  randomUUID = Crypto.randomUUID;
}

export const objects = sqliteTable('objects', {
  id: text('id', { mode: 'text', length: 36 })
    .primaryKey()
    .notNull()
    .unique()
    .$defaultFn(() => randomUUID()),
  name: text('name', { mode: 'text', length: 100 }).notNull(),
  createdAt: integer('createdAt', { mode: 'timestamp_ms' })
    .notNull()
    .default(
      sql`(strftime('%s', 'now') || substr(strftime('%f', 'now'), 4, 3))`,
    )
});

export const Object = objects.$inferSelect;
export const InsertObject = objects.$inferInsert;
