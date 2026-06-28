import { useDashboardStatusSeries } from '@/features';
import { Card } from '@/shared';

export function StatusBreakdownChart() {
  const series = useDashboardStatusSeries();
  const total = series.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <h3 className="text-xl font-semibold text-slate-950">Статусы обращений</h3>
      <p className="mt-1 text-sm text-slate-500">Текущее распределение по жизненному циклу обработки.</p>

      <div className="mt-6 space-y-4">
        {series.map((item) => {
          const width = total === 0 ? 0 : (item.value / total) * 100;

          return (
            <div key={item.label}>
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="font-medium text-slate-700">{item.label}</span>
                <span className="font-semibold text-slate-950">{item.value}</span>
              </div>
              <div className="mt-2 h-3 rounded-full bg-slate-100">
                <div className="h-3 rounded-full bg-slate-950" style={{ width: `${width}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
