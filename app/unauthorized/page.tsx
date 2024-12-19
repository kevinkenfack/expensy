"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldX, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gradient-to-b from-blue-600/5 via-purple-600/5 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="rounded-3xl bg-gradient-to-br from-red-500/10 via-red-900/10 to-red-500/10 p-[1px]">
          <div className="rounded-3xl bg-card/95 p-6 sm:p-8 backdrop-blur-xl text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
              <ShieldX className="w-8 h-8 text-red-400" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">
              Accès Non Autorisé
            </h1>

            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Cette page est réservée aux utilisateurs connectés. 
              Veuillez vous connecter ou créer un compte pour accéder à votre tableau de bord.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sign-in"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white transition-all duration-300 group"
              >
                <LogIn className="w-5 h-5" />
                Se connecter
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/sign-up"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-300 group"
              >
                <UserPlus className="w-5 h-5" />
                Créer un compte
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <Link
              href="/"
              className="inline-block mt-8 text-sm text-gray-400 hover:text-white transition-colors"
            >
              ← Retour à l'accueil
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 rounded-2xl bg-white/5 p-4 text-sm text-gray-400 text-center"
        >
          Besoin d'aide ? 
          <a href="mailto:support@monbudget.fr" className="text-blue-400 hover:text-blue-300 ml-1">
            Contactez notre support
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
} 