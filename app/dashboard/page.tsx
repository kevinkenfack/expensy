"use client";

import { HomeIcon, WalletIcon, ChartBarIcon, CogIcon, Bars3Icon as MenuIcon, XMarkIcon as XIcon, TagIcon, DocumentChartBarIcon } from "@heroicons/react/24/outline";
import { ArrowUpRight, Calendar } from "lucide-react";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fr } from 'date-fns/locale/fr';
import { format } from 'date-fns';
import Sidebar from "../components/Sidebar";
import TransactionModal from '../components/TransactionModal';

// Enregistrer la locale française
registerLocale('fr', fr);

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('income');

  const chartData = [
    { name: 'Jan', dépenses: 2400, revenus: 4000 },
    { name: 'Fév', dépenses: 1398, revenus: 3000 },
    { name: 'Mar', dépenses: 9800, revenus: 2000 },
    { name: 'Avr', dépenses: 3908, revenus: 2780 },
    { name: 'Mai', dépenses: 4800, revenus: 1890 },
    { name: 'Juin', dépenses: 3800, revenus: 2390 },
  ];

  const openTransactionModal = (type: 'income' | 'expense') => {
    setTransactionType(type);
    setIsTransactionModalOpen(true);
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
      <Sidebar currentPath="/" isMobileMenuOpen={isMobileMenuOpen} />

      {/* Main Content */}
      <main className="md:ml-64 p-4 md:p-8 pt-16 md:pt-8">
        <div className="max-w-6xl mx-auto">
          {/* Header avec boutons */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Tableau de bord
              </h1>
              {/* Boutons plus responsifs */}
              <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => openTransactionModal('income')}
                  className="flex-1 sm:flex-none group relative overflow-hidden px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 hover:from-emerald-500/30 hover:to-emerald-600/30 text-emerald-400 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span className="hidden sm:inline">Nouveau revenu</span>
                  <span className="sm:hidden">Revenu</span>
                  <span className="text-xl">🤑</span>
                </button>
                
                <button 
                  onClick={() => openTransactionModal('expense')}
                  className="flex-1 sm:flex-none group relative overflow-hidden px-4 py-2 rounded-xl bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 text-red-400 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span className="hidden sm:inline">Nouvelle dépense</span>
                  <span className="sm:hidden">Dépense</span>
                  <span className="text-xl">😤</span>
                </button>
              </div>
            </div>

            {/* Sélecteur de dates plus responsive */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-4 rounded-2xl bg-card border border-border gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div className="flex items-center gap-2 w-full">
                  <DatePicker
                    selectsRange={true}
                    startDate={dateRange[0]}
                    endDate={dateRange[1]}
                    onChange={(update: [Date | null, Date | null]) => setDateRange(update)}
                    locale="fr"
                    dateFormat="dd MMM yyyy"
                    className="bg-transparent border-none text-white focus:outline-none cursor-pointer w-full"
                    customInput={
                      <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-white/5 transition-colors w-full">
                        <span className="text-sm sm:text-base truncate">
                          {startDate && format(startDate, 'dd MMM yyyy', { locale: fr })}
                          {endDate && endDate !== startDate ? 
                            ` - ${format(endDate, 'dd MMM yyyy', { locale: fr })}` : 
                            ''}
                        </span>
                      </button>
                    }
                  />
                </div>
              </div>
              {/* Boutons de période plus responsifs */}
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <button 
                  onClick={() => setDateRange([new Date(), new Date()])}
                  className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors text-sm whitespace-nowrap"
                >
                  Aujourd&apos;hui
                </button>
                <button 
                  onClick={() => {
                    const end = new Date();
                    const start = new Date();
                    start.setDate(start.getDate() - 7);
                    setDateRange([start, end]);
                  }}
                  className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors text-sm whitespace-nowrap"
                >
                  7 jours
                </button>
                <button 
                  onClick={() => {
                    const end = new Date();
                    const start = new Date();
                    start.setMonth(start.getMonth() - 1);
                    setDateRange([start, end]);
                  }}
                  className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors text-sm whitespace-nowrap"
                >
                  30 jours
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { title: 'Solde Total', value: '12 345 €', trend: '+12%', trendColor: 'text-emerald-400' },
              { title: 'Revenus Mensuels', value: '4 500 €', trend: '+8%', trendColor: 'text-emerald-400' },
              { title: 'Dépenses Mensuelles', value: '2 345 €', trend: '-5%', trendColor: 'text-red-400' },
              { title: 'Objectif Épargne', value: '20 000 €', trend: '78%', trendColor: 'text-blue-400' },
            ].map((stat) => (
              <div key={stat.title} className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-purple-900/50 p-[1px]">
                <div className="relative h-full bg-card rounded-3xl p-6 backdrop-blur-xl overflow-hidden">
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 -left-4 w-24 h-24 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
                    <div className="absolute -bottom-4 right-4 w-24 h-24 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
                  </div>
                  <div className="relative">
                    <p className="text-sm text-gray-400 mb-2">{stat.title}</p>
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                      <span className={`text-sm ${stat.trendColor}`}>{stat.trend}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Graphiques */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            {/* Graphique des dépenses */}
            <div className="rounded-3xl bg-card border border-border p-6">
              <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">
                Aperçu Financier
              </h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'rgba(0, 0, 0, 0.8)', 
                        border: '1px solid #333',
                        borderRadius: '8px'
                      }}
                    />
                    <Line type="monotone" dataKey="dépenses" stroke="#ef4444" strokeWidth={2} />
                    <Line type="monotone" dataKey="revenus" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Carte des Objectifs */}
            <div className="rounded-3xl bg-card border border-border p-6">
              <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">
                Objectifs d'Épargne
              </h2>
              <div className="space-y-4">
                {[
                  { name: 'Vacances', target: '5 000 €', current: '3 500 €', progress: 70 },
                  { name: 'Voiture', target: '15 000 €', current: '4 500 €', progress: 30 },
                  { name: 'Urgences', target: '10 000 €', current: '8 000 €', progress: 80 },
                ].map((goal) => (
                  <div key={goal.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{goal.name}</span>
                      <span className="text-sm text-gray-400">
                        {goal.current} / {goal.target}
                      </span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dépenses et Revenus */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            {/* Bloc Dépenses */}
            <div className="rounded-3xl bg-gradient-to-br from-red-500/10 via-red-900/10 to-red-500/10 p-[1px]">
              <div className="rounded-3xl bg-card p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Dépenses
                  </h2>
                  <span className="px-3 py-1 rounded-full text-sm bg-red-500/10 text-red-400">
                    -2 445,81 €
                  </span>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      name: 'Courses Carrefour',
                      amount: '-156,32 €',
                      date: "Aujourd&apos;hui",
                      icon: '🛒',
                      category: 'Alimentation'
                    },
                    {
                      name: 'Restaurant',
                      amount: '-45,00 €',
                      date: 'Hier',
                      icon: '🍽️',
                      category: 'Restauration'
                    },
                    {
                      name: 'Essence',
                      amount: '-70,50 €',
                      date: 'Il y a 2 jours',
                      icon: '⛽',
                      category: 'Transport'
                    }
                  ].map((expense) => (
                    <div
                      key={expense.name}
                      className="group relative overflow-hidden rounded-2xl bg-white/5 p-4 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-lg">
                          {expense.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{expense.name}</h3>
                          <p className="text-sm text-gray-400">{expense.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-red-400">{expense.amount}</p>
                          <p className="text-sm text-gray-400">{expense.date}</p>
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
                  <span className="px-3 py-1 rounded-full text-sm bg-emerald-500/10 text-emerald-400">
                    +5 450,00 €
                  </span>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      name: 'Salaire',
                      amount: '+4 500,00 €',
                      date: 'Il y a 5 jours',
                      icon: '💰',
                      category: 'Emploi'
                    },
                    {
                      name: 'Freelance Design',
                      amount: '+850,00 €',
                      date: 'Il y a 3 jours',
                      icon: '🎨',
                      category: 'Freelance'
                    },
                    {
                      name: 'Location Airbnb',
                      amount: '+100,00 €',
                      date: 'Il y a 1 semaine',
                      icon: '🏠',
                      category: 'Immobilier'
                    }
                  ].map((income) => (
                    <div
                      key={income.name}
                      className="group relative overflow-hidden rounded-2xl bg-white/5 p-4 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-lg">
                          {income.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{income.name}</h3>
                          <p className="text-sm text-gray-400">{income.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-emerald-400">{income.amount}</p>
                          <p className="text-sm text-gray-400">{income.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Transactions Récentes */}
          <div className="rounded-3xl bg-card border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Transactions Récentes
              </h2>
              <button className="group relative overflow-hidden px-4 py-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2">
                Voir tout
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { 
                  name: 'Abonnement Netflix',
                  category: 'Divertissement',
                  amount: '-14,99 €',
                  date: "Aujourd&apos;hui",
                  icon: '🎬',
                  type: 'expense'
                },
                {
                  name: 'Salaire',
                  category: 'Revenu',
                  amount: '+4 500,00 €',
                  date: 'Hier',
                  icon: '💰',
                  type: 'income'
                },
                {
                  name: 'Courses',
                  category: 'Alimentation',
                  amount: '-85,32 €',
                  date: 'Il y a 2 jours',
                  icon: '🛒',
                  type: 'expense'
                },
                {
                  name: 'Paiement Freelance',
                  category: 'Revenu',
                  amount: '+950,00 €',
                  date: 'Il y a 3 jours',
                  icon: '💻',
                  type: 'income'
                },
              ].map((transaction) => (
                <div
                  key={transaction.name}
                  className="group relative overflow-hidden rounded-2xl bg-white/5 p-4 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg">
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
                      <p className="text-sm text-gray-400">{transaction.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Factures à venir - Version complète */}
          <div className="mt-8 rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 p-[1px]">
            <div className="rounded-3xl bg-card p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Factures à venir
                </h2>
                <span className="px-3 py-1 rounded-full text-sm bg-white/10 text-gray-400">
                  3 en attente
                </span>
              </div>
              <div className="space-y-4">
                {[
                  {
                    name: 'Loyer',
                    amount: '800,00 €',
                    date: '01 Avril 2024',
                    icon: '🏠',
                    status: 'En attente'
                  },
                  {
                    name: 'Électricité',
                    amount: '75,50 €',
                    date: '05 Avril 2024',
                    icon: '⚡',
                    status: 'Programmé'
                  },
                  {
                    name: 'Internet',
                    amount: '39,99 €',
                    date: '10 Avril 2024',
                    icon: '🌐',
                    status: 'En attente'
                  }
                ].map((bill) => (
                  <div
                    key={bill.name}
                    className="group relative overflow-hidden rounded-2xl bg-white/5 p-4 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg">
                        {bill.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{bill.name}</h3>
                        <p className="text-sm text-gray-400">{bill.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-white">{bill.amount}</p>
                        <p className="text-sm text-yellow-500">{bill.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
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

      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        type={transactionType}
      />
    </div>
  );
}