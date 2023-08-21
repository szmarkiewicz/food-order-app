import { createContext } from 'react';
import {CartItemState} from "./CartProvider";

export interface CartContext {
    items: CartItemState[],
    totalValue: number,
    addItem: (itemId: string, count: number) => void,
    removeItem: (itemId: string, count: number) => void
}

const CartContext = createContext<CartContext>({
    items: [],
    totalValue: 0,
    addItem: () => {},
    removeItem: () => {}
});

export default CartContext;