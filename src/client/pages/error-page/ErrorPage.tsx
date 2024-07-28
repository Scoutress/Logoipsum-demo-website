import React from "react";
import styles from "./ErrorPage.module.scss";
import { useTranslation } from "react-i18next";

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("404_TITLE")}</h1>
      <p className={styles.message}>{t("404_MESSAGE")}</p>
      <p className={styles.description}>{t("404_DESCRIPTION")}</p>
      <a href="/" className={styles.homeLink}>
        {t("GO_TO_HOMEPAGE")}
      </a>
    </div>
  );
};

export default ErrorPage;
