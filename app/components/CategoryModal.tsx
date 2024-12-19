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

  const modalColor = type === 'income' ? 'emerald' : 'red';
  const bgColor = type === 'income' 
    ? 'bg-gradient-to-r from-emerald-600 to-emerald-500' 
    : 'bg-gradient-to-r from-red-600 to-red-500';
  const hoverBgColor = type === 'income'
    ? 'hover:from-emerald-700 hover:to-emerald-600'
    : 'hover:from-red-700 hover:to-red-600';

  return (
    <div className="fixed inset-0 z-50">
      <div 
        className={`fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose} 
      />
      
      <div className="fixed inset-x-0 bottom-0 sm:inset-0 sm:flex sm:items-center sm:justify-center sm:p-4">
        <div 
          className={`relative w-full sm:max-w-lg transform transition-all duration-300 ease-out ${
            isOpen ? 'translate-y-0' : 'translate-y-full'
          } sm:translate-y-0 sm:opacity-100`}
        >
          <div className={`relative rounded-t-3xl sm:rounded-2xl bg-gradient-to-br from-${modalColor}-500/20 via-${modalColor}-900/20 to-${modalColor}-500/20 p-[1px] shadow-xl`}>
            <div className="relative bg-card/95 rounded-t-3xl sm:rounded-2xl backdrop-blur-xl">
              <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto my-4 sm:hidden" />
              
              <div className="px-4 sm:px-6 pb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    {type === 'income' ? 'Nouvelle catégorie de revenu' : 'Nouvelle catégorie de dépense'}
                  </h2>
                  <button 
                    onClick={onClose}
                    className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-gray-400 mb-6">Les catégories permettent de regrouper vos transactions</p>

                <form onSubmit={handleSubmit} className="space-y-5">
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
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                    <p className="text-xs text-gray-400">C'est ainsi que votre catégorie apparaîtra dans l'application</p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-200">
                      Icône
                    </label>
                    <div className="grid grid-cols-8 gap-2 p-4 rounded-xl bg-white/10 border border-white/10">
                      {icons.map((icon) => (
                        <button
                          key={icon}
                          type="button"
                          onClick={() => setSelectedIcon(icon)}
                          className={`aspect-square rounded-lg flex items-center justify-center text-xl hover:bg-white/10 transition-colors ${
                            selectedIcon === icon ? 'bg-white/20 ring-2 ring-blue-500' : ''
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">C'est ainsi que votre catégorie apparaîtra dans l'application</p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-4 py-3 rounded-xl bg-white/15 hover:bg-white/25 transition-colors text-white font-medium"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className={`flex-1 px-4 py-3 rounded-xl ${bgColor} ${hoverBgColor} transition-all duration-300 text-white font-medium shadow-lg`}
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