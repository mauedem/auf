import MainBgVideo from "../../assets/videos/main-bg.mp4"
import AufLogo from "../../assets/icons/auf-logo.svg"
import PhoneCall from "../../assets/icons/phone-call.svg"
import ArrowRight from "../../assets/icons/arrow-right.svg"
import Map from "../../assets/icons/map.svg"
import { useRef } from "react";
import { BOOK_NUMBER, NAV_ITEMS } from "../../utils/constants.js";

import './About.css'

export const About = () => {
    const aboutRef = useRef(null);

    function goToLinkHref(menuItem) {
        if (menuItem.href) {
            document.getElementById(menuItem.href).scrollIntoView({ behavior: 'smooth' });
        }
    }

    const navItems = NAV_ITEMS.map(
        item => {
            return (
                <div
                    key={item.id}
                    className="about__tag"
                    onClick={() => goToLinkHref(item)}
                >
                    {item.name}
                </div>
            )
        }
    );

    return (
        <>
            <div className="about" id="about" ref={aboutRef}>
                <div className="video-background">
                    <video
                        className="video"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                    >
                        <source src={MainBgVideo} type="video/mp4"/>
                        Ваш браузер не поддерживает видео.
                    </video>
                    <div className="video-overlay"></div>
                </div>

                <div className="about__container">
                    <div className="about__title about__title--welcome">WELCOME TO</div>
                    <img className="about__logo" src={AufLogo} alt="AUF Logo"/>
                    <div className="about__title about__title--experience">EXPERIENCE CLUB</div>

                    <div>
                        <h1 className="about__subtitle">стриптиз клуб в центре <br/> москвы</h1>
                        <div className="about__description">изысканный отдых <br/> для мужчин</div>
                    </div>

                    <button className="reserve-button">
                        <img className="reserve-button__phone-call" src={PhoneCall} alt="Phone call"/>
                            <a href={`tel:${BOOK_NUMBER}`}>Забронировать</a>
                        <img className="reserve-button__arrow-right" src={ArrowRight} alt="Arrow right"/>
                    </button>

                    <div className="about__info">
                        <div style={{display: "flex", alignItems: "center"}}>
                            <img src={Map} alt="Map"/>
                            <div className="about__address">ул. Красная Пресня, 24</div>
                        </div>

                        <div style={{display: "flex", flexDirection: 'column'}}>
                            <div className="about__timetable">Ежедневно</div>
                            <div className="about__opening-hours">с 21:00 до 06:00</div>
                        </div>
                    </div>

                    <div className="about__tags">
                        {navItems}
                    </div>
                </div>
            </div>
        </>
    )
}
