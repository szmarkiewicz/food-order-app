import {Meal} from "../../resources/types";

interface MealProps {
  meal: Meal;
}

export default function MealItem(props: MealProps){
  const { meal } = props;

  return (
    <li className="meal" key={meal.id}>
      <div className="meal--name">{meal.name}</div>
      <div className="meal--description">{meal.description}</div>
      <div className="meal--price">{meal.price}$</div>
      <button>Add</button>
    </li>
  );
}