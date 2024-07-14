import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (userData) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users?email=${userData.email}&password=${userData.password}`
      );
      const users = response.data;
      if (users.length > 0) {
        setUser(users[0]);
        localStorage.setItem("user", JSON.stringify(users[0]));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const newUser = response.data;
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error("Register error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
