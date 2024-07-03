import { Link } from "react-router-dom";
import styles from "./HomeCategories.module.scss";
import categories from "../../../data/CategoriesData";

const HomeCategories = () => {
  return (
    <div className={styles.container}>
      {categories.map((category, index) => (
        <div key={index} className={styles.subcontainer}>
          <Link to={`${category.link}`} className={styles.link}>
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
