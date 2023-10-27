import { useState } from "react";
import {cartContext} from './CartDetailsContext';
const CartContextProvider=(props)=>{
    const [cartItems,AddCartItem]=useState([]);
    return(
    <cartContext.Provider value={[cartItems,AddCartItem]}>
        {props.children}
    </cartContext.Provider>
    )
}
export default CartContextProvider;