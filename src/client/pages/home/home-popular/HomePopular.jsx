import { useState, useEffect } from "react";
import Service from "../../../components/service/Service";
import styles from "./HomePopular.module.scss";

const HomePopular = () => {
  const [popularServices, setPopularServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/services")
      .then((response) => response.json())
      .then((data) => {
        const popular = data.slice(0, 4);
        setPopularServices(popular);
      })
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

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

