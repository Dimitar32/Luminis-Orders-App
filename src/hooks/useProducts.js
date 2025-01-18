import { useState } from "react";
import { fetchProducts } from "../api/api";

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  // Fetch all products
  const fetchProductsData = async () => {
    try {
      const data = await fetchProducts();
      if (data.success) {
        setProducts(data.products);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to load product quantities.");
    }
  };

  return {
    products,
    fetchProductsData,
  };
};
