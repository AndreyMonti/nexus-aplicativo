export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
}

export interface Profile {
  id: string;
  nome: string;
  email: string;
  metadata?: any;
  created_at: string;
}

export interface SellerProfile {
  id: number;
  profile_id: string;
  nome_empresa: string;
  contato_email: string;
  created_at: string;
}

export interface Product {
  id: number;
  seller_id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  created_at: string;
  updated_at: string;
  seller?: SellerProfile;
  images?: ProductImage[];
  ratings?: Rating[];
}

export interface ProductImage {
  id: number;
  product_id: number;
  url: string;
  alt?: string;
  position: number;
}

export interface Rating {
  id: number;
  profile_id: string;
  product_id: number;
  stars: number;
  comment?: string;
  created_at: string;
}

export interface Cart {
  id: number;
  profile_id: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  created_at: string;
  product?: Product;
}

export interface DisplayProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  sellerName: string;
  stock: number;
  rating: number;
  reviewCount: number;
  category: string;
  createdAt: string;
}

export interface DisplayCartItem {
  id: number;
  productId: number;
  product: DisplayProduct;
  quantity: number;
  addedAt: string;
}

export type ThemeMode = 'light' | 'dark';