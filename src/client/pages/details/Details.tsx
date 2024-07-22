import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ServiceMainInfo from "./service-main-info/ServiceMainInfo";
import ServiceDescription from "./service-description/ServiceDescription";
import DetailsSidebar from "./details-sidebar/DetailsSidebar";
import ServiceGallery from "./service-gallery/ServiceGallery";
import styles from "./Details.module.scss";

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5005/services/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setService(response.data);
      } catch (error) {
        setError("Error fetching service");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !service) {
    return <div>{error || "Error loading service"}</div>;
  }

  const serviceId = service._id ?? "";
  const serviceCategory = service.category ?? "";

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.mainContent}>
        <ServiceMainInfo
          id={serviceId}
          name={service.name}
          category={serviceCategory}
          address={service.address}
          contactPerson={service.contactPerson}
          email={service.email}
          photo={"/" + service.photo}
          availability="No data"
        />
        <ServiceDescription description={service.description} />
        <ServiceGallery photo={"/" + service.photo} />
      </div>
      <div className={styles.sidebarContent}>
        <DetailsSidebar id={serviceId} category={serviceCategory} />
      </div>
    </div>
  );
};

export default Details;
