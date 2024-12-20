"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/db";
import { useUser } from "@clerk/nextjs";

interface Stats {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  topCategories: Array<{
    name: string;
    total: number;
    percentage: number;
  }>;
}

export function useStats(startDate?: Date, endDate?: Date) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/stats', {
          method: 'POST',
          body: JSON.stringify({ startDate, endDate }),
        });
        
        if (!response.ok) throw new Error('Erreur lors du chargement des statistiques');
        
        const data = await response.json();
        setStats(data);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, [startDate, endDate]);

  return { stats, isLoading, error };
} 