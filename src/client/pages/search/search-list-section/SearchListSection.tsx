import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Service from "../../../components/service/Service.js";
import styles from "./SearchListSection.module.scss";

const SearchListSection = ({ searchTerm }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:3001/services?term=${searchTerm}`
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
  }, [searchTerm]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      {services.map((service) => (
        <Service key={service.id} {...service} />
      ))}
    </div>
  );
};

SearchListSection.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

export default SearchListSection;
