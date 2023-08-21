import {CartItemType} from "../../resources/types";
import {MOCK_MEALS as meals} from "../../resources/constants";
import {useCallback, useEffect} from "react";

interface CartItemProps {
    item: CartItemType;
    noOnList: number;
}

const getMeal = (id: string) => {
    return meals.find((meal) => meal.id === id);
};

export default function CartItem(props: CartItemProps){
    const { item, noOnList } = props;

    const fetchMeal = useCallback(getMeal, [item.id]);

    const meal = fetchMeal(item.id);

    if (meal) {
      return (<li className='cart-item' key={noOnList}>
        <div className='cart-item--number'>{noOnList}</div>
        <div className='cart-item--image'>
          <img src={meal?.image} alt={meal?.name} />
        </div>
        <div className='cart-item--name'>{meal?.name}</div>
        <div className='cart-item--count'>{item.count}</div>
        <div className='cart-item--total-price'>{item.count * meal?.price}</div>
      </li>);
    } else
      return <div className='cart-item--error'>Could not load this meal.</div>;
}