import React from 'react';
import './App.css';
import CartProvider from "./store/CartProvider";
import Cart from "./components/Cart/Cart";

function App() {
  return (
    <CartProvider>
      <Cart />
    </CartProvider>
  );
}

export default App;
