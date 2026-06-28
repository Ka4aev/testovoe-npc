import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCitizensStore } from '@/features';
import { Badge, Button, Card, formatDate } from '@/shared';
import { CitizenEditForm, PageHeader, ProfileTabs } from '@/widgets';

export function CitizenProfilePage() {
  const { id } = useParams();
  const citizen = useCitizensStore((state) => state.citizens.find((item) => item.id === id));
  const updateCitizen = useCitizensStore((state) => state.updateCitizen);
  const [isEditing, setIsEditing] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  if (!citizen) {
    return (
      <Card>
        <h1 className="text-2xl font-semibold text-slate-950">Карточка не найдена</h1>
        <p className="mt-3 text-slate-600">Проверьте идентификатор гражданина или вернитесь в картотеку.</p>
        <Link className="mt-5 inline-flex font-semibold text-emerald-700" to="/registry">
          Вернуться в картотеку
        </Link>
      </Card>
    );
  }

  const primaryAppeal = citizen.appeals[0];

  const assignExecutor = () => {
    setNotice('Исполнитель назначен: Оператор линии 1.');
  };

  const changeStatus = () => {
    const nextStatus = primaryAppeal.status === 'В работе' ? 'На согласовании' : 'В работе';
    updateCitizen(citizen.id, {
      appeals: citizen.appeals.map((appeal, index) => (index === 0 ? { ...appeal, status: nextStatus } : appeal)),
    });
    setNotice(`Статус обращения изменен на «${nextStatus}».`);
  };

  const createTask = () => {
    setNotice('Создана задача на уточнение деталей обращения.');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Citizen Card"
        title={citizen.fullName}
        description={`Карточка гражданина, обращения и связанные таблицы. Дата рождения: ${formatDate(citizen.birthDate)}.`}
        actions={<Badge tone="emerald">{primaryAppeal.status}</Badge>}
      />

      <Card className="overflow-hidden p-0">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-900 px-6 py-8 text-white">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-5 overflow-hidden">
                <img
                  alt={citizen.fullName}
                  className="h-24 w-24 rounded-3xl border border-white/20 bg-white/10 object-cover shadow-lg"
                  src={citizen.avatar}
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-emerald-200">ID: {citizen.id}</p>
                  <h2 className="mt-2 truncate text-3xl font-semibold">{citizen.fullName}</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge tone="blue">{primaryAppeal.number}</Badge>
                    <Badge tone="violet">{primaryAppeal.category}</Badge>
                    <Badge tone="amber">{primaryAppeal.priority}</Badge>
                  </div>
                </div>
              </div>


            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={assignExecutor}>Назначить исполнителя</Button>
              <Button type="button" onClick={changeStatus}>Изменить статус</Button>
              <Button type="button" onClick={createTask}>Создать задачу</Button>
              <Button type="button" variant="secondary" onClick={() => setIsEditing((current) => !current)}>
                {isEditing ? 'Закрыть редактирование' : 'Изменить данные'}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 px-6 py-6 md:grid-cols-2 xl:grid-cols-4">
          <Info label="Регион" value={citizen.region} />
          <Info label="Муниципалитет" value={citizen.municipality} />
          <Info label="Телефон" value={citizen.contacts.phone} />
          <Info label="Email" value={citizen.contacts.email} />
          <Info label="Предпочтительный канал" value={citizen.contacts.preferredChannel} />
          <Info label="Социальный статус" value={citizen.socialStatus} />
          <Info label="Категория льгот" value={citizen.benefitCategory ?? 'Не указана'} />
          <Info label="Источник" value={citizen.source} />
        </div>
      </Card>

      {notice ? (
        <Card className="border-emerald-200 bg-emerald-50 text-emerald-800">
          <p className="text-sm font-semibold">{notice}</p>
        </Card>
      ) : null}

      {isEditing ? <CitizenEditForm citizen={citizen} onClose={() => setIsEditing(false)} /> : null}

      <ProfileTabs citizen={citizen} />
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 font-medium text-slate-950">{value}</p>
    </div>
  );
}
