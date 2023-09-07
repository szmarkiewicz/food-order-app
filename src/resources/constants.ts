import {MealDTO} from "./types";
import meals from "../assets/meals.json";

export const DEBUG = true;

export const MOCK_MEALS: MealDTO[] = meals.meals;

export const BASE_FETCH_URL = 'https://reactive-meals-f14a0-default-rtdb.firebaseio.com';

export enum METHOD {
    GET = 'GET',
    POST = 'POST'
}