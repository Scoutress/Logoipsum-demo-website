import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: { email: string; password: string }) => Promise<boolean>;
  register: (userData: {
    name: string;
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

  const login = async (userData: {
    email: string;
    password: string;
  }): Promise<boolean> => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users?email=${userData.email}&password=${userData.password}`
      );
      const users: User[] = response.data;
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

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<boolean> => {
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
      const newUser: User = response.data;
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

export { AuthContext, AuthProvider };
