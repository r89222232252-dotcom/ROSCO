'use client';

import { translations, Language } from '@/lib/translations';
import { motion } from 'framer-motion';
import { MessageCircle, Palette, Sparkles, CheckCircle } from 'lucide-react';

interface ProcessProps {
  lang: Language;
}

export default function Process({ lang }: ProcessProps) {
  const t = translations.process[lang];

  const icons = [MessageCircle, Palette, Sparkles, CheckCircle];

  return (
    <section id="process" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
        </motion.div>

        {/* Process Steps */}
        <div className="max-w-5xl mx-auto">
          {t.steps.map((step, index) => {
            const Icon = icons[index] ?? MessageCircle;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative mb-12 last:mb-0"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Step Number Circle */}
                  <div className="flex-shrink-0 relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-burgundy to-burgundy-light flex items-center justify-center shadow-lg">
                      <Icon className="text-white" size={32} />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white border-4 border-burgundy flex items-center justify-center">
                      <span className="text-burgundy font-bold text-sm">{index + 1}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-gradient-to-r from-beige/30 to-transparent rounded-xl p-6 md:p-8">
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector Line */}
                {index < t.steps.length - 1 && (
                  <div className="hidden md:block absolute left-10 top-20 w-0.5 h-12 bg-gradient-to-b from-burgundy to-burgundy/30" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            href="https://t.me/beauty_atelier?text=Здравствуйте!%20Хочу%20записаться%20на%20консультацию%20BEAUTY%20ATELIER."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-burgundy text-white text-base font-semibold rounded-md hover:bg-burgundy-dark transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {lang === 'ru' ? 'Начать консультацию' : 'Start consultation'}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
