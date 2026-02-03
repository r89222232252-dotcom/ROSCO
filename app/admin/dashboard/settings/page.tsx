'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminNav from '@/components/admin/AdminNav';
import { Save, AlertCircle } from 'lucide-react';

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    siteName: 'BEAUTY ATELIER',
    telegram: '@beauty_atelier',
    telegramUrl: 'https://t.me/beauty_atelier',
    phone: '+998 90-688-22-66',
    email: 'info@beauty-atelier.com',
    instagram: '@dar_sofy',
    description: 'Премиальные образы для свадеб и мероприятий',
    seoTitle: 'BEAUTY ATELIER — Premium Bridal & Event Looks',
    metaDescription: 'Макияж и причёски от топ-мастеров для безупречного впечатления',
  });

  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setHasChanges(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    console.log('Saving settings:', formData);
    setSaved(true);
    setHasChanges(false);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <AdminNav currentPage="Настройки" />

        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Настройки сайта</h1>
            <p className="text-gray-600">Управляйте основными параметрами вашего сайта</p>
          </div>

          <form onSubmit={handleSave} className="max-w-3xl">
            {/* Notifications */}
            {saved && (
              <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
                ✓ Настройки успешно сохранены
              </div>
            )}

            {hasChanges && (
              <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800 flex items-start space-x-3">
                <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                <span>У вас есть несохраненные изменения</span>
              </div>
            )}

            {/* General Settings */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Основные параметры</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Название сайта
                  </label>
                  <input
                    type="text"
                    name="siteName"
                    value={formData.siteName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Описание сайта
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Settings */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Социальные сети</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telegram
                  </label>
                  <input
                    type="text"
                    name="telegram"
                    value={formData.telegram}
                    onChange={handleChange}
                    placeholder="@beauty_atelier"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Telegram
                  </label>
                  <input
                    type="url"
                    name="telegramUrl"
                    value={formData.telegramUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram
                  </label>
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="@dar_sofy"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy"
                  />
                </div>
              </div>
            </div>

            {/* SEO Settings */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">SEO</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SEO Заголовок (Title)
                  </label>
                  <input
                    type="text"
                    name="seoTitle"
                    value={formData.seoTitle}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy"
                  />
                  <p className="text-xs text-gray-500 mt-2">Длина: {formData.seoTitle.length}/60 символов</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy"
                  />
                  <p className="text-xs text-gray-500 mt-2">Длина: {formData.metaDescription.length}/160 символов</p>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-3 bg-burgundy text-white rounded-lg hover:bg-burgundy-dark transition-colors font-medium"
              >
                <Save size={20} />
                <span>Сохранить настройки</span>
              </button>
              {hasChanges && (
                <span className="text-sm text-gray-500">Есть несохраненные изменения</span>
              )}
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
