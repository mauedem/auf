import Kitchen from "../../../public/assets/icons/kitchen.svg";
import Bar from "../../../public/assets/icons/bar.svg";
import ArrowRight from "../../../public/assets/icons/arrow-right.svg";
import AufLogoBigShadowed from "../../../public/assets/icons/auf-logo-big-shadowed.svg";
import PhoneCallShadowed from "../../../public/assets/icons/phone-call-shadowed.svg";
import { useContext, useMemo, useRef } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

import './Footer.css'

import PropTypes from "prop-types";
import { YandexMap } from "../YandexMap/YandexMap.jsx";
import { DataContext } from "../../api/context/DataContext.jsx";

export const Footer = ({ language, contactsData, onMoreInfoClick }) => {
    const gastronomyRef = useRef(null);

    const { data } = useContext(DataContext);

    const gastronomyData = useMemo(() => data?.gastronomyData?.[0] || {}, [data?.gastronomyData]);

    return (
        <>
            <div className="footer" id="gastronomy" ref={gastronomyRef}>
                <div className="footer__container">
                    <h2 className="footer__title">
                        {gastronomyData[`title_${language}`]}
                    </h2>

                    <div className="gastronomy-cards">
                        <div
                            className="gastronomy-card"
                            onClick={() => {
                                window.open(`${API_BASE_URL}${gastronomyData['kitchen_file']}`, '_blank');
                            }}
                        >
                            <div><img src={Kitchen} alt="Kitchen"/></div>

                            <div style={{marginLeft: '20px'}}>
                                <div className="gastronomy-card__title">
                                    {gastronomyData[`kitchen_title_${language}`]}
                                </div>

                                <button className="watch-btn">
                                    <div className="watch-btn__text">
                                        {gastronomyData[`kitchen_button_${language}`]}
                                    </div>

                                    <img src={ArrowRight} alt="arrow right"/>
                                </button>
                            </div>
                        </div>

                        <div
                            className="gastronomy-card"
                            onClick={() => {
                                window.open(`${API_BASE_URL}${gastronomyData['bar_file']}`, '_blank');
                            }}
                        >
                            <div><img src={Bar} alt="Bar"/></div>

                            <div style={{marginLeft: '20px'}}>
                                <div className="gastronomy-card__title">
                                    {gastronomyData[`bar_title_${language}`]}
                                </div>

                                <button className="watch-btn">
                                    <div className="watch-btn__text">
                                        {gastronomyData[`bar_button_${language}`]}
                                    </div>

                                    <img src={ArrowRight} alt="arrow right"/>
                                </button>
                            </div>
                        </div>
                    </div>

                    <h2 className="footer__title" style={{marginTop: '100px'}}>
                        {contactsData[`title_${language}`]}
                    </h2>

                    <div className="footer__subtitle">
                        {contactsData[`subtitle_${language}`]}
                    </div>

                    <img className="footer__logo" src={AufLogoBigShadowed} alt="AUF logo"/>

                    <div className="footer__days">
                        {contactsData[`opening_hours_text_${language}`]}
                    </div>
                    <div className="footer__hours">
                        {contactsData[`opening_hours_${language}`]}
                    </div>

                    <div className="footer__addess" onClick={() => window.open(contactsData['navigator_link'], '_blank')}>
                        <div>{contactsData[`address_text_${language}`]}</div>
                        <div style={{color: 'var(--secondary-color)', marginTop: '6px'}}>
                            {contactsData[`full_address_${language}`]}
                        </div>
                    </div>

                    <div className="footer__text" style={{marginTop: '26px'}}>
                        {contactsData[`parking_${language}`]}
                    </div>

                    <div
                        className="footer__phone"
                        onClick={() => {
                            window.location.href = `tel:${contactsData['phone']}`;
                        }}
                    >
                        <img className="footer__phone-img" src={PhoneCallShadowed} alt="phone"/>
                        <div className="footer__phone-text">
                            {contactsData[`phone_formatted`]}
                        </div>
                    </div>

                    <div className="footer__map-filter">
                        <YandexMap className="footer__map" />
                    </div>

                    <div className="footer__goto">
                        <button
                            className="footer__button footer-yandex"
                            onClick={() => window.open(contactsData['navigator_link'], '_blank')}
                        >

                            {contactsData[`navigator_text_${language}`]}
                        </button>

                        <button
                            className="footer__button footer-taxi"
                            onClick={() => window.open(contactsData['taxi_link'], '_blank')}
                        >
                            {contactsData[`taxi_text_${language}`]}
                        </button>
                    </div>

                    <a
                        className="footer__button footer__button--filled footer-reserve"
                        href={`tel:${contactsData['phone']}`}
                    >
                        {contactsData[`book_button_${language}`]}
                    </a>

                    <div className="footer__info">
                        <div
                            className="footer__more-info-modal-modal"
                            onClick={onMoreInfoClick}
                        >

                            {contactsData[`more_info_link_${language}`]}
                        </div>
                        <div style={{marginTop: '30px'}}>
                            © AUF {contactsData[`year`]}
                        </div>
                        <div style={{marginTop: '10px'}}>
                            {contactsData[`privacy_policy_${language}`]}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Footer.propTypes = {
    onMoreInfoClick: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
    contactsData: PropTypes.object.isRequired,
};

