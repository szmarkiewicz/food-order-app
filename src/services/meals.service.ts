import {BASE_FETCH_URL, METHOD} from "../resources/constants";
import fetcher from "../utils/fetcher";
import {Meal, MealDTO} from "../resources/types";
import {kebabCase} from "../utils/utilityFunctions";

const parseMealsResponse = (mealsObjectArray: MealDTO[]) => {
    let meals: Meal[] = [];

    mealsObjectArray.map((meal) =>
        meals.push({
            id: kebabCase(meal.name),
            name: meal.name,
            description: meal.description,
            price: meal.price,
            image: meal.image
        })
    );

    return meals;
};

export async function getMeals() : Promise<Meal[]> {
    return await fetcher(new URL(`${BASE_FETCH_URL}/meals.json`), METHOD.GET, parseMealsResponse);
}