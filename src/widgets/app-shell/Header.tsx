import { useLocation } from 'react-router-dom';
import { ROUTES } from '@/shared';

export function Header() {
  const location = useLocation();
  const currentRoute = ROUTES.find((route) => route.href === location.pathname);

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/85 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">REO Citizens Desk</p>
          <h1 className="truncate text-xl font-semibold text-slate-950">{currentRoute?.label ?? 'Рабочее место оператора'}</h1>
        </div>
        <div className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
          Demo environment
        </div>
      </div>
    </header>
  );
}
