import React, { ForwardedRef, ChangeEvent, KeyboardEvent } from "react";

interface InputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      onChange,
      placeholder = "",
      className = "",
      maxLength = 255,
      onKeyDown,
    },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown || undefined}
        placeholder={placeholder}
        className={className}
        maxLength={maxLength}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
