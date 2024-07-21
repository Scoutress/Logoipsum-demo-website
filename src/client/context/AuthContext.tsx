import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  city: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: { email: string; password: string }) => Promise<boolean>;
  register: (userData: {
    username: string;
    firstName: string;
    lastName: string;
    city: string;
    email: string;
    password: string;
  }) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const API_URL = `http://localhost:5005`;

  const login = async (userData: {
    email: string;
    password: string;
  }): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { token, user } = response.data;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (userData: {
    username: string;
    firstName: string;
    lastName: string;
    city: string;
    email: string;
    password: string;
  }): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { token, user } = response.data;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      return true;
    } catch (error) {
      console.error("Register error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
