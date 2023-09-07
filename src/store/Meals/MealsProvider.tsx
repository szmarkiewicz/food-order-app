import {PropsWithChildren, useEffect, useReducer} from "react";
import MealsContextInstance, {MealsContext} from "../Meals/MealsContext";
import {Meal} from "../../resources/types";
import {getMeals} from "../../services/meals.service";

interface MealsProviderProps extends PropsWithChildren {}

interface MealsState {
    meals: Meal[],
}

enum MealsActionType {
    ADD = "ADD",
    REMOVE = "REMOVE",
    SET = "SET"
}

type MealsAction =
    | { type: MealsActionType.ADD, payload: MealsAddActionPayload }
    | { type: MealsActionType.REMOVE, payload: MealsRemoveActionPayload }
    | { type: MealsActionType.SET, payload: MealsSetActionPayload }

interface MealsAddActionPayload {
    meal: Meal;
}

interface MealsRemoveActionPayload {
    id: string;
}

interface MealsSetActionPayload {
    meals: Meal[];
}

const initialMealsState: MealsState = {
    meals: [],
};

const initCart = () => {
    return initialMealsState;
}

const mealsReducer = (prevState: MealsState, action: MealsAction) => {
    switch (action.type){
        case MealsActionType.ADD:{
            if (action.payload.meal)
                prevState.meals.push(action.payload.meal);
            return prevState;
        } case MealsActionType.REMOVE:{
            let newState: MealsState = {
                meals: [],
            };
            if (action.payload.id && action.payload.id !== ''){
                const index = prevState.meals.findIndex((meal) => meal.id = action.payload.id);
                if (index > -1){
                    newState.meals = prevState.meals.slice(index, 1);
                    return newState;
                }
            }
            return prevState;
        } case MealsActionType.SET:{
            return {
                meals: action.payload.meals,
            } as MealsState;
        } default:
            return prevState;
    }
}

const MealsProvider = (props: MealsProviderProps) => {
    const [mealsState, dispatchMealsAction] = useReducer(
        mealsReducer,
        initialMealsState,
        initCart
    );

    useEffect(() => {
        getMeals().then(meals => setMealsHandler(meals));
    }, []);

    const addMealHandler = (meal: Meal) => {
        dispatchMealsAction({ type: MealsActionType.ADD, payload: {
                meal: meal,
            } });
    };

    const removeMealHandler = (id: string) => {
        dispatchMealsAction({ type: MealsActionType.REMOVE, payload: {
                id: id,
            } });
    };

    const setMealsHandler = (meals: Meal[]) => {
        console.log(`Setting meals ${meals}`);
        dispatchMealsAction({type: MealsActionType.SET, payload: {
            meals: meals
        }});
    }

    const mealsContext: MealsContext = {
        meals: mealsState.meals,
        addMeal: addMealHandler,
        removeMeal: removeMealHandler,
        setMeals: setMealsHandler,
    };

    return (
        <MealsContextInstance.Provider value={mealsContext}>
            {props.children}
        </MealsContextInstance.Provider>
    );
};

export default MealsProvider;