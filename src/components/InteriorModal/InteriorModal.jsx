import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import "./InteriorModal.css";
import { INTERIOR_ITEMS } from "../../utils/constants.js";
import Cross from "../../../public/assets/icons/cross.svg";

export const InteriorModal = ({ isOpen, onClose, selectedCategory, photos = [], onCategoryChange }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHorizontalPhoto, setIsHorizontalPhoto] = useState(false);
    const [progressKey, setProgressKey] = useState(0);
    const duration = 5;
    const intervalRef = useRef(null);

    const tagRefs = useRef([]);

    const nextPhoto = () => {
        if (photos && photos.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
        }
    };

    const prevPhoto = () => {
        if (photos && photos.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
        }
    };

    const handlePhotoClick = (event) => {
        const photoWidth = event.target.offsetWidth;
        const clickX = event.nativeEvent.offsetX;

        if (clickX > photoWidth / 2) {
            nextPhoto();
        } else {
            prevPhoto();
        }
    };

    const startAutoplay = () => {
        stopAutoplay();
        intervalRef.current = setInterval(() => {
            nextPhoto();
        }, duration * 1000);
    };

    const stopAutoplay = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    useEffect(() => {
        if (isOpen && photos.length > 0) {
            startAutoplay();

            const currentPhoto = getCurrentPhoto();
            if (currentPhoto) {
                checkOrientation(currentPhoto);
            }
        }

        return () => stopAutoplay();
    }, [isOpen, photos, currentIndex]);

    useEffect(() => {
        if (isOpen && selectedCategory) {
            stopAutoplay();
            setCurrentIndex(0);
            setProgressKey((prev) => prev + 1);
            startAutoplay();
            scrollToActiveTag();
        }
    }, [selectedCategory]);

    const getCurrentPhoto = () => {
        if (photos && photos.length > 0 && currentIndex >= 0 && currentIndex < photos.length) {
            return photos[currentIndex];
        }
        return "";
    };

    const checkOrientation = (photoSrc) => {
        const img = new Image();
        img.src = photoSrc;
        img.onload = () => {
            setIsHorizontalPhoto(img.width >= img.height);
        };
    };

    const scrollToActiveTag = () => {
        const activeIndex = INTERIOR_ITEMS.findIndex(
            (item) => item.photos === selectedCategory.photos
        );
        if (tagRefs.current[activeIndex]) {
            tagRefs.current[activeIndex].scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
            });
        }
    };

    const handleOverlayClick = (event) => {
        if (event.target.classList.contains("interior-modal")) {
            stopAutoplay();
            setCurrentIndex(0);
            onClose();
        }
    };

    const interiorItems = INTERIOR_ITEMS.map((item, index) => (
        <div
            key={item.id}
            className={`interior__tag ${
                selectedCategory.photos === item.photos ? "interior__tag--active" : "interior__tag--inactive"
            }`}
            ref={(el) => (tagRefs.current[index] = el)}
            onClick={() => {
                onCategoryChange(item);
            }}
        >
            {item.text}
        </div>
    ));

    if (!isOpen) return null;

    return (
        <>
            <div className="interior-modal" onClick={handleOverlayClick}>
                <div className="interior-modal__tags interior-modal__tags--big">{interiorItems}</div>
                <div className="interior-modal__content">
                    <div className="interior-progress">
                        {photos.map((_, index) => (
                            <div key={`${progressKey}-${index}`} className="interior-progress__bar">
                                <motion.div
                                    className="interior-progress__fill"
                                    initial={{width: "0%"}}
                                    animate={{
                                        width: currentIndex === index ? "100%" : "0%",
                                    }}
                                    transition={{
                                        duration: currentIndex === index ? duration : 0,
                                        ease: "linear",
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="interior-modal__tags interior-modal__tags--small">{interiorItems}</div>
                    {photos.length > 0 && (
                        <div
                            className="interior-photo__container"
                            style={{
                                backgroundImage: `url('/assets/images/${selectedCategory.photos}/${selectedCategory.bg}')`,
                                backgroundPosition: "center center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                backgroundAttachment: "fixed"
                            }}
                        >
                            <img
                                src={getCurrentPhoto()}
                                className={`interior-photo ${
                                    isHorizontalPhoto ? "interior-photo--horizontal" : "interior-photo--vertical"
                                }`}
                                alt={`Interior ${currentIndex + 1}`}
                                onClick={handlePhotoClick}
                            />
                        </div>
                    )}
                    <button className="interior-modal__close-btn interior-modal__close-btn--small" onClick={onClose}>
                        <img className="interior-modal__close-img" src={Cross} alt="Cross"/>
                        <div className="interior-modal__close-text">
                            Закрыть
                        </div>
                    </button>
                </div>
                <button className="interior-modal__close-btn interior-modal__close-btn--big" onClick={onClose}>
                    <img className="interior-modal__close-img" src={Cross} alt="Cross"/>
                    <div className="interior-modal__close-text">
                        Закрыть
                    </div>
                </button>
            </div>
        </>
    );
};

InteriorModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    photos: PropTypes.array,
    selectedCategory: PropTypes.object.isRequired,
    onCategoryChange: PropTypes.func.isRequired,
};
