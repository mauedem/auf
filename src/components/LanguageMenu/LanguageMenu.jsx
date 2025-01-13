import Check from "../../../public/assets/icons/check.svg"
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

import './LanguageMenu.css'

export const LanguageMenu = ({ showLanguageMenu, onLanguageMenuChange }) => {
    const languageMenuRef = useRef(null);

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

    const handleClickOutside = (event) => {
        if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
            onLanguageMenuChange(false);
        }
    };

    useEffect(() => {
        if (showLanguageMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showLanguageMenu]);

    return (
        <>
            <div style={{position: 'relative'}} onClick={handleClickOutside}>
                {showLanguageMenu &&
                    <div className="language-menu" ref={languageMenuRef}>
                        {languageMenuItems.map((item, index) => (
                            <div className="language-menu-list__item" key={index}>
                                <div>{item.text}</div>
                                <div style={{marginLeft: "auto", marginRight: "10px"}}>
                                    {item.active &&
                                        <img className="language-menu-list__item-icon" src={Check} alt="Arrow right" />
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </>
    )
}

LanguageMenu.propTypes = {
    showLanguageMenu: PropTypes.bool.isRequired,
    onLanguageMenuChange: PropTypes.func.isRequired,
};
