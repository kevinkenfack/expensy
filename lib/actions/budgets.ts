"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createBudget({
  amount,
  categoryId,
}: {
  amount: number;
  categoryId: string;
}) {
  const session = await auth();
  const userId = session?.userId;

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
      amount,
      categoryId,
      userId: user.id,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    },
  });

  revalidatePath("/dashboard");
  return budget;
}

export async function getBudgets(month: number, year: number) {
  const session = await auth();
  const userId = session?.userId;

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