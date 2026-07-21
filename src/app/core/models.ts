export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export type ScentFamily = 'Floral' | 'Woody' | 'Citrus' | 'Oriental' | 'Fresh';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  family: ScentFamily;
  gender: 'Feminine' | 'Masculine' | 'Unisex';
  price: number;
  sizeMl: number;
  description: string;
  notes: FragranceNotes;
  gradient: string;
  accent: string;
  emoji: string;
  bestseller?: boolean;
  isNew?: boolean;
  rating: number;
  collectionId: string;
}

export interface Collection {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  gradient: string;
  emoji: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: { label: string; family: ScentFamily; emoji: string }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
