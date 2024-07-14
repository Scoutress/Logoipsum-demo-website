import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchInputSection from "./search-input-section/SearchInputSection";
import SearchListSection from "./search-list-section/SearchListSection";
import styles from "./SearchPage.module.scss";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
  const query = useQuery();
  const initialSearchTerm = query.get("term") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.inputSection}>
        <SearchInputSection
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
        />
      </div>
      <div className={styles.listSection}>
        <SearchListSection searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default SearchPage;

