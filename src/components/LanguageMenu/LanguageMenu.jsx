import Check from "../../../public/assets/icons/check.svg"
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

import './LanguageMenu.css'
import { useLanguage } from "../../context/LanguageProvider.jsx";

export const LanguageMenu = ({ onLanguageChange, showLanguageMenu, onLanguageMenuChange }) => {
    const languageMenuRef = useRef(null);

    const { language, changeLanguage } = useLanguage();

    const [languageMenuItems, setLanguageMenuItems] = useState([
        {
            id: 1,
            text: 'Pусский',
            code: 'ru',
            active: false,
        },
        {
            id: 2,
            text: 'English (US)',
            code: 'en',
            active: false,
        },
        {
            id: 3,
            text: 'Arabic',
            code: 'ar',
            active: false,
        },
        {
            id: 4,
            text: 'Chinese',
            code: 'zh',
            active: false,
        },
    ])

    useEffect(() => {
        setLanguageMenuItems((prevItems) =>
            prevItems.map((item) => ({
                ...item,
                active: item.code === language,
            }))
        );
    }, [language]);

    const toggleLanguage = (lang) => {
        onLanguageChange(lang.code);

        changeLanguage(lang.code);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            const isHeaderClick = event.target.closest('.header');
            if (!isHeaderClick && languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
                onLanguageMenuChange(false);
            }
        }

        if (showLanguageMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showLanguageMenu, onLanguageMenuChange]);

    return (
        <>
            <div style={{position: 'relative'}}>
                {showLanguageMenu &&
                    <div className="language-menu" ref={languageMenuRef}>
                        {languageMenuItems.map((item) => (
                            <div
                                key={item.id}
                                className="language-menu-list__item"
                                onClick={() => toggleLanguage(item)}
                            >
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
    onLanguageChange: PropTypes.func.isRequired,
    showLanguageMenu: PropTypes.bool.isRequired,
    onLanguageMenuChange: PropTypes.func.isRequired,
};
