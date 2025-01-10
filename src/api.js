import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const loginUser = async (credentials) => {
    return axios.post(`${API_URL}/login`, credentials);
};

export const getOrders = async (token) => {
    return axios.get(`${API_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const deleteOrder = async (id, token) => {
    return axios.delete(`${API_URL}/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
