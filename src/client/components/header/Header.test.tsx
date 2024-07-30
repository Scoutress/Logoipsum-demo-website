import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
import { AuthProvider } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        HOME: "Home",
        SERVICES: "Services",
        ABOUT_US: "About Us",
        SWITCH_TO_LITHUANIAN: "Switch to Lithuanian",
        SWITCH_TO_ENGLISH: "Switch to English",
        MY_ACCOUNT: "My Account",
        MY_BOOKINGS: "My Bookings",
        LOGOUT: "Logout",
        LOGIN_SIGNUP: "Login/Signup",
      };
      return translations[key] || key;
    },
    i18n: {
      language: "en",
      changeLanguage: jest.fn(),
    },
  }),
}));

const mockUser = {
  id: 1,
  username: "TestUser",
  firstName: "Test",
  lastName: "User",
  city: "Test City",
  email: "test@example.com",
  password: "password",
};

const mockLogout = jest.fn();

const renderComponent = (user = mockUser) => {
  return render(
    <Router>
      <AuthProvider>
        <Header />
      </AuthProvider>
    </Router>
  );
};

describe("Header Component", () => {
  test("renders correctly with user", () => {
    renderComponent();
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByAltText("Switch to Lithuanian")).toBeInTheDocument();
  });

  test("opens and closes login modal", () => {
    renderComponent();
    fireEvent.click(screen.getByText("Login/Signup"));
    expect(screen.getByTestId("backdrop")).toBeInTheDocument();
    fireEvent.click(screen.getByText("✖"));
    expect(screen.queryByTestId("backdrop")).not.toBeInTheDocument();
  });

  test("navigates to services and handles page reload", async () => {
    renderComponent();
    fireEvent.click(screen.getByText("Services"));
    await waitFor(() => {
      expect(window.location.href).toContain("/services");
    });
  });
});
