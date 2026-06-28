import { useMemo } from 'react';
import { useCitizensStore } from './citizen.store';
import type { Citizen, RegistrySort } from './citizen.types';

type DashboardSeriesItem = {
  label: string;
  value: number;
};

export function useFilteredCitizens() {
  const citizens = useCitizensStore((state) => state.citizens);
  const filters = useCitizensStore((state) => state.filters);
  const sort = useCitizensStore((state) => state.sort);

  return useMemo(() => {
    const normalizedSearch = filters.search.trim().toLowerCase();

    const filtered = citizens.filter((citizen) => {
      const appeal = citizen.appeals[0];
      const matchesSearch =
        normalizedSearch.length === 0 ||
        citizen.fullName.toLowerCase().includes(normalizedSearch) ||
        citizen.contacts.phone.toLowerCase().includes(normalizedSearch) ||
        citizen.contacts.email.toLowerCase().includes(normalizedSearch) ||
        appeal.number.toLowerCase().includes(normalizedSearch);

      const matchesRegion = filters.region === '' || citizen.region === filters.region;
      const matchesStatus = filters.status === '' || appeal.status === filters.status;
      const matchesPriority = filters.priority === '' || appeal.priority === filters.priority;
      const matchesChannel = filters.channel === '' || appeal.channel === filters.channel;

      return matchesSearch && matchesRegion && matchesStatus && matchesPriority && matchesChannel;
    });

    return sortCitizens(filtered, sort);
  }, [citizens, filters, sort]);
}

export function useRegistryCounters() {
  const citizens = useCitizensStore((state) => state.citizens);
  const filteredCitizens = useFilteredCitizens();

  return {
    total: citizens.length,
    filtered: filteredCitizens.length,
  };
}

export function useDashboardMetrics() {
  const citizens = useCitizensStore((state) => state.citizens);
  const appeals = citizens.flatMap((citizen) => citizen.appeals);
  const overdue = appeals.filter((appeal) => appeal.status === 'Просрочено').length;
  const closed = appeals.filter((appeal) => appeal.status === 'Закрыто').length;
  const inProgress = appeals.filter((appeal) => appeal.status === 'В работе').length;
  const avgLoad = citizens.length === 0 ? 0 : Math.ceil(appeals.length / citizens.length);

  return [
    {
      label: 'Граждане',
      value: citizens.length.toLocaleString('ru-RU'),
      caption: 'в демо-картотеке',
    },
    {
      label: 'Обращения',
      value: appeals.length.toLocaleString('ru-RU'),
      caption: 'зарегистрировано',
    },
    {
      label: 'В работе',
      value: inProgress.toLocaleString('ru-RU'),
      caption: 'активно обрабатывается',
    },
    {
      label: 'Просрочено',
      value: overdue.toLocaleString('ru-RU'),
      caption: 'требует внимания',
    },
    {
      label: 'Закрыто',
      value: closed.toLocaleString('ru-RU'),
      caption: 'завершено в системе',
    },
    {
      label: 'Нагрузка',
      value: avgLoad.toLocaleString('ru-RU'),
      caption: 'обращений на карточку',
    },
  ];
}

export function useDashboardStatusSeries() {
  const citizens = useCitizensStore((state) => state.citizens);

  return useMemo(() => {
    const appeals = citizens.flatMap((citizen) => citizen.appeals);
    return buildSeries(appeals.map((appeal) => appeal.status));
  }, [citizens]);
}

export function useDashboardRegionSeries() {
  const citizens = useCitizensStore((state) => state.citizens);

  return useMemo(() => buildSeries(citizens.map((citizen) => citizen.region)), [citizens]);
}

export function useDashboardMonthlySeries(month: '2026-05' | '2026-06' = '2026-06') {
  const citizens = useCitizensStore((state) => state.citizens);

  return useMemo(() => {
    const appeals = citizens.flatMap((citizen) => citizen.appeals).filter((appeal) => appeal.createdAt.startsWith(month));
    return buildSeries(
      appeals.map((appeal) => {
        const date = new Date(appeal.createdAt);
        return date.toLocaleString('ru-RU', { day: '2-digit' });
      }),
    );
  }, [citizens, month]);
}

export function useDashboardSlaSeries() {
  const citizens = useCitizensStore((state) => state.citizens);

  return useMemo(() => {
    const appeals = citizens.flatMap((citizen) => citizen.appeals);
    const buckets = appeals.map((appeal) => {
      if (appeal.status === 'Просрочено') {
        return 'Просрочено';
      }

      if (appeal.status === 'Закрыто') {
        return 'В срок';
      }

      return 'На контроле';
    });

    return buildSeries(buckets);
  }, [citizens]);
}

export function useRecentAppeals() {
  const citizens = useCitizensStore((state) => state.citizens);

  return useMemo(
    () =>
      citizens
        .flatMap((citizen) => citizen.appeals.map((appeal) => ({ ...appeal, citizen })))
        .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
        .slice(0, 6),
    [citizens],
  );
}

function sortCitizens(citizens: Citizen[], sort: RegistrySort) {
  return [...citizens].sort((left, right) => {
    const leftAppeal = left.appeals[0];
    const rightAppeal = right.appeals[0];

    const leftValue = getSortValue(left, leftAppeal, sort.field);
    const rightValue = getSortValue(right, rightAppeal, sort.field);
    const comparison = leftValue.localeCompare(rightValue, 'ru');

    return sort.direction === 'asc' ? comparison : comparison * -1;
  });
}

function buildSeries(items: string[]): DashboardSeriesItem[] {
  const counts = items.reduce<Record<string, number>>((accumulator, item) => {
    accumulator[item] = (accumulator[item] ?? 0) + 1;
    return accumulator;
  }, {});

  return Object.entries(counts)
    .map(([label, value]) => ({ label, value }))
    .sort((left, right) => right.value - left.value);
}

function getSortValue(citizen: Citizen, appeal: Citizen['appeals'][number], field: RegistrySort['field']) {
  switch (field) {
    case 'fullName':
      return citizen.fullName;
    case 'region':
      return citizen.region;
    case 'status':
      return appeal.status;
    case 'priority':
      return appeal.priority;
    case 'createdAt':
    default:
      return appeal.createdAt;
  }
}
