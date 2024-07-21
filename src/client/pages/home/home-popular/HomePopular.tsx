import { useState, useEffect } from "react";
import axios from "axios";
import Service from "../../../components/service/Service";
import styles from "./HomePopular.module.scss";

interface ServiceData {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  // add other properties if needed
}

const HomePopular = () => {
  const [popularServices, setPopularServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get<ServiceData[]>(
          "http://localhost:3001/services"
        );
        const popular = response.data.slice(0, 4);
        setPopularServices(popular);
      } catch (error) {
        setError("Error fetching services");
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h3 className={styles.title}>Popular businesses</h3>
      <div className={styles.container}>
        {popularServices.map((service) => (
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
    </div>
  );
};

export default HomePopular;
