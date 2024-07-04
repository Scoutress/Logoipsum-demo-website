import PropTypes from "prop-types";
import React from "react";

const Input = React.forwardRef(
  ({ value, onChange, placeholder, className, maxLength, onKeyDown }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={className}
        maxLength={maxLength}
      />
    );
  }
);

Input.displayName = "Input";

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  maxLength: PropTypes.number,
  onKeyDown: PropTypes.func,
};

Input.defaultProps = {
  placeholder: "",
  className: "",
  maxLength: 255,
  onKeyDown: null,
};

export default Input;
