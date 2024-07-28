import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Service from "../../../components/service/Service.tsx";
import styles from "./SearchListSection.module.scss";

interface ServiceData {
  _id: string;
  category: string;
  name: string;
  worker: string;
  address: string;
  photo: string;
}

interface SearchListSectionProps {
  searchTerm: string;
}

const fetchServices = async (): Promise<ServiceData[]> => {
  const { data } = await axios.get<ServiceData[]>(
    "http://localhost:5005/services"
  );
  return data;
};

const SearchListSection: React.FC<SearchListSectionProps> = ({
  searchTerm,
}) => {
  const [filteredServices, setFilteredServices] = useState<ServiceData[]>([]);

  const {
    data: allServices,
    isLoading,
    error,
  } = useQuery<ServiceData[], Error>({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  useEffect(() => {
    if (!searchTerm) {
      setFilteredServices(allServices || []);
    } else {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered =
        allServices?.filter(
          (service) =>
            (service.category &&
              service.category.toLowerCase().includes(lowercasedTerm)) ||
            (service.name &&
              service.name.toLowerCase().includes(lowercasedTerm)) ||
            (service.worker &&
              service.worker.toLowerCase().includes(lowercasedTerm)) ||
            (service.address &&
              service.address.toLowerCase().includes(lowercasedTerm))
        ) || [];
      setFilteredServices(filtered);
    }
  }, [searchTerm, allServices]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className={styles.container}>
      {filteredServices.map((service) => (
        <Service
          key={service._id}
          _id={service._id}
          category={service.category}
          name={service.name}
          worker={service.worker}
          address={service.address}
          photo={service.photo}
        />
      ))}
    </div>
  );
};

export default SearchListSection;
