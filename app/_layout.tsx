import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { db, sqlite } from '../db/db';
import migrations from '../drizzle/migrations';
import { useDatabaseSetup } from '../hooks/useDatabaseSetup';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  if (__DEV__) {
    useDrizzleStudio(sqlite);
  }
  const { finished } = useDatabaseSetup(db, migrations);

  useEffect(() => {
    if (finished) {
      SplashScreen.hideAsync();
    }
  }, [finished]);

  if (!finished) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen />
    </Stack>
  );
}
