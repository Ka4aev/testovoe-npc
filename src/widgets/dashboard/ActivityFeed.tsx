import { useRecentAppeals } from '@/features';
import { Badge, Card, formatDate } from '@/shared';

export function ActivityFeed() {
  const appeals = useRecentAppeals();

  return (
    <Card>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-950">Последние обращения</h3>
          <p className="mt-1 text-sm text-slate-500">Оперативная лента новых и обновленных кейсов.</p>
        </div>
      </div>

      <div className="mt-5 divide-y divide-slate-100">
        {appeals.map(({ citizen, ...appeal }) => (
          <div key={appeal.id} className="flex flex-col gap-4 py-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-4 overflow-hidden">
              <img alt={citizen.fullName} className="h-12 w-12 rounded-2xl border border-slate-200 object-cover" src={citizen.avatar} />
              <div className="min-w-0">
                <p className="truncate font-semibold text-slate-950">{appeal.title}</p>
                <p className="truncate text-sm text-slate-500">
                  {appeal.number} · {citizen.fullName} · {formatDate(appeal.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="blue">{appeal.status}</Badge>
              <Badge tone="amber">{appeal.priority}</Badge>
              <Badge tone="slate">{appeal.channel}</Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
