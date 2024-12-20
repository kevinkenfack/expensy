import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

const defaultCategories = [
  { name: 'Salaire', icon: '💰', type: 'INCOME', isDefault: true },
  { name: 'Freelance', icon: '💻', type: 'INCOME', isDefault: true },
  { name: 'Investissements', icon: '📈', type: 'INCOME', isDefault: true },
  { name: 'Alimentation', icon: '🛒', type: 'EXPENSE', isDefault: true },
  { name: 'Transport', icon: '🚗', type: 'EXPENSE', isDefault: true },
  { name: 'Logement', icon: '🏠', type: 'EXPENSE', isDefault: true },
  { name: 'Loisirs', icon: '🎮', type: 'EXPENSE', isDefault: true },
  { name: 'Santé', icon: '🏥', type: 'EXPENSE', isDefault: true },
  { name: 'Shopping', icon: '🛍️', type: 'EXPENSE', isDefault: true },
];

export async function POST(req: Request) {
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
      throw new Error('CLERK_WEBHOOK_SECRET is not set');
    }

    // Récupérer les headers de manière asynchrone
    const headersList = headers();
    const svix_id = headersList.get("svix-id");
    const svix_timestamp = headersList.get("svix-timestamp");
    const svix_signature = headersList.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new NextResponse('Headers manquants', { status: 400 });
    }

    // Vérifier que le payload n'est pas null
    const payload = await req.json();
    if (!payload) {
      return new NextResponse('Payload invalide', { status: 400 });
    }

    const body = JSON.stringify(payload);
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error('Erreur de vérification webhook:', err);
      return new NextResponse('Erreur de vérification', { status: 400 });
    }

    const eventType = evt.type;

    if (eventType === 'user.created') {
      console.log('Création utilisateur:', evt.data.id);
      
      const user = await db.user.create({
        data: {
          clerkId: evt.data.id,
          categories: {
            create: defaultCategories.map(cat => ({
              ...cat,
              type: cat.type as 'INCOME' | 'EXPENSE'
            })),
          },
        },
        include: {
          categories: true,
        },
      });

      console.log('Catégories créées:', user.categories);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur webhook:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 