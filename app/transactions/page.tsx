"use client";

import { useState } from 'react';
import { 
  HomeIcon, 
  WalletIcon, 
  ChartBarIcon, 
  CogIcon, 
  Bars3Icon as MenuIcon, 
  XMarkIcon as XIcon, 
  TagIcon, 
  DocumentChartBarIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import { ArrowUpRight } from "lucide-react";
import Sidebar from "../components/Sidebar";

// Données de test pour les transactions
const transactions = [
  {
    id: 1,
    name: 'Salaire',
    category: 'Revenu',
    amount: '+2450,00 €',
    date: '2024-03-15',
    icon: '💰',
    type: 'income'
  },
  {
    id: 2,
    name: 'Courses Carrefour',
    category: 'Alimentation',
    amount: '-156,32 €',
    date: '2024-03-14',
    icon: '🛒',
    type: 'expense'
  },
  {
    id: 3,
    name: 'Netflix',
    category: 'Divertissement',
    amount: '-14,99 €',
    date: '2024-03-14',
    icon: '🎬',
    type: 'expense'
  },
  {
    id: 4,
    name: 'Freelance Design',
    category: 'Revenu',
    amount: '+850,00 €',
    date: '2024-03-13',
    icon: '💻',
    type: 'income'
  },
  {
    id: 5,
    name: 'Restaurant',
    category: 'Alimentation',
    amount: '-45,00 €',
    date: '2024-03-12',
    icon: '🍽️',
    type: 'expense'
  },
  // Ajoutez plus de transactions ici...
];

export default function Transactions() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('all'); // 'all', 'income', 'expense'
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrer les transactions
  const filteredTransactions = transactions.filter(transaction => {
    const matchesType = selectedType === 'all' || transaction.type === selectedType;
    const matchesSearch = transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-blue-600/5 via-purple-600/5 to-transparent pointer-events-none" />
      
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 right-4 z-50 p-2 rounded-xl bg-white/10 backdrop-blur-sm md:hidden"
      >
        {isMobileMenuOpen ? (
          <XIcon className="w-6 h-6" />
        ) : (
          <MenuIcon className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <Sidebar currentPath="/transactions" isMobileMenuOpen={isMobileMenuOpen} />

      {/* Main Content */}
      <main className="md:ml-64 p-4 md:p-8 pt-16 md:pt-8">
        <div className="max-w-6xl mx-auto">
          {/* En-tête */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-500 p-[1px]">
              <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                <WalletIcon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Historique des transactions
              </h1>
              <p className="text-sm text-gray-400">Consultez et filtrez vos transactions</p>
            </div>
          </div>

          {/* Filtres et Recherche */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Filtres */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2
                  ${selectedType === 'all' 
                    ? 'bg-white/10 text-white' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
              >
                <FunnelIcon className="w-5 h-5" />
                Tout
              </button>
              <button
                onClick={() => setSelectedType('income')}
                className={`px-4 py-2 rounded-xl transition-all duration-300
                  ${selectedType === 'income' 
                    ? 'bg-emerald-500/20 text-emerald-400' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
              >
                Revenus
              </button>
              <button
                onClick={() => setSelectedType('expense')}
                className={`px-4 py-2 rounded-xl transition-all duration-300
                  ${selectedType === 'expense' 
                    ? 'bg-red-500/20 text-red-400' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
              >
                Dépenses
              </button>
            </div>

            {/* Barre de recherche */}
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher une transaction..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>

          {/* Liste des transactions */}
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className={`rounded-3xl ${
                  transaction.type === 'income'
                    ? 'bg-gradient-to-br from-emerald-500/10 via-emerald-900/10 to-emerald-500/10'
                    : 'bg-gradient-to-br from-red-500/10 via-red-900/10 to-red-500/10'
                } p-[1px]`}
              >
                <div className="rounded-3xl bg-card p-6 backdrop-blur-xl">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                      transaction.type === 'income'
                        ? 'bg-emerald-500/10'
                        : 'bg-red-500/10'
                    }`}>
                      {transaction.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{transaction.name}</h3>
                      <p className="text-sm text-gray-400">{transaction.category}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${
                        transaction.type === 'income' 
                          ? 'text-emerald-400' 
                          : 'text-red-400'
                      }`}>
                        {transaction.amount}
                      </p>
                      <p className="text-sm text-gray-400">
                        {new Date(transaction.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Overlay pour mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
} 