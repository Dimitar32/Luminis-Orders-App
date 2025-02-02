import { useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../../hooks/useOrders"; // Import the custom hook
import { useProducts } from "../../hooks/useProducts"; // Import the custom hook for products
import InvenoryTable from "./InventoryTable";
import InventoryManager from "./InventoryManager";
import Orders from "./Orders"; // Import the new Orders component
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
        if (tab === "products" || tab === "inventory-manager") {
            fetchProductsData();
        }
    };

    return (
        <div className={styles.container}>
            {/* <h2>Управление на поръчките и инвентара</h2> */}
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
                <span 
                    className={`${styles.tab} ${activeTab === "inventory-manager" ? styles.activeTab : ""}`} 
                    onClick={() => changeTab("inventory-manager")}
                >
                    Инвентарен мениджър
                </span>
            </div>


            {/* {activeTab === "orders" && (
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


            {activeTab === "orders" && (
                <>
                {filteredOrders.length > 0 ? (
                    <ul className={styles.orderList}>
                        {filteredOrders.map(order => (
                            <li key={order.id} className={styles.orderItem}>
                                <div 
                                    className={`${styles.orderHeader} ${openOrder === order.id ? styles.active : ""}`} 
                                    onClick={() => toggleOrderDetails(order.id)}
                                >
                                    <span>{order.first_name} {order.last_name} - {order.city}</span>
                                    <span className={styles.toggleIcon}>{openOrder === order.id ? "−" : "+"}</span>
                                </div>

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

                                            <button 
                                                className={styles.shippingLabelButton} 
                                                onClick={order.status === "pending" ? () => alert("Generating Shipping Label...") : null}
                                                disabled={order.status !== "pending"}
                                            >
                                                Създай товарителница
                                            </button>

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
                </>)} */}

            {activeTab === "orders" && (
                <Orders
                    filteredOrders={filteredOrders}
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                    openOrder={openOrder}
                    toggleOrderDetails={toggleOrderDetails}
                    updateStatus={updateStatus}
                    deleteOrderById={deleteOrderById}
                />
            )}

            {activeTab === "products" && <InvenoryTable products={products} />}
            
            {activeTab === "inventory-manager" && <InventoryManager products={products} />}
        </div>
    );
};

export default OrdersPage;
