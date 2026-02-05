'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminNav from '@/components/admin/AdminNav';
import { Upload, AlertCircle, CheckCircle, Loader, Trash2, Move } from 'lucide-react';
import Image from 'next/image';

interface PhotoItem {
  path: string;
  filename: string;
  category: string;
}

export default function MediaPage() {
  // Supabase-only upload
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'bridal' | 'event' | 'editorial' | 'experts'>('bridal');
  const [photos, setPhotos] = useState<Record<string, PhotoItem[]>>({});
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [moveToCategory, setMoveToCategory] = useState<'bridal' | 'event' | 'editorial'>('bridal');
  const [isMoving, setIsMoving] = useState(false);

  const categories = {
    bridal: { label: '💍 Свадьбы' },
    event: { label: '🎉 Мероприятия' },
    editorial: { label: '📸 Editorial' },
    experts: { label: '👤 Мастера' },
  };

  const portfolioCategories = ['bridal', 'event', 'editorial'];

  // Загружаем список фото
  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      setIsLoadingPhotos(true);
      const response = await fetch('/api/admin/get-photos');
      const data = await response.json();

      if (data.success && data.photos) {
        const photosMap: Record<string, PhotoItem[]> = {};
        for (const [cat, paths] of Object.entries(data.photos)) {
          if (Array.isArray(paths)) {
            photosMap[cat] = (paths as string[]).map(path => ({
              path,
              filename: path.split('/').pop() || '',
              category: cat,
            }));
          }
        }
        setPhotos(photosMap);
      }
    } catch (error) {
      console.error('Ошибка загрузки фото:', error);
    } finally {
      setIsLoadingPhotos(false);
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
        formData.append('image', file);
        // Можно добавить category, если нужно
        const response = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) throw new Error('Ошибка загрузки');
      }
      setUploadMessage({ type: 'success', text: `✅ ${files.length} фото загружены!` });
      await loadPhotos();
      setFiles([]);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (input) input.value = '';
    } catch (error) {
      setUploadMessage({ type: 'error', text: `❌ Ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}` });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePhoto = async (photo: PhotoItem) => {
    if (!confirm(`Удалить фото: ${photo.filename}?`)) return;
    try {
      const response = await fetch('/api/delete-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: photo.filename }),
      });
      if (response.ok) {
        setUploadMessage({ type: 'success', text: '✅ Фото удалено!' });
        await loadPhotos();
      } else {
        setUploadMessage({ type: 'error', text: '❌ Ошибка удаления' });
      }
    } catch (error) {
      setUploadMessage({ type: 'error', text: `❌ Ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}` });
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

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <AdminNav currentPage="Медиа" />

        <div className="max-w-6xl mx-auto p-6 sm:p-8">
          {/* Заголовок */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">📁 Управление Фото</h1>
            <p className="text-slate-600">Загружайте, удаляйте и перемещайте фотографии</p>
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
                    onChange={(e) => setSelectedCategory(e.target.value as 'bridal' | 'event' | 'editorial' | 'experts')}
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
                    <p className="mt-2 text-sm text-slate-600">Выбрано файлов: {files.length}</p>
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
                <h2 className="text-xl font-semibold text-slate-900 mb-6">📸 Загруженные фото</h2>

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
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Модальное окно для перемещения */}
          {selectedPhoto && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">🔄 Переместить фото</h3>
                <p className="text-sm text-slate-600 mb-4">Выбери новую категорию:</p>
                <select
                  value={moveToCategory}
                  onChange={(e) => setMoveToCategory(e.target.value as 'bridal' | 'event' | 'editorial')}
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
      </div>
    </ProtectedRoute>
  );
}
