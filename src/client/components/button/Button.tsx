import PropTypes from "prop-types";
import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ComponentType<{ className?: string }>;
}

const Button: React.FC<ButtonProps> = ({
  className = "",
  children,
  onClick,
  icon: Icon,
}) => {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {Icon && <Icon className={styles.icon} />}
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.func,
};

export default Button;
