'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminNav from '@/components/admin/AdminNav';
import { Upload, AlertCircle, CheckCircle, Loader, Trash2, Move, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface PhotoItem {
  path: string;
  filename: string;
  category: string;
}

interface Settings {
  homeBackground: string | null;
  homeBackgroundScale: number;
  expertsBackground: string | null;
  expertsBackgroundScale: number;
}

export default function MediaPage() {
  // Состояние загрузки фото
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'bridal' | 'event' | 'editorial' | 'experts'>('bridal');

  // Состояние фото
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [moveToCategory, setMoveToCategory] = useState<'bridal' | 'event' | 'editorial'>('bridal');
  const [isMoving, setIsMoving] = useState(false);

  // Состояние фонов
  const [settings, setSettings] = useState<Settings>({ 
    homeBackground: null, 
    homeBackgroundScale: 100,
    expertsBackground: null,
    expertsBackgroundScale: 100,
  });
  const [selectedBackgroundType, setSelectedBackgroundType] = useState<'homeBackground' | 'expertsBackground'>('homeBackground');
  const [backgroundScale, setBackgroundScale] = useState(100);
  const [isSavingBackground, setIsSavingBackground] = useState(false);
  const [activeTab, setActiveTab] = useState<'photos' | 'backgrounds'>('photos');

  const categories = {
    bridal: { label: '💍 Свадьбы' },
    event: { label: '🎉 Мероприятия' },
    editorial: { label: '📸 Editorial' },
    experts: { label: '👤 Мастера' },
  };

  const portfolioCategories = ['bridal', 'event', 'editorial'];

  const backgroundLabels = {
    homeBackground: '🏠 Главная страница',
    expertsBackground: '👥 Страница экспертов',
  };

  // Загружаем список фото и настройки
  useEffect(() => {
    loadPhotos();
    loadSettings();
  }, []);

  const loadPhotos = async () => {
    try {
      setIsLoadingPhotos(true);
      const response = await fetch('/api/admin/supabase-list?folder=');
      const data = await response.json();
      if (data.success && data.files) {
        setPhotos(data.files.map((file: any) => ({
          path: file.name,
          filename: file.name,
          category: '',
          url: file.url,
        })));
      }
    } catch (error) {
      console.error('Ошибка загрузки фото:', error);
    } finally {
      setIsLoadingPhotos(false);
    }
  };

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/admin/backgrounds');
      const data = await response.json();
      if (data.success && data.settings) {
        setSettings(data.settings);
        setBackgroundScale(data.settings[selectedBackgroundType + 'Scale'] || 100);
      }
    } catch (error) {
      console.error('Ошибка загрузки настроек:', error);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setUploadMessage({ type: 'error', text: 'Выберите фото для загрузки!' });
      return;
    }
    setIsUploading(true);
    setUploadMessage(null);
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', selectedCategory);
        const response = await fetch('/api/admin/supabase-upload', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) throw new Error('Ошибка загрузки');
      }
      setUploadMessage({
        type: 'success',
        text: `✅ ${files.length} фото загружены!`,
      });
      setFiles([]);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (input) input.value = '';
      await loadPhotos();
    } catch (error) {
      setUploadMessage({
        type: 'error',
        text: `❌ Ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePhoto = async (photo: PhotoItem) => {
    if (!confirm(`Удалить фото: ${photo.filename}?`)) return;
    try {
      const response = await fetch('/api/admin/supabase-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: photo.path }),
      });
      if (response.ok) {
        setUploadMessage({ type: 'success', text: '✅ Фото удалено!' });
        await loadPhotos();
      } else {
        setUploadMessage({ type: 'error', text: '❌ Ошибка удаления' });
      }
    } catch (error) {
      setUploadMessage({
        type: 'error',
        text: `❌ Ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`,
      });
    }
  };

  const handleMovePhoto = async () => {
    if (!selectedPhoto) return;

    setIsMoving(true);
    try {
      const response = await fetch('/api/admin/manage-photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'move',
          photoPath: selectedPhoto.path.replace(/^\//, ''),
          newCategory: moveToCategory,
        }),
      });

      if (response.ok) {
        setUploadMessage({ type: 'success', text: '✅ Фото перемещено!' });
        setSelectedPhoto(null);
        await loadPhotos();
      } else {
        setUploadMessage({ type: 'error', text: '❌ Ошибка перемещения' });
      }
    } catch (error) {
      setUploadMessage({
        type: 'error',
        text: `❌ Ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`,
      });
    } finally {
      setIsMoving(false);
    }
  };

  const handleSetBackground = async (photoPath: string) => {
    setIsSavingBackground(true);
    try {
      const response = await fetch('/api/admin/backgrounds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          backgroundType: selectedBackgroundType,
          backgroundPath: photoPath,
          backgroundScale: backgroundScale,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSettings(data.settings);
        setUploadMessage({
          type: 'success',
          text: `✅ Фон установлен!`,
        });
      } else {
        setUploadMessage({ type: 'error', text: '❌ Ошибка установки фона' });
      }
    } catch (error) {
      setUploadMessage({
        type: 'error',
        text: `❌ Ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`,
      });
    } finally {
      setIsSavingBackground(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <AdminNav currentPage="Медиа" />

        <div className="max-w-7xl mx-auto p-6 sm:p-8">
          {/* Заголовок */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">📁 Управление Контентом</h1>
            <p className="text-slate-600">Фотографии, фоны и оформление сайта</p>
          </div>

          {/* Сообщения */}
          {uploadMessage && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                uploadMessage.type === 'success'
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-red-100 text-red-800 border border-red-300'
              }`}
            >
              {uploadMessage.type === 'success' ? (
                <CheckCircle size={20} />
              ) : (
                <AlertCircle size={20} />
              )}
              <span>{uploadMessage.text}</span>
            </div>
          )}

          {/* Вкладки */}
          <div className="flex gap-2 mb-6 border-b border-slate-200">
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-4 py-3 font-medium transition-all ${
                activeTab === 'photos'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📸 Фотографии
            </button>
            <button
              onClick={() => setActiveTab('backgrounds')}
              className={`px-4 py-3 font-medium transition-all ${
                activeTab === 'backgrounds'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🎨 Фоны страниц
            </button>
          </div>

          {/* ===== ВКЛАДКА 1: ФОТОГРАФИИ ===== */}
          {activeTab === 'photos' && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Левая колонка - Загрузка */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-6">
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">⬆️ Загрузить фото</h2>

                  {/* Категория */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Категория:</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value as any)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    >
                      {Object.entries(categories).map(([key, val]) => (
                        <option key={key} value={key}>{val.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Выбор файлов */}
                  <div className="mb-6">
                    <label className="block text-center p-6 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-blue-400 transition">
                      <Upload size={24} className="mx-auto mb-2 text-slate-600" />
                      <p className="text-sm font-medium text-slate-700">Выбери фото</p>
                      <p className="text-xs text-slate-500">или перетащи сюда</p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </label>
                    {files.length > 0 && (
                      <p className="mt-2 text-sm text-slate-600">Выбрано: {files.length}</p>
                    )}
                  </div>

                  {/* Кнопка загрузки */}
                  <button
                    onClick={handleUpload}
                    disabled={isUploading || files.length === 0}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-slate-300 transition flex items-center justify-center gap-2"
                  >
                    {isUploading ? <Loader size={18} className="animate-spin" /> : <Upload size={18} />}
                    {isUploading ? 'Загрузка...' : 'Загрузить'}
                  </button>
                </div>
              </div>

              {/* Правая колонка - Список фото */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h2 className="text-xl font-semibold text-slate-900 mb-6">📸 Все фотографии</h2>

                  {isLoadingPhotos ? (
                    <div className="flex justify-center py-12">
                      <Loader size={24} className="animate-spin text-slate-400" />
                    </div>
                  ) : Object.keys(photos).length === 0 ? (
                    <p className="text-center text-slate-500 py-12">Нет загруженных фото</p>
                  ) : (
                    <div className="space-y-6">
                      {portfolioCategories.map(cat => (
                        Array.isArray(photos[cat]) && photos[cat].length > 0 && (
                          <div key={cat}>
                            <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                              {categories[cat as keyof typeof categories]?.label}
                              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                {photos[cat]?.length ?? 0}
                              </span>
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                              {(photos[cat] || []).map((photo, idx) => (
                                <div key={idx} className="relative group">
                                  <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-slate-100">
                                    <Image
                                      src={photo.path}
                                      alt={photo.filename}
                                      fill
                                      className="object-cover hover:scale-105 transition"
                                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    />
                                  </div>
                                  <div className="absolute inset-0 bg-black/0 hover:bg-black/50 transition rounded-lg flex items-center justify-center gap-2 opacity-0 hover:opacity-100">
                                    <button
                                      onClick={() => setSelectedPhoto(photo)}
                                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                      title="Переместить"
                                    >
                                      <Move size={16} />
                                    </button>
                                    <button
                                      onClick={() => handleDeletePhoto(photo)}
                                      className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                      title="Удалить"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                  <p className="mt-1 text-xs text-slate-600 truncate">{photo.filename}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      ))}
                      {Array.isArray(photos['experts']) && photos['experts'].length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                            {categories.experts.label}
                            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {photos['experts']?.length ?? 0}
                            </span>
                          </h3>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {(photos['experts'] || []).map((photo, idx) => (
                              <div key={idx} className="relative group">
                                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-slate-100">
                                  <Image
                                    src={photo.path}
                                    alt={photo.filename}
                                    fill
                                    className="object-cover hover:scale-105 transition"
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                  />
                                </div>
                                <div className="absolute inset-0 bg-black/0 hover:bg-black/50 transition rounded-lg flex items-center justify-center gap-2 opacity-0 hover:opacity-100">
                                  <button
                                    onClick={() => handleDeletePhoto(photo)}
                                    className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                    title="Удалить"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                                <p className="mt-1 text-xs text-slate-600 truncate">{photo.filename}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ===== ВКЛАДКА 2: ФОНЫ ===== */}
          {activeTab === 'backgrounds' && (
            <div className="grid lg:grid-cols-2 gap-8">
              {(['homeBackground', 'expertsBackground'] as const).map((bgType) => (
                <div key={bgType} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <ImageIcon size={20} />
                    {backgroundLabels[bgType]}
                  </h3>

                  {/* Текущий фон */}
                  {settings[bgType] && (
                    <div className="mb-6 p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-sm text-slate-600 mb-2">Текущий фон:</p>
                          <p className="text-sm font-medium text-slate-900 truncate">
                            {settings[bgType]?.split('/').pop()}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setSettings({ ...settings, [bgType]: null });
                            fetch('/api/admin/backgrounds', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                backgroundType: bgType,
                                backgroundPath: null,
                              }),
                            });
                            setUploadMessage({ type: 'success', text: '✅ Фон удален!' });
                          }}
                          className="p-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition"
                          title="Удалить фон"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      
                      {/* Слайдер масштаба */}
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <p className="text-sm text-slate-700 mb-2">
                          Масштаб: <span className="font-semibold text-blue-600">{settings[bgType + 'Scale' as keyof Settings] || 100}%</span>
                        </p>
                        <input
                          type="range"
                          min="50"
                          max="200"
                          step="10"
                          value={settings[bgType + 'Scale' as keyof Settings] || 100}
                          onChange={(e) => {
                            const newScale = parseInt(e.target.value);
                            setSettings({ ...settings, [bgType + 'Scale']: newScale });
                            // Сохраняем масштаб
                            fetch('/api/admin/backgrounds', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                backgroundType: bgType,
                                backgroundPath: settings[bgType],
                                backgroundScale: newScale,
                              }),
                            });
                          }}
                          className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                          <span>50%</span>
                          <span>100%</span>
                          <span>200%</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Выбор фона */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-slate-700 mb-3">Выбери фото для установки:</p>

                    <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                      {portfolioCategories.flatMap(cat =>
                        (photos[cat] || []).map((photo) => (
                          <button
                            key={photo.path}
                            onClick={() => {
                              setSelectedBackgroundType(bgType);
                              handleSetBackground(photo.path);
                            }}
                            disabled={isSavingBackground}
                            className="relative group overflow-hidden rounded-lg hover:opacity-75 transition disabled:opacity-50"
                          >
                            <Image
                              src={photo.path}
                              alt={photo.filename}
                              width={150}
                              height={150}
                              className="w-full h-20 object-cover"
                            />
                            {isSavingBackground && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <Loader size={16} className="animate-spin text-white" />
                              </div>
                            )}
                            {settings[bgType] === photo.path && (
                              <div className="absolute inset-0 bg-green-500/20 border-2 border-green-500" />
                            )}
                          </button>
                        ))
                      )}
                    </div>

                    {(photos['bridal']?.length || 0) +
                      (photos['event']?.length || 0) +
                      (photos['editorial']?.length || 0) ===
                      0 && (
                      <p className="text-center text-slate-500 py-8">Загрузи фото для установки фонов</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Модальное окно для перемещения */}
        {selectedPhoto && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">🔄 Переместить фото</h3>
              <p className="text-sm text-slate-600 mb-4">Выбери новую категорию:</p>
              <select
                value={moveToCategory}
                onChange={(e) => setMoveToCategory(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg mb-6 focus:outline-none focus:border-blue-500"
              >
                {portfolioCategories.map(cat => (
                  cat !== selectedPhoto.category && (
                    <option key={cat} value={cat}>
                      {categories[cat as keyof typeof categories]?.label}
                    </option>
                  )
                ))}
              </select>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="flex-1 py-2 px-4 bg-slate-300 text-slate-900 rounded-lg hover:bg-slate-400 font-medium transition"
                >
                  Отмена
                </button>
                <button
                  onClick={handleMovePhoto}
                  disabled={isMoving}
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition disabled:bg-slate-300 flex items-center justify-center gap-2"
                >
                  {isMoving ? <Loader size={16} className="animate-spin" /> : <Move size={16} />}
                  Переместить
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
