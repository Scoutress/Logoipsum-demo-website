import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = ({ className = "", children, onClick, icon: Icon }) => {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {Icon && <Icon className={styles.icon} />}
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  icon: PropTypes.elementType,
};

export default Button;
