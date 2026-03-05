import { useSQLiteContext } from 'expo-sqlite';
import { useRouter } from 'expo-router';
import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SectionList, 
  TouchableOpacity, 
  RefreshControl,
  Alert
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSize } from '@/constants/theme';
import { getTransactions, getAccounts, deleteTransaction, Transaction } from '@/database/database';
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
  const [summary, setSummary] = useState({ total: 0, income: 0, expense: 0 });

  const fetchTransactions = useCallback(async () => {
    const [transactionData, accountsData] = await Promise.all([
      getTransactions(db),
      getAccounts(db)
    ]);
    
    // Calculate summary
    const totalBalance = accountsData.reduce((sum, acc) => sum + acc.balance, 0);
    
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    let monthIncome = 0;
    let monthExpense = 0;
    
    transactionData.forEach(t => {
      const tDate = new Date(t.date);
      if (tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear) {
        if (t.amount > 0) monthIncome += t.amount;
        else monthExpense += Math.abs(t.amount);
      }
    });

    setSummary({ total: totalBalance, income: monthIncome, expense: monthExpense });

    // Group transactions by date
    const groups = transactionData.reduce((acc: { [key: string]: Transaction[] }, item) => {
      // Use the date part (YYYY-MM-DD) from the ISO string for grouping
      const datePart = item.date.split('T')[0];
      if (!acc[datePart]) acc[datePart] = [];
      acc[datePart].push(item);
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

  const handleDelete = (id: number) => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            await deleteTransaction(db, id);
            fetchTransactions();
          }
        }
      ]
    );
  };

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
    const getLocalDateStr = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const todayStr = getLocalDateStr(new Date());
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = getLocalDateStr(yesterday);

    if (dateStr === todayStr) return 'Today';
    if (dateStr === yesterdayStr) return 'Yesterday';
    
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    
    return date.toLocaleDateString(undefined, { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short', 
      year: year !== new Date().getFullYear() ? 'numeric' : undefined 
    });
  };

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View style={styles.summaryCard}>
            <Text style={styles.totalLabel}>Total Balance</Text>
            <Text style={styles.totalAmount}>₹{summary.total.toFixed(2)}</Text>
            
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: colors.income + '20' }]}>
                  <MaterialCommunityIcons name="arrow-up" size={16} color={colors.income} />
                </View>
                <View>
                  <Text style={styles.statLabel}>Income</Text>
                  <Text style={[styles.statValue, { color: colors.income }]}>+₹{summary.income.toFixed(2)}</Text>
                </View>
              </View>
              
              <View style={styles.statDivider} />
              
              <View style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: colors.expense + '20' }]}>
                  <MaterialCommunityIcons name="arrow-down" size={16} color={colors.expense} />
                </View>
                <View>
                  <Text style={styles.statLabel}>Expense</Text>
                  <Text style={[styles.statValue, { color: colors.expense }]}>-₹{summary.expense.toFixed(2)}</Text>
                </View>
              </View>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <View style={[styles.categoryIcon, { backgroundColor: item.category_color + '20' }]}>
              <Text style={{ fontSize: 24 }}>{item.category_icon}</Text>
            </View>
            <View style={styles.transactionInfo}>
              <View style={styles.categoryRow}>
                <Text style={styles.categoryName}>{item.category_name}</Text>
                <Text style={styles.timeText}>{formatTime(item.date)}</Text>
              </View>
              {item.note ? <Text style={styles.note}>{item.note}</Text> : null}
            </View>
            <View style={styles.amountContainer}>
              <Text style={[
                styles.amount, 
                { color: item.amount < 0 ? colors.expense : colors.income }
              ]}>
                {item.amount < 0 ? '-' : '+'}₹{Math.abs(item.amount).toFixed(2)}
              </Text>
              <View style={styles.transactionFooter}>
                <Text style={styles.accountName}>{item.account_name}</Text>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <MaterialCommunityIcons name="delete-outline" size={16} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>
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
  summaryCard: {
    backgroundColor: colors.primary,
    margin: spacing.md,
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  totalLabel: {
    fontSize: fontSize.sm,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.white,
    marginVertical: spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  statValue: {
    fontSize: fontSize.sm,
    fontWeight: 'bold',
    color: colors.white,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: spacing.sm,
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
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  categoryName: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
  },
  timeText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '500',
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
  transactionFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: 2,
  },
  accountName: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  fab: {
    position: 'absolute',
    bottom: 110,
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
