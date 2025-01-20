import ArrowRight from "../../../public/assets/icons/arrow-right.svg"
import AufLogoShadowed from "../../../public/assets/icons/auf-logo-shadowed.svg"
import { useEffect, useState } from "react";

import './Jobs.css'

import PropTypes from "prop-types";
import ApiService from "../../api/api.js";

export const Jobs = ({ language, jobsData, onOpenModal }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [vacanciesData, setVacanciesData] = useState([]);
    // const [error, setError] = useState({});

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
                <img src={ArrowRight} style={{marginLeft: '10px'}} alt=""/>
            </button>
        </div>
    ));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const vacanciesData = await ApiService.fetchVacancies();
                setVacanciesData(vacanciesData);
            } catch (err) {
                // setError('Ошибка при загрузке данных');
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="jobs">
                <div className="jobs__container">
                    <div className="jobs__title">
                        <div style={{color: 'var(--secondary-color)'}}>{jobsData[`title_${language}`]}</div>
                        {jobsData[`highlight_title_${language}`]}
                    </div>

                    <div className="jobs__text">
                        {jobsData[`text_1_${language}`]?.split('{{email}}')[0]}
                        <a className="jobs__mail" href="mailto:aufclub@bk.ru"> {jobsData[`email`]} </a>
                        {jobsData[`text_1_${language}`]?.split('{{email}}')[1]}
                        <a className="jobs__phone" href="tel:+79031387198"> {jobsData[`phone`]}</a>
                    </div>

                    <div className="jobs__subtitle">
                        {jobsData[`text_2_${language}`]}
                    </div>

                    {vacancies}

                    <img src={AufLogoShadowed} alt="auf logo"/>
                </div>
            </div>
        </>
    )
}

Jobs.propTypes = {
    onOpenModal: PropTypes.func.isRequired,
    jobsData: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
};
