import { useContext, useMemo, useRef } from "react";
import { motion } from "framer-motion";

import './Girls.css'
import { useInView } from "react-intersection-observer";
import { DataContext } from "../../context/DataContext.jsx";
import { useLanguage } from "../../context/LanguageProvider.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const Girls = () => {
    const girlsRef = useRef(null);

    const { data } = useContext(DataContext);

    const girlsData = useMemo(() => data?.girlsData?.[0] || {}, [data?.girlsData]);

    const { language } = useLanguage();

    const images = girlsData?.photos?.length
        ? girlsData.photos.map((photo) => `${API_BASE_URL}${photo.photo}`)
        : [];

    const imageAnimationVariants = {
        initial: { opacity: 0, scale: 0 },
        animate: { opacity: [0, 1, 0], scale: [0, 2, 3] },
    };

    const [girlsTextRef, girlsTextnView] = useInView({
        threshold: 0.5
    });
    const textPart1 = girlsData[`text_${language}`] ||  '';
    const textPart2 = girlsData[`highlight_text_${language}`] || '';
    const wordsPart1 = textPart1?.split(" ");
    const wordsPart2 = textPart2?.split(" ");
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

    return (
        <>
            <div className="girls" ref={girlsRef} id="girls">
                <div className="animation-string">
                    <motion.div
                        className="animation-string__animation"
                        animate={{x: ["100%", "-100%"]}}
                        transition={{
                            repeat: Infinity,
                            duration: 16,
                            ease: "linear",
                        }}
                    >
                        <span className="animation-string__text">{girlsData[`title_${language}`]} {girlsData[`highlight_title_${language}`]}</span>
                        <span className="animation-string__text">{girlsData[`title_${language}`]} {girlsData[`highlight_title_${language}`]}</span>
                        <span className="animation-string__text">{girlsData[`title_${language}`]} {girlsData[`highlight_title_${language}`]}</span>
                    </motion.div>
                </div>

                <div className="girls__container">
                    <h2 className="girls__title">
                        {girlsData[`title_${language}`]} <span style={{color: 'var(--secondary-color)'}}>{girlsData[`highlight_title_${language}`]}</span>
                    </h2>

                    <div className="girls__subtitle">
                        {girlsData[`subtitle_${language}`]}
                    </div>

                    <div className="girls__animation">
                        {images.map((image, index) => {
                            const positionClass =
                                index % 3 === 0
                                    ? "girls__img--left"
                                    : index % 3 === 1
                                        ? "girls__img--center"
                                        : "girls__img--right";

                            return (
                                <motion.img
                                    key={index}
                                    src={image}
                                    alt={`Girl ${index}`}
                                    className={`girls__img ${positionClass}`}
                                    variants={imageAnimationVariants}
                                    initial="initial"
                                    animate="animate"
                                    transition={{
                                        duration: 1.5,
                                        ease: "easeInOut",
                                        delay: index * 1.5,
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        repeatDelay: images.length,
                                    }}
                                />
                            );
                        })}
                    </div>

                    <div className="girls__text" ref={girlsTextRef}>
                        {wordsPart1.map((word, index) => (
                            <motion.span
                                key={`part1-${index}`}
                                custom={index}
                                initial="hidden"
                                animate={girlsTextnView ? "visible" : "hidden"}
                                variants={wordAnimation}
                            >
                                {word}{" "}
                            </motion.span>
                        ))}

                        {wordsPart2.map((word, index) => (
                            <motion.span
                                key={`part2-${index}`}
                                className="highlighted-word"
                                custom={wordsPart1.length + index}
                                initial="hidden"
                                animate={girlsTextnView ? "visible" : "hidden"}
                                variants={wordAnimation}
                            >
                                {word}{" "}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
