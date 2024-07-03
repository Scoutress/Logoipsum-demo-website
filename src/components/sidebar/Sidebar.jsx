import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import categories from "../../data/CategoriesData";

const Sidebar = ({ selectedCategory, onCategoryClick }) => {
  const [activeCategory, setActiveCategory] = useState(selectedCategory);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory);
    } else {
      const path = location.pathname.split("/").pop();
      setActiveCategory(path.charAt(0).toUpperCase() + path.slice(1));
    }
  }, [selectedCategory, location.pathname]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category.name);
    onCategoryClick(category.name);
    navigate(category.link);
  };

  return (
    <div className={styles.sidebar}>
      <h2>Categories</h2>
      <nav>
        <ul>
          {categories.map(({ name, link, icon }) => (
            <li key={name}>
              <button
                className={`
                  ${styles.button} 
                  ${activeCategory === name ? styles.active : ""}
                  `}
                onClick={() => handleCategoryClick({ name, link })}
              >
                <img src={icon} alt={`${name} icon`} className={styles.icon} />
                <p className={styles.category}>{name}</p>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

Sidebar.propTypes = {
  selectedCategory: PropTypes.string,
  onCategoryClick: PropTypes.func.isRequired,
};

export default Sidebar;
