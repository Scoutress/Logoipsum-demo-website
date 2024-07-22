import React, { useState } from "react";
import styles from "./ServiceGallery.module.scss";

interface ServiceGalleryProps {
  photo: string;
}

const ServiceGallery: React.FC<ServiceGalleryProps> = ({ photo }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handlePhotoClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.galleryContainer}>
      <h2>Gallery</h2>
      <div className={styles.photosContainer}>
        <img
          src={photo}
          alt="Service Photo"
          className={styles.photo}
          onClick={handlePhotoClick}
        />
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photo}
              alt="Service Photo"
              className={styles.modalPhoto}
            />
            <button className={styles.closeButton} onClick={handleCloseModal}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceGallery;
