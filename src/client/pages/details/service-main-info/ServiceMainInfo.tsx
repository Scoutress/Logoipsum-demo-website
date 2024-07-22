import React from "react";
import styles from "./ServiceMainInfo.module.scss";

interface ServiceMainInfoProps {
  id: string;
  name: string;
  category: string;
  address: string;
  contactPerson: string;
  email: string;
  photo: string;
  availability: string;
}

const ServiceMainInfo: React.FC<ServiceMainInfoProps> = ({
  id,
  name,
  category,
  address,
  contactPerson,
  email,
  photo,
  availability,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={photo} alt={name} className={styles.image} />
      </div>
      <div className={styles.infoContainer}>
        <span className={styles.category}>{category}</span>
        <h1 className={styles.name}>{name}</h1>
        <p className={styles.address}>
          <i className="fas fa-map-marker-alt"></i> {address}
        </p>
        <p className={styles.email}>
          <i className="fas fa-envelope"></i> {email}
        </p>
      </div>
      <div className={styles.contactContainer}>
        <p className={styles.contactPerson}>
          <i className="fas fa-user"></i> {contactPerson}
        </p>
        <p className={styles.availability}>
          <i className="fas fa-clock"></i> {availability}
        </p>
      </div>
    </div>
  );
};

export default ServiceMainInfo;
