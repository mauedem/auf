import ArrowRight from "../../../public/assets/icons/arrow-right.svg"
import PhoneCall from "../../../public/assets/icons/phone-call.svg";
import Phone from "../../../public/assets/icons/phone.svg";
import Map from "../../../public/assets/icons/map.svg";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import './Menu.css'

import { useContext, useEffect, useMemo, useRef } from "react";
import { DataContext } from "../../context/DataContext.jsx";
import { useLanguage } from "../../context/LanguageProvider.jsx";

export const Menu = ({ showMenu, onMenuChange, contactsData }) => {
    const navigate = useNavigate()
    const location = useLocation();
    const { language } = useLanguage();

    const { data } = useContext(DataContext);

    const menuItems = useMemo(() => {
        const items = data?.menuItems || [];
        return [...items].sort((a, b) => a.order - b.order);
    }, [data?.menuItems]);

    function goToLinkHref(menuItem) {
        if (location.pathname !== menuItem.link) {
            navigate(menuItem.link);
        }

        if (menuItem.href) {
            setTimeout(() => {
                const targetElement = document.getElementById(menuItem.href);
                if (targetElement) {
                    targetElement.scrollIntoView({behavior: 'smooth'});
                }
            }, 0);
        }

        onMenuChange(false);
    }

    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            const isHeaderClick = event.target.closest('.header');
            if (!isHeaderClick && menuRef.current && !menuRef.current.contains(event.target)) {
                onMenuChange(false);
            }
        }

        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMenu, onMenuChange]);

    return (
        <>
            <div style={{ position: 'relative' }}>
                {showMenu &&
                    <div className="menu" ref={menuRef}>
                        <div className="menu-list">
                            {menuItems.map((item, index) => (
                                <div className="menu-list__item" key={index} onClick={() => goToLinkHref(item)}>
                                        <div>{item[`text_${language}`]}</div>
                                    <div style={{marginLeft: "auto", marginRight: "10px"}}>
                                        <img className="menu-list__item-icon" src={ArrowRight} alt="Arrow right" loading="lazy" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            className="menu-reserve-button"
                            onClick={() => {
                                window.location.href = `tel:${contactsData['phone']}`;
                            }}
                        >
                            <img className="reserve-button__phone-call" src={PhoneCall} alt="Phone call" loading="lazy" />
                                <a href={`tel:${contactsData['phone']}`}>
                                    {contactsData[`book_button_${language}`]}
                                </a>
                            <img className="reserve-button__arrow-right" src={ArrowRight} alt="Arrow right" loading="lazy" />
                        </button>

                        <div className="menu__contacts">
                            <div
                                className="menu__phone"
                                onClick={() => {
                                    window.location.href = `tel:${contactsData['phone']}`;
                                }}>
                                <img className="menu__phone-img" src={Phone} alt="Phone" loading="lazy" />
                                <div className="menu__phone-text" >
                                    {contactsData[`phone_formatted`]}
                                </div>
                            </div>

                            <div style={{display: "flex"}}>
                                <div style={{ marginTop: '20px' }}>
                                    <div className="menu__map" onClick={() => window.open(contactsData['navigator_link'], '_blank')}>
                                        <img className="menu__map-img" src={Map} alt="Map" loading="lazy" />
                                        <div className="menu__address">
                                            {contactsData[`short_address_${language}`]}
                                        </div>
                                    </div>

                                    <div className="menu__parking">
                                        {contactsData[`parking_${language}`]}
                                    </div>
                                </div>

                                <div style={{marginLeft: "auto", marginTop: '20px'}}>
                                    <div className="menu__days">
                                        {contactsData[`opening_hours_text_${language}`]}
                                    </div>
                                    <div className="menu__hours" style={{ marginTop: '5px' }}>
                                        {contactsData[`opening_hours_${language}`]}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

Menu.propTypes = {
    showMenu: PropTypes.bool.isRequired,
    onMenuChange: PropTypes.func.isRequired,
    contactsData: PropTypes.object.isRequired,
};
