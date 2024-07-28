import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./AccountPart.module.scss";
import { useTranslation } from "react-i18next";

interface AccountPartProps {
  label: string;
  name: string;
  value: string;
  userId: string;
  onUpdate: () => void;
}

const AccountPart: React.FC<AccountPartProps> = ({
  label,
  name,
  value,
  userId,
  onUpdate,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSave = async () => {
    setIsUpdating(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5005/user/${userId}`,
        { [name]: inputValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        onUpdate();
      }, 1500);
    } catch (error) {
      console.error(`Error updating ${name}:`, error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={styles.accountPart} ref={componentRef}>
      {showSuccessMessage ? (
        <p className={styles.successMessage}>{t("UPDATED_SUCCESSFULLY")}</p>
      ) : (
        <>
          <label htmlFor={name}>{label}</label>
          <input
            type="text"
            id={name}
            name={name}
            value={inputValue}
            onChange={handleChange}
            disabled={isUpdating}
          />
          <button onClick={handleSave} disabled={isUpdating}>
            {isUpdating ? t("SAVING") : t("SAVE")}
          </button>
        </>
      )}
    </div>
  );
};

export default AccountPart;
