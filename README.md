# AfriPay Frontend Assessment – Transaction Dashboard

A React + TypeScript application for managing and tracking financial transactions (credits and debits).  
Users can add, edit, delete, filter, and export transactions with persistent storage and global state using the Context API.

No UI library used, all UIs built from scratch

---

## 🚀 Setup Instructions

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

---

## Component Structure

- **TransactionDashboard.tsx** – Main dashboard view combining all components.
- **TransactionFormModal.tsx** – Form to add and edit transaction.
- **TransactionsList.tsx** – Renders transaction table.
- **TransactionsOverviewStats.tsx** – Shows credit/debit summaries.
- **TransactionFilters.tsx** – Handles filtering logic.
- **useTransactions.ts** – Custom hook for CRUD operations with localStorage.
- **TransactionsContext** - Global provider using Context API provided by React.
- **Reusable UI Components** – Generic Button, Input, TextArea, Select, Badge.

---

## Design Decisions

- Tailwind CSS for modern, responsive design.
- Reusable UI components to maintain consistent style and structure.
- Custom hook `useTransactions()` for clean, isolated transaction logic.
- `TransactionsContext` ensures consistent state across the dashboard, lists, and forms without prop drilling.
- CSV export via lightweight utility.

Deployed url [https://transactions-dashboard-y887.onrender.com](https://transactions-dashboard-y887.onrender.com)

