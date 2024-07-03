import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import CategoryList from "../../components/category-list/CategoryList";
import styles from "./Categories.module.scss";

const Categories = () => {
  const { name } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(name || null);

  useEffect(() => {
    if (name) {
      setSelectedCategory(name);
    }
  }, [name]);

  return (
    <div className={styles.categoriesPage}>
      <div>
        <Sidebar
          selectedCategory={selectedCategory}
          onCategoryClick={setSelectedCategory}
        />
      </div>

      <div className={styles.categoryList}>
        <CategoryList selectedCategory={selectedCategory} />
      </div>
    </div>
  );
};

export default Categories;
