import api from './api';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../types/auth.types';

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/login', credentials);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/register', data);
    return response.data;
  },

  async logout(): Promise<void> {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Always clear local data even if API fails
      this.removeToken();
    }
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>('/user');
    return response.data;
  },

  setToken(token: string): void {
    localStorage.setItem('token', token);
    // Set token expiry to 24 hours from now
    const expiry = Date.now() + (24 * 60 * 60 * 1000);
    localStorage.setItem('token_expiry', expiry.toString());
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  removeToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('token_expiry');
  },

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  },

  getUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};

export default authService;
