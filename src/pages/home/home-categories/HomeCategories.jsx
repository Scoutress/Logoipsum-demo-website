import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./HomeCategories.module.scss";

const HomeCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div className={styles.container}>
      {categories.map((category) => (
        <div key={category.name} className={styles.subcontainer}>
          <Link to={category.link} className={styles.link}>
            <img
              src={category.icon}
              alt={`${category.name} Icon`}
              className={styles.icon}
            />
            <span className={styles.label}>{category.name}</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HomeCategories;
