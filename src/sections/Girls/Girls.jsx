import Girls1 from "../../../public/assets/images/girls/girls-1.webp";
import Girls2 from "../../../public/assets/images/girls/girls-2.webp";
import Girls3 from "../../../public/assets/images/girls/girls-3.webp";
import Girls4 from "../../../public/assets/images/girls/girls-4.webp";
import Girls5 from "../../../public/assets/images/girls/girls-5.webp";
import Girls6 from "../../../public/assets/images/girls/girls-6.webp";
import Girls7 from "../../../public/assets/images/girls/girls-7.webp";
import Girls8 from "../../../public/assets/images/girls/girls-8.webp";
import Girls9 from "../../../public/assets/images/girls/girls-9.webp";
import Girls10 from "../../../public/assets/images/girls/girls-10.webp";
import { useRef } from "react";
import { motion } from "framer-motion";

import './Girls.css'
import { useInView } from "react-intersection-observer";

export const Girls = () => {
    const girlsRef = useRef(null);

    const images = [Girls1, Girls2, Girls3, Girls4, Girls5, Girls6, Girls7, Girls8, Girls9, Girls10];

    const imageAnimationVariants = {
        initial: { opacity: 0, scale: 0 },
        animate: { opacity: [0, 1, 0], scale: [0, 2, 3] },
    };

    const [girlsTextRef, girlsTextnView] = useInView({
        threshold: 0
    });
    const textPart1 =
        "уникальная атмосфера, вас ждут премиальные шоу-программы, персональный сервис и лучшие коктейли Москвы.";
    const textPart2 = "мы создаем ночи, которые запоминаются навсегда.";
    const wordsPart1 = textPart1.split(" ");
    const wordsPart2 = textPart2.split(" ");
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
                        <span className="animation-string__text">Игривые актрисы</span>
                        <span className="animation-string__text">Игривые актрисы</span>
                        <span className="animation-string__text">Игривые актрисы</span>
                    </motion.div>
                </div>

                <div className="girls__container">
                    <h2 className="girls__title">
                        игривые <span style={{color: 'var(--secondary-color)'}}>актрисы</span>
                    </h2>

                    <div className="girls__subtitle">
                        приватный отдых высшего уровня и неповторимый опыт эротического погружения
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
