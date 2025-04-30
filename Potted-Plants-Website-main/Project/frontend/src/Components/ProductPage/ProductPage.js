import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductPage.css";
import axios from "axios";
import CustomerDashboard from "../Dashboard/CustomerDashboard";
import { useCart } from "../context/cartContext";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa"; // ❤️ Import heart icon


const initialProducts = [];


const ProductPage = () => {
  const [products, setProducts] = useState(initialProducts);
  const navigate = useNavigate();
  const { addToCart } = useCart();


  const userId = "660c5b8f0d3f2b001f3d3e4a"; // Replace with dynamic userId later


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);


  const viewProductDetails = (productId) => {
    navigate(`/product/${productId}`);
  };
  const handleCheckout = () => {
    navigate('/adddelivery', {});
};




  const addToWishlist = async (product) => {
    try {
      const payload = {
        userId,
        productId: product._id,
        quantity: 1,
        image: product.image
      };


      console.log("Sending wishlist payload:", payload); // 🐛 Debug log


      const response = await axios.post("http://localhost:5000/wishlist/add", payload);


      if (response.data.success) {
        toast.success("Added to wishlist ❤️", {
          position: "top-right",
          autoClose: 1500,
          theme: "colored",
        });


        setTimeout(() => {
          navigate("/wishlist");
        }, 1500); // Wait for the toast to show before navigating
      } else {
        toast.warning("Already in wishlist!", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add to wishlist!", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };


 


  return (
    <div>
      <CustomerDashboard />
      <div className="product-container">
        <h2>Our Products</h2>
        <div className="product-list">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                onClick={() => viewProductDetails(product._id)}
                style={{ cursor: "pointer" }}
              />


              {/* ❤️ Heart Icon */}
              <button
                className="wishlist-icon"
                onClick={() => addToWishlist(product)}
                title="Add to Wishlist"
              >
                ❤️
              </button>


              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Rs.{product.price.toFixed(2)}</p>
              <p className={product.stock === 0 ? "out-of-stock" : "in-stock"}>
                {product.stock > 0 ? `Stock: ${product.stock}` : "Out of Stock"}
              </p>


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


              <a
                href={`/feedback?product=${encodeURIComponent(product.name)}`}
                className="feedback-link"
              >
                Feedback
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default ProductPage;



