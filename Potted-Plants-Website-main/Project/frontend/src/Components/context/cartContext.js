import React, { createContext, useContext, useState, useEffect } from "react";


const CartContext = createContext();


export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);


    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((i) => i._id === product._id);
            if (existingItem) {
                return prevItems.map((i) =>
                    i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i
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
                    item._id === productId ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0)
        );
    };


    const clearCart = () => {
        setCartItems([]);
    };


    // Compute total cart count
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);


    // Log cart count whenever cartItems changes
    useEffect(() => {
        console.log("Cart count:", cartCount);
    }, [cartItems]);


    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};


export const useCart = () => useContext(CartContext);



