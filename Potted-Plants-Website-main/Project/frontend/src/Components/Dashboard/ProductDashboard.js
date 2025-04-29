import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import "./ProductDashboard.css";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const { user,logout } = useAuth();
    const navigate= useNavigate();
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        stock: "",
        image: "",
        description: ""
    });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    
    useEffect(() => {
       if (!user || user.role !== 'ProductAdmin') { // assume user has a "role" field
            navigate("/login");
          }
          fetchProducts();
        }, [user, navigate]);
        
       


    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:5000/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
            setError("Failed to load products. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (editingId) {
                await axios.put(`http://localhost:5000/products/${editingId}`, formData);
                setMessage("Product updated successfully");
            } else {
                await axios.post("http://localhost:5000/products", formData);
                setMessage("Product added successfully");
            }
            fetchProducts();
            setFormData({
                name: "",
                price: "",
                stock: "",
                image: "",
                description: ""
            });
            setEditingId(null);
        } catch (error) {
            console.error("Error saving product:", error);
            setError("Failed to save product. Please try again.");
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const handleEdit = (product) => {
        setFormData({
            name: product.name,
            price: product.price,
            stock: product.stock,
            image: product.image,
            description: product.description
        });
        setEditingId(product._id);
        setImagePreview(product.image);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                setLoading(true);
                await axios.delete(`http://localhost:5000/products/${id}`);
                fetchProducts();
                setMessage("Product deleted successfully");
                setTimeout(() => setMessage(null), 3000);
            } catch (error) {
                console.error("Error deleting product:", error);
                setError("Failed to delete product. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div>
            <div className="admin-dashboard">
                <h1>Welcome to Product-Admin Dashboard, {user?.name} </h1>
                
                {/* Display loading, error, and message states */}
                {loading && <div className="status-message loading">Loading...</div>}
                {error && <div className="status-message error">{error}</div>}
                {message && <div className="status-message success">{message}</div>}
                
                <div className="product-form">
                    <h2>{editingId ? "Edit Product" : "Add New Product"}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Price:</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Stock:</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Image URL:</label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={(e) => {
                                    handleInputChange(e);
                                    setImagePreview(e.target.value);
                                }}
                                required
                            />
                            {imagePreview && (
                                <div className="image-preview">
                                    <img src={imagePreview} alt="Preview" />
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {editingId ? "Update Product" : "Add Product"}
                        </button>
                        {editingId && (
                            <button 
                                type="button" 
                                className="cancel-btn"
                                onClick={() => {
                                    setFormData({
                                        name: "",
                                        price: "",
                                        stock: "",
                                        image: "",
                                        description: ""
                                    });
                                    setEditingId(null);
                                    setImagePreview("");
                                }}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                        )}
                    </form>
                </div>

                <div className="product-list">
                    <h2>Product List</h2>
                    {products.length === 0 && !loading ? (
                        <p>No products found</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td>
                                            <img 
                                                src={product.image} 
                                                alt={product.name} 
                                                className="admin-product-image"
                                            />
                                        </td>
                                        <td>{product.name}</td>
                                        <td>Rs.{product.price.toFixed(2)}</td>
                                        <td>{product.stock}</td>
                                        <td>
                                            <button 
                                                className="edit-btn"
                                                onClick={() => handleEdit(product)}
                                                disabled={loading}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                className="delete-btn"
                                                onClick={() => handleDelete(product._id)}
                                                disabled={loading}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <div style={{ marginTop: "30px", textAlign: "center" }}>
        <button 
          onClick={logout} 
          className="logout-btn" 
          style={{
            backgroundColor: "#e63946",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Logout
        </button>
      </div>
            </div>
        </div>
    );
};

export default AdminDashboard;