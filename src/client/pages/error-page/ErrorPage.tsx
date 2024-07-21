import React from "react";
import styles from "./ErrorPage.module.scss";

const ErrorPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>
        Oops! The page you are looking for does not exist.
      </p>
      <p className={styles.description}>
        It looks like the link you clicked may be broken or the page has been
        removed. Please check the URL or return to the homepage.
      </p>
      <a href="/" className={styles.homeLink}>
        Go to Homepage
      </a>
    </div>
  );
};

export default ErrorPage;
