import Interior1 from "../../../public/assets/images/interior-1-big.png";
import Interior2 from "../../../public/assets/images/interior-2-big.png";
import Interior3 from "../../../public/assets/images/interior-3-big.png";
import Interior4 from "../../../public/assets/images/interior-4-big.png";

// import Interior from "../../../public/assets/images/interior.png";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Stories } from "../../components/Stories/Stories.jsx";
import { useRef } from "react";
import { INTERIOR_ITEMS } from "../../utils/constants.js";
import PropTypes from "prop-types";

import './Show.css'

export const Show = ({ onInteriorClick }) => {
    const vipRef = useRef(null);
    const musicRef = useRef(null);
    const interiorRef = useRef(null);

    /* TODO сделать динамический класс active / inactive */
    const interiorItems = INTERIOR_ITEMS.map(
        item => {
            return (
                <div
                    key={item.id}
                    className="interior__tag interior__tag--inactive"
                    onClick={() => onInteriorClick(item.photos)}
                >
                    {item.text}
                </div>
            )
        }
    );

    const [textRef, textInView] = useInView({
        threshold: 0
    });
    const text = "Музыкальная концепция стрипклуба AUF построена в стиле ORGANIC, MELODIC и AFRO HOUSE создает настроение пира души и тела. А наши актрисы создают неповторимые иммерсивные эротические постановки под руководством лучших хореографов Москвы.";
    const words = text.split(" ")
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

    const [image1Ref, image1InView] = useInView({
        threshold: 0
    });
    const [image2Ref, image2InView] = useInView({
        threshold: 0
    });
    const [image3Ref, image3InView] = useInView({
        threshold: 0
    });
    const [image4Ref, image4InView] = useInView({
        threshold: 0
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

    return (
        <>
            <div className="container">
                <div className="show" id="music" ref={musicRef}>
                    <div className="show__container">
                        <h2 className="show__title">
                            Show <span style={{color: 'var(--secondary-color)'}}>& Music</span>
                        </h2>

                        <div className="show__text">
                            {words.map((word, index) => (
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
                            ))}
                        </div>

                        <div className="show__stories">
                            <Stories />
                        </div>
                    </div>
                </div>

                <div className="interior" id="interior" ref={interiorRef}>
                    <div className="interior__universal-container">
                        <h2 className="interior__title">Интерьер клуба</h2>

                        {/*<img src={Interior} alt="Interior" />*/}

                        <div className="interior__tags">
                            {interiorItems}
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

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="interior__universal-container">
                        <div className="interior__block">
                            <motion.div
                                ref={image1Ref}
                                initial="hidden"
                                animate={image1InView ? "visible" : "hidden"}
                                variants={imageVariants}
                            >
                                <img className="interior__img-1" src={Interior1} alt="Interior"/>
                            </motion.div>

                            <div className="interior__subtext">
                                Максимум комфорта и анонимности – приватные ложи, где только Вы и Ваши удовольствия.
                            </div>
                        </div>

                        <motion.div
                            ref={image2Ref}
                            initial="hidden"
                            animate={image2InView ? "visible" : "hidden"}
                            variants={imageVariants}
                        >
                            <img className="interior__img-2" src={Interior2} alt="Interior"/>
                        </motion.div>

                        <div className="interior__block">
                            <motion.div
                                ref={image3Ref}
                                initial="hidden"
                                animate={image3InView ? "visible" : "hidden"}
                                variants={imageVariants}
                            >
                                <img className="interior__img-3" src={Interior3} alt="Interior"/>
                            </motion.div>
                        </div>

                        <motion.div
                            ref={image4Ref}
                            initial="hidden"
                            animate={image4InView ? "visible" : "hidden"}
                            variants={imageVariants}
                        >
                            <img className="interior__img-4" src={Interior4} alt="Interior"/>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    )
}

Show.propTypes = {
    onInteriorClick: PropTypes.func.isRequired,
};
