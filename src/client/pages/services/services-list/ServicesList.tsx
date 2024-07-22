import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Service from "../../../components/service/Service";
import styles from "./ServicesList.module.scss";

interface ServiceData {
  _id: string;
  contactPerson: string;
  category: string;
  name: string;
  address: string;
  photo: string;
}

const ServicesList: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [services, setServices] = useState<ServiceData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<ServiceData[]>(
          "http://localhost:5005/services"
        );
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
        setError(
          error instanceof Error
            ? error.message
            : "An unknown error occurred while fetching services"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [category]);

  if (loading) {
    return <div className={styles.loading}>Loading services...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error fetching services: {error}</div>;
  }

  return (
    <div className={styles.servicesList}>
      <div className={styles.categoryHeader}>
        {category ? category : <span>&nbsp;</span>}
      </div>
      <div className={styles.servicesContainer}>
        {services && services.length > 0 ? (
          services.map((service) => (
            <Service
              key={service._id}
              _id={service._id}
              className={styles.service}
              category={service.category}
              name={service.name}
              worker={service.contactPerson}
              address={service.address}
              photo={"/" + service.photo}
            />
          ))
        ) : (
          <div className={styles.noServices}>
            There are no services in this category
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesList;
