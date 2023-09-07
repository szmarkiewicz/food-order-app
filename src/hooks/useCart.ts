import {useContext} from "react";
import CartContextInstance from "../store/Cart/CartContext";

const useCart = () => useContext(CartContextInstance);

export default useCart;