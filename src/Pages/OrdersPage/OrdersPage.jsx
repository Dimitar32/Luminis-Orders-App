import { useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../../hooks/useOrders"; // Import the custom hook
import { useProducts } from "../../hooks/useProducts"; // Import the custom hook for products
import styles from "../OrdersPage/OrdersPages.module.css";

const OrdersPage = () => {
    const [activeTab, setActiveTab] = useState("orders"); // Track active tab
    const navigate = useNavigate();

    // Use custom hooks for orders and products
    const {
        // orders,
        filteredOrders,
        fetchOrdersData,
        filterStatus,
        setFilterStatus,
        openOrder,
        toggleOrderDetails,
        updateStatus,
        deleteOrderById,
    } = useOrders(navigate);

    const { products, fetchProductsData } = useProducts();

    // Fetch orders on component mount
    useEffect(() => {
        if (activeTab === "orders") {
            fetchOrdersData();
        }
    }, [fetchOrdersData, activeTab]);

    // Handle tab change
    const changeTab = (tab) => {
        setActiveTab(tab);
        if (tab === "products") {
            fetchProductsData();
        }
    };

    return (
        <div className={styles.container}>
            <h2>Управление на поръчките и инвентара</h2>
            {/* 🔹 Tab Navigation */}
            <div className={styles.tabContainer}>
                <span 
                    className={`${styles.tab} ${activeTab === "orders" ? styles.activeTab : ""}`} 
                    onClick={() => changeTab("orders")}
                >
                    Поръчки
                </span>
                <span 
                    className={`${styles.tab} ${activeTab === "products" ? styles.activeTab : ""}`} 
                    onClick={() => changeTab("products")}
                >
                    Наличности
                </span>
            </div>

            {/* 🔹 Filter Orders */}
            {activeTab === "orders" && (
                <div className={styles.filterContainer}>
                    <label htmlFor="statusFilter">Филтрирай по статус:</label>
                    <select 
                        id="statusFilter" 
                        value={filterStatus} 
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className={styles.statusDropdown}
                    >
                        <option value="all">Всички</option>
                        <option value="pending">В процес</option>
                        <option value="shipped">Изпратена</option>
                        <option value="delivered">Доставена</option>
                        <option value="cancelled">Отменена</option>
                    </select>
                </div>
            )}

            {/* 🔹 Show Orders */}
            {activeTab === "orders" && (
                <>
                {filteredOrders.length > 0 ? (
                    <ul className={styles.orderList}>
                        {filteredOrders.map(order => (
                            <li key={order.id} className={styles.orderItem}>
                                {/* 🔹 Click to Expand Order Details */}
                                <div 
                                    className={`${styles.orderHeader} ${openOrder === order.id ? styles.active : ""}`} 
                                    onClick={() => toggleOrderDetails(order.id)}
                                >
                                    <span>{order.first_name} {order.last_name} - {order.city}</span>
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
                                        <p><strong>Бележка:</strong> {order.note || "Няма оставена бележка :)"}</p>
                                        <p><strong>Статус:</strong> {order.status}</p>
                                        <p><strong>Продукти:</strong></p>
                                        <ul>
                                            {JSON.parse(order.order_items || "[]").map((item, idx) => (
                                                <li key={idx}>
                                                    {item.name} - {item.quantity} бр. - {item.price} лв.
                                                </li>
                                            ))}
                                        </ul>

                                        <strong>Крайна Цена:</strong> 
                                        {JSON.parse(order.order_items || "[]")
                                            .reduce((sum, item) => sum + item.price, 0)} лв.

                                        <div className={styles.statusContainer}>
                                            {/* Status Dropdown */}
                                            <select 
                                                value={order.status || "pending"} 
                                                onChange={(e) => updateStatus(order.id, e.target.value)}
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
                                                onClick={() => deleteOrderById(order.id)}
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
                </>)}


            {/* 🔹 Show Product Quantities */}
            {activeTab === "products" && (
                <div className={styles.productsContainer}>
                    {products.length > 0 ? (
                        <table className={styles.productTable}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Марка</th>
                                    <th>Продукт</th>
                                    <th>Количество</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.brand}</td>
                                        <td>{product.productname}</td>
                                        <td>{product.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Няма налични продукти.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
