"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { transactionSchema, TransactionFormData } from "@/lib/validations/transaction";

export async function createTransaction({
  amount,
  type,
  date,
  description,
  categoryId,
}: {
  amount: number;
  type: "INCOME" | "EXPENSE";
  date: Date;
  description?: string;
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

  const transaction = await db.transaction.create({
    data: {
      amount,
      type,
      date,
      description,
      userId: user.id,
      categoryId,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/transactions");

  return transaction;
}

export async function getTransactions(params: {
  startDate?: Date;
  endDate?: Date;
  type?: "INCOME" | "EXPENSE";
  categoryId?: string;
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

  return db.transaction.findMany({
    where: {
      userId: user.id,
      date: {
        gte: params.startDate,
        lte: params.endDate,
      },
      type: params.type,
      categoryId: params.categoryId,
    },
    include: {
      category: true,
    },
    orderBy: {
      date: "desc",
    },
  });
}

export async function updateTransaction(
  id: string,
  data: Partial<TransactionFormData>
) {
  const session = await auth();
  const userId = session?.userId;

  if (!userId) {
    throw new Error("Non autorisé");
  }

  const transaction = await db.transaction.findUnique({
    where: { id },
    include: { user: true },
  });

  if (!transaction || transaction.user.clerkId !== userId) {
    throw new Error("Transaction non trouvée");
  }

  const updatedTransaction = await db.transaction.update({
    where: { id },
    data,
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/transactions");

  return updatedTransaction;
}

export async function deleteTransaction(id: string) {
  const session = await auth();
  const userId = session?.userId;

  if (!userId) {
    throw new Error("Non autorisé");
  }

  const transaction = await db.transaction.findUnique({
    where: { id },
    include: { user: true },
  });

  if (!transaction || transaction.user.clerkId !== userId) {
    throw new Error("Transaction non trouvée");
  }

  await db.transaction.delete({
    where: { id },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/transactions");
} 