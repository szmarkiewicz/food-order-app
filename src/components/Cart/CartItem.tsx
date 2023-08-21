import {CartItemType} from "../../resources/types";
import {MOCK_MEALS as meals} from "../../resources/constants";
import {useCallback, useEffect} from "react";

interface CartItemProps {
    item: CartItemType;
    listNo: number;
}

const getMeal = (id: string) => {
    return meals.find((meal) => meal.id === id);
};

export default function CartItem(props: CartItemProps){
    const { item, indexNo } = props;

    const fetchMeal = useCallback(getMeal, [item.id]);

    const meal = fetchMeal(item.id);

    return (
        <li className='cart-item' key={item.id}>
            <div className='cart-item--number'>{indexNo}</div>
            <div className='cart-item--image'>
                <img src={meal.image} alt={meal.name} />
            </div>
            <div className='cart-item--name'>{meal.name}</div>
            <div className='cart-item--count'>{item.count}</div>
        </li>
    );
}