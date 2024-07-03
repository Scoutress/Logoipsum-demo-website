import styles from "./HomeAnnouncement.module.scss";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import { AiOutlineSearch } from "react-icons/ai";

const HomeAnnouncement = () => {
  return (
    <header className={styles.header}>
      <div>
        <div className={styles.titleContainer}>
          <h1 className={styles.h1}>
            <span>Find Home </span>
            <span className={styles.h1Colored}>Service/Repair </span>
            <span>Near You</span>
          </h1>
          <h2 className={styles.h2}>
            Explore Best Home Service & Repair near you
          </h2>
        </div>
        <div className={styles.searchContainer}>
          <Input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
          />
          <Button icon={AiOutlineSearch} className={styles.searchBtn} />
        </div>
      </div>
    </header>
  );
};

export default HomeAnnouncement;
