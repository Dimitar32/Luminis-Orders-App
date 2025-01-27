import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import styles from "./OrdersPages.module.css";

const InventoryManager = ({ products }) => {
    const { updateProduct } = useProducts(); // Using the custom hook
    const [editingProduct, setEditingProduct] = useState(null);
    const [editedProduct, setEditedProduct] = useState({});
    const [filterBrand, setFilterBrand] = useState("all");

    const startEditing = (product) => {
        setEditingProduct(product.id);
        setEditedProduct({ ...product });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    const saveChanges = async () => {
        try{    
            await updateProduct(editedProduct.id, editedProduct); // Update product via API

            window.location.reload(); // Reload the page (optional)
            // alert("Product updated successfully!");
        } catch (error) {
            throw error; 
        }
        
        setEditingProduct(null);
    };

    const cancelEditing = () => {
        setEditingProduct(null);
        setEditedProduct({});
    };

    // Get unique brands for the dropdown
    const uniqueBrands = [...new Set(products.map((product) => product.brand))];

    // Filter products based on selected brand
    const filteredProducts =
        filterBrand === "all"
            ? products
            : products.filter((product) => product.brand === filterBrand);

    return (
        <div className={styles.container}>
            <h2>Управление на наличностите</h2>

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

            {filteredProducts.length > 0 ? (
                <ul className={styles.orderList}>
                    {filteredProducts.map((product) => (
                        <li key={product.id} className={styles.orderItem}>
                            <div
                                className={`${styles.orderHeader} ${
                                    editingProduct === product.id ? styles.active : ""
                                }`}
                                onClick={() =>
                                    editingProduct !== product.id
                                        ? startEditing(product)
                                        : cancelEditing()
                                }
                            >
                                <span>{product.brand} - {product.productname}</span>
                                <span className={styles.toggleIcon}>
                                    {editingProduct === product.id ? "−" : "+"}
                                </span>
                            </div>

                            {editingProduct === product.id && (
                                <div className={styles.orderDetails}>
                                    <h3>Редактиране на продукт</h3>
                                    <div className={styles.orderInfo}>
                                        <label>
                                            Марка:
                                            <input
                                                type="text"
                                                name="brand"
                                                value={editedProduct.brand}
                                                onChange={handleChange}
                                                className={styles.inputField}
                                            />
                                        </label>
                                        <label>
                                            Продукт:
                                            <input
                                                type="text"
                                                name="productname"
                                                value={editedProduct.productname}
                                                onChange={handleChange}
                                                className={styles.inputField}
                                            />
                                        </label>
                                        <label>
                                            Брой:
                                            <input
                                                type="number"
                                                name="quantity"
                                                value={editedProduct.quantity}
                                                onChange={handleChange}
                                                className={styles.inputField}
                                            />
                                        </label>
                                        <label>
                                            Цена:
                                            <input
                                                type="number"
                                                name="discount_price"
                                                value={editedProduct.discount_price}
                                                onChange={handleChange}
                                                className={styles.inputField}
                                            />
                                        </label>
                                    </div>
                                    <div className={styles.statusContainer}>
                                        <button
                                            className={styles.shippingLabelButton}
                                            onClick={saveChanges}
                                        >
                                            Запази
                                        </button>
                                        <button
                                            className={styles.deleteButton}
                                            onClick={cancelEditing}
                                        >
                                            Отказ
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Няма налични продукти.</p>
            )}
        </div>
    );
};

export default InventoryManager;
