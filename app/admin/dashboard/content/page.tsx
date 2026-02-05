'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminNav from '@/components/admin/AdminNav';
import Image from 'next/image';
import { Trash2, Plus, Save } from 'lucide-react';

interface LocalizedString {
  ru: string;
  en: string;
}

interface ExpertItem {
  id: string;
  name: LocalizedString;
  role: LocalizedString;
  bio: LocalizedString;
  imagePath: string | null;
  imageScale: number;
  imagePos: { x: number; y: number };
  overlayText: LocalizedString;
}

export default function ContentPage() {
  const [loading, setLoading] = useState(true);
  interface Hero {
    title: LocalizedString;
    subtitle: LocalizedString;
    location: LocalizedString;
  }
  interface SiteTexts {
    [key: string]: LocalizedString | string;
  }
  const [settings, setSettings] = useState<{ hero: Hero; experts: ExpertItem[]; siteTexts: SiteTexts } | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/content');
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hero: settings.hero, experts: settings.experts, siteTexts: settings.siteTexts }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: 'Настройки сохранены' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Ошибка' });
      }
    } catch (e) {
      setMessage({ type: 'error', text: String(e) });
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (file: File, expertId: string) => {
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await fetch('/api/admin/upload-expert', {
        method: 'POST',
        body: form,
      });
      const data = await res.json();
      if (data.success) {
        const updated = { ...settings };
        updated.experts = updated.experts.map((ex: ExpertItem) => ex.id === expertId ? { ...ex, imagePath: data.path } : ex);
        setSettings(updated);
        setMessage({ type: 'success', text: 'Фото загружено' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Ошибка загрузки' });
      }
    } catch (e) {
      setMessage({ type: 'error', text: String(e) });
    }
  };

  const addExpert = () => {
    const id = `expert-${Date.now()}`;
    const newItem: ExpertItem = {
      id,
      name: { ru: 'Новый', en: 'New' },
      role: { ru: 'Мастер', en: 'Master' },
      bio: { ru: '', en: '' },
      imagePath: null,
      imageScale: 100,
      imagePos: { x: 50, y: 50 },
      overlayText: { ru: '', en: '' }
    };
    setSettings({ ...settings, experts: [...(settings.experts || []), newItem] });
  };

  const removeExpert = (id: string) => {
    if (!confirm('Удалить эксперта?')) return;
    setSettings({ ...settings, experts: (settings.experts || []).filter((e: ExpertItem) => e.id !== id) });
  };

  if (loading || !settings) return (
    <ProtectedRoute>
      <div className="p-8">Загрузка...</div>
    </ProtectedRoute>
  );

  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto p-6">
        <AdminNav currentPage="Контент" />

        <h1 className="text-3xl font-bold mb-4">Контент сайта</h1>

        {/* Hero */}
        <section className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Hero (Главная)</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Заголовок (RU)</label>
              <input value={settings.hero.title.ru} onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, title: { ...settings.hero.title, ru: e.target.value } } })} className="mt-1 w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Title (EN)</label>
              <input value={settings.hero.title.en} onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, title: { ...settings.hero.title, en: e.target.value } } })} className="mt-1 w-full px-3 py-2 border rounded" />
            </div>

            <div>
              <label className="block text-sm font-medium">Подзаголовок (RU)</label>
              <input value={settings.hero.subtitle.ru} onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, subtitle: { ...settings.hero.subtitle, ru: e.target.value } } })} className="mt-1 w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Subtitle (EN)</label>
              <input value={settings.hero.subtitle.en} onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, subtitle: { ...settings.hero.subtitle, en: e.target.value } } })} className="mt-1 w-full px-3 py-2 border rounded" />
            </div>

            <div>
              <label className="block text-sm font-medium">Локация (RU)</label>
              <input value={settings.hero.location.ru} onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, location: { ...settings.hero.location, ru: e.target.value } } })} className="mt-1 w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Location (EN)</label>
              <input value={settings.hero.location.en} onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, location: { ...settings.hero.location, en: e.target.value } } })} className="mt-1 w-full px-3 py-2 border rounded" />
            </div>
          </div>
        </section>

        {/* Experts */}
        <section className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Эксперты</h2>
            <button onClick={addExpert} className="inline-flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded"><Plus size={16} /> Добавить</button>
          </div>

          <div className="space-y-6">
            {(settings.experts || []).map((ex: ExpertItem) => (
              <div key={ex.id} className="border rounded p-4 flex gap-4 items-start">
                <div className="w-40 h-40 bg-slate-100 rounded overflow-hidden relative">
                  {ex.imagePath ? (
                    <Image src={ex.imagePath} alt={ex.name.ru} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">No image</div>
                  )}
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium">Name (RU)</label>
                    <input value={ex.name.ru} onChange={(e) => setSettings({ ...settings, experts: settings.experts.map((i: ExpertItem) => i.id === ex.id ? { ...i, name: { ...i.name, ru: e.target.value } } : i) })} className="mt-1 w-full px-3 py-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Name (EN)</label>
                    <input value={ex.name.en} onChange={(e) => setSettings({ ...settings, experts: settings.experts.map((i: ExpertItem) => i.id === ex.id ? { ...i, name: { ...i.name, en: e.target.value } } : i) })} className="mt-1 w-full px-3 py-2 border rounded" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Role (RU)</label>
                    <input value={ex.role.ru} onChange={(e) => setSettings({ ...settings, experts: settings.experts.map((i: ExpertItem) => i.id === ex.id ? { ...i, role: { ...i.role, ru: e.target.value } } : i) })} className="mt-1 w-full px-3 py-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Role (EN)</label>
                    <input value={ex.role.en} onChange={(e) => setSettings({ ...settings, experts: settings.experts.map((i: ExpertItem) => i.id === ex.id ? { ...i, role: { ...i.role, en: e.target.value } } : i) })} className="mt-1 w-full px-3 py-2 border rounded" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium">Bio (RU)</label>
                    <input value={ex.bio.ru} onChange={(e) => setSettings({ ...settings, experts: settings.experts.map((i: ExpertItem) => i.id === ex.id ? { ...i, bio: { ...i.bio, ru: e.target.value } } : i) })} className="mt-1 w-full px-3 py-2 border rounded" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium">Bio (EN)</label>
                    <input value={ex.bio.en} onChange={(e) => setSettings({ ...settings, experts: settings.experts.map((i: ExpertItem) => i.id === ex.id ? { ...i, bio: { ...i.bio, en: e.target.value } } : i) })} className="mt-1 w-full px-3 py-2 border rounded" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Overlay text (RU)</label>
                    <input value={ex.overlayText.ru} onChange={(e) => setSettings({ ...settings, experts: settings.experts.map((i: ExpertItem) => i.id === ex.id ? { ...i, overlayText: { ...i.overlayText, ru: e.target.value } } : i) })} className="mt-1 w-full px-3 py-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Overlay text (EN)</label>
                    <input value={ex.overlayText.en} onChange={(e) => setSettings({ ...settings, experts: settings.experts.map((i: ExpertItem) => i.id === ex.id ? { ...i, overlayText: { ...i.overlayText, en: e.target.value } } : i) })} className="mt-1 w-full px-3 py-2 border rounded" />
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <label className="block text-sm font-medium mr-2">Scale</label>
                    <input type="range" min={50} max={200} value={ex.imageScale} onChange={(e) => setSettings({ ...settings, experts: settings.experts.map((i: ExpertItem) => i.id === ex.id ? { ...i, imageScale: parseInt(e.target.value) } : i) })} />
                    <span className="text-sm w-12">{ex.imageScale}%</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="block text-sm font-medium mr-2">Pos X</label>
                    <input type="range" min={0} max={100} value={ex.imagePos.x} onChange={(e) => setSettings({ ...settings, experts: settings.experts.map((i: ExpertItem) => i.id === ex.id ? { ...i, imagePos: { ...i.imagePos, x: parseInt(e.target.value) } } : i) })} />
                    <span className="text-sm w-12">{ex.imagePos.x}%</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="block text-sm font-medium mr-2">Pos Y</label>
                    <input type="range" min={0} max={100} value={ex.imagePos.y} onChange={(e) => setSettings({ ...settings, experts: settings.experts.map((i: ExpertItem) => i.id === ex.id ? { ...i, imagePos: { ...i.imagePos, y: parseInt(e.target.value) } } : i) })} />
                    <span className="text-sm w-12">{ex.imagePos.y}%</span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <label className="block text-sm font-medium">Upload Image</label>
                    <input className="mt-1" type="file" accept="image/*" onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUpload(file, ex.id);
                    }} />
                    <button title="Remove" onClick={() => setSettings({ ...settings, experts: settings.experts.map((i: ExpertItem) => i.id === ex.id ? { ...i, imagePath: null } : i) })} className="p-2 bg-red-600 text-white rounded"><Trash2 size={14} /></button>
                    <button title="Delete expert" onClick={() => removeExpert(ex.id)} className="p-2 bg-slate-300 rounded text-sm">Удалить</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Save */}
        <div className="flex gap-3">
          <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2"><Save size={16} /> Сохранить</button>
          <button onClick={load} className="px-4 py-2 bg-slate-200 rounded">Отменить</button>
          {message && <div className={`px-3 py-2 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{message.text}</div>}
        </div>
      </div>
    </ProtectedRoute>
  );
}
