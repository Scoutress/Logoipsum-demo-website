import React, { ChangeEvent } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "./Input";

const mockOnChange = jest.fn();
const mockOnKeyDown = jest.fn();

describe("Input component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders with default props", () => {
    render(<Input value="" onChange={mockOnChange} />);

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).toHaveAttribute("maxLength", "255");
    expect(inputElement).toHaveValue("");
    expect(inputElement).toHaveAttribute("placeholder", "");
  });

  test("renders with provided props", () => {
    render(
      <Input
        value="test"
        onChange={mockOnChange}
        placeholder="Enter text"
        className="test-class"
        maxLength={100}
        onKeyDown={mockOnKeyDown}
      />
    );

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveValue("test");
    expect(inputElement).toHaveAttribute("placeholder", "Enter text");
    expect(inputElement).toHaveClass("test-class");
    expect(inputElement).toHaveAttribute("maxLength", "100");
  });

  test("calls onChange handler when text is input", () => {
    render(<Input value="" onChange={mockOnChange} />);

    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "new value" } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object));
  });

  test("calls onKeyDown handler when a key is pressed", () => {
    render(
      <Input value="" onChange={mockOnChange} onKeyDown={mockOnKeyDown} />
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.keyDown(inputElement, { key: "Enter" });
    expect(mockOnKeyDown).toHaveBeenCalledTimes(1);
    expect(mockOnKeyDown).toHaveBeenCalledWith(expect.any(Object));
  });

  test("does not call onKeyDown if it is not provided", () => {
    render(<Input value="" onChange={mockOnChange} />);

    const inputElement = screen.getByRole("textbox");
    fireEvent.keyDown(inputElement, { key: "Enter" });
    expect(mockOnKeyDown).not.toHaveBeenCalled();
  });
});
