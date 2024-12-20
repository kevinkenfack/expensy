import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { Suspense } from 'react';
import { Toaster } from 'sonner';

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
          <Toaster 
            position="top-center"
            toastOptions={{
              style: {
                background: 'rgba(20, 20, 20, 0.8)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)',
              },
              className: 'rounded-xl',
            }}
            theme="dark"
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
