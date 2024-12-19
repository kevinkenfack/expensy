import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { Suspense } from 'react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mon Budget - Gérez vos finances",
  description: "Application de gestion de budget personnelle",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="fr">
        <body className={inter.className}>
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}
