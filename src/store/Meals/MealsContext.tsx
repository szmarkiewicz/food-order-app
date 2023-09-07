import { createContext } from 'react';
import {Meal} from "../../resources/types";

export interface MealsContext {
    meals: Meal[];
    addMeal(meal: Meal): void;
    removeMeal(mealId: string): void;
    setMeals(meals: Meal[]): void;
}

export default createContext<MealsContext>({
    meals: [],
    addMeal: () => {},
    removeMeal: () => {},
    setMeals: () => {},
});