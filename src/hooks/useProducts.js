import { useState } from "react";
import { fetchProducts, updateProductAPI } from "../api/api";

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  // Fetch all products
  const fetchProductsData = async () => {
    try {
      const data = await fetchProducts();
      if (data.success) {
        setProducts(data.products);
      } else {
        alert("Failed to fetch products");
      }
    } catch (error) {
      alert("Failed to load product quantities.");
    }
  };


  const updateProduct = async (id, updatedProduct) => {
    try {
        await updateProductAPI(id, updatedProduct);
        setProducts((prev) =>
            prev.map((product) =>
                product.id === id ? { ...product, ...updatedProduct } : product
            )
        );
    } catch (error) {
      alert("Error updating product:", error);
    }
  };


  return { products, fetchProductsData, updateProduct };
};
