import Link from 'next/link';

export default function AdminIndexPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-beige to-cream flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-5xl font-serif font-bold text-gray-900 mb-4">BEAUTY ATELIER</h1>
        <p className="text-xl text-gray-700 mb-8">Панель администратора</p>
        
        <div className="space-y-4">
          <Link
            href="/admin/login"
            className="inline-block px-8 py-3 bg-burgundy text-white font-semibold rounded-lg hover:bg-burgundy-dark transition-colors"
          >
            Войти в панель управления
          </Link>
          <p className="text-gray-600 mt-4">
            или <Link href="/" className="text-burgundy hover:underline">вернуться на сайт</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
