import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import useLocalStorage from "../../hooks/UseLocalStorage";
import styles from "./Service.module.scss";

const Service = ({
  category = "Default Category",
  name = "Default Name",
  worker = "Default Worker",
  address = "Default Address",
  photo = "default.jpg",
}) => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  const isFavorite = favorites.some(
    (fav) =>
      fav.name === name && fav.worker === worker && fav.address === address
  );

  const handleClick = () => {
    navigate(`/category/${category.toLowerCase()}`);
  };

  const handleFavorite = (e) => {
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
      const newFavorite = { category, name, worker, address, photo };
      setFavorites([...favorites, newFavorite]);
    }
  };

  return (
    <div className={styles.card} onClick={handleClick}>
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
        <button className={styles.button}>Book now</button>
      </div>
    </div>
  );
};

Service.propTypes = {
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  worker: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};

export default Service;

