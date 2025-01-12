import ArrowRight from "../../../public/assets/icons/arrow-right.svg"
import AufLogoShadowed from "../../../public/assets/icons/auf-logo-shadowed.svg"
import { useEffect } from "react";

import './Jobs.css'
import PropTypes from "prop-types";

export const Jobs = ({ onOpenModal }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="jobs">
                <div className="jobs__container">
                    <div className="jobs__title">
                        <div style={{color: 'var(--secondary-color)'}}>вакансии</div>
                        Хочешь присоединиться к команде AUF?
                    </div>

                    <div className="jobs__text">
                        Если ты активная, коммуникабельная и жизнерадостная девушка, которая хочет работать,
                        зарабатывать
                        и развиваться вместе с нами, отправляй своё резюме на почту
                        <a className="jobs__mail" href="mailto:aufclub@bk.ru"> aufclub@bk.ru </a>
                        и укажи интересующую вакансию, или записывайся на собеседование по телефону
                        <a className="jobs__phone" href="tel:+79031387198"> +7 (903) 138-71-98</a>
                    </div>

                    <div className="jobs__subtitle">
                        На данный момент открыты вакансии
                    </div>

                    <div className="jobs-card">
                        <div className="jobs-card__title">Официант</div>

                        <div className="jobs-card__text">Бесплатное обучение в процессе работы</div>

                        <div className="jobs-card__text">Гибкий график работы</div>

                        <div className="jobs-card__text">З/п от 150 000₽ (ставка 3000 + чай)</div>

                        <div className="jobs-card__text">
                            Собеседование проходит со среды по воскресенье,
                            с 19:00 до 21:00, по адресу Красная Пресня, 24
                        </div>

                        <button className="jobs-card__btn jobs-card__btn--outlined" onClick={onOpenModal}>
                            Связаться с нами
                            <img src={ArrowRight} style={{marginLeft: '10px'}} alt=""/>
                        </button>
                    </div>

                    <div className="jobs-card">
                        <div className="jobs-card__title">Хостес</div>

                        <div className="jobs-card__text">Бесплатное обучение в процессе работы</div>

                        <div className="jobs-card__text">Гибкий график работы</div>

                        <div className="jobs-card__text">З/п от 200 000₽</div>

                        <div className="jobs-card__text">
                            Собеседование проходит со среды по воскресенье,
                            с 19:00 до 21:00, по адресу Красная Пресня, 24
                        </div>

                        <button className="jobs-card__btn jobs-card__btn--outlined" onClick={onOpenModal}>
                            Связаться с нами
                            <img src={ArrowRight} style={{marginLeft: '10px'}} alt=""/>
                        </button>
                    </div>

                    <div className="jobs-card">
                        <div className="jobs-card__title">Актриса</div>

                        <div className="jobs-card__subtitle">
                            Если ты яркая, привлекательная девушка, умеешь красиво двигаться и хочешь зарабатывать,
                            приходи на собеседование и стань частью команды.
                        </div>

                        <div className="jobs-card__text">З/п от 300 000₽</div>

                        <div className="jobs-card__text">Удобный график работы</div>

                        <div className="jobs-card__text">Услуги стилиста/визажиста</div>

                        <div className="jobs-card__text">
                            Бесплатный солярий
                        </div>

                        <div className="jobs-card__text">
                            Услуги профессионального хореографа
                        </div>

                        <div className="jobs-card__text">
                            Полная конфиденциальность и безопасность
                        </div>

                        <div className="jobs-card__text">
                            Собеседование проходит со среды по воскресенье, с 19:00 до 21:00, по адресу Красная Пресня,
                            24
                        </div>

                        <button className="jobs-card__btn jobs-card__btn--filled" onClick={onOpenModal}>
                            Связаться с нами
                            <img src={ArrowRight} style={{marginLeft: '10px'}} alt=""/>
                        </button>
                    </div>

                    {/* TODO показывать только на мобилках */}
                    <img src={AufLogoShadowed} alt="auf logo"/>
                </div>
            </div>
        </>
    )
}

Jobs.propTypes = {
    onOpenModal: PropTypes.func.isRequired,
};
