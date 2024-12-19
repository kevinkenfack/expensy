"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateUserCurrency(currency: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Non autorisé");
  }

  const user = await db.user.update({
    where: { clerkId: userId },
    data: { currency },
  });

  revalidatePath("/dashboard");
  return user;
}

export async function getUserSettings() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Non autorisé");
  }

  const user = await db.user.findUnique({
    where: { clerkId: userId },
    select: {
      currency: true,
    },
  });

  return user;
} 