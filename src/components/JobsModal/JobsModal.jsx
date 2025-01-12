import PropTypes from "prop-types";
import ArrowRight from "../../../public/assets/icons/arrow-right.svg";
import { TELEGRAM, WHATSAPP } from "../../utils/constants.js";

import './JobsModal.css';

export const JobsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="jobs-modal" onClick={onClose}>
                <div className="jobs-modal__content" onClick={(e) => e.stopPropagation()}>
                    <h2 className="jobs-modal__title">
                        Свяжитесь с нами по поводу вакансий через мессенджеры
                    </h2>
                    <div className="jobs-modal__buttons">
                        <button
                            className="jobs-modal__button whatsapp"
                            onClick={() => window.open(WHATSAPP, '_blank')}
                        >
                            Whatsapp
                            <img src={ArrowRight} style={{marginLeft: '10px'}} alt=""/>
                        </button>
                        <button
                            className="jobs-modal__button telegram"
                            onClick={() => window.open(TELEGRAM, '_blank')}
                        >
                            Telegram
                            <img src={ArrowRight} style={{marginLeft: '10px'}} alt=""/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

JobsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
