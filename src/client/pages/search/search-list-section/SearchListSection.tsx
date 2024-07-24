import { useState, useEffect } from "react";
import axios from "axios";
import Service from "../../../components/service/Service";
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

const SearchListSection: React.FC<SearchListSectionProps> = ({
  searchTerm,
}) => {
  const [allServices, setAllServices] = useState<ServiceData[]>([]);
  const [filteredServices, setFilteredServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<ServiceData[]>(
          `http://localhost:5005/services`
        );
        setAllServices(response.data);
      } catch (error) {
        setError("Error fetching services");
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredServices(allServices);
    } else {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = allServices.filter(
        (service) =>
          (service.category &&
            service.category.toLowerCase().includes(lowercasedTerm)) ||
          (service.name &&
            service.name.toLowerCase().includes(lowercasedTerm)) ||
          (service.worker &&
            service.worker.toLowerCase().includes(lowercasedTerm)) ||
          (service.address &&
            service.address.toLowerCase().includes(lowercasedTerm))
      );
      setFilteredServices(filtered);
    }
  }, [searchTerm, allServices]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
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
