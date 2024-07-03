import PropTypes from "prop-types";
import Service from "../../../components/service/Service";
import styles from "./CategoryList.module.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CategoryList = ({ selectedCategory }) => {
  const { category } = useParams();
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:3000/services");
        const data = await response.json();

        const currentCategory = category || selectedCategory || "All";
        const services =
          currentCategory !== "All"
            ? data.filter(
                (service) =>
                  service.category.toLowerCase() ===
                  currentCategory.toLowerCase()
              )
            : data;
        setFilteredServices(services);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [category, selectedCategory]);

  return (
    <div>
      <h2 className={styles.categoryListTitle}>{category || "All"}</h2>
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
