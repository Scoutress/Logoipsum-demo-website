import React from "react";
import styles from "./About.module.scss";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("ABOUT_TITLE")}</h1>
      <p className={styles.description}>{t("ABOUT_DESCRIPTION_1")}</p>
      <p className={styles.description}>{t("ABOUT_DESCRIPTION_2")}</p>
      <p className={styles.description}>{t("ABOUT_DESCRIPTION_3")}</p>
    </div>
  );
};

export default About;
