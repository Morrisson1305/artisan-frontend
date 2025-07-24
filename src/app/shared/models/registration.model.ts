
export interface RegisterPayload {
  name: string;
  phone: string;
  email: string;
  password: string;
  role: 'user' | 'artisan';
}
