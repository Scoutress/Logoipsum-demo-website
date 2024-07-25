import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ComponentType;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  icon: Icon,
}) => (
  <button onClick={onClick} className={`${className}`}>
    {Icon && <Icon />}
    {children}
  </button>
);

export default Button;
