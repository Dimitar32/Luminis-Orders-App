import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./Pages/LoginPage/LoginPage";
import OrdersPage from "./Pages/OrdersPage/OrdersPage";
import { ThemeProvider } from "./ThemeContext";
import ThemeToggle from "./ThemeToggle";

function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));

    return (
        <Routes>
            {/* Redirect root path ("/") to Login */}
            <Route path="/" element={<Navigate to="/login" />} />
            
            {/* Pass setToken as a prop to LoginPage */}
            <Route path="/login" element={<LoginPage setToken={setToken} />} />
            
            {/* Protect OrdersPage */}
            {/* <Route path="/orders" element={token ? <OrdersPage /> : <Navigate to="/login" />} /> */}

            {/* Protect OrdersPage with ThemeProvider */}
            <Route path="/orders" element={token ? (
                <ThemeProvider>
                    <div>
                    <ThemeToggle />
                    <OrdersPage />
                    </div>
                </ThemeProvider>
            ) : <Navigate to="/login" />} />
        </Routes>
    );
}

export default App;
