import React from 'react';
import { useCart } from "react-use-cart";
import "./Cart.css";

const Cart = () => {
    const {
        isEmpty,
        items,
        updateItemQuantity,
        removeItem,
        totalItems
    } = useCart();

    if (isEmpty) return <p className="p_cart">Your cart is empty</p>;

    return (
        <>
            <h1 className="h1_cart">Cart ({totalItems})</h1>
            <ul className="ul_cart">
                {items.map((item) => (
                    <li className="li_cart" key={item.id}>
                        {item.quantity} x {item.name} -
                        <button className='button_del'
                            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                        >-</button>
                        <button className='button_plus'
                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        >+</button>
                        <button className='button_del' onClick={() => removeItem(item.id)}>&times;</button>
                    </li>
                ))}
            </ul>
        </>
    );
}
export default Cart