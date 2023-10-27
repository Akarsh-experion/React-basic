import { useContext } from 'react';
import {cartContext} from './CartDetailsContext';
export function ListCart(){
    const [cartItems]=useContext(cartContext);
    console.log(cartItems);
    return(
        <div class="container-lg p-5">
            <h2>Cart Items</h2>
            {cartItems.map(item=>
            <li>{item}</li>
            )}
        </div>
    )
}