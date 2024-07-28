import React, { useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styles from "./CategoryList.module.scss";

interface Category {
  iconFile: string;
  id: string;
  name: string;
  icon: string;
}

interface CategoryListProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get("http://localhost:5005/categories");
  return data;
};

const CategoryList: React.FC<CategoryListProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  useEffect(() => {
    if (category) {
      setSelectedCategory(category.charAt(0).toUpperCase() + category.slice(1));
    }
  }, [category, setSelectedCategory]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    navigate(`/category/${category.toLowerCase()}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.categoryListTitle}>Categories</h1>
      <div className={styles.categories}>
        {categories?.map((category) => (
          <div
            key={category.id}
            className={`${styles.categoryItem} ${
              selectedCategory === category.name ? styles.active : ""
            }`}
            onClick={() => handleCategoryClick(category.name)}
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
  setSelectedCategory: PropTypes.func.isRequired,
};

export default CategoryList;
