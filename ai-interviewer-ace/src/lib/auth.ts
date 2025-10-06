import api from './api';

export interface SignUpData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  message?: string;
}

export const authService = {
  signUp: async (data: SignUpData) => {
    const response = await api.post<{ message: string }>('/auth/signup', data);
    return response.data;
  },

  signIn: async (data: SignInData) => {
    const response = await api.post<AuthResponse>('/auth/signin', data);
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  },

  signOut: () => {
    localStorage.removeItem('auth_token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token');
  },

  getToken: () => {
    return localStorage.getItem('auth_token');
  }
};
