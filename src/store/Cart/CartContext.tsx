import { createContext } from 'react';
import {CartItem, Meal} from "../../resources/types";

export interface CartContext {
    cartItems: CartItem[];
    totalValue: number;
    cartItemsNo: 0,
    addCartItem(meal: Meal, count: number): void;
    removeCartItem(meal: Meal, count: number): void;
    reset(): void;
}

export default createContext<CartContext>({
    cartItems: [],
    totalValue: 0,
    cartItemsNo: 0,
    addCartItem: () => {},
    removeCartItem: () => {},
    reset: () => {},
});