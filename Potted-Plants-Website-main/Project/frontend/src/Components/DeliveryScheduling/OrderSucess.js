import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderSucess.css';


export default function OrderSucess() {
    const navigate = useNavigate();


    return (
        <div className="success-container">
            <div className="success-message">
                <h1>🎉 Your order is successful! 🎉</h1>
                <p>Your order is being processed.</p>
                <button onClick={() => navigate('/product-page')} className="home-button">
                    Back to Home
                </button>
            </div>
        </div>
    );
}