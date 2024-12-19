import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const { startDate, endDate } = await req.json();

    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return new NextResponse("Utilisateur non trouvé", { status: 404 });
    }

    const [income, expenses] = await Promise.all([
      db.transaction.aggregate({
        where: {
          userId: user.id,
          type: "INCOME",
          date: {
            gte: startDate ? new Date(startDate) : undefined,
            lte: endDate ? new Date(endDate) : undefined,
          },
        },
        _sum: {
          amount: true,
        },
      }),
      db.transaction.aggregate({
        where: {
          userId: user.id,
          type: "EXPENSE",
          date: {
            gte: startDate ? new Date(startDate) : undefined,
            lte: endDate ? new Date(endDate) : undefined,
          },
        },
        _sum: {
          amount: true,
        },
      }),
    ]);

    const totalIncome = income._sum.amount || 0;
    const totalExpenses = expenses._sum.amount || 0;
    const balance = totalIncome - totalExpenses;

    return NextResponse.json({
      totalIncome,
      totalExpenses,
      balance,
    });
  } catch (error) {
    console.error("[STATS]", error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
} 