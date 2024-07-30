import React from "react";
import { render, screen } from "@testing-library/react";
import ServiceDescription from "./ServiceDescription";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("ServiceDescription Component", () => {
  it("renders the component with the description and translation", () => {
    const descriptionText = "This is a service description.";

    render(<ServiceDescription description={descriptionText} />);

    expect(screen.getByText("DESCRIPTION")).toBeInTheDocument();

    expect(screen.getByText(descriptionText)).toBeInTheDocument();
  });
});
