import axios from "axios";

const API_BASE_URL = "https://luminisapi.onrender.com/api";

// Helper to retrieve token from localStorage
const getToken = () => localStorage.getItem("token");

// Axios instance for API requests
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

// Add Authorization header dynamically
apiClient.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

// Login API call
export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

/**
 * Fetch all orders
 */
export const fetchOrders = async () => {
    try {
      const response = await apiClient.get("/orders");
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  };
  
  /**
   * Fetch all products
   */
  export const fetchProducts = async () => {
    try {
      const response = await apiClient.get("/products-quantity");
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };
  
  /**
   * Update the status of an order
   * @param {string} orderId - ID of the order to update
   * @param {string} newStatus - New status for the order
   */
  export const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await apiClient.put(`/orders/${orderId}`, {
        status: newStatus,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  };
  
  /**
   * Delete an order
   * @param {string} orderId - ID of the order to delete
   */
  export const deleteOrder = async (orderId) => {
    try {
      const response = await apiClient.delete(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  };
  