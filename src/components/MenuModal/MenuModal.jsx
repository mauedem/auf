import PropTypes from "prop-types";

import { Worker, Viewer } from "@react-pdf-viewer/core";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import './MenuModal.css';
import  { useEffect, useState } from "react";
import Cross from "../../../public/assets/icons/cross.svg";
import { useLanguage } from "../../context/LanguageProvider.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const MenuModal = ({ isOpen, onClose, gastronomyData, interiorData, currentPdfFile }) => {
    const [scale, setScale] = useState(1);

    const { language } = useLanguage();

    const handleOverlayClick = (event) => {
        if (event.target.classList.contains("menu-modal")) {
            onClose();
        }
    };

    const calculateScale = (viewportWidth) => {
        if (viewportWidth <= 420) return 0.4;
        if (viewportWidth <= 520) return 0.5;
        if (viewportWidth <= 640) return 0.6;
        if (viewportWidth <= 740) return 0.7;
        if (viewportWidth <= 840) return 0.8;
        if (viewportWidth <= 940) return 0.9;
        return 1;
    };

    useEffect(() => {
        const updateScale = () => {
            const viewportWidth = window.innerWidth;
            const newScale = calculateScale(viewportWidth);
            setScale(newScale);
        };

        updateScale();
        window.addEventListener("resize", updateScale);

        return () => window.removeEventListener("resize", updateScale);
    }, []);

    if (!isOpen) return null;

    return (
        <>
            <div className="menu-modal" onClick={handleOverlayClick}>
                <div className="menu-modal__content">
                    <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
                        <Viewer
                            fileUrl={`${API_BASE_URL}${gastronomyData[currentPdfFile]}`}
                            defaultScale={scale}
                        />
                    </Worker>

                    <button className="more-info-modal__close-btn" onClick={onClose}>
                        <img className="more-info-modal__close-img" src={Cross} alt="Cross"/>
                        <div className="more-info-modal__close-text">
                            {interiorData[`close_button_text_${language}`]}
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
};

MenuModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    gastronomyData: PropTypes.object.isRequired,
    interiorData: PropTypes.object.isRequired,
    currentPdfFile: PropTypes.string.isRequired,
};
