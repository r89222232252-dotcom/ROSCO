'use client';

import { useState, useEffect } from 'react';
import { translations, Language } from '@/lib/translations';
import { useLanguage } from '@/components/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';


type FilterType = 'all' | 'bridal' | 'event' | 'editorial';

interface PortfolioItem {
  id: string;
  category: FilterType;
  alt: string;
  image: string;
}

interface PortfolioProps {
  lang?: Language;
}

export default function Portfolio({ lang }: PortfolioProps) {
  const { lang: globalLang } = useLanguage();
  const usedLang = lang || globalLang;
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // Используем переводы из translations.ts
  const t = translations.portfolio[usedLang];
  const loadingText = usedLang === 'ru' ? 'Загрузка фото...' : 'Loading photos...';
  const noPhotosText = usedLang === 'ru' ? 'Нет фото в этой категории' : 'No photos in this category';

  // Загружаем фото с сервера
  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const response = await fetch('/api/admin/get-photos');
        const data = await response.json();
        
        if (data.success && data.photos) {
          const items: PortfolioItem[] = [];
          let id = 0;
          
          (['bridal', 'event', 'editorial'] as FilterType[]).forEach(category => {
            const photos = data.photos[category] || [];
            photos.forEach((photoPath: string) => {
              items.push({
                id: `${category}-${id}`,
                category,
                alt: `${category} - фото ${id + 1}`,
                image: photoPath,
              });
              id++;
            });
          });
          
          setPortfolioItems(items);
        }
      } catch (error) {
        console.error('Ошибка загрузки фото:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPhotos();
  }, []);

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: t.all },
    { key: 'bridal', label: t.bridal },
    { key: 'event', label: t.event },
    { key: 'editorial', label: t.editorial },
  ];

  const filteredItems =
    activeFilter === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-cream">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 tracking-tight">
            {t.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto whitespace-pre-line">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.key
                  ? 'bg-burgundy text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-beige'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-600">{loadingText}</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-600">{noPhotosText}</p>
          </div>
        ) : (
          <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedImage(item)}
                className="relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                {/* Text Overlay */}
                <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-medium text-sm drop-shadow-lg">{item.alt}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full aspect-[3/4] rounded-lg overflow-hidden cursor-default"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
                aria-label="Close"
              >
                <X className="text-white" size={24} />
              </button>
              {/* Image */}
              <Image
                src={selectedImage.image}
                alt={selectedImage.alt}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
