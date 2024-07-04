import PropTypes from "prop-types";
import Service from "../../../components/service/Service";
import useSearchedServices from "../../../hooks/UseSearchedServices";
import styles from "./SearchListSection.module.scss";

const SearchListSection = ({ searchTerm }) => {
  const filteredServices = useSearchedServices(searchTerm);

  return (
    <div className={styles.listContainer}>
      {filteredServices.length > 0 ? (
        filteredServices.map((service) => (
          <Service
            key={service.id}
            {...service}
            className={styles.serviceItem}
          />
        ))
      ) : (
        <p className={styles.noResults}>
          No services found matching &quot;{searchTerm}&quot;.
        </p>
      )}
    </div>
  );
};

SearchListSection.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

export default SearchListSection;
