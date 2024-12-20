"use client";

import { useCallback, useState } from "react";
import { createTransaction, deleteTransaction, updateTransaction } from "@/lib/actions/transactions";
import { TransactionFormData } from "@/lib/validations/transaction";

export function useTransactions() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateTransaction = useCallback(async (data: TransactionFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      await createTransaction(data);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleUpdateTransaction = useCallback(async (id: string, data: Partial<TransactionFormData>) => {
    try {
      setIsLoading(true);
      setError(null);
      await updateTransaction(id, data);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDeleteTransaction = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await deleteTransaction(id);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    createTransaction: handleCreateTransaction,
    updateTransaction: handleUpdateTransaction,
    deleteTransaction: handleDeleteTransaction,
  };
} 