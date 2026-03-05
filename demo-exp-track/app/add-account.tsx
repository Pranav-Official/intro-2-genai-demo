import { useSQLiteContext } from 'expo-sqlite';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { colors, spacing, borderRadius, fontSize } from '@/constants/theme';
import { createAccount } from '@/database/database';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddAccountScreen() {
  const db = useSQLiteContext();
  const router = useRouter();
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');

  const handleSave = async () => {
    if (!name.trim()) return;
    const initialBalance = parseFloat(balance) || 0;
    await createAccount(db, name.trim(), initialBalance);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>New Account</Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Account Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="e.g. Cash, Bank, Savings"
              placeholderTextColor={colors.textSecondary}
              autoFocus
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Initial Balance</Text>
            <TextInput
              style={styles.input}
              value={balance}
              onChangeText={setBalance}
              placeholder="₹0.00"
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity 
            style={[styles.saveButton, !name.trim() && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={!name.trim()}
          >
            <Text style={styles.saveButtonText}>Create Account</Text>
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
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: colors.text,
  },
  cancelText: {
    fontSize: fontSize.md,
    color: colors.primary,
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
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: fontSize.md,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.xl,
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
