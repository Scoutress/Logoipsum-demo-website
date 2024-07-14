import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import Input from "../../../components/input/Input";
import styles from "./SearchInputSection.module.scss";

const SearchInputSection = ({ setSearchTerm, searchTerm }) => {
  const [inputValue, setInputValue] = useState(searchTerm);
  const inputRef = useRef(null);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setSearchTerm(value);
  };

  return (
    <div className={styles.searchContainer}>
      <Input
        ref={inputRef}
        value={inputValue}
        onChange={handleSearchChange}
        placeholder="Search"
        className={styles.searchInput}
        maxLength={50}
      />
    </div>
  );
};

SearchInputSection.propTypes = {
  setSearchTerm: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
};

export default SearchInputSection;

