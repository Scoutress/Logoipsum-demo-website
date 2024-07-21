import { useState, useEffect } from "react";
import axios from "axios";
import Service from "../../../components/service/Service";
import styles from "./SearchListSection.module.scss";

interface ServiceData {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  // add other properties if needed
}

interface SearchListSectionProps {
  searchTerm: string;
}

const SearchListSection: React.FC<SearchListSectionProps> = ({
  searchTerm,
}) => {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<ServiceData[]>(
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
        <Service
          category={""}
          worker={""}
          address={""}
          photo={""}
          key={service.id}
          {...service}
        />
      ))}
    </div>
  );
};

export default SearchListSection;
