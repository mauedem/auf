import Language from "../../../public/assets/icons/language.svg"
import LanguageHover from "../../../public/assets/icons/language-hover.svg"
import OpenMenu from "../../../public/assets/icons/open-menu.svg"
import OpenMenuHover from "../../../public/assets/icons/open-menu-hover.svg"
import CloseMenu from "../../../public/assets/icons/close-menu.svg"
import CloseMenuHover from "../../../public/assets/icons/close-menu-hover.svg"
import AufLogoShadowed from "../../../public/assets/icons/auf-logo-shadowed.svg"
import PhoneCallShadowed from "../../../public/assets/icons/phone-call-shadowed.svg";
import Map from "../../../public/assets/icons/map.svg";

import './Header.css'

import PropTypes from 'prop-types';
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ADDRESS, BOOK_NUMBER, NAV_ITEMS } from "../../utils/constants.js";

export const Header = ({ onMenuChange, onLanguageMenuChange, showMenu, showLanguageMenu }) => {
    const [isMenuHover, setIsMenuHover] = useState(false);
    const handleMouseEnterMenu = () => setIsMenuHover(true);
    const handleMouseLeaveMenu = () => setIsMenuHover(false);
    const getMenuIcon = () => {
        if (showMenu) {
            return isMenuHover ? CloseMenuHover : CloseMenu;
        } else {
            return isMenuHover ? OpenMenuHover : OpenMenu;
        }
    };

    const [isLanguageMenuHover, setIsLanguageMenuHover] = useState(false);
    const handleMouseEnterLanguageMenu = () => setIsLanguageMenuHover(true);
    const handleMouseLeaveLanguageMenu = () => setIsLanguageMenuHover(false);
    const getLanuguageMenuIcon = () => {
        return isLanguageMenuHover ? LanguageHover : Language;
    };

    const navigate = useNavigate()
    const location = useLocation();

    function goToLinkHref(menuItem) {
        if (location.pathname !== menuItem.link) {
            navigate(menuItem.link);

            setTimeout(() => {
                if (menuItem.href) {
                    document.getElementById(menuItem.href).scrollIntoView({ behavior: 'smooth' });
                }
            }, 200);
        } else {
            if (menuItem.href) {
                document.getElementById(menuItem.href).scrollIntoView({ behavior: 'smooth' });
            }
        }

        onMenuChange(false);
    }

    const navItems = NAV_ITEMS.map(
        item => {
            return (
                <button
                    key={item.id}
                    className="nav-btn"
                    onClick={() => goToLinkHref(item)}
                >
                    <span className="nav-button__link">{item.name}</span>
                </button>
            )
        }
    );

    return (
        <>
            <div className="header">
                <img
                    className="header__logo"
                    src={AufLogoShadowed}
                    alt="Auf logo"
                    onClick={() => {
                        onLanguageMenuChange(false);
                        onMenuChange(false);

                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                        });

                        navigate('/');
                    }}
                />

                <div className="header-wrapper">
                    <nav className="header__nav">{navItems}</nav>
                </div>

                <div className="header--big">
                    <div className="header-map">
                        <img className="header-map__img" src={Map} alt="map"/>
                        <div
                            className="header-map__addess-block"
                            onClick={() => window.open(ADDRESS, '_blank')}
                        >
                            <div className="header-map__addess">ул. Красная</div>
                            <div className="header-map__addess" style={{ marginTop: '6px' }}>Пресня, 24</div>
                        </div>
                    </div>

                    <div className="header-hours">
                        <div className="header-hours__days">Ежедневно</div>
                        <div className="header-hours__hours">с 21:00 до 06:00</div>
                    </div>


                    <a className="header-reserve-btn" href={`tel:${BOOK_NUMBER}`}>Забронировать</a>

                    <div style={{ marginLeft: '16px', marginRight: '16px', }}>
                        <img
                            style={{ cursor: 'pointer' }}
                            src={getLanuguageMenuIcon()}
                            alt="Change language"
                            onClick={() => onLanguageMenuChange(!showLanguageMenu)}
                            onMouseEnter={handleMouseEnterLanguageMenu}
                            onMouseLeave={handleMouseLeaveLanguageMenu}
                        />
                    </div>

                    <img
                        className="header__menu"
                        style={{ marginTop: '4px' }}
                        src={getMenuIcon()}
                        alt="Menu"
                        onClick={() => onMenuChange(!showMenu)}
                        onMouseEnter={handleMouseEnterMenu}
                        onMouseLeave={handleMouseLeaveMenu}
                    />
                </div>

                <div className="header--small">
                    <button
                        className="reserve-btn"
                        onClick={() => {
                            window.location.href = `tel:${BOOK_NUMBER}`;
                        }}
                    >
                        <img className="reserve-btn__phone-call" src={PhoneCallShadowed} alt="Phone call"/>
                        <div className="reserve-btn__text">
                            <a href={`tel:${BOOK_NUMBER}`}>Бронь</a>
                        </div>
                    </button>

                    {/*{showLanguageMenu*/}
                    {/*    ? <img*/}
                    {/*        className="header__language"*/}
                    {/*        src={getLanuguageMobileMenuIcon()}*/}
                    {/*        alt="Change language"*/}
                    {/*        onMouseEnter={handleMouseEnterLanguageMobileMenu}*/}
                    {/*        onMouseLeave={handleMouseLeaveLanguageMobileMenu}*/}
                    {/*    />*/}
                    {/*    : <button className="reserve-btn">*/}
                    {/*        <img className="reserve-btn__phone-call" src={PhoneCallShadowed} alt="Phone call"/>*/}
                    {/*        <div className="reserve-btn__text">*/}
                    {/*            <a href={`tel:${BOOK_NUMBER}`}>Бронь</a>*/}
                    {/*        </div>*/}
                    {/*    </button>*/}
                    {/*}*/}

                    <div style={{marginLeft: '16px', marginRight: '5px', marginTop: '6px'}}>
                        <img
                            style={{cursor: 'pointer'}}
                            src={getLanuguageMenuIcon()}
                            alt="Change language"
                            onClick={() => onLanguageMenuChange(!showLanguageMenu)}
                            onMouseEnter={handleMouseEnterLanguageMenu}
                            onMouseLeave={handleMouseLeaveLanguageMenu}
                        />
                    </div>

                    <img
                        className="header__menu header__menu--small"
                        src={getMenuIcon()}
                        alt="Menu"
                        onClick={() => onMenuChange(!showMenu)}
                        onMouseEnter={handleMouseEnterMenu}
                        onMouseLeave={handleMouseLeaveMenu}
                    />
                </div>
            </div>
        </>
    )
}

Header.propTypes = {
    onMenuChange: PropTypes.func.isRequired,
    onLanguageMenuChange: PropTypes.func.isRequired,
    showMenu: PropTypes.bool.isRequired,
    showLanguageMenu: PropTypes.bool.isRequired,
};
