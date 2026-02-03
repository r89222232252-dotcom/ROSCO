'use client';

import { useState } from 'react';
import { Language } from '@/lib/translations';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Portfolio from '@/components/Portfolio';
import Experts from '@/components/Experts';
import Packages from '@/components/Packages';
import Process from '@/components/Process';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
  const [lang, setLang] = useState<Language>('ru');

  const toggleLanguage = () => {
    setLang(lang === 'ru' ? 'en' : 'ru');
  };

  return (
    <main className="min-h-screen">
      <Header lang={lang} toggleLanguage={toggleLanguage} />
      <Hero lang={lang} />
      <Portfolio lang={lang} />
      <Experts lang={lang} />
      <Packages lang={lang} />
      <Process lang={lang} />
      <Reviews lang={lang} />
      <FAQ lang={lang} />
      <FinalCTA lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
