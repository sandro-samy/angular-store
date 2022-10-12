import { Icon, IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface Product {
  createdAt: string;
  name: string;
  image: string;
  rate: number;
  starIcons?: IconDefinition[];
  count: number;
  description: string;
  price: string;
  reviews: string[];
  id: string;
}
export interface CartItem extends Product {
  quantity: number;
}

