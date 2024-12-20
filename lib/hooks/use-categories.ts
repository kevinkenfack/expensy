"use client";

import { useCallback, useState } from "react";
import { createCategory } from "@/lib/actions/categories";

export function useCategories() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateCategory = useCallback(async (data: {
    name: string;
    icon: string;
    type: "INCOME" | "EXPENSE";
    color?: string;
  }) => {
    try {
      setIsLoading(true);
      setError(null);
      await createCategory(data);
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
    createCategory: handleCreateCategory,
  };
} 