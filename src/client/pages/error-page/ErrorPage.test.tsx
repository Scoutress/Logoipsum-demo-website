import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorPage from "./ErrorPage";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("ErrorPage Component", () => {
  it("renders correctly with translations", () => {
    render(<ErrorPage />);

    expect(screen.getByText("404_TITLE")).toBeInTheDocument();
    expect(screen.getByText("404_MESSAGE")).toBeInTheDocument();
    expect(screen.getByText("404_DESCRIPTION")).toBeInTheDocument();
    expect(screen.getByText("GO_TO_HOMEPAGE")).toBeInTheDocument();
  });

  it("contains a link to the homepage", () => {
    render(<ErrorPage />);

    const homeLink = screen.getByText("GO_TO_HOMEPAGE") as HTMLAnchorElement;
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
