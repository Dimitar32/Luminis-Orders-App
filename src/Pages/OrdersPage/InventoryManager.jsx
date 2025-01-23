import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import styles from "./InventoryManager.module.css";

const InventoryManager = ({ products }) => {
    const { updateProduct } = useProducts(); // Using the custom hook
    const [editingProduct, setEditingProduct] = useState(null);
    const [editedProduct, setEditedProduct] = useState({});

    const startEditing = (product) => {
        setEditingProduct(product.id);
        setEditedProduct({ ...product });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    const saveChanges = async () => {
        await updateProduct(editedProduct.id, editedProduct); // Update product via API
        setEditingProduct(null);
    };

    const cancelEditing = () => {
        setEditingProduct(null);
        setEditedProduct({});
    };

    return (
        <div className={styles.container}>
            <h2>Мениджър на инвентара</h2>
            {products.length > 0 ? (
                <table className={styles.productTable}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Марка</th>
                            <th>Продукт</th>
                            <th>Брой</th>
                            <th>Цена</th>
                            {/* <th>Описание</th> */}
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                {editingProduct === product.id ? (
                                    <>
                                        <td>{product.id}</td>
                                        <td>
                                            <input
                                                type="text"
                                                name="brand"
                                                value={editedProduct.brand}
                                                onChange={handleChange}
                                                className={styles.inputField}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="productname"
                                                value={editedProduct.productname}
                                                onChange={handleChange}
                                                className={styles.inputField}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name="quantity"
                                                value={editedProduct.quantity}
                                                onChange={handleChange}
                                                className={styles.inputField}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name="price"
                                                value={editedProduct.price || ''}
                                                onChange={handleChange}
                                                className={styles.inputField}
                                            />
                                        </td>
                                        {/* <td>
                                            <input
                                                type="text"
                                                name="description"
                                                value={editedProduct.description}
                                                onChange={handleChange}
                                                className={styles.inputField}
                                            />
                                        </td> */}
                                        <td>
                                            <button className={styles.saveButton} onClick={saveChanges}>
                                                Запази
                                            </button>
                                            <button className={styles.cancelButton} onClick={cancelEditing}>
                                                Отказ
                                            </button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{product.id}</td>
                                        <td>{product.brand}</td>
                                        <td>{product.productname}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.discount_price} лв.</td>
                                        {/* <td>{product.description}</td> */}
                                        <td>
                                            <button className={styles.editButton} onClick={() => startEditing(product)}>
                                                Редактирай
                                            </button>
                                        </td>
                                    </>
                                )}
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

export default InventoryManager;
