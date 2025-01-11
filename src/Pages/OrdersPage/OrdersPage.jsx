import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../OrdersPage/OrdersPages.module.css"; // Ensure correct file path

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const fetchOrders = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/orders", { // ✅ Fixed API route
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.data.success) {
                    setOrders(res.data.orders);
                } else {
                    console.error("Failed to fetch orders");
                }
            } catch (err) {
                console.error("Error fetching orders:", err);
                if (err.response && err.response.status === 401) {
                    alert("Session expired. Please log in again.");
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            }
        };

        fetchOrders();
    }, [navigate]);

    return (
        <div className={styles.container}>
            <h2>Orders</h2>
            {orders.length > 0 ? (
                <ul>
                    {orders.map(order => (
                        <li key={order.id}>
                            {order.first_name} {order.last_name} - {order.phone} - {order.city}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders available.</p>
            )}
        </div>
    );
};

export default OrdersPage;
