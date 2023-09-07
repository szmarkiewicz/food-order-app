import {PropsWithChildren, useReducer} from 'react';
import CartContextInstance, {CartContext} from './CartContext';
import {Meal, CartItem} from "../../resources/types";

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

const initCart = () => {
    return initialCartState;
};

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
            if (!action?.payload)
                return prevState;

            const { meal, count } = action.payload;
            const { cartItem, index } = findMealInCart(prevState, meal.id);

            if (count > 0 && cartItem && index){
                if (index === -1){
                    prevState.cartItems.push({
                        id: meal.id,
                        count: count
                    });
                } else{
                    cartItem.count += count;
                }

                prevState.totalValue += count * meal.price;
            }

            return prevState;
        }
        case CartActionType.REMOVE:{
            if (!action?.payload)
                return prevState;

            const { meal, count } = action.payload;
            const { cartItem, index} = findMealInCart(prevState, meal.id);

            if (index !== -1 && cartItem && count > 0 && count <= cartItem?.count){
                cartItem.count -= count;

                if (cartItem.count === 0){
                    prevState.cartItems.splice(index, 1);
                }

                prevState.totalValue -= count * meal.price;
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

    const cartContext: CartContext = {
        cartItems: cartState.cartItems,
        totalValue: cartState.totalValue,
        cartItemsNo: cartState.cartItemsNo,
        addCartItem: addItemToCartHandler,
        removeCartItem: removeItemFromCartHandler,
        reset: resetCart,
    };

    return (
        <CartContextInstance.Provider value={cartContext}>
            {props.children}
        </CartContextInstance.Provider>
    );
};

export default CartProvider;
