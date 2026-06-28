import { useDashboardMonthlySeries } from '@/features';
import { Card } from '@/shared';

export function MonthlyDynamicsChart() {
  const series = useDashboardMonthlySeries();
  const maxValue = Math.max(...series.map((item) => item.value), 1);

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-950">Динамика обращений</h3>
          <p className="mt-1 text-sm text-slate-500">Распределение обращений по месяцам регистрации.</p>
        </div>
      </div>

      <div className="mt-6 flex h-64 items-end gap-3">
        {series.map((item) => (
          <div key={item.label} className="flex flex-1 flex-col items-center gap-3">
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
