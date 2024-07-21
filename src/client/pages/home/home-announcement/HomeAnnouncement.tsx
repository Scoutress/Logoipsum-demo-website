import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import styles from "./HomeAnnouncement.module.scss";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const HomeAnnouncement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    if (searchTerm !== "") {
      navigate(`/search?term=${searchTerm}`);
    } else {
      navigate(`/search`);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

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
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="Search"
            className={styles.searchInput}
          />
          <Button
            icon={AiOutlineSearch}
            className={styles.searchBtn}
            onClick={handleSearchClick}
            children={undefined}
          ></Button>
        </div>
      </div>
    </header>
  );
};

export default HomeAnnouncement;
