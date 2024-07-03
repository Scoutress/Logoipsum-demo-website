import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const useSidebar = (selectedCategory, onCategoryClick) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(selectedCategory);
  const navigate = useNavigate();
  const location = useLocation();
  const { category } = useParams();

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory);
    } else if (category) {
      setActiveCategory(category.charAt(0).toUpperCase() + category.slice(1));
    } else {
      const path = location.pathname.split("/").pop();
      setActiveCategory(path.charAt(0).toUpperCase() + path.slice(1));
    }
  }, [selectedCategory, category, location.pathname]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category.name);
    onCategoryClick(category.name);
    navigate(`${category.link}`);
  };

  return {
    categories,
    activeCategory,
    handleCategoryClick,
  };
};

export default useSidebar;
