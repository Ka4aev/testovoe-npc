import { useCitizensStore, type RegistrySortField } from '@/features';
import { Card, Select } from '@/shared';

const sortFieldOptions: Array<{ label: string; value: RegistrySortField }> = [
  { label: 'Дата создания', value: 'createdAt' },
  { label: 'ФИО', value: 'fullName' },
  { label: 'Регион', value: 'region' },
  { label: 'Статус', value: 'status' },
  { label: 'Приоритет', value: 'priority' },
];

export function RegistrySortBar() {
  const sort = useCitizensStore((state) => state.sort);
  const setSort = useCitizensStore((state) => state.setSort);

  return (
    <Card>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Select
          label="Сортировка"
          value={sort.field}
          onChange={(event) => setSort({ ...sort, field: event.target.value as RegistrySortField })}
          options={sortFieldOptions}
        />
        <Select
          label="Направление"
          value={sort.direction}
          onChange={(event) => setSort({ ...sort, direction: event.target.value as 'asc' | 'desc' })}
          options={[
            { label: 'По возрастанию', value: 'asc' },
            { label: 'По убыванию', value: 'desc' },
          ]}
        />
        <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 xl:col-span-2">
          <p className="text-sm font-semibold text-slate-700">Готовность к большим спискам</p>
          <p className="mt-2 text-sm text-slate-500">
            Таблица уже отделена от страницы и готова к следующему шагу — подключению виртуализации без переработки фильтров и domain-layer.
          </p>
        </div>
      </div>
    </Card>
  );
}
