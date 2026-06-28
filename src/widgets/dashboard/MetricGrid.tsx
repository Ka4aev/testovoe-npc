import { useDashboardMetrics } from '@/features';
import { Card } from '@/shared';

export function MetricGrid() {
  const metrics = useDashboardMetrics();

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.label}>
          <p className="text-sm font-medium text-slate-500">{metric.label}</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">{metric.value}</p>
          <p className="mt-2 text-sm text-emerald-700">{metric.caption}</p>
        </Card>
      ))}
    </section>
  );
}
