import useCart from "../../hooks/useCart";
import CartItem from "./CartItem";

interface CartProps {

}

export default function Cart(props: CartProps){
    const { addMeal, removeMeal, mealsNo, meals, totalValue } = useCart();

    return (
        <div className='cart'>
            <ul className='cart--item-list'>
                {meals.map((meal, index) => <CartItem item={meal} listNo={index+1} />)}
            </ul>
        </div>
    );
}