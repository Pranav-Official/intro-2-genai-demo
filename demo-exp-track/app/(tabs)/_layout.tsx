import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/constants/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
        },
        tabBarIconStyle: {
          marginBottom: 4,
        },
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          height: 90,
          paddingBottom: 30,
          paddingTop: 12,
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitleStyle: {
          color: colors.text,
          fontWeight: 'bold',
        },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Transactions',
          tabBarLabel: 'Transactions',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="swap-horizontal" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="accounts"
        options={{
          title: 'Accounts',
          tabBarLabel: 'Accounts',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="wallet" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
