import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Account from "./Account";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";

describe("Account Component", () => {
  it("renders Account component", () => {
    render(
      <Router>
        <AuthProvider>
          <Account />
        </AuthProvider>
      </Router>
    );

    expect(screen.getByText("ACCOUNT")).toBeInTheDocument();
  });
});
