'use client';

import { translations, Language } from '@/lib/translations';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, MapPin, Users } from 'lucide-react';

interface PackagesProps {
  lang: Language;
}

export default function Packages({ lang }: PackagesProps) {
  const t = translations.packages[lang];

  const icons = [Sparkles, Calendar, MapPin, Users];

  return (
    <section id="packages" className="py-20 md:py-32 bg-cream">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          {t.items.map((item, index) => {
            const Icon = icons[index] ?? Sparkles;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-beige hover:border-burgundy/30"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-burgundy to-burgundy-light rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-white" size={24} />
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  {item.name}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-burgundy/10 via-burgundy-light/10 to-burgundy/10 rounded-xl p-6 md:p-8 max-w-4xl mx-auto text-center"
        >
          <p className="text-gray-700 text-base md:text-lg italic">{t.note}</p>
          <a
            href="tel:+998906882266"
            className="inline-flex items-center mt-4 text-burgundy hover:text-burgundy-dark font-semibold transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
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
            +998 90-688-22-66
          </a>
        </motion.div>
      </div>
    </section>
  );
}
