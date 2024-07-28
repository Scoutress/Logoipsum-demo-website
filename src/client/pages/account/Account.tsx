import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AccountPart from "./account-part/AccountPart.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import styles from "./Account.module.scss";
import { useTranslation } from "react-i18next";

interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  city: string;
  email: string;
  [key: string]: string;
}

const Account = () => {
  const [user, setUser] = useState<User>({
    id: "",
    username: "",
    firstName: "",
    lastName: "",
    city: "",
    email: "",
  });

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5005/user/current", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (isAuthenticated()) {
      fetchUserData();
    } else {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleUpdate = () => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5005/user/current", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  };

  return (
    <div className={styles.container}>
      <h1>{t("ACCOUNT")}</h1>
      <AccountPart
        label={t("USERNAME")}
        name="username"
        value={user.username}
        userId={user.id}
        onUpdate={handleUpdate}
      />
      <AccountPart
        label={t("FIRST_NAME")}
        name="firstName"
        value={user.firstName}
        userId={user.id}
        onUpdate={handleUpdate}
      />
      <AccountPart
        label={t("LAST_NAME")}
        name="lastName"
        value={user.lastName}
        userId={user.id}
        onUpdate={handleUpdate}
      />
      <AccountPart
        label={t("CITY")}
        name="city"
        value={user.city}
        userId={user.id}
        onUpdate={handleUpdate}
      />
      <AccountPart
        label={t("EMAIL")}
        name="email"
        value={user.email}
        userId={user.id}
        onUpdate={handleUpdate}
      />

      {/* Password changing does not work atm */}
      {/* <AccountPwPart
        userId={user.id}
        userDetails={user}
        onUpdate={handleUpdate}
      /> */}
    </div>
  );
};

export default Account;
