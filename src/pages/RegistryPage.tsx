import { useFilteredCitizens, useRegistryCounters } from '@/features';
import { PageHeader, RegistryFilters, RegistrySortBar, RegistrySummary, RegistryTable } from '@/widgets';

export function RegistryPage() {
  const citizens = useFilteredCitizens();
  const counters = useRegistryCounters();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Registry"
        title="Картотека обращений граждан"
        description="Архитектурная основа списка с фильтрами, счетчиками и будущей виртуализацией."
      />
      <RegistrySummary filtered={counters.filtered} total={counters.total} />
      <RegistryFilters />
      <RegistrySortBar />
      <RegistryTable citizens={citizens} />
    </div>
  );
}
