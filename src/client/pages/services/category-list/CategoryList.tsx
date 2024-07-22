import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./CategoryList.module.scss";

interface Category {
  iconFile: string;
  id: string;
  name: string;
  icon: string;
}

interface CategoryListProps {
  selectedCategory: string;
}

const CategoryList: React.FC<CategoryListProps> = ({ selectedCategory }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:5005/categories");
        setCategories(response.data);
      } catch (error) {
        setError("Error fetching categories");
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [selectedCategory]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.categoryListTitle}>Categories</h1>
      <div className={styles.services}>
        {categories.map((category) => (
          <div
            key={category.id}
            className={`${styles.categoryItem} ${
              selectedCategory === category.name ? styles.active : ""
            }`}
            onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
          >
            <img
              src={"/" + category.iconFile}
              alt={`${category.name} icon`}
              className={styles.categoryIcon}
            />
            <span className={styles.categoryName}>{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

CategoryList.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
};

export default CategoryList;
