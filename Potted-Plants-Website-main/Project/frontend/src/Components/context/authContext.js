import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [token, setToken] = useState(localStorage.getItem("token"));
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [loading, setLoading] = useState(true);
const [alert, setAlert] = useState(null);
const navigate = useNavigate();

// Set auth token globally
const setAuthToken = (token) => {
    if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
    delete axios.defaults.headers.common["Authorization"];
    }
};

// Load user details
const loadUser = async () => {
    try {
    if (!token) return;
    setAuthToken(token);
    const res = await axios.get("/auth/user");
    setUser(res.data);
    setIsAuthenticated(true);
    } catch (err) {
    console.error(err.response?.data?.message || "Error loading user");
    logout();
    } finally {
    setLoading(false);
    }
};

// Register user
const register = async (formData) => {
    try {
    const res = await axios.post("/auth/register", formData);
    const { token, role } = res.data;

    localStorage.setItem("token", token);
    setToken(token);
    setAuthToken(token); // Ensure header is set
    await loadUser(); // Load user immediately

    setAlert({ message: "Registration successful!", type: "success" });
    setTimeout(() => {
        navigate(
        role === "UserAdmin"
            ? "/admin-dashboard"
            : role === "ProductAdmin"
            ? "/product-dashboard"
            : role === "DeliveryAdmin"
            ?"/delivery-dashboard"
            : "/dashboard"
        );
    }, 1500);
    } catch (err) {
    console.error(err.response?.data?.message || "Registration failed");
    setAlert({
        message: err.response?.data?.message || "Registration failed",
        type: "error",
    });
    }
};

// Login user
const login = async (formData, navigate) => {
    try {
    const res = await axios.post("/auth/login", formData);
    console.log("Login Response:", res.data);

    const { token, role } = res.data;
    localStorage.setItem("token", token);
    setToken(token);
    setAuthToken(token);

    await loadUser(); // Wait for user state to update

    setAlert({ message: "Login successful!", type: "success" });

    setTimeout(() => {
        if (role === "UserAdmin") {
        navigate("/admin-dashboard");
        } else if (role === "ProductAdmin") {
        navigate("/product-dashboard");
    } else if (role === "DeliveryAdmin") {
        navigate("/delivery-dashboard");
        } else {
        navigate("/dashboard");
        }
    }, 500);
    } catch (err) {
    console.error("Login error:", err.response?.data?.message || err.message);
    setAlert({ message: err.response?.data?.message || "Login failed", type: "error" });
    }
};


// Logout user
const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
};

useEffect(() => {
    if (token) {
    setAuthToken(token);
    loadUser();
    } else {
    setLoading(false);
    }
}, [token]);

return (
    <AuthContext.Provider
    value={{
        user,
        token,
        isAuthenticated,
        loading,
        alert,
        setUser,
        register,
        login,
        logout,
    }}
    >
    {children}
    </AuthContext.Provider>
);
};

export const useAuth = () => useContext(AuthContext);
