export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface CartItemType {
  id: string;
  count: number;
}

export interface CartUtilities {
  removeMeal: (itemId: string, count: number) => void;
  addMeal: (itemId: string, count: number) => void;
  meals: CartItemType[];
  totalValue: number;
  mealsNo: number;
}