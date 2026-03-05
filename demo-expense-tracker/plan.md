# Expense Tracker App Plan

## Tech Stack
- Expo (SDK 55)
- Expo SQLite for local database
- Expo Router for navigation
- React Native

## Theme
- Light mode only
- Background: White (#FFFFFF)
- Primary: Pastel Blue (#89CFF0 / #B5D8EB)
- Text: Dark (#1A1A1A)
- Secondary text: Gray (#666666)
- Accent: Pastel Blue

## Database Schema (SQLite)

### accounts
- id (INTEGER PRIMARY KEY)
- name (TEXT)
- balance (REAL DEFAULT 0)
- created_at (TEXT)

### categories
- id (INTEGER PRIMARY KEY)
- name (TEXT)
- icon (TEXT)
- color (TEXT)
- type (TEXT) - 'income' | 'expense'

### transactions
- id (INTEGER PRIMARY KEY)
- account_id (INTEGER FOREIGN KEY)
- category_id (INTEGER FOREIGN KEY)
- amount (REAL)
- note (TEXT)
- date (TEXT)
- created_at (TEXT)

## App Structure

### Navigation
- Bottom Tab Navigator with 2 tabs:
  1. Transactions (default) - list grouped by date
  2. Accounts - manage accounts

### Screens

#### Transactions Tab
- **TransactionListScreen**: Home screen showing transactions grouped by date
  - Header with title
  - FAB to add new transaction
  - Grouped list by date (Today, Yesterday, etc.)
  - Each item shows: category icon, note, amount, time

#### Accounts Tab
- **AccountsScreen**: List of accounts with balances
  - Header with title
  - FAB to add new account
  - List of accounts with balance

#### Modals
- **AddTransactionModal**: Form to add transaction
  - Select account
  - Select category
  - Enter amount
  - Add note (optional)
  - Date picker
- **AddAccountModal**: Form to add account
  - Account name
  - Initial balance

### Default Categories (seeded)
- Expense: Food, Transport, Shopping, Bills, Entertainment, Health
- Income: Salary, Gift, Other

## Implementation Steps
1. Install expo-sqlite
2. Create database helper with migrations
3. Create theme constants
4. Create SafeArea wrapper
5. Create Bottom Tab Navigator
6. Create TransactionListScreen with grouped list
7. Create AccountsScreen
8. Create AddTransactionModal
9. Create AddAccountModal
10. Seed default categories
