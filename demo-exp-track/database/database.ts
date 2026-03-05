import * as SQLite from 'expo-sqlite';
import { SQLiteDatabase } from 'expo-sqlite';

export interface Account {
  id: number;
  name: string;
  balance: number;
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
  type: 'income' | 'expense';
}

export interface Transaction {
  id: number;
  account_id: number;
  category_id: number;
  amount: number;
  note: string;
  date: string;
  created_at: string;
  account_name?: string;
  category_name?: string;
  category_icon?: string;
  category_color?: string;
  category_type?: string;
}

const DATABASE_VERSION = 1;

export async function openDatabase(): Promise<SQLiteDatabase> {
  return SQLite.openDatabaseAsync('expense_tracker.db');
}

export async function migrateDbIfNeeded(db: SQLiteDatabase): Promise<void> {
  const result = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  const currentDbVersion = result?.user_version ?? 0;

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      
      CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        balance REAL DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        icon TEXT NOT NULL,
        color TEXT NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('income', 'expense'))
      );

      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        account_id INTEGER NOT NULL,
        category_id INTEGER NOT NULL,
        amount REAL NOT NULL,
        note TEXT DEFAULT '',
        date TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
        FOREIGN KEY (category_id) REFERENCES categories(id)
      );
    `);

    await seedCategories(db);
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  }
}

async function seedCategories(db: SQLiteDatabase): Promise<void> {
  const expenseCategories = [
    { name: 'Food', icon: '🍔', color: '#FFB74D' },
    { name: 'Transport', icon: '🚗', color: '#64B5F6' },
    { name: 'Shopping', icon: '🛍️', color: '#F06292' },
    { name: 'Bills', icon: '📄', color: '#BA68C8' },
    { name: 'Entertainment', icon: '🎬', color: '#4DB6AC' },
    { name: 'Health', icon: '💊', color: '#EF5350' },
  ];

  const incomeCategories = [
    { name: 'Salary', icon: '💰', color: '#66BB6A' },
    { name: 'Gift', icon: '🎁', color: '#AB47BC' },
    { name: 'Other', icon: '📦', color: '#42A5F5' },
  ];

  for (const cat of expenseCategories) {
    await db.runAsync('INSERT INTO categories (name, icon, color, type) VALUES (?, ?, ?, ?)', 
      cat.name, cat.icon, cat.color, 'expense');
  }

  for (const cat of incomeCategories) {
    await db.runAsync('INSERT INTO categories (name, icon, color, type) VALUES (?, ?, ?, ?)', 
      cat.name, cat.icon, cat.color, 'income');
  }
}

export async function getAccounts(db: SQLiteDatabase): Promise<Account[]> {
  return db.getAllAsync<Account>('SELECT * FROM accounts ORDER BY created_at DESC');
}

export async function createAccount(db: SQLiteDatabase, name: string, initialBalance: number = 0): Promise<number> {
  const result = await db.runAsync(
    'INSERT INTO accounts (name, balance) VALUES (?, ?)',
    name,
    initialBalance
  );
  return result.lastInsertRowId;
}

export async function getCategories(db: SQLiteDatabase, type?: 'income' | 'expense'): Promise<Category[]> {
  if (type) {
    return db.getAllAsync<Category>('SELECT * FROM categories WHERE type = ? ORDER BY name', type);
  }
  return db.getAllAsync<Category>('SELECT * FROM categories ORDER BY type, name');
}

export async function getTransactions(db: SQLiteDatabase): Promise<Transaction[]> {
  return db.getAllAsync<Transaction>(`
    SELECT 
      t.*,
      a.name as account_name,
      c.name as category_name,
      c.icon as category_icon,
      c.color as category_color,
      c.type as category_type
    FROM transactions t
    JOIN accounts a ON t.account_id = a.id
    JOIN categories c ON t.category_id = c.id
    ORDER BY t.date DESC, t.created_at DESC
  `);
}

export async function createTransaction(
  db: SQLiteDatabase,
  accountId: number,
  categoryId: number,
  amount: number,
  note: string,
  date: string
): Promise<number> {
  const category = await db.getFirstAsync<Category>('SELECT type FROM categories WHERE id = ?', categoryId);
  const isExpense = category?.type === 'expense';
  const signedAmount = isExpense ? -Math.abs(amount) : Math.abs(amount);

  await db.runAsync(
    'INSERT INTO transactions (account_id, category_id, amount, note, date) VALUES (?, ?, ?, ?, ?)',
    accountId, categoryId, signedAmount, note, date
  );

  await db.runAsync(
    'UPDATE accounts SET balance = balance + ? WHERE id = ?',
    signedAmount, accountId
  );

  const result = await db.getFirstAsync<{ id: number }>('SELECT last_insert_rowid() as id');
  return result?.id ?? 0;
}

export async function deleteTransaction(db: SQLiteDatabase, id: number): Promise<void> {
  const transaction = await db.getFirstAsync<{ amount: number; account_id: number }>(
    'SELECT amount, account_id FROM transactions WHERE id = ?',
    id
  );
  
  if (transaction) {
    // Reverse the amount in the account balance
    await db.runAsync(
      'UPDATE accounts SET balance = balance - ? WHERE id = ?',
      transaction.amount, transaction.account_id
    );
    await db.runAsync('DELETE FROM transactions WHERE id = ?', id);
  }
}

export async function deleteAccount(db: SQLiteDatabase, accountId: number): Promise<void> {
  await db.runAsync('DELETE FROM transactions WHERE account_id = ?', accountId);
  await db.runAsync('DELETE FROM accounts WHERE id = ?', accountId);
}
