import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST() {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const existingUser = await db.user.findUnique({
      where: { clerkId: user.id }
    });

    if (!existingUser) {
      await db.user.create({
        data: {
          clerkId: user.id,
          email: user.emailAddresses[0]?.emailAddress,
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
          imageUrl: user.imageUrl || null,
        }
      });
    } else {
      await db.user.update({
        where: { clerkId: user.id },
        data: {
          email: user.emailAddresses[0]?.emailAddress,
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
          imageUrl: user.imageUrl || null,
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de la synchronisation:', error);
    return new NextResponse("Erreur interne du serveur", { status: 500 });
  }
} 