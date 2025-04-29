import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import { useCart } from '../context/cartContext'; 
import CustomerDashboard from '../Dashboard/CustomerDashboard';


export default function Cart() {
    const navigate = useNavigate();
    const { cartItems, addToCart, removeFromCart, clearCart } = useCart();  // <-- use the correct names!

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        const checkoutData = {
            items: cartItems,
            paymentMethod: 'card'
        };
        localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
        navigate('/adddelivery');
    };


    return (
        <div>
            <CustomerDashboard/>
       
        <div className="cart">
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <div key={item._id} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-image" />
                            <div className="cart-details">
                                <h3>{item.name}</h3>
                                <p>Rs {item.price.toLocaleString()}</p>
                                <div className="cart-controls">
                                    <button onClick={() => removeFromCart(item._id)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => addToCart(item)}>+</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <h2>Total: Rs {totalPrice.toLocaleString()}</h2>

                    <button className="checkout-button" onClick={handleCheckout}>
                        Proceed to Checkout
                    </button>
                    <button className="clear-cart" onClick={clearCart}>Clear Cart</button>
                </div>
            )}
        </div>
        </div>
    );
}