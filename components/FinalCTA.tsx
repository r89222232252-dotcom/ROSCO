'use client';

import { Language } from '@/lib/translations';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

interface FinalCTAProps {
  lang: Language;
}

export default function FinalCTA({ lang }: FinalCTAProps) {
  // const t = translations.finalCta[lang]; // удалено как неиспользуемое

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-burgundy via-burgundy-dark to-burgundy relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-12 leading-tight">
            {lang === 'ru'
              ? 'Будем рады познакомиться и обсудить ваш будущий образ.'
              : "We’d be happy to meet and discuss your future look."}
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="https://t.me/beauty_atelier"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 bg-burgundy text-white text-lg font-bold rounded-md hover:bg-burgundy-dark transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <Send className="mr-3 group-hover:translate-x-1 transition-transform" size={24} />
              {lang === 'ru' ? 'Написать в Telegram' : 'Write in Telegram'}
            </a>

            <a
              href="tel:+998906882266"
              className="group w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 bg-burgundy text-white text-lg font-bold rounded-md hover:bg-burgundy-dark transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <svg
                className="w-6 h-6 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {lang === 'ru' ? 'Позвонить' : 'Call'}
            </a>

            <a
              href="mailto:info@beauty-atelier.pro"
              className="group w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 bg-burgundy text-white text-lg font-bold rounded-md hover:bg-burgundy-dark transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" />
              </svg>
              {lang === 'ru' ? 'Написать на Email' : 'Write to Email'}
            </a>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 text-white/80 text-2xl md:text-3xl text-center font-semibold"
          >
            {lang === 'ru'
              ? (
                  <>
                    <span className="block">Запишитесь удобным для вас способом.</span>
                    <span className="block mt-2">Ответим в течение часа</span>
                  </>
                )
              : (
                  <>
                    <span className="block">Book in the way that’s most convenient for you.</span>
                    <span className="block mt-2">We respond within an hour</span>
                  </>
                )}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
