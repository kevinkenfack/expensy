import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { TransactionType } from "@prisma/client"; // Ajout de l'import

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    // Récupérer les transactions de l'utilisateur
    const transactions = await db.transaction.findMany({
      where: {
        userId: userId
      }
    });

    // Calculer les statistiques
    const stats = {
      total: transactions.reduce((acc, t) => 
        t.type === TransactionType.INCOME ? acc + t.amount : acc - t.amount, 0
      ),
      income: transactions
        .filter(t => t.type === TransactionType.INCOME)
        .reduce((acc, t) => acc + t.amount, 0),
      expense: transactions
        .filter(t => t.type === TransactionType.EXPENSE)
        .reduce((acc, t) => acc + t.amount, 0),
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Erreur lors du calcul des statistiques:', error);
    return new NextResponse("Erreur interne du serveur", { status: 500 });
  }
}