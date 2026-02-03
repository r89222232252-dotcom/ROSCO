'use client';

import { useState, useEffect } from 'react';
import { Language } from '@/lib/translations';
import { motion } from 'framer-motion';

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  // Новые тексты для Hero блока
  const t = lang === 'ru'
    ? {
        title: 'BEAUTY ATELIER',
        subtitle: 'Мы создаём не просто образ —\nмы дарим ощущение непревзойдённости',
        minitext: 'Каждый образ — отражение вашей индивидуальной красоты\nи настроения события',
        cta1: 'Записаться',
        cta2: 'Показать портфолио',
      }
    : {
        title: 'BEAUTY ATELIER',
        subtitle: 'We don’t just create a look —\nwe create a feeling of excellence.',
        minitext: 'Each look reflects your individuality\nand the mood of the occasion',
        cta1: 'Book',
        cta2: 'View portfolio',
      };
  // const [hero, setHero] = useState<any | null>(null); // удалено как неиспользуемое
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [backgroundScale, setBackgroundScale] = useState(100);
  // const [isLoadingBg, setIsLoadingBg] = useState(true); // удалено как неиспользуемое

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/api/admin/content');
        const data = await response.json();
        if (data.success && data.settings) {
          const s = data.settings;
          if (s.homeBackground) setBackgroundImage(s.homeBackground);
          setBackgroundScale(s.homeBackgroundScale || 100);

        }
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {

      }
    };
    load();
  }, []);

  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio');
    portfolioSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const backgroundStyle = backgroundImage
    ? { 
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: `${backgroundScale}%`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    : {};

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cream via-beige to-cream pt-20" style={backgroundStyle}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #8B2E3B 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-gray-900 mb-6 leading-tight tracking-wider text-center" style={{letterSpacing: '0.04em'}}>
              {t.title}
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-xl md:text-2xl lg:text-3xl text-gray-700 mb-6 max-w-2xl mx-auto leading-snug tracking-normal text-center"
          >
            {lang === 'ru' ? (
              <>
                <span className="block">Мы создаём не просто образ —</span>
                <span className="block">мы дарим ощущение непревзойдённости</span>
              </>
            ) : (
              <>
                <span className="block">We don’t just create a look —</span>
                <span className="block">we create a feeling of absolute confidence.</span>
              </>
            )}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans text-lg md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto leading-normal tracking-normal"
          >
            {/* Текст удалён по запросу */}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <a
              href="https://t.me/beauty_atelier?text=Здравствуйте!%20Хочу%20записаться%20на%20консультацию%20BEAUTY%20ATELIER."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-burgundy text-white text-base font-semibold rounded-md hover:bg-burgundy-dark transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {t.cta1}
            </a>
            <button
              onClick={scrollToPortfolio}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-burgundy text-burgundy text-base font-semibold rounded-md hover:bg-burgundy hover:text-white transition-all duration-300"
            >
              {t.cta2}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-auto" preserveAspectRatio="none">
          <path
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            fill="#F5F1ED"
            opacity="0.5"
          />
        </svg>
      </div>
    </section>
  );
}
