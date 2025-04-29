import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa'; // Importing trash bin icon from react-icons
import './Wishlist.css';
import CustomerDashboard from "../Dashboard/CustomerDashboard";


export default function Wishlist() {
    const [wishlistItems, setWishlistItems] = useState([]);


    // Hardcoded userId (replace with dynamic if needed)
    const userId = '660c5b8f0d3f2b001f3d3e4a';


    useEffect(() => {
        fetchWishlist();
    }, []);


    const fetchWishlist = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/wishlist/${userId}`);
            const data = await response.json();
            if (data.success) {
                setWishlistItems(data.wishlist.products);
            }
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    };


    const updateQuantity = async (productId, quantity) => {
        if (quantity < 1) {
            removeFromWishlist(productId);
            return;
        }


        try {
            const response = await fetch('http://localhost:5000/api/wishlist/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, productId, quantity }),
            });


            const data = await response.json();
            if (data.success) {
                setWishlistItems(prevItems =>
                    prevItems.map(item =>
                        item.productId._id === productId ? { ...item, quantity } : item
                    )
                );
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };


    const removeFromWishlist = async (productId) => {
        try {
            const response = await fetch('http://localhost:5000/api/wishlist/remove', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, productId }),
            });


            const data = await response.json();
            if (data.success) {
                setWishlistItems(prevItems => prevItems.filter(item => item.productId._id !== productId));
            }
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };


    return (
        <div>
            <CustomerDashboard />
        <div className="wishlist-container">
            <h2>My Wishlist</h2>
            {wishlistItems.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <div className="wishlist-grid">
                    {wishlistItems.map(item => (
                        <div key={item.productId._id} className="wishlist-card">
                            <img src="/images/Plant1.jpg" alt={item.productId.name} className="wishlist-image" />


                            <div className="wishlist-info">
                                <h3>{item.productId.name}</h3>
                                <p className="wishlist-price">Rs {item.productId.price.toLocaleString()}</p>
                            </div>


                            <div className="quantity-controls">
                                <button onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}>+</button>
                            </div>


                            <button
                                onClick={() => removeFromWishlist(item.productId._id)}
                                className="remove-btn">
                                <FaTrashAlt /> {/* Adding the trash bin icon */}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </div>
    );
}