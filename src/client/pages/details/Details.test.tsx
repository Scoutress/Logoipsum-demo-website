import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Details from "./Details";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("axios");
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockService = {
  _id: "1",
  name: "Service Name",
  category: "Category",
  address: "123 Main St",
  contactPerson: "John Doe",
  email: "john.doe@example.com",
  photo: "http://example.com/photo.jpg",
  description: "This is a service description.",
};

describe("Details Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows service details after successful fetch", async () => {
    localStorage.setItem("token", "dummy-token");
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockService });

    render(
      <Router>
        <Details />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(mockService.name)).toBeInTheDocument();
      expect(screen.getByText(mockService.category)).toBeInTheDocument();
      expect(screen.getByText(mockService.address)).toBeInTheDocument();
      expect(screen.getByText(mockService.contactPerson)).toBeInTheDocument();
      expect(screen.getByText(mockService.email)).toBeInTheDocument();
      expect(screen.getByText(mockService.description)).toBeInTheDocument();
    });
  });
});
