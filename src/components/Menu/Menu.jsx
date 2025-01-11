import ArrowRight from "../../assets/icons/arrow-right.svg"
import PhoneCall from "../../assets/icons/phone-call.svg";
import Phone from "../../assets/icons/phone.svg";
import Map from "../../assets/icons/map.svg";
import {useLocation, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

import './Menu.css'
import {BOOK_NUMBER, MENU_ITEMS} from "../../utils/constants.js";

export const Menu = ({ showMenu, onMenuChange }) => {
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

    return (
        <>
            <div style={{ position: 'relative' }}>
                {showMenu &&
                    <div className="menu">
                        <div className="menu-list">
                            {MENU_ITEMS.map((item, index) => (
                                <div className="menu-list__item" key={index} onClick={() => goToLinkHref(item)}>
                                    <div>{item.text}</div>
                                    <div style={{marginLeft: "auto", marginRight: "10px"}}>
                                        <img className="menu-list__item-icon" src={ArrowRight} alt="Arrow right"/>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="menu-reserve-button">
                            <img className="reserve-button__phone-call" src={PhoneCall} alt="Phone call"/>
                                <a href={`tel:${BOOK_NUMBER}`}>Забронировать</a>
                            <img className="reserve-button__arrow-right" src={ArrowRight} alt="Arrow right"/>
                        </button>

                        <div className="menu__contacts">
                            <div className="menu__phone">
                                <img className="menu__phone-img" src={Phone} alt="Phone"/>
                                <div className="menu__phone-text">+7 (495) 245-99-99</div>
                            </div>

                            <div style={{display: "flex"}}>
                                <div style={{ marginTop: '20px' }}>
                                    <div className="menu__map">
                                        <img className="menu__map-img" src={Map} alt="Map"/>
                                        <div className="menu__address">ул. Красная <br/> <div style={{ marginTop: '5px' }}>Пресня, 24</div></div>
                                    </div>

                                    <div className="menu__parking">Клубный паркинг</div>
                                </div>

                                <div style={{marginLeft: "auto", marginTop: '20px'}}>
                                    <div className="menu__days">Ежедневно</div>
                                    <div className="menu__hours" style={{ marginTop: '5px' }}>с 21:00 до 06:00</div>
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
};
