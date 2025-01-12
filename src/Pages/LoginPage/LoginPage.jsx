import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For redirection
import styles from "../LoginPage/LoginPage.module.css";

const LoginPage = ({ setToken }) => {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Show error messages
    const navigate = useNavigate(); // Hook for navigation

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // Clear previous errors

        try {
            const res = await axios.post("https://luminisapi.onrender.com/api/login", {
                username,
                password
            });

            if (res.data.success) {
                localStorage.setItem("token", res.data.token); // Store token
                setToken(res.data.token);
                navigate("/orders"); // Redirect to OrdersPage
            } else {
                setErrorMessage("Invalid username or password.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("Login failed. Please try again.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginCard}>
                <h2>Вход</h2>

                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

                <form onSubmit={handleLogin}>
                    <div className={styles.inputGroup}>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />
                    </div>

                    <button className={styles.loginButton} type="submit">Влез</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
