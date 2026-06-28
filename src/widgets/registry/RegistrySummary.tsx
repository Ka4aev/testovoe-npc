import { Card } from '@/shared';

type RegistrySummaryProps = {
  total: number;
  filtered: number;
};

export function RegistrySummary({ total, filtered }: RegistrySummaryProps) {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      <Card>
        <p className="text-sm text-slate-500">Найдено записей</p>
        <p className="mt-2 text-3xl font-semibold text-slate-950">{filtered.toLocaleString('ru-RU')}</p>
        <p className="mt-2 text-sm text-slate-500">из {total.toLocaleString('ru-RU')} в картотеке</p>
      </Card>
      <Card>
        <p className="text-sm text-slate-500">Архитектурный лимит</p>
        <p className="mt-2 text-3xl font-semibold text-slate-950">100 000+</p>
      </Card>
      <Card>
        <p className="text-sm text-slate-500">Связанные таблицы</p>
        <p className="mt-2 text-3xl font-semibold text-slate-950">20</p>
      </Card>
    </section>
  );
}
