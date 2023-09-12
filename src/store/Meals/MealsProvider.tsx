import {PropsWithChildren, useCallback, useEffect, useMemo, useReducer} from "react";
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

const initMeals = () => {
    return initialMealsState;
}

const mealsReducer = (prevState: MealsState, action: MealsAction) => {
    switch (action.type){
        case MealsActionType.ADD:{
            if (action.payload.meal){
                let newMealsState: MealsState = {
                    ...prevState
                };

                newMealsState.meals.push(action.payload.meal);

                return newMealsState
            }

            return prevState;
        } case MealsActionType.REMOVE:{
            if (action.payload.id && action.payload.id !== ''){
                let newMealsState: MealsState = {
                    ...prevState
                };
                const index = newMealsState.meals.findIndex((meal) => meal.id = action.payload.id);

                if (index > -1){
                    newMealsState.meals.splice(index, 1);
                    return newMealsState;
                }
            }
            return prevState;
        } case MealsActionType.SET:{
            if (action.payload.meals && action.payload.meals.length > 0)
                return {
                    meals: action.payload.meals,
                } as MealsState;

            return prevState;
        } default:
            return prevState;
    }
}

const MealsProvider = (props: MealsProviderProps) => {
    const [mealsState, dispatchMealsAction] = useReducer(
        mealsReducer,
        initialMealsState,
        initMeals
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
        dispatchMealsAction({type: MealsActionType.SET, payload: {
            meals: meals
        }});
    }

    const mealsContext: MealsContext = useMemo(() => ({
        meals: mealsState.meals,
        addMeal: addMealHandler,
        removeMeal: removeMealHandler,
        setMeals: setMealsHandler,
    }), [mealsState]);

    return (
        <MealsContextInstance.Provider value={mealsContext}>
            {props.children}
        </MealsContextInstance.Provider>
    );
};

export default MealsProvider;