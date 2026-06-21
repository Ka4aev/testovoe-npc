import { Link } from 'react-router-dom';
import { create } from 'zustand';

type AppState = {
  activeModule: string;
  setActiveModule: (module: string) => void;
};

const useAppStore = create<AppState>((set) => ({
  activeModule: 'Dashboard',
  setActiveModule: (activeModule) => set({ activeModule }),
}));

export function App() {
  const activeModule = useAppStore((state) => state.activeModule);
  const setActiveModule = useAppStore((state) => state.setActiveModule);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8">
        <header className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-emerald-600">
              REO Citizens Desk
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              Портал обращений граждан
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Базовая инициализация проекта на React, TypeScript, Tailwind CSS, Zustand и React Router.
            </p>
          </div>

          <Link
            className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            to="/"
            onClick={() => setActiveModule('Dashboard')}
          >
            Открыть dashboard
          </Link>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {['React Router', 'Zustand store', 'Tailwind UI'].map((title) => (
            <article key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Модуль</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Основа готова для дальнейшей реализации dashboard, картотеки и карточки гражданина.
              </p>
            </article>
          ))}
        </section>

        <footer className="mt-auto pt-8 text-sm text-slate-500">
          Активный раздел: <span className="font-semibold text-slate-700">{activeModule}</span>
        </footer>
      </section>
    </main>
  );
}
