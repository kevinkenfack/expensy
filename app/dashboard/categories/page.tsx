"use client";

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getCategories } from '@/lib/actions/categories';
import CategoryModal from '../../components/CategoryModal';
import Sidebar from '../../components/Sidebar';
import { Category } from '@prisma/client';
import { Bars3Icon as MenuIcon, XMarkIcon as XIcon } from "@heroicons/react/24/outline";
import LoadingCategories from "@/components/LoadingCategories";

export default function Categories() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryType, setCategoryType] = useState<'income' | 'expense'>('income');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        toast.error("Erreur lors du chargement des catégories");
      } finally {
        setIsLoading(false);
      }
    }

    loadCategories();
  }, []);

  const handleCreateCategory = async (data: {
    name: string;
    icon: string;
    type: "INCOME" | "EXPENSE";
  }) => {
    try {
      // Appel à l'action de création
      await createCategory(data);
      toast.success("Catégorie créée avec succès");
      // Recharger les catégories
      const updatedCategories = await getCategories();
      setCategories(updatedCategories);
      setIsCategoryModalOpen(false);
    } catch (error) {
      toast.error("Erreur lors de la création de la catégorie");
    }
  };

  const expenseCategories = categories.filter(cat => cat.type === 'EXPENSE');
  const incomeCategories = categories.filter(cat => cat.type === 'INCOME');

  const openCategoryModal = (type: 'income' | 'expense') => {
    setCategoryType(type);
    setIsCategoryModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar currentPath="/categories" isMobileMenuOpen={isMobileMenuOpen} />
        <main className="md:ml-64 p-4 md:p-8 pt-16 md:pt-8">
          <LoadingCategories />
        </main>
      </div>
    );
  }

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

      <Sidebar currentPath="/categories" isMobileMenuOpen={isMobileMenuOpen} />

      <main className="md:ml-64 p-4 md:p-8 pt-16 md:pt-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Catégories
              </h1>
              <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => openCategoryModal('income')}
                  className="flex-1 sm:flex-none group relative overflow-hidden px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 hover:from-emerald-500/30 hover:to-emerald-600/30 text-emerald-400 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Nouvelle catégorie de revenu</span>
                  <span className="text-xl">💰</span>
                </button>
                
                <button 
                  onClick={() => openCategoryModal('expense')}
                  className="flex-1 sm:flex-none group relative overflow-hidden px-4 py-2 rounded-xl bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 text-red-400 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Nouvelle catégorie de dépense</span>
                  <span className="text-xl">💸</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Catégories de dépenses */}
            <div className="rounded-3xl bg-gradient-to-br from-red-500/10 via-red-900/10 to-red-500/10 p-[1px]">
              <div className="rounded-3xl bg-card p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Catégories de d��penses
                  </h2>
                  <span className="px-3 py-1 rounded-full text-sm bg-red-500/10 text-red-400">
                    {expenseCategories.length}
                  </span>
                </div>
                <div className="space-y-4">
                  {expenseCategories.map((category) => (
                    <div
                      key={category.id}
                      className="group relative overflow-hidden rounded-2xl bg-white/5 p-4 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-lg">
                          {category.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{category.name}</h3>
                          <p className="text-sm text-gray-400">{category.count} transactions</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Catégories de revenus */}
            <div className="rounded-3xl bg-gradient-to-br from-emerald-500/10 via-emerald-900/10 to-emerald-500/10 p-[1px]">
              <div className="rounded-3xl bg-card p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Catégories de revenus
                  </h2>
                  <span className="px-3 py-1 rounded-full text-sm bg-emerald-500/10 text-emerald-400">
                    {incomeCategories.length}
                  </span>
                </div>
                <div className="space-y-4">
                  {incomeCategories.map((category) => (
                    <div
                      key={category.id}
                      className="group relative overflow-hidden rounded-2xl bg-white/5 p-4 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-lg">
                          {category.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{category.name}</h3>
                          <p className="text-sm text-gray-400">{category.count} transactions</p>
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

      {/* Overlay pour mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        type={categoryType}
      />
    </div>
  );
} 