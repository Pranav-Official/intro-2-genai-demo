import { useSQLiteContext } from 'expo-sqlite';
import { useRouter } from 'expo-router';
import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  RefreshControl,
  Alert
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSize } from '@/constants/theme';
import { getAccounts, deleteAccount, Account } from '@/database/database';
import { useFocusEffect } from '@react-navigation/native';

export default function AccountsScreen() {
  const db = useSQLiteContext();
  const router = useRouter();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAccounts = useCallback(async () => {
    const data = await getAccounts(db);
    setAccounts(data);
  }, [db]);

  useFocusEffect(
    useCallback(() => {
      fetchAccounts();
    }, [fetchAccounts])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAccounts();
    setRefreshing(false);
  };

  const handleDelete = (id: number, name: string) => {
    Alert.alert(
      'Delete Account',
      `Are you sure you want to delete ${name}? This will also delete all associated transactions.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            await deleteAccount(db, id);
            fetchAccounts();
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={accounts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.accountItem}>
            <View style={styles.accountIcon}>
              <MaterialCommunityIcons name="bank" size={24} color={colors.primary} />
            </View>
            <View style={styles.accountInfo}>
              <Text style={styles.accountName}>{item.name}</Text>
              <Text style={styles.createdDate}>
                Created: {new Date(item.created_at).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.balanceContainer}>
              <Text style={[
                styles.balance,
                { color: item.balance < 0 ? colors.expense : colors.income }
              ]}>
                ${item.balance.toFixed(2)}
              </Text>
              <TouchableOpacity onPress={() => handleDelete(item.id, item.name)}>
                <MaterialCommunityIcons name="delete-outline" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialCommunityIcons name="wallet-outline" size={64} color={colors.border} />
            <Text style={styles.emptyText}>No accounts yet</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => router.push('/add-account')}
      >
        <MaterialCommunityIcons name="plus" size={32} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingBottom: 100,
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  accountIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primaryLight + '40',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
  },
  createdDate: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  balanceContainer: {
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  balance: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.xl,
    backgroundColor: colors.primary,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
});
