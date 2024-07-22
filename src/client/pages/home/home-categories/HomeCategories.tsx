import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./HomeCategories.module.scss";

interface Category {
  name: string;
  link: string; // Galime pašalinti šį lauką, nes naudosime dinaminį maršrutą
  iconFile: string;
}

const HomeCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      {categories.map((category) => (
        <div key={category.name} className={styles.subcontainer}>
          <Link
            to={`/category/${category.name.toLowerCase()}`}
            className={styles.link}
          >
            <img
              src={`/${category.iconFile}`}
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
