"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'income' | 'expense';
}

const icons = ['💰', '💳', '🏠', '🚗', '🍔', '🎮', '🏥', '📚', '✈️', '🛒', '💻', '🎵', '🎬', '👕', '💄', '🏋️‍♂️', '📱', '🎁', '🏦', '💼'];

export default function CategoryModal({ isOpen, onClose, type }: CategoryModalProps) {
  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');

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
    // Logique pour sauvegarder la catégorie
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
                    {type === 'income' ? 'Nouvelle catégorie de revenu' : 'Nouvelle catégorie de dépense'}
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
                      Nom
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nom de la catégorie"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 
                      focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-transparent transition-all duration-200"
                    />
                    <p className="text-xs text-gray-400">C'est ainsi que votre catégorie apparaîtra dans l'application</p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-200">
                      Icône
                    </label>
                    <div className="grid grid-cols-8 gap-2.5 p-4 rounded-xl bg-white/5 border border-white/10">
                      {icons.map((icon) => (
                        <button
                          key={icon}
                          type="button"
                          onClick={() => setSelectedIcon(icon)}
                          className={`aspect-square rounded-lg flex items-center justify-center text-xl
                            ${selectedIcon === icon 
                              ? type === 'income'
                                ? 'bg-emerald-500/20 ring-2 ring-emerald-500/50'
                                : 'bg-red-500/20 ring-2 ring-red-500/50'
                              : 'hover:bg-white/10'} 
                            transition-all duration-200`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">Choisissez une icône pour votre catégorie</p>
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