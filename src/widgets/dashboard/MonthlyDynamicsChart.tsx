import { useState } from 'react';
import { useDashboardMonthlySeries } from '@/features';
import { Card } from '@/shared';

const monthOptions = [
  { label: 'Май 2026', value: '2026-05' as const },
  { label: 'Июнь 2026', value: '2026-06' as const },
];

export function MonthlyDynamicsChart() {
  const [activeMonth, setActiveMonth] = useState<'2026-05' | '2026-06'>('2026-06');
  const activeMonthIndex = monthOptions.findIndex((month) => month.value === activeMonth);
  const activeMonthOption = monthOptions[activeMonthIndex];
  const series = useDashboardMonthlySeries(activeMonth);
  const maxValue = Math.max(...series.map((item) => item.value), 1);

  const shiftMonth = (direction: -1 | 1) => {
    const nextIndex = (activeMonthIndex + direction + monthOptions.length) % monthOptions.length;
    setActiveMonth(monthOptions[nextIndex].value);
  };

  return (
    <Card>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-950">Динамика обращений</h3>
          <p className="mt-1 text-sm text-slate-500">Распределение обращений по дням выбранного месяца регистрации.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-200"
            type="button"
            onClick={() => shiftMonth(-1)}
          >
            ←
          </button>
          <div className="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
            {activeMonthOption.label}
          </div>
          <button
            className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-200"
            type="button"
            onClick={() => shiftMonth(1)}
          >
            →
          </button>
        </div>
      </div>

      <div className="mt-6 flex h-64 items-end gap-3 overflow-x-auto pb-1">
        {series.map((item) => (
          <div key={item.label} className="flex min-w-[56px] flex-1 flex-col items-center gap-3">
            <div className="text-xs font-semibold text-slate-500">{item.value}</div>
            <div className="flex h-48 w-full items-end rounded-3xl bg-slate-100/80 p-2">
              <div
                className="w-full rounded-2xl bg-gradient-to-t from-emerald-500 to-cyan-400"
                style={{ height: `${Math.max((item.value / maxValue) * 100, 12)}%` }}
              />
            </div>
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.label}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
