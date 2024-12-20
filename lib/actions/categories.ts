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

export async function getCategories() {
  try {
    const { userId } = auth();
    console.log("Getting categories for user:", userId);

    if (!userId) {
      console.log("No userId found in auth");
      throw new Error("Non autorisé");
    }

    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });

    console.log("Found user:", user);

    if (!user) {
      console.log("No user found in database");
      throw new Error("Utilisateur non trouvé");
    }

    const categories = await db.category.findMany({
      where: {
        userId: user.id,
        isArchived: false,
      },
      orderBy: {
        name: 'asc',
      },
    });

    console.log("Found categories:", categories);
    return categories;
  } catch (error) {
    console.error("Error in getCategories:", error);
    throw error;
  }
}

export async function archiveCategory(id: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Non autorisé");
  }

  const category = await db.category.findUnique({
    where: { id },
    include: { user: true },
  });

  if (!category || category.user.clerkId !== userId) {
    throw new Error("Catégorie non trouvée");
  }

  await db.category.update({
    where: { id },
    data: { isArchived: true },
  });

  revalidatePath("/dashboard/categories");
} 