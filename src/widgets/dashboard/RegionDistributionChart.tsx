import { useDashboardRegionSeries } from '@/features';
import { Card } from '@/shared';

export function RegionDistributionChart() {
  const series = useDashboardRegionSeries();
  const maxValue = Math.max(...series.map((item) => item.value), 1);

  return (
    <Card>
      <h3 className="text-xl font-semibold text-slate-950">Регионы</h3>
      <p className="mt-1 text-sm text-slate-500">Нагрузка по регионам присутствия обращений.</p>

      <div className="mt-6 space-y-4">
        {series.map((item) => (
          <div key={item.label} className="grid grid-cols-[1.4fr_3fr_auto] items-center gap-4">
            <span className="text-sm font-medium text-slate-700">{item.label}</span>
            <div className="h-3 rounded-full bg-slate-100">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-slate-950">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
