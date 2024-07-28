import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
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

const fetchServices = async (): Promise<ServiceData[]> => {
  const { data } = await axios.get<ServiceData[]>(
    "http://localhost:5005/services"
  );
  return data;
};

const HomePopular: React.FC = () => {
  const {
    data: popularServices,
    isLoading,
    error,
  } = useQuery<ServiceData[], Error>({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const popular = popularServices?.slice(0, 4) || [];

  return (
    <div>
      <h3 className={styles.title}>Popular services</h3>
      <div className={styles.container}>
        {popular.map((service) => {
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
