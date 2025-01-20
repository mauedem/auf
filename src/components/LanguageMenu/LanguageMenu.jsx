import Check from "../../../public/assets/icons/check.svg"
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";

import './LanguageMenu.css'

export const LanguageMenu = ({ language, onLanguageChange, showLanguageMenu, onLanguageMenuChange }) => {
    const languageMenuRef = useRef(null);

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
        if (language) {
            setLanguageMenuItems((prevItems) =>
                prevItems.map((item) => ({
                    ...item,
                    active: item.code === language,
                }))
            );
        }
    }, [language, showLanguageMenu])

    // const navigate = useNavigate();

    // import { useNavigate } from "react-router-dom";

    const changeLanguage = (lang) => {
        // Обновляем язык в localStorage и вызываем обработчик изменения языка
        localStorage.setItem("language", lang.code);
        onLanguageChange(lang.code);

        // const currentPath = window.location.pathname.replace(/^\/[a-z]{2}/, "");
        // const newPath = lang.code === "ru" ? currentPath : `/${lang.code}${currentPath}`;
        // navigate(newPath, {replace: true});
    };

    // const changeLanguage = (lang) => {
    //     localStorage.setItem('language', lang.code);
    //     onLanguageChange(lang.code)
    //
    //     setLanguageMenuItems((prevItems) =>
    //         prevItems.map((item) => ({
    //             ...item,
    //             active: item.code === lang.code,
    //         }))
    //     );
    // };

    /* TODO решить проблему с click outside */
    const handleClickOutside = (event) => {
        // if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
        //     onLanguageMenuChange(false);
        // }
    };

    useEffect(() => {
        // if (showLanguageMenu) {
        //     document.addEventListener("mousedown", handleClickOutside);
        // } else {
        //     document.removeEventListener("mousedown", handleClickOutside);
        // }
        //
        // return () => {
        //     document.removeEventListener("mousedown", handleClickOutside);
        // };
    }, [showLanguageMenu]);

    return (
        <>
            <div style={{position: 'relative'}} onClick={handleClickOutside}>
                {showLanguageMenu &&
                    <div className="language-menu" ref={languageMenuRef}>
                        {languageMenuItems.map((item) => (
                            <div
                                key={item.id}
                                className="language-menu-list__item"
                                onClick={() => changeLanguage(item)}
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
    language: PropTypes.string.isRequired,
    onLanguageChange: PropTypes.func.isRequired,
    showLanguageMenu: PropTypes.bool.isRequired,
    onLanguageMenuChange: PropTypes.func.isRequired,
};
