import {useContext} from "react";
import CartContext from "../store/CartContext";
import {CartUtilities} from "../resources/types";

const useCart = () => {
    const cartContext = useContext(CartContext);

    return {
        removeMeal: cartContext.removeItem,
        addMeal: cartContext.addItem,
        meals: cartContext.items,
        totalValue: cartContext.totalValue,
        mealsNo: cartContext.items.length
    } as CartUtilities;
}

export default useCart;