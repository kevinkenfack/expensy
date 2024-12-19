import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const user = await db.user.upsert({
      where: { clerkId: userId },
      update: {},
      create: { clerkId: userId },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("[USER_SYNC]", error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
} 