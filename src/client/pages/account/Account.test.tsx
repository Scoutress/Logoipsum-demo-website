// src/client/pages/account/Account.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Account from "./Account";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext"; // Patikrinkite, ar kelias yra teisingas

describe("Account Component", () => {
  it("renders Account component", () => {
    render(
      <Router>
        <AuthProvider>
          <Account />
        </AuthProvider>
      </Router>
    );

    // Patikrinkite, ar puslapio antraštė yra matoma
    expect(screen.getByText("ACCOUNT")).toBeInTheDocument();
  });
});
