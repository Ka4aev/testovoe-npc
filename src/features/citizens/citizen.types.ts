export type Gender = 'Мужской' | 'Женский';

export type AppealStatus = 'Новое' | 'В работе' | 'Ожидает документов' | 'На согласовании' | 'Закрыто' | 'Просрочено';

export type Priority = 'Низкий' | 'Средний' | 'Высокий' | 'Критический';

export type AppealCategory =
  | 'Вывоз ТКО'
  | 'Незаконная свалка'
  | 'Начисления'
  | 'Контейнерная площадка'
  | 'Региональный оператор';

export type AppealChannel = 'Портал' | 'Email' | 'Телефон' | 'РЭО Радар' | 'МФЦ';

export type RegistryFilters = {
  search: string;
  region: string;
  status: string;
  priority: string;
  channel: string;
};

export type RegistrySortField = 'fullName' | 'region' | 'status' | 'priority' | 'createdAt';
export type RegistrySortDirection = 'asc' | 'desc';

export type RegistrySort = {
  field: RegistrySortField;
  direction: RegistrySortDirection;
};

export type ContactInfo = {
  phone: string;
  email: string;
  preferredChannel: AppealChannel;
};

export type Address = {
  id: string;
  type: 'Регистрация' | 'Проживание';
  value: string;
};

export type EmploymentInfo = {
  company: string;
  position: string;
};

export type CitizenDocument = {
  id: string;
  type: string;
  number: string;
  issuedAt: string;
  issuer: string;
};

export type FamilyMember = {
  id: string;
  fullName: string;
  relation: string;
  birthDate: string;
};

export type HistoryEvent = {
  id: string;
  title: string;
  timestamp: string;
  author: string;
  status: AppealStatus;
};

export type Appeal = {
  id: string;
  number: string;
  title: string;
  category: AppealCategory;
  status: AppealStatus;
  priority: Priority;
  channel: AppealChannel;
  createdAt: string;
  dueAt: string;
};

export type Citizen = {
  id: string;
  fullName: string;
  avatar: string;
  birthDate: string;
  gender: Gender;
  snils: string;
  inn: string;
  contacts: ContactInfo;
  addresses: Address[];
  region: string;
  municipality: string;
  socialStatus: string;
  benefitCategory: string | null;
  employment: EmploymentInfo;
  source: string;
  familyMembers: FamilyMember[];
  documents: CitizenDocument[];
  history: HistoryEvent[];
  appeals: Appeal[];
};


