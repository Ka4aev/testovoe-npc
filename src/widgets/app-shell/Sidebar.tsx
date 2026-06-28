import { NavLink } from 'react-router-dom';
import { ROUTES, cn } from '@/shared';

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-slate-200 bg-slate-950 p-5 text-white lg:block">
      <div className="rounded-3xl bg-white/10 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">REO</p>
        <h2 className="mt-3 text-2xl font-semibold">Citizens Desk</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">Учет обращений, SLA и карточки граждан.</p>
      </div>

      <nav className="mt-6 space-y-2">
        {ROUTES.map((route) => (
          <NavLink
            key={route.href}
            className={({ isActive }) =>
              cn(
                'flex rounded-2xl px-4 py-3 text-sm font-semibold transition',
                isActive ? 'bg-emerald-400 text-slate-950' : 'text-slate-300 hover:bg-white/10 hover:text-white',
              )
            }
            to={route.href}
          >
            {route.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
