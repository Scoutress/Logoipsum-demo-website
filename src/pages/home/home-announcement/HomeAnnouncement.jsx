import { AiOutlineSearch } from "react-icons/ai";
import styles from "./HomeAnnouncement.module.scss";

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
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search"
          />
          <button className={styles.searchBtn}>
            <AiOutlineSearch />
          </button>
        </div>
      </div>
    </header>
  );
};

export default HomeAnnouncement;
