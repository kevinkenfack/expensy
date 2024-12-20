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
  ArrowDownTrayIcon
} from "@heroicons/react/24/outline";
import { ArrowUpRight } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Sidebar from "../../components/Sidebar";

const COLORS = ['#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899'];

const expenseData = [
  { name: 'Alimentation', value: 850 },
  { name: 'Transport', value: 300 },
  { name: 'Logement', value: 1200 },
  { name: 'Loisirs', value: 450 },
  { name: 'Autres', value: 200 },
];

const monthlyData = [
  { month: 'Jan', revenus: 4500, dépenses: 3200, économies: 1300 },
  { month: 'Fév', revenus: 4500, dépenses: 2800, économies: 1700 },
  { month: 'Mar', revenus: 5200, dépenses: 3500, économies: 1700 },
  { month: 'Avr', revenus: 4800, dépenses: 3100, économies: 1700 },
  { month: 'Mai', revenus: 4700, dépenses: 3300, économies: 1400 },
  { month: 'Juin', revenus: 5500, dépenses: 3600, économies: 1900 },
];

interface NavItem {
  name: string;
  href: string;
  icon: JSX.Element;
  description?: string;
  badge?: string;
}

const NavItem = ({ item }: { item: NavItem }) => (
  <a
    href={item.href}
    className={`group relative overflow-hidden rounded-2xl p-4 flex items-center gap-3 transition-all duration-300 
      ${item.name === 'Rapports'
        ? 'bg-white/10 text-white' 
        : 'hover:bg-white/5 text-gray-400 hover:text-white'
      }`}
  >
    {item.icon}
    <span>{item.name}</span>
    {item.name === 'Rapports' && (
      <ArrowUpRight className="w-4 h-4 ml-auto" />
    )}
    {item.badge && (
      <span className={`ml-auto px-2 py-0.5 text-xs rounded-full 
        ${item.badge === 'Nouveau' 
          ? 'bg-blue-500/20 text-blue-400'
          : 'bg-white/10 text-gray-400'
        }`}>
        {item.badge}
      </span>
    )}
  </a>
);

export default function Reports() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('6m');

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
      <Sidebar currentPath="/reports" isMobileMenuOpen={isMobileMenuOpen} />

      {/* Main Content */}
      <main className="md:ml-64 p-4 md:p-8 pt-16 md:pt-8">
        <div className="max-w-6xl mx-auto">
          {/* En-tête avec boutons d'export */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-500 p-[1px]">
                <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                  <DocumentChartBarIcon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Rapports
                </h1>
                <p className="text-sm text-gray-400">Analysez vos finances en détail</p>
              </div>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none group relative overflow-hidden px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2">
                <ArrowDownTrayIcon className="w-5 h-5" />
                <span>PDF</span>
              </button>
              <button className="flex-1 sm:flex-none group relative overflow-hidden px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2">
                <ArrowDownTrayIcon className="w-5 h-5" />
                <span>Excel</span>
              </button>
            </div>
          </div>

          {/* Sélecteur de période */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {[
              { id: '1m', label: '1 mois' },
              { id: '3m', label: '3 mois' },
              { id: '6m', label: '6 mois' },
              { id: '1y', label: '1 an' },
            ].map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`px-4 py-2 rounded-xl transition-all duration-300 whitespace-nowrap
                  ${selectedPeriod === period.id 
                    ? 'bg-white/10 text-white' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
              >
                {period.label}
              </button>
            ))}
          </div>

          {/* Grille des graphiques */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            {/* Graphique des tendances */}
            <div className="rounded-3xl bg-card border border-border p-6">
              <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">
                Tendances
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
                    <Legend />
                    <Line type="monotone" dataKey="revenus" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="dépenses" stroke="#ef4444" strokeWidth={2} />
                    <Line type="monotone" dataKey="économies" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Graphique en camembert des dépenses */}
            <div className="rounded-3xl bg-card border border-border p-6">
              <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">
                Répartition des dépenses
              </h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Indicateurs de performance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {[
              {
                title: 'Ratio Épargne/Revenus',
                value: '32%',
                trend: '+5%',
                trendColor: 'text-emerald-400'
              },
              {
                title: 'Objectifs atteints',
                value: '3/5',
                trend: '60%',
                trendColor: 'text-blue-400'
              },
              {
                title: 'Économies mensuelles',
                value: '1 450 €',
                trend: '+12%',
                trendColor: 'text-emerald-400'
              },
            ].map((metric) => (
              <div key={metric.title} className="rounded-3xl bg-card border border-border p-6">
                <p className="text-sm text-gray-400 mb-2">{metric.title}</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">{metric.value}</h3>
                  <span className={`text-sm ${metric.trendColor}`}>{metric.trend}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Prévisions */}
          <div className="rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 p-[1px]">
            <div className="rounded-3xl bg-card p-6 backdrop-blur-xl">
              <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">
                Prévisions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-400">Dépenses estimées</h3>
                  <div className="space-y-3">
                    {[
                      { category: 'Fixes', amount: '2 300 €', trend: '+2%' },
                      { category: 'Variables', amount: '800 €', trend: '-5%' },
                      { category: 'Exceptionnelles', amount: '400 €', trend: '+15%' },
                    ].map((item) => (
                      <div key={item.category} className="flex items-center justify-between">
                        <span className="text-sm">{item.category}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.amount}</span>
                          <span className={`text-xs ${
                            item.trend.startsWith('+') ? 'text-emerald-400' : 'text-red-400'
                          }`}>
                            {item.trend}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-400">Économies potentielles</h3>
                  <div className="space-y-3">
                    {[
                      { category: 'Optimisation budget', amount: '200 €' },
                      { category: 'Réduction dépenses', amount: '150 €' },
                      { category: 'Revenus additionnels', amount: '300 €' },
                    ].map((item) => (
                      <div key={item.category} className="flex items-center justify-between">
                        <span className="text-sm">{item.category}</span>
                        <span className="font-medium text-emerald-400">{item.amount}</span>
                      </div>
                    ))}
                  </div>
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
    </div>
  );
} 