export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  totalPages: number;
}

export interface UsersQueryParams {
  page: number;
  limit: number;
  sortBy: keyof User;
  order: 'asc' | 'desc';
  search: string;
}