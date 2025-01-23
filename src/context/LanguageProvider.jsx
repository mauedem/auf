import { createContext, useContext, useState } from 'react';
import { LANGUAGES } from "../utils/constants.js";
import PropTypes from "prop-types";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        const pathLanguage = location.pathname.split('/')[1];
        return LANGUAGES.includes(pathLanguage) ? pathLanguage : 'ru';
    });

    const changeLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);

LanguageProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
