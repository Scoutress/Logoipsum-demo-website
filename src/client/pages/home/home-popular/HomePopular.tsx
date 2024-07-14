import { useState, useEffect } from "react";
import axios from "axios";
import Service from "../../../components/service/Service.js";
import styles from "./HomePopular.module.scss";

const HomePopular = () => {
  const [popularServices, setPopularServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:3001/services");
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
          <Service key={service.id} {...service} />
        ))}
      </div>
    </div>
  );
};

export default HomePopular;
