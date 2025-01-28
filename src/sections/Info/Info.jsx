import { motion } from "framer-motion";

import Star from "../../../public/assets/icons/star.svg"
import Yandex from "../../../public/assets/icons/yandex.svg"
import Google from "../../../public/assets/icons/google.svg"
import { useInView } from "react-intersection-observer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

import './Info.css'

import { useContext, useEffect, useMemo, useState } from "react";
import { DataContext } from "../../context/DataContext.jsx";
import { useLanguage } from "../../context/LanguageProvider.jsx";
import { Skeleton } from "../../components/Skeleton/Skeleton.jsx";

export const Info = () => {
    const { data, loading } = useContext(DataContext);

    const infoData = useMemo(() => data?.infoData?.[0] || {}, [data?.infoData]);

    const { language } = useLanguage();

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
        threshold: 0.5
    });
    const [infoImage2Ref, infoImage2InView] = useInView({
        threshold: 0.5
    });
    const [infoImage3Ref, infoImage3InView] = useInView({
        threshold: 0.5
    });

    const stars = [1, 2, 3, 4, 5];
    const [startRef, starsInView] = useInView({
        threshold: 0.5
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
        threshold: 0.5
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

    const [images, setImages] = useState({
        image_1: '',
        image_2: '',
        image_3: '',
    });

    useEffect(() => {
        if (Object.keys(infoData).length > 0) {
            setImages({
                image_1: `${API_BASE_URL}${infoData['block_1_photo']}`,
                image_2: `${API_BASE_URL}${infoData['block_2_photo']}`,
                image_3: `${API_BASE_URL}${infoData['block_3_photo']}`,
            });
        }
    }, [infoData]);

    return (
        <>
            <div className="info" id="info">
                <div className="info__container">
                    <h2 className="info__title">
                        {loading ? (
                            <Skeleton type="text"/>
                        ) : (
                            <>
                                <span style={{color: 'var(--secondary-color)'}}>
                                    {infoData[`highlight_title_${language}`]}
                                </span> {infoData[`title_${language}`]}
                            </>
                        )}
                    </h2>
                    <div className="info__subtitle">
                        <span style={{color: 'var(--primary-color)'}}>
                            {loading ? <Skeleton type="text"/> : infoData[`subtitle_${language}`]}
                        </span>
                    </div>

                    <div className="info__block">
                        <motion.div
                            ref={infoImage1Ref}
                            initial="hidden"
                            animate={infoImage1InView ? "visible" : "hidden"}
                            variants={imageVariantLeftToRight}
                        >
                            {loading || !images.image_1 ? (
                                <Skeleton type="image" style={{width: '100%', height: '300px'}}/>
                            ) : (
                                <img
                                    className="info__img"
                                    src={images.image_1}
                                    alt=""
                                    loading="lazy"
                                />
                            )}
                        </motion.div>

                        <div className="info-service">
                            <h4 className="info__header">
                                {loading ? <Skeleton type="text"/> : infoData[`block_1_title_${language}`]}
                            </h4>

                            <div className="info__text" style={{marginTop: '14px'}}>
                                {loading ? <Skeleton type="text"/> : infoData[`block_1_text_${language}`]}
                            </div>
                        </div>
                    </div>

                    <h3 className="info__title info__title--90">
                        {loading ? (
                            <Skeleton type="text" />
                        ) : (
                            <>
                                <span style={{color: 'var(--primary-color)'}}>{infoData[`highlight_title_2_${language}`]}</span> {infoData[`title_2_${language}`]}
                            </>
                        )}
                    </h3>

                    <div className="info__block">
                        <div className="info-manager info-manager--big">
                            <h4 className="info__header info-manager__title">
                                {loading ? <Skeleton type="text" /> : infoData[`block_2_title_${language}`]}
                            </h4>

                            <div className="info__text info-manager__text" style={{marginTop: '10px'}}>
                                {loading ? <Skeleton type="text" /> : infoData[`block_2_text_${language}`]}
                            </div>
                        </div>

                        <motion.div
                            ref={infoImage2Ref}
                            initial="hidden"
                            animate={infoImage2InView ? "visible" : "hidden"}
                            variants={imageVariantRightToLeft}
                        >
                            {loading || !images.image_2 ? (
                                <Skeleton type="image" style={{width: '100%', height: '300px'}}/>
                            ) : (
                                <img className="info__img" src={images.image_2} alt="" loading="lazy" />
                            )}
                        </motion.div>

                        <div className="info-manager info-manager--small">
                            <h4 className="info__header info-manager__title">
                                {loading ? <Skeleton type="text" /> : infoData[`block_2_title_${language}`]}
                            </h4>

                            <div className="info__text info-manager__text" style={{marginTop: '10px'}}>
                                {loading ? <Skeleton type="text" /> : infoData[`block_2_text_${language}`]}
                            </div>
                        </div>
                    </div>

                    <div className="info__block info__block--90">
                        <motion.div
                            ref={infoImage3Ref}
                            initial="hidden"
                            animate={infoImage3InView ? "visible" : "hidden"}
                            variants={imageVariantLeftToRight}
                        >
                            {loading || !images.image_3 ? (
                                <Skeleton type="image" style={{width: '100%', height: '300px'}}/>
                            ) : (
                                <img className="info__img" src={images.image_3} alt="" loading="lazy" />
                            )}
                        </motion.div>

                        <div className="info-privacy">
                            <h4 className="info__header" style={{width: '360px'}}>
                                {loading ? <Skeleton type="text" /> : infoData[`block_3_title_${language}`]}
                            </h4>

                            <div className="info__text" style={{marginTop: '10px'}}>
                                {loading ? <Skeleton type="text" /> : infoData[`block_3_text_${language}`]}
                            </div>
                        </div>
                    </div>

                    <div className="info__rating" ref={startRef}>
                        <h3 className="info__rating-text">
                            {infoData[`rating_${language}`]}
                        </h3>
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
                        {loading ? <Skeleton type="text" /> : infoData[`reviews_total_count_${language}`]}
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
                                    <img src={Yandex} alt="Yandex" loading="lazy" />
                                </div>
                                <div>
                                    <div className="info-rating-card__rating">
                                        {infoData[`yandex_score`]}
                                    </div>
                                    <div className="info-rating-card__text">
                                        {infoData[`yandex_text_${language}`]}
                                    </div>
                                </div>
                            </div>
                            <button
                                className="info-rating-card__btn"
                                onClick={() => {
                                    window.open(infoData['yandex_review_link'], '_blank');
                                }}
                            >
                                <div className="info-rating-card__btn-text">
                                    {infoData[`yandex_button_text_${language}`]}
                                </div>
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
                                    <img src={Google} alt="Google" loading="lazy" />
                                </div>
                                <div>
                                    <div className="info-rating-card__rating">
                                        {infoData[`google_score`]}
                                    </div>
                                    <div className="info-rating-card__text">
                                        {infoData[`gooogle_text_${language}`]}
                                    </div>
                                </div>
                            </div>
                            <button
                                className="info-rating-card__btn"
                                onClick={() => {
                                    window.open(infoData['google_review_link'], '_blank');
                                }}
                            >
                                <div className="info-rating-card__btn-text">
                                    {infoData[`gooogle_button_text_${language}`]}
                                </div>
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    )
}
