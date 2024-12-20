"use client";

import { useState } from 'react';
import { 
  TagIcon,
  XMarkIcon as XIcon,
  Bars3Icon as MenuIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "../../components/Sidebar";
import CategoryModal from "../../components/CategoryModal";

// Données fictives pour les catégories
const dummyCategories = {
  income: [
    { id: 1, name: 'Salaire', icon: '💰', transactions: 12, total: '29.400,00 €' },
    { id: 2, name: 'Freelance', icon: '💻', transactions: 8, total: '6.800,00 €' },
    { id: 3, name: 'Investissements', icon: '📈', transactions: 4, total: '2.150,00 €' },
    { id: 4, name: 'Location', icon: '🏠', transactions: 6, total: '4.800,00 €' },
    { id: 5, name: 'Dividendes', icon: '💎', transactions: 2, total: '1.200,00 €' },
  ],
  expense: [
    { id: 6, name: 'Alimentation', icon: '🛒', transactions: 45, total: '1.250,00 €' },
    { id: 7, name: 'Transport', icon: '🚗', transactions: 15, total: '450,00 €' },
    { id: 8, name: 'Logement', icon: '🏠', transactions: 3, total: '1.800,00 €' },
    { id: 9, name: 'Loisirs', icon: '🎮', transactions: 12, total: '350,00 €' },
    { id: 10, name: 'Santé', icon: '🏥', transactions: 4, total: '180,00 €' },
    
  ]
};

export default function Categories() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'income' | 'expense'>('expense');

  const openModal = (type: 'income' | 'expense') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 bg-gradient-to-b from-blue-600/5 via-purple-600/5 to-transparent pointer-events-none" />
      
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 right-4 z-50 p-2 rounded-xl bg-white/10 backdrop-blur-sm md:hidden"
      >
        {isMobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
      </button>

      <Sidebar currentPath="/categories" isMobileMenuOpen={isMobileMenuOpen} />

      <main className="md:ml-64 p-4 md:p-8 pt-16 md:pt-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* En-tête */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-500 p-[1px]">
              <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                <TagIcon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Catégories
              </h1>
              <p className="text-sm text-gray-400">Gérez vos catégories de transactions</p>
            </div>
          </div>

          {/* Dépenses et Revenus */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Bloc Dépenses */}
            <div className="rounded-3xl bg-gradient-to-br from-red-500/10 via-red-900/10 to-red-500/10 p-[1px]">
              <div className="rounded-3xl bg-card p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Dépenses
                  </h2>
                  <button
                    onClick={() => openModal('expense')}
                    className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 
                    text-red-400 transition-all duration-200 flex items-center gap-2"
                  >
                    <PlusIcon className="w-5 h-5" />
                    <span className="hidden sm:inline">Nouvelle catégorie</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {dummyCategories.expense.map((category) => (
                    <div
                      key={category.id}
                      className="group relative overflow-hidden rounded-2xl bg-white/5 p-4 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-lg">
                          {category.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{category.name}</h3>
                          <p className="text-sm text-gray-400">{category.transactions} transactions</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-medium text-red-400">{category.total}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bloc Revenus */}
            <div className="rounded-3xl bg-gradient-to-br from-emerald-500/10 via-emerald-900/10 to-emerald-500/10 p-[1px]">
              <div className="rounded-3xl bg-card p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Revenus
                  </h2>
                  <button
                    onClick={() => openModal('income')}
                    className="px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 
                    text-emerald-400 transition-all duration-200 flex items-center gap-2"
                  >
                    <PlusIcon className="w-5 h-5" />
                    <span className="hidden sm:inline">Nouvelle catégorie</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {dummyCategories.income.map((category) => (
                    <div
                      key={category.id}
                      className="group relative overflow-hidden rounded-2xl bg-white/5 p-4 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-lg">
                          {category.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{category.name}</h3>
                          <p className="text-sm text-gray-400">{category.transactions} transactions</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-medium text-emerald-400">{category.total}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
      />

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
} 