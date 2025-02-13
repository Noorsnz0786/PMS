export interface Product {
  id: number;
  name: string;
  description?: string; // Optional
  category: string;
  price: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}
