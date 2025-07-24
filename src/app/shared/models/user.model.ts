export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'artisan';
  isVerified: boolean;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  isArtisan?: boolean; 
}
export interface Artisan extends User {
  skills: string[];
  location: string;
  rating: number;
}