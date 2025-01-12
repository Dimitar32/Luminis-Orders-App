import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../OrdersPage/OrdersPages.module.css"; // Ensure correct file path

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]); // Stores filtered orders
    const [openOrder, setOpenOrder] = useState(null); // Track which order is open
    const [filterStatus, setFilterStatus] = useState("all"); // Track selected filter
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const fetchOrders = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/orders", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.data.success) {
                    const ordersData = res.data.orders.map(order => ({
                        ...order,
                        status: order.status.toLowerCase() // Normalize case
                    }));

                    setOrders(ordersData);
                    setFilteredOrders(ordersData); // Initially show all orders
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

    /**
     * ✅ Function to Update Order Status
     */
    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.put(`http://localhost:5000/api/orders/${orderId}`, 
                { status: newStatus }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                alert("Order status updated successfully!");

                // Update orders state
                const updatedOrders = orders.map(order =>
                    order.id === orderId ? { ...order, status: newStatus.toLowerCase() } : order
                );

                setOrders(updatedOrders);
                filterOrders(filterStatus, updatedOrders); // Refresh filtered orders
            } else {
                alert("Failed to update order status.");
            }
        } catch (error) {
            console.error("Error updating order status:", error);
            alert("Error updating order status. Please try again.");
        }
    };

    /**
     * ✅ Function to Delete Order
     */
    const handleDeleteOrder = async (orderId) => {
        if (!window.confirm("Are you sure you want to delete this order?")) return;

        try {
            const token = localStorage.getItem("token");

            const response = await axios.delete(`http://localhost:5000/api/orders/${orderId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                alert("Order deleted successfully!");

                const updatedOrders = orders.filter(order => order.id !== orderId);
                setOrders(updatedOrders);
                filterOrders(filterStatus, updatedOrders); // Refresh filtered orders
            } else {
                alert("Failed to delete order.");
            }
        } catch (error) {
            console.error("Error deleting order:", error);
            alert("Error deleting order. Please try again.");
        }
    };

    /**
     * ✅ Toggle Order Details
     */
    const toggleOrderDetails = (orderId) => {
        setOpenOrder(openOrder === orderId ? null : orderId);
    };

    /**
     * ✅ Filter Orders by Status (Case-Insensitive Matching)
     */
    const filterOrders = (status, ordersData = orders) => {
        setFilterStatus(status);
        if (status === "all") {
            setFilteredOrders(ordersData);
        } else {
            setFilteredOrders(ordersData.filter(order => order.status === status.toLowerCase()));
        }
    };

    return (
        <div className={styles.container}>
            <h2>Поръчки</h2>

            {/* 🔹 Status Filter Dropdown */}
            <div className={styles.filterContainer}>
                <label htmlFor="statusFilter">Филтирай по статус:</label>
                <select 
                    id="statusFilter" 
                    value={filterStatus} 
                    onChange={(e) => filterOrders(e.target.value)}
                    className={styles.statusDropdown}
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            {filteredOrders.length > 0 ? (
                <ul className={styles.orderList}>
                    {filteredOrders.map(order => (
                        <li key={order.id} className={styles.orderItem}>
                            {/* 🔹 Click to Expand Order Details */}
                            <div 
                                className={`${styles.orderHeader} ${openOrder === order.id ? styles.active : ""}`} 
                                onClick={() => toggleOrderDetails(order.id)}
                            >
                                <span>{order.first_name} {order.last_name} - {order.phone} - {order.city}</span>
                                <span className={styles.toggleIcon}>{openOrder === order.id ? "−" : "+"}</span>
                            </div>

                            {/* 🔹 Order Details (Expand when clicked) */}
                            {openOrder === order.id && (
                                <div className={styles.orderDetails}>
                                    <h3>Детайли на поръчката</h3>
                                    <p><strong>Получател:</strong> {order.first_name} {order.last_name}</p>
                                    <p><strong>Телефон:</strong> {order.phone}</p>
                                    <p><strong>Офис на Еконт:</strong> {order.address}</p>
                                    <p><strong>Град:</strong> {order.city}</p>
                                    <p><strong>Бележка:</strong> {order.note || "No notes"}</p>
                                    <p><strong>Статус:</strong> {order.status}</p>

                                    <h4>Продукти:</h4>
                                    <ul>
                                        {JSON.parse(order.order_items || "[]").map((item, idx) => (
                                            <li key={idx}>
                                                {item.продукт} - {item.количество} бр. - {item.цена} лв.
                                            </li>
                                        ))}
                                    </ul>

                                    <strong>Крайна Цена:</strong> 
                                    {JSON.parse(order.order_items || "[]")
                                        .reduce((sum, item) => sum + item.цена, 0)} лв.

                                    <div className={styles.statusContainer}>
                                        {/* Status Dropdown */}
                                        <select 
                                            value={order.status || "pending"} 
                                            onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                            className={styles.statusDropdown}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>

                                        {/* Create Shipping Label Button - Enabled only if status is "pending" */}
                                        <button 
                                            className={styles.shippingLabelButton} 
                                            onClick={order.status === "pending" ? () => alert("Generating Shipping Label...") : null}
                                            disabled={order.status !== "pending"}
                                        >
                                            Създай товарителница
                                        </button>

                                        {/* Delete Button */}
                                        <button 
                                            className={styles.deleteButton} 
                                            onClick={() => handleDeleteOrder(order.id)}
                                        >
                                            Изтрий поръчката
                                        </button>
                                    </div>

                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Няма налични поръчки.</p>
            )}
        </div>
    );
};

export default OrdersPage;
