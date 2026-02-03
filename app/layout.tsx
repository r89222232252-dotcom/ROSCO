import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BEAUTY ATELIER — Премиальные образы для свадеб и мероприятий | Premium Bridal & Event Looks',
  description: 'Макияж и причёски от топ-мастеров Sofia Shamsimuhametova (визажист №1 Ташкент 2025) и Farrukh Shamuratov (чемпион Европы). Luxury makeup & hair for weddings and events.',
  keywords: 'BEAUTY ATELIER, визажист Ташкент, стилист Ташкент, свадебный макияж, bridal makeup, Sofia Shamsimuhametova, Farrukh Shamuratov',
  authors: [{ name: 'BEAUTY ATELIER' }],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: 'en_US',
    title: 'BEAUTY ATELIER — Премиальные образы для свадеб и мероприятий',
    description: 'Макияж и причёски от топ-мастеров для безупречного впечатления',
    siteName: 'BEAUTY ATELIER',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#8B2E3B',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
