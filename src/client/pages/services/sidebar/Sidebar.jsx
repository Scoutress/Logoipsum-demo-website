import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import styles from "./Sidebar.module.scss";
import useSidebar from "./UseSidebar";

const Sidebar = ({ selectedCategory, onCategoryClick }) => {
  const { categories, activeCategory, handleCategoryClick } = useSidebar(
    selectedCategory,
    onCategoryClick
  );

  return (
    <div className={styles.sidebar}>
      <h2>Categories</h2>
      <nav>
        <ul>
          {categories.map(({ name, link, icon }) => (
            <li key={name}>
              <NavLink
                to={link}
                className={({ isActive }) =>
                  clsx(styles.button, {
                    [styles.active]: isActive || activeCategory === name,
                  })
                }
                onClick={() => handleCategoryClick({ name })}
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

