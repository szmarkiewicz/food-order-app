import MealItem from "./MealItem";
import useMeals from "../../hooks/useMeals";

export default function MealsList(){
  const { meals } = useMeals();

  return (
    <ul className="meals-list">
      {meals.map((mealItem) => {
        return <MealItem meal={mealItem} key={mealItem.id}/>
      })}
    </ul>
  );
}