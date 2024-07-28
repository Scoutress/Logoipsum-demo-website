import { useState, useEffect, useRef, ChangeEvent } from "react";
import Input from "../../../components/input/Input.tsx";
import styles from "./SearchInputSection.module.scss";
import { useTranslation } from "react-i18next";

interface SearchInputSectionProps {
  setSearchTerm: (term: string) => void;
  searchTerm: string;
}

const SearchInputSection: React.FC<SearchInputSectionProps> = ({
  setSearchTerm,
  searchTerm,
}) => {
  const [inputValue, setInputValue] = useState<string>(searchTerm);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        placeholder={t("SEARCH_PLACEHOLDER")}
        className={styles.searchInput}
        maxLength={50}
      />
    </div>
  );
};

export default SearchInputSection;
