import { useSQLiteContext } from 'expo-sqlite';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { colors, spacing, borderRadius, fontSize } from '@/constants/theme';
import { 
  getAccounts, 
  getCategories, 
  createTransaction, 
  Account, 
  Category 
} from '@/database/database';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddTransactionScreen() {
  const db = useSQLiteContext();
  const router = useRouter();
  
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [accountId, setAccountId] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    async function loadData() {
      const [accs, cats] = await Promise.all([
        getAccounts(db),
        getCategories(db)
      ]);
      setAccounts(accs);
      setCategories(cats);
      
      if (accs.length > 0) setAccountId(accs[0].id);
    }
    loadData();
  }, [db]);

  const filteredCategories = categories.filter(c => c.type === type);

  const handleSave = async () => {
    if (!amount || !accountId || !categoryId) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      Alert.alert('Error', 'Invalid amount');
      return;
    }

    await createTransaction(db, accountId, categoryId, numAmount, note.trim(), date.toISOString());
    router.back();
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const newDate = new Date(date);
      newDate.setFullYear(selectedDate.getFullYear());
      newDate.setMonth(selectedDate.getMonth());
      newDate.setDate(selectedDate.getDate());
      setDate(newDate);
    }
  };

  const onTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const newDate = new Date(date);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setDate(newDate);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>New Transaction</Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>

        <View style={styles.typeSelector}>
          <TouchableOpacity 
            style={[styles.typeButton, type === 'expense' && styles.typeButtonActive]}
            onPress={() => {
              setType('expense');
              setCategoryId(null);
            }}
          >
            <Text style={[styles.typeButtonText, type === 'expense' && styles.typeButtonTextActive]}>Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.typeButton, type === 'income' && styles.typeButtonActive]}
            onPress={() => {
              setType('income');
              setCategoryId(null);
            }}
          >
            <Text style={[styles.typeButtonText, type === 'income' && styles.typeButtonTextActive]}>Income</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Amount</Text>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              placeholder="₹0.00"
              keyboardType="numeric"
              autoFocus
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Account</Text>
            <View style={styles.accountList}>
              {accounts.map(acc => (
                <TouchableOpacity 
                  key={acc.id}
                  style={[styles.accountChip, accountId === acc.id && styles.accountChipActive]}
                  onPress={() => setAccountId(acc.id)}
                >
                  <Text style={[styles.accountChipText, accountId === acc.id && styles.accountChipTextActive]}>{acc.name}</Text>
                </TouchableOpacity>
              ))}
              {accounts.length === 0 && (
                <Text style={styles.noAccounts}>Please add an account first</Text>
              )}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.categoryGrid}>
              {filteredCategories.map(cat => (
                <TouchableOpacity 
                  key={cat.id}
                  style={[
                    styles.categoryItem, 
                    categoryId === cat.id && { backgroundColor: cat.color + '40', borderColor: cat.color }
                  ]}
                  onPress={() => setCategoryId(cat.id)}
                >
                  <Text style={{ fontSize: 24 }}>{cat.icon}</Text>
                  <Text style={styles.categoryLabel}>{cat.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date & Time</Text>
            <View style={styles.dateSelector}>
              <TouchableOpacity 
                style={styles.datePickerButton}
                onPress={() => setShowDatePicker(true)}
              >
                <MaterialCommunityIcons name="calendar" size={20} color={colors.primary} />
                <Text style={styles.datePickerButtonText}>
                  {date.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.datePickerButton}
                onPress={() => setShowTimePicker(true)}
              >
                <MaterialCommunityIcons name="clock-outline" size={20} color={colors.primary} />
                <Text style={styles.datePickerButtonText}>
                  {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </TouchableOpacity>
            </View>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                onChange={onDateChange}
              />
            )}
            {showTimePicker && (
              <DateTimePicker
                value={date}
                mode="time"
                onChange={onTimeChange}
              />
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Note (Optional)</Text>
            <TextInput
              style={styles.noteInput}
              value={note}
              onChangeText={setNote}
              placeholder="e.g. Lunch with friends"
              placeholderTextColor={colors.textSecondary}
              multiline
            />
          </View>

          <TouchableOpacity 
            style={[styles.saveButton, (!amount || !accountId || !categoryId) && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={!amount || !accountId || !categoryId}
          >
            <Text style={styles.saveButtonText}>Save Transaction</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.text,
  },
  cancelText: {
    fontSize: fontSize.md,
    color: colors.primary,
  },
  typeSelector: {
    flexDirection: 'row',
    backgroundColor: '#F1F3F5',
    borderRadius: borderRadius.md,
    padding: 4,
    marginBottom: spacing.xl,
  },
  typeButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.sm,
  },
  typeButtonActive: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  typeButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  typeButtonTextActive: {
    color: colors.text,
  },
  form: {
    gap: spacing.lg,
  },
  inputGroup: {
    gap: spacing.xs,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textSecondary,
    marginLeft: 4,
  },
  amountInput: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.text,
    borderBottomWidth: 2,
    borderBottomColor: colors.primaryLight,
    paddingVertical: spacing.sm,
  },
  accountList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  accountChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  accountChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  accountChipText: {
    fontSize: fontSize.sm,
    color: colors.text,
  },
  accountChipTextActive: {
    color: colors.white,
    fontWeight: 'bold',
  },
  noAccounts: {
    color: colors.expense,
    fontSize: fontSize.sm,
    fontStyle: 'italic',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  categoryItem: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: 'transparent',
    gap: 4,
  },
  categoryLabel: {
    fontSize: fontSize.xs,
    color: colors.text,
    textAlign: 'center',
  },
  dateSelector: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    backgroundColor: '#F8F9FA',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  datePickerButtonText: {
    fontSize: fontSize.sm,
    color: colors.text,
    fontWeight: '600',
  },
  noteInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: fontSize.md,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: colors.white,
  },
});
