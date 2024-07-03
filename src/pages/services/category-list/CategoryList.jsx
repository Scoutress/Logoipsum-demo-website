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
          <Service
            key={service.id}
            name={service.name}
            worker={service.worker}
            address={service.address}
            photo={service.photo}
            category={service.category}
          />
        ))}
      </div>
    </div>
  );
};

CategoryList.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
};

export default CategoryList;
