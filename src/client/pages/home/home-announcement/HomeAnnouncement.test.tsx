import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HomeAnnouncement from "./HomeAnnouncement";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("HomeAnnouncement Component", () => {
  const navigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigate);
  });

  it("renders correctly with translations", () => {
    render(<HomeAnnouncement />);

    expect(screen.getByText("MAIN_TITLE")).toBeInTheDocument();
    expect(screen.getByText("MAIN_SUB_TITLE")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("SEARCH_PLACEHOLDER")
    ).toBeInTheDocument();
  });

  it("updates search term on input change", () => {
    render(<HomeAnnouncement />);

    const input = screen.getByPlaceholderText(
      "SEARCH_PLACEHOLDER"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Test Search" } });

    expect(input.value).toBe("Test Search");
  });

  it("navigates to /search with search term on search button click", () => {
    render(<HomeAnnouncement />);

    const input = screen.getByPlaceholderText(
      "SEARCH_PLACEHOLDER"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Test Search" } });

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(navigate).toHaveBeenCalledWith("/search", {
      state: { term: "Test Search" },
    });
  });

  it("navigates to /search with search term on Enter key press", () => {
    render(<HomeAnnouncement />);

    const input = screen.getByPlaceholderText(
      "SEARCH_PLACEHOLDER"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Test Search" } });

    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(navigate).toHaveBeenCalledWith("/search", {
      state: { term: "Test Search" },
    });
  });
});
