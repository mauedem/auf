import Kitchen from "../../../public/assets/icons/kitchen.svg";
import Bar from "../../../public/assets/icons/bar.svg";
import ArrowRight from "../../../public/assets/icons/arrow-right.svg";
// import AufLogoShadowed from "../../assets/icons/auf-logo-shadowed.svg";
import AufLogoBigShadowed from "../../../public/assets/icons/auf-logo-big-shadowed.svg";
import PhoneCallShadowed from "../../../public/assets/icons/phone-call-shadowed.svg";
import Map from "../../../public/assets/images/map.png";
import MapBig from "../../../public/assets/images/map-big.png";
import { useRef } from "react";

import './Footer.css'
import {ADDRESS, BOOK_NUMBER, MENU_KITCHEN, TAXI} from "../../utils/constants.js";
import PropTypes from "prop-types";

export const Footer = ({ onMoreInfoClick }) => {
    const gastronomyRef = useRef(null);

    return (
        <>
            <div className="footer" id="gastronomy" ref={gastronomyRef}>
                <div className="footer__container">
                    <h2 className="footer__title">Кухня и бар</h2>

                    <div className="gastronomy-cards">
                        <div
                            className="gastronomy-card"
                            onClick={() => {
                                window.open(MENU_KITCHEN, '_blank');
                            }}
                        >
                            <div><img src={Kitchen} alt="Kitchen"/></div>

                            <div style={{marginLeft: '20px'}}>
                                <div className="gastronomy-card__title">Изысканное меню высокой кухни</div>

                                <button className="watch-btn">
                                    <div className="watch-btn__text">Смотреть</div>

                                    <img src={ArrowRight} alt="arrow right"/>
                                </button>
                            </div>
                        </div>

                        <div className="gastronomy-card">
                            <div><img src={Bar} alt="Bar"/></div>

                            <div style={{marginLeft: '20px'}}>
                                <div className="gastronomy-card__title">Авторский бар и винная карта</div>

                                <button className="watch-btn">
                                    <div className="watch-btn__text">Смотреть</div>

                                    <img src={ArrowRight} alt="arrow right"/>
                                </button>
                            </div>
                        </div>
                    </div>

                    <h2 className="footer__title" style={{ marginTop: '100px' }}>Контакты</h2>

                    <div className="footer__subtitle">Welcome to</div>

                    <img className="footer__logo" src={AufLogoBigShadowed} alt="AUF logo"/>

                    <div className="footer__days">Ежедневно</div>
                    <div className="footer__hours">с 21:00 до 06:00</div>

                    <div className="footer__addess" onClick={() => window.open(ADDRESS, '_blank')}>
                        <div>Стриптиз клуб</div>
                        <div style={{marginTop: '6px'}}>находится по адресу</div>
                        <div style={{color: 'var(--secondary-color)', marginTop: '6px'}}>г. Москва, ул. Красная Пресня,
                            24
                        </div>
                    </div>

                    <div className="footer__text" style={{marginTop: '26px'}}>
                        Клубный паркинг
                    </div>

                    <div
                        className="footer__phone"
                        onClick={() => {
                            window.location.href = `tel:${BOOK_NUMBER}`;
                        }}
                    >
                        <img className="footer__phone-img" src={PhoneCallShadowed} alt="phone"/>
                        <div className="footer__phone-text">+7 (495) 245-99-99</div>
                    </div>

                    <img className="footer__map footer__map--big" src={MapBig} alt="map"/>
                    <img className="footer__map footer__map--small" src={Map} alt="map"/>

                    <div className="footer__goto">
                        <button
                            className="footer__button footer-yandex"
                            onClick={() => window.open(ADDRESS, '_blank')}
                        >
                            Яндекс Навигатор
                        </button>

                        <button
                            className="footer__button footer-taxi"
                            onClick={() => window.open(TAXI, '_blank')}
                        >
                            Такси
                        </button>
                    </div>

                    <a
                        className="footer__button footer__button--filled footer-reserve"
                        href={`tel:${BOOK_NUMBER}`}
                    >
                        Забронировать
                    </a>

                    <div className="footer__info">
                        <div
                            className="footer__more-info-modal-modal"
                            onClick={onMoreInfoClick}
                        >
                            Подробнее о сайте
                        </div>
                        <div style={{marginTop: '30px'}}>© AUF 2025</div>
                        <div style={{marginTop: '10px'}}>Политика в отношении обработки персональных данных</div>
                    </div>
                </div>
            </div>
        </>
    )
}

Footer.propTypes = {
    onMoreInfoClick: PropTypes.func.isRequired,
};

