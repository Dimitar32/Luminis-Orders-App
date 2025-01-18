import { useState, useCallback, useEffect } from "react";
import { fetchOrders, updateOrderStatus, deleteOrder } from "../api/api";

export const useOrders = (navigate) => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState("all");
    const [openOrder, setOpenOrder] = useState(null);

    // Fetch orders from the API
    const fetchOrdersData = useCallback(async () => {
        try {
            const data = await fetchOrders();
            if (data.success) {
                const ordersData = data.orders.map(order => ({
                    ...order,
                    status: order.status.toLowerCase(),
                }));
                setOrders(ordersData);
                setFilteredOrders(ordersData); // Show all orders initially
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            if (error.response?.status === 401) {
                alert("Session expired. Please log in again.");
                localStorage.removeItem("token");
                navigate("/login");
            }
        }
    }, [navigate]);

    // Filter orders based on status
    const filterOrders = useCallback((status, ordersData = orders) => {
        setFilterStatus(status);
        if (status === "all") {
            setFilteredOrders(ordersData);
        } else {
            setFilteredOrders(ordersData.filter(order => order.status === status));
        }
    }, [orders]);

    // Update order status
    const updateStatus = async (orderId, newStatus) => {
        try {
            const data = await updateOrderStatus(orderId, newStatus);
            if (data.success) {
                alert("Order status updated successfully!");
                const updatedOrders = orders.map(order =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                );
                setOrders(updatedOrders);
                filterOrders(filterStatus, updatedOrders); // Update filtered orders
            }
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    // Delete an order
    const deleteOrderById = async (orderId) => {
        if (!window.confirm("Are you sure you want to delete this order?")) return;
        try {
            const data = await deleteOrder(orderId);
            if (data.success) {
                alert("Order deleted successfully!");
                const updatedOrders = orders.filter(order => order.id !== orderId);
                setOrders(updatedOrders);
                filterOrders(filterStatus, updatedOrders); // Update filtered orders
            }
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };

    // Toggle order details
    const toggleOrderDetails = (orderId) => {
        setOpenOrder(openOrder === orderId ? null : orderId);
    };

    useEffect(() => {
        filterOrders(filterStatus);
    }, [filterStatus, filterOrders]);

    return {
        orders,
        filteredOrders,
        fetchOrdersData,
        filterStatus,
        setFilterStatus,
        openOrder,
        toggleOrderDetails,
        updateStatus,
        deleteOrderById,
    };
};
