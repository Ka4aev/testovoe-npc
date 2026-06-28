import { useState } from 'react';
import type { Citizen } from '@/features';
import { Badge, Card, CHANNEL_OPTIONS, Input, REGIONS, Select, STATUS_OPTIONS, formatDate } from '@/shared';

type ProfileTabsProps = {
  citizen: Citizen;
};

type TabKey = 'overview' | 'contacts' | 'documents' | 'family' | 'appeal' | 'history';

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: 'overview', label: 'Основное' },
  { key: 'contacts', label: 'Контакты' },
  { key: 'documents', label: 'Документы' },
  { key: 'family', label: 'Семья' },
  { key: 'appeal', label: 'Обращение' },
  { key: 'history', label: 'История' },
];

export function ProfileTabs({ citizen }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const primaryAppeal = citizen.appeals[0];

  return (
    <div className="space-y-6">
      <Card className="p-3">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const isActive = tab.key === activeTab;

            return (
              <button
                key={tab.key}
                className={isActive
                  ? 'rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition'
                  : 'rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-200'}
                type="button"
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </Card>

      {activeTab === 'overview' && (
        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
          <Card>
            <SectionHeader
              description="Паспортные, идентификационные и социальные параметры карточки."
              title="Основные сведения"
            />
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Input label="ФИО" readOnly value={citizen.fullName} />
              <Input label="СНИЛС" readOnly value={citizen.snils} />
              <Input label="ИНН" readOnly value={citizen.inn} />
              <Input label="Дата рождения" readOnly value={formatDate(citizen.birthDate)} />
              <Input label="Возраст" readOnly value={String(new Date().getFullYear() - new Date(citizen.birthDate).getFullYear())} />
              <Select
                label="Пол"
                value={citizen.gender}
                disabled
                options={[
                  { label: 'Мужской', value: 'Мужской' },
                  { label: 'Женский', value: 'Женский' },
                ]}
              />
              <Input label="Социальный статус" readOnly value={citizen.socialStatus} />
              <Input label="Категория льгот" readOnly value={citizen.benefitCategory ?? 'Не указана'} />
              <Input label="Место работы" readOnly value={citizen.employment.company} />
              <Input label="Должность" readOnly value={citizen.employment.position} />
              <Input label="Основной регион учета" readOnly value={citizen.region} />
              <Input label="Основной канал обращения" readOnly value={citizen.source} />
            </div>
          </Card>

          <Card>
            <SectionHeader
              description="Служебные параметры и источники данных гражданина."
              title="Дополнительные параметры"
            />
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-1">
              <Input label="ID карточки" readOnly value={citizen.id} />
              <Input label="Источник данных" readOnly value={citizen.source} />
              <Input label="Муниципалитет" readOnly value={citizen.municipality} />
              <Input label="Последнее обращение" readOnly value={primaryAppeal.number} />
              <Input label="Дата регистрации обращения" readOnly value={formatDate(primaryAppeal.createdAt)} />
              <Select
                label="Регион"
                value={citizen.region}
                disabled
                options={REGIONS.map((region) => ({ label: region, value: region }))}
              />
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'contacts' && (
        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <SectionHeader description="Основные контакты и предпочтительные каналы связи." title="Контакты" />
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Input label="Телефон" readOnly value={citizen.contacts.phone} />
              <Input label="Email" readOnly value={citizen.contacts.email} />
              <Select
                label="Предпочтительный канал"
                value={citizen.contacts.preferredChannel}
                disabled
                options={CHANNEL_OPTIONS.map((channel) => ({ label: channel, value: channel }))}
              />
              <Input label="Муниципалитет" readOnly value={citizen.municipality} />
            </div>
          </Card>

          <Card>
            <SectionHeader description="Адреса регистрации и фактического проживания." title="Адреса" />
            <div className="mt-5 space-y-4">
              {citizen.addresses.map((address) => (
                <div key={address.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="grid gap-4 md:grid-cols-[180px_1fr]">
                    <Input label="Тип адреса" readOnly value={address.type} />
                    <Input label="Адрес" readOnly value={address.value} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'documents' && (
        <Card>
          <SectionHeader description="Документы, прикрепленные к карточке заявителя." title="Документы" />
          <div className="mt-5 space-y-4">
            {citizen.documents.map((document) => (
              <div key={document.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Документ #{document.id}</p>
                  <Badge tone="blue">Активный</Badge>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <Input label="Тип документа" readOnly value={document.type} />
                  <Input label="Номер" readOnly value={document.number} />
                  <Input label="Дата выдачи" readOnly value={formatDate(document.issuedAt)} />
                  <Input label="Кем выдан" readOnly value={document.issuer} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'family' && (
        <Card>
          <SectionHeader description="Состав семьи и связанные персоны в системе." title="Семья" />
          <div className="mt-5 space-y-4">
            {citizen.familyMembers.map((member) => (
              <div key={member.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Связанная персона</p>
                  <Badge tone="slate">{member.relation}</Badge>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <Input label="ФИО" readOnly value={member.fullName} />
                  <Input label="Связь" readOnly value={member.relation} />
                  <Input label="Дата рождения" readOnly value={formatDate(member.birthDate)} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'appeal' && (
        <Card>
          <SectionHeader description="Ключевое обращение и параметры обработки SLA." title="Обращение" />
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Input label="Номер обращения" readOnly value={primaryAppeal.number} />
            <Input label="Тема" readOnly value={primaryAppeal.title} />
            <Input label="Связанная карточка" readOnly value={citizen.id} />
            <Select
              label="Категория"
              value={primaryAppeal.category}
              disabled
              options={[
                { label: 'Вывоз ТКО', value: 'Вывоз ТКО' },
                { label: 'Незаконная свалка', value: 'Незаконная свалка' },
                { label: 'Начисления', value: 'Начисления' },
                { label: 'Контейнерная площадка', value: 'Контейнерная площадка' },
                { label: 'Региональный оператор', value: 'Региональный оператор' },
              ]}
            />
            <Select
              label="Статус"
              value={primaryAppeal.status}
              disabled
              options={STATUS_OPTIONS.map((status) => ({ label: status, value: status }))}
            />
            <Select
              label="Канал"
              value={primaryAppeal.channel}
              disabled
              options={CHANNEL_OPTIONS.map((channel) => ({ label: channel, value: channel }))}
            />
            <Select
              label="Приоритет"
              value={primaryAppeal.priority}
              disabled
              options={[
                { label: 'Низкий', value: 'Низкий' },
                { label: 'Средний', value: 'Средний' },
                { label: 'Высокий', value: 'Высокий' },
                { label: 'Критический', value: 'Критический' },
              ]}
            />
            <Input label="Создано" readOnly value={formatDate(primaryAppeal.createdAt)} />
            <Input label="Срок ответа" readOnly value={formatDate(primaryAppeal.dueAt)} />
          </div>
        </Card>
      )}

      {activeTab === 'history' && (
        <Card>
          <SectionHeader description="Лента изменений карточки и обращения." title="История действий" />
          <div className="mt-5 space-y-4">
            {citizen.history.map((event) => (
              <div
                key={event.id}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200 px-4 py-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-semibold text-slate-950">{event.title}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {event.author} · {formatDate(event.timestamp)}
                  </p>
                </div>
                <Badge tone={getStatusTone(event.status)}>{event.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="border-b border-slate-200 pb-4">
      <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
  );
}

function getStatusTone(status: Citizen['appeals'][number]['status']) {
  switch (status) {
    case 'Закрыто':
      return 'emerald';
    case 'Просрочено':
      return 'rose';
    case 'Ожидает документов':
      return 'violet';
    case 'В работе':
      return 'amber';
    default:
      return 'blue';
  }
}
