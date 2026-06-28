import { useEffect, useState } from 'react';
import { useCitizensStore } from '@/features';
import { Button, Card, CHANNEL_OPTIONS, Input, PRIORITY_OPTIONS, REGIONS, Select, STATUS_OPTIONS } from '@/shared';

export function RegistryFilters() {
  const filters = useCitizensStore((state) => state.filters);
  const setFilters = useCitizensStore((state) => state.setFilters);
  const resetFilters = useCitizensStore((state) => state.resetFilters);
  const [search, setSearch] = useState(filters.search);

  useEffect(() => {
    setSearch(filters.search);
  }, [filters.search]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (search !== filters.search) {
        setFilters({ search });
      }
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [filters.search, search, setFilters]);

  return (
    <Card>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <Input
          label="Поиск"
          placeholder="ФИО, номер, телефон"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Select
          label="Регион"
          value={filters.region}
          onChange={(event) => setFilters({ region: event.target.value })}
          options={[{ label: 'Все регионы', value: '' }, ...REGIONS.map((region) => ({ label: region, value: region }))]}
        />
        <Select
          label="Статус"
          value={filters.status}
          onChange={(event) => setFilters({ status: event.target.value })}
          options={[{ label: 'Все статусы', value: '' }, ...STATUS_OPTIONS.map((status) => ({ label: status, value: status }))]}
        />
        <Select
          label="Приоритет"
          value={filters.priority}
          onChange={(event) => setFilters({ priority: event.target.value })}
          options={[{ label: 'Все приоритеты', value: '' }, ...PRIORITY_OPTIONS.map((priority) => ({ label: priority, value: priority }))]}
        />
        <Select
          label="Канал"
          value={filters.channel}
          onChange={(event) => setFilters({ channel: event.target.value })}
          options={[{ label: 'Все каналы', value: '' }, ...CHANNEL_OPTIONS.map((channel) => ({ label: channel, value: channel }))]}
        />
        <div className="flex items-end">
          <Button
            className="w-full justify-center"
            type="button"
            variant="secondary"
            onClick={() => {
              setSearch('');
              resetFilters();
            }}
          >
            Сбросить
          </Button>
        </div>
      </div>
    </Card>
  );
}
