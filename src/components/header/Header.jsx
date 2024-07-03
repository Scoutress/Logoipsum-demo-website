import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Button from "../button/Button";

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
            <li className={styles.button}>
              <Link to="/" className={styles.buttonLink}>
                Home
              </Link>
            </li>
            <li className={styles.button}>
              <Link to="/services" className={styles.buttonLink}>
                Services
              </Link>
            </li>
            <li className={styles.button}>
              <Link to="/about" className={styles.buttonLink}>
                About Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <Button className={styles.loginBtn}>Login / Sign Up</Button>
    </header>
  );
};

export default Header;
