import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EXPENSY - Gérez vos finances",
  description: "Application de gestion de finances personnelles",
};

export const viewport: Viewport = {
  themeColor: '#1e1b4b',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="fr">
        <body className={`${inter.className} min-h-screen bg-background text-white`}>
          {children}
          <div className="md:pl-64">
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
