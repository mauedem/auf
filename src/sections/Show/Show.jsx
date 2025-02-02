import { DataContext } from "../../context/DataContext.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Stories } from "../../components/Stories/Stories.jsx";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";

import './Show.css'
import { useLanguage } from "../../context/LanguageProvider.jsx";
import {Skeleton} from "../../components/Skeleton/Skeleton.jsx";

export const Show = ({ onInteriorClick, interiorData, interiorBlocksData }) => {
    const vipRef = useRef(null);
    const musicRef = useRef(null);
    const interiorRef = useRef(null);

    const { data, loading } = useContext(DataContext);

    const showData = useMemo(() => data?.showData?.[0] || {}, [data?.showData]);

    const { language } = useLanguage();

    const [textRef, textInView] = useInView({
        threshold: 0.5
    });

    const [image1Ref, image1InView] = useInView({
        threshold: 0.5
    });
    const [image2Ref, image2InView] = useInView({
        threshold: 0.5
    });
    const [image3Ref, image3InView] = useInView({
        threshold: 0.5
    });
    const [image4Ref, image4InView] = useInView({
        threshold: 0.5
    });
    const imageVariants = {
        hidden: { scaleX: 0, opacity: 0 },
        visible: {
            scaleX: 1,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeInOut",
            },
        },
    };

    const text = showData[`text_${language}`] ||  ''
    const words = text?.split(" ")
    const wordAnimation = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.1,
                delay: i * 0.1,
            },
        }),
    };

    const [images, setImages] = useState({
        main_image: '',
        image_1: '',
        image_2: '',
        image_3: '',
        image_4: '',
    });

    useEffect(() => {
        if (Object.keys(interiorData).length > 0) {
            setImages({
                main_image: `${API_BASE_URL}${interiorData['photo']}`,
                image_1: `${API_BASE_URL}${interiorData['photo_1']}`,
                image_2: `${API_BASE_URL}${interiorData['photo_2']}`,
                image_3: `${API_BASE_URL}${interiorData['photo_3']}`,
                image_4: `${API_BASE_URL}${interiorData['photo_4']}`,
            });
        }
    }, [interiorData]);

    const videos = showData?.videos?.length
        ? showData.videos.map((video) => `${API_BASE_URL}${video.video}`)
        : [];

    const interiorItems = interiorBlocksData.map(
        item => {
            return (
                <div
                    key={item.id}
                    className="interior__tag interior__tag--inactive"
                    onClick={() => onInteriorClick(item.key)}
                >

                    {item[`title_${language}`]}
                </div>
            )
        }
    );

    return (
        <>
            <div className="container">
                <div className="show" id="music" ref={musicRef}>
                    <div className="show__container">
                        <h2 className="show__title">
                            {loading ? (
                                <Skeleton type="text"/>
                            ) : (
                                <>
                                    {showData[`title_${language}`]} <span style={{color: 'var(--secondary-color)'}}>{showData[`highlight_title_${language}`]}</span>
                                </>
                            )}
                        </h2>

                        <div className="show__text">
                            {loading ? (
                                <Skeleton type="text"/>
                            ) : (
                                words.map((word, index) => (
                                    <motion.span
                                        ref={textRef}
                                        key={`part1-${index}`}
                                        custom={index}
                                        initial="hidden"
                                        animate={textInView ? "visible" : "hidden"}
                                        variants={wordAnimation}
                                    >
                                        {word}{" "}
                                    </motion.span>
                                ))
                            )}
                        </div>

                        <div className="show__stories">
                            {loading ? <Skeleton type="image" /> : <Stories videos={videos} />}
                        </div>
                    </div>
                </div>

                <div className="interior" id="interior" ref={interiorRef}>
                    <div className="interior__universal-container">
                        <h2 className="interior__title">
                            {loading ? <Skeleton type="text" /> : interiorData[`title_${language}`]}
                        </h2>

                        <div className="interior__tags">
                            {loading ? <Skeleton type="text" /> : interiorItems}
                        </div>

                        <div className="interior__main-img">
                            {loading || !images.main_image ? (
                                <Skeleton type="image" style={{width: '100%', height: '300px'}}/>
                            ) : (
                                <img className="interior__img" src={images.main_image} alt="Interior" loading="lazy" />
                            )}
                        </div>
                    </div>

                    <div className="interior__container" id="vip" ref={vipRef}>
                        <h3 className="interior__title interior__title--secondary">
                            {loading ? <Skeleton type="text" /> : interiorData[`title_2_${language}`]}
                        </h3>

                        <div className="interior__text">
                            {loading ? (
                                <Skeleton type="text"/>
                            ) : (
                                <>
                                    {interiorData[`subtitle_${language}`]?.split('{{highlited}}')[0]}
                                    <span style={{color: 'var(--primary-color)'}}>
                                        {interiorData[`highlight_subtitle_${language}`]}
                                    </span>
                                    {interiorData[`subtitle_${language}`]?.split('{{highlited}}')[1]}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="interior__universal-container--1">
                    <div className="interior__universal-container">
                        <div className="interior__block">
                            <motion.div
                                ref={image1Ref}
                                initial="hidden"
                                animate={image1InView ? "visible" : "hidden"}
                                variants={imageVariants}
                            >
                                {loading || !images.image_1 ? (
                                    <Skeleton type="image" style={{width: '100%', height: '300px'}}/>
                                ) : (
                                    <img className="interior__img-1" src={images.image_1} alt="Interior" loading="lazy" />
                                )}
                            </motion.div>

                            <div className="interior__subtext">
                                {interiorData[`text_${language}`]}
                            </div>
                        </div>

                        <motion.div
                            ref={image2Ref}
                            initial="hidden"
                            animate={image2InView ? "visible" : "hidden"}
                            variants={imageVariants}
                        >
                            {loading || !images.image_2 ? (
                                <Skeleton type="image" style={{width: '100%', height: '300px'}}/>
                            ) : (
                                <img className="interior__img-2" src={images.image_2} alt="Interior" loading="lazy" />
                            )}
                        </motion.div>

                        <div className="interior__block">
                            <motion.div
                                ref={image3Ref}
                                initial="hidden"
                                animate={image3InView ? "visible" : "hidden"}
                                variants={imageVariants}
                            >
                                {loading || !images.image_3 ? (
                                    <Skeleton type="image" style={{width: '100%', height: '300px'}}/>
                                ) : (
                                    <img className="interior__img-3" src={images.image_3} alt="Interior" loading="lazy" />
                                )}
                            </motion.div>
                        </div>

                        <motion.div
                            ref={image4Ref}
                            initial="hidden"
                            animate={image4InView ? "visible" : "hidden"}
                            variants={imageVariants}
                        >
                            {loading || !images.image_4 ? (
                                <Skeleton type="image" style={{width: '100%', height: '300px'}}/>
                            ) : (
                                <img className="interior__img-4" src={images.image_4} alt="Interior" loading="lazy" />
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    )
}

Show.propTypes = {
    onInteriorClick: PropTypes.func.isRequired,
    interiorData: PropTypes.object.isRequired,
    interiorBlocksData: PropTypes.array.isRequired,
};
