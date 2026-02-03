'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { clearAdminSession } from '@/lib/admin/auth';
import { Menu, X, LogOut } from 'lucide-react';

interface AdminNavProps {
  currentPage: string;
}

export default function AdminNav({ currentPage }: AdminNavProps) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    clearAdminSession();
    router.push('/admin/login');
  };

  const navItems = [
    { href: '/admin/dashboard', label: '🎯 Панель' },
    { href: '/admin/dashboard/media', label: '🖼️ Фото' },
    { href: '/admin/dashboard/content', label: '📚 Контент' },
    { href: '/admin/dashboard/settings', label: '⚙️ Настройки' },
  ];

  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg border-b border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="text-2xl font-bold">✨</div>
            <div>
              <div className="text-sm font-bold">BEAUTY ATELIER</div>
              <div className="text-xs text-slate-400">Админ-панель</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === item.label
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}>
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-all shadow-md">
            <LogOut size={18} />
            <span>Выход</span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-slate-700 pt-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === item.label
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}>
                {item.label}
              </a>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-all mt-4">
              <LogOut size={18} />
              <span>Выход</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
