import { sql } from 'drizzle-orm';
import { ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite/driver';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { useEffect, useState } from 'react';

export function useDatabaseSetup(db: ExpoSQLiteDatabase, migrations: any) {
  const [finished, setFinished] = useState(false);
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (success) {
      db.run(sql`PRAGMA foreign_keys = ON`);
      setFinished(true);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return { finished };
}
