import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams, NavLink } from "react-router-dom";
import styles from "./Sidebar.module.scss";

const Sidebar = ({ selectedCategory, onCategoryClick }) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(selectedCategory);
  const navigate = useNavigate();
  const location = useLocation();
  const { category } = useParams();

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory);
    } else if (category) {
      setActiveCategory(category.charAt(0).toUpperCase() + category.slice(1));
    } else {
      const path = location.pathname.split("/").pop();
      setActiveCategory(path.charAt(0).toUpperCase() + path.slice(1));
    }
  }, [selectedCategory, category, location.pathname]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category.name);
    onCategoryClick(category.name);
    navigate(`${category.link}`);
  };

  return (
    <div className={styles.sidebar}>
      <h2>Categories</h2>
      <nav>
        <ul>
          {categories.map(({ name, link, icon }) => (
            <li key={name}>
              <NavLink
                className={`
                  ${styles.button} 
                  ${activeCategory === name ? styles.active : ""}
                `}
                onClick={() => handleCategoryClick({ name, link })}
              >
                <img src={icon} alt={`${name} icon`} className={styles.icon} />
                <p>{name}</p>
              </NavLink>
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
