import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { FaStar, FaEdit, FaTrash } from 'react-icons/fa';
import "./Feedback.css";
import CustomerDashboard from "../Dashboard/CustomerDashboard";


const Feedback = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const productName = queryParams.get('product');
    
    const [feedback, setFeedback] = useState({
        name: "",
        email: "",
        type: "feedback",
        rating: 5,
        message: "",
        image: null,
        imagePreview: ""
    });
    const [submittedFeedbacks, setSubmittedFeedbacks] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch feedbacks on component mount
    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get("http://localhost:5000/feedback");
                setSubmittedFeedbacks(response.data.data);
            } catch (error) {
                console.error("Error fetching feedbacks:", error);
            }
        };
        fetchFeedbacks();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeedback({
            ...feedback,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFeedback({
                ...feedback,
                image: file,
                imagePreview: URL.createObjectURL(file)
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const formData = new FormData();
            formData.append('name', feedback.name);
            formData.append('email', feedback.email);
            formData.append('type', feedback.type);
            formData.append('message', feedback.message);
            formData.append('product', productName || "General");
            if (feedback.type === 'feedback') {
                formData.append('rating', feedback.rating);
            }
            if (feedback.image) {
                formData.append('image', feedback.image);
            }

            let response;
            if (editingId) {
                response = await axios.put(`http://localhost:5000/feedback/${editingId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                response = await axios.post("http://localhost:5000/feedback", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            // Refresh feedback list
            const updatedResponse = await axios.get("http://localhost:5000/feedback");
            setSubmittedFeedbacks(updatedResponse.data.data);
            
            // Reset form
            setFeedback({
                name: "",
                email: "",
                type: "feedback",
                rating: 5,
                message: "",
                image: null,
                imagePreview: ""
            });
            setEditingId(null);
            
            alert(`Feedback ${editingId ? 'updated' : 'submitted'} successfully!`);
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert(`Failed to submit feedback: ${error.response?.data?.error || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (feedbackItem) => {
        setFeedback({
            name: feedbackItem.name,
            email: feedbackItem.email,
            type: feedbackItem.type,
            rating: feedbackItem.rating || 5,
            message: feedbackItem.message,
            image: null,
            imagePreview: feedbackItem.imageUrl || ""
        });
        setEditingId(feedbackItem._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this feedback?")) {
            try {
                await axios.delete(`http://localhost:5000/api/feedback/${id}`);
                setSubmittedFeedbacks(submittedFeedbacks.filter(fb => fb._id !== id));
                alert("Feedback deleted successfully!");
            } catch (error) {
                console.error("Error deleting feedback:", error);
                alert(`Failed to delete feedback: ${error.response?.data?.error || error.message}`);
            }
        }
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <FaStar 
                key={i} 
                color={i < rating ? "#ffc107" : "#e4e5e9"} 
                size={20}
            />
        ));
    };

    return (
        <div>
            <CustomerDashboard/>
            <div className="feedback-container">
                <h1>{productName ? `Feedback for ${productName}` : "Feedback Form"}</h1>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Request Type:</label>
                        <select
                            name="type"
                            value={feedback.type}
                            onChange={handleChange}
                        >
                            <option value="feedback">Feedback</option>
                            <option value="support">Support Request</option>
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label>Your Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={feedback.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={feedback.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    {feedback.type === "feedback" && (
                        <div className="form-group">
                            <label>Rating:</label>
                            <div className="star-rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar
                                        key={star}
                                        color={star <= feedback.rating ? "#ffc107" : "#e4e5e9"}
                                        size={25}
                                        onClick={() => setFeedback({...feedback, rating: star})}
                                        style={{cursor: "pointer", marginRight: "5px"}}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    
                    <div className="form-group">
                        <label>
                            {feedback.type === "feedback" 
                                ? "Your Feedback:" 
                                : "Support Request Details:"}
                        </label>
                        <textarea
                            name="message"
                            value={feedback.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Upload Image (Optional):</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {feedback.imagePreview && (
                            <div className="image-preview">
                                <img src={feedback.imagePreview} alt="Preview" />
                            </div>
                        )}
                    </div>
                    
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? "Processing..." : 
                         (editingId ? "Update" : "Submit")}
                    </button>
                    {editingId && (
                        <button 
                            type="button" 
                            className="cancel-btn"
                            onClick={() => {
                                setFeedback({
                                    name: "",
                                    email: "",
                                    type: "feedback",
                                    rating: 5,
                                    message: "",
                                    image: null,
                                    imagePreview: ""
                                });
                                setEditingId(null);
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </form>
                
                {/* Submitted Feedback History */}
                <div className="submitted-feedbacks">
                    <h2>Your Feedback Submissions</h2>
                    {submittedFeedbacks.length === 0 ? (
                        <p>No feedback submissions yet</p>
                    ) : (
                        submittedFeedbacks.map(item => (
                            <div key={item._id} className="submitted-item">
                                <div className="feedback-header">
                                    <h3>{item.type === "feedback" ? "Feedback" : "Support Request"} for {item.product}</h3>
                                    <div className="feedback-actions">
                                        <button 
                                            className="edit-btn"
                                            onClick={() => handleEdit(item)}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button 
                                            className="delete-btn"
                                            onClick={() => handleDelete(item._id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                                <p><strong>From:</strong> {item.name} ({item.email})</p>
                                {item.type === "feedback" && (
                                    <div className="rating">
                                        <strong>Rating:</strong> 
                                        <div className="stars">
                                            {renderStars(item.rating)}
                                        </div>
                                    </div>
                                )}
                                <p><strong>Message:</strong> {item.message}</p>
                                {item.imageUrl && (
                                    <div className="feedback-image">
                                        <img 
                                            src={`http://localhost:5000${item.imageUrl}`} 
                                            alt="Feedback attachment" 
                                        />
                                    </div>
                                )}
                                <div className="meta">
                                    <span>Submitted: {new Date(item.createdAt).toLocaleString()}</span>
                                    {item.type === "support" && (
                                        <span className={`status ${item.status}`}>
                                            Status: {item.status}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Feedback;