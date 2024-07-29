import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";

const MockIcon = () => <svg data-testid="mock-icon"></svg>;

describe("Button component", () => {
  test("renders children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  test("handles onClick event", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByText("Click me");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("applies className prop", () => {
    const className = "test-class";
    render(<Button className={className}>Click me</Button>);
    const button = screen.getByText("Click me");
    expect(button).toHaveClass(className);
  });

  test("renders icon when provided", () => {
    render(<Button icon={MockIcon}>Click me</Button>);
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });

  test("renders without icon when not provided", () => {
    render(<Button>Click me</Button>);
    expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
  });
});
