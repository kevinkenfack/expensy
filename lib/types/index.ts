export type TransactionType = "INCOME" | "EXPENSE";

export interface Transaction {
  id: string;
  amount: number;
  description?: string;
  date: Date;
  type: TransactionType;
  categoryId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  type: TransactionType;
  color?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Budget {
  id: string;
  amount: number;
  month: number;
  year: number;
  categoryId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
} 