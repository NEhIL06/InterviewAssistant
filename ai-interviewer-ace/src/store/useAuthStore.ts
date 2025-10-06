import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  setAuth: (token: string) => void;
  clearAuth: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: null,
  setAuth: (token: string) => {
    localStorage.setItem('auth_token', token);
    set({ isAuthenticated: true, token });
  },
  clearAuth: () => {
    localStorage.removeItem('auth_token');
    set({ isAuthenticated: false, token: null });
  },
  checkAuth: () => {
    const token = localStorage.getItem('auth_token');
    set({ isAuthenticated: !!token, token });
  },
}));
