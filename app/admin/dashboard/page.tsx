'use client';

import Link from 'next/link';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminNav from '@/components/admin/AdminNav';
import { BarChart3, Users, FileText, Settings, Images, BookOpen, Mail } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    {
      title: '📊 Посещений',
      value: '1,234',
      change: '+12% с прошлого месяца',
      icon: BarChart3,
      color: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
    {
      title: '👥 Клиентов',
      value: '89',
      change: '+5% за этот месяц',
      icon: Users,
      color: 'bg-green-100',
      textColor: 'text-green-600',
    },
    {
      title: '📁 Контента',
      value: '24',
      change: '3 новых на этой неделе',
      icon: FileText,
      color: 'bg-purple-100',
      textColor: 'text-purple-600',
    },
    {
      title: '⚙️ Система',
      value: 'Активна',
      change: 'Все в норме',
      icon: Settings,
      color: 'bg-orange-100',
      textColor: 'text-orange-600',
    },
  ];

  const quickActions = [
    {
      title: '🖼️ Управление фото',
      description: 'Загружайте и удаляйте фотографии',
      href: '/admin/dashboard/media',
      color: 'from-pink-100 to-pink-50',
      icon: Images,
    },
    {
      title: '📚 Контент',
      description: 'Редактируйте услуги и портфолио',
      href: '/admin/dashboard/content',
      color: 'from-blue-100 to-blue-50',
      icon: BookOpen,
    },
    {
      title: '📧 Письма',
      description: 'Проверьте новые сообщения',
      href: '/admin/dashboard/messages',
      color: 'from-green-100 to-green-50',
      icon: Mail,
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <AdminNav currentPage="Панель управления" />

        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">🎯 Панель администратора</h1>
            <p className="text-slate-600">Добро пожаловать! Здесь вы можете управлять всем сайтом</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-slate-700">{stat.title}</h3>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <Icon className={`${stat.textColor} w-6 h-6`} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.change}</p>
                </div>
              );
            })}
          </div>

          {/* Quick Actions Cards */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">⚡ Быстрые действия</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={idx}
                    href={action.href}
                    className={`bg-gradient-to-br ${action.color} border border-slate-200 rounded-xl p-6 hover:shadow-lg transition hover:scale-105`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{action.title}</h3>
                        <p className="text-sm text-slate-600">{action.description}</p>
                      </div>
                      <Icon className="w-8 h-8 text-slate-400" />
                    </div>
                    <div className="text-xs text-slate-500 mt-4">→ Перейти</div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-6">📝 Последняя активность</h2>
                <div className="space-y-4">
                  {[
                    {
                      action: '✏️ Обновлен контент портфолио',
                      time: '2 часа назад',
                      user: 'вы',
                    },
                    {
                      action: '📸 Добавлено 5 фото в галерею',
                      time: '5 часов назад',
                      user: 'вы',
                    },
                    {
                      action: '⚙️ Обновлены настройки сайта',
                      time: '1 день назад',
                      user: 'вы',
                    },
                    {
                      action: '📊 Экспорт статистики',
                      time: '3 дня назад',
                      user: 'вы',
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{item.action}</p>
                        <p className="text-xs text-slate-500">{item.user}</p>
                      </div>
                      <span className="text-xs text-slate-500">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-6">📌 Советы</h2>
                <div className="space-y-3">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                    <p className="font-semibold text-blue-900 mb-1">💡 Совет</p>
                    <p className="text-blue-800 text-xs">Используйте раздел "Управление фото" для удобной работы с изображениями</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
                    <p className="font-semibold text-green-900 mb-1">✨ Новое</p>
                    <p className="text-green-800 text-xs">Вся работа с контентом теперь в одном месте</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-sm">
                    <p className="font-semibold text-purple-900 mb-1">🚀 Облако</p>
                    <p className="text-purple-800 text-xs">Фото автоматически синхронизируются с Sanity Studio</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
