import { Link } from "react-router-dom";
import styles from "./HomeCategories.module.scss";

const categories = [
  {
    name: "Cleaning",
    icon: "../public/icons/cleaning.svg",
    link: "/category/cleaning",
  },
  {
    name: "Repair",
    icon: "../public/icons/repair.svg",
    link: "/category/repair",
  },
  {
    name: "Painting",
    icon: "../public/icons/painting.svg",
    link: "/category/painting",
  },
  {
    name: "Shifting",
    icon: "../public/icons/shifting.svg",
    link: "/category/shifting",
  },
  {
    name: "Plumbing",
    icon: "../public/icons/plumbing.svg",
    link: "/category/plumbing",
  },
  {
    name: "Electric",
    icon: "../public/icons/electric.svg",
    link: "/category/electric",
  },
];

const HomeCategories = () => {
  return (
    <div className={styles.container}>
      {categories.map((category, index) => (
        <div key={index} className={styles.subcontainer}>
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
