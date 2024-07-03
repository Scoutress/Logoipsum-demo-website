import PropTypes from "prop-types";

const Button = ({ children, onClick, className, icon: Icon, ...props }) => {
  return (
    <button className={` ${className}`} onClick={onClick} {...props}>
      {Icon && <Icon />}
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.elementType,
};

Button.defaultProps = {
  onClick: () => {},
  className: "",
  icon: null,
};

export default Button;
