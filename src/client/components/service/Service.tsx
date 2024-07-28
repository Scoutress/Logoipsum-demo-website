import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import useLocalStorage from "../../hooks/UseLocalStorage";
import styles from "./Service.module.scss";
import { useTranslation } from "react-i18next";

interface ServiceProps {
  _id: string;
  category: string;
  name: string;
  worker: string;
  address: string;
  photo: string;
  className?: string;
}

const Service: React.FC<ServiceProps> = ({
  _id,
  category,
  name,
  worker,
  address,
  photo,
  className,
}) => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useLocalStorage<ServiceProps[]>(
    "favorites",
    []
  );
  const { t } = useTranslation();

  const isFavorite = favorites.some(
    (fav) =>
      fav.name === name && fav.worker === worker && fav.address === address
  );

  const handleClick = () => {
    navigate(`/category/${category.toLowerCase()}`);
  };

  const handleBtnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    navigate(`/details/${_id}`);
  };

  const handleFavorite = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (isFavorite) {
      setFavorites(
        favorites.filter(
          (fav) =>
            fav.name !== name ||
            fav.worker !== worker ||
            fav.address !== address
        )
      );
    } else {
      const newFavorite = { _id, category, name, worker, address, photo };
      setFavorites([...favorites, newFavorite]);
    }
  };

  return (
    <div className={`${styles.card} ${className}`} onClick={handleClick}>
      <div className={styles.imageContainer}>
        <img src={photo} alt={name} className={styles.image} />
        <button
          className={`${styles.favoriteButton} ${
            isFavorite ? styles.active : ""
          }`}
          onClick={handleFavorite}
        >
          <FontAwesomeIcon icon={faStar} />
        </button>
      </div>
      <div className={styles.content}>
        <p className={styles.category}>{category}</p>
        <p className={styles.name}>{name}</p>
        <p className={styles.worker}>{worker}</p>
        <p className={styles.address}>{address}</p>
        <button className={styles.button} onClick={handleBtnClick}>
          {t("BOOK_NOW")}
        </button>
      </div>
    </div>
  );
};

export default Service;
