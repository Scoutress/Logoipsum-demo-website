import PropTypes from "prop-types";
import Service from "../../../components/service/Service";
import styles from "./CategoryList.module.scss";
import useFilteredServices from "./UseFilteredServices";

const CategoryList = ({ selectedCategory }) => {
  const filteredServices = useFilteredServices(selectedCategory);

  return (
    <div>
      <h2 className={styles.categoryListTitle}>{selectedCategory || "All"}</h2>
      <div className={styles.services}>
        {filteredServices.map((service) => (
          <Service key={service.id} {...service} />
        ))}
      </div>
    </div>
  );
};

CategoryList.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
};

export default CategoryList;
