import ArrowRight from "../../../public/assets/icons/arrow-right.svg";
import { useEffect, useState } from "react";

import './Gift.css'

import ApiService from "../../api/api.js";
import PropTypes from "prop-types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const Gift = ({ language }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [giftData, setGiftData] = useState({});
    const [giftCardsData, setGiftCardsData] = useState([]);
    // const [error, setError] = useState({});

    const giftCards = giftCardsData?.map((card, index) => (
        <div style={{marginTop: '70px'}} key={index}>
            <div className="gift-card__title">
                {card[`title_${language}`]}
                <div style={{color: 'var(--primary-color)'}}>
                    {card[`money_${language}`]}
                </div>
            </div>

            <img className="gift-card__img" src={`${API_BASE_URL}${card['card_photo']}`} alt="gift card"/>

            <div style={{display: 'flex', justifyContent: 'center', marginTop: '12px'}}>
                <button
                    className="gift-card__button"
                    onClick={() => window.open(card['to_buy_link'], '_blank')}
                >
                    {card[`button_text_${language}`]}
                    <img style={{marginLeft: '10px'}} src={ArrowRight} alt="arrow-right"/>
                </button>
            </div>
        </div>
    ));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const giftData = await ApiService.fetchGift();
                setGiftData(giftData[0]);
                const giftCardsData = await ApiService.fetchGiftCards();
                setGiftCardsData(giftCardsData);
            } catch (err) {
                // setError('Ошибка при загрузке данных');
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="gift">
                <div className="gift__container">
                    <div className="gift__title">
                        {giftData[`title_${language}`]?.split('{{highlited}}')[0]}
                        <div style={{color: 'var(--secondary-color)'}}>{giftData[`highlight_title_${language}`]}</div>
                    </div>

                    <div className="gift__subtitle" style={{marginTop: '20px'}}>
                        {giftData[`subtitle_${language}`]}
                    </div>

                    <div className="gift__text" style={{marginTop: '20px'}}>
                        {giftData[`text_1_${language}`]}
                    </div>

                    <div className="gift__text" style={{marginTop: '20px'}}>
                        {giftData[`text_2_${language}`]}
                    </div>

                    <div className="gift__text" style={{marginTop: '20px'}}>
                        {giftData[`text_3_${language}`]}
                    </div>

                    {giftCards}
                </div>
            </div>
        </>
    )
}

Gift.propTypes = {
    language: PropTypes.string.isRequired,
};
