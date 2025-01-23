import './MoreInfoModal.css'
import PropTypes from "prop-types";
import Cross from "../../../public/assets/icons/cross.svg";
import { useContext, useEffect, useMemo, useState } from "react";
import { DataContext } from "../../api/context/DataContext.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const MoreInfoModal = ({ language, isOpen, onClose }) => {
    const { data } = useContext(DataContext);

    const moreInfoData = useMemo(() => data?.moreInfoData?.[0] || {}, [data?.moreInfoData]);

    const handleOverlayClick = (event) => {
        if (event.target.classList.contains("more-info-modal")) {
            onClose();
        }
    };

    const [images, setImages] = useState({
        image_1: null,
        image_2: null,
        image_3: null,
    });

    useEffect(() => {
        if (Object.keys(moreInfoData).length > 0) {
            setImages({
                image_1: `${API_BASE_URL}${moreInfoData['photo_1']}`,
                image_2: `${API_BASE_URL}${moreInfoData['photo_2']}`,
                image_3: `${API_BASE_URL}${moreInfoData['photo_3']}`,
            });
        }
    }, [moreInfoData]);

    const TextList = () => {
        const lines = moreInfoData[`text_6_${language}`]?.split("\r\n");

        return (
            <ul style={{ padding: '0', margin: '0' }}>
                {lines?.map((line, index) => (
                    <li key={index}>{line}</li>
                ))}
            </ul>
        );
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="more-info-modal" onClick={handleOverlayClick}>
                <div className="more-info-modal__content">
                    <h2 className="more-info-modal__title">{moreInfoData[`title_1_${language}`]?.split('{{highlited}}')[0]} <span
                        style={{color: 'var(--secondary-color)'}}>
                        {moreInfoData[`highlight_title_1_${language}`]}
                    </span> {moreInfoData[`title_1_${language}`]?.split('{{highlited}}')[1]}
                    </h2>

                    <div className="more-info-modal__text">
                        {moreInfoData[`text_1_${language}`]}
                    </div>

                    {images.image_1 &&
                        <img src={images.image_1} alt="girl" className="more-info-modal__img"/>
                    }

                    <h2 className="more-info-modal__title">
                        {moreInfoData[`title_2_${language}`]?.split('{{highlited}}')[0]} <span style={{color: 'var(--secondary-color)'}}> {moreInfoData[`highlight_title_2_${language}`]}</span> {moreInfoData[`title_1_${language}`]?.split('{{highlited}}')[2]}
                    </h2>

                    <div className="more-info-modal__text">
                        {moreInfoData[`text_2_${language}`]}
                    </div>

                    {images.image_2 &&
                        <img src={images.image_2} alt="girl" className="more-info-modal__img"/>
                    }

                    <h3 className="more-info-modal__title">
                        {moreInfoData[`title_3_${language}`]?.split('{{highlited}}')[0]} <span style={{color: 'var(--secondary-color)'}}>{moreInfoData[`highlight_title_3_${language}`]}</span> {moreInfoData[`title_3_${language}`]?.split('{{highlited}}')[1]}
                    </h3>

                    <div className="more-info-modal__text">
                        {moreInfoData[`text_3_${language}`]}
                    </div>

                    {images.image_3 &&
                        <img src={images.image_3} alt="girl" className="more-info-modal__img"/>
                    }

                    <h3 className="more-info-modal__title">
                        <span style={{color: 'var(--secondary-color)'}}>{moreInfoData[`highlight_title_4_${language}`]}</span> {moreInfoData[`title_4_${language}`]?.split('{{highlited}}')[1]}
                    </h3>

                    <div className="more-info-modal__text">
                        {moreInfoData[`text_4_${language}`]}
                    </div>

                    <div className="more-info-modal__text" style={{marginTop: '20px'}}>
                        {moreInfoData[`text_5_${language}`]}
                    </div>

                    <h2 className="more-info-modal__text" style={{marginTop: '20px'}}>
                        {moreInfoData[`subtitle_${language}`]}
                    </h2>

                    <ul className="more-info-modal__text" style={{marginTop: '20px'}}>
                        {TextList()}
                    </ul>

                    <div className="more-info-modal__text" style={{marginTop: '20px'}}>
                        {moreInfoData[`text_7_${language}`]}
                    </div>

                    <button className="more-info-modal__close-btn" onClick={onClose}>
                        <img className="more-info-modal__close-img" src={Cross} alt="Cross"/>
                        <div className="more-info-modal__close-text">
                            {moreInfoData[`close_button_text_${language}`]}
                        </div>
                    </button>
                </div>
            </div>
        </>
    )
}

MoreInfoModal.propTypes = {
    language: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
