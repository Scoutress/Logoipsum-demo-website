import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Service from "../../../components/service/Service";
import styles from "./CategoryList.module.scss";
import useFilteredServices from "../../../hooks/UseFilteredServices";
import useSearchedServices from "../../../hooks/UseSearchedServices";

const CategoryList = ({ selectedCategory }) => {
  const { searchTerm } = useParams();
  const filteredServices = useFilteredServices(selectedCategory);
  const searchedServices = useSearchedServices(searchTerm);

  const servicesToDisplay = searchTerm ? searchedServices : filteredServices;

  return (
    <div>
      <h2 className={styles.categoryListTitle}>
        {selectedCategory || searchTerm || "All"}
      </h2>
      <div className={styles.services}>
        {servicesToDisplay.map((service) => (
          <Service key={service.id} {...service} />
        ))}
      </div>
    </div>
  );
};

CategoryList.propTypes = {
  selectedCategory: PropTypes.string,
};

export default CategoryList;

