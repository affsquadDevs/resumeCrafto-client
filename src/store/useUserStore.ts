import { create } from 'zustand';

interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    usage?: string | null;
    language?: string | null;
}

interface UserState {
    user: User | null;
    authModal: {
        isOpen: boolean;
        mode: 'login' | 'register';
    };
    setUser: (user: User | null) => void;
    updateUser: (updates: Partial<User>) => void;
    setAuthModal: (authModal: { isOpen: boolean; mode: 'login' | 'register' }) => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    authModal: {
        isOpen: false,
        mode: 'login',
    },
    setUser: (user) => set({ user }),
    updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : updates as User
    })),
    setAuthModal: (authModal) => set({ authModal }),
}));
