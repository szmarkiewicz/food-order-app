import useCart from "../../hooks/useCart";
import CartItem from "./CartItem";

interface CartProps {
  show?: boolean;
}

export default function Cart(props: CartProps){
    const { addCartItem, removeCartItem, reset, cartItems, totalValue } = useCart();

    return (
        <div className='cart'>
            <ul className='cart--item-list'>
                {cartItems.map((cartItem, index) => <CartItem item={cartItem} noOnList={index+1} />)}
            </ul>
        </div>
    );
}