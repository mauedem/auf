import PropTypes from "prop-types";

import './Sidebar.css'

export const Sidebar = ({ isOpen, onClose }) => {
    const formatDate = () => {
        const now = new Date();
        const months = [
            'янв', 'фев', 'мар', 'апр', 'май', 'июн',
            'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'
        ];

        const day = now.getDate();
        const month = months[now.getMonth()];
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        return `${day} ${month}: ${hours}:${minutes}`;
    };

    return (
        <>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar__header">
                    <div>
                        <h2 className="sidebar__title">AUF EXPERIENCE CLUB</h2>
                        <p className="sidebar__subtitle">Приглашаем тебя стать частью эротического перфоманса</p>
                    </div>

                    <button className="close-btn" onClick={onClose}>
                        ✕
                    </button>
                </div>
                <div className="sidebar-content">
                    <div className="message">
                        <p className="message__title"><strong>AUF EXPERIENCE CLUB</strong> <span className="message__time">{formatDate()}</span>
                        </p>
                        <p className="message__text">
                            Приветствуем вас в царстве AUF. Эксклюзивный сервис, полная
                            конфиденциальность, незабываемый отдых.
                        </p>
                    </div>
                    <form className="contact-form">
                        <p className="contact-form__title">Оставьте свое сообщение и мы обязательно ответим!</p>
                        <input type="text" placeholder="Имя"/>
                        <input type="email" placeholder="Email"/>
                        <input type="tel" placeholder="Телефон"/>
                        <textarea placeholder="Сообщение"></textarea>
                        <button type="submit">Отправить</button>
                    </form>
                </div>
            </div>
        </>
    )
}

Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
