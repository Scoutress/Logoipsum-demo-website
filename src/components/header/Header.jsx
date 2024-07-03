import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Button from "../button/Button";
import PropTypes from "prop-types";

const NavItem = ({ to, children }) => {
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

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <img src="../../public/logos/logo-logoipsum.svg" alt="Logo" />
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
      <Button className={styles.loginBtn}>Login / Sign Up</Button>
    </header>
  );
};

export default Header;
