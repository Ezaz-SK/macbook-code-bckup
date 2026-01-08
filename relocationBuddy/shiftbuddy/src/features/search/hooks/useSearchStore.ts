import { create } from 'zustand';

interface SearchState {
    city: string | null;
    locality: string | null;
    moveDate: Date | null;
    filters: {
        language: string[];
        gender: 'male' | 'female' | 'any';
    };
    actions: {
        setCity: (city: string) => void;
        setLocality: (loc: string) => void;
        setMoveDate: (date: Date) => void;
        setFilters: (filters: Partial<SearchState['filters']>) => void;
    };
}

export const useSearchStore = create<SearchState>((set) => ({
    city: null,
    locality: null,
    moveDate: null,
    filters: { language: [], gender: 'any' },
    actions: {
        setCity: (city) => set({ city }),
        setLocality: (locality) => set({ locality }),
        setMoveDate: (moveDate) => set({ moveDate }),
        setFilters: (newFilters) => set((state) => ({
            filters: { ...state.filters, ...newFilters }
        })),
    }
}));
