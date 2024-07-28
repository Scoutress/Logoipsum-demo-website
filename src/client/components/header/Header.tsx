import { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import Button from "../button/Button.tsx";
import PropTypes from "prop-types";
import AuthModal from "../auth-modal/AuthModal.tsx";
import { AuthContext } from "../../context/AuthContext.tsx";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleLogoutClick = () => {
    logout();
    setIsDropdownOpen(false);
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

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location.pathname]);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "lt" : "en";
    i18n.changeLanguage(newLang);
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
            <NavItem to="/">{t("HOME")}</NavItem>
            <NavItem to="/services" onClick={handleServicesClick}>
              {t("SERVICES")}
            </NavItem>
            <NavItem to="/about">{t("ABOUT_US")}</NavItem>
          </ul>
        </nav>
      </div>
      <div className={styles.languageSwitcher}>
        <button onClick={toggleLanguage}>
          <img
            src={
              i18n.language === "en"
                ? "/flags/LithuanianFlag.png"
                : "/flags/EnglishFlag.png"
            }
            alt={
              i18n.language === "en"
                ? t("SWITCH_TO_LITHUANIAN")
                : t("SWITCH_TO_ENGLISH")
            }
          />
        </button>
      </div>
      {user ? (
        <div className={styles.userMenu}>
          <button className={styles.userButton} onClick={handleDropdownToggle}>
            {user.username.charAt(0).toUpperCase()}
          </button>
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <Link
                to="/account"
                className={styles.dropdownItem}
                onClick={() => setIsDropdownOpen(false)}
              >
                {t("MY_ACCOUNT")}
              </Link>
              <Link
                to="/bookings"
                className={styles.dropdownItem}
                onClick={() => setIsDropdownOpen(false)}
              >
                {t("MY_BOOKINGS")}
              </Link>
              <button
                className={styles.dropdownItem}
                onClick={handleLogoutClick}
              >
                {t("LOGOUT")}
              </button>
            </div>
          )}
        </div>
      ) : (
        <Button className={styles.loginBtn} onClick={handleLoginClick}>
          {t("LOGIN_SIGNUP")}
        </Button>
      )}
      {isModalOpen && (
        <AuthModal
          onClose={() => setIsModalOpen(false)}
          onLoginSuccess={() => setIsModalOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
