import React from "react";
import styles from "./ServiceDescription.module.scss";
import { useTranslation } from "react-i18next";

interface ServiceDescriptionProps {
  description: string;
}

const ServiceDescription: React.FC<ServiceDescriptionProps> = ({
  description,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.descriptionContainer}>
      <h2>{t("DESCRIPTION")}</h2>
      <p>{description}</p>
    </div>
  );
};

export default ServiceDescription;
