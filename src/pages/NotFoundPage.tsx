import { Link } from 'react-router-dom';
import { Card } from '@/shared';

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <Card className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">404</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Страница не найдена</h1>
        <p className="mt-3 text-slate-600">Запрошенный раздел отсутствует или еще не реализован.</p>
        <Link
          className="mt-6 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          to="/"
        >
          На главную
        </Link>
      </Card>
    </main>
  );
}
