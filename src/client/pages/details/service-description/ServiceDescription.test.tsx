import React from "react";
import { render, screen } from "@testing-library/react";
import ServiceDescription from "./ServiceDescription";

// Mock useTranslation from react-i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("ServiceDescription Component", () => {
  it("renders the component with the description and translation", () => {
    const descriptionText = "This is a service description.";

    render(<ServiceDescription description={descriptionText} />);

    // Check for the translated title
    expect(screen.getByText("DESCRIPTION")).toBeInTheDocument();

    // Check for the provided description
    expect(screen.getByText(descriptionText)).toBeInTheDocument();
  });
});
