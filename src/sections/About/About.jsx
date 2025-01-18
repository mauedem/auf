import { motion } from "framer-motion";
import MainBgVideo from "../../../public/assets/videos/main-bg.mp4";
import MainBgMobileVideo from "../../../public/assets/videos/main-bg-mobile.mp4";
import MobileBg from "../../../public/assets/images/mobile-bg.png";
import AufLogo from "../../../public/assets/icons/auf-logo.svg";
import PhoneCall from "../../../public/assets/icons/phone-call.svg";
import ArrowRight from "../../../public/assets/icons/arrow-right.svg";
import Map from "../../../public/assets/icons/map.svg";
import { BOOK_NUMBER, NAV_ITEMS } from "../../utils/constants.js";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

import "./About.css";

export const About = () => {
    const [aboutRef, aboutRefInView] = useInView({
        threshold: 0
    });

    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    const textVariant = (direction = "y", distance = 50) => ({
        hidden: { opacity: 0, [direction]: distance },
        visible: {
            opacity: 1,
            [direction]: 0,
            transition: { duration: 1.2 },
        },
    });

    const buttonBackgroundVariant = {
        initial: {borderColor: "#C618D0"},
        hidden: {scaleX: 0},
        animate: {
            borderColor: "#ffffff",
            transition: {
                duration: 1,
                repeat: 1,
                repeatType: "reverse",
            },
        },
        visible: {
            scaleX: 1,
            transition: {duration: 1},
        },
    };

    const buttonTextVariant = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.5, delay: 0.5 },
        },
    };

    const navItems = NAV_ITEMS.map((item) => {
        return (
            <div
                key={item.id}
                className="about__tag about__tag--active"
                onClick={() => {
                    if (item.href) {
                        document
                            .getElementById(item.href)
                            .scrollIntoView({ behavior: "smooth" });
                    }
                }}
            >
                {item.name}
            </div>
        );
    });

    return (
        <motion.div
            id="about"
            className="about"
            ref={aboutRef}
            initial="hidden"
            animate={aboutRefInView ? "visible" : "hidden"}
            transition={{ duration: 1 }}
        >
            <div
                className="video-background"
                style={{
                    backgroundImage: isVideoLoaded
                        ? "none"
                        : "url('../../../public/assets/images/bg.png')",
                }}
            >
                <video
                    className="video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onCanPlayThrough={() => setIsVideoLoaded(true)}
                    onLoadedData={() => setIsVideoLoaded(true)}
                >
                    <source
                        src={MainBgVideo}
                        type="video/mp4"
                        media="(min-width: 576px)"
                    />
                    <source
                        src={MainBgMobileVideo}
                        type="video/mp4"
                        media="(max-width: 575px)"
                    />
                    <noscript>
                        <img src={MobileBg} alt=""/>
                    </noscript>
                </video>
                <div className={`video-overlay ${isVideoLoaded ? '' : 'loading-overlay'}`}></div>
            </div>

            <div className="about__container">
                <div className="about__logo-container">
                    <motion.div
                        className="about__title about__title--welcome"
                        variants={textVariant("y", -30)}
                    >
                        WELCOME TO
                    </motion.div>

                    <img className="about__logo" src={AufLogo} alt="AUF Logo"/>

                    <motion.div
                        className="about__title about__title--experience"
                        variants={textVariant("y", 30)}
                    >
                        EXPERIENCE CLUB
                    </motion.div>
                </div>

                <div className="about__text-block">
                    <motion.h1
                        className="about__subtitle"
                        variants={textVariant("y", -30)}
                    >
                        стриптиз клуб в центре москвы
                    </motion.h1>
                    <motion.div
                        className="about__description"
                        variants={textVariant("y", 30)}
                    >
                        изысканный отдых <br/> для мужчин
                    </motion.div>
                </div>

                <div className="reserve-button__container">
                    <motion.div
                        className="reserve-button"
                        variants={buttonBackgroundVariant}
                        initial="hidden"
                        animate="visible"
                        transition={{duration: 1}}
                        onClick={() => {
                            window.location.href = `tel:${BOOK_NUMBER}`;
                        }}
                    >
                        <motion.img
                            className="reserve-button__phone-call"
                            src={PhoneCall}
                            alt="Phone call"
                        />
                        <motion.a
                            href={`tel:${BOOK_NUMBER}`}
                            variants={buttonTextVariant}
                            transition={{duration: 0.5}}
                        >
                            Забронировать
                        </motion.a>
                        <motion.img
                            className="reserve-button__arrow-right"
                            src={ArrowRight}
                            alt="Arrow right"
                        />
                    </motion.div>
                </div>

                <motion.div className="about__info" variants={textVariant("y", 50)}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <img src={Map} alt="Map"/>
                        <div className="about__address">ул. Красная Пресня, 24</div>
                    </div>

                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div className="about__timetable">Ежедневно</div>
                        <div className="about__opening-hours">с 21:00 до 06:00</div>
                    </div>
                </motion.div>

                <motion.div className="about__tags" variants={textVariant("y", 50)}>
                    {navItems}
                </motion.div>
            </div>
        </motion.div>
    );
};
