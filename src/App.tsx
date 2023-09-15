import React from 'react';
import './App.css';
import CartProvider from "./store/Cart/CartProvider";
import Cart from "./components/Cart/Cart";
import MealsList from "./components/Meals/MealsList";
import Info from "./components/Info/Info";
import MealsProvider from "./store/Meals/MealsProvider";
import Checkout from "./components/Checkout/Checkout";

function App() {
    return (
        <MealsProvider>
            <CartProvider>
                <Cart />
                <Info />
                <MealsList/>
                <Checkout />
            </CartProvider>
        </MealsProvider>
    );
}

export default App;
