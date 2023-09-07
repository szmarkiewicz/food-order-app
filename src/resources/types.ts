export interface MealDTO {
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface Meal extends MealDTO {
  id: string;
}

export interface CartItem {
  id: string;
  count: number;
}