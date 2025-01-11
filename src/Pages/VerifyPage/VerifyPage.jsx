import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./VerifyPage.module.css";

const VerifyPage = ({ username, setToken }) => {
    const [code, setCode] = useState("");
    const navigate = useNavigate();

    const handleVerify = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/verify", {
                username,
                code
            });

            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                setToken(res.data.token);
                navigate("/orders"); // Redirect to orders page
            } else {
                alert("Invalid verification code");
            }
        } catch (error) {
            console.error("Verification error:", error);
            alert("Verification failed");
        }
    };

    return (
        <div className={styles.container}>
            <h2>Enter Verification Code</h2>
            <form onSubmit={handleVerify}>
                <input type="text" placeholder="6-digit Code" value={code} onChange={(e) => setCode(e.target.value)} />
                <button type="submit">Verify</button>
            </form>
        </div>
    );
};

export default VerifyPage;
