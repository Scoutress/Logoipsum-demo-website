import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchInputSection from "./search-input-section/SearchInputSection";
import SearchListSection from "./search-list-section/SearchListSection";
import styles from "./SearchPage.module.scss";

const SearchPage = () => {
  const location = useLocation();
  const initialSearchTerm = location.state?.term || "";
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.inputSection}>
        <SearchInputSection
          setSearchTerm={handleSearchTermChange}
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
