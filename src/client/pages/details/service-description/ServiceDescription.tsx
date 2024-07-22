import React from "react";
import styles from "./ServiceDescription.module.scss";

interface ServiceDescriptionProps {
  description: string;
}

const ServiceDescription: React.FC<ServiceDescriptionProps> = ({
  description,
}) => {
  return (
    <div className={styles.descriptionContainer}>
      <h2>Description</h2>
      <p>{description}</p>
    </div>
  );
};

export default ServiceDescription;
