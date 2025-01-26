import { useState, useEffect } from 'react';
import { fetchProductNameById } from '../api/api'; // Import the API function

const useProductName = (productId) => {
    const [productName, setProductName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!productId) {
            setLoading(false);
            return;
        }

        const fetchProduct = async () => {
            try {
                const name = await fetchProductNameById(productId);
                setProductName(name);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    return { productName, loading, error };
};

export default useProductName;
