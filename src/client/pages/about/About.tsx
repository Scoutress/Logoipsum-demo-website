import React from "react";
import styles from "./About.module.scss";

const About = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About</h1>
      <p className={styles.description}>
        Welcome to our service marketplace! Our platform offers a wide range of
        service categories, each featuring a number of service providers.
        Whether you are looking for home services, personal care, or
        professional assistance, you can find trusted providers here.
      </p>
      <p className={styles.description}>
        With our easy-to-use booking system, you can reserve a service by
        selecting a date and time that suits your schedule. Our goal is to make
        it convenient for you to find and book the services you need, all in one
        place.
      </p>
      <p className={styles.description}>
        Thank you for choosing our platform. We are committed to connecting you
        with the best service providers and ensuring a seamless booking
        experience.
      </p>
    </div>
  );
};

export default About;
