import PropTypes from "prop-types";

const Button = ({ icon: Icon, onClick, className, children }) => (
  <button onClick={onClick} className={className}>
    {Icon && <Icon />}
    {children}
  </button>
);

Button.propTypes = {
  icon: PropTypes.elementType,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

Button.defaultProps = {
  icon: null,
  className: "",
  children: null,
};

export default Button;
