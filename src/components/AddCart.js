import { useContext } from 'react';
import { cartContext } from './CartDetailsContext';
function AddCart(){
    let items=["Fruits","Rice","Vegetables","Medicine","Meat","Dress","Groceries","Toys"];
    const [cartItems,AddCartItem]=useContext(cartContext);
    const addItem=(item)=>{
        AddCartItem([...cartItems,item]);
            }
    return(
        <div class="container-lg p-5">
            <div class="row">
                <div class="col-9">
            <h2 class="px-1 pb-3">Add Items to Cart</h2>
            </div>
            <div class="col-3 d-flex align-items-center justify-content-center">
                <button>Go to Cart</button>
            </div>
            </div>
            {items.map(item=>
                <div class="card m-2">
                    <div class="card-body">
                    <button onClick={()=>addItem(item)}>Add {item}</button>
                        </div>
                </div>)}
        </div>
    )
}
export default AddCart;