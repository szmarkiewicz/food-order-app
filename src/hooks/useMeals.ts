import {useContext} from "react";
import MealsContextInstance from "../store/Meals/MealsContext";

const useMeals = () => useContext(MealsContextInstance);

export default useMeals;