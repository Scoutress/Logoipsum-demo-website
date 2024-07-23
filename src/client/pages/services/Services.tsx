import { useParams } from "react-router-dom";
import React, { useState } from "react";
import styles from "./Services.module.scss";
import CategoryList from "./category-list/CategoryList";
import ServicesList from "./services-list/ServicesList";

const Services: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    category || "All"
  );

  return (
    <div className={styles.servicesPage}>
      <div className={styles.servicesList}>
        <CategoryList
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <div>
        <ServicesList selectedCategory={selectedCategory} />
      </div>
    </div>
  );
};

export default Services;
