import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Service from "../../../components/service/Service";
import styles from "./CategoryList.module.scss";

const CategoryList = ({ selectedCategory }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:3001/services?category=${selectedCategory}`
        );
        setServices(response.data);
      } catch (error) {
        setError("Error fetching services");
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [selectedCategory]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const servicesToDisplay = Array.isArray(services) ? services : [];

  return (
    <div className={styles.categoryList}>
      {servicesToDisplay.map((service) => (
        <Service key={service.id} {...service} />
      ))}
    </div>
  );
};

CategoryList.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
};

export default CategoryList;
