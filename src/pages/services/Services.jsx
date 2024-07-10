import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Services.module.scss";
import Sidebar from "./sidebar/Sidebar";
import CategoryList from "./category-list/CategoryList";

const Services = () => {
  const { category } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(category || "All");

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory("All");
    }
  }, [category]);

  return (
    <div className={styles.servicesPage}>
      <Sidebar
        selectedCategory={selectedCategory}
        onCategoryClick={setSelectedCategory}
      />
      <div className={styles.servicesList}>
        <CategoryList selectedCategory={selectedCategory} />
      </div>
    </div>
  );
};

export default Services;

