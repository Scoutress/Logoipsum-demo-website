import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "./Services.module.scss";
import CategoryList from "./category-list/CategoryList";
import ServicesList from "./services-list/ServicesList";

const Services: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    category || "All"
  );

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory("All");
    }
  }, [category]);

  return (
    <div className={styles.servicesPage}>
      <div className={styles.servicesList}>
        <CategoryList selectedCategory={selectedCategory} />
      </div>
      <div>
        <ServicesList />
      </div>
    </div>
  );
};

export default Services;
