import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';

export const sqlite = openDatabaseSync('app.db', {
  enableChangeListener: true,
});
export const db = drizzle(sqlite);
