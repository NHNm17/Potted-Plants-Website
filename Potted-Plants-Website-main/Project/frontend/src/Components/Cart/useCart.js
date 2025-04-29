import { useState } from 'react';

function useCart() {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((i) => i._id === product._id);  // Changed to _id
            if (existingItem) {
                return prevItems.map((i) =>
                    i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i  // Changed to _id
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) =>
            prevItems
                .map((item) =>
                    item._id === productId ? { ...item, quantity: item.quantity - 1 } : item  // Changed to _id
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return { cartItems, addToCart, removeFromCart, clearCart };
}

export default useCart;