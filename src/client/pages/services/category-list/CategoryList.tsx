import { useEffect, useState } from "react";
import axios from "axios";
import Service from "../../../components/service/Service";
import styles from "./CategoryList.module.scss";

interface ServiceData {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  // add other properties if needed
}

interface CategoryListProps {
  selectedCategory: string;
}

const CategoryList: React.FC<CategoryListProps> = ({ selectedCategory }) => {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<ServiceData[]>(
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

export default CategoryList;
