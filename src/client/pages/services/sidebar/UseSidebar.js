import { useState, useEffect } from "react";

const useSidebar = (selectedCategory, onCategoryClick) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(selectedCategory);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setActiveCategory(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryClick = ({ name }) => {
    setActiveCategory(name);
    onCategoryClick(name);
  };

  return {
    categories,
    activeCategory,
    handleCategoryClick,
  };
};

export default useSidebar;
