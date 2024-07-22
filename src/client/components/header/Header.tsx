import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Button from "../button/Button";
import PropTypes from "prop-types";
import AuthModal from "../auth-modal/AuthModal";
import { AuthContext } from "../../context/AuthContext";

interface NavItemProps {
  to: string;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, children }) => {
  return (
    <li className={styles.button}>
      <Link to={to} className={styles.buttonLink}>
        {children}
      </Link>
    </li>
  );
};

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const Header: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Header must be used within an AuthProvider");
  }

  const { user, logout } = authContext;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <img src="/logos/logo-logoipsum.svg" alt="Logo" />
        </Link>
      </div>
      <div className={styles.navbar}>
        <nav>
          <ul className={styles.ul}>
            <NavItem to="/">Home</NavItem>
            <NavItem to="/services">Services</NavItem>
            <NavItem to="/about">About Us</NavItem>
          </ul>
        </nav>
      </div>
      {user ? (
        <Button className={styles.loginBtn} onClick={handleLogoutClick}>
          Logout
        </Button>
      ) : (
        <Button className={styles.loginBtn} onClick={handleLoginClick}>
          Login / Sign Up
        </Button>
      )}
      {isModalOpen && <AuthModal onClose={() => setIsModalOpen(false)} />}
    </header>
  );
};

export default Header;
