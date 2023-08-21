import {Meal} from "../../resources/types";
import MealItem from "./Meal";

interface MealsListProps {
  meals: Meal[];
}

export default function MealsList(props: MealsListProps){
  const { meals } = props;

  return (
    <ul className="meals-list">
      {meals.map((mealItem) => {
        return <MealItem meal={mealItem} />
      })}
    </ul>
  );
}