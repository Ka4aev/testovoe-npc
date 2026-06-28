import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCitizensStore, type Citizen, type RegistrySortField } from '@/features';
import { Badge, Button, Card, formatDate } from '@/shared';

type RegistryTableProps = {
  citizens: Citizen[];
};

const sortableColumns: Array<{ label: string; field: RegistrySortField; align?: 'left' | 'center' }> = [
  { label: 'Гражданин', field: 'fullName', align: 'left' },
  { label: 'Регион', field: 'region', align: 'center' },
  { label: 'Статус', field: 'status', align: 'center' },
  { label: 'Приоритет', field: 'priority', align: 'center' },
  { label: 'Дата', field: 'createdAt', align: 'center' },
];

const ROW_HEIGHT = 76;
const VIEWPORT_HEIGHT = 560;
const OVERSCAN = 4;
const TABLE_COLUMNS = '2fr 1fr 1fr 1fr 1fr auto';

export function RegistryTable({ citizens }: RegistryTableProps) {
  const sort = useCitizensStore((state) => state.sort);
  const setSort = useCitizensStore((state) => state.setSort);
  const [scrollTop, setScrollTop] = useState(0);

  const handleSort = (field: RegistrySortField) => {
    if (sort.field === field) {
      setSort({ field, direction: sort.direction === 'asc' ? 'desc' : 'asc' });
      return;
    }

    setSort({ field, direction: 'asc' });
  };

  const virtualRows = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
    const visibleCount = Math.ceil(VIEWPORT_HEIGHT / ROW_HEIGHT) + OVERSCAN * 2;
    const endIndex = Math.min(citizens.length, startIndex + visibleCount);
    const items = citizens.slice(startIndex, endIndex);

    return {
      items,
      topSpacerHeight: startIndex * ROW_HEIGHT,
      bottomSpacerHeight: Math.max(0, (citizens.length - endIndex) * ROW_HEIGHT),
    };
  }, [citizens, scrollTop]);

  if (citizens.length === 0) {
    return (
      <Card>
        <div className="flex min-h-40 flex-col items-center justify-center text-center">
          <h3 className="text-lg font-semibold text-slate-950">Ничего не найдено</h3>
          <p className="mt-2 max-w-md text-sm text-slate-500">
            Попробуйте изменить поисковый запрос, регион, статус, приоритет или канал обращения.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-3 text-sm text-slate-500">
        Отображаются только видимые строки. Таблица использует встроенную виртуализацию для комфортной работы с большими объемами данных.
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[980px]">
          <div className="grid gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500" style={{ gridTemplateColumns: TABLE_COLUMNS }}>
            {sortableColumns.map((column) => (
              <Button
                key={column.field}
                className={
                  column.align === 'left'
                    ? 'justify-start rounded-none bg-transparent px-0 py-0 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 hover:bg-transparent hover:text-slate-700'
                    : 'justify-center rounded-none bg-transparent px-0 py-0 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 hover:bg-transparent hover:text-slate-700'
                }
                type="button"
                variant="secondary"
                onClick={() => handleSort(column.field)}
              >
                <span className="truncate">
                  {column.label}
                  {sort.field === column.field ? (sort.direction === 'asc' ? ' ↑' : ' ↓') : ''}
                </span>
              </Button>
            ))}
            <span className="text-center">Действие</span>
          </div>

          <div className="overflow-y-auto" style={{ height: VIEWPORT_HEIGHT }} onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}>
            <div className="divide-y divide-slate-100" style={{ paddingTop: virtualRows.topSpacerHeight, paddingBottom: virtualRows.bottomSpacerHeight }}>
              {virtualRows.items.map((citizen) => {
                const appeal = citizen.appeals[0];

                return (
                  <div key={citizen.id} className="grid h-[76px] items-center gap-4 px-5 py-4 text-sm" style={{ gridTemplateColumns: TABLE_COLUMNS }}>
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img alt={citizen.fullName} className="h-11 w-11 rounded-2xl border border-slate-200 object-cover" src={citizen.avatar} />
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-950">{citizen.fullName}</p>
                        <p className="truncate text-slate-500">{appeal.number}</p>
                      </div>
                    </div>
                    <span className="text-center text-slate-600">{citizen.region}</span>
                    <div className="flex justify-center">
                      <Badge tone="blue">{appeal.status}</Badge>
                    </div>
                    <div className="flex justify-center">
                      <Badge tone="amber">{appeal.priority}</Badge>
                    </div>
                    <span className="text-center text-slate-600">{formatDate(appeal.createdAt)}</span>
                    <div className="flex justify-center">
                      <Link className="font-semibold text-emerald-700 hover:text-emerald-800" to={`/citizens/${citizen.id}`}>
                        Открыть
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
