"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Wallet, PieChart, Bell, Shield, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Effets de fond */}
      <div className="fixed inset-0 bg-gradient-to-b from-blue-600/5 via-purple-600/5 to-transparent pointer-events-none" />
      <div className="fixed inset-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 h-20 border-b border-white/10 bg-background/50 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            EXPENSY
          </div>
          <Link 
            href="/sign-in" 
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium 
            hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg shadow-purple-500/25"
          >
            Commencer
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent mb-6 leading-tight">
            Gérez vos finances<br />en toute simplicité
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            L&apos;application qui simplifie la gestion de vos finances
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/sign-up" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium 
              hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2"
            >
              Créer un compte gratuit
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <Link 
              href="/about" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 text-white font-medium 
              hover:bg-white/10 transition-all duration-200 flex items-center justify-center"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">
            Une interface moderne et intuitive
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Visualisez et gérez vos finances en un coup d'œil
          </p>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="relative rounded-2xl border border-white/10 shadow-2xl overflow-hidden group">
            {/* Barre de navigation */}
            <div className="border-b border-white/10 bg-black/40 px-4 h-12 flex items-center justify-between backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="text-sm text-gray-400">app.expensy.fr</div>
            </div>

            {/* Image avec effets */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-40 
                group-hover:opacity-20 transition-opacity duration-500" />
              <Image 
                src="/preview.png" 
                alt="Aperçu de EXPENSY" 
                width={1200}
                height={800}
                className="w-full h-auto transform group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Suivi en temps réel",
              description: "Visualisez vos dépenses et revenus instantanément",
              icon: "📊"
            },
            {
              title: "Analyses détaillées",
              description: "Comprenez vos habitudes financières grâce à des graphiques clairs",
              icon: "📈"
            },
            {
              title: "Catégorisation intelligente",
              description: "Organisez vos transactions automatiquement",
              icon: "🏷️"
            }
          ].map((feature, i) => (
            <div 
              key={i}
              className="rounded-2xl bg-gradient-to-br from-white/5 to-white/0 p-[1px] group hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300"
            >
              <div className="rounded-2xl bg-card p-6 h-full backdrop-blur-sm">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">
            Prêt à mieux gérer vos finances ?
          </h2>
          <p className="text-gray-400 mb-8">
            Rejoignez des milliers d'utilisateurs qui font confiance à EXPENSY pour leur gestion financière.
          </p>
          <Link 
            href="/sign-up" 
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 
            text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 
            shadow-lg shadow-purple-500/25"
          >
            Commencer gratuitement
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}