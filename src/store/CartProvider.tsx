import { useReducer } from 'react';

import CartContext from './CartContext';
import {MOCK_MEALS as meals} from "../resources/constants";


export interface CartItemState {
    id: string,
    count: number
}

interface CartState {
    items: CartItemState[],
    totalValue: number
}

enum CartActionType {
    ADD = "ADD",
    REMOVE = "REMOVE",
    RESET = "RESET"
}

interface CartActionPayload {
    id: string,
    count?: number
}

interface CartAction {
    type: CartActionType,
    payload?: CartActionPayload
}

const initialCartState: CartState = {
    items: [],
    totalValue: 0,
};

const initCart = () => {
    return initialCartState;
}

const findCartItem = (cartState: CartState, id: string) => {
    const index = cartState.items.findIndex(
        (item) => item.id === id
    );

    const item = cartState.items.at(index);

    return [item, index];
}

const getMealPrice = (id: string) => {
    const meal = meals.find((meal) => meal.id === id);
    if (meal) return meal.price;
    return 0;
}

const cartReducer = (state: CartState, action: CartAction) => {
    switch (action.type) {
        case CartActionType.ADD:{
            if (!action?.payload)
                return state;

            const { id, count } = action?.payload;
            const [item, index] = findCartItem(state, id);

            if (count && count > 0 && item){
                if (index === -1){
                    state.items.push({
                        id: id,
                        count: count
                    });
                } else{
                    item.count += count;
                }

                state.totalValue += count * getMealPrice(id);
            }

            return state;
        }
        case CartActionType.REMOVE:{
            if (!action?.payload)
                return state;

            const { id, count } = action?.payload;
            const [item, index] = findCartItem(state, id);

            if (count && count > 0 && count <= item.count && index !== -1 && item){
                item.count -= count;

                if (item.count === 0){
                    state.items.splice(index, 1);
                }

                state.totalValue -= count * getMealPrice(id);
            }

            return state;
        }
        case CartActionType.RESET:{
            return initCart();
        }
        default:{
            return new Error("");
        }
    }
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        initialCartState,
        initCart
    );

    const addItemToCartHandler = (itemId: string, count: number) => {
        dispatchCartAction({ type: CartActionType.ADD, payload: {
                id: itemId,
                count: count
            } });
    };

    const removeItemFromCartHandler = (itemId: string, count: number) => {
        dispatchCartAction({ type: CartActionType.REMOVE, payload: {
                id: itemId,
                count: count
            } });
    };

    const resetCart = () => {
        dispatchCartAction({type: CartActionType.RESET});
    }

    const cartContext: CartContext = {
        items: cartState.items,
        totalValue: cartState.totalValue,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        reset: resetCart,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
