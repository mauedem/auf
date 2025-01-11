import Check from "../../assets/icons/check.svg"
import PropTypes from "prop-types";

import './LanguageMenu.css'

export const LanguageMenu = ({ showLanguageMenu }) => {
    const languageMenuItems = [
        {
            text: 'English (US)',
            active: true,
        },
        {
            text: 'Español',
            active: false,
        },
        {
            text: 'Dutsch',
            active: false,
        },
        {
            text: 'Pусский',
            active: false,
        },
    ]

    return (
        <>
            <div style={{position: 'relative'}}>
                {showLanguageMenu &&
                    <div className="language-menu">
                        <div className="language-menu-list">
                            {languageMenuItems.map((item, index) => (
                                <div className="menu-list__item" key={index}>
                                    <div>{item.text}</div>
                                    <div style={{marginLeft: "auto", marginRight: "10px"}}>
                                        {item.active &&
                                            <img className="menu-list__item-icon" src={Check} alt="Arrow right" />
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

LanguageMenu.propTypes = {
    showLanguageMenu: PropTypes.bool.isRequired,
};
