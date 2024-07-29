import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Details from "./Details";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";

// Mock the necessary modules
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

  // it("shows loading state initially", () => {
  //   (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockService });

  //   render(
  //     <Router>
  //       <Details />
  //     </Router>
  //   );

  //   expect(screen.getByText("LOADING")).toBeInTheDocument();
  // });

  // it("shows login modal if no token is present", async () => {
  //   localStorage.removeItem("token");
  //   (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockService });

  //   render(
  //     <Router>
  //       <Details />
  //     </Router>
  //   );

  //   expect(await screen.findByText("LOGIN_REQUIRED")).toBeInTheDocument();
  // });

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

  // it("handles error state", async () => {
  //   localStorage.setItem("token", "dummy-token");
  //   (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Fetch error"));

  //   render(
  //     <Router>
  //       <Details />
  //     </Router>
  //   );

  //   await waitFor(() => {
  //     expect(screen.getByText("ERROR_LOADING_SERVICE")).toBeInTheDocument();
  //   });
  // });

  // it("handles login success and fetches service data again", async () => {
  //   localStorage.removeItem("token");
  //   (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Fetch error"));

  //   const { getByText } = render(
  //     <Router>
  //       <Details />
  //     </Router>
  //   );

  //   fireEvent.click(getByText("LOGIN_REQUIRED"));

  //   // Mock successful login and fetch service data
  //   localStorage.setItem("token", "dummy-token");
  //   (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockService });

  //   fireEvent.click(screen.getByText("LOGIN_SUCCESS"));

  //   await waitFor(() => {
  //     expect(screen.getByText(mockService.name)).toBeInTheDocument();
  //   });
  // });
});
