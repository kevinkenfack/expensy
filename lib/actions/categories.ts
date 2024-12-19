"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createCategory(data: {
  name: string;
  icon: string;
  type: "INCOME" | "EXPENSE";
  color?: string;
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

  const category = await db.category.create({
    data: {
      ...data,
      userId: user.id,
    },
  });

  revalidatePath("/dashboard/categories");
  return category;
} 