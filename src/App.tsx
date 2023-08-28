import React from 'react';
import './App.css';
import CartProvider from "./store/CartProvider";
import Cart from "./components/Cart/Cart";
import MealsList from "./components/Meals/MealsList";
import {MOCK_MEALS as meals} from "./resources/constants";
import Info from "./components/Info/Info";

function App() {

  const fetchMeals = () => meals;

  return (
    <CartProvider>
      <Cart />
      <Info />
      <MealsList meals={fetchMeals()}/>
    </CartProvider>
  );
}

export default App;
