"use client";

import { useState } from 'react';
import { 
  HomeIcon, 
  WalletIcon, 
  ChartBarIcon, 
  CogIcon, 
  TagIcon, 
  DocumentChartBarIcon 
} from "@heroicons/react/24/outline";
import { ArrowUpRight } from "lucide-react";
import dynamic from 'next/dynamic';

const navigation = [
  { name: 'Tableau de bord', href: '/dashboard', icon: <HomeIcon className="w-5 h-5" /> },
  { name: 'Transactions', href: '/dashboard/transactions', icon: <WalletIcon className="w-5 h-5" /> },
  { 
    name: 'Catégories', 
    href: '/dashboard/categories',
    icon: <TagIcon className="w-5 h-5" />,
    badge: '12'
  },
  { 
    name: 'Analyses', 
    href: '/dashboard/analyses',
    icon: <ChartBarIcon className="w-5 h-5" /> 
  },
  { 
    name: 'Rapports', 
    href: '/dashboard/reports',
    icon: <DocumentChartBarIcon className="w-5 h-5" />,
    badge: 'Nouveau'
  },
  { name: 'Paramètres', href: '/dashboard/settings', icon: <CogIcon className="w-5 h-5" /> },
];

const NavItem = ({ item, currentPath }) => (
  <a
    href={item.href}
    className={`group relative overflow-hidden rounded-2xl p-4 flex items-center gap-3 transition-all duration-300 
      ${currentPath === item.href ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}
  >
    {item.icon}
    <span>{item.name}</span>
    {((currentPath === '/' && item.name === 'Tableau de bord') ||
      (currentPath === '/reports' && item.name === 'Rapports') ||
      (currentPath === '/settings' && item.name === 'Paramètres') ||
      (currentPath === '/transactions' && item.name === 'Transactions')) && (
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

const UserButton = dynamic(() => import('@clerk/nextjs').then((mod) => mod.UserButton), {
  ssr: false
});

export default function Sidebar({ currentPath, isMobileMenuOpen }) {
  return (
    <aside className={`fixed h-screen w-64 glass-effect bg-sidebar border-r border-border transform transition-transform duration-300 ease-in-out z-40
      ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
      md:translate-x-0`}>
      <div className="p-6">
        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-8">
          <div className="relative group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-500 p-[1px]">
              <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                <WalletIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Mon Budget
            </h1>
            <p className="text-sm text-gray-400">Gérez vos finances</p>
          </div>
        </div>

        {/* Navigation avec séparateurs */}
        <nav className="space-y-2">
          <div className="space-y-2 mb-4">
            {navigation.slice(0, 2).map((item) => (
              <NavItem key={item.name} item={item} currentPath={currentPath} />
            ))}
          </div>

          <div className="h-px bg-white/5 my-4" />

          <div className="space-y-2 mb-4">
            {navigation.slice(2, 5).map((item) => (
              <NavItem key={item.name} item={item} currentPath={currentPath} />
            ))}
          </div>

          <div className="h-px bg-white/5 my-4" />

          <div className="space-y-2">
            {navigation.slice(5).map((item) => (
              <NavItem key={item.name} item={item} currentPath={currentPath} />
            ))}
          </div>
        </nav>

        {/* User Section */}
        <div className="mt-auto pt-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <UserButton 
              appearance={{
                elements: {
                  rootBox: "w-10 h-10",
                  userButtonAvatarBox: "w-10 h-10",
                  userButtonTrigger: "rounded-xl hover:bg-white/10",
                }
              }}
            />
            <div className="flex-1">
              <p className="text-sm font-medium">Mon Compte</p>
              <p className="text-xs text-gray-400">Gérer votre profil</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
} 