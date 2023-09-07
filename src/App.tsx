import React from 'react';
import './App.css';
import CartProvider from "./store/Cart/CartProvider";
import Cart from "./components/Cart/Cart";
import MealsList from "./components/Meals/MealsList";
import Info from "./components/Info/Info";
import MealsProvider from "./store/Meals/MealsProvider";

function App() {
    return (
        <MealsProvider>
            <CartProvider>
                <Cart />
                <Info />
                <MealsList/>
            </CartProvider>
        </MealsProvider>
    );
}

export default App;
