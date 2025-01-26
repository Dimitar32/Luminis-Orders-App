import React from "react";
import styles from "../OrdersPage/OrdersPages.module.css";

const Orders = ({
    filteredOrders,
    filterStatus,
    setFilterStatus,
    openOrder,
    toggleOrderDetails,
    updateStatus,
    deleteOrderById,
}) => {
    return (
        <div>
            <h2>Управление на поръчките</h2>
            
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

            {filteredOrders.length > 0 ? (
                <ul className={styles.orderList}>
                    {filteredOrders.map((order) => (
                        <li key={order.id} className={styles.orderItem}>
                            <div
                                className={`${styles.orderHeader} ${
                                    openOrder === order.id ? styles.active : ""
                                }`}
                                onClick={() => toggleOrderDetails(order.id)}
                            >
                                <span>
                                    {order.first_name} {order.last_name} - {order.city}
                                </span>
                                <span className={styles.toggleIcon}>
                                    {openOrder === order.id ? "−" : "+"}
                                </span>
                            </div>

                            {openOrder === order.id && (
                                <div className={styles.orderDetails}>
                                    <h3>Детайли на поръчката</h3>
                                    <p>
                                        <strong>Получател:</strong> {order.first_name}{" "}
                                        {order.last_name}
                                    </p>
                                    <p>
                                        <strong>Телефон:</strong> {order.phone}
                                    </p>
                                    <p>
                                        <strong>Офис на Еконт:</strong> {order.address}
                                    </p>
                                    <p>
                                        <strong>Град:</strong> {order.city}
                                    </p>
                                    <p>
                                        <strong>Бележка:</strong> {order.note || "Няма оставена бележка :)"}
                                    </p>
                                    <p>
                                        <strong>Статус:</strong> {order.status}
                                    </p>
                                    <p>
                                        <strong>Продукти:</strong>
                                    </p>
                                    <ul>
                                        {JSON.parse(order.order_items || "[]").map((item, idx) => (
                                            <li key={idx}>
                                                {item.name} - {item.quantity} бр. - {item.price} лв.

                                                {/* Check if `option` is not null or an empty string */}
                                                {item.option && item.option.trim() !== "" && (
                                                    <div>
                                                        Избран продукт от комплекта: {item.option}
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>

                                    <strong>Крайна Цена:</strong>{" "}
                                    {JSON.parse(order.order_items || "[]").reduce(
                                        (sum, item) => sum + item.price,
                                        0
                                    )}{" "}
                                    лв.
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
                                            onClick={
                                                order.status === "pending"
                                                    ? () => alert("Generating Shipping Label...")
                                                    : null
                                            }
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
        </div>
    );
};

export default Orders;
