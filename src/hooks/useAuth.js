import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";

export const useAuth = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const login = async (username, password, setToken) => {
        setErrorMessage(""); // Clear previous errors
        try {
            const data = await loginUser(username, password);

            if (data.success) {
                localStorage.setItem("token", data.token); // Store token in localStorage
                setToken(data.token); // Update state in parent
                navigate("/orders"); // Redirect to OrdersPage
            } else {
                setErrorMessage("Invalid username or password.");
            }
        } catch (error) {
            setErrorMessage("Login failed. Please try again.");
        }
    };

    return {
        login,
        errorMessage,
    };
};
