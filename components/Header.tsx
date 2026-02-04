'use client';

import { useState, useEffect } from 'react';
import { translations, Language } from '@/lib/translations';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  toggleLanguage: () => void;
}

export default function Header({ lang, toggleLanguage }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations.nav[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#portfolio', label: t.portfolio },
    { href: '#experts', label: t.experts },
    { href: '#packages', label: t.packages },
    { href: '#process', label: t.process },
    { href: '#reviews', label: t.reviews },
    { href: '#faq', label: t.faq },
    { href: '#contact', label: t.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-cream/95 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-burgundy tracking-tight">
            BEAUTY ATELIER
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-800 hover:text-burgundy transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-1 text-sm font-medium text-gray-800 hover:text-burgundy transition-colors"
            aria-label="Toggle language"
          >
            <span className={lang === 'ru' ? 'text-burgundy font-bold' : ''}>RU</span>
            <span>|</span>
            <span className={lang === 'en' ? 'text-burgundy font-bold' : ''}>EN</span>
          </button>

          {/* Telegram Button */}
          <a
            href="https://t.me/beauty_atelier?text=Здравствуйте!%20Хочу%20записаться%20на%20консультацию%20BEAUTY%20ATELIER."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex px-6 py-2.5 bg-burgundy text-white text-sm font-medium rounded-md hover:bg-burgundy-dark transition-all duration-300 shadow-sm hover:shadow-md"
          >
            {t.telegram}
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-800 hover:text-burgundy transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-cream border-t border-beige">
          <div className="container mx-auto px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-base font-medium text-gray-800 hover:text-burgundy transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://t.me/beauty_atelier?text=Здравствуйте!%20Хочу%20записаться%20на%20консультацию%20BEAUTY%20ATELIER."
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-6 py-3 bg-burgundy text-white text-sm font-medium rounded-md hover:bg-burgundy-dark transition-all duration-300"
            >
              {t.telegram}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
