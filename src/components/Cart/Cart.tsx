import useCart from "../../hooks/useCart";
import CartItem from "./CartItem";
import logEvent from "../../utils/logger";
import {useEffect} from "react";
import {formatPrice} from "../../utils/utilityFunctions";

interface CartProps {
  show?: boolean;
}

export default function Cart({show = true}: CartProps){
    const { addCartItem, removeCartItem, reset, cartItems, totalValue } = useCart();

    return (
        <div className='cart'>
            <ul className='cart--item-list'>
                {cartItems.map((cartItem, index) => <CartItem item={cartItem} noOnList={index+1} />)}
            </ul>
            <div className='cart--total-value'>{formatPrice(totalValue)}$</div>
          <button className='cart--clear-cart-btn' onClick={() => reset()}>Clear cart</button>
        </div>
    );
}