import ArrowRight from "../../../public/assets/icons/arrow-right.svg"
import AufLogoShadowed from "../../../public/assets/icons/auf-logo-shadowed.svg"
import { useContext, useEffect, useMemo } from "react";

import './Jobs.css'

import PropTypes from "prop-types";
import { DataContext } from "../../context/DataContext.jsx";
import { useLanguage } from "../../context/LanguageProvider.jsx";

export const Jobs = ({ jobsData, onOpenModal }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { data } = useContext(DataContext);

    const { language } = useLanguage();

    const vacanciesData = useMemo(() => data?.vacancies || [], [data?.vacancies]);

    const TextList = (data) => {
        const lines = data?.split("\r\n");

        return (
            <ul style={{ padding: '0', margin: '0' }}>
                {lines.map((line, index) => (
                    <div key={index} className="jobs-card__text">{line}</div>
                ))}
            </ul>
        );
    };

    const vacancies = vacanciesData?.map((vacancy, index) => (
        <div className="jobs-card" key={index}>
            <div className="jobs-card__title">{vacancy[`title_${language}`]}</div>

            {vacancy[`subtitle_${language}`] &&
                <div className="jobs-card__subtitle">
                    {vacancy[`subtitle_${language}`]}
                </div>
            }

            {TextList(vacancy[`description_${language}`])}

            <button className="jobs-card__btn jobs-card__btn--filled" onClick={onOpenModal}>
                {vacancy[`contacts_button_text_${language}`]}
                <img src={ArrowRight} style={{marginLeft: '10px'}} alt="" loading="lazy" />
            </button>
        </div>
    ));

    return (
        <>
            <div className="jobs">
                <div className="jobs__container">
                    <div className="jobs__title">
                        <div style={{color: 'var(--secondary-color)'}}>{jobsData[`title_${language}`]}</div>
                        {jobsData[`highlight_title_${language}`]}
                    </div>

                    <div className="jobs__text">
                        {jobsData[`text_1_${language}`]
                            ?.split("{{email}}")[0]
                            ?.split("{{phone}}")[0]}
                        <a className="jobs__mail" href={`mailto:${jobsData.email}`}>
                            {jobsData.email}
                        </a>
                        {jobsData[`text_1_${language}`]
                            ?.split("{{email}}")[1]
                            ?.split("{{phone}}")[0]}
                        <a className="jobs__phone" href={`tel:${jobsData.phone?.replace(/\s+/g, '')}`}>
                            {jobsData.phone}
                        </a>
                        {jobsData[`text_1_${language}`]?.split("{{phone}}")[1]}
                    </div>

                    <div className="jobs__subtitle">
                        {jobsData[`text_2_${language}`]}
                    </div>

                    {vacancies}

                    <img src={AufLogoShadowed} alt="auf logo" loading="lazy" />
                </div>
            </div>
        </>
    )
}

Jobs.propTypes = {
    onOpenModal: PropTypes.func.isRequired,
    jobsData: PropTypes.object.isRequired,
};
