"use client";

import { useState } from 'react';
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, CartesianGrid, XAxis, YAxis } from 'recharts';
import Sidebar from '../components/Sidebar';
import { Bars3Icon as MenuIcon, XMarkIcon as XIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";

export default function Analytics() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Données pour les graphiques
  const monthlyData = [
    { month: 'Jan', dépenses: 2400, revenus: 4000, épargne: 1600 },
    { month: 'Fév', dépenses: 1398, revenus: 3000, épargne: 1602 },
    { month: 'Mar', dépenses: 9800, revenus: 12000, épargne: 2200 },
    { month: 'Avr', dépenses: 3908, revenus: 5780, épargne: 1872 },
    { month: 'Mai', dépenses: 4800, revenus: 6890, épargne: 2090 },
    { month: 'Juin', dépenses: 3800, revenus: 5390, épargne: 1590 },
  ];

  const expensesByCategory = [
    { name: 'Alimentation', value: 2400, color: '#ef4444' },
    { name: 'Transport', value: 1398, color: '#f97316' },
    { name: 'Logement', value: 9800, color: '#84cc16' },
    { name: 'Loisirs', value: 3908, color: '#06b6d4' },
    { name: 'Santé', value: 4800, color: '#8b5cf6' },
  ];

  const incomeByCategory = [
    { name: 'Salaire', value: 12000, color: '#10b981' },
    { name: 'Freelance', value: 3000, color: '#6366f1' },
    { name: 'Investissements', value: 2000, color: '#f59e0b' },
  ];

  const topExpenses = [
    { name: 'Loyer', amount: '1200 €', category: 'Logement', date: '01/03/2024' },
    { name: 'Courses Carrefour', amount: '245 €', category: 'Alimentation', date: '15/03/2024' },
    { name: 'Essence', amount: '180 €', category: 'Transport', date: '10/03/2024' },
  ];

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

      <Sidebar currentPath="/analyses" isMobileMenuOpen={isMobileMenuOpen} />

      <main className="md:ml-64 p-4 md:p-8 pt-16 md:pt-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-8">
            Analyses
          </h1>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { 
                title: 'Taux d\'épargne', 
                value: '32%', 
                trend: '+2.5%',
                trendUp: true,
                color: 'emerald'
              },
              { 
                title: 'Dépenses Moyennes', 
                value: '1,850 €', 
                trend: '-4.3%',
                trendUp: false,
                color: 'red'
              },
              { 
                title: 'Revenus Moyens', 
                value: '4,500 €', 
                trend: '+1.8%',
                trendUp: true,
                color: 'emerald'
              },
              { 
                title: 'Ratio Dépenses/Revenus', 
                value: '0.68', 
                trend: '-0.05',
                trendUp: false,
                color: 'emerald'
              },
            ].map((kpi) => (
              <div key={kpi.title} className="rounded-3xl bg-card p-6">
                <p className="text-sm text-gray-400">{kpi.title}</p>
                <div className="flex items-end justify-between mt-2">
                  <h3 className="text-2xl font-bold">{kpi.value}</h3>
                  <div className={`flex items-center text-${kpi.color}-400 text-sm`}>
                    {kpi.trendUp ? (
                      <ArrowUpIcon className="w-4 h-4 mr-1" />
                    ) : (
                      <ArrowDownIcon className="w-4 h-4 mr-1" />
                    )}
                    {kpi.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Graphiques */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Évolution mensuelle */}
            <div className="rounded-3xl bg-card p-6">
              <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">
                Évolution Mensuelle
              </h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="month" stroke="#666" />
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
                    <Line type="monotone" dataKey="épargne" stroke="#6366f1" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Répartition des dépenses */}
            <div className="rounded-3xl bg-card p-6">
              <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">
                Répartition des Dépenses
              </h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expensesByCategory}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {expensesByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        background: 'rgba(0, 0, 0, 0.8)', 
                        border: '1px solid #333',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                {expensesByCategory.map((category) => (
                  <div key={category.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm text-gray-400">{category.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Dépenses et Statistiques */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Dépenses */}
            <div className="rounded-3xl bg-card p-6">
              <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">
                Top Dépenses
              </h2>
              <div className="space-y-4">
                {topExpenses.map((expense, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium">{expense.name}</h3>
                      <p className="text-sm text-gray-400">{expense.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-red-400">{expense.amount}</p>
                      <p className="text-sm text-gray-400">{expense.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistiques Détaillées */}
            <div className="rounded-3xl bg-card p-6">
              <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">
                Statistiques Détaillées
              </h2>
              <div className="space-y-6">
                {[
                  { label: 'Dépense moyenne par transaction', value: '45 €' },
                  { label: 'Nombre de transactions ce mois', value: '34' },
                  { label: 'Jour avec le plus de dépenses', value: 'Samedi' },
                  { label: 'Catégorie la plus utilisée', value: 'Alimentation' },
                ].map((stat, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-400">{stat.label}</span>
                    <span className="font-medium">{stat.value}</span>
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
    </div>
  );
} 