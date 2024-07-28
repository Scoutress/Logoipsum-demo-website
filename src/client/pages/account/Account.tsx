import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AccountPart from "./account-part/AccountPart.tsx";
import AccountPwPart from "./account-pw-part/AccountPwPart.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import styles from "./Account.module.scss";

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
      <h1>Account</h1>
      <AccountPart
        label="Username"
        name="username"
        value={user.username}
        userId={user.id}
        onUpdate={handleUpdate}
      />
      <AccountPart
        label="First Name"
        name="firstName"
        value={user.firstName}
        userId={user.id}
        onUpdate={handleUpdate}
      />
      <AccountPart
        label="Last Name"
        name="lastName"
        value={user.lastName}
        userId={user.id}
        onUpdate={handleUpdate}
      />
      <AccountPart
        label="City"
        name="city"
        value={user.city}
        userId={user.id}
        onUpdate={handleUpdate}
      />
      <AccountPart
        label="Email"
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
