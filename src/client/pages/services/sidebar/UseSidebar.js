import { useState, useEffect } from "react";
import axios from "axios";

const useSidebar = (selectedCategory, onCategoryClick) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3001/categories");
        setCategories(response.data);
      } catch (error) {
        setError("Error fetching categories");
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    onCategoryClick(category.name);
  };

  return { categories, loading, error, handleCategoryClick };
};

export default useSidebar;
