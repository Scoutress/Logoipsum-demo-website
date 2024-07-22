import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./DetailsSidebar.module.scss";

interface DetailsSidebarProps {
  id: string;
  category: string;
}

interface Service {
  _id: string;
  name: string;
  address: string;
  contactPerson: string;
  photo: string;
  category: string; // Pridėkite category savybę
}

const DetailsSidebar: React.FC<DetailsSidebarProps> = ({ id, category }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get<Service[]>(
          `http://localhost:5005/services`
        );
        const filteredServices = response.data
          .filter(
            (service) => service.category === category && service._id !== id
          )
          .slice(0, 3);
        setServices(filteredServices);
      } catch (error) {
        setError("Error fetching services");
      }
    };

    fetchServices();
  }, [id, category]);

  const handleServiceClick = (serviceId: string) => {
    navigate(`/details/${serviceId}`);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.sidebarContainer}>
      <button className={styles.bookButton}>Book Appointment</button>
      <h3>Similar Business</h3>
      {services.map((service) => (
        <div
          key={service._id}
          className={styles.serviceCard}
          onClick={() => handleServiceClick(service._id)}
        >
          <img
            src={"/" + service.photo}
            alt={service.name}
            className={styles.servicePhoto}
          />
          <div className={styles.serviceInfo}>
            <h4>{service.name}</h4>
            <p>{service.contactPerson}</p>
            <p>{service.address}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailsSidebar;
