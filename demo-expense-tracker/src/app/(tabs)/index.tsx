import { useSQLiteContext } from 'expo-sqlite';
import { useRouter } from 'expo-router';
import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SectionList, 
  TouchableOpacity, 
  RefreshControl 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSize } from '@/constants/theme';
import { getTransactions, Transaction } from '@/database/database';
import { useFocusEffect } from '@react-navigation/native';

interface Section {
  title: string;
  data: Transaction[];
}

export default function TransactionsScreen() {
  const db = useSQLiteContext();
  const router = useRouter();
  const [sections, setSections] = useState<Section[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTransactions = useCallback(async () => {
    const data = await getTransactions(db);
    
    // Group transactions by date
    const groups = data.reduce((acc: { [key: string]: Transaction[] }, item) => {
      const dateStr = item.date; // Use item.date as key
      if (!acc[dateStr]) acc[dateStr] = [];
      acc[dateStr].push(item);
      return acc;
    }, {});

    const sectionData = Object.keys(groups)
      .sort((a, b) => b.localeCompare(a)) // Sort dates descending
      .map(date => ({
        title: formatDate(date),
        data: groups[date],
      }));

    setSections(sectionData);
  }, [db]);

  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
    }, [fetchTransactions])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTransactions();
    setRefreshing(false);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    
    return date.toLocaleDateString(undefined, { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short', 
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined 
    });
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <View style={[styles.categoryIcon, { backgroundColor: item.category_color + '20' }]}>
              <Text style={{ fontSize: 24 }}>{item.category_icon}</Text>
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.categoryName}>{item.category_name}</Text>
              {item.note ? <Text style={styles.note}>{item.note}</Text> : null}
            </View>
            <View style={styles.amountContainer}>
              <Text style={[
                styles.amount, 
                { color: item.amount < 0 ? colors.expense : colors.income }
              ]}>
                {item.amount < 0 ? '-' : '+'}${Math.abs(item.amount).toFixed(2)}
              </Text>
              <Text style={styles.accountName}>{item.account_name}</Text>
            </View>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderTitle}>{title}</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialCommunityIcons name="receipt" size={64} color={colors.border} />
            <Text style={styles.emptyText}>No transactions yet</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => router.push('/add-transaction')}
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
  sectionHeader: {
    backgroundColor: '#F8F9FA',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  sectionHeaderTitle: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  transactionInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
  },
  note: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
  },
  accountName: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
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
