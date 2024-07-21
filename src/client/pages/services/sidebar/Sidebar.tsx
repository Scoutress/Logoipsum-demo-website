import { FC } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import styles from "./Sidebar.module.scss";
import useSidebar from "./UseSidebar";

interface SidebarProps {
  selectedCategory: string;
  onCategoryClick: (categoryName: string) => void;
}

const Sidebar: FC<SidebarProps> = ({ selectedCategory, onCategoryClick }) => {
  const { categories, loading, error, handleCategoryClick } = useSidebar(
    selectedCategory,
    onCategoryClick
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.sidebar}>
      <h2>Categories</h2>
      <nav>
        <ul>
          {categories.map(({ id, name, link, icon }) => (
            <li key={id}>
              <NavLink
                to={link}
                className={({ isActive }) =>
                  clsx(styles.button, {
                    [styles.active]: isActive || selectedCategory === name,
                  })
                }
                onClick={() => handleCategoryClick({ id, name, link, icon })}
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

export default Sidebar;
