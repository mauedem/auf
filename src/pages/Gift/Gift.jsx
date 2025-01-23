import ArrowRight from "../../../public/assets/icons/arrow-right.svg";
import { useContext, useEffect, useMemo } from "react";

import './Gift.css'

import { DataContext } from "../../context/DataContext.jsx";
import { useLanguage } from "../../context/LanguageProvider.jsx";
import {Skeleton} from "../../components/Skeleton/Skeleton.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const Gift = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { data, loading } = useContext(DataContext);

    const { language } = useLanguage();

    const giftData = useMemo(() => data?.giftData?.[0] || {}, [data?.giftData]);
    const giftCardsData = useMemo(() => data?.giftCardsData || [], [data?.giftCardsData]);

    const giftCards = giftCardsData?.map((card, index) => (
        <div className="gift-card" style={{marginTop: '70px'}} key={index}>
            <div className="gift-card__title">
                {card[`title_${language}`]}
                <div style={{color: 'var(--primary-color)'}}>
                    {card[`money_${language}`]}
                </div>
            </div>

            <img className="gift-card__img" src={`${API_BASE_URL}${card['card_photo']}`} alt="gift card" loading="lazy" />

            <div style={{display: 'flex', justifyContent: 'center', marginTop: '12px'}}>
                <button
                    className="gift-card__button"
                    onClick={() => window.open(card['to_buy_link'], '_blank')}
                >
                    {card[`button_text_${language}`]}
                    <img style={{marginLeft: '10px'}} src={ArrowRight} alt="arrow-right" loading="lazy" />
                </button>
            </div>
        </div>
    ));

    return (
        <>
            <div className="gift">
                <div className="gift__container">
                    <div className="gift__title">
                        {loading ? (
                            <Skeleton type="text"/>
                        ) : (
                            <>
                                {giftData[`title_${language}`]?.split('{{highlited}}')[0]}
                                <div style={{color: 'var(--secondary-color)'}}>
                                    {giftData[`highlight_title_${language}`]}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="gift__subtitle" style={{marginTop: '20px'}}>
                        {loading ? <Skeleton type="text"/> : giftData[`subtitle_${language}`]}
                    </div>

                    <div className="gift__text" style={{marginTop: '20px'}}>
                        {loading ? <Skeleton type="text"/> : giftData[`text_1_${language}`]}
                    </div>

                    <div className="gift__text" style={{marginTop: '20px'}}>
                        {loading ? <Skeleton type="text"/> : giftData[`text_2_${language}`]}
                    </div>

                    <div className="gift__text" style={{marginTop: '20px'}}>
                        {loading ? <Skeleton type="text"/> : giftData[`text_3_${language}`]}
                    </div>

                    {loading ? <Skeleton type="image"/> : giftCards}
                </div>
            </div>
        </>
    )
}
