"use client";

import { useState } from 'react';
import { HomeIcon, WalletIcon, ChartBarIcon, CogIcon, Bars3Icon as MenuIcon, XMarkIcon as XIcon, TagIcon, DocumentChartBarIcon, CheckIcon } from "@heroicons/react/24/outline";
import { ArrowUpRight } from "lucide-react";
import Sidebar from "../../components/Sidebar";

const currencies = [
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'USD', symbol: '$', name: 'Dollar américain' },
  { code: 'GBP', symbol: '£', name: 'Livre sterling' },
  { code: 'JPY', symbol: '¥', name: 'Yen japonais' },
  { code: 'CHF', symbol: 'CHF', name: 'Franc suisse' },
  { code: 'CAD', symbol: 'C$', name: 'Dollar canadien' },
  { code: 'AUD', symbol: 'A$', name: 'Dollar australien' },
  { code: 'CNY', symbol: '¥', name: 'Yuan chinois' },
];

export default function Settings() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCurrencyChange = (currencyCode: string) => {
    setSelectedCurrency(currencyCode);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

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
      <Sidebar currentPath="/settings" isMobileMenuOpen={isMobileMenuOpen} />

      {/* Main Content */}
      <main className="md:ml-64 p-4 md:p-8 pt-16 md:pt-8">
        <div className="max-w-6xl mx-auto">
          {/* En-tête */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-500 p-[1px]">
              <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                <CogIcon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Paramètres
              </h1>
              <p className="text-sm text-gray-400">Personnalisez votre expérience</p>
            </div>
          </div>

          {/* Message de succès */}
          {showSuccess && (
            <div className="fixed bottom-4 right-4 bg-emerald-500/90 text-white px-4 py-2 rounded-xl flex items-center gap-2 backdrop-blur-sm">
              <CheckIcon className="w-5 h-5" />
              <span>Devise mise à jour avec succès</span>
            </div>
          )}

          {/* Section Devise */}
          <div className="rounded-3xl bg-card border border-border p-6">
            <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">
              Devise
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currencies.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => handleCurrencyChange(currency.code)}
                  className={`group relative overflow-hidden rounded-2xl p-4 transition-all duration-300 
                    ${selectedCurrency === currency.code 
                      ? 'bg-white/10 border-2 border-blue-500/50' 
                      : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{currency.name}</p>
                      <p className="text-sm text-gray-400">{currency.code}</p>
                    </div>
                    <div className="text-2xl">{currency.symbol}</div>
                  </div>
                  {selectedCurrency === currency.code && (
                    <div className="absolute top-2 right-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <CheckIcon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Autres sections */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-3xl bg-card border border-border p-6">
              <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">
                Préférences
              </h2>
              <p className="text-gray-400">
                Les options de personnalisation seront bientôt disponibles...
              </p>
            </div>

            <div className="rounded-3xl bg-card border border-border p-6">
              <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">
                Notifications
              </h2>
              <p className="text-gray-400">
                Les paramètres de notification seront bientôt disponibles...
              </p>
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
    </div>
  );
} 