export interface User {
  email: string;
}

export interface Transaction {
  id: string;
  date: string;
  desc: string;
  amount: number;
  category: string;
  refCode: string;
}

export interface QuickAction {
  id: string;
  label: string;
  iconName: string;
}

export interface MockData {
  bank: string;
  accountName: string;
  accountNoMasked: string;
  owner: string;
  status: string;
  balance: number;
  available: number;
  lastUpdated: string;
  actions: QuickAction[];
  transactions: Transaction[];
}