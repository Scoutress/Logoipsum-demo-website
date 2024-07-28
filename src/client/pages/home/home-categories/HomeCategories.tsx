import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import styles from "./HomeCategories.module.scss";

interface Category {
  name: string;
  iconFile: string;
}

const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get("http://localhost:5005/categories");
  return data;
};

const HomeCategories: React.FC = () => {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className={styles.container}>
      {categories?.map((category) => (
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
