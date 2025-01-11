import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For redirection
import styles from "../LoginPage/LoginPage.module.css";

const LoginPage = ({ setToken }) => {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate(); // Hook for navigation

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/login", {
                username,
                password
            });

            if (res.data.success) {
                localStorage.setItem("token", res.data.token); // Store token
                setToken(res.data.token);
                navigate("/orders"); // Redirect to OrdersPage
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed");
        }
    };

    return (
        <div className={styles.container}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
