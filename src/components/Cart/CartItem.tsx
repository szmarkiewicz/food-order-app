import {useCallback} from "react";
import {CartItem, Meal} from "../../resources/types";
import useMeals from "../../hooks/useMeals";
import {formatPrice} from "../../utils/utilityFunctions";

interface CartItemProps {
    item: CartItem;
    noOnList: number;
}

const getMeal = (meals: Meal[], id: string) => {
    return meals.find((meal) => meal.id === id);
};

export default function CartItemComponent(props: CartItemProps){
    const { item, noOnList } = props;
    const { meals } = useMeals();

    const fetchMeal = useCallback(getMeal, [item.id, meals]);

    const meal = fetchMeal(meals, item.id);


    if (meal) {
      const mealPrice = formatPrice(item.count * meal?.price);

      return (<li className='cart-item' key={noOnList}>
        <div className='cart-item--number'>{noOnList}</div>
        <div className='cart-item--image'>
          <img src={meal?.image} alt={meal?.name} />
        </div>
        <div className='cart-item--name'>{meal?.name}</div>
        <div className='cart-item--count'>{item.count}</div>
        <div className='cart-item--total-price'>{mealPrice}</div>
      </li>);
    } else {
      return <div className='cart-item--error'>Could not load this meal.</div>;
    }
}