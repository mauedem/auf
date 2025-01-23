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
import { DataContext } from "../../context/DataContext.jsx";
import { useLanguage } from "../../context/LanguageProvider.jsx";
import {Skeleton} from "../Skeleton/Skeleton.jsx";

export const Footer = ({ contactsData, onMoreInfoClick }) => {
    const gastronomyRef = useRef(null);

    const { data, loading } = useContext(DataContext);

    const gastronomyData = useMemo(() => data?.gastronomyData?.[0] || {}, [data?.gastronomyData]);

    const { language } = useLanguage();

    return (
        <>
            <div className="footer" id="gastronomy" ref={gastronomyRef}>
                <div className="footer__container">
                    <h2 className="footer__title">
                        {loading ? <Skeleton type="text" /> : gastronomyData[`title_${language}`]}
                    </h2>

                    <div className="gastronomy-cards">
                        <div
                            className="gastronomy-card"
                            onClick={() => {
                                window.open(`${API_BASE_URL}${gastronomyData['kitchen_file']}`, '_blank');
                            }}
                        >
                            <div><img src={Kitchen} alt="Kitchen" loading="lazy" /></div>

                            <div style={{marginLeft: '20px'}}>
                                <div className="gastronomy-card__title">
                                    {gastronomyData[`kitchen_title_${language}`]}
                                </div>

                                <button className="watch-btn">
                                    <div className="watch-btn__text">
                                        {gastronomyData[`kitchen_button_${language}`]}
                                    </div>

                                    <img src={ArrowRight} alt="arrow right" loading="lazy" />
                                </button>
                            </div>
                        </div>

                        <div
                            className="gastronomy-card"
                            onClick={() => {
                                window.open(`${API_BASE_URL}${gastronomyData['bar_file']}`, '_blank');
                            }}
                        >
                            <div><img src={Bar} alt="Bar" loading="lazy" /></div>

                            <div style={{marginLeft: '20px'}}>
                                <div className="gastronomy-card__title">
                                    {gastronomyData[`bar_title_${language}`]}
                                </div>

                                <button className="watch-btn">
                                    <div className="watch-btn__text">
                                        {gastronomyData[`bar_button_${language}`]}
                                    </div>

                                    <img src={ArrowRight} alt="arrow right" loading="lazy" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <h2 className="footer__title" style={{marginTop: '100px'}}>
                        {loading ? <Skeleton type="text" /> : contactsData[`title_${language}`]}
                    </h2>

                    <div className="footer__subtitle">
                        {loading ? <Skeleton type="text" /> : contactsData[`subtitle_${language}`]}
                    </div>

                    <img className="footer__logo" src={AufLogoBigShadowed} alt="AUF logo" loading="lazy" />

                    <div className="footer__days">
                        {loading ? <Skeleton type="text" /> : contactsData[`opening_hours_text_${language}`]}

                    </div>
                    <div className="footer__hours">
                        {loading ? <Skeleton type="text" /> : contactsData[`opening_hours_${language}`]}
                    </div>

                    <div className="footer__addess" onClick={() => window.open(contactsData['navigator_link'], '_blank')}>
                        <div>
                            {loading ? <Skeleton type="text" /> : contactsData[`address_text_${language}`]}
                        </div>
                        <div style={{color: 'var(--secondary-color)', marginTop: '6px'}}>
                            {loading ? <Skeleton type="text" /> : contactsData[`full_address_${language}`]}
                        </div>
                    </div>

                    <div className="footer__text" style={{marginTop: '26px'}}>
                        {loading ? <Skeleton type="text" /> : contactsData[`parking_${language}`]}
                    </div>

                    {!loading &&
                        <div
                            className="footer__phone"
                            onClick={() => {
                                window.location.href = `tel:${contactsData['phone']}`;
                            }}
                        >
                            <img className="footer__phone-img" src={PhoneCallShadowed} alt="phone" loading="lazy" />
                            <div className="footer__phone-text">
                                {contactsData[`phone_formatted`]}
                            </div>
                        </div>
                    }

                    <div className="footer__map-filter">
                        {loading ? (
                            <Skeleton type="image" />
                        ) : (
                            <YandexMap className="footer__map" />
                        )}
                    </div>

                    <div className="footer__goto">
                        {loading ? (
                            <Skeleton type="text" />
                        ) : (
                            <button
                                className="footer__button footer-yandex"
                                onClick={() => window.open(contactsData['navigator_link'], '_blank')}
                            >

                                {contactsData[`navigator_text_${language}`]}
                            </button>
                        )}

                        {loading ? (
                            <Skeleton type="text" />
                        ) : (
                            <button
                                className="footer__button footer-taxi"
                                onClick={() => window.open(contactsData['taxi_link'], '_blank')}
                            >
                                {contactsData[`taxi_text_${language}`]}
                            </button>
                        )}
                    </div>

                    {loading ? (
                        <Skeleton type="text" />
                    ) : (
                        <a
                            className="footer__button footer__button--filled footer-reserve"
                            href={`tel:${contactsData['phone']}`}
                        >
                            {contactsData[`book_button_${language}`]}
                        </a>
                    )}

                    <div className="footer__info">
                        <div
                            className="footer__more-info-modal-modal"
                            onClick={onMoreInfoClick}
                        >
                            {loading ? <Skeleton type="text" /> : contactsData[`more_info_link_${language}`]}
                        </div>
                        <div style={{marginTop: '30px'}}>
                            © AUF {contactsData[`year`]}
                        </div>
                        <div style={{marginTop: '10px'}}>
                            {loading ? <Skeleton type="text" /> : contactsData[`privacy_policy_${language}`]}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Footer.propTypes = {
    onMoreInfoClick: PropTypes.func.isRequired,
    contactsData: PropTypes.object.isRequired,
};

