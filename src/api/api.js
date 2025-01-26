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
      throw error;
    }
  };
  

/**
 * Fetch the product name by its ID
 * @param {number} productId - The ID of the product to fetch
 * @returns {Promise<string>} - The product name
 */
export const fetchProductNameById = async (productId) => {
  try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`);
      
      if (!response.ok) {
          throw new Error('Failed to fetch product name');
      }

      const result = await response.json();

      if (!result.success) {
          throw new Error(result.message || 'Product not found');
      }

      return result.product.productname; // Return the product name
  } catch (error) {
      throw error;
  }
};

  /**
   * Update product details
   * @param {string} productId - ID of the product to update
   * @param {object} updatedProduct - Updated product details (e.g., { brand, productname, quantity, price, description })
   */
  export const updateProductAPI = async (productId, updatedProduct) => {
    try {
        const response = await apiClient.put(`/products/${productId}`, updatedProduct);
        return response.data;
    } catch (error) {
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
      throw error;
    }
  };
