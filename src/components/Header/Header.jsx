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
import { LANGUAGES } from "../../utils/constants.js";

export const Header = ({
    onMenuChange,
    onLanguageMenuChange,
    showMenu,
    showLanguageMenu,
    navItemsData,
    contactsData,
    language,
    onLanguageChange
}) => {
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

    const toggleLanguage = () => {
        const currentIndex = LANGUAGES.indexOf(language);
        const nextIndex = (currentIndex + 1) % LANGUAGES.length;
        const newLanguage = LANGUAGES[nextIndex];

        localStorage.setItem('language', newLanguage);

        onLanguageChange(newLanguage);

        // const currentPath = window.location.pathname.replace(/^\/[a-z]{2}/, "");
        // const newPath = language === "ru" ? currentPath : `/${language}${currentPath}`;
        // navigate(newPath, { replace: true });
    };

    function goToLinkHref(menuItem) {
        const isLanguageSwitcher = menuItem['text_ru'] === 'Русский'
        if (isLanguageSwitcher) {
            toggleLanguage(menuItem);

            return;
        }

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

    const navItems = navItemsData.map(
        item => {
            return (
                <button
                    key={item.id}
                    className="nav-btn"
                    onClick={() => goToLinkHref(item)}
                >
                    <span className="nav-button__link">
                        {item[`text_${language}`]}
                    </span>
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
                    loading="lazy"
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
                        <img className="header-map__img" src={Map} alt="map" loading="lazy" />
                        <div
                            className="header-map__addess-block"
                            onClick={() => window.open(contactsData['navigator_link'], '_blank')}
                        >
                            <div className="header-map__addess">
                                {contactsData[`short_address_${language}`]}
                            </div>
                        </div>
                    </div>

                    <div className="header-hours">
                        <div className="header-hours__days">
                            {contactsData[`opening_hours_text_${language}`]}
                        </div>
                        <div className="header-hours__hours">
                            {contactsData[`opening_hours_${language}`]}
                        </div>
                    </div>


                    <a className="header-reserve-btn" href={`tel:${contactsData['phone']}`}>
                        {contactsData[`book_button_${language}`]}
                    </a>

                    <div style={{ marginLeft: '16px', marginRight: '16px', }}>
                        <img
                            style={{ cursor: 'pointer' }}
                            src={getLanuguageMenuIcon()}
                            alt="Change language"
                            onClick={() => onLanguageMenuChange(!showLanguageMenu)}
                            onMouseEnter={handleMouseEnterLanguageMenu}
                            onMouseLeave={handleMouseLeaveLanguageMenu}
                            loading="lazy"
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
                        loading="lazy"
                    />
                </div>

                <div className="header--small">
                    <button
                        className="reserve-btn"
                        onClick={() => {
                            window.location.href = `tel:${contactsData['phone']}`;
                        }}
                    >
                        <img className="reserve-btn__phone-call" src={PhoneCallShadowed} alt="Phone call" loading="lazy" />
                        <div className="reserve-btn__text">
                            <a href={`tel:${contactsData['phone']}`}>Бронь</a>
                        </div>
                    </button>

                    <div style={{marginLeft: '16px', marginRight: '5px', marginTop: '6px'}}>
                        <img
                            style={{cursor: 'pointer'}}
                            src={getLanuguageMenuIcon()}
                            alt="Change language"
                            onClick={() => onLanguageMenuChange(!showLanguageMenu)}
                            onMouseEnter={handleMouseEnterLanguageMenu}
                            onMouseLeave={handleMouseLeaveLanguageMenu}
                            loading="lazy"
                        />
                    </div>

                    <img
                        className="header__menu header__menu--small"
                        src={getMenuIcon()}
                        alt="Menu"
                        onClick={() => onMenuChange(!showMenu)}
                        onMouseEnter={handleMouseEnterMenu}
                        onMouseLeave={handleMouseLeaveMenu}
                        loading="lazy"
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
    navItemsData: PropTypes.array.isRequired,
    contactsData: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    onLanguageChange: PropTypes.func.isRequired,
};
