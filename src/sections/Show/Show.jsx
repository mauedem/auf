import Show1 from "../../assets/images/show-1.png";

import Interior1 from "../../assets/images/interier-1-big.png";
import Interior2 from "../../assets/images/interier-2-big.png";
import Interior3 from "../../assets/images/interier-3-big.png";
import Interior4 from "../../assets/images/interier-4-big.png";

import { useRef } from "react";

import './Show.css'

export const Show = () => {
    const vipRef = useRef(null);
    const musicRef = useRef(null);
    const interiorRef = useRef(null);

    return (
        <>
            <div className="container">
                <div className="show" id="music" ref={musicRef}>
                    <div className="show__container">
                        <h2 className="show__title">
                            Show <span style={{color: 'var(--secondary-color)'}}>& Music</span>
                        </h2>

                        <div className="show__text">
                            Музыкальная концепция стрипклуба AUF построена в стиле ORGANIC, MELODIC и AFRO HOUSE создает
                            настроение пира души и тела.
                            А наши актрисы создают неповторимые иммерсивные эротические постановки под руководством из
                            лучших хореографов Москвы.
                        </div>

                        <div className="show__images">
                            <img src={Show1} alt=""/>
                        </div>
                    </div>
                </div>

                <div className="interior" id="interior" ref={interiorRef}>
                    <div>
                        <h2 className="interior__title">Интерьер клуба</h2>

                        <div className="interior__tags">
                            <div className="interior__tag interior__tag--active">Основной зал</div>
                            <div className="interior__tag interior__tag--inactive">Посадочные места</div>
                            <div className="interior__tag interior__tag--inactive">Бар</div>
                            <div className="interior__tag interior__tag--inactive">вход с улицы</div>
                            <div className="interior__tag interior__tag--inactive">VIP-ложи</div>
                        </div>
                    </div>

                    <div className="interior__container" id="vip" ref={vipRef}>
                        <h3 className="interior__title interior__title--secondary">
                            VIP-ложи
                        </h3>

                        <div className="interior__text">
                            Для тех, кто ценит приватность и комфорт, AUF предлагает эксклюзивные VIP-комнаты.
                            <span style={{color: 'var(--primary-color)'}}> Закрытая обстановка, персональный сервис и абсолютная конфиденциальность </span>
                            обеспечат вам незабываемый вечер
                        </div>
                    </div>
                </div>

                <div>
                    <div className="interior__block">
                        <img className="interior__img-1" src={Interior1} alt="Interior"/>

                        <div className="interior__subtext">
                            Максимум комфорта и анонимности – приватные ложи, где только Вы и Ваши удовольствия.
                        </div>
                    </div>

                    <div className="interior__block" style={{ marginTop: '30px' }}>
                        <div className="interior__subtext interior__subtext--2">
                            Максимум комфорта и анонимности – приватные ложи, где только Вы и Ваши удовольствия.
                        </div>

                        <img className="interior__img-2" src={Interior2} alt="Interior"/>
                    </div>

                    <div className="interior__block" style={{ marginTop: '30px' }}>
                        <img className="interior__img-3" src={Interior3} alt="Interior"/>
                    </div>

                    <img className="interior__img-4" src={Interior4} alt="Interior"/>
                </div>
            </div>
        </>
    )
}
