import React from "react";
import styles from "../OrdersPage/OrdersPages.module.css"; // Adjust the path as needed

const InvenoryTable = ({ products }) => {
    return (
        <div className={styles.productsContainer}>
            {products.length > 0 ? (
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
                        {products.map(product => (
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