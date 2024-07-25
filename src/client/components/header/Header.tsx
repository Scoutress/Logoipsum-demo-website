import { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import Button from "../button/Button";
import PropTypes from "prop-types";
import AuthModal from "../auth-modal/AuthModal";
import { AuthContext } from "../../context/AuthContext";

interface NavItemProps {
  to: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, children, onClick }) => {
  return (
    <li className={styles.button} onClick={onClick}>
      <Link to={to} className={styles.buttonLink}>
        {children}
      </Link>
    </li>
  );
};

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

const Header: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Header must be used within an AuthProvider");
  }

  const { user, logout } = authContext;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleLogoutClick = () => {
    logout();
  };

  const handleServicesClick = (event: React.MouseEvent<HTMLLIElement>) => {
    if (location.pathname.startsWith("/category/")) {
      event.preventDefault();
      setReload(true);
      navigate("/services");
    }
  };

  useEffect(() => {
    if (reload && location.pathname === "/services") {
      setReload(false);
      window.location.reload();
    }
  }, [location.pathname, reload]);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
            <NavItem to="/services" onClick={handleServicesClick}>
              Services
            </NavItem>
            <NavItem to="/about">About Us</NavItem>
          </ul>
        </nav>
      </div>
      {user ? (
        <div className={styles.userMenu}>
          <button className={styles.userButton} onClick={handleDropdownToggle}>
            {user.username.charAt(0).toUpperCase()}
          </button>
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <Link to="/account" className={styles.dropdownItem}>
                My Account
              </Link>
              <Link to="/bookings" className={styles.dropdownItem}>
                My Bookings
              </Link>
              <button
                className={styles.dropdownItem}
                onClick={handleLogoutClick}
              >
                Logout
              </button>
            </div>
          )}
        </div>
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
