"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fr from 'date-fns/locale/fr';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'income' | 'expense';
}

const categories = {
  income: [
    { id: 1, name: 'Salaire', icon: '💰' },
    { id: 2, name: 'Freelance', icon: '💻' },
    { id: 3, name: 'Investissements', icon: '📈' },
    { id: 4, name: 'Autres revenus', icon: '💎' },
  ],
  expense: [
    { id: 1, name: 'Alimentation', icon: '🛒' },
    { id: 2, name: 'Transport', icon: '🚗' },
    { id: 3, name: 'Logement', icon: '🏠' },
    { id: 4, name: 'Loisirs', icon: '🎮' },
    { id: 5, name: 'Santé', icon: '🏥' },
    { id: 6, name: 'Éducation', icon: '📚' },
  ]
};

export default function TransactionModal({ isOpen, onClose, type }: TransactionModalProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique pour sauvegarder la transaction
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose} 
      />
      
      <div className="fixed inset-x-0 bottom-0 sm:inset-0 sm:flex sm:items-center sm:justify-center sm:p-4">
        <div className="relative w-full sm:max-w-lg transform transition-all duration-300 ease-out">
          <div className={`relative rounded-t-3xl sm:rounded-2xl bg-gradient-to-br 
            ${type === 'income' 
              ? 'from-emerald-500/20 via-emerald-900/20 to-emerald-500/20' 
              : 'from-red-500/20 via-red-900/20 to-red-500/20'} 
            p-[1px] shadow-2xl`}>
            <div className="relative bg-card/95 rounded-t-3xl sm:rounded-2xl backdrop-blur-xl">
              <div className="w-12 h-1 bg-white/10 rounded-full mx-auto my-3 sm:hidden" />
              
              <div className="px-6 sm:px-8 pb-6">
                <div className="flex items-center justify-between py-4 border-b border-white/5 mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    {type === 'income' ? 'Nouveau revenu' : 'Nouvelle dépense'}
                  </h2>
                  <button 
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-200">
                      Description
                    </label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Description de la transaction"
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 
                      focus:outline-none focus:ring-2 
                      ${type === 'income' 
                        ? 'focus:ring-emerald-500/30' 
                        : 'focus:ring-red-500/30'} 
                      transition-all duration-200`}
                    />
                    <p className="text-xs text-gray-400">Description (optionnel)</p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-200">
                      Montant
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0"
                      required
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 
                      focus:outline-none focus:ring-2 
                      ${type === 'income' 
                        ? 'focus:ring-emerald-500/30' 
                        : 'focus:ring-red-500/30'} 
                      transition-all duration-200`}
                    />
                    <p className="text-xs text-gray-400">Montant (requis)</p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-200">
                      Catégorie
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white 
                      focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-transparent transition-all duration-200
                      [&>option]:bg-background [&>option]:text-white"
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {categories[type].map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.icon} {cat.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-400">Sélectionnez une catégorie</p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-200">
                      Date
                    </label>
                    <DatePicker
                      selected={date}
                      onChange={(date) => setDate(date)}
                      locale={fr}
                      dateFormat="dd MMMM yyyy"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white 
                      focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-transparent transition-all duration-200"
                    />
                    <p className="text-xs text-gray-400">Date de la transaction</p>
                  </div>

                  <div className="flex gap-3 pt-6">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 
                      transition-all duration-200 text-white/80 hover:text-white font-medium"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className={`flex-1 px-4 py-3 rounded-xl bg-gradient-to-r 
                      ${type === 'income' 
                        ? 'from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400' 
                        : 'from-red-600 to-red-500 hover:from-red-500 hover:to-red-400'} 
                      transition-all duration-200 text-white font-medium shadow-lg`}
                    >
                      Créer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 