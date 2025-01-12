import MoreInfo1 from "../../assets/images/more-info-1.png"
import MoreInfo2 from "../../assets/images/more-info-2.png"
import MoreInfo3 from "../../assets/images/more-info-3.png"

import './MoreInfoModal.css'
import PropTypes from "prop-types";
import Cross from "../../assets/icons/cross.svg";

export const MoreInfoModal = ({ isOpen, onClose }) => {
    const handleOverlayClick = (event) => {
        if (event.target.classList.contains("more-info-modal")) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="more-info-modal" onClick={handleOverlayClick}>
                <div className="more-info-modal__content">
                    <h2 className="more-info-modal__title">Какой лучший <span
                        style={{color: 'var(--secondary-color)'}}>стриптиз-клуб</span> в Москве
                    </h2>

                    <div className="more-info-modal__text">
                        Добро пожаловать в лучший элитный стриптиз-клуб в Москве!
                        Мы готовы подарить вам незабываемую ночь в атмосфере роскоши и страсти.
                        Наши шоу-программы созданы для истинных ценителей эротического искусства.
                        Каждый танец наших танцовщиц – это магия движения, которая не оставит вас равнодушными в мужском
                        клубе AUF в Москве.
                    </div>

                    <img src={MoreInfo1} alt="girl" className="more-info-modal__img" />

                    <h2 className="more-info-modal__title">
                        Что предлагает <span style={{color: 'var(--secondary-color)'}}> мужской клуб</span> AUF в Москве
                    </h2>

                    <div className="more-info-modal__text">
                        Для наших гостей мы предлагаем роскошные VIP-зоны с лучшим видом на сцену.
                        Здесь мужчины могут по-настоящему расслабиться и наслаждаться шоу в полной мере,
                        оставаясь в комфорте и уединении.
                        Каждую ночь – новые эмоции и новые впечатления, которые останутся с вами надолго!
                    </div>

                    <img src={MoreInfo3} alt="girl" className="more-info-modal__img"/>

                    <h3 className="more-info-modal__title">
                        Что такое <span style={{color: 'var(--secondary-color)'}}>иммерсивные</span> шоу-программы
                    </h3>

                    <div className="more-info-modal__text">
                        В нашем клубе вы найдете самые разнообразные программы, которые разжигают фантазию и дарят вам
                        море
                        эмоций.
                        Ночные шоу с профессиональными танцовщицами, которые умело соединяют грацию и смелость, оставят
                        яркие впечатления.
                        Стильные бары нашего клуба предложат вам лучший выбор напитков, которые помогут расслабиться и
                        насладиться шоу.
                        Мы также предлагаем уникальные авторские коктейли, которые создаются специально для наших
                        гостей.
                        Каждый вечер мы радуем наших гостей новой программой, где каждая деталь продумана до мелочей.
                        Изысканные костюмы, современное световое шоу и отличная музыкальная подборка —
                        всё это сделает ваше пребывание в стрип-клубе настоящим праздником.
                    </div>

                    <img src={MoreInfo2} alt="girl" className="more-info-modal__img" />

                    <h3 className="more-info-modal__title">
                        <span style={{color: 'var(--secondary-color)'}}>Незабываемая</span> атмосфера
                    </h3>

                    <div className="more-info-modal__text">
                        Мы создали идеальное место для тех, кто хочет отдохнуть и насладиться роскошным отдыхом в
                        столице.
                        Стильный интерьер, качественный сервис и приятная музыкальная программа — все это делает наш
                        стрип-клуб уникальным местом для вечернего отдыха.
                        Мы всегда рады пригласить вас провести незабываемый вечер в компании красивых и обворожительных
                        танцовщиц.
                    </div>

                    <div className="more-info-modal__text" style={{marginTop: '20px'}}>
                        В нашем клубе вы можете проводить различные мероприятия, такие как вечеринки или праздники.
                        Наши сотрудники позаботятся о том, чтобы каждый гость получил максимум внимания и удовольствия.
                        Время в нашем стриптиз-клубе в Москве станет поистине особенным.
                    </div>

                    <h2 className="more-info-modal__text" style={{marginTop: '20px'}}>
                        Почему наши гости выбирают стриптиз клуб AUF?
                    </h2>

                    <ul className="more-info-modal__text" style={{marginTop: '20px'}}>
                        <li>Самая красивая шоу-программа в городе</li>
                        <li>Эротические танцы от лучших танцовщиц Москвы</li>
                        <li>Комфортная атмосфера для всех гостей</li>
                        <li>Широкий выбор элитных напитков и авторских коктейлей</li>
                        <li>Центральное расположение для удобства всех посетителей</li>
                    </ul>

                    <div className="more-info-modal__text" style={{marginTop: '20px'}}>
                        Не откладывайте возможность окунуться в мир женской магии и ярких шоу!
                        Забронируйте столик прямо сейчас и наслаждайтесь исключительным сервисом в нашем стрип-клубе в
                        Москве.
                    </div>

                    <button className="more-info-modal__close-btn" onClick={onClose}>
                        <img className="more-info-modal__close-img" src={Cross} alt="Cross"/>
                        <div className="more-info-modal__close-text">
                            Закрыть
                        </div>
                    </button>
                </div>
            </div>
        </>
    )
}

MoreInfoModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
