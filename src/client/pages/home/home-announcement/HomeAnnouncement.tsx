import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import styles from "./HomeAnnouncement.module.scss";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomeAnnouncement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    navigate("/search", { state: { term: searchTerm } });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  const mainTitle = t("MAIN_TITLE");
  const words = mainTitle.split(" ");

  return (
    <header className={styles.header}>
      <div>
        <div className={styles.titleContainer}>
          <h1 className={styles.h1}>
            <span>{words.slice(0, 2).join(" ")} </span>
            <span className={styles.h1Colored}>
              {words.slice(2, 3).join(" ")}{" "}
            </span>
            <span>{words.slice(3).join(" ")}</span>
          </h1>
          <h2 className={styles.h2}>{t("MAIN_SUB_TITLE")}</h2>
        </div>
        <div className={styles.searchContainer}>
          <Input
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder={t("SEARCH_PLACEHOLDER")}
            className={styles.searchInput}
          />
          <Button
            icon={AiOutlineSearch}
            className={styles.searchBtn}
            onClick={handleSearchClick}
            children={undefined}
          />
        </div>
      </div>
    </header>
  );
};

export default HomeAnnouncement;
