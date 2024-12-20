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
      throw new Error('CLERK_WEBHOOK_SECRET manquant');
    }

    const headersList = await headers();
    const svix_id = headersList.get("svix-id") ?? '';
    const svix_timestamp = headersList.get("svix-timestamp") ?? '';
    const svix_signature = headersList.get("svix-signature") ?? '';

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new NextResponse('Headers manquants', { status: 400 });
    }

    const headerPayload = {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature
    };

    const payload = await req.json();
    if (!payload) {
      console.error('Payload manquant');
      return new NextResponse('Payload manquant', { status: 400 });
    }

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt: WebhookEvent;

    try {
      evt = wh.verify(JSON.stringify(payload), headerPayload) as WebhookEvent;
    } catch (err) {
      console.error('Erreur de vérification webhook:', err);
      return new NextResponse('Signature invalide', { status: 400 });
    }

    const eventType = evt.type;
    console.log('Type d\'événement:', eventType);

    if (eventType === 'user.created') {
      const { id, email_addresses, first_name, last_name } = evt.data;
      
      const existingUser = await db.user.findUnique({
        where: { clerkId: id },
      });

      if (existingUser) {
        return NextResponse.json({ message: 'Utilisateur déjà existant' });
      }

      const user = await db.user.create({
        data: {
          clerkId: id,
          email: email_addresses?.[0]?.email_address,
          name: `${first_name || ''} ${last_name || ''}`.trim(),
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

      console.log('Utilisateur créé:', user.id);
      console.log('Catégories créées:', user.categories.length);

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ message: 'Webhook traité' });
  } catch (error) {
    console.error('Erreur webhook:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur inconnue' }, 
      { status: 500 }
    );
  }
}