// src/client/components/booking/BookingModal.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookingModal from "./BookingModal";
import { AuthProvider } from "../../context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

// Mock CalendarComponent
jest.mock("../calendar/Calendar.tsx", () => () => (
  <div>Calendar Component</div>
));

describe("BookingModal Component", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders BookingModal component", () => {
    render(
      <Router>
        <AuthProvider>
          <BookingModal serviceID="123" onClose={mockOnClose} />
        </AuthProvider>
      </Router>
    );

    // Check if BookingModal content is rendered
    expect(screen.getByText("BOOK_SERVICE")).toBeInTheDocument();
    expect(screen.getByText("SELECT_DATE")).toBeInTheDocument();
    expect(screen.getByText("SELECT_TIME_SLOT")).toBeInTheDocument();
    expect(screen.getByText("BOOK_FOR_THIS_TIME")).toBeInTheDocument();
    expect(screen.getByText("Calendar Component")).toBeInTheDocument();
  });

  it("calls onClose when clicking the close button", () => {
    render(
      <Router>
        <AuthProvider>
          <BookingModal serviceID="123" onClose={mockOnClose} />
        </AuthProvider>
      </Router>
    );

    // Click on close button
    fireEvent.click(screen.getByText("×"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls onClose when clicking the backdrop", () => {
    render(
      <Router>
        <AuthProvider>
          <BookingModal serviceID="123" onClose={mockOnClose} />
        </AuthProvider>
      </Router>
    );

    // Click on backdrop
    fireEvent.click(screen.getByTestId("modal-backdrop"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("closes modal on escape key press", () => {
    render(
      <Router>
        <AuthProvider>
          <BookingModal serviceID="123" onClose={mockOnClose} />
        </AuthProvider>
      </Router>
    );

    // Simulate Escape key press
    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    expect(mockOnClose).toHaveBeenCalled();
  });
});
