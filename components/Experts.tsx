'use client';

import { useEffect } from 'react';
import { translations, Language } from '@/lib/translations';
import { motion } from 'framer-motion';
import { Award, Star, TrendingUp } from 'lucide-react';
// import Image from 'next/image'; // удалено как неиспользуемое

interface ExpertsProps {
  lang: Language;
}

export default function Experts({ lang }: ExpertsProps) {
  // Новый стиль и тексты для секции Эксперты
  const t = translations.experts[lang];
  const subtitle = t.subtitle;
  const expertsData = [
    {
      id: 'sofia',
      name: t.sofia.name,
      subtitle: t.sofia.subtitle,
      instagram: '@dar_sofy',
      instagramUrl: 'https://instagram.com/dar_sofy',
      icon: <Star size={32} className="text-white/80" />, // звезда
      points: t.sofia.points,
      image: '/images/experts/photo sofia.jpg',
      gradient: 'from-burgundy to-burgundy-light',
    },
    {
      id: 'farrukh',
      name: t.farrukh.name,
      subtitle: t.farrukh.subtitle,
      instagram: '@fshairdo',
      instagramUrl: 'https://instagram.com/fshairdo',
      icon: <Award size={32} className="text-white/80" />, // медаль
      points: t.farrukh.points,
      image: '/images/experts/Соф и Фаррух.JPG',
      gradient: 'from-burgundy-dark to-burgundy',
    },
  ];
  // const [backgroundImage, setBackgroundImage] = useState<string | null>(null); // удалено как неиспользуемое
  // const [backgroundScale, setBackgroundScale] = useState(100); // удалено как неиспользуемое
  // const [isLoadingBg, setIsLoadingBg] = useState(true); // удалено как неиспользуемое

  // const [settings, setSettings] = useState<any | null>(null); // удалено как неиспользуемое
  // const [expertsList, setExpertsList] = useState<any[]>([]); // удалено как неиспользуемое

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/admin/content');
        const data = await res.json();
        if (data.success && data.settings) {
          // const s = data.settings; // удалено как неиспользуемое
          // if (s.expertsBackground) setBackgroundImage(s.expertsBackground); // удалено как неиспользуемое
          // setBackgroundScale(s.expertsBackgroundScale || 100); // удалено как неиспользуемое
        }
      } catch (error) {
        console.error('Error loading experts:', error);
      } finally {
        // setIsLoadingBg(false); // удалено как неиспользуемое
      }
    };
    load();
  }, [lang]);

  // const backgroundStyle = ... // удалено как неиспользуемое


  return (
    <section id="experts" className="py-24 md:py-36 bg-gradient-to-b from-white to-beige/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 tracking-tight">
            {t.title}
          </h2>
          <span className="font-sans text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto block leading-normal tracking-normal whitespace-pre-line">
            {subtitle}
          </span>
        </motion.div>
        {/* Experts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 max-w-5xl mx-auto">
          {expertsData.map((ex, idx) => (
            <motion.div
              key={ex.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.2 }}
              className="rounded-3xl shadow-2xl bg-gradient-to-br from-white via-beige to-cream overflow-hidden flex flex-col border border-burgundy/10"
            >
              {/* Верхняя часть: градиент, имя, роль, инстаграм, иконка */}
              <div className="relative h-56 md:h-60 flex flex-col justify-between p-8" style={{ background: `linear-gradient(90deg, var(--tw-gradient-stops))` }}>
                <div className={`absolute inset-0 rounded-t-3xl bg-gradient-to-br ${ex.gradient} z-0`} />
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                      <h3 className="font-serif text-xl md:text-2xl font-bold text-white mb-2 drop-shadow-xl tracking-wide whitespace-nowrap" style={{letterSpacing: '0.01em'}}>
                      {ex.name}
                    </h3>
                    <p className="text-white/80 text-xs md:text-base font-normal mb-3 drop-shadow-md whitespace-nowrap tracking-wide">
                      {ex.subtitle.split('\n').join(' ')}
                    </p>
                    <a
                      href={ex.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm md:text-base text-white/95 hover:text-white transition-colors drop-shadow-md gap-2"
                    >
                      <span className="inline-block align-middle">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="24" height="24" rx="6" fill="#E1306C"/>
                          <path d="M12 8.5A3.5 3.5 0 1 0 12 15.5A3.5 3.5 0 1 0 12 8.5Z" stroke="white" strokeWidth="1.5"/>
                          <circle cx="17" cy="7" r="1" fill="white"/>
                        </svg>
                      </span>
                      {ex.instagram}
                    </a>
                  </div>
                  <div className="flex-shrink-0 mt-1 mr-2">{ex.icon}</div>
                </div>
              </div>
              {/* Нижняя часть: белый блок с пунктами */}
              <div className="bg-white/90 p-8 flex-1 flex flex-col justify-center rounded-b-3xl">
                <ul className="space-y-3">
                  {ex.points.map((point, idx) => (
                    <li key={idx} className="flex items-start">
                      <TrendingUp size={14} className="text-burgundy mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 leading-relaxed text-[11px] md:text-xs font-light tracking-wide">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
