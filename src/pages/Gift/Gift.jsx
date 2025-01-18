import GiftCard1 from "../../../public/assets/images/gift-cards/gift-card-1.webp";
import GiftCard2 from "../../../public/assets/images/gift-cards/gift-card-2.webp";
import ArrowRight from "../../../public/assets/icons/arrow-right.svg";
import { useEffect } from "react";

import './Gift.css'
import { TO_BUY } from "../../utils/constants.js";

export const Gift = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="gift">
                <div className="gift__container">
                    <div className="gift__title">
                        подарочные карты <div style={{color: 'var(--secondary-color)'}}>auf club</div>
                    </div>

                    <div className="gift__subtitle" style={{marginTop: '20px'}}>
                        Станьте дилером удовольствий для своих друзей.
                    </div>

                    <div className="gift__text" style={{marginTop: '20px'}}>
                        Подарите карту депозитом 50000 или 100000 рублей для посещения клуба.
                    </div>

                    <div className="gift__text" style={{marginTop: '20px'}}>
                        Картой AUF можно оплатить вход и все, что захочется попробовать ее обладателю:
                        начиная с бара, заканчивая персональным шоу в приватной ложе.
                    </div>

                    <div className="gift__text" style={{marginTop: '20px'}}>
                        Подарок, достойный своего дарителя!
                    </div>

                    <div style={{marginTop: '70px'}}>
                        <div className="gift-card__title">
                            подарочная карта
                            <div style={{color: 'var(--primary-color)'}}>50 000 рублей</div>
                        </div>

                        <img className="gift-card__img" src={GiftCard1} alt="gift card"/>

                        <div style={{display: 'flex', justifyContent: 'center', marginTop: '12px'}}>
                            <button
                                className="gift-card__button"
                                onClick={() => window.open(TO_BUY, '_blank')}
                            >
                                Купить
                                <img style={{marginLeft: '10px'}} src={ArrowRight} alt="arrow-right"/>
                            </button>
                        </div>
                    </div>

                    <div style={{marginTop: '50px'}}>
                        <div className="gift-card__title">
                            подарочная карта
                            <div style={{color: 'var(--primary-color)'}}>100 000 рублей</div>
                        </div>

                        <img className="gift-card__img" src={GiftCard2} alt="gift card"/>

                        <div style={{display: 'flex', justifyContent: 'center', marginTop: '12px'}}>
                            <button
                                className="gift-card__button"
                                onClick={() => window.open(TO_BUY, '_blank')}
                            >
                                Купить
                                <img style={{marginLeft: '10px'}} src={ArrowRight} alt="arrow-right"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
