import axios from "axios";

const API_URL = "http://localhost:5000/api/orders"; // Change if necessary

export const getOrders = async (token) => {
    try {
        const res = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (err) {
        console.error("Error fetching orders:", err);
        return { success: false, orders: [] };
    }
};

export const deleteOrder = async (id, token) => {
    try {
        await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return { success: true };
    } catch (err) {
        console.error("Error deleting order:", err);
        return { success: false };
    }
};
