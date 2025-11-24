// Authentication Types
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'graduate' | 'super_admin';
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: 'admin' | 'graduate' | 'super_admin';
}

export interface AuthResponse {
  user: User;
  token: string;
  token_type: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}
