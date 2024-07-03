import PropTypes from "prop-types";

const Input = ({ type, placeholder, value, onChange, className, ...props }) => {
  return (
    <input
      className={`${className}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Input.defaultProps = {
  type: "text",
  placeholder: "",
  value: "",
  className: "",
};

export default Input;
