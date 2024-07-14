import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Service from "../../../components/service/Service.jsx";
import styles from "./ServicesList.module.scss";

const ServicesList = () => {
  const { category } = useParams();
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:3001/services");
        const data = response.data;

        if (data && Array.isArray(data)) {
          if (category) {
            const filteredServices = data.filter(
              (service) =>
                service.category.toLowerCase() === category.toLowerCase()
            );
            setServices(filteredServices);
          } else {
            setServices(data);
          }
        } else {
          setError("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setError(error.message);
      }
    };

    fetchServices();
  }, [category]);

  if (error) {
    return <div className={styles.error}>Error fetching services: {error}</div>;
  }

  return (
    <div className={styles.servicesList}>
      {services && services.length > 0 ? (
        services.map((service) => (
          <Service
            key={service.id}
            className={styles.service}
            category={service.category}
            name={service.name}
            worker={service.worker}
            address={service.address}
            photo={service.photo}
          />
        ))
      ) : (
        <div className={styles.noServices}>
          There are no services in this category
        </div>
      )}
    </div>
  );
};

export default ServicesList;
