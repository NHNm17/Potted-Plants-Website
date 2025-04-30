import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";
import { useCart } from "../context/cartContext";
import CustomerDashboard from "../Dashboard/CustomerDashboard";
import { toast } from "react-toastify";


const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();

    const handleCheckout = () => {
        navigate('/adddelivery', {});
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/products/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (apiError) {
                console.log("API fetch failed, checking local data");
                try {
                    const initialProducts = [];
                    const foundProduct = initialProducts.find(p => p.id === id);
                    if (foundProduct) {
                        setProduct(foundProduct);
                    } else {
                        throw new Error("Product not found");
                    }
                } catch (localError) {
                    setError("Product not found");
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchProduct();
    }, [id, navigate]);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!product) return <div className="error">Product not found</div>;

    return (
        <div>
            <CustomerDashboard/>
            <div className="product-detail-container">
                <div className="product-detail-image">
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="product-detail-info">
                    <h1>{product.name}</h1>
                    <p className="price">Rs.{product.price.toFixed(2)}</p>
                    <p className="description">{product.description || "No description available"}</p>
                    <p className={product.stock === 0 ? "out-of-stock" : "in-stock"}>
                        {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
                    </p>
                    <div className="product-actions">
                        <button
                                        onClick={() => {
                                          addToCart(product);
                                          toast.success(`${product.name} added to cart! 🛒`, {
                                            position: "top-right",
                                            autoClose: 2000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "colored",
                                          });
                                        }}
                                        className="add-cart"
                                        disabled={product.stock === 0}
                                      >
                                        {product.stock > 0 ? "Add to Cart" : "Sold Out"}
                                      </button>
                                      <button className="buy-now" disabled={product.stock === 0} onClick={handleCheckout}>
                {product.stock > 0 ? "Buy Now" : "Sold Out"}
              </button>
                    </div>
                    <a 
                        href={`/feedback?product=${encodeURIComponent(product.name)}`} 
                        className="feedback-link"
                    >
                        <h2>Feedback and Support</h2>
                    </a>
                    <p>Press this to view previous Feedbacks and to add new feedbacks and Support requests.</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;