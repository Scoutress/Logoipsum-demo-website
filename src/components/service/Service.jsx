import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./Service.module.scss";

const Service = ({
  category = "Default Category",
  name = "Default Name",
  worker = "Default Worker",
  address = "Default Address",
  photo = "default.jpg",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${category.toLowerCase()}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.imageContainer}>
        <img src={photo} alt={name} className={styles.image} />
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
