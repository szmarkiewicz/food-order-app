import {ReactNode, Reducer, useReducer} from 'react';

import CartContextInstance, {CartContext} from './CartContext';
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

type CartAction =
  | { type: CartActionType.ADD | CartActionType.REMOVE, payload: CartActionPayload }
  | { type: CartActionType.RESET }

interface CartProviderProps {
    children: ReactNode;
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

    return {
        item,
        index
    };
}

const getMealPrice = (id: string) => {
    const meal = meals.find((meal) => meal.id === id);
    if (meal) return meal.price;
    return 0;
}

const cartReducer: Reducer<CartState, CartAction> = (prevState: CartState, action: CartAction) => {
    switch (action.type) {
        case CartActionType.ADD:{
            if (!action?.payload)
                return prevState;

            const { id, count } = action?.payload;
            const { item, index } = findCartItem(prevState, id);

            if (count && count > 0 && item){
                if (index === -1){
                    prevState.items.push({
                        id: id,
                        count: count
                    });
                } else{
                    item.count += count;
                }

                prevState.totalValue += count * getMealPrice(id);
            }

            return prevState;
        }
        case CartActionType.REMOVE:{
            if (!action?.payload)
                return prevState;

            const { id, count } = action?.payload;
            const {item, index} = findCartItem(prevState, id);

            if (count && count > 0 && item && count <= item?.count && index !== -1){
                item.count -= count;

                if (item.count === 0){
                    prevState.items.splice(index, 1);
                }

                prevState.totalValue -= count * getMealPrice(id);
            }

            return prevState;
        }
        case CartActionType.RESET:{
            return initCart();
        }
        default:{
            return prevState;
        }
    }
};

const CartProvider = (props: CartProviderProps) => {
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
        <CartContextInstance.Provider value={cartContext}>
            {props.children}
        </CartContextInstance.Provider>
    );
};

export default CartProvider;
