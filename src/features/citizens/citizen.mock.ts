import type { AppealCategory, AppealChannel, AppealStatus, Citizen, Priority } from './citizen.types';

const firstNames = ['Алексей', 'Мария', 'Иван', 'Екатерина', 'Дмитрий', 'Анна', 'Сергей', 'Ольга'];
const lastNames = ['Иванов', 'Петрова', 'Смирнов', 'Кузнецова', 'Соколов', 'Попова', 'Волков', 'Морозова'];
const patronymics = ['Андреевич', 'Сергеевна', 'Игоревич', 'Павловна', 'Олегович', 'Викторовна'];
const regions = ['Москва', 'Московская область', 'Республика Татарстан', 'Краснодарский край', 'Свердловская область'];
const statuses: AppealStatus[] = ['Новое', 'В работе', 'Ожидает документов', 'На согласовании', 'Закрыто', 'Просрочено'];
const priorities: Priority[] = ['Низкий', 'Средний', 'Высокий', 'Критический'];
const categories: AppealCategory[] = [
  'Вывоз ТКО',
  'Незаконная свалка',
  'Начисления',
  'Контейнерная площадка',
  'Региональный оператор',
];
const channels: AppealChannel[] = ['Портал', 'Email', 'Телефон', 'РЭО Радар', 'МФЦ'];
const preferredChannels: AppealChannel[] = ['Портал', 'Email', 'Телефон', 'РЭО Радар', 'МФЦ'];
const benefitCategories = ['Нет льгот', 'Многодетная семья', 'Пенсионер', 'Инвалидность', 'Ветеран труда'];

export function createMockCitizens(count = 18): Citizen[] {
  return Array.from({ length: count }, (_, index) => {
    const region = pick(regions, index);
    const firstName = pick(firstNames, index + 2);
    const lastName = pick(lastNames, index);
    const patronymic = pick(patronymics, index + 4);
    const fullName = `${lastName} ${firstName} ${patronymic}`;
    const avatarSeed = `${firstName}-${lastName}-${index + 1}`.toLowerCase().replace(/[^a-zа-я0-9]+/gi, '-');

    return {
      id: `citizen-${index + 1}`,
      fullName,
      avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(avatarSeed)}&backgroundColor=0f172a,0f766e,0284c7,7c3aed&textColor=ffffff`,
      birthDate: `19${70 + (index % 25)}-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 27) + 1).padStart(2, '0')}`,
      gender: index % 2 === 0 ? 'Мужской' : 'Женский',
      snils: `${100 + index}-${200 + index}-${300 + index} ${10 + (index % 89)}`,
      inn: `77${String(1000000000 + index).slice(0, 10)}`,
      contacts: {
        phone: `+7 9${String(100000000 + index).slice(0, 9)}`,
        email: `citizen${index + 1}@example.ru`,
        preferredChannel: pick(preferredChannels, index),
      },
      addresses: [
        {
          id: `address-${index + 1}-registration`,
          type: 'Регистрация',
          value: `${region}, ул. Центральная, д. ${index + 10}`,
        },
        {
          id: `address-${index + 1}-living`,
          type: 'Проживание',
          value: `${region}, ул. Лесная, д. ${index + 3}`,
        },
      ],
      region,
      municipality: `Муниципальный округ ${index + 1}`,
      socialStatus: index % 3 === 0 ? 'Работающий' : 'Заявитель',
      benefitCategory: pick(benefitCategories, index),
      employment: {
        company: index % 3 === 0 ? 'ООО ЭкоСервис' : 'Не указано',
        position: index % 3 === 0 ? 'Специалист' : 'Заявитель',
      },
      source: pick(channels, index),
      familyMembers: Array.from({ length: (index % 3) + 1 }, (_, familyIndex) => ({
        id: `family-${index + 1}-${familyIndex + 1}`,
        fullName: `${pick(lastNames, index + familyIndex + 1)} ${pick(firstNames, index + familyIndex + 3)} ${pick(patronymics, index + familyIndex + 2)}`,
        relation: familyIndex === 0 ? 'Супруг(а)' : familyIndex === 1 ? 'Ребенок' : 'Иное',
        birthDate: `19${80 + ((index + familyIndex) % 20)}-${String(((index + familyIndex) % 12) + 1).padStart(2, '0')}-${String(((index + familyIndex) % 27) + 1).padStart(2, '0')}`,
      })),
      documents: [
        {
          id: `doc-${index + 1}-passport`,
          type: 'Паспорт',
          number: `${String(4000 + index)} ${String(600000 + index).padStart(6, '0')}`,
          issuedAt: `201${index % 10}-0${(index % 9) + 1}-15`,
          issuer: 'ГУ МВД России',
        },
      ],
      history: [
        {
          id: `history-${index + 1}-1`,
          title: 'Карточка создана',
          timestamp: `2026-06-${String((index % 20) + 1).padStart(2, '0')}T09:15:00`,
          author: 'Система',
          status: pick(statuses, index),
        },
        {
          id: `history-${index + 1}-2`,
          title: 'Обновлены контакты',
          timestamp: `2026-06-${String((index % 20) + 1).padStart(2, '0')}T15:40:00`,
          author: 'Оператор',
          status: pick(statuses, index + 1),
        },
      ],
      appeals: [
        {
          id: `appeal-${index + 1}`,
          number: `REO-${String(index + 1).padStart(6, '0')}`,
          title: pick(categories, index),
          category: pick(categories, index),
          status: pick(statuses, index),
          priority: pick(priorities, index),
          channel: pick(channels, index),
          createdAt: `${index % 2 === 0 ? '2026-06' : '2026-05'}-${String((index % 20) + 1).padStart(2, '0')}`,
          dueAt: `${index % 2 === 0 ? '2026-07' : '2026-06'}-${String((index % 20) + 1).padStart(2, '0')}`,
        },
      ],
    };
  });
}

function pick<T>(items: T[], index: number): T {
  return items[index % items.length];
}

