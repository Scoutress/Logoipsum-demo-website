import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Service from "../../../components/service/Service.tsx";
import styles from "./ServicesList.module.scss";

interface ServiceData {
  _id: string;
  contactPerson: string;
  category: string;
  name: string;
  address: string;
  photo: string;
}

interface ServicesListProps {
  selectedCategory: string;
}

const fetchServices = async (): Promise<ServiceData[]> => {
  const { data } = await axios.get<ServiceData[]>(
    "http://localhost:5005/services"
  );
  return data;
};

const ServicesList: React.FC<ServicesListProps> = ({ selectedCategory }) => {
  const {
    data: services,
    isLoading,
    error,
  } = useQuery<ServiceData[], Error>({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  const filteredServices = React.useMemo(() => {
    if (!services) return [];
    if (selectedCategory && selectedCategory !== "All") {
      return services.filter(
        (service) =>
          service.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    return services;
  }, [services, selectedCategory]);

  if (isLoading) {
    return <div className={styles.loading}>Loading services...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        Error fetching services: {error.message}
      </div>
    );
  }

  return (
    <div className={styles.servicesList}>
      <div className={styles.categoryHeader}>
        {selectedCategory ? selectedCategory : <span>&nbsp;</span>}
      </div>
      <div className={styles.servicesContainer}>
        {filteredServices && filteredServices.length > 0 ? (
          filteredServices.map((service) => (
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
