import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./Pages/LoginPage/LoginPage";
import OrdersPage from "./Pages/OrdersPage/OrdersPage";

function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));

    return (
            <Routes>
                {/* Pass setToken as a prop */}
                <Route path="/login" element={<LoginPage setToken={setToken} />} />
                <Route path="/orders" element={token ? <OrdersPage /> : <Navigate to="/login" />} />
            </Routes>
    );
}

export default App;
