import { motion } from "framer-motion";
import Info1Big from "../../assets/images/info-1-big.png"
import Info2Big from "../../assets/images/info-2-big.png"
import Info3Big from "../../assets/images/info-3-big.png"
import Star from "../../assets/icons/star.svg"
import Yandex from "../../assets/icons/yandex.svg"
import Google from "../../assets/icons/google.svg"
import { useInView } from "react-intersection-observer";

import './Info.css'

export const Info = () => {
    const imageVariantRightToLeft = {
        hidden: {
            scaleX: 0,
            opacity: 0,
            transformOrigin: "right center",
        },
        visible: {
            scaleX: 1,
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: "easeInOut",
            },
        },
    };
    const imageVariantLeftToRight = {
        hidden: {
            scaleX: 0,
            opacity: 0,
            transformOrigin: "left center",
        },
        visible: {
            scaleX: 1,
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: "easeInOut",
            },
        },
    };

    const [infoImage1Ref, infoImage1InView] = useInView({
        threshold: 0
    });
    const [infoImage2Ref, infoImage2InView] = useInView({
        threshold: 0
    });
    const [infoImage3Ref, infoImage3InView] = useInView({
        threshold: 0
    });

    const stars = [1, 2, 3, 4, 5];
    const [startRef, starsInView] = useInView({
        threshold: 0
    });
    const starVariant = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3,
                delay: i * 0.1,
                ease: "easeInOut",
            },
        }),
    };

    const [cardsRef, cardsInView] = useInView({
        threshold: 0
    });
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: i * 0.2,
                ease: "easeOut",
            },
        }),
    };

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

                    <div className="info__block">
                        <motion.div
                            ref={infoImage1Ref}
                            className="animated-image-wrapper"
                            initial="hidden"
                            animate={infoImage1InView ? "visible" : "hidden"}
                            variants={imageVariantLeftToRight}
                        >
                            <img className="info__img animated-image" src={Info1Big} alt=""/>
                        </motion.div>

                        <div className="info-service">
                            <h4 className="info__header">Премиальный уровень сервиса</h4>

                            <div className="info__text" style={{marginTop: '14px'}}>
                                Исключительный сервис, который соответствует самым высоким стандартам.
                            </div>
                        </div>
                    </div>

                    <h3 className="info__title" style={{marginTop: '90px'}}>
                        <span style={{color: 'var(--primary-color)'}}>Рай для</span> гедонистов
                    </h3>

                    <div className="info__block">
                        <div className="info-manager info-manager--big">
                            <h4 className="info__header info-manager__title">Ваш личный комфорт-менеджер</h4>

                            <div className="info__text info-manager__text" style={{marginTop: '10px'}}>
                                Это ваш проводник в мир изысканного досуга, который позаботится обо всем:
                                от подбора коктейля до организации шоу в индивидуальной зоне.
                            </div>
                        </div>

                        <motion.div
                            ref={infoImage2Ref}
                            className="animated-image-wrapper"
                            initial="hidden"
                            animate={infoImage2InView ? "visible" : "hidden"}
                            variants={imageVariantRightToLeft}
                        >
                            <img className="info__img" src={Info2Big} alt=""/>
                        </motion.div>

                        <div className="info-manager info-manager--small">
                            <h4 className="info__header info-manager__title">Ваш личный комфорт-менеджер</h4>

                            <div className="info__text info-manager__text" style={{marginTop: '10px'}}>
                                Это ваш проводник в мир изысканного досуга, который позаботится обо всем:
                                от подбора коктейля до организации шоу в индивидуальной зоне.
                            </div>
                        </div>
                    </div>

                    <div className="info__block" style={{marginTop: '90px'}}>
                        <motion.div
                            ref={infoImage3Ref}
                            className="animated-image-wrapper"
                            initial="hidden"
                            animate={infoImage3InView ? "visible" : "hidden"}
                            variants={imageVariantLeftToRight}
                        >
                            <img className="info__img" src={Info3Big} alt=""/>
                        </motion.div>

                        <div className="info-privacy">
                            <h4 className="info__header" style={{width: '360px'}}>
                                100% конфиденциальность и приватность
                            </h4>

                            <div className="info__text" style={{marginTop: '10px'}}>
                                Приватные зоны, закрытые VIP-ложи и строгая политика конфиденциальности гарантируют,
                                что ваше посещение останется только вашим секретом.
                            </div>
                        </div>
                    </div>

                    <div className="info__rating" ref={startRef}>
                        <h3 className="info__rating-text">Рейтинг клуба:</h3>
                        {stars.map((_, index) => (
                            <motion.img
                                key={index}
                                className="info__rating-star"
                                src={Star}
                                alt="star"
                                custom={index}
                                initial="hidden"
                                animate={starsInView ? "visible" : "hidden"}
                                variants={starVariant}
                            />
                        ))}
                    </div>

                    <div className="info__review">
                        Положительных отзывов: 327
                    </div>

                    <div className="info-rating-cards">
                        <motion.div
                            ref={cardsRef}
                            className="info-rating-card"
                            initial="hidden"
                            animate={cardsInView ? "visible" : "hidden"}
                            variants={cardVariants}
                            custom={0}
                        >
                            <div style={{display: "flex"}}>
                                <div className="info-rating-card__img">
                                    <img src={Yandex} alt="Yandex"/>
                                </div>
                                <div>
                                    <div className="info-rating-card__rating">5,0</div>
                                    <div className="info-rating-card__text">Яндекс</div>
                                </div>
                            </div>
                            <button className="info-rating-card__btn">
                                <div className="info-rating-card__btn-text">Оставить отзыв</div>
                            </button>
                        </motion.div>

                        <motion.div
                            ref={cardsRef}
                            className="info-rating-card"
                            initial="hidden"
                            animate={cardsInView ? "visible" : "hidden"}
                            variants={cardVariants}
                            custom={1}
                        >
                            <div style={{display: "flex"}}>
                                <div className="info-rating-card__img">
                                    <img src={Google} alt="Google"/>
                                </div>
                                <div>
                                    <div className="info-rating-card__rating">5,0</div>
                                    <div className="info-rating-card__text">Google</div>
                                </div>
                            </div>
                            <button className="info-rating-card__btn">
                                <div className="info-rating-card__btn-text">Оставить отзыв</div>
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    )
}
