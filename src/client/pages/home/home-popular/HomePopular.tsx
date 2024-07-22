import React, { useState, useEffect } from "react";
import axios from "axios";
import Service from "../../../components/service/Service.tsx";
import styles from "./HomePopular.module.scss";

interface ServiceData {
  _id: string;
  name: string;
  description: string;
  address: string;
  category: string;
  contactPerson: string;
  email: string;
  photo: string;
}

const HomePopular: React.FC = () => {
  const [popularServices, setPopularServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get<ServiceData[]>(
          "http://localhost:5005/services"
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
      <h3 className={styles.title}>Popular services</h3>
      <div className={styles.container}>
        {popularServices.map((service) => {
          return (
            <Service
              key={service._id || service.name}
              _id={service._id}
              category={service.category}
              name={service.name}
              worker={service.contactPerson}
              address={service.address}
              photo={service.photo}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePopular;
