import { useMemo, useState } from 'react';
import { useCitizensStore, type Citizen } from '@/features';
import { Button, Card, CHANNEL_OPTIONS, Input, REGIONS, Select } from '@/shared';

type CitizenEditFormProps = {
  citizen: Citizen;
  onClose: () => void;
};

export function CitizenEditForm({ citizen, onClose }: CitizenEditFormProps) {
  const updateCitizen = useCitizensStore((state) => state.updateCitizen);
  const [form, setForm] = useState(() => createInitialFormState(citizen));

  const addressRegistration = useMemo(() => citizen.addresses.find((address) => address.type === 'Регистрация'), [citizen.addresses]);
  const addressLiving = useMemo(() => citizen.addresses.find((address) => address.type === 'Проживание'), [citizen.addresses]);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = () => {
    updateCitizen(citizen.id, {
      fullName: form.fullName,
      birthDate: form.birthDate,
      snils: form.snils,
      inn: form.inn,
      region: form.region,
      municipality: form.municipality,
      socialStatus: form.socialStatus,
      benefitCategory: form.benefitCategory,
      source: form.source,
      contacts: {
        ...citizen.contacts,
        phone: form.phone,
        email: form.email,
        preferredChannel: form.preferredChannel as Citizen['contacts']['preferredChannel'],
      },
      employment: {
        company: form.company,
        position: form.position,
      },
      addresses: citizen.addresses.map((address) => {
        if (address.type === 'Регистрация') {
          return { ...address, value: form.registrationAddress };
        }

        if (address.type === 'Проживание') {
          return { ...address, value: form.livingAddress };
        }

        return address;
      }),
    });

    onClose();
  };

  return (
    <Card>
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-950">Редактирование данных гражданина</h3>
          <p className="mt-1 text-sm text-slate-500">Изменения сохраняются локально в Zustand store.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Отмена
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Сохранить изменения
          </Button>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Input label="ФИО" value={form.fullName} onChange={(event) => handleChange('fullName', event.target.value)} />
        <Input label="Дата рождения" value={form.birthDate} onChange={(event) => handleChange('birthDate', event.target.value)} />
        <Input label="СНИЛС" value={form.snils} onChange={(event) => handleChange('snils', event.target.value)} />
        <Input label="ИНН" value={form.inn} onChange={(event) => handleChange('inn', event.target.value)} />
        <Input label="Телефон" value={form.phone} onChange={(event) => handleChange('phone', event.target.value)} />
        <Input label="Email" value={form.email} onChange={(event) => handleChange('email', event.target.value)} />
        <Select
          label="Регион"
          value={form.region}
          onChange={(event) => handleChange('region', event.target.value)}
          options={REGIONS.map((region) => ({ label: region, value: region }))}
        />
        <Input label="Муниципалитет" value={form.municipality} onChange={(event) => handleChange('municipality', event.target.value)} />
        <Select
          label="Предпочтительный канал"
          value={form.preferredChannel}
          onChange={(event) => handleChange('preferredChannel', event.target.value)}
          options={CHANNEL_OPTIONS.map((channel) => ({ label: channel, value: channel }))}
        />
        <Input label="Социальный статус" value={form.socialStatus} onChange={(event) => handleChange('socialStatus', event.target.value)} />
        <Input label="Категория льгот" value={form.benefitCategory} onChange={(event) => handleChange('benefitCategory', event.target.value)} />
        <Input label="Источник данных" value={form.source} onChange={(event) => handleChange('source', event.target.value)} />
        <Input label="Компания" value={form.company} onChange={(event) => handleChange('company', event.target.value)} />
        <Input label="Должность" value={form.position} onChange={(event) => handleChange('position', event.target.value)} />
        <Input
          label="Адрес регистрации"
          value={form.registrationAddress}
          onChange={(event) => handleChange('registrationAddress', event.target.value)}
        />
        <Input
          label="Адрес проживания"
          value={form.livingAddress}
          onChange={(event) => handleChange('livingAddress', event.target.value)}
        />
      </div>

      <div className="mt-4 hidden">
        {addressRegistration?.value}
        {addressLiving?.value}
      </div>
    </Card>
  );
}

function createInitialFormState(citizen: Citizen) {
  return {
    fullName: citizen.fullName,
    birthDate: citizen.birthDate,
    snils: citizen.snils,
    inn: citizen.inn,
    phone: citizen.contacts.phone,
    email: citizen.contacts.email,
    preferredChannel: citizen.contacts.preferredChannel,
    region: citizen.region,
    municipality: citizen.municipality,
    socialStatus: citizen.socialStatus,
    benefitCategory: citizen.benefitCategory ?? '',
    source: citizen.source,
    company: citizen.employment.company,
    position: citizen.employment.position,
    registrationAddress: citizen.addresses.find((address) => address.type === 'Регистрация')?.value ?? '',
    livingAddress: citizen.addresses.find((address) => address.type === 'Проживание')?.value ?? '',
  };
}
