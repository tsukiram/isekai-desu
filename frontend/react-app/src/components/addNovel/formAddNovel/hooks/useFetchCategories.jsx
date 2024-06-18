// hooks/useFetchCategories.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories/'); // Sesuaikan endpoint sesuai dengan API Anda
        setCategories(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useFetchCategories;
