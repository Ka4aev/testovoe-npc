import { create } from 'zustand';
import { createMockCitizens } from './citizen.mock';
import type { Citizen, RegistryFilters, RegistrySort } from './citizen.types';

type CitizensState = {
  citizens: Citizen[];
  filters: RegistryFilters;
  sort: RegistrySort;
  selectedCitizenId: string | null;
  setFilters: (filters: Partial<RegistryFilters>) => void;
  resetFilters: () => void;
  setSelectedCitizenId: (id: string | null) => void;
  setSort: (sort: RegistrySort) => void;
  updateCitizen: (id: string, patch: Partial<Citizen>) => void;
};

const initialFilters: RegistryFilters = {
  search: '',
  region: '',
  status: '',
  priority: '',
  channel: '',
};

const initialSort: RegistrySort = {
  field: 'createdAt',
  direction: 'desc',
};

export const useCitizensStore = create<CitizensState>((set) => ({
  citizens: createMockCitizens(),
  filters: initialFilters,
  sort: initialSort,
  selectedCitizenId: null,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
  resetFilters: () => set({ filters: initialFilters }),
  setSelectedCitizenId: (selectedCitizenId) => set({ selectedCitizenId }),
  setSort: (sort) => set({ sort }),
  updateCitizen: (id, patch) =>
    set((state) => ({
      citizens: state.citizens.map((citizen) => (citizen.id === id ? { ...citizen, ...patch } : citizen)),
    })),
}));
