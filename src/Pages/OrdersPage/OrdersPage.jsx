import { useEffect, useState } from "react";
import { getOrders, deleteOrder } from "../api";
import styles from "../styles/Orders.module.css";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await getOrders(token);
                setOrders(res.data.orders);
            } catch (err) {
                console.error("Error fetching orders:", err);
            }
        };
        fetchOrders();
    }, [token]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            try {
                await deleteOrder(id, token);
                setOrders(orders.filter(order => order.id !== id));
            } catch (err) {
                console.error("Error deleting order:", err);
            }
        }
    };

    return (
        <div className={styles.container}>
            <h2>Orders</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        {order.first_name} {order.last_name} - {order.phone} - {order.city}
                        <button className={styles.deleteButton} onClick={() => handleDelete(order.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrdersPage;
