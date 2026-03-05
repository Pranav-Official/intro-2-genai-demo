import { Stack } from 'expo-router';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { migrateDbIfNeeded } from '@/database/database';
import { colors } from '@/constants/theme';

function DatabaseInit({ children }: { children: React.ReactNode }) {
  const db = useSQLiteContext();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function init() {
      await migrateDbIfNeeded(db);
      setReady(true);
    }
    init();
  }, [db]);

  if (!ready) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return children;
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SQLiteProvider databaseName="expense_tracker.db" onInit={migrateDbIfNeeded}>
        <DatabaseInit>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.background },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen 
              name="add-transaction" 
              options={{ 
                presentation: 'modal',
                animation: 'slide_from_bottom',
              }} 
            />
            <Stack.Screen 
              name="add-account" 
              options={{ 
                presentation: 'modal',
                animation: 'slide_from_bottom',
              }} 
            />
          </Stack>
        </DatabaseInit>
      </SQLiteProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
