import React, { useState } from "react";
import styles from "../OrdersPage/OrdersPages.module.css"; // Adjust the path as needed

const InvenoryTable = ({ products }) => {
    const [filterBrand, setFilterBrand] = useState("all"); // State to manage the selected brand filter

    // Get unique brands for the dropdown
    const uniqueBrands = [...new Set(products.map((product) => product.brand))];

    // Filter products based on selected brand
    const filteredProducts =
        filterBrand === "all"
            ? products
            : products.filter((product) => product.brand === filterBrand);

    return (
        <div className={styles.productsContainer}>
            <h2>Наличности</h2>

            {/* Brand Filter Dropdown */}
            <div className={styles.filterContainer}>
                <label htmlFor="brandFilter">Филтрирай по марка:</label>
                <select
                    id="brandFilter"
                    value={filterBrand}
                    onChange={(e) => setFilterBrand(e.target.value)}
                    className={styles.statusDropdown}
                >
                    <option value="all">Всички марки</option>
                    {uniqueBrands.map((brand, index) => (
                        <option key={index} value={brand}>
                            {brand}
                        </option>
                    ))}
                </select>
            </div>

            {/* Product Table */}
            {filteredProducts.length > 0 ? (
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
                        {filteredProducts.map(product => (
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
    );
};

export default InvenoryTable;