import {
  ActivityFeed,
  MetricGrid,
  MonthlyDynamicsChart,
  PageHeader,
  RegionDistributionChart,
  SlaOverview,
  StatusBreakdownChart,
} from '@/widgets';

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Dashboard"
        title="Сводка по обращениям граждан"
        description="Оперативные показатели, SLA и последние события по сервисной службе."
      />
      <MetricGrid />
      <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <MonthlyDynamicsChart />
        <StatusBreakdownChart />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_1.3fr]">
        <RegionDistributionChart />
        <SlaOverview />
      </div>
      <ActivityFeed />
    </div>
  );
}
