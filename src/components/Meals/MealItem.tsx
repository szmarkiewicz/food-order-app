import {Meal} from "../../resources/types";
import useCart from "../../hooks/useCart";
import React, {useRef} from "react";
import logEvent from "../../utils/logger";

interface MealProps {
  meal: Meal;
}

export default function MealItem(props: MealProps){
  const { meal } = props;
  const { addCartItem } = useCart();
  const mealQuantityRef = useRef<HTMLInputElement>(null);

  const handleAddMealToCart = (event: React.MouseEvent<HTMLButtonElement>, meal: Meal) => {
      event.preventDefault();

      if (mealQuantityRef?.current && +mealQuantityRef.current.value > 0){
        logEvent(`ref accessed ${+mealQuantityRef.current.value}`);
        addCartItem(meal, +mealQuantityRef.current.value);
      }
  }

  return (
    <li className="meal">
      <div className="meal--name">{meal.name}</div>
      <div className="meal--description">{meal.description}</div>
      <div className="meal--price">{meal.price}$</div>
      <input className="meal--chosen-quantity" ref={mealQuantityRef} type="number"/>
      <button onClick={(event) => handleAddMealToCart(event, meal)}>Add</button>
    </li>
  );
}