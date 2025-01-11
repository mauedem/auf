// import Info1 from "../../assets/images/info-1.png"
import Info1Big from "../../assets/images/info-1-big.png"
// import Info2 from "../../assets/images/info-2.png"
import Info2Big from "../../assets/images/info-2-big.png"
import Info3Big from "../../assets/images/info-3-big.png"
import Star from "../../assets/icons/star.svg"
import Yandex from "../../assets/icons/yandex.svg"
import Google from "../../assets/icons/google.svg"

import './Info.css'

export const Info = () => {
    return (
        <>
            <div className="info">
                <div className="info__container">
                    <h2 className="info__title">
                        <span style={{color: 'var(--secondary-color)'}}>Уникальный стрип</span> клуб в Москве
                    </h2>
                    <div className="info__subtitle">
                        <span style={{color: 'var(--primary-color)'}}>
                            Эротический клубный проект
                        </span>
                    </div>

                    {/*<img src={Info1} alt=""/>*/}

                    <div className="info__block">
                        <img className="info__img" src={Info1Big} alt="" />

                        <div className="info-service">
                            <h4 className="info__header">Премиальный уровень сервиса</h4>

                            <div className="info__text" style={{ marginTop: '14px' }}>
                                Исключительный сервис, который соответствует самым высоким стандартам.
                            </div>
                        </div>
                    </div>

                    <h3 className="info__title" style={{ marginTop: '90px' }}>
                        <span style={{color: 'var(--primary-color)'}}>Рай для</span> гедонистов
                    </h3>

                    <div className="info__block">
                        <div className="info-manager info-manager--big">
                            <h4 className="info__header info-manager__title">Ваш личный комфорт-менеджер</h4>

                            <div className="info__text info-manager__text" style={{ marginTop: '10px' }}>
                                Это ваш проводник в мир изысканного досуга, который позаботится обо всем:
                                от подбора коктейля до организации шоу в индивидуальной зоне.
                            </div>
                        </div>

                        {/*<img src={Info2} alt=""/>*/}
                        <img className="info__img" src={Info2Big} alt=""/>

                        <div className="info-manager info-manager--small">
                            <h4 className="info__header info-manager__title">Ваш личный комфорт-менеджер</h4>

                            <div className="info__text info-manager__text" style={{ marginTop: '10px' }}>
                                Это ваш проводник в мир изысканного досуга, который позаботится обо всем:
                                от подбора коктейля до организации шоу в индивидуальной зоне.
                            </div>
                        </div>
                    </div>

                    <div className="info__block" style={{marginTop: '90px'}}>
                        {/*<img src={Info1} alt=""/>*/}
                        <img className="info__img" src={Info3Big} alt=""/>

                        <div className="info-privacy">
                            <h4 className="info__header" style={{width: '360px'}}>
                                100% конфиденциальность и приватность
                            </h4>

                            <div className="info__text" style={{ marginTop: '10px' }}>
                                Приватные зоны, закрытые VIP-ложи и строгая политика конфиденциальности гарантируют,
                                что ваше посещение останется только вашим секретом.
                            </div>
                        </div>
                    </div>

                    <div className="info__rating">
                        <h3 className="info__rating-text">Рейтинг клуба:</h3>
                        <img className="info__rating-star" src={Star} alt="star"/>
                        <img className="info__rating-star" src={Star} alt="star"/>
                        <img className="info__rating-star" src={Star} alt="star"/>
                        <img className="info__rating-star" src={Star} alt="star"/>
                        <img className="info__rating-star" src={Star} alt="star"/>
                    </div>

                    <div className="info__review">
                        Положительных отзывов: 327
                    </div>

                    <div className="info-rating-cards">
                        <div className="info-rating-card">
                            <div style={{display: 'flex'}}>
                                <div className="info-rating-card__img"><img src={Yandex} alt="star"/></div>
                                <div>
                                    <div className="info-rating-card__rating">5,0</div>
                                    <div className="info-rating-card__text">Яндекс</div>
                                </div>
                            </div>

                            <button className="info-rating-card__btn">
                                <div className="info-rating-card__btn-text">Оставить отзыв</div>
                            </button>
                        </div>

                        <div className="info-rating-card" style={{ marginLeft: '14px' }}>
                            <div style={{display: 'flex'}}>
                                <div className="info-rating-card__img"><img src={Google} alt="star"/></div>
                                <div>
                                    <div className="info-rating-card__rating">5,0</div>
                                    <div className="info-rating-card__text">Google</div>
                                </div>
                            </div>

                            <button className="info-rating-card__btn">
                                <div className="info-rating-card__btn-text">Оставить отзыв</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
