import Girls1 from "../../assets/images/girls-1.png";
import { useRef } from "react";

import './Girls.css'

export const Girls = () => {
    const girlsRef = useRef(null);

    return (
        <>
            <div className="girls" ref={girlsRef} id="girls">
                <div className="girls__container">
                    <h2 className="girls__title">
                        игривые <span style={{color: 'var(--secondary-color)'}}>актрисы</span>
                    </h2>

                    <div className="girls__subtitle">
                        приватный отдых высшего уровня и неповторимый опыт эротического погружения
                    </div>

                    <div style={{ alignSelf: "start" }}>
                        <img className="girls__img" src={Girls1} alt="girl"/>
                    </div>

                    <div className="girls__text">
                        уникальная атмосфера, вас ждут премиальные шоу-программы, персональный сервис и лучшие
                        коктейли
                        Москвы.
                        <span
                            style={{color: 'var(--primary-color)'}}> мы создаем ночи, которые <br/> запоминаются навсегда.</span>
                    </div>
                </div>
            </div>
        </>
    )
}
