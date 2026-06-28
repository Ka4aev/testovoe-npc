import { useDashboardSlaSeries } from '@/features';
import { Card } from '@/shared';

const toneByLabel: Record<string, string> = {
  'В срок': 'from-emerald-500 to-emerald-400',
  'На контроле': 'from-amber-500 to-orange-400',
  'Просрочено': 'from-rose-500 to-rose-400',
};

export function SlaOverview() {
  const series = useDashboardSlaSeries();
  const total = series.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <h3 className="text-xl font-semibold text-slate-950">SLA контроль</h3>
      <p className="mt-1 text-sm text-slate-500">Исполнение сроков по активным и завершенным обращениям.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {series.map((item) => {
          const percent = total === 0 ? 0 : Math.round((item.value / total) * 100);

          return (
            <div key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className={`h-2 rounded-full bg-gradient-to-r ${toneByLabel[item.label] ?? 'from-slate-500 to-slate-400'}`} />
              <p className="mt-4 text-sm font-medium text-slate-500">{item.label}</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">{item.value}</p>
              <p className="mt-1 text-sm text-slate-500">{percent}% от общего объема</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
