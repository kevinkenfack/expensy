"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createBudget(data: {
  amount: number;
  month: number;
  year: number;
  categoryId: string;
}) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Non autorisé");
  }

  const user = await db.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    throw new Error("Utilisateur non trouvé");
  }

  const budget = await db.budget.create({
    data: {
      ...data,
      userId: user.id,
    },
  });

  revalidatePath("/dashboard");
  return budget;
}

export async function getBudgets(month: number, year: number) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Non autorisé");
  }

  const user = await db.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    throw new Error("Utilisateur non trouvé");
  }

  return db.budget.findMany({
    where: {
      userId: user.id,
      month,
      year,
    },
    include: {
      category: true,
    },
  });
} 