import { useState } from "react";
import { useAuth } from "../../hooks/useAuth"; // Import the custom hook
import styles from "../LoginPage/LoginPage.module.css";

const LoginPage = ({ setToken }) => {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const { login, errorMessage } = useAuth(); // Use the hook

    const handleLogin = async (e) => {
        e.preventDefault();
        await login(username, password, setToken); // Call the login function from the hook
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
