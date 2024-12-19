"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Wallet, PieChart, Bell, Shield, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Gestion des Dépenses",
      description: "Suivez facilement vos dépenses et revenus quotidiens"
    },
    {
      icon: <PieChart className="w-6 h-6" />,
      title: "Analyses Détaillées",
      description: "Visualisez vos finances avec des graphiques clairs"
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Alertes Intelligentes",
      description: "Recevez des notifications pour vos objectifs"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Sécurité Maximale",
      description: "Vos données sont protégées et sécurisées"
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-b from-blue-600/5 via-purple-600/5 to-transparent pointer-events-none" />
      
      <nav className="relative z-50 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-500 p-[1px]">
              <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              MonBudget
            </span>
          </div>

          {/* Menu Desktop */}
          <div className="hidden sm:flex items-center gap-3">
            <Link 
              href="/sign-in"
              className="px-4 py-2 rounded-xl text-center text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              Connexion
            </Link>
            <Link 
              href="/sign-up"
              className="px-4 py-2 rounded-xl text-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-300"
            >
              Inscription
            </Link>
          </div>

          {/* Toggle Menu Mobile */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-xl hover:bg-white/10 transition-colors sm:hidden"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 p-4 bg-card/95 backdrop-blur-xl border-t border-white/10 sm:hidden"
          >
            <div className="flex flex-col gap-2">
              <Link 
                href="/sign-in"
                className="px-4 py-3 rounded-xl text-center text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Connexion
              </Link>
              <Link 
                href="/sign-up"
                className="px-4 py-3 rounded-xl text-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Inscription
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Overlay pour le menu mobile */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 sm:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <main className="relative z-10 px-4 py-8 sm:py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-4 sm:mb-6 px-4">
            Gérez vos finances en toute simplicité
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            Une application moderne pour suivre vos dépenses, analyser vos habitudes
            et atteindre vos objectifs financiers.
          </p>
          <Link 
            href="/sign-up"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium transition-all duration-300 group"
          >
            Commencer gratuitement
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/0 p-[1px]"
            >
              <div className="relative rounded-3xl bg-card/95 p-6 backdrop-blur-xl h-full">
                <div className="mb-4 p-3 rounded-xl bg-blue-500/10 w-fit text-blue-400">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 px-4">
          <div className="rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 p-[1px]">
            <div className="rounded-3xl bg-card/95 p-6 sm:p-8 backdrop-blur-xl">
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">
                Pourquoi choisir MonBudget ?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Interface intuitive et moderne",
                  "Analyses détaillées de vos dépenses",
                  "Objectifs d'épargne personnalisés",
                  "Notifications intelligentes",
                  "Sécurité de vos données garantie",
                  "Support réactif 7j/7"
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm sm:text-base">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}