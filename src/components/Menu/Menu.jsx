import ArrowRight from "../../../public/assets/icons/arrow-right.svg"
import PhoneCall from "../../../public/assets/icons/phone-call.svg";
import Phone from "../../../public/assets/icons/phone.svg";
import Map from "../../../public/assets/icons/map.svg";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import './Menu.css'

import { useEffect, useState } from "react";
import ApiService from "../../api/api.js";

export const Menu = ({ showMenu, onMenuChange, language, contactsData }) => {
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

    const [menuItems, setMenuItems] = useState([]);
    // const [error, setError] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const menuItems = await ApiService.fetchMenu();
                setMenuItems(menuItems);
            } catch (err) {
                /* TODO подумать как хэндлить ошибки сервера */
                // setError('Ошибка при загрузке данных');
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div style={{ position: 'relative' }}>
                {showMenu &&
                    <div className="menu">
                        <div className="menu-list">
                            {menuItems.map((item, index) => (
                                <div className="menu-list__item" key={index} onClick={() => goToLinkHref(item)}>
                                        <div>{item[`text_${language}`]}</div>
                                    <div style={{marginLeft: "auto", marginRight: "10px"}}>
                                        <img className="menu-list__item-icon" src={ArrowRight} alt="Arrow right"/>
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
                            <img className="reserve-button__phone-call" src={PhoneCall} alt="Phone call"/>
                                <a href={`tel:${contactsData['phone']}`}>
                                    {contactsData[`book_button_${language}`]}
                                </a>
                            <img className="reserve-button__arrow-right" src={ArrowRight} alt="Arrow right"/>
                        </button>

                        <div className="menu__contacts">
                            <div
                                className="menu__phone"
                                onClick={() => {
                                    window.location.href = `tel:${contactsData['phone']}`;
                                }}>
                                <img className="menu__phone-img" src={Phone} alt="Phone"/>
                                <div className="menu__phone-text" >
                                    {contactsData[`phone_formatted`]}
                                </div>
                            </div>

                            <div style={{display: "flex"}}>
                                <div style={{ marginTop: '20px' }}>
                                    <div className="menu__map" onClick={() => window.open(contactsData['navigator_link'], '_blank')}>
                                        <img className="menu__map-img" src={Map} alt="Map"/>
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
    language: PropTypes.string.isRequired,
    contactsData: PropTypes.object.isRequired,
};
