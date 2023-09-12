import {PropsWithChildren, useEffect, useMemo, useReducer} from 'react';
import CartContextInstance, {CartContext} from './CartContext';
import {Meal, CartItem} from "../../resources/types";
import logEvent from "../../utils/logger";

interface CartState {
    cartItems: CartItem[],
    totalValue: number,
    cartItemsNo: 0,
}

enum CartActionType {
    ADD = "ADD",
    REMOVE = "REMOVE",
    RESET = "RESET"
}

interface CartActionPayload {
    meal: Meal;
    count: number;
}

type CartAction =
  | { type: CartActionType.ADD | CartActionType.REMOVE, payload: CartActionPayload }
  | { type: CartActionType.RESET }

interface CartProviderProps extends PropsWithChildren {}

const initialCartState: CartState = {
    cartItems: [],
    totalValue: 0,
    cartItemsNo: 0,
};

const initCart = () => ({
    cartItems: [],
    totalValue: 0,
    cartItemsNo: 0,
}) as CartState;

const findMealInCart = (cartState: CartState, id: string) => {
    const index = cartState.cartItems.findIndex(
        (item) => item.id === id
    );

    const cartItem = cartState.cartItems.at(index);

    return {
        cartItem,
        index
    };
}

const getMealPrice = (meals: Meal[], id: string) => {
    const meal = meals.find((meal) => meal.id === id);
    if (meal) return meal.price;
    return 0;
}

const cartReducer = (prevState: CartState, action: CartAction) => {
    switch (action.type) {
        case CartActionType.ADD:{
            if (!action?.payload.meal || action.payload.count < 1)
                return prevState;

            const { meal, count } = action.payload;
            const { cartItem, index } = findMealInCart(prevState, meal.id);

            if (meal && count > 0){
                let newCartState: CartState = {
                    ...prevState
                };

                if (cartItem && index > -1){
                    newCartState.cartItems[index].count += count;
                } else{
                    newCartState.cartItems.push({
                        id: meal.id,
                        count: count
                    });
                }

                newCartState.totalValue += count * meal.price;
                newCartState.cartItemsNo += count;

                console.log(newCartState);
                return newCartState;
            }

            return prevState;
        }
        case CartActionType.REMOVE:{
            if (!action?.payload)
                return prevState;

            const { meal, count } = action.payload;
            const { cartItem, index} = findMealInCart(prevState, meal.id);

            if (meal && count > 0 && cartItem && index > -1 && cartItem.count - count >= 0){
                let newCartState: CartState = {
                    ...prevState
                };

                if (cartItem.count - count === 0){
                    newCartState.cartItems.splice(index, 1);
                } else {
                    newCartState.cartItems[index].count -= count;
                }

                newCartState.totalValue -= count * meal.price;
                newCartState.cartItemsNo -= count;

                console.log(newCartState);

                return newCartState;
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

    const addItemToCartHandler = (meal: Meal, count: number) => {
        dispatchCartAction({ type: CartActionType.ADD, payload: {
                meal: meal,
                count: count
            } });
    };

    const removeItemFromCartHandler = (meal: Meal, count: number) => {
        dispatchCartAction({ type: CartActionType.REMOVE, payload: {
                meal: meal,
                count: count
            } });
    };

    const resetCart = () => {
        dispatchCartAction({type: CartActionType.RESET});
    }

    const cartContextValue: CartContext = useMemo(() => ({
        cartItems: cartState.cartItems,
        totalValue: cartState.totalValue,
        cartItemsNo: cartState.cartItemsNo,
        addCartItem: addItemToCartHandler,
        removeCartItem: removeItemFromCartHandler,
        reset: resetCart,
    }), [cartState]);

    return (
        <CartContextInstance.Provider value={cartContextValue}>
            {props.children}
        </CartContextInstance.Provider>
    );
};

export default CartProvider;
